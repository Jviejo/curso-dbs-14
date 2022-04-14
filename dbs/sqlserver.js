const mssql = require('mssql');
const { ModuleResolutionKind } = require('typescript');
const sqlConfig = {
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: process.env.SQLSERVER_DATABASE,
    server: process.env.SQLSERVER_HOST,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}


async function q(sql, params) {
    try {
        await mssql.connect(sqlConfig)
        const result = await mssql.query(sql)
        return result;
    } catch (err) {
        return { err: JSON.stringify(err) }
    }
}

module.exports = {
    q
}