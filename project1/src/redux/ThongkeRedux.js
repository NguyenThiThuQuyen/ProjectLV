import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getThongkeTheoTuan } from "./services/thongkeService";

export const getThongkeTheoTuanAPI = createAsyncThunk(
  "thongke/TK",
  async (params) => {
    const add = await getThongkeTheoTuan(params);
    return add;
  }
);

export const ThongkeRedux = createSlice({
  name: "thongke",
  initialState: {
    thongketheotuan: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getThongkeTheoTuanAPI.fulfilled, (state, action) => {
      state.thongketheotuan = action.payload;
    });
  },
});

export const dataGetThongkeTheoTuan = (state) => state.thongke.thongketheotuan;
export default ThongkeRedux.reducer;
