const { getUserById, postUser } = require('../controllers/users.controllers')

const apiRouter = require('express').Router()

apiRouter.get('/users/:user_id', getUserById)

apiRouter.post('/users', postUser)

module.exports = apiRouter