import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseCookies } from 'nookies';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATABASE_URL}/v1/`,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      const token = cookies['auth_token'];

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Experiences', 'Profile', 'Educations'],
  endpoints: () => ({}),
});
