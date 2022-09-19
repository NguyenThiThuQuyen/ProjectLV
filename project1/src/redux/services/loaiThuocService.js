import axios from "axios";

const getAllLoaiThuoc = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-medicaltypes`
  );
  return response.data;
};

const createLoaiThuoc = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-medicaltype`,
    body
  );
  return response.data;
};

const editLoaiThuoc = async (body) => {
  const response = await axios.put(
    `http://localhost:8081/api/edit-medicaltype`,
    body
  );
  return response.data;
};

const deleteLoaiThuoc = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-medicaltype?id=${id}`
  );
  return response.data;
};

export { getAllLoaiThuoc, createLoaiThuoc, editLoaiThuoc, deleteLoaiThuoc };
