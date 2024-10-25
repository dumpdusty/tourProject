import * as supertest from 'supertest'
import * as userHelper from '../../helpers/userHelper'
import {faker} from '@faker-js/faker';

const request = supertest('localhost:8001/api/v1')
const password = 'Pirate666!'
describe(`USER CREATE POSITIVE`, () => {
  let res: any, testUser: any;

  beforeAll(async () => {
    testUser = userHelper.randomUser(faker.internet.userName(), faker.internet.email(), password, password )
    res = await userHelper.createUser(testUser)
  })
  it('verify response status code', () => {
    expect(res.statusCode).toBe(201)
  })

  it('verify response status', () => {
    expect(res.body.status).toBe(`success`)
  })

  it('verify response body name', () => {
    expect(res.body.data.user.name).toBe(testUser.name)
  })

  it('verify response body email', () => {
    expect(res.body.data.user.email).toBe(testUser.email.toLowerCase())
  })
})

describe(`USER CREATE NEGATIVE`, ()=>{
  let res: any, testUser: any;
  describe(`create user without name`, ()=>{
    beforeAll(async()=>{
      testUser = userHelper.randomUser('', faker.internet.email(), password, password)
      res = await userHelper.createUser(testUser)
    })

    it('verify response status code', () =>{
      expect(res.statusCode).toBe(500)
    })

    it('verify response error text', () =>{
      expect(res.body.error.message).toContain(`Please tell us your name!`)
    })

  })

  describe(`create user without email`, ()=>{
    beforeAll(async()=>{
      testUser = userHelper.randomUser(faker.internet.userName(), '', password, password)
      res = await userHelper.createUser(testUser)
    })

    it('verify response status code', () =>{
      expect(res.statusCode).toBe(500)
    })

    it('verify response error text', () =>{
      expect(res.body.error.message).toContain(`Please provide your email`)
    })
  })

  describe(`create user without password`, ()=>{
    beforeAll(async()=>{
      testUser = userHelper.randomUser(faker.internet.userName(), faker.internet.email(), '', password)
      res = await userHelper.createUser(testUser)
    })

    it('verify response status code', () =>{
      expect(res.statusCode).toBe(500)
    })

    it('verify response error text', () =>{
      expect(res.body.error.message).toContain(`Please provide a password`)
    })
  })

  describe(`create user without password confirmation`, ()=>{
    beforeAll(async()=>{
      testUser = userHelper.randomUser(faker.internet.userName(), faker.internet.email(), password, '')
      res = await userHelper.createUser(testUser)
    })

    it('verify response status code', () =>{
      expect(res.statusCode).toBe(500)
    })

    it('verify response error text', () =>{
      expect(res.body.error.message).toContain(`Please confirm your password`)
    })
  })

  describe(`create user with different passwords`, ()=>{
    beforeAll(async()=>{
      testUser = userHelper.randomUser(faker.internet.userName(), faker.internet.email(), password, 'pass1234')
      res = await userHelper.createUser(testUser)
    })

    it('verify response status code', () =>{
      expect(res.statusCode).toBe(500)
    })

    it('verify response error text', () =>{
      expect(res.body.error.message).toContain(`Passwords are not the same!`)
    })
  })

  describe(`create user with empty data`, ()=>{
    beforeAll(async()=>{
      testUser = userHelper.randomUser('','','','')
      res = await userHelper.createUser(testUser)
    })

    it('verify response status code', () =>{
      expect(res.statusCode).toBe(500)
    })

    it('verify response error text', () =>{
      expect(res.body.error.message).toContain(`Please tell us your name!`)
    })
  })
})