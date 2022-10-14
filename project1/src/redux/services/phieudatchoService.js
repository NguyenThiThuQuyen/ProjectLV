import axios from "axios";

const getAllPhieudatcho = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-phieudatcho`
  );
  return response.data;
};

const getPhieudatcho = async (id) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-phieudatcho?id=${id}`
  );
  return response.data;
};

const createPhieudatcho = async (body) => {
  const create = await axios.post(
    `http://localhost:8081/api/create-new-phieudatcho`,
    body
  );
  return create.data;
};

const editPhieudatcho = async (body) => {
  const edit = await axios.put(
    `http://localhost:8081/api/edit-phieudatcho`,
    body
  );
  return edit.data;
};

// const deleteUser = async (id) => {
//   const userDelete = await axios.delete(
//     `http://localhost:8081/api/delete-user?id=${id}`
//   );
//   return userDelete.data;
// };

export {
  getAllPhieudatcho,
  createPhieudatcho,
  editPhieudatcho,
  //   deletePhieudatcho,
  getPhieudatcho,
};