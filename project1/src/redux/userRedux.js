import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
  getAUser,
  getAllAllcodes,
  getAllDoctorHome,
} from "./services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllDoctorHomeAPI = createAsyncThunk(
  "datten/GetAllHome",
  async () => {
    const getHome = await getAllDoctorHome();
    return getHome;
  }
);

export const getAllUsersAPI = createAsyncThunk("datten/GetAll", async () => {
  const getAllCV = await getAllUsers();
  return getAllCV;
});

export const getAllGenderAPI = createAsyncThunk(
  "datten/Getgender",
  async () => {
    const getgender = await getAllAllcodes("GENDER");
    return getgender;
  }
);

export const getAllRoleAPI = createAsyncThunk("datten/Getrole", async () => {
  const getrole = await getAllAllcodes("ROLE");
  return getrole;
});

export const getAUserAPI = createAsyncThunk(
  "datten/GetAUser",
  async (params) => {
    const getauser = await getAUser(params);
    return getauser;
  }
);

export const addUserAPI = createAsyncThunk("datten/Add", async (params) => {
  const addUser = await createUser(params);
  return addUser;
});

export const deleteUserAPI = createAsyncThunk(
  "datten/Delete",
  async (params) => {
    const XoaCV = await deleteUser(params);
    return XoaCV;
  }
);

export const editUserAPI = createAsyncThunk("datten/Edit", async (params) => {
  const edit = await editUser(params);
  return edit;
});

export const UserRedux = createSlice({
  name: "datten",
  initialState: {
    getAllUser: {},
    getDoctorHome: {},
    getAllRole: {},
    getAllGender: {},
    getAUser: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDoctorHomeAPI.fulfilled, (state, action) => {
      state.getDoctorHome = action.payload;
      state.check = false;
    });

    builder.addCase(getAllUsersAPI.fulfilled, (state, action) => {
      state.getAllUser = action.payload;
      state.check = false;
    });

    builder.addCase(getAllRoleAPI.fulfilled, (state, action) => {
      state.getAllRole = action.payload;
      state.check = false;
    });

    builder.addCase(getAllGenderAPI.fulfilled, (state, action) => {
      state.getAllGender = action.payload;
      state.check = false;
    });

    builder.addCase(getAUserAPI.fulfilled, (state, action) => {
      state.getAUser = action.payload;
      state.check = false;
    });

    builder.addCase(addUserAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(deleteUserAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(editUserAPI.fulfilled, (state, action) => {
      state.check = true;
      if (action.payload.code === 0) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});
export const dataGetAllUser = (state) => state.datten.getAllUser;
export const dataGetAllRole = (state) => state.datten.getAllRole;
export const dataGetAllGender = (state) => state.datten.getAllGender;
export const dataGetAUser = (state) => state.datten.getAUser;
export const dataGetDoctorHome = (state) => state.datten.getDoctorHome;
export const dataCheck = (state) => state.datten.check;

export default UserRedux.reducer;
