import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseCookies } from 'nookies';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      const token = cookies['auth_token'];
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['jobs'],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        url: 'api/v1/job',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllJobsQuery } = jobsApi;

export default jobsApi;
