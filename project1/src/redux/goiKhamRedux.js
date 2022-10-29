import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllGoiKham,
  createGoiKham,
  editGoiKham,
  deleteGoiKham,
  getAllMedicalPackaheHome,
  getGoiKham,
  getAllMedicalPackaheHomeAll,
} from "./services/goiKhamService";

export const getAllMedicalPackaheHomeAPI = createAsyncThunk(
  "goikham/GetAllHome",
  async () => {
    const getAllHome = await getAllMedicalPackaheHome();
    return getAllHome;
  }
);

export const getAllMedicalPackageHomeAllAPI = createAsyncThunk(
  "goikham/GetAllHomeAll",
  async () => {
    const getAllHomeAll = await getAllMedicalPackaheHomeAll();
    return getAllHomeAll;
  }
);

export const getGoiKhamAPI = createAsyncThunk(
  "goikham/GetGK",
  async (params) => {
    const getgoikham = await getGoiKham(params);
    return getgoikham;
  }
);

export const getAllGoiKhamAPI = createAsyncThunk("goikham/GetAll", async () => {
  const getAllGK = await getAllGoiKham();
  return getAllGK;
});

export const addGoiKhamAPI = createAsyncThunk("goikham/Add", async (params) => {
  const addGK = await createGoiKham(params);
  return addGK;
});

export const editGoiKhamAPI = createAsyncThunk(
  "goikham/Edit",
  async (params) => {
    const edit = await editGoiKham(params);
    return edit;
  }
);

export const deleteGoiKhamAPI = createAsyncThunk(
  "goikham/Delete",
  async (params) => {
    const XoaCV = await deleteGoiKham(params);
    return XoaCV;
  }
);

export const GoiKhamRedux = createSlice({
  name: "goikham",
  initialState: {
    allGoiKham: {},
    getAGoiKham: {},
    allGoiKhamHome: {},
    allGoiKhamHomeAll: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMedicalPackaheHomeAPI.fulfilled, (state, action) => {
      state.allGoiKhamHome = action.payload;
      state.check = false;
    });
    builder.addCase(
      getAllMedicalPackageHomeAllAPI.fulfilled,
      (state, action) => {
        state.allGoiKhamHomeAll = action.payload;
        state.check = false;
      }
    );
    builder.addCase(getGoiKhamAPI.fulfilled, (state, action) => {
      state.getAGoiKham = action.payload;
      state.check = false;
    });
    builder.addCase(getAllGoiKhamAPI.fulfilled, (state, action) => {
      state.allGoiKham = action.payload;
      state.check = false;
    });
    builder.addCase(addGoiKhamAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editGoiKhamAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteGoiKhamAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllGoiKham = (state) => state.goikham.allGoiKham;
export const dataGetGoiKham = (state) => state.goikham.getAGoiKham;
export const dataGetAllGoiKhamHome = (state) => state.goikham.allGoiKhamHome;
export const dataGetAllGoiKhamHomeAll = (state) =>
  state.goikham.allGoiKhamHomeAll;
export const dataCheck = (state) => state.goikham.check;
export default GoiKhamRedux.reducer;
