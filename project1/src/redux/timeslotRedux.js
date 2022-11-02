import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllTimeslot,
  createTimeslot,
  editTimeslot,
  deleteTimeslot,
  getATimeslot,
} from "./services/timeslotService";
export const getAllTimeslotAPI = createAsyncThunk(
  "khunggio/GetAll",
  async () => {
    const getkhunggio = await getAllTimeslot();
    return getkhunggio;
  }
);

export const getATimeslotAPI = createAsyncThunk(
  "khunggio/GetA",
  async (params) => {
    const getauser = await getATimeslot(params);
    return getauser;
  }
);

export const createTimeslotAPI = createAsyncThunk(
  "khunggio/Add",
  async (params) => {
    const add = await createTimeslot(params);
    return add;
  }
);

export const editTimeslotAPI = createAsyncThunk(
  "khunggio/Edit",
  async (params) => {
    const edit = await editTimeslot(params);
    return edit;
  }
);

export const deleteTimeslotAPI = createAsyncThunk(
  "khunggio/Delete",
  async (params) => {
    const del = await deleteTimeslot(params);
    return del;
  }
);

export const TimeslotRedux = createSlice({
  name: "khunggio",
  initialState: {
    allTimeslot: {},
    aTimeslot: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTimeslotAPI.fulfilled, (state, action) => {
      state.allTimeslot = action.payload;
      state.check = false;
    });
    builder.addCase(getATimeslotAPI.fulfilled, (state, action) => {
      state.aTimeslot = action.payload;
      state.check = false;
    });
    builder.addCase(createTimeslotAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editTimeslotAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteTimeslotAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const datagetAllTimeslot = (state) => state.khunggio.allTimeslot;
export const dataGetATimeslot = (state) => state.khunggio.aTimeslot;
export const dataCheck = (state) => state.khunggio.check;
export default TimeslotRedux.reducer;
