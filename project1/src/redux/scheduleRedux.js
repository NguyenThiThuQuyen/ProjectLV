import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSchedule,
  createSchedule,
  editSchedule,
  deleteSchedule,
  getAllDoctor,
  getASchedule,
  getFindScheduleToDoctor,
  getFindTimeslot,
  getFindIdSchedule,
  getCountSchedule,
} from "./services/scheduleService";
import { toast } from "react-toastify";
export const getAllSchedulesAPI = createAsyncThunk(
  "lichtuvan/GetAll",
  async () => {
    const getAll = await getAllSchedule();
    return getAll;
  }
);

export const getAScheduleAPI = createAsyncThunk(
  "lichtuvan/GetLTV",
  async (params) => {
    const getltv = await getASchedule(params);
    return getltv;
  }
);

export const getCountScheduleAPI = createAsyncThunk(
  "lichtuvan/Getcount",
  async (params) => {
    const count = await getCountSchedule(params);
    return count;
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

export const getFindScheduleToDoctorAPI = createAsyncThunk(
  "lichtuvan/GetScheduleToDoctor",
  async (params) => {
    const getschedule = await getFindScheduleToDoctor(params);
    return getschedule;
  }
);

export const getFindTimeslotAPI = createAsyncThunk(
  "lichtuvan/Find",
  async (params) => {
    const find = await getFindTimeslot(params);
    return find;
  }
);

export const getFindIdScheduleAPI = createAsyncThunk(
  "lichtuvan/FindIdSchedule",
  async (params) => {
    const findId = await getFindIdSchedule(params);
    return findId;
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
    getSchedule: {},
    getDoctor: {},
    getFindSchedule: {},
    getFindTimeslotToDate: [],
    getFindIdScheduleToDetail: {},
    countSchedule: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSchedulesAPI.fulfilled, (state, action) => {
      state.getAllSchedule = action.payload;
      state.check = false;
    });

    builder.addCase(getCountScheduleAPI.fulfilled, (state, action) => {
      state.countSchedule = action.payload;
      state.check = false;
    });

    builder.addCase(getAScheduleAPI.fulfilled, (state, action) => {
      state.getSchedule = action.payload;
      state.check = false;
    });

    builder.addCase(getAllDoctorAPI.fulfilled, (state, action) => {
      state.getDoctor = action.payload;
      state.check = false;
    });

    builder.addCase(getFindScheduleToDoctorAPI.fulfilled, (state, action) => {
      state.getFindSchedule = action.payload;
      state.check = false;
    });

    builder.addCase(getFindTimeslotAPI.fulfilled, (state, action) => {
      state.getFindTimeslotToDate = action.payload;
      state.check = false;
    });

    builder.addCase(getFindIdScheduleAPI.fulfilled, (state, action) => {
      state.getFindIdScheduleToDetail = action.payload;
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
export const dataGetFindSchedule = (state) => state.lichtuvan.getFindSchedule;
export const dataGetFindTimeslot = (state) =>
  state.lichtuvan.getFindTimeslotToDate;
export const dataFindIdSchedule = (state) =>
  state.lichtuvan.getFindIdScheduleToDetail;
export const dataGetSchedule = (state) => state.lichtuvan.getSchedule;
export const dataCountSchedule = (state) => state.lichtuvan.countSchedule;
export const dataCheck = (state) => state.lichtuvan.check;
export default ScheduleRedux.reducer;
