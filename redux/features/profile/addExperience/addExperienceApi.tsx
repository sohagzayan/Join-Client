import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API
export const addExperienceApi = createApi({
  reducerPath: 'jobs',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/recruiter',
    prepareHeaders: (headers) => {
      // Safely retrieve the token from localStorage
      if (typeof window !== 'undefined') {
        const token =
          JSON.parse(localStorage.getItem('auth') || '{}').token || '';
        if (token) {
          headers.set('Authorization', `token ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Add experience mutation
    addExperience: builder.mutation({
      query: ({
        userId,
        data,
      }: {
        userId: string;
        data: Record<string, unknown>;
      }) => ({
        url: `marketing/v1/ratings-review/${userId}/add_comment/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddExperienceMutation } = addExperienceApi;
