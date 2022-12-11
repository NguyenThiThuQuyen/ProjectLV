import axios from "axios";

const getAllNews = async () => {
  const response = await axios.get(`http://localhost:8081/api/get-all-news`);
  return response.data;
};

const getNews = async (id) => {
  const user = await axios.get(`http://localhost:8081/api/get-news?id=${id}`);
  return user.data;
};

const createNews = async (body) => {
  const create = await axios.post(
    `http://localhost:8081/api/create-news`,
    body
  );
  return create.data;
};

const editNews = async (body) => {
  const userEdit = await axios.put(`http://localhost:8081/api/edit-news`, body);
  return userEdit.data;
};

const deleteNews = async (id) => {
  const userDelete = await axios.delete(
    `http://localhost:8081/api/delete-news?id=${id}`
  );
  return userDelete.data;
};

export { createNews, editNews, getAllNews, getNews, deleteNews };
