import axios from "axios";

const getLogin = async (params) => {
  const response = await axios.post(`http://localhost:8081/api/login`, params);
  return response.data;
};

export { getLogin };
