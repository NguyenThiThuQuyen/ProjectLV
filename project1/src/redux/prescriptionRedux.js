import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPrescription,
  createPrescription,
  findIdPhieuDatChoPrescription,
  editPrescription,
  getFindPrescription,
} from "./services/prescriptionService";
import { toast } from "react-toastify";

export const getPrescriptionAPI = createAsyncThunk(
  "toathuoc/GetLTV",
  async (params) => {
    const getltv = await getPrescription(params);
    return getltv;
  }
);

export const getFindPrescriptionAPI = createAsyncThunk(
  "toathuoc/GetFindPh",
  async (params) => {
    const getltv = await getFindPrescription(params);
    return getltv;
  }
);

export const editPrescriptionAPI = createAsyncThunk(
  "toathuoc/EditH",
  async (params) => {
    const editHd = await editPrescription(params);
    return editHd;
  }
);

export const createPrescriptionAPI = createAsyncThunk(
  "toathuoc/Add",
  async (params) => {
    const create = await createPrescription(params);
    return create;
  }
);

export const findIdPhieuDatChoPrescriptionAPI = createAsyncThunk(
  "toathuoc/FindId",
  async (params) => {
    const find = await findIdPhieuDatChoPrescription(params);
    return find;
  }
);

export const PrescriptionRedux = createSlice({
  name: "toathuoc",
  initialState: {
    getAPrescription: {},
    getFindIdPhieu: {},
    getFindAllInforToathuoc: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrescriptionAPI.fulfilled, (state, action) => {
      state.getAPrescription = action.payload;
      state.check = false;
    });

    builder.addCase(getFindPrescriptionAPI.fulfilled, (state, action) => {
      state.getFindAllInforToathuoc = action.payload;
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

    builder.addCase(editPrescriptionAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetPrescription = (state) => state.toathuoc.getAPrescription;
export const datagetFindIdPhieuDatCho = (state) =>
  state.toathuoc.getFindIdPhieu;
export const dataGetFindPrescription = (state) =>
  state.toathuoc.getFindAllInforToathuoc;
export default PrescriptionRedux.reducer;
