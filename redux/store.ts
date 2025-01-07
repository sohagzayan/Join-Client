import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { OrganizationApi } from './features/Organization';
import { UserApi } from './features/User';
import { UserAuthApi } from './features/auth/authentication';
import { jobsApi } from './features/getJobs';
import { addExperienceApi } from './features/profile/addExperience/addExperienceApi';
import SidebarReducer from './slice/dashboardSidebar-slice';
import mobileMenuReducer from './slice/mobileMenu-slice';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    mobileMenuReducer,
    SidebarReducer,
    user: userReducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [OrganizationApi.reducerPath]: OrganizationApi.reducer,
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    [addExperienceApi.reducerPath]: addExperienceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      jobsApi.middleware,
      UserApi.middleware,
      UserAuthApi.middleware,
      OrganizationApi.middleware,
      addExperienceApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
