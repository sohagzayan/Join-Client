import { apiSlice } from '@/redux/apiSlice';

export const addExperienceApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // Get all Profile
    getProfile: builder.query({
      query: () => ({
        url: `profile/user-profile`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    // Add a new experience
    addProfile: builder.mutation({
      query: ({ data }: any) => ({
        url: `profile/create-profile`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Update an existing experience
    updateProfile: builder.mutation({
      query: ({ candidateId, data }: any) => ({
        url: `profile/${candidateId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useAddProfileMutation,
  useUpdateProfileMutation,
} = addExperienceApi;
