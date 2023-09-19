const app = require("../app")
const request = require("supertest")
const { seed } = require('../db/seed')
const data = require('../test-data/users')
const db = require("../db/connection")

beforeEach(() => {
    return seed(data)
})
  
afterAll(() => {
    return db.close()
})

describe('GET /api/users/:user_id', () => {
    test('200: Should return a user object with the given id', async () => {
        const { body: { user } } = await request(app)
            .get("/api/users/1")
            .expect(200)
        expect(user).toHaveProperty('user_id', 1)
        expect(user).toHaveProperty('name', 'Gemma')
        expect(user).toHaveProperty('location')
        expect(user).toHaveProperty('friendList')
    })
    test('404: should return "User not found" if given an invalid user_id', async () => {
        const { body: { msg } } = await request(app)
            .get("/api/users/99")
            .expect(404)
        expect(msg).toBe("User not found")
    })
})

describe('POST /api/users/', () => {
    const newUser = {user_id:7, name: "Johny English", phoneNumber: '07900000007',  
        location: { status: false,     
                    start: {lat: 0, long: 0},    
                    current: {lat: 0, long: 0},    
                    end: {lat: 0, long: 0}  
                },  
        friendList: [2,3,4,5,6]}
        const incompleteUser = {user_id:7, phoneNumber: '07900000007',  
        location: { status: false,     
                    start: {lat: 0, long: 0},    
                    current: {lat: 0, long: 0},    
                    end: {lat: 0, long: 0}  
                },  
        friendList: [2,3,4,5,6]}
    test('201: Should return a user object with the given id', async () => {
        const  response = await request(app)
            .post("/api/users").send(newUser)
            .expect(201)
        expect(response.text.includes("acknowledged\":true,")).toBe(true)
    })
    test("should generate a 400 error with an incomplete user", async ()=>{
        const  response = await request(app)
            .post("/api/users").send(incompleteUser)
            .expect(400)
    })
    test("should generate a 404 error with a wrong path", async ()=>{
        const  response = await request(app)
            .post("/api/userss").send(newUser)
            .expect(404)
    })
})

describe("patch api/users/:user_id/add", ()=>{
    test("201 changes the list of friends of a user", async ()=>{
        const newFriend = {phoneNumber: '07900000001'}
        const { body: { acknowledged } } = await request(app)
            .patch('/api/users/6/add')
            .send(newFriend)
            .expect(201)
        expect(acknowledged).toBe(true)

        const { body: { user : { friendList }} } = await request(app).get("/api/users/6")
        expect(friendList).toEqual([2, 3, 4, 1])
    })
    test('404: Should return "Invalid phone number" if given a phone number that does not exist', async () => {
        const newFriend = {phoneNumber: '07900000099'}
        const { body: { msg } } = await request(app)
            .patch('/api/users/6/add')
            .send(newFriend)
            .expect(404)
        expect(msg).toBe("Invalid phone number")
    })
})