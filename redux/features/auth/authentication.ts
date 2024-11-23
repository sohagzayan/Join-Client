import { clearUser } from '@/redux/slice/userSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UserAuth,
} from './../../../data/models/auth';

export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
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
          // dispatch(setUser(data.user));
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
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          destroyCookie(null, 'auth_token');
          dispatch(clearUser());
        } catch (error) {
          console.error('Logout Error:', error);
        }
      },
      invalidatesTags: ['User'], // Invalidate user data cache on logout
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchUserQuery,
  useLogoutMutation,
} = UserAuthApi;
