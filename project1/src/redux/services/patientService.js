import axios from "axios";

const getAllPatient = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-patients`
  );
  return response.data;
};

const getPatient = async (id) => {
  const patient = await axios.get(
    `http://localhost:8081/api/get-patient?id=${id}`
  );
  return patient.data;
};

const createPatient = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-patient`,
    body
  );
  return response.data;
};

const editPatient = async (body) => {
  const response = await axios.put(
    `http://localhost:8081/api/edit-patient`,
    body
  );
  return response.data;
};

const deletePatient = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-patients?id=${id}`
  );
  return response.data;
};

export { getAllPatient, getPatient, createPatient, editPatient, deletePatient };
