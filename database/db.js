const mysql = require('mysql');
const debug = require('debug')('server:db');

// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: '12345',
//     database: 'pslibrary',
//     port: 3306
// };

const configWeb = {
    host: 'sql12.freesqldatabase.com',
    user: 'sql12294592',
    password: 'WPkvYKKzpP',
    database: 'sql12294592',
    port: 3306
};

let db;
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(configWeb);

        db.connect((err) => {
            if (!err) {
                debug('Database is connected!');
            } else {
                debug('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();
