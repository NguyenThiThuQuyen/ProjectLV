import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllThuoc,
  createThuoc,
  editThuoc,
  deleteThuoc,
  getAllNhaCungCap,
  getAllDonViTinh,
} from "./services/thuocService";

export const getAllThuocAPI = createAsyncThunk("thuoc/GetAll", async () => {
  const getThuoc = await getAllThuoc();
  return getThuoc;
});

export const addThuocAPI = createAsyncThunk("thuoc/Add", async (params) => {
  const add = await createThuoc(params);
  return add;
});

export const editThuocAPI = createAsyncThunk("thuoc/Edit", async (params) => {
  const edit = await editThuoc(params);
  return edit;
});

export const deleteThuocAPI = createAsyncThunk(
  "thuoc/Delete",
  async (params) => {
    const del = await deleteThuoc(params);
    return del;
  }
);

export const getAllNhaCungCapAPI = createAsyncThunk(
  "thuoc/GetAllncc",
  async () => {
    const getAllncc = await getAllNhaCungCap();
    return getAllncc;
  }
);

export const getAllDonViTinhAPI = createAsyncThunk(
  "thuoc/GetAlldvt",
  async () => {
    const getAlldvt = await getAllDonViTinh();
    return getAlldvt;
  }
);

export const ThuocRedux = createSlice({
  name: "thuoc",
  initialState: {
    allThuoc: {},
    allNhacungcap: {},
    allDovitinh: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNhaCungCapAPI.fulfilled, (state, action) => {
      state.allNhacungcap = action.payload;
      state.check = false;
    });

    builder.addCase(getAllDonViTinhAPI.fulfilled, (state, action) => {
      state.allDovitinh = action.payload;
      state.check = false;
    });

    builder.addCase(getAllThuocAPI.fulfilled, (state, action) => {
      state.allThuoc = action.payload;
      state.check = false;
    });
    builder.addCase(addThuocAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editThuocAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteThuocAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllThuoc = (state) => state.thuoc.allThuoc;
export const dataGetAllNhacungcap = (state) => state.thuoc.allNhacungcap;
export const dataGetAllDovitinh = (state) => state.thuoc.allDovitinh;
export const dataCheckThuoc = (state) => state.thuoc.check;
export default ThuocRedux.reducer;
