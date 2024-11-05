import * as userHelper from '../../helpers/userHelper'
import {getUser} from '../../data/user';
import * as supertest from 'supertest';
import { userLogin } from '../../helpers/userHelper';

const request = supertest('localhost:8001/api/v1');

describe(`DELETE USER`, ()=>{
  let res: any, loginResponse: any, cookie: [x: string]
  const userData = getUser()
  beforeAll(async()=>{
    await userHelper.userSignup(userData).expect(201)
    loginResponse = await userHelper.userLogin(userData.email, userData.password)
    cookie = loginResponse.headers['set-cookie']
  })

  describe(`POSITIVE - delete new created user`, ()=>{
    beforeAll(async()=>{
      res = await userHelper.userDelete(cookie[0]).expect(200)
    })

    it('verify response body status', () =>{
      expect(res.body.status).toEqual(`success`)
    })

    it('verify response response body message', () =>{
      expect(res.body.message).toEqual(`User deleted successfully`)
    })
  })

  // // describe below could not be considered as real use case
  // // as there no options to get list of all users  for 'user' role
  // describe(`POSITIVE - delete existing user`, ()=>{
  //   let emails = []
  //   let passwords = []
  //   beforeAll(async() =>{
  //     //create a few users
  //     for(let i=0; i<4; i+=1){
  //       const testUserData = getUser()
  //
  //       emails.push(testUserData.email)
  //       passwords.push(testUserData.password)
  //
  //       await userHelper.userSignup(testUserData)
  //     }
  //
  //     // login selected user
  //     loginResponse = await userHelper.userLogin(emails[1], passwords[1])
  //
  //     // get header
  //     cookie = loginResponse.header['set-cookie']
  //
  //     // delete declared user
  //     res = await userHelper.userDelete(cookie[0])
  //
  //   })
  //   it('verify response body status', () =>{
  //    expect(res.body.status).toEqual(`success`)
  //   })
  //
  //   it('verify response response body message', () =>{
  //     expect(res.body.message).toEqual(`User deleted successfully`)
  //   })
  // })

  describe(`NEGATIVE - delete user with empty cookies`, ()=>{
    beforeAll(async()=>{
      res = await userHelper.userDelete(``).expect(401)
    })

    it('verify response body status', () =>{
      expect(res.body.status).toEqual(`fail`)
    })

    it('verify response response body message', () =>{
      expect(res.body.message).toEqual(`You are not logged in! Please log in to get access.`)
    })
  })

  describe(`NEGATIVE - delete user incorrect cookie type`, ()=>{
    beforeAll(async()=>{
      res = await userHelper.userDelete(`kh787274Tcb7843gfb`)
    })

    it('verify response body status', () =>{
      expect(res.body.status).toEqual(`fail`)
    })

    it('verify response response body message', () =>{
      expect(res.body.message).toEqual(`You are not logged in! Please log in to get access.`)
    })
  })
})
