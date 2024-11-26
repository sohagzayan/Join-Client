import { clearUser, setUser } from '@/redux/slice/userSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UserAuth,
} from './../../../data/models/auth';

export const UserAuthApi = createApi({
  reducerPath: 'userAuth',
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
  tagTypes: ['User'], // Define tags
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: '/v1/auth/signin',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setCookie(null, 'auth_token', data.token, { path: '/' });
          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Login Error:', error);
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userInfo) => ({
        url: '/v1/auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
    fetchUser: builder.query<UserAuth, void>({
      query: () => ({
        url: '/auth/user/',
        method: 'GET',
      }),
      providesTags: ['User'], // Specify the tag for caching
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        return { data: undefined };
      },
      async onQueryStarted(_, { dispatch }) {
        try {
          destroyCookie(null, 'auth_token');
          dispatch(clearUser());
          // window.location.reload();
        } catch (error) {
          console.error('Logout Error:', error);
        }
      },
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query<UserAuth, { token: string }>({
      query: ({ token }) => ({
        url: '/v1/current-user',
        method: 'POST',
        body: { token }, // Send token in request body
      }),
      providesTags: ['User'], // Tag for caching
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchUserQuery,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = UserAuthApi;
