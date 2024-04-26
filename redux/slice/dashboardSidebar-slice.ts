import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: dashboardSidebarState;
};
type dashboardSidebarState = {
  isOpenSidebar: boolean;
};

const initialState = {
  value: {
    isOpenSidebar: false,
  } as dashboardSidebarState,
} as InitialState;

export const mobileMenu = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state, action: PayloadAction) => {
      return {
        value: {
          isOpenSidebar: true,
        },
      };
    },
    closeSidebar: (state, action: PayloadAction) => {
      return {
        value: {
          isOpenSidebar: false,
        },
      };
    },
  },
});

export const { openSidebar, closeSidebar } = mobileMenu.actions;
export default mobileMenu.reducer;
