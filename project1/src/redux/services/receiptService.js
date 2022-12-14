import axios from "axios";

const createReceipt = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-receipt`,
    body
  );
  return response.data;
};

const getReceipt = async (receipt) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-a-receipt?id=${receipt}`
  );
  return response.data;
};

const getFindReservationReceipt = async (reservationTicketId) => {
  const response = await axios.get(
    `http://localhost:8081/api/find-all-phieudatcho-in-receipt?reservationTicketId=${reservationTicketId}`
  );
  return response.data;
};

export { createReceipt, getReceipt, getFindReservationReceipt };
