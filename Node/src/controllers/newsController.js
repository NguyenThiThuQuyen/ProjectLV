const newsService = require("../services/newsService");

let handleGetAllNews = async (req, res) => {
  let news = await newsService.getAllNews();
  return res.status(200).json({
    code: 0,
    message: "success",
    news,
  });
};

let handleGetNews = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing required parmeters",
      news: [],
    });
  }
  let news = await newsService.getNews(id);
  return res.status(200).json({
    code: 0,
    message: "Ok",
    news,
  });
};

let handleCreateNews = async (req, res) => {
  let data = await newsService.createNews(req.body);
  console.log("data:", data);
  return res.status(200).json(data);
};

let handleEditNews = async (req, res) => {
  let data = req.body;
  let message = await newsService.updateNews(data);
  return res.status(200).json(message);
};

let handleDeleteNews = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      code: 1,
      message: "Error deleting",
    });
  }
  let message = await newsService.deleteNews(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllNews: handleGetAllNews,
  handleGetNews: handleGetNews,
  handleCreateNews: handleCreateNews,
  handleEditNews: handleEditNews,
  handleDeleteNews: handleDeleteNews,
};
