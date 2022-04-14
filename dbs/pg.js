const { Pool } = require('pg');

console.log(process.env.PG_PORT)

const poolPg = new Pool({
    user: process.env.PG_USER,
    host:  process.env.PG_HOST,
    database:  process.env.PG_DATABASE,
    password:  process.env.PG_PASSWORD,
    port:  process.env.PG_PORT,
})

async function q(sql, parametros) {
    return new Promise(async (resolve, reject) => {
        poolPg.connect((err, client, done) => {
            if (err) 
               {
                   console.log(err)
                   reject(err)
                   return 
               }
            client.query(sql, parametros, (err, result) => {
                done()
                if (err) {
                    reject(err)
                } else {
                    resolve(result.rows)
                }
            })
        });
    })
}

module.exports = {
    q
}