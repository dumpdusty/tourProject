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

export function weirdUserSignup(user: object): Promise<any>{
  return new Promise((resolve, reject) => {
    request
      .post(`/users/signup`)
      .send(user)
      .end((err, res) => {
        if(err) return reject(err)
        else resolve(res)
      })
  })
}

export const userSignup = (data: object) => {
  return request.post(`/users/signup`).send(data);
};

export function weirdUserLogin(data: object): Promise<any>{
  return new Promise((resolve, reject) => {
    request
      .post(`/users/login`)
      .send(data)
      .end((err, res)=>{
        if(err) return reject(err)
        else resolve(res)
      })
  })
}

export const userLogin = (email: string, password: string) => {
  return request.post(`/users/login`).send({email, password})
}

export function weirdUserDelete(cookie: string): Promise<any>{
  return new Promise((resolve, reject) => {
    request
      .delete(`/users/deleteMe`)
      .set(`Cookie`, cookie)
      .end((err, res)=>{
        if(err) return reject(err)
        else resolve(res)
      })
  })
}

export const userDelete = (token: string) => {
  return request.delete(`/users/deleteMe`).set(`Authorization`,token)
}