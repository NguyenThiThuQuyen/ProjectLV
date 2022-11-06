import axios from "axios";

const getAllEatDates = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-eatdates`
  );
  return response.data;
};

export { getAllEatDates };
