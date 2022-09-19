import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllLoaiThuoc,
  createLoaiThuoc,
  editLoaiThuoc,
  deleteLoaiThuoc,
} from "./services/loaiThuocService";

export const getAllLoaiThuocAPI = createAsyncThunk(
  "loaithuoc/GetAll",
  async () => {
    const getAllLT = await getAllLoaiThuoc();
    return getAllLT;
  }
);

export const addLoaiThuocAPI = createAsyncThunk(
  "loaithuoc/Add",
  async (params) => {
    const addLT = await createLoaiThuoc(params);
    return addLT;
  }
);

export const editLoaiThuocAPI = createAsyncThunk(
  "loaithuoc/Edit",
  async (params) => {
    const edit = await editLoaiThuoc(params);
    return edit;
  }
);

export const deleteLoaiThuocAPI = createAsyncThunk(
  "loaithuoc/Delete",
  async (params) => {
    const delLT = await deleteLoaiThuoc(params);
    return delLT;
  }
);

export const LoaiThuocRedux = createSlice({
  name: "loaithuoc",
  initialState: {
    allLoaiThuoc: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLoaiThuocAPI.fulfilled, (state, action) => {
      state.allLoaiThuoc = action.payload;
      state.check = false;
    });
    builder.addCase(addLoaiThuocAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editLoaiThuocAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteLoaiThuocAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllLoaiThuoc = (state) => state.loaithuoc.allLoaiThuoc;
export const dataCheck = (state) => state.loaithuoc.check;
export default LoaiThuocRedux.reducer;
