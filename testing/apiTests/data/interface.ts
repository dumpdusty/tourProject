export interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}