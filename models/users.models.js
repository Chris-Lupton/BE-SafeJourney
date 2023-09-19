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
   
    if(user.name===undefined||user.phoneNumber===undefined){
        return Promise.reject({status:400, msg:"Invalid input"})
    }
    const client = await db.connect()
    const database = client.db()
    const newUser = await database.collection('users').insertOne(user)

    await client.close()
    return newUser
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

    const filterCriteria = { user_id: +user_id }
    const newLocation = {
        status: status,     
        start: start,    
        current: start,    
        end: end  
        }
    const { acknowledged } = await database.collection('users').updateOne(filterCriteria, { $set: {location: newLocation} })

    await client.close()
    return acknowledged
}