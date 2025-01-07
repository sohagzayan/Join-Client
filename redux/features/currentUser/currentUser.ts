import { apiSlice } from '@/redux/apiSlice';

export const currentUser = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // Get all experiences
    getCurrentUser: builder.query({
      query: () => ({
        url: `current-user`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetCurrentUserQuery } = currentUser;
