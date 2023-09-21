const { getUserById, postUser, patchUserFriends, patchLocation, getFriendList, logInUser } = require('../controllers/users.controllers')

const apiRouter = require('express').Router()

apiRouter.get('/users/:user_id', getUserById)

apiRouter.post('/users', postUser)

apiRouter.patch('/users/:user_id/friends', patchUserFriends)

apiRouter.patch('/users/:user_id/location', patchLocation)

apiRouter.get('/users/:user_id/friends', getFriendList)

apiRouter.get('/login/:phone_number', logInUser)

module.exports = apiRouter