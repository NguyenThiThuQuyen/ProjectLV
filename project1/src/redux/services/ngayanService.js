import axios from "axios";

const getAllEatDates = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/get-all-eatdates`,
    body
  );
  return response.data;
};

export { getAllEatDates };
