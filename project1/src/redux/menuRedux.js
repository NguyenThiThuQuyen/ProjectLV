import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createMenu, getFindMenuToPrescription } from "./services/menuService";

export const createMenuAPI = createAsyncThunk("thucdon/Add", async (params) => {
  const add = await createMenu(params);
  return add;
});

export const getFindMenuToPrescriptionAPI = createAsyncThunk(
  "thucdon/Find",
  async (params) => {
    const getfind = await getFindMenuToPrescription(params);
    return getfind;
  }
);

export const MenuRedux = createSlice({
  name: "thucdon",
  initialState: {
    getFindMenu: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMenuAPI.fulfilled, (state, action) => {
      state.check = true;
      console.log("action: ", action);
      if (action.payload.code == "0") {
        toast.success(action.payload.menu.message);
      } else {
        toast.error(action.payload.menu.message);
      }
    });

    builder.addCase(getFindMenuToPrescriptionAPI.fulfilled, (state, action) => {
      state.getFindMenu = action.payload;
      state.check = false;
    });
  },
});
export const dataGetFindMenuToPrescription = (state) =>
  state.thucdon.getFindMenu;
export default MenuRedux.reducer;
