import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPrescriptionDetail,
  getAllPrescriptionsDetail,
  deletePrescriptionsDetail,
  getPrescriptionsDetail,
  getFindPrescriptionsDetail,
} from "./services/prescriptionDetailService";
import { toast } from "react-toastify";

export const getFindPrescriptionsDetailAPI = createAsyncThunk(
  "chitiettoathuoc/FindPres",
  async (params) => {
    const find = await getFindPrescriptionsDetail(params);
    return find;
  }
);

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

export const getPrescriptionsDetailAPI = createAsyncThunk(
  "chitiettoathuoc/GetA",
  async (params) => {
    const geta = await getPrescriptionsDetail(params);
    console.log("geta:", geta);
    return geta;
  }
);

export const PrescriptionDetailRedux = createSlice({
  name: "chitiettoathuoc",
  initialState: {
    allPrescriptionsDetail: [],
    aPrescriptionsDetail: [],
    timPrescriptionsDetail: [],
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getFindPrescriptionsDetailAPI.fulfilled,
      (state, action) => {
        state.timPrescriptionsDetail = action.payload;
        state.check = false;
      }
    );

    builder.addCase(getAllPrescriptionsDetailAPI.fulfilled, (state, action) => {
      state.allPrescriptionsDetail = action.payload;
      state.check = false;
    });

    builder.addCase(getPrescriptionsDetailAPI.fulfilled, (state, action) => {
      state.aPrescriptionsDetail = action.payload;
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
export const dataGetPrescriptionsDetail = (state) =>
  state.chitiettoathuoc.aPrescriptionsDetail;
export const dataGetFindPrescriptionsDetail = (state) =>
  state.chitiettoathuoc.timPrescriptionsDetail;
export const dataCheck = (state) => state.chitiettoathuoc.check;

export default PrescriptionDetailRedux.reducer;
