import axios from "axios";

const getLoginGuest = async (params) => {
  const response = await axios.post(
    `http://localhost:8081/api/login-parent`,
    params
  );
  return response.data;
};

export { getLoginGuest };
