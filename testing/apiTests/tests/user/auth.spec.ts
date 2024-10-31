import { getUser } from '../../data/user';
import * as userHelper from '../../helpers/userHelper';
import * as supertest from 'supertest';

const request = supertest('localhost:8001/api/v1');

describe(`Authentication`, () => {
  let res: any;
  describe('POSITIVE', () => {
    const userImport = getUser();
    it(`verify status code`, async () => {
      res = await userHelper.userSignup(userImport).expect(201);
      const loginRes = await userHelper.userLogin(userImport.email, userImport.password).expect(200);
    });
  });


  describe(`login with .then`, () => {
    it(`to rename later`, async () => {
      res = await userHelper.userLogin('jacksparrow@pirate.com', `Pirate666!`).then(response => {
        expect(response.statusCode).toEqual(200)
      });
    });
  });
});