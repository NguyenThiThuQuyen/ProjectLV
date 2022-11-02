import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLogin } from "../services/adminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const getLoginAPI = createAsyncThunk("login/GetAll", async (params) => {
  const log = await getLogin(params);
  return log;
});

export const AdminRedux = createSlice({
  name: "login",
  initialState: {
    check: false,
    isLoginedAdmin: "",
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      state.isLoginedAdmin = false;
      console.log("state.isLoginedAdmin", state.isLoginedAdmin);
    },

    // logout(state) {
    //   localStorage.clear();
    //   window.location.href = "/";
    //   state.isLoginedAdmin = false;
    //   console.log("state.isLoginedAdmin", state.isLoginedAdmin);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginAPI.fulfilled, (state, action) => {
      console.log("action.payload admin:", action.payload);
      if (action.payload.code === 0) {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user ? action.payload.user : false)
        );
        state.check = !state.check;
        state.isLoginedAdmin = true;
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataCheck = (state) => state.login.check;
export const dataCheckLogout = (state) => state.login.isLoginedAdmin;

export const { logout } = AdminRedux.actions;

export default AdminRedux.reducer;
