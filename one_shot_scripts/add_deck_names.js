const mongoose = require('mongoose');
const Deck = require('../models/deck');
const Cube = require('../models/cube');
const User = require('../models/user');
const mongosecrets = require('../../cubecobrasecrets/mongodb');
const {
	generate_short_id,
} = require('../serverjs/cubefn.js');

const cubeNameCache = {};
const userNameCache = {};

async function addVars(deck) {
    if(!cubeNameCache[deck.cube]) {
        const cube = await Cube.findById(deck.cube);
        cubeNameCache[deck.cube] = cube ? cube.name : 'Cube';
    }
    deck.cubename = cubeNameCache[deck.cube];

    if(userNameCache[deck.owner]) {
        const user = await User.findById(deck.owner);
        userNameCache[deck.owner] = user ? user.username : 'User';
    }
    deck.username = userNameCache[deck.owner];

    return await deck.save();
}

(async () => {
    var i = 0;
	mongoose.connect(mongosecrets.connectionString).then( async (db) => {

        const count = await Deck.countDocuments();
        const cursor = Deck.find().cursor();
        
        //batch them in 100
        for(var i = 0; i < count; i += 100)
        {
            const decks = [];
            let deck = await cursor.next()
            if(deck) {
                decks.push(deck)
            }
            await Promise.all(decks.map(deck => addVars(deck)));
            console.log("Finished: " + i + " of " + count + " decks");
        }
        mongoose.disconnect();
        console.log("done");
	});
})();