const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:local.strategy');


function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        const mongoUrl = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(mongoUrl);
                debug('Connected to database Successfully!!!');

                const db = await client.db(dbName);
                const col = await db.collection('users');

                const user = col.findOne({ username });
                if (user.password === password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                debug(error);
            }
            client.close();
        }());
    }));
}

module.exports = localStrategy;
