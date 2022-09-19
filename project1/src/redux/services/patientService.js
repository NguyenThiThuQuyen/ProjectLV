import axios from "axios";

const getAllPatient = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-patients`
  );
  // console.log("object", response);
  return response.data;
};

const getPatient = async (id) => {
  const patient = await axios.get(
    `http://localhost:8081/api/get-patient?id=${id}`
  );
  // console.log("123:", patient);
  return patient.data;
};

const getAllParents = async () => {
  const parent = await axios.get(`http://localhost:8081/api/get-all-parents`);
  return parent.data;
};

const getAllGenders = async () => {
  const gender = await axios.get(`http://localhost:8081/api/get-all-genders`);
  return gender.data;
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

export {
  getAllPatient,
  getPatient,
  getAllParents,
  createPatient,
  editPatient,
  deletePatient,
  getAllGenders,
};
