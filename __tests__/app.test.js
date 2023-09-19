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
        // const newUser = {user_id:7, name: "Johny English", phoneNumber: '07900000007',  
        // location: { status: false,     
        //             start: {lat: 0, long: 0},    
        //             current: {lat: 0, long: 0},    
        //             end: {lat: 0, long: 0}  
        //         },  
        // friendList: [2,3,4,5,6]}
        
       
        const  response = await request(app)
        .post("/api/users").send(newUser)
        .expect(201)
         console.log(response.text)
        expect(response.text.includes("acknowledged\":true,")).toBe(true)
        //  expect(body).toHaveProperty('name', 'Johny English')
        //  expect(body).toHaveProperty('location')
        //  expect(body).toHaveProperty('friendList')

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
describe("patch api/users/:user_id/friendsList", ()=>{
    test("202 changes the list of friends of a user", async ()=>{
        const newFriends=[1,2,3,4,5]
        const response = await request(app)
        .patch('/api/users/6').send(newFriends)
        .expect(202)

    })
})