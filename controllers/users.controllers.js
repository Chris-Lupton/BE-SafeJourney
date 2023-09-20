const { selectUserById, insertUser, updateUserFriends, getUserByPhoneNumber, updateLocation, fetchFriendList, updateCurrentLocation} = require("../models/users.models");

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
        const acknowledged = await insertUser(newUser)
        response.status(201).send({ acknowledged })
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

exports.patchLocation = async(request, response, next) => {
    try {
        const { user_id } = request.params
        const { status, start, end, current } = request.body
        if(current) {
            const acknowledged = await updateCurrentLocation(user_id, current)
            response.status(201).send({ acknowledged })
        
        } else {
            const acknowledged = await updateLocation(status, start, end, user_id, current)
            response.status(201).send({ acknowledged })
        } 
    } catch (err) {
        next(err)
    }
}

exports.getFriendList = async (request, response, next) => {
    try {
        const { user_id } = request.params
        const friendList = await fetchFriendList(user_id)
        response.status(200).send({ friendList })
    } catch (err) {
        next(err)
    }
}

