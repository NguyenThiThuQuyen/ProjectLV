import axios from "axios";

const getAllDoctor = async () => {
  const response = await axios.get(`http://localhost:8081/api/get-doctor`);
  return response.data;
};

const getASchedule = async (id) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-schedule?id=${id}`
  );
  return response.data;
};

const getCountSchedule = async (id) => {
  const response = await axios.get(
    `http://localhost:8081/api/count-schedule?id=${id}`
  );
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

const getFindTimeslot = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/find-timeslot-to-date`,
    body
  );
  return response.data;
};

const getFindIdSchedule = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/find-id-schedule`,
    body
  );
  console.log("respose ne he:", response.data);
  return response.data;
};

const deleteSchedule = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-schedule?id=${id}`
  );
  return response.data;
};

const getFindScheduleToDoctor = async (id) => {
  const response = await axios.get(
    `http://localhost:8081/api/find-schedule-to-doctor?id=${id}`
  );
  return response.data;
};

export {
  getAllSchedule,
  createSchedule,
  editSchedule,
  deleteSchedule,
  getAllDoctor,
  getASchedule,
  getFindScheduleToDoctor,
  getFindTimeslot,
  getFindIdSchedule,
  getCountSchedule,
};
