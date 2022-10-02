import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSchedule,
  createSchedule,
  editSchedule,
  deleteSchedule,
  getAllDoctor,
} from "./services/scheduleService";
import { toast } from "react-toastify";
export const getAllSchedulesAPI = createAsyncThunk(
  "lichtuvan/GetAll",
  async () => {
    const getAll = await getAllSchedule();
    return getAll;
  }
);

export const getAllDoctorAPI = createAsyncThunk(
  "lichtuvan/Getpatient",
  async (params) => {
    const getdoctor = await getAllDoctor(params);
    return getdoctor;
  }
);

export const createScheduleAPI = createAsyncThunk(
  "lichtuvan/Add",
  async (params) => {
    const add = await createSchedule(params);
    return add;
  }
);

export const deleteScheduleAPI = createAsyncThunk(
  "lichtuvan/Delete",
  async (params) => {
    const XoaSchedule = await deleteSchedule(params);
    return XoaSchedule;
  }
);

export const editScheduleAPI = createAsyncThunk(
  "lichtuvan/Edit",
  async (params) => {
    const edit = await editSchedule(params);
    return edit;
  }
);

export const ScheduleRedux = createSlice({
  name: "lichtuvan",
  initialState: {
    getAllSchedule: {},
    getDoctor: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSchedulesAPI.fulfilled, (state, action) => {
      state.getAllSchedule = action.payload;
      state.check = false;
    });

    builder.addCase(getAllDoctorAPI.fulfilled, (state, action) => {
      state.getDoctor = action.payload;
      state.check = false;
    });

    builder.addCase(createScheduleAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(deleteScheduleAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(editScheduleAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});
export const dataGetAllSchedule = (state) => state.lichtuvan.getAllSchedule;
export const dataGetDoctor = (state) => state.lichtuvan.getDoctor;
export const dataCheck = (state) => state.lichtuvan.check;
export default ScheduleRedux.reducer;
