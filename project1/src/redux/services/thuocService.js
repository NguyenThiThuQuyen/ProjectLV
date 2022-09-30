import axios from "axios";

const getAllThuoc = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-medicals`
  );
  return response.data;
};

const createThuoc = async (body) => {
  const response = await axios.post(
    `http://localhost:8081/api/create-new-medical`,
    body
  );
  return response.data;
};

const editThuoc = async (body) => {
  const response = await axios.put(
    `http://localhost:8081/api/edit-medical`,
    body
  );
  return response.data;
};

const deleteThuoc = async (id) => {
  const response = await axios.delete(
    `http://localhost:8081/api/delete-medical?id=${id}`
  );
  return response.data;
};

const getAllNhaCungCap = async () => {
  const response = await axios.get(`http://localhost:8081/api/get-all-ncc`);
  return response.data;
};

const getAllDonViTinh = async () => {
  const response = await axios.get(
    `http://localhost:8081/api/get-all-donvitinh`
  );
  return response.data;
};

export {
  getAllThuoc,
  createThuoc,
  editThuoc,
  deleteThuoc,
  getAllNhaCungCap,
  getAllDonViTinh,
};
