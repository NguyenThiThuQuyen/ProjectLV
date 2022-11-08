import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPrescription,
  createPrescription,
  findIdPhieuDatChoPrescription,
} from "./services/prescriptionService";
import { toast } from "react-toastify";

export const getPrescriptionAPI = createAsyncThunk(
  "hoadon/GetLTV",
  async (params) => {
    const getltv = await getPrescription(params);
    return getltv;
  }
);

export const createPrescriptionAPI = createAsyncThunk(
  "hoadon/Add",
  async (params) => {
    const create = await createPrescription(params);
    return create;
  }
);

export const findIdPhieuDatChoPrescriptionAPI = createAsyncThunk(
  "hoadon/FindId",
  async (params) => {
    const find = await findIdPhieuDatChoPrescription(params);
    return find;
  }
);

export const PrescriptionRedux = createSlice({
  name: "hoadon",
  initialState: {
    getAPrescription: {},
    getFindIdPhieu: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrescriptionAPI.fulfilled, (state, action) => {
      state.getAPrescription = action.payload;
      state.check = false;
    });

    builder.addCase(
      findIdPhieuDatChoPrescriptionAPI.fulfilled,
      (state, action) => {
        state.getFindIdPhieu = action.payload;
        state.check = false;
      }
    );

    builder.addCase(createPrescriptionAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetPrescription = (state) => state.hoadon.getAPrescription;
export const datagetFindIdPhieuDatCho = (state) => state.hoadon.getFindIdPhieu;
export default PrescriptionRedux.reducer;
