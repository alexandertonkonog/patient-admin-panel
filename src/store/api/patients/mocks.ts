import { faker } from "@faker-js/faker/locale/ru";
import { Patient } from "./models";

export const patients: Patient[] = Array.from({ length: 200 }, (_, index) => ({
  id: index + 1,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  lastUpdate: faker.date.recent().toISOString(),
  isUpdating: false,
  teeth: {
    caries: faker.datatype.boolean(),
    pulpitis: faker.datatype.boolean(),
    periodontitis: faker.datatype.boolean(),
    missing: faker.datatype.boolean(),
    crown: faker.datatype.boolean(),
    implant: faker.datatype.boolean(),
  },
  gums: {
    gingivitis: faker.datatype.boolean(),
    periodontitis: faker.datatype.boolean(),
    recession: faker.datatype.boolean(),
    bleeding: faker.datatype.boolean(),
    swelling: faker.datatype.boolean(),
  },
  bite: {
    open: faker.datatype.boolean(),
    deep: faker.datatype.boolean(),
    cross: faker.datatype.boolean(),
    mesial: faker.datatype.boolean(),
    distal: faker.datatype.boolean(),
  },
  tmj: {
    clicks: faker.datatype.boolean(),
    pain: faker.datatype.boolean(),
    limitedOpening: faker.datatype.boolean(),
    locking: faker.datatype.boolean(),
    hypermobility: faker.datatype.boolean(),
  },
  muscles: {
    palpationPain: faker.datatype.boolean(),
    spasm: faker.datatype.boolean(),
    hypertonus: faker.datatype.boolean(),
    asymmetry: faker.datatype.boolean(),
    fatigue: faker.datatype.boolean(),
  },
}));
