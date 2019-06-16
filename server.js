const Express = require('express');
const Open = require('open');
const Morgan = require('morgan');
const debug = require('debug')('server');
const bodyParser = require('body-parser');
const Path = require('path');
const Chalk = require('chalk');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const sql = require('mssql');
// const mysql = require('mysql');

const app = new Express();
const PORT = process.env.PORT || 3000;
// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: '12345',
//     database: 'pslibrary',
//     port: 3306
// };

// const connection = mysql.createConnection(config);

// connection.connect(err => Debug(err));

const nav = [{ link: '/books', title: 'Books' },
{ link: '/authors', title: 'Authors' }];
const BookRouter = require('./router/bookRoutes')(nav);
const adminRouter = require('./router/adminRoutes')(nav);
const authRouter = require('./router/authRoutes')(nav);

app.use(Morgan('tiny'));

/* app.use((req, res, next) => {
    debug('my middleware');
    next();
}); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'librarySrc' }));

require('./src/config/passport')(app);

app.use(Express.static(Path.join(__dirname, '/public/')));
app.use('/css', Express.static(Path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', Express.static(Path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', Express.static(Path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', Express.static(Path.join(__dirname, '/node_modules/popper.js/dist/umd')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// BookRouter.route('/')
//     .get((req, res) => {
//         res.send('Helllo Books');
//     });

// BookRouter.route('/single')
//     .get((req, res) => {
//         res.send('Helllo Single Books');
//     });

app.use('/admin', adminRouter);
app.use('/books', BookRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.render(
        'index',
        {
            nav,
            title: 'Library'
        }
    );
    // res.sendFile(Path.join(__dirname, 'views', 'index.html'));
    //    res.send("Hello, this is rohan!!!!!!!");
});

app.listen(PORT, (err) => {
    if (err) {
        debug(err);
    } else {
        debug('Listening to port----------, ', Chalk.green(PORT));
        // Open(`http://localhost:${PORT}`);
    }
});
