import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllParents,
  createParent,
  editParent,
  deleteParent,
  getAParent,
  getFindAllPatient,
} from "./services/parentService";

export const getFindAllPatientAPI = createAsyncThunk(
  "parent/GetFind",
  async (params) => {
    const getFind = await getFindAllPatient(params);
    return getFind;
  }
);

export const getAllParentsAPI = createAsyncThunk("parent/GetAll", async () => {
  const getParent = await getAllParents();
  return getParent;
});

export const getAParentAPI = createAsyncThunk("parent/GetA", async (params) => {
  const geta = await getAParent(params);
  return geta;
});

export const addParentAPI = createAsyncThunk("parent/Add", async (params) => {
  const add = await createParent(params);
  return add;
});

export const editParentAPI = createAsyncThunk("parent/Edit", async (params) => {
  const edit = await editParent(params);
  return edit;
});

export const deleteParentAPI = createAsyncThunk(
  "parent/Delete",
  async (params) => {
    const del = await deleteParent(params);
    return del;
  }
);

export const ParentRedux = createSlice({
  name: "thuoc",
  initialState: {
    allParent: {},
    aParent: {},
    findAllPatient: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFindAllPatientAPI.fulfilled, (state, action) => {
      state.findAllPatient = action.payload;
      state.check = false;
    });

    builder.addCase(getAllParentsAPI.fulfilled, (state, action) => {
      state.allParent = action.payload;
      state.check = false;
    });

    builder.addCase(getAParentAPI.fulfilled, (state, action) => {
      state.aParent = action.payload;
      state.check = false;
    });

    builder.addCase(addParentAPI.fulfilled, (state, action) => {
      state.check = true;
      // state.idParent = action.payload.parent.id.id;
      localStorage.setItem(
        "id",
        JSON.stringify(
          action.payload.parent.id.id ? action.payload.parent.id.id : false
        )
      );
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editParentAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteParentAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllParent = (state) => state.parent.allParent;
export const dataGetFindPatient = (state) => state.parent.findAllPatient;
export const dataGetAParent = (state) => state.parent.aParent;
export const dataCheck = (state) => state.parent.check;
export default ParentRedux.reducer;
