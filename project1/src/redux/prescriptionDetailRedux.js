import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPrescriptionDetail,
  getAllPrescriptionsDetail,
  deletePrescriptionsDetail,
} from "./services/prescriptionDetailService";
import { toast } from "react-toastify";

export const createPrescriptionDetailAPI = createAsyncThunk(
  "chitiettoathuoc/Add",
  async (params) => {
    const create = await createPrescriptionDetail(params);
    return create;
  }
);

export const deletePrescriptionsDetailAPI = createAsyncThunk(
  "chitiettoathuoc/Del",
  async (params) => {
    const del = await deletePrescriptionsDetail(params);
    return del;
  }
);

export const getAllPrescriptionsDetailAPI = createAsyncThunk(
  "chitiettoathuoc/GetAll",
  async (params) => {
    const create = await getAllPrescriptionsDetail(params);
    return create;
  }
);

export const PrescriptionDetailRedux = createSlice({
  name: "chitiettoathuoc",
  initialState: {
    allPrescriptionsDetail: [],
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPrescriptionsDetailAPI.fulfilled, (state, action) => {
      state.allPrescriptionsDetail = action.payload;
      state.check = false;
    });

    builder.addCase(createPrescriptionDetailAPI.fulfilled, (state, action) => {
      state.check = true;
      console.log("action:", action);
      if (action.payload.chitiet.code == "0") {
        toast.success(action.payload.chitiet.message);
      } else {
        toast.error(action.payload.chitiet.message);
      }
    });

    builder.addCase(deletePrescriptionsDetailAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllPrescriptionsDetail = (state) =>
  state.chitiettoathuoc.allPrescriptionsDetail;
export const dataCheck = (state) => state.chitiettoathuoc.check;

export default PrescriptionDetailRedux.reducer;
