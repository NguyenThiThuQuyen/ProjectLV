import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllSessions } from "./services/sessionService";
export const getAllSessionsAPI = createAsyncThunk("buoian/GetAll", async () => {
  const getbuoian = await getAllSessions();
  return getbuoian;
});

export const SessionRedux = createSlice({
  name: "buoian",
  initialState: {
    allSession: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSessionsAPI.fulfilled, (state, action) => {
      state.allSession = action.payload;
      state.check = false;
    });
  },
});

export const dataGetAllSessions = (state) => state.buoian.allSession;
export const dataCheck = (state) => state.buoian.check;
export default SessionRedux.reducer;
