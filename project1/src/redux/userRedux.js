import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
  getAllGenders,
  getAllRoles,
  getAUser,
} from "./services/userService";
import { toast } from "react-toastify";

export const getAllRolesAPI = createAsyncThunk(
  "datten/GetAllRoles",
  async () => {
    const getRole = await getAllRoles();
    return getRole;
  }
);

export const getAllGendersAPI = createAsyncThunk(
  "datten/GetAllGenders",
  async () => {
    const getGender = await getAllGenders();
    return getGender;
  }
);

export const getAllUsersAPI = createAsyncThunk("datten/GetAll", async () => {
  const getAllCV = await getAllUsers();
  return getAllCV;
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
    getAUser: {},
    allRoles: {},
    allGenders: {},
    check: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRolesAPI.fulfilled, (state, action) => {
      state.allRoles = action.payload;
      state.check = false;
    });

    builder.addCase(getAllGendersAPI.fulfilled, (state, action) => {
      state.allGenders = action.payload;
      state.check = false;
    });

    builder.addCase(getAllUsersAPI.fulfilled, (state, action) => {
      state.getAllUser = action.payload;
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
      if (action.payload.code == "0") {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});
export const dataGetAllUser = (state) => state.datten.getAllUser;
export const dataGetAUser = (state) => state.datten.getAUser;
export const dataGetAllRole = (state) => state.datten.allRoles;
export const dataGetAllGender = (state) => state.datten.allGenders;
export const dataCheck = (state) => state.datten.check;

export default UserRedux.reducer;
