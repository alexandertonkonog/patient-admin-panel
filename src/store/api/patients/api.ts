import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPatientsParams, PaginatedPatients } from "./models";

// Моковые данные
const mockPatients = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Пациент ${index + 1}`,
  lastUpdate: new Date(2024, 2, Math.floor(Math.random() * 30)).toISOString(),
  isUpdating: Math.random() > 0.7,
}));

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
        const items = mockPatients.slice(start, end);

        return {
          data: {
            items,
            total: mockPatients.length,
            page,
            perPage,
          },
        };
      },
      providesTags: ["Patients"],
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
