const Express = require('express');
// const sql = require('mssql');
// const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('server:bookRouter');
// const { database } = require('../database/db_promise');
const bookController = require('../controllers/bookController');

const BookRouter = Express.Router();
const bookService = require('../services/goodreadsService');
// const booksData = require('../books.json').books;


function router(nav) {
    const { getIndex, getById, middleWare } = bookController(nav, bookService);

    BookRouter.use(middleWare);

    BookRouter.route('/')
        .get(getIndex);

    BookRouter.route('/:id')
        .get(getById);

    // this is mysql section

    /**  BookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const result = await database.query('SELECT * FROM books');
                // debug(result);
                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books: result
                    }
                );
            }());
        });


    BookRouter.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const { id } = req.params;
                const result = await database.query('SELECT * FROM books WHERE id = ?', id);
                // eslint-disable-next-line prefer-destructuring
                req.book = result[0];
                next();
            }());
        }).get((req, res) => {
            // debug(result);
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Library',
                    book: req.book
                }
            );
        }); */
    return BookRouter;
}

module.exports = router;
