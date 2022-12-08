import axios from "axios";

const getAllCaterogy = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-categories`
  );
  return response.data;
};

const getFindCaterogy = async (menuId) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-find-category-in-menuId?menuId=${menuId}`
  );
  return response.data;
};

const createCategory = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-category`,
    body
  );
  return response.data;
};

const editCategory = async (body) => {
  const response = await axios.put(
    `http://localhost:8081/api/edit-category`,
    body
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-category?id=${id}`
  );
  return response.data;
};

export {
  getAllCaterogy,
  getFindCaterogy,
  createCategory,
  editCategory,
  deleteCategory,
};
