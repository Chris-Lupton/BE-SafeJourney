const { getUserById } = require('../controllers/users.controllers')

const apiRouter = require('express').Router()

apiRouter.get('/users/:user_id', getUserById)


module.exports = apiRouter