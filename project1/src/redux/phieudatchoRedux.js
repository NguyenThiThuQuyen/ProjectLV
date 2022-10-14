import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPhieudatcho,
  createPhieudatcho,
  editPhieudatcho,
  //   deletePhieudatcho,
  getPhieudatcho,
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

// export const deleteUserAPI = createAsyncThunk(
//   "phieudatcho/Delete",
//   async (params) => {
//     const XoaCV = await deleteUser(params);
//     return XoaCV;
//   }
// );

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
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
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
    // builder.addCase(deleteUserAPI.fulfilled, (state, action) => {
    //   state.check = true;
    //   if (action.payload.code == "0") {
    //     toast.success(action.payload.message);
    //   } else {
    //     toast.error(action.payload.message);
    //   }
    // });
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
export const dataCheck = (state) => state.phieudatcho.check;

export default phieudatchoRedux.reducer;
