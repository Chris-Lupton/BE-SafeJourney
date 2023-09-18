const express = require("express")
// const cors = require('cors')
const { handleCustomErrors } = require("./controllers/error.controllers")
const apiRouter = require('./routers/api.router')

const app = express()

// app.use(cors())

app.use(express.json())

app.use('/api', apiRouter)

app.use((_, res) => {
    res.status(404).send({ msg: 'Not found' })
})

app.use(handleCustomErrors)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: err })
})

module.exports = app