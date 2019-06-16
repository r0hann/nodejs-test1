
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('server:bookController');

function bookController(nav, bookService) {
    function getIndex(req, res) {
        const mongoUrl = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(mongoUrl);
                debug('Connected Correctly to server!!!!');

                const db = client.db(dbName);

                const col = await db.collection('books');
                const books = await col.find().toArray();

                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    }


    function getById(req, res) {
        const mongoUrl = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            const { id } = req.params;
            try {
                client = await MongoClient.connect(mongoUrl);
                debug('Connected to server successfully!!!');

                const db = await client.db(dbName);

                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectId(id) });

                debug(book);
                book.details = await bookService.getBookById(book.bookId);
                res.render(
                    'bookView',
                    {
                        nav,
                        title: 'Library',
                        book
                    }
                );
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
    }

    function middleWare(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }

    return {
        getIndex,
        getById,
        middleWare
    };
}

module.exports = bookController;
