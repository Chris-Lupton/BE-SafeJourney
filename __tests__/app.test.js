const app = require("../app")
const request = require("supertest")
const seed = require('../db/seed')
const data = require('../test-data/users')
const db = require("../db/connection")

beforeEach(() => {
    return seed(data)
})
  
afterAll(() => {
    return db.close()
})

describe('/', () => {
    test('200:', async () => {
        const { } = await request(app)
            .get("")
            .expect(200)
        expect()

    })
})