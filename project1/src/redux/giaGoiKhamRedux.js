// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import {
//   getAllGiaGoiKham,
//   createGiaGoiKham,
// } from "./services/giaGoiKhamService";

// export const getAllGiaGoiKhamAPI = createAsyncThunk(
//   "giagoikham/GetAll",
//   async () => {
//     const getAllGK = await getAllGiaGoiKham();
//     return getAllGK;
//   }
// );

// export const addGiaGoiKhamAPI = createAsyncThunk(
//   "giagoikham/Add",
//   async (params) => {
//     const addGK = await createGiaGoiKham(params);
//     return addGK;
//   }
// );

// export const GiaGoiKhamRedux = createSlice({
//   name: "giagoikham",
//   initialState: {
//     allGiaGoiKham: {},
//     check: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getAllGiaGoiKhamAPI.fulfilled, (state, action) => {
//       state.allGiaGoiKham = action.payload;
//       state.check = false;
//     });
//     builder.addCase(addGiaGoiKhamAPI.fulfilled, (state, action) => {
//       state.check = true;
//       if (action.payload.code === "0") {
//         toast.success(action.payload.message);
//       } else {
//         toast.error(action.payload.message);
//       }
//     });
//   },
// });

// export const dataGetAllGiaGoiKham = (state) => state.giagoikham.allGiaGoiKham;
// export const dataCheck = (state) => state.giagoikham.check;
// export default GiaGoiKhamRedux.reducer;
