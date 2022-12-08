import axios from "axios";

const getPrescription = async (id) => {
  const geta = await axios.get(
    `http://localhost:8081/api/get-prescription?id=${id}`
  );
  return geta.data;
};

const createPrescription = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-prescription`,
    body
  );
  return response.data;
};

const findIdPhieuDatChoPrescription = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/find-id-phieudatcho-in-prescription`,
    body
  );
  return response.data;
};

const editPrescription = async (body) => {
  const edit = await axios.put(
    `http://localhost:8081/api/edit-prescription`,
    body
  );
  return edit.data;
};

const getFindPrescription = async (reservationTicketId) => {
  const geta = await axios.get(
    `http://localhost:8081/api/find-prescription?reservationTicketId=${reservationTicketId}`
  );
  return geta.data;
};

export {
  getPrescription,
  createPrescription,
  findIdPhieuDatChoPrescription,
  editPrescription,
  getFindPrescription,
};
