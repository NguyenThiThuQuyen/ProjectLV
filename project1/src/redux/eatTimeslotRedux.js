import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllEatTimeslots,
  getAllFindEatTimeslotsToSession,
  getFindEatTimeslots,
} from "./services/eatTimeslotService";

export const getAllEatTimeslotsAPI = createAsyncThunk(
  "khunggioan/GetAll",
  async () => {
    const getkhunggioan = await getAllEatTimeslots();
    return getkhunggioan;
  }
);

export const getAllFindEatTimeslotsToSessionAPI = createAsyncThunk(
  "khunggioan/GetFind",
  async (params) => {
    const getfind = await getAllFindEatTimeslotsToSession(params);
    return getfind;
  }
);

export const getFindEatTimeslotsToEatDetailAPI = createAsyncThunk(
  "khunggioan/GetFindEat",
  async (params) => {
    const find = await getFindEatTimeslots(params);
    return find;
  }
);

export const EatTimeslotRedux = createSlice({
  name: "khunggioan",
  initialState: {
    allEatTimeslots: {},
    findEatTimeslots: {},
    findEatTimeslotsToEatDetail: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEatTimeslotsAPI.fulfilled, (state, action) => {
      state.allEatTimeslots = action.payload;
      state.check = false;
    });

    builder.addCase(
      getAllFindEatTimeslotsToSessionAPI.fulfilled,
      (state, action) => {
        state.findEatTimeslots = action.payload;
        state.check = false;
      }
    );

    builder.addCase(
      getFindEatTimeslotsToEatDetailAPI.fulfilled,
      (state, action) => {
        state.findEatTimeslotsToEatDetail = action.payload;
        state.check = false;
      }
    );
  },
});

export const dataGetAllEatTimeslot = (state) =>
  state.khunggioan.allEatTimeslots;
export const dataGetAllFindEatTimeslotsToSession = (state) =>
  state.khunggioan.findEatTimeslots;
export const dataGetFindEatTimeslotsToEatDetail = (state) =>
  state.khunggioan.findEatTimeslotsToEatDetail;
export const dataCheck = (state) => state.khunggioan.check;
export default EatTimeslotRedux.reducer;
