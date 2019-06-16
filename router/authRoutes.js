const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:authRoutes');
const passport = require('passport');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'libraryApp';
const AuthRouter = express.Router();

function router(nav) {
    AuthRouter.route('/signup')
        .post((req, res) => {
            const { username, password } = req.body;

            (async function userSignup() {
                let client;
                try {
                    client = await MongoClient.connect(mongoUrl);
                    debug('Connected to server successfully!!!');

                    const db = await client.db(dbName);

                    const col = await db.collection('users');
                    const user = { username, password };

                    const results = await col.insertOne(user);
                    debug(results.ops);

                    // create user
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                    client.close();
                } catch (error) {
                    debug(error);
                }
            }());
        });

    AuthRouter.route('/signin')
        .get((req, res) => {
            /* (async function userSignIn() {
                let client;
                try {
                    client = await MongoClient.connect(mongoUrl);
                    debug('Connected to database Successfully!!!');

                    const db = await client.db(dbName);
                    const col = await db.collection('books');
                    const books = await col.find().toArray(); 
                } catch (error) {
                    debug(error);
                }
            }()); */
            res.render(
                'signIn',
                {
                    nav,
                    title: 'SignIn'
                }
            );
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    // due to redirect from passport we can access the session data
    AuthRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    AuthRouter.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });

    return AuthRouter;
}

module.exports = router;
