const searchService = require("../services/searchService");

let handleSearch = async (req, res) => {
  let search = await searchService.getSearch();
  return res.status(200).json({
    code: 0,
    message: "success",
    search,
  });
};

module.exports = {
  handleSearch: handleSearch,
};
