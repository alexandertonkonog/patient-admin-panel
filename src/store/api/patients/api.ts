import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPatientsParams, PaginatedPatients, Patient } from "./models";
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
    getPatientById: builder.query<Patient, number>({
      queryFn: (id) => {
        const patient = patients.find((p) => p.id === id);
        if (!patient) {
          return { error: { status: 404, data: "Patient not found" } };
        }
        return { data: patient };
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
