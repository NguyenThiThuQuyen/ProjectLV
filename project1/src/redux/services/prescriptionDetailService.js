import axios from "axios";

const createPrescriptionDetail = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-prescription-detail`,
    body
  );
  return response.data;
};

const getAllPrescriptionsDetail = async (prescriptionId) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-prescriptions-detail?prescriptionId=${prescriptionId}`
  );
  return response.data;
};

const deletePrescriptionsDetail = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-prescription-detail?id=${id}`
  );
  return response.data;
};

const getPrescriptionsDetail = async (id) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-prescription-detail?id=${id}`
  );
  return response.data;
};

export {
  createPrescriptionDetail,
  getAllPrescriptionsDetail,
  getPrescriptionsDetail,
  deletePrescriptionsDetail,
};
