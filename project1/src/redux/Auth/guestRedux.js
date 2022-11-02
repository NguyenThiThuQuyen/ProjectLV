import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLoginGuest } from "../services/guestService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getLoginGuestAPI = createAsyncThunk(
  "loginguest/GetAll",
  async (params) => {
    const log = await getLoginGuest(params);
    return log;
  }
);

export const GuestRedux = createSlice({
  name: "loginguest",
  initialState: {
    check: false,
    isLoginedGuest: "",
  },
  reducers: {
    logoutguest(state) {
      localStorage.removeItem("parent");
      state.isLoginedGuest = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginGuestAPI.fulfilled, (state, action) => {
      if (action.payload.code === 0) {
        localStorage.setItem(
          "parent",
          JSON.stringify(action.payload.parent ? action.payload.parent : false)
        );
        state.check = !state.check;
        state.isLoginedGuest = true;
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataCheck = (state) => state.loginguest.check;
export const dataCheck2 = (state) => state.loginguest.check;
export const dataCheckLogoutGuest = (state) => state.loginguest.isLoginedGuest;

export const { logoutguest } = GuestRedux.actions;

export default GuestRedux.reducer;
