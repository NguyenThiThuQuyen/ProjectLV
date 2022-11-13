import axios from "axios";

const getAllEatTimeslots = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-eat-timeslots`
  );
  return response.data;
};

const getAllFindEatTimeslotsToSession = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/get-find-all-eattimeslots-to-sessions`,
    body
  );
  return response.data;
};

const getFindEatTimeslots = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/find-eat-timeslot`,
    body
  );
  return response.data;
};

export {
  getAllEatTimeslots,
  getAllFindEatTimeslotsToSession,
  getFindEatTimeslots,
};
