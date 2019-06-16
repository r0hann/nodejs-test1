const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:adminRoutes');

const adminRouter = express.Router();
const booksData = require('../books.json').books;

function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const mongoUrl = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(mongoUrl);
                    debug('Connected Correctly to server!!!!');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(booksData);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
            // res.send('Sending data in mongodb');
        });
    return adminRouter;
}

module.exports = router;
