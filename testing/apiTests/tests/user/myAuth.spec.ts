import { getUser } from '../../data/user';
import * as userHelper from '../../helpers/userHelper';

describe(`Authentication`, () => {
  let res: any;
  const userImport = getUser();

  beforeAll(async() => {
    await userHelper.userSignup(userImport).expect(201);
  })

  describe('POSITIVE', () => {

    beforeAll(async() => {
      res = await userHelper.userLogin(userImport.email, userImport.password).expect(200)
    })

    it('verify response status', () =>{
        expect(res.body.status).toEqual(`success`)
    })

    it('verify response contains token', () =>{
        expect(res.body).toHaveProperty(`token`)
    })

    it('verify response token is a string', () =>{
        expect(typeof res.body.token).toBe(`string`)
    })

    it('verify response user name', () =>{
        expect(res.body.data.user.name).toBe(userImport.name)
    })

    it('verify response user email', () =>{
        expect(res.body.data.user.email).toBe(userImport.email.toLowerCase())
    })

    it('verify response user role', () =>{
        expect(res.body.data.user.role).toBe(`user`)
    })
  });

  describe('NEGATIVE', ()=>{
    const userImport = getUser();

    describe('login with empty email', () =>{

      beforeAll(async()=>{
        res = await userHelper.userLogin('', userImport.password).expect(400)
      })

      it('verify response status', () =>{
          expect(res.body.status).toEqual(`fail`)
      })

      it('verify response message', () =>{
          expect(res.body.message).toEqual(`Please provide email and password!`)
      })
    })

    describe(`login with empty password`, ()=>{

      beforeAll(async()=>{
        res = await userHelper.userLogin(userImport.email, '').expect(400)
      })

      it('verify response status', () =>{
        expect(res.body.status).toEqual(`fail`)
      })

      it('verify response message', () =>{
        expect(res.body.message).toEqual(`Please provide email and password!`)
      })
    })

    describe(`login with incorrect email`, ()=> {

      beforeAll(async()=>{
        res = await userHelper.userLogin('incorrect@email.com', userImport.password).expect(401)
      })

      it('verify response status', () =>{
        expect(res.body.status).toEqual(`fail`)
      })

      it('verify response message', () =>{
        expect(res.body.message).toEqual(`Incorrect email or password`)
      })
    })

    describe(`login with incorrect password`, ()=> {

      beforeAll(async()=>{
        res = await userHelper.userLogin(userImport.email, `incorrect123`).expect(401)
      })

      it('verify response status', () =>{
        expect(res.body.status).toEqual(`fail`)
      })

      it('verify response message', () =>{
        expect(res.body.message).toEqual(`Incorrect email or password`)
      })
    })

    describe(`login with mixed credentials`, ()=>{

      beforeAll(async()=>{
        res = await userHelper.userLogin(userImport.password, userImport.email).expect(401)
      })

      it('verify response status', () =>{
        expect(res.body.status).toEqual(`fail`)
      })

      it('verify response message', () =>{
        expect(res.body.message).toEqual(`Incorrect email or password`)
      })
    })
  })
});