import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearch, getSearchAdmin } from "./services/searchService";
import { toast } from "react-toastify";

export const getSearchAPI = createAsyncThunk("timkiem/Get", async () => {
  const search = await getSearch();
  return search;
});

export const getSearchAdminAPI = createAsyncThunk(
  "timkiem/GetAdmin",
  async () => {
    const search = await getSearchAdmin();
    return search;
  }
);

export const SearchRedux = createSlice({
  name: "timkiem",
  initialState: {
    getASearch: [],
    getASearchAdmin: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchAPI.fulfilled, (state, action) => {
      state.getASearch = action.payload;
    });
    builder.addCase(getSearchAdminAPI.fulfilled, (state, action) => {
      state.getASearchAdmin = action.payload;
    });
  },
});

export const dataGetSearch = (state) => state.timkiem.getASearch;
export const dataGetSearchAdmin = (state) => state.timkiem.getASearchAdmin;
export default SearchRedux.reducer;
