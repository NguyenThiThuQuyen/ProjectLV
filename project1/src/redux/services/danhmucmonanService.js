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

export { getAllCaterogy, getFindCaterogy };
