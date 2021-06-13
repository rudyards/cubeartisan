// Load Environment Variables
require('dotenv').config();

const patreon = require('patreon');
const express = require('express');

const { render } = require('../serverjs/render');
const { ensureAuth, csrfProtection } = require('./middleware');
const util = require('../serverjs/util.js');
const { winston } = require('../serverjs/cloudwatch');

const Patron = require('../models/patron');

const patreonAPI = patreon.patreon;
const patreonOAuth = patreon.oauth;

const patreonOAuthClient = patreonOAuth(process.env.PATREON_CLIENT_ID, process.env.PATREON_CLIENT_SECRET);

const router = express.Router();

router.use(csrfProtection);

router.get('/unlink', ensureAuth, async (req, res) => {
  try {
    await Patron.deleteOne({ user: req.user.id });
    req.flash('success', `Patron account has been unlinked.`);
    return res.redirect('/user/account?nav=patreon');
  } catch (err) {
    return util.handleRouteError(req, res, err, '/user/account?nav=patreon');
  }
});

router.post('/hook', async (req, res) => {
  winston.info(req.body);

  return res.status(200).send({
    success: 'true',
  });
});

router.get('/redirect', ensureAuth, (req, res) => {
  const oauthGrantCode = req.query.code;

  // if this user is already a patron, error
  if (req.user.patron) {
    req.flash('danger', `A Patreon account has already been linked.`);
    return res.redirect('/user/account?nav=patreon');
  }

  return patreonOAuthClient
    .getTokens(oauthGrantCode, process.env.PATREON_REDIRECT)
    .then((tokensResponse) => {
      const patreonAPIClient = patreonAPI(tokensResponse.access_token);
      return patreonAPIClient('/current_user');
    })
    .then(async ({ rawJson }) => {
      // use email for unique key
      const email = rawJson.data.attributes.email.toLowerCase();

      // if a patron with this email is already linked, we can't use it
      const patron = await Patron.findOne({ email });

      if (patron) {
        req.flash(
          'danger',
          `This Patreon account has already been linked to another Cube Cobra account. If you think this was done by mistake, please contact us.`,
        );
        return res.redirect('/user/account?nav=patreon');
      }

      const newPatron = new Patron();
      newPatron.email = email;
      newPatron.user = req.user.id;

      const pledges = rawJson.included.filter((item) => item.type === 'pledge');

      if (pledges.length === 0) {
        req.flash('danger', `This Patreon account does not appear to be currently support Cube Cobra.`);
        return res.redirect('/user/account?nav=patreon');
      }

      if (pledges.length > 1) {
        req.flash('danger', `The server response from Patreon was malformed. Please contact us for more information.`);
        return res.redirect('/user/account?nav=patreon');
      }

      const rewardId = pledges[0].relationships.reward.data.id;

      const rewards = rawJson.included.filter((item) => item.id === rewardId);

      if (rewards.length > 1) {
        req.flash(
          'danger',
          `The server response from Patreon was malformed, too many reward objects. Please contact us for more information.`,
        );
        return res.redirect('/user/account?nav=patreon');
      }

      if (rewards.length === 0) {
        newPatron.level = 'Patron';
      } else {
        newPatron.level = rewards[0].attributes.title;
      }

      newPatron.active = true;

      await newPatron.save();

      req.flash('success', `Your Patreon account has succesfully been linked.`);
      return res.redirect('/user/account?nav=patreon');
    })
    .catch((err) => {
      return render(req, res, 'ErrorPage', {
        error: err.statusText,
        requestId: req.uuid,
        title: 'There was an error linking your Patreon account.',
      });
    });
});

module.exports = router;
