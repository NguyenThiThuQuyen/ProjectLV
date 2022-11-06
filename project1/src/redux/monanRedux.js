import { circularProgressClasses } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllDishes,
  createDish,
  editDish,
  getDish,
  deleteDish,
  getFindDishToCate,
} from "./services/monanService";

export const getAllDishesAPI = createAsyncThunk("monan/GetAll", async () => {
  const getAllngayan = await getAllDishes();
  return getAllngayan;
});

export const getDishAPI = createAsyncThunk("monan/GetA", async (params) => {
  const getngayan = await getDish(params);
  return getngayan;
});

export const createDishAPI = createAsyncThunk("monan/Add", async (params) => {
  const add = await createDish(params);
  return add;
});

export const editDishAPI = createAsyncThunk("monan/Edit", async (params) => {
  const edit = await editDish(params);
  return edit;
});

export const deleteDishAPI = createAsyncThunk("monan/Del", async (params) => {
  const edit = await deleteDish(params);
  return edit;
});

export const getFindDishToCateAPI = createAsyncThunk(
  "monan/FindDish",
  async (params) => {
    const find = await getFindDishToCate(params);
    return find;
  }
);

export const MonAnRedux = createSlice({
  name: "monan",
  initialState: {
    allDishes: {},
    getADish: {},
    getFindDish: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDishesAPI.fulfilled, (state, action) => {
      state.allDishes = action.payload;
      state.check = false;
    });
    builder.addCase(getDishAPI.fulfilled, (state, action) => {
      state.getADish = action.payload;
      state.check = false;
    });

    builder.addCase(getFindDishToCateAPI.fulfilled, (state, action) => {
      state.getFindDish = action.payload;
      state.check = false;
    });

    builder.addCase(createDishAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(editDishAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteDishAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetFindDishToCate = (state) => state.monan.getFindDish;
export const dataAllDishes = (state) => state.monan.allDishes;
export const dataGetADish = (state) => state.monan.getADish;
export const dataCheck = (state) => state.monan.check;

export default MonAnRedux.reducer;
