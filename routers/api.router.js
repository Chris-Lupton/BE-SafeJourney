const { getUserById, postUser, patchUserFriends } = require('../controllers/users.controllers')

const apiRouter = require('express').Router()

apiRouter.get('/users/:user_id', getUserById)

apiRouter.post('/users', postUser)

apiRouter.patch('/users/:user_id/add', patchUserFriends)

module.exports = apiRouter