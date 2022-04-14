const mysql = require("mysql8")

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


function q(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            return resolve(results);
        });
    });
}

module.exports = {
    q
}