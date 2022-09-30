import axios from "axios";

const getAllParents = async () => {
  const parent = await axios.get(`http://localhost:8081/api/get-all-parents`);
  return parent.data;
};

const createParent = async (body) => {
  const create = await axios.post(
    `http://localhost:8081/api/create-new-parent`,
    body
  );
  return create.data;
};

const editParent = async (body) => {
  const userEdit = await axios.put(
    `http://localhost:8081/api/edit-parent`,
    body
  );
  return userEdit.data;
};

const deleteParent = async (id) => {
  const parentDelete = await axios.delete(
    `http://localhost:8081/api/delete-parent?id=${id}`
  );
  return parentDelete.data;
};

export { getAllParents, createParent, editParent, deleteParent };
