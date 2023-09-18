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
})

describe('POST /api/users/', () => {
    test('201: Should return a user object with the given id', async () => {
        const newUser = {user_id:7, name: "Johny English", phoneNumber: '07900000007',  
        location: { status: false,     
                    start: {lat: 0, long: 0},    
                    current: {lat: 0, long: 0},    
                    end: {lat: 0, long: 0}  
                },  
        friendList: [2,3,4,5,6]}
        
        
        const { body:{user} } = await request(app)
        .post("/api/users").send(newUser)
        .expect(201)
        expect(user).toHaveProperty('aknowledged', true)
        // expect(user).toHaveProperty('name', 'Johny English')
        // expect(user).toHaveProperty('location')
        // expect(user).toHaveProperty('friendList')

    })
})