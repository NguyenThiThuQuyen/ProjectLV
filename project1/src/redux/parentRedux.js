import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllParents,
  createParent,
  editParent,
  deleteParent,
  getAllGenders,
} from "./services/parentService";

export const getAllGendersAPI = createAsyncThunk(
  "parent/GetAllGenders",
  async () => {
    const getGender = await getAllGenders();
    return getGender;
  }
);

export const getAllParentsAPI = createAsyncThunk("parent/GetAll", async () => {
  const getParent = await getAllParents();
  return getParent;
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
    allGenders: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllParentsAPI.fulfilled, (state, action) => {
      state.allParent = action.payload;
      state.check = false;
    });

    builder.addCase(getAllGendersAPI.fulfilled, (state, action) => {
      state.allGenders = action.payload;
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
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteParentAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllParent = (state) => state.parent.allParent;
export const dataGetAllGender = (state) => state.parent.allGenders;
export const dataCheck = (state) => state.parent.check;
export default ParentRedux.reducer;
