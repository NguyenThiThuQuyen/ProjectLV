import axios from "axios";

const getAllDoctor = async () => {
  const response = await axios.get(`http://localhost:8081/api/get-doctor`);
  return response.data;
};

const getAllSchedule = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-schedules`
  );
  return response.data;
};

const createSchedule = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-schedule`,
    body
  );
  return response.data;
};

const editSchedule = async (body) => {
  const response = await axios.put(
    `http://localhost:8081/api/edit-schedule`,
    body
  );
  return response.data;
};

const deleteSchedule = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-schedule?id=${id}`
  );
  return response.data;
};

export {
  getAllSchedule,
  createSchedule,
  editSchedule,
  deleteSchedule,
  getAllDoctor,
};
