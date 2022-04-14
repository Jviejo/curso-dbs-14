const express = require("express")
require("dotenv").config()

const mysql = require("./dbs/mysql")
const pg = require("./dbs/pg")
const sqlserver = require("./dbs/sqlserver")


const app = express()

app.get("/ping", function (req, res) {
    res.send({ fecha: new Date().toISOString() })
})



app.get("/customersSqlServer", async (req, res) => {
    try {
        const r = await sqlserver.q("select * from Customers")
        res.send(r)
    } catch (error) {
        res.send(error)
    }
})



app.get("/customersPostgres2", async (req, res) => {
    try {
        const r = await pg.q("select * from Customers2")
        res.send(r)
    } catch (error) {
        res.send(error)
    }
})


app.get("/customersPostgres", async (req, res) => {
    pg.q("select * from Customers").then((resultados) => {
        res.send(resultados)
    }).catch(e => {
        res.send(e)
    })
})



app.get("/customersMysql", async (req, res) => {
    mysql.q("select * from Customers").then((resultados) => {
        res.send(resultados)
    }).catch(e => {
        res.send(e)
    })
})

app.listen(5555, () => {
    console.log('listen')
})