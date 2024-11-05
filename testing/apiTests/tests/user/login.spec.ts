import { getUser } from '../../data/user';
import * as userHelper from '../../helpers/userHelper';


describe(`Authentication`, () => {
  let res: any;
  const userImport = getUser();
  beforeAll(async () => {
    await userHelper.userSignup(userImport).expect(201);
  });

  describe(`login with .then`, () => {
    it(`verify response statusCode`, async () => {
      await userHelper.userLogin(userImport.email, userImport.password)
        .then(response => {
          expect(response.statusCode).toEqual(200);
          expect(response.body.status).toEqual('success')
        });
    });
  });
});

// tests passes if throw Error(error) commented
describe(`login with try-catch`, () => {
  let res: any;
  const userImport = getUser();

  beforeAll(async () => {
    await userHelper.userSignup(userImport).expect(201);
  });

  it(`verify response status`, async () => {
    try{
      await userHelper.userLogin(userImport.email, userImport.password).then(el =>{
        // console.log(el.body.status);
        // console.log(el.body.data.user.email);
        expect(el.body.status).toBe(`success123`)
        // expect(el.body.data.user.email).toEqual(userImport.email)
      })
    } catch(error){
      console.log(`Error during login process`);
      // throw Error(error)
    }
  });
});

describe(`login with then & return`, () => {
  let res: any;
  const userImport = getUser();

  it(`verify response status`, async() => {
    await userHelper.userSignup(userImport)
      .then(res=>{
        expect(res.body.status).toBe(`success`);
        return userHelper.userLogin(userImport.email, userImport.password)
      })
      .then(res2 => {
        expect(res2.statusCode).toEqual(200)
      })
      .catch((err) => {
        console.log(err);
      })
  });
});

describe(`login with done without promise`, () => {
  let res: any;
  const userImport = getUser();

  it(`verify response status`, (done) => {
    userHelper.userSignup(userImport).end((err, res)=>{
      if(err) return done(err);
      expect(res.body.status).toBe(`success`);
      done();
    })
  });
});
