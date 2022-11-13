import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllCaterogy,
  getFindCaterogy,
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
  },
});

export const dataGetAllCaterogy = (state) => state.danhmucmonan.allCaterogy;
export const dataGetFindCaterogyInMenuId = (state) =>
  state.danhmucmonan.findCateInMenuId;
export default DanhMucMonAnRedux.reducer;
