import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getThongkeTheoTuan,
  getThongkeDoanhthu,
} from "./services/thongkeService";

export const getThongkeTheoTuanAPI = createAsyncThunk(
  "thongke/TK",
  async (params) => {
    const add = await getThongkeTheoTuan(params);
    return add;
  }
);

export const getThongkeDoanhthuAPI = createAsyncThunk(
  "thongke/TKDoanhthu",
  async (params) => {
    const add = await getThongkeDoanhthu(params);
    return add;
  }
);

export const ThongkeRedux = createSlice({
  name: "thongke",
  initialState: {
    thongketheotuan: {},
    thongkedoanhthu: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getThongkeTheoTuanAPI.fulfilled, (state, action) => {
      state.thongketheotuan = action.payload;
    });

    builder.addCase(getThongkeDoanhthuAPI.fulfilled, (state, action) => {
      console.log("action", action);
      state.thongkedoanhthu = action?.payload?.res1?.data;
    });
  },
});

export const dataGetThongkeTheoTuan = (state) => state.thongke.thongketheotuan;
export const dataGetThongkeDoanhThu = (state) => state.thongke.thongkedoanhthu;
export default ThongkeRedux.reducer;
