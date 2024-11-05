import * as supertest from 'supertest'

import {user, fakerUser, getUser} from '../../data/user'

const request = supertest('localhost:8001/api/v1')

describe(`USER SIGNUP`, () => {
  let res: any;
  describe(`create new user`, () => {
    beforeAll(async () => {
      res = await request.post(`/users/signup`).send(user).expect(201)
    })
    it(`verify response user name`, () => {
      expect(res.body.data.user.name).toBe('Dusty')
    });
    it(`verify response user email`, () => {
      expect(res.body.data.user.email).toBe(user.email)
    });
    it(`verify response body status`, () => {
      expect(res.body.status).toBe('success')
    });
  })
  describe(`create user with already existing email`, () => {
    const testEmail = `dusty_${Date.now()}@pirate.com`
    const testUser = {
      "name": "Dusty",
      "email": testEmail,
      "password": "Pirate666!",
      "passwordConfirm": "Pirate666!"
    }
    beforeAll(async () => {
      await request.post(`/users/signup`).send(testUser).expect(201)
      res = await request.post(`/users/signup`).send(testUser).expect(500)
    })
    it('verify response status', () => {
      expect(res.body.status).toBe(`error`)
    })
    it('verify response message', () => {
      expect(res.body.message).toContain(`duplicate key error`)
    })
  })
  describe(`create new user using faker`, () => {
    it('verify response', async () => {
      res = await request.post(`/users/signup`).send(fakerUser).expect(201)
      expect(res.body.data.user.name).toBe(fakerUser.name)
      expect(res.body.data.user.email).toBe(fakerUser.email.toLowerCase())
      expect(res.body.status).toBe('success')
    })
  })
  describe(`test with .end syntax`, () => {
    it('verify response', function (done) {
      const oneMoreUser = getUser()
      res = request
        .post(`/users/signup`)
        .send(oneMoreUser)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.data.user.name).toBe(oneMoreUser.name)
          expect(res.body.data.user.email).toBe(oneMoreUser.email.toLowerCase())
          expect(res.body.status).toBe('success')
          return done();
        })
    })
  })
})