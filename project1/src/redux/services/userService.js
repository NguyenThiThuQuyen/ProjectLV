import axios from "axios";

const getAllUsers = async () => {
  const user = await axios.get(`http://localhost:8081/api/get-all-users`);
  return user.data;
};

const getAUser = async (id) => {
  const user = await axios.get(`http://localhost:8081/api/get-user?id=${id}`);
  return user.data;
};

const createUser = async (body) => {
  const create = await axios.post(
    `http://localhost:8081/api/create-new-user`,
    body
  );
  return create.data;
};

const editUser = async (body) => {
  const userEdit = await axios.put(`http://localhost:8081/api/edit-user`, body);
  return userEdit.data;
};

const deleteUser = async (id) => {
  const userDelete = await axios.delete(
    `http://localhost:8081/api/delete-user?id=${id}`
  );
  return userDelete.data;
};

const getAllAllcodes = async (inputType) => {
  const res = await axios.get(
    `http://localhost:8081/api/allcode?type=${inputType}`
  );
  return res.data;
};

const getAllDoctorHome = async () => {
  const res = await axios.get(`http://localhost:8081/api/all-doctor-home`);
  return res.data;
};

export {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
  getAUser,
  getAllAllcodes,
  getAllDoctorHome,
};
