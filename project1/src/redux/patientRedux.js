import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPatient,
  createPatient,
  editPatient,
  deletePatient,
  getPatient,
} from "./services/patientService";
import { toast } from "react-toastify";

export const getAllPatientsAPI = createAsyncThunk(
  "patient/GetAll",
  async () => {
    const getAll = await getAllPatient();
    return getAll;
  }
);

export const getPatientAPI = createAsyncThunk(
  "patient/Getpatient",
  async (params) => {
    const getpatient = await getPatient(params);
    return getpatient;
  }
);

export const addPatientAPI = createAsyncThunk("patient/Add", async (params) => {
  const addPatient = await createPatient(params);
  return addPatient;
});

export const deletePatientAPI = createAsyncThunk(
  "patient/Delete",
  async (params) => {
    const XoaPatient = await deletePatient(params);
    return XoaPatient;
  }
);

export const editPatientAPI = createAsyncThunk(
  "patient/Edit",
  async (params) => {
    const edit = await editPatient(params);
    return edit;
  }
);

export const PatientRedux = createSlice({
  name: "patient",
  initialState: {
    getAllPatient: {},
    getAPatient: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPatientsAPI.fulfilled, (state, action) => {
      state.getAllPatient = action.payload;
      state.check = false;
    });

    builder.addCase(getPatientAPI.fulfilled, (state, action) => {
      state.getAPatient = action.payload;
      state.check = false;
    });

    builder.addCase(addPatientAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(deletePatientAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(editPatientAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});
export const dataGetAllPatient = (state) => state.patient.getAllPatient;
export const dataGetPatient = (state) => state.patient.getAPatient;
export const dataCheck = (state) => state.patient.check;
export default PatientRedux.reducer;
