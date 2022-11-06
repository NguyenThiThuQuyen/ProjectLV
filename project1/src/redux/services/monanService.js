import axios from "axios";

const getAllDishes = async () => {
  const response = await axios.get(`http://localhost:8081/api/get-all-dishes`);
  return response.data;
};

const getDish = async (id) => {
  const dish = await axios.get(`http://localhost:8081/api/get-dish?id=${id}`);
  return dish.data;
};

const createDish = async (body) => {
  const create = await axios.post(
    `http://localhost:8081/api/create-new-dish`,
    body
  );
  return create.data;
};

const editDish = async (body) => {
  const edit = await axios.put(`http://localhost:8081/api/edit-dish`, body);
  return edit.data;
};

const deleteDish = async (id) => {
  const del = await axios.delete(
    `http://localhost:8081/api/delete-dish?id=${id}`
  );
  return del.data;
};

const getFindDishToCate = async (id) => {
  const response = await axios.get(
    `http://localhost:8081/api/find-dish-to-cate?id=${id}`
  );
  return response.data;
};

export {
  getAllDishes,
  createDish,
  editDish,
  getDish,
  deleteDish,
  getFindDishToCate,
};
