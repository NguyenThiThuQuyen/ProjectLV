import axios from "axios";

const getSearch = async () => {
  const response = await axios.get(`http://localhost:8081/api/search`);
  return response.data;
};

export { getSearch };
