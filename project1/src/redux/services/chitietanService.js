import axios from "axios";

const getFindEatDetailToDate = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/find-eat-detail-to-date`,
    body
  );
  return response.data;
};

const getCreateEatDetail = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-eat-detail`,
    body
  );
  return response.data;
};

export { getFindEatDetailToDate, getCreateEatDetail };
