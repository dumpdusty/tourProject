import * as supertest from 'supertest';

const request = supertest('localhost:8001/api/v1');

export const randomUser = (name: string, email: string, password: string, confirmPassword: string) => {
  return {
    name,
    email,
    password,
    'passwordConfirm': confirmPassword
  };
};

export const createUser = (data: any) => {
  return request.post(`/users/signup`).send(data);
};