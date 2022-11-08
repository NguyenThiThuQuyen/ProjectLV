import axios from "axios";

const getAllCaterogy = async (bod) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-categories`
  );
  return response.data;
};

export { getAllCaterogy };
