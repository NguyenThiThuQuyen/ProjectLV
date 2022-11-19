import axios from "axios";

const getThongkeTheoTuan = async (week) => {
  const response = await axios.get(
    `http://localhost:8081/api/get-thongke-theo-tuan?week=${week}`
  );
  return response.data;
};

export { getThongkeTheoTuan };
