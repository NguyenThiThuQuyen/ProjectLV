import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPhieudatcho,
  createPhieudatcho,
  editPhieudatcho,
  deletePhieudatcho,
  getPhieudatcho,
  timPhieuTheoNgay,
  historyPhieudatcho,
} from "./services/phieudatchoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllPhieudatchoAPI = createAsyncThunk(
  "phieudatcho/GetAll",
  async () => {
    const getAllPhieu = await getAllPhieudatcho();
    return getAllPhieu;
  }
);

export const timPhieuTheoNgayAPI = createAsyncThunk(
  "phieudatcho/Timphieu",
  async (params) => {
    const timngay = await timPhieuTheoNgay(params);
    return timngay;
  }
);

export const historyPhieudatchoAPI = createAsyncThunk(
  "phieudatcho/TimLichSu",
  async (params) => {
    const timngay = await historyPhieudatcho(params);
    return timngay;
  }
);

export const getPhieudatchoAPI = createAsyncThunk(
  "phieudatcho/GetA",
  async (params) => {
    const geta = await getPhieudatcho(params);
    return geta;
  }
);

export const createPhieudatchoAPI = createAsyncThunk(
  "phieudatcho/Add",
  async (params) => {
    const create = await createPhieudatcho(params);
    return create;
  }
);

export const deletePhieudatchoAPI = createAsyncThunk(
  "phieudatcho/Delete",
  async (params) => {
    const XoaCV = await deletePhieudatcho(params);
    return XoaCV;
  }
);

export const editPhieudatchoAPI = createAsyncThunk(
  "phieudatcho/Edit",
  async (params) => {
    const edit = await editPhieudatcho(params);
    return edit;
  }
);

export const phieudatchoRedux = createSlice({
  name: "phieudatcho",
  initialState: {
    getAllPhieudatcho: {},
    getAPhieudatcho: {},
    getTimthieutheongay: {},
    getHistory: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(historyPhieudatchoAPI.fulfilled, (state, action) => {
      state.getHistory = action.payload;
      state.check = false;
    });

    builder.addCase(timPhieuTheoNgayAPI.fulfilled, (state, action) => {
      state.getTimthieutheongay = action.payload;
      state.check = false;
    });

    builder.addCase(getAllPhieudatchoAPI.fulfilled, (state, action) => {
      state.getAllPhieudatcho = action.payload;
      state.check = false;
    });

    builder.addCase(getPhieudatchoAPI.fulfilled, (state, action) => {
      state.getAPhieudatcho = action.payload;
      state.check = false;
    });

    builder.addCase(createPhieudatchoAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(deletePhieudatchoAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editPhieudatchoAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === 0) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});
export const dataGetAllPhieudatcho = (state) =>
  state.phieudatcho.getAllPhieudatcho;
export const dataGetAPhieudatcho = (state) => state.phieudatcho.getAPhieudatcho;
export const dataGetTimPhieutheongay = (state) =>
  state.phieudatcho.getTimthieutheongay;
export const dataHistoryPhieudatcho = (state) => state.phieudatcho.getHistory;
export const dataCheck = (state) => state.phieudatcho.check;

export default phieudatchoRedux.reducer;
