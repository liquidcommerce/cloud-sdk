import { faker } from "@faker-js/faker";
import type { IUser } from "../interfaces/user";
const userGenerator = {
  getValidUser(): IUser {
    return {
      userName: "QA10Test",
      firstName: "QA10",
      lastName: "Test",
      email: "qa10@reservebar.com",
      password: process.env.TEST_USER_PASSWORD as string,
      organization: faker.company.name(),
      domain: faker.internet.domainName(),
    };
  },
  getRandomInvalidUser(): IUser {
    return {
      userName: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      organization: faker.company.name(),
      domain: faker.internet.domainName(),
    };
  },
  getInValidUser(): IUser {
    return {
      userName: "testUserName",
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "someEmail",
      password: "xxxxxxxx",
      organization: faker.company.name(),
      domain: faker.internet.domainName(),
    };
  },
};

export default userGenerator;
