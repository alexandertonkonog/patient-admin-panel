import { patientsApi } from "./api";

export * from "./models";
export * from "./api";

export const { useGetPatientsQuery, useRemovePatientsMutation } = patientsApi;
