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

    // assertions could be implemented to hook but won't be listed in Jest test log
    // moreover if assertion will throw the error following tests (it) won't be executed
    // expect(loginResponse.body).toHaveProperty('randomPropertyName')

    cookie = loginResponse.headers['set-cookie']
    res = await userHelper.userDelete(cookie[0])
  })

  it('verify response body status', () =>{
    expect(res.body.status).toEqual(`success`)
  })

  it('verify response response body message', () =>{
    expect(res.body.message).toEqual(`User deleted successfully`)
  })


})


// describe below doesn't work due to unknown API rules (to double-check `delete user` API code)
// describe(`DELETE USER WITH TOKEN`, ()=>{
//   let res: any, loginResponse: any, token: string;
//   const userData = getUser()
//   beforeAll(async()=>{
//     await userHelper.userSignup(userData).expect(201)
//     loginResponse = await userHelper.userLogin(userData.email, userData.password)
//     token = loginResponse.body.token
//     console.log(token);
//     res = await userHelper.userDelete(token)
//   })
//
//   it('verify response body status', () =>{
//     // console.log(res.body);
//     expect(res.body.status).toEqual(`success`)
//   })
//
//   it('verify response body message', () =>{
//     expect(res.body.message).toEqual(`User deleted successfully`)
//   })
// })