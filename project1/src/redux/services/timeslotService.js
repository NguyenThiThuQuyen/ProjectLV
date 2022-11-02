import axios from "axios";

const getAllTimeslot = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-timeslots`
  );
  return response.data;
};

const createTimeslot = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-timeslot`,
    body
  );
  return response.data;
};

const editTimeslot = async (body) => {
  const response = await axios.put(
    `http://localhost:8081/api/edit-timeslot`,
    body
  );
  return response.data;
};

const deleteTimeslot = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-timeslot?id=${id}`
  );
  return response.data;
};

const getATimeslot = async (id) => {
  const timeslot = await axios.get(
    `http://localhost:8081/api/get-timeslot?id=${id}`
  );
  return timeslot.data;
};

export {
  getAllTimeslot,
  createTimeslot,
  editTimeslot,
  deleteTimeslot,
  getATimeslot,
};
