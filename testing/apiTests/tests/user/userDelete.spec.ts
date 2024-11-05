import * as userHelper from '../../helpers/userHelper'
import {getUser} from '../../data/user';
import * as supertest from 'supertest';
import { userLogin } from '../../helpers/userHelper';

const request = supertest('localhost:8001/api/v1');

describe.only(`DELETE USER WITH HEADER`, ()=>{
  let res: any, loginResponse: any, cookie: [x: string]
  const userData = getUser()
  beforeAll(async()=>{
    await userHelper.userSignup(userData).expect(201)
    loginResponse = await userHelper.userLogin(userData.email, userData.password)
    cookie = loginResponse.headers['set-cookie']
    res = await userHelper.weirdUserDelete(cookie[0])
  })

  it('verify response body status', () =>{
      // expect(signUpResponse.body).toHaveProperty('token')
    expect(res.body.status).toEqual(`success`)
  })

  it('verify response response body message', () =>{
      // expect(signUpResponse.body).toHaveProperty('token')
    expect(res.body.message).toEqual(`User deleted successfully`)
  })


})


describe(`DELETE USER WITH TOKEN`, ()=>{
  let res: any, loginResponse: any, token: string;
  const userData = getUser()
  beforeAll(async()=>{
    await userHelper.userSignup(userData).expect(201)
    loginResponse = await userHelper.userLogin(userData.email, userData.password)
    token = loginResponse.body.token
    res = await userHelper.userDelete(token).expect(200)
  })

  it('verify response body status', () =>{
    expect(res.body.status).toEqual(`success`)
  })
  it('verify response body message', () =>{
    expect(res.body.message).toEqual(`success`)
  })
})