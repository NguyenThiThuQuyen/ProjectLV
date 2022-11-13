import axios from "axios";

const getAllSessions = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-sessions`
  );
  return response.data;
};

export { getAllSessions };
