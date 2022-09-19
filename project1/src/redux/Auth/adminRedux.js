import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLogin } from "../services/adminService";

export const getLoginAPI = createAsyncThunk("login/GetAll", async (params) => {
  const log = await getLogin(params);
  return log;
});

export const AdminRedux = createSlice({
  name: "login",
  initialState: {
    check: false,
  },
  reducers: {
    // logout(state) {
    //   localStorage.removeItem("user");
    //   // toast.success("Đã đăng xuất");
    // },

    logout() {
      localStorage.clear();
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginAPI.fulfilled, (state, action) => {
      // console.log("ádasd", action.payload.user);
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user ? action.payload.user : false)
      );
      state.check = !state.check;
    });
  },
});

export const dataCheck = (state) => state.login.check;
export const { logout } = AdminRedux.actions;

export default AdminRedux.reducer;
