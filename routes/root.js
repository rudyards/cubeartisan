const serialize = require('serialize-javascript');
const express = require('express');

const util = require('../serverjs/util.js');

const Blog = require('../models/blog');
const Cube = require('../models/cube');
const Deck = require('../models/deck');
const User = require('../models/user');

const carddb = require('../serverjs/cards');
const { makeFilter } = require('../serverjs/filterCubes');
const { addAutocard } = require('../serverjs/cubefn');
const { render } = require('../serverjs/render');
const { csrfProtection } = require('./middleware');

const router = express.Router();

router.use(csrfProtection);

const CUBE_PREVIEW_FIELDS =
  '_id urlAlias shortId image_uri image_name image_artist name owner owner_name type card_count overrideCategory categoryPrefixes categoryOverride';

// Home route
router.get('/', async (req, res) => (req.user ? res.redirect('/dashboard') : res.redirect('/landing')));

router.get('/explore', async (req, res) => {
  const userID = req.user ? req.user._id : '';

  const recentsq = Cube.find(
    {
      $or: [
        {
          card_count: {
            $gt: 200,
          },
          isListed: true,
        },
        {
          owner: userID,
        },
      ],
    },
    CUBE_PREVIEW_FIELDS,
  )
    .lean()
    .sort({
      date_updated: -1,
    })
    .limit(12)
    .exec();

  const featuredq = Cube.find(
    {
      isFeatured: true,
    },
    CUBE_PREVIEW_FIELDS,
  )
    .lean()
    .exec();

  const draftedq = Cube.find(
    {
      $or: [
        {
          isListed: true,
        },
        {
          owner: userID,
        },
      ],
    },
    CUBE_PREVIEW_FIELDS,
  )
    .lean()
    .sort({
      numDecks: -1,
    })
    .limit(12)
    .exec();

  const decksq = Deck.find()
    .lean()
    .sort({
      date: -1,
    })
    .limit(10)
    .exec();

  const [recents, featured, drafted, decks] = await Promise.all([recentsq, featuredq, draftedq, decksq]);

  const recentlyDrafted = await Cube.find({ _id: { $in: decks.map((deck) => deck.cube) } }, CUBE_PREVIEW_FIELDS).lean();

  const reactProps = {
    recents,
    featured,
    drafted,
    recentlyDrafted,
  };

  res.render('explore', {
    reactProps: serialize(reactProps),
    loginCallback: '/explore',
  });
});

router.get('/random', async (req, res) => {
  const count = await Cube.estimatedDocumentCount();
  const random = Math.floor(Math.random() * count);
  const cube = await Cube.findOne().skip(random).lean();
  res.redirect(`/cube/overview/${cube.urlAlias ? cube.urlAlias : cube.shortID}`);
});

router.get('/dashboard', async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.redirect('/landing');
    }

    const cubesq = Cube.find(
      {
        owner: user._id,
      },
      CUBE_PREVIEW_FIELDS,
    )
      .lean()
      .sort({
        date_updated: -1,
      });
    const postsq = Blog.find({
      $or: [
        {
          cube: {
            $in: user.followed_cubes,
          },
        },
        {
          owner: {
            $in: user.followed_users,
          },
        },
        {
          dev: 'true',
        },
      ],
    })
      .sort({
        date: -1,
      })
      .limit(200);

    // We can do these queries in parallel
    const [cubes, posts] = await Promise.all([cubesq, postsq]);

    const decks = await Deck.find({
      cubeOwner: user._id,
    })
      .sort({
        date: -1,
      })
      .lean()
      .limit(13);

    // autocard the posts
    if (posts) {
      for (const post of posts) {
        if (post.html) {
          post.html = addAutocard(post.html, carddb);
        }
      }
    }

    return render(req, res, 'DashboardPage', { posts, cubes, decks, canEdit: true, userId: user._id });
  } catch (err) {
    return util.handleRouteError(req, res, err, '/landing');
  }
});

