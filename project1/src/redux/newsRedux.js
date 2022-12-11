import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createNews,
  editNews,
  getAllNews,
  getNews,
  deleteNews,
} from "./services/newsService";

export const getNewsAPI = createAsyncThunk("tintuc/GetGK", async (params) => {
  const getnews = await getNews(params);
  return getnews;
});

export const getAllNewsAPI = createAsyncThunk("tintuc/GetAll", async () => {
  const getAllGK = await getAllNews();
  return getAllGK;
});

export const createNewsAPI = createAsyncThunk("tintuc/Add", async (params) => {
  const addGK = await createNews(params);
  return addGK;
});

export const editNewsAPI = createAsyncThunk("tintuc/Edit", async (params) => {
  const edit = await editNews(params);
  return edit;
});

export const deleteNewsAPI = createAsyncThunk(
  "tintuc/Delete",
  async (params) => {
    const XoaCV = await deleteNews(params);
    return XoaCV;
  }
);

export const NewsRedux = createSlice({
  name: "goikham",
  initialState: {
    allNews: {},
    getANews: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsAPI.fulfilled, (state, action) => {
      state.getANews = action.payload;
      state.check = false;
    });
    builder.addCase(getAllNewsAPI.fulfilled, (state, action) => {
      state.allNews = action.payload;
      state.check = false;
    });
    builder.addCase(createNewsAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == 0) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editNewsAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == 0) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });

    builder.addCase(deleteNewsAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});

export const dataGetAllNews = (state) => state.tintuc.allNews;
export const dataGetNews = (state) => state.tintuc.getANews;
export const dataCheck = (state) => state.tintuc.check;
export default NewsRedux.reducer;
