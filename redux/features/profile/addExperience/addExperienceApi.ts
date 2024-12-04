import { apiSlice } from '@/redux/apiSlice';

export const addExperienceApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // Get all experiences
    getAllExperiences: builder.query({
      query: () => ({
        url: `experience`,
        method: 'GET',
      }),
      providesTags: ['Experiences'],
    }),

    // Add a new experience
    postExperience: builder.mutation({
      query: ({ data }: any) => ({
        url: `experience`,
        method: 'POST',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth') || '{}').token || ''}`,
        },
        body: data,
      }),
      invalidatesTags: ['Experiences'],
    }),

    // Update an existing experience
    updateExperience: builder.mutation({
      query: ({ experienceId, data }: any) => ({
        url: `experience/${experienceId}`,
        method: 'PUT',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth') || '{}').token || ''}`,
        },
        body: data,
      }),
      invalidatesTags: ['Experiences'],
    }),

    // Delete an experience
    deleteExperience: builder.mutation({
      query: ({ experienceId }: any) => ({
        url: `experience/${experienceId}`,
        method: 'DELETE',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth') || '{}').token || ''}`,
        },
      }),
      invalidatesTags: ['Experiences'],
    }),
  }),
});

export const {
  useGetAllExperiencesQuery,
  usePostExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = addExperienceApi;
