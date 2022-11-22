import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createReceipt, getReceipt } from "./services/receiptService";
import { toast } from "react-toastify";

export const createReceiptAPI = createAsyncThunk(
  "hoadon/Add",
  async (params) => {
    const create = await createReceipt(params);
    return create;
  }
);

export const getReceiptAPI = createAsyncThunk("hoadon/Geta", async (params) => {
  const getahoadon = await getReceipt(params);
  return getahoadon;
});

export const ReceiptRedux = createSlice({
  name: "hoadon",
  initialState: {
    getAReceipt: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReceiptAPI.fulfilled, (state, action) => {
      state.getAReceipt = action.payload;
    });

    builder.addCase(createReceiptAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAReceipt = (state) => state.hoadon.getAReceipt;
export const dataCheck = (state) => state.hoadon.check;
export default ReceiptRedux.reducer;
