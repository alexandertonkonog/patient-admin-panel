import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetPatientsParams,
  PaginatedPatients,
  Patient,
  ExtendedPatient,
} from "./models";
import { patients } from "./mocks";

export const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    getPatients: builder.query<PaginatedPatients, GetPatientsParams>({
      queryFn: (params) => {
        const page = params?.page ?? 1;
        const perPage = params?.perPage ?? 10;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const items = patients.slice(start, end);

        return {
          data: {
            items,
            total: patients.length,
            page,
            perPage,
          },
        };
      },
      providesTags: ["Patients"],
    }),
    getPatientById: builder.query<ExtendedPatient, number>({
      queryFn: (id) => {
        const patient = patients.find((p) => p.id === id);
        if (!patient) {
          return { error: { status: 404, data: "Patient not found" } };
        }
        const extendedPatient: ExtendedPatient = {
          ...patient,
          teeth: {
            caries: false,
            pulpitis: false,
            periodontitis: false,
            missing: false,
            crown: false,
            implant: false,
          },
          gums: {
            gingivitis: false,
            recession: false,
            bleeding: false,
            swelling: false,
          },
          tmj: {
            clicks: false,
            pain: false,
            limitedOpening: false,
            locking: false,
            hypermobility: false,
          },
          muscles: {
            palpationPain: false,
            spasm: false,
            hypertonus: false,
            asymmetry: false,
            fatigue: false,
          },
        };
        return { data: extendedPatient };
      },
      providesTags: (_, __, id) => [{ type: "Patients", id }],
    }),
    removePatients: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: "/patients/remove",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Patients"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useRemovePatientsMutation,
} = patientsApi;
