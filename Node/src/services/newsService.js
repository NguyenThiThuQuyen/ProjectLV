const db = require("../models/index");

let getAllNews = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let news = {};
      news = await db.New.findAll({
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      resolve(news);
    } catch (e) {
      reject(e);
    }
  });
};

let getNews = (newsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let news = "";
      if (newsId && newsId !== "ALL") {
        news = await db.New.findOne({
          where: { id: newsId },

          raw: true,
          nest: true,
        });
      }
      resolve(news);
    } catch (e) {
      reject(e);
    }
  });
};

let createNews = (data) => {
  console.log("data:", data);
  return new Promise(async (resolve, reject) => {
    try {
      await db.New.create({
        name: data.name,
        mota: data.mota,
        image: data.image,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
      });
      resolve({
        code: 0,
        message: "Thêm thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateNews = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          code: 2,
          message: "err",
        });
      } else {
        let news = await db.New.findOne({
          where: { id: data.id },
        });
        if (news) {
          news.name = data.name;
          news.mota = data.mota;
          news.image = data.image;
          news.contentHTML = data.contentHTML;
          news.contentMarkdown = data.contentMarkdown;
          await news.save();
          resolve({
            code: 0,
            message: "Cập nhật thành công!",
          });
        } else {
          resolve({
            code: 1,
            message: `Không tìm thấy tin tức!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteNews = (newsId) => {
  return new Promise(async (resolve, reject) => {
    let news = await db.New.findOne({
      where: { id: newsId },
    });
    if (!news) {
      resolve({
        code: 2,
        message: `Gói khám không tồn tại! `,
      });
    }
    await db.New.destroy({
      where: { id: newsId },
    });
    resolve({
      code: 0,
      message: `Xóa gói khám thành công!`,
    });
  });
};

module.exports = {
  getAllNews: getAllNews,
  getNews: getNews,
  createNews: createNews,
  updateNews: updateNews,
  deleteNews: deleteNews,
};
