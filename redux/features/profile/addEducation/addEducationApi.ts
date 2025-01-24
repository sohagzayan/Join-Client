import { apiSlice } from '@/redux/apiSlice';

export const addEducationApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // Get all educations
    getEducations: builder.query({
      query: () => ({
        url: `education`,
        method: 'GET',
      }),
      providesTags: ['Educations'],
    }),

    // Add a new education
    addEducations: builder.mutation({
      query: ({ data }: any) => ({
        url: `education`,
        method: 'POST',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth') || '{}').token || ''}`,
        },
        body: data,
      }),
      invalidatesTags: ['Educations'],
    }),

    // Update an existing education
    updateEducations: builder.mutation({
      query: ({ educationId, data }: any) => ({
        url: `education/${educationId}`,
        method: 'PATCH',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth') || '{}').token || ''}`,
        },
        body: data,
      }),
      invalidatesTags: ['Educations'],
    }),

    // Delete an education
    deleteEducations: builder.mutation({
      query: ({ educationId }: any) => ({
        url: `education/${educationId}`,
        method: 'DELETE',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth') || '{}').token || ''}`,
        },
      }),
      invalidatesTags: ['Educations'],
    }),
  }),
});

export const {
  useAddEducationsMutation,
  useGetEducationsQuery,
  useUpdateEducationsMutation,
  useDeleteEducationsMutation,
} = addEducationApi;
