import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllCaterogy,
  getFindCaterogy,
  createCategory,
  editCategory,
  deleteCategory,
} from "./services/danhmucmonanService";

export const getAllCaterogyAPI = createAsyncThunk(
  "danhmucmonan/GetAll",
  async () => {
    const getAll = await getAllCaterogy();
    return getAll;
  }
);

export const getFindCaterogyInMenuIdAPI = createAsyncThunk(
  "danhmucmonan/GetFind",
  async (params) => {
    const getAll = await getFindCaterogy(params);
    return getAll;
  }
);

export const createCategoryAPI = createAsyncThunk(
  "danhmucmonan/Add",
  async (params) => {
    const add = await createCategory(params);
    return add;
  }
);

export const editCategoryAPI = createAsyncThunk(
  "danhmucmonan/Edit",
  async (params) => {
    const edit = await editCategory(params);
    return edit;
  }
);

export const deleteCategoryAPI = createAsyncThunk(
  "danhmucmonan/Delete",
  async (params) => {
    const del = await deleteCategory(params);
    return del;
  }
);

export const DanhMucMonAnRedux = createSlice({
  name: "danhmucmonan",
  initialState: {
    allCaterogy: {},
    findCateInMenuId: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCaterogyAPI.fulfilled, (state, action) => {
      state.allCaterogy = action.payload;
      state.check = false;
    });

    builder.addCase(getFindCaterogyInMenuIdAPI.fulfilled, (state, action) => {
      state.findCateInMenuId = action.payload;
      state.check = false;
    });

    builder.addCase(createCategoryAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editCategoryAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteCategoryAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllCaterogy = (state) => state.danhmucmonan.allCaterogy;
export const dataGetFindCaterogyInMenuId = (state) =>
  state.danhmucmonan.findCateInMenuId;
export const dataCheck = (state) => state.danhmucmonan.check;
export default DanhMucMonAnRedux.reducer;