router.get('/dashboard/decks/:page', async (req, res) => {
  try {
    const pagesize = 30;
    const { page } = req.params;
    const { user } = req;
    if (!user) {
      return res.redirect('/landing');
    }

    const decks = await Deck.find({
      cubeOwner: user._id,
    })
      .sort({
        date: -1,
      })
      .skip(pagesize * page)
      .limit(pagesize)
      .lean()
      .exec();

    const numDecks = await Deck.countDocuments({
      cubeOwner: user._id,
    })
      .lean()
      .exec();

    const reactProps = {
      decks,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(numDecks / pagesize),
      count: numDecks,
    };

    return res.render('recent_drafts', {
      reactProps: serialize(reactProps),
    });
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send(err);
  }
});

router.get('/landing', async (req, res) => {
  const cubeq = Cube.estimatedDocumentCount().exec();
  const deckq = Deck.estimatedDocumentCount().exec();
  const userq = User.estimatedDocumentCount().exec();

  const [cube, deck, user] = await Promise.all([cubeq, deckq, userq]);

  // this regex add commas to the number
  res.render('landing', {
    numusers: user.toLocaleString('en-US'),
    numcubes: cube.toLocaleString('en-US'),
    numdrafts: deck.toLocaleString('en-US'),
    version: process.env.CUBECOBRA_VERSION,
    loginCallback: '/',
  });
});

router.get('/version', async (req, res) => {
  try {
    const reactProps = { version: process.env.CUBECOBRA_VERSION, host: process.env.HOST };

    return res.render('version', {
      reactProps: serialize(reactProps),
      loginCallback: '/version',
    });
  } catch (err) {
    return util.handleRouteError(req, res, err, `/landing`);
  }
});

router.get('/search', async (req, res) => {
  const reactProps = {
    query: '',
    cubes: [],
  };
  return res.render('search', {
    reactProps: serialize(reactProps),
    loginCallback: `/search`,
  });
});

router.get('/search/:query/:page', async (req, res) => {
  try {
    const perPage = 36;
    const page = Math.max(0, req.params.page);

    const { order } = req.query;

    let sort = {
      date_updated: -1,
    };

    switch (order) {
      case 'pop':
        sort = {
          numDecks: -1,
        };
        break;
      case 'alpha':
        sort = {
          name: -1,
        };
        break;
      default:
        break;
    }

    let {
      filter: { query },
    } = await makeFilter(req.params.query, carddb);
    const listedQuery = { isListed: true };
    if (query.$and) {
      query.$and.push(listedQuery);
    } else {
      query = { $and: [{ isListed: true }, query] };
    }

    const count = await Cube.countDocuments(query);

    const cubes = await Cube.find(query, CUBE_PREVIEW_FIELDS)
      .lean()
      .sort(sort)
      .skip(perPage * page)
      .limit(perPage);

    const reactProps = {
      query: req.params.query,
      cubes,
      count,
      perPage,
      page,
      order,
    };

    return res.render('search', {
      reactProps: serialize(reactProps),
      loginCallback: `/search/${req.params.id}`,
    });
  } catch (err) {
    const reactProps = {
      query: req.params.query,
      cubes: [],
      count: 0,
      perPage: 0,
      page: 0,
    };

    req.logger.error(err);
    req.flash('danger', 'Invalid Search Syntax');

    return res.render('search', {
      reactProps: serialize(reactProps),
      loginCallback: `/search/${req.params.id}`,
    });
  }
});

router.get('/contact', (req, res) => {
  res.render('info/contact', {
    loginCallback: '/contact',
  });
});

router.get('/tos', (req, res) => {
  res.render('info/tos', {
    loginCallback: '/tos',
  });
});

router.get('/filters', (req, res) => {
  res.render('info/filters', {
    loginCallback: '/filters',
  });
});

router.get('/privacy', (req, res) => {
  res.render('info/privacy_policy', {
    loginCallback: '/privacy',
  });
});

router.get('/cookies', (req, res) => {
  res.render('info/cookies', {
    loginCallback: '/cookies',
  });
});

router.get('/ourstory', (req, res) => {
  res.render('info/ourstory', {
    loginCallback: '/ourstory',
  });
});

router.get('/faq', (req, res) => {
  res.render('info/faq', {
    loginCallback: '/faq',
  });
});

router.get('/donate', (req, res) => {
  res.render('info/donate', {
    loginCallback: '/donate',
  });
});

router.get('/c/:id', (req, res) => {
  res.redirect(`/cube/list/${req.params.id}`);
});

module.exports = router;
