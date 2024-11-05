import { faker } from '@faker-js/faker';
import { User } from './interface';

const testEmail = `dusty_${Date.now()}@pirate.com`;

export const user = {
  name: 'Dusty',
  email: testEmail,
  password: 'Pirate666!',
  passwordConfirm: 'Pirate666!',
};

const password = 'Pirate666!';
const fakerPassword = faker.internet.password();

export const fakerUser: User = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: fakerPassword,
  passwordConfirm: fakerPassword,
};

export const getUser = ():User => {
  const fakerPassword = faker.internet.password();
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: fakerPassword,
    passwordConfirm: fakerPassword,
  };
}

export const createRandomUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
