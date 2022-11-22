import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearch } from "./services/searchService";
import { toast } from "react-toastify";

export const getSearchAPI = createAsyncThunk("timkiem/Get", async () => {
  const search = await getSearch();
  return search;
});

export const SearchRedux = createSlice({
  name: "timkiem",
  initialState: {
    getASearch: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchAPI.fulfilled, (state, action) => {
      state.getASearch = action.payload;
    });
  },
});

export const dataGetSearch = (state) => state.timkiem.getASearch;
export default SearchRedux.reducer;
