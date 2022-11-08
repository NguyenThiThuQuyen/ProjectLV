import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getFindEatDetailToDate,
  getCreateEatDetail,
} from "./services/chitietanService";

export const getFindEatDetailToDateAPI = createAsyncThunk(
  "chitietan/Find",
  async (params) => {
    const findId = await getFindEatDetailToDate(params);
    return findId;
  }
);

export const getCreateEatDetailAPI = createAsyncThunk(
  "Create/Find",
  async (params) => {
    const create = await getCreateEatDetail(params);
    return create;
  }
);

export const ChiTietAnRedux = createSlice({
  name: "chitietan",
  initialState: {
    getFindEatDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFindEatDetailToDateAPI.fulfilled, (state, action) => {
      state.getFindEatDetail = action.payload;
      state.check = false;
    });

    builder.addCase(getCreateEatDetailAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const DataGetFindEatDetailToDate = (state) =>
  state.chitietan.getFindEatDetail;
export default ChiTietAnRedux.reducer;
