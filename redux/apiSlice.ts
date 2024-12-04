import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATABASE_URL}/v1/`,

    prepareHeaders: (headers, { getState }) => {
      let token;
      const auth = localStorage.getItem('auth'); // Use a static key for localStorage

      if (auth) {
        try {
          token = JSON.parse(auth).token;
        } catch (e) {
          console.error('Error parsing auth token from localStorage', e);
        }
      }
      if (token) {
        headers.set('Authorization', `token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Experiences'],
  endpoints: () => ({}),
});
