import { faker } from "@faker-js/faker/locale/ru";
import { User } from "./models";
import { UserRole } from "./enums";

const ROLES = Object.values(UserRole);

export const users: User[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  login: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(ROLES),
  isActive: faker.datatype.boolean(),
  lastUpdate: faker.date.recent().toISOString(),
  isUpdating: false,
}));
