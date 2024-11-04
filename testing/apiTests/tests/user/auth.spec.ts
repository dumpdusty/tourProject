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