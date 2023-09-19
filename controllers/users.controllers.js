const { selectUserById, insertUser, updateUserFriends, getUserByPhoneNumber} = require("../models/users.models");

exports.getUserById = async (request, response, next) => {
    try {
        const { user_id } = request.params
        const user = await selectUserById(user_id)
        response.status(200).send({ user: user })
    } catch (err) {
        next(err)
    }
}

exports.postUser = async(request, response, next) => {
    try {
        const newUser = request.body
        const user = await insertUser(newUser)
        response.status(201).send({user: user })
    } catch (err) {
        next(err)
    }
}

exports.patchUserFriends = async(request, response, next) =>{
    try {
        const { user_id } = request.params
        const { phoneNumber } = request.body

        const newUser = await getUserByPhoneNumber(phoneNumber)
        const acknowledged = await updateUserFriends(user_id, newUser.user_id)
        response.status(201).send({ acknowledged })
    } catch (err) {
        next(err)
    }
}