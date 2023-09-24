const db = require('../db/connection')

exports.selectUserById = async (id) => {
    const client = await db.connect()
    const database = client.db()

    const user = await database.collection('users').findOne({user_id: +id})
    if(!user){
        return Promise.reject({ status: 404, msg: "User not found" })
    }
    await client.close()
    return user
}

exports.insertUser = async (user) =>  {
   
    if(!user.name || !user.phoneNumber){
        return Promise.reject({status:400, msg:"Invalid input"})
    }
    user.location = {
        status: false,
        start: {lat: null, long: null},
        current: {lat: null, long: null},
        end: {lat: null, long: null}
    }
    user.friendList = []

    const client = await db.connect()
    const database = client.db()

    const count = await database.collection('users').countDocuments()
    
    user.user_id = count+1

    const { acknowledged } = await database.collection('users').insertOne(user)

    if(acknowledged){
        const newUser = await this.selectUserById(user.user_id)
        return newUser
    } else {
        return Promise.reject({})
    }
}

exports.getUserByPhoneNumber = async (phoneNumber) => {
    const client = await db.connect()
    const database = client.db()
    const user = await database.collection('users').findOne({ phoneNumber })
    if(!user){
        return Promise.reject({ status: 404, msg: 'Invalid phone number' })
    }
    await client.close()
    return user
}

exports.updateUserFriends = async (id, new_id) =>{
    
    const { friendList } = await this.selectUserById(id)

    const client = await db.connect()
    const database = client.db()

    friendList.push(new_id)

    const filterCriteria = { user_id: +id }
    const { acknowledged } = await database.collection('users').updateOne(filterCriteria, { $set: {friendList} })

    await client.close()
    return acknowledged
}

exports.updateLocation = async (status, start, end, user_id) => {
    const client = await db.connect()
    const database = client.db()
    let newLocation 

    const filterCriteria = { user_id: +user_id }
    if (!status){
         newLocation = {
            status: false,
            start: {lat: null, long: null},
            current: {lat: null, long: null},
            end: {lat: null, long: null}
        }
    }
    if(status) {
        if(start && end){
            newLocation = {
             status: true,     
             start: start,    
             current: start,    
             end: end  
             }   
        } else {
            return Promise.reject({status: 400, msg: 'Bad request'})
        }
    }
   
    const { acknowledged } = await database.collection('users').updateOne(filterCriteria, { $set: {location: newLocation} })
   
    await client.close()
    return acknowledged
}

exports.fetchFriendList = async (id) =>{
    const { friendList } = await this.selectUserById(id)

    const client = await db.connect()
    const database = client.db()

    const filterQuery = friendList.map(friend => {
        return { user_id: +friend }
    })
    const data = await database.collection('users').find({ $or: filterQuery }).toArray()

    data.forEach(obj => {
        delete obj._id
        delete obj.friendList
    })
    
    await client.close()
    return data
}

exports.updateCurrentLocation = async (user_id, current) => {
    const client = await db.connect()
    const database = client.db()
    const {acknowledged} = await database.collection("users").updateOne({user_id: +user_id}, {$set: {"location.current": current}})
    await client.close()
    return acknowledged
}