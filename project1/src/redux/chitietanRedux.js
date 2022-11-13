import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getFindEatDetailToDate,
  getCreateEatDetail,
  getFindEatDate,
  deleteEatDetail,
} from "./services/chitietanService";

export const getFindEatDetailToDateAPI = createAsyncThunk(
  "chitietan/Find",
  async (params) => {
    const findId = await getFindEatDetailToDate(params);
    return findId;
  }
);

export const getFindEatDateAPI = createAsyncThunk(
  "chitietan/FindDate",
  async (params) => {
    const find = await getFindEatDate(params);
    return find;
  }
);

export const getCreateEatDetailAPI = createAsyncThunk(
  "chitietan/Create",
  async (params) => {
    const create = await getCreateEatDetail(params);
    return create;
  }
);

export const deleteEatDetailAPI = createAsyncThunk(
  "chitietan/Delete",
  async (params) => {
    const del = await deleteEatDetail(params);
    return del;
  }
);

export const ChiTietAnRedux = createSlice({
  name: "chitietan",
  initialState: {
    getFindEatDetail: {},
    findEatDate: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFindEatDetailToDateAPI.fulfilled, (state, action) => {
      state.getFindEatDetail = action.payload;
      state.check = false;
    });

    builder.addCase(getFindEatDateAPI.fulfilled, (state, action) => {
      state.findEatDate = action.payload;
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

    builder.addCase(deleteEatDetailAPI.fulfilled, (state, action) => {
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
export const DataGetFindEatDate = (state) => state.chitietan.findEatDate;
export default ChiTietAnRedux.reducer;
