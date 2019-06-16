const connection = require('./db');

module.exports.database = {

    query(sql, args) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line consistent-return
            connection.query(sql, args, (err, rows) => {
                if (err) { return reject(err); }
                resolve(rows);
            });
        });
    },

    close() {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line consistent-return
            connection.end((err) => {
                if (err) { return reject(err); }
                resolve();
            });
        });
    }
};
