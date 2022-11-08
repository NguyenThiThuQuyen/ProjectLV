import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCaterogy } from "./services/danhmucmonanService";

export const getAllCaterogyAPI = createAsyncThunk(
  "danhmucmonan/GetAll",
  async () => {
    const getAll = await getAllCaterogy();
    return getAll;
  }
);

export const DanhMucMonAnRedux = createSlice({
  name: "danhmucmonan",
  initialState: {
    allCaterogy: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCaterogyAPI.fulfilled, (state, action) => {
      state.allCaterogy = action.payload;
      state.check = false;
    });
  },
});

export const dataGetAllCaterogy = (state) => state.danhmucmonan.allCaterogy;
export default DanhMucMonAnRedux.reducer;
