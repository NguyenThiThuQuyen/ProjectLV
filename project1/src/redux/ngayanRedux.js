import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllEatDates } from "./services/ngayanService";

export const getAllEatDatesAPI = createAsyncThunk(
  "ngayan/GetAll",
  async (params) => {
    const getAllngayan = await getAllEatDates(params);
    return getAllngayan;
  }
);

export const NgayAnRedux = createSlice({
  name: "ngayan",
  initialState: {
    allEatDates: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEatDatesAPI.fulfilled, (state, action) => {
      state.allEatDates = action.payload;
      state.check = false;
    });
  },
});

export const dataAllEatDates = (state) => state.ngayan.allEatDates;
export default NgayAnRedux.reducer;
