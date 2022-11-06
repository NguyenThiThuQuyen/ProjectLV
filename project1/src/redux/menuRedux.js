import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createMenu } from "./services/menuService";

export const createMenuAPI = createAsyncThunk("thucdon/Add", async (params) => {
  const add = await createMenu(params);
  return add;
});

export const MenuRedux = createSlice({
  name: "thucdon",
  initialState: {
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMenuAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export default MenuRedux.reducer;
