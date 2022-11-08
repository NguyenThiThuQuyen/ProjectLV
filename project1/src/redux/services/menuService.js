import axios from "axios";

const createMenu = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-menu-eatdetail`,
    body
  );
  return response.data;
};

const getFindMenuToPrescription = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/find-menu-to-prescription`,
    body
  );
  return response.data;
};

export { createMenu, getFindMenuToPrescription };
