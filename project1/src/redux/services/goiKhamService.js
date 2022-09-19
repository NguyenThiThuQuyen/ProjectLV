import axios from "axios";

const getAllGoiKham = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-medicalpackages`
  );
  return response.data;
};

const createGoiKham = async (body) => {
  const create = await axios.post(
    `http://localhost:8081/api/create-new-medicalpackage`,
    body
  );
  return create.data;
};

const editGoiKham = async (body) => {
  const userEdit = await axios.put(
    `http://localhost:8081/api/edit-medicalpackage`,
    body
  );
  return userEdit.data;
};

const deleteGoiKham = async (id) => {
  const userDelete = await axios.delete(
    `http://localhost:8081/api/delete-medicalpackage?id=${id}`
  );
  return userDelete.data;
};

export { getAllGoiKham, createGoiKham, editGoiKham, deleteGoiKham };
