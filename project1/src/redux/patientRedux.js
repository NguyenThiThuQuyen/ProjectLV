import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPatient,
  createPatient,
  editPatient,
  deletePatient,
  getAllGenders,
  getAllParents,
  getPatient,
} from "./services/patientService";
import { toast } from "react-toastify";

export const getAllGendersAPI = createAsyncThunk(
  "patient/GetAllGenders",
  async () => {
    const getGender = await getAllGenders();
    return getGender;
  }
);

export const getAllParentsAPI = createAsyncThunk(
  "patient/GetAllParent",
  async () => {
    const getParent = await getAllParents();
    // console.log("getParent:", getParent);
    return getParent;
  }
);

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
    // console.log("object11:", getpatient);
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
    allGenders: {},
    getAllParents: {},
    getAPatient: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGendersAPI.fulfilled, (state, action) => {
      state.allGenders = action.payload;
      state.check = false;
    });

    builder.addCase(getAllParentsAPI.fulfilled, (state, action) => {
      state.allGenders = action.payload;
      state.check = false;
    });

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
  },
});
export const dataGetAllPatient = (state) => state.patient.getAllPatient;
export const dataGetPatient = (state) => state.patient.getAPatient;
export const dataGetAllParent = (state) => state.patient.getAllParents;
export const dataGetAllGender = (state) => state.patient.allGenders;
export const dataCheck = (state) => state.patient.check;
export default PatientRedux.reducer;
