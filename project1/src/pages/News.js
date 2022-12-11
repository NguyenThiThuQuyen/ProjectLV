import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import hinh1 from "../assets/upload/new1.bb081b99.jpg";
import hinh2 from "../assets/upload/new2.6ba3e73f.jpg";
import hinh3 from "../assets/upload/new3.428dc3ad.jpg";
import "./Admin/Pagination.css";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { TbBellRinging } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getSearchAPI, dataGetSearch } from "../redux/searchRedux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ReactPaginate from "react-paginate";
import { getAllNewsAPI, dataGetAllNews, getNewsAPI } from "../redux/newsRedux";
import SearchImport from "../components/Search/SearchImport";
import { display } from "@mui/system";

const News = () => {
  const [search, setSearch] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [paging, setPaging] = useState();
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllNews);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllNewsAPI());
  }, []);

  useEffect(() => {
    if (data?.news) {
      setPaging(data?.news?.slice(0, 10));
    }
  }, [data]);

  const handleDetail = (newsId) => {
    navigate(`/detail-news/${newsId}`);
    dispatch(getNewsAPI(newsId));
  };

  const perPage = 4;
  const pagesVisited = pageNumber * perPage;

  const displayService =
    paging &&
    paging?.length > 0 &&
    paging?.slice(pagesVisited, pagesVisited + perPage).map((item) => {
      let imageBase64 = "";
      if (item.image) {
        imageBase64 = new Buffer(item.image, "base64").toString("binary");
      }
      return (
        <div className="">
          <div className="bg-white hover:text-white hover:bg-blue-300 my-10 border-solid border border-slate-200 shadow-xl shadow-slate-300 items-center justify-items-center h-auto mx-auto w-9/12">
            <div className="grid grid-cols-3 justify-items-center">
              <div
                className="col-span-1 my-5"
                onClick={() => handleDetail(item.id)}
              >
                <img src={imageBase64} alt="" className="h-[150px] w-[200px]" />
              </div>
              <div className="col-span-2 w-full mt-5 pr-3">
                <div
                  className="font-medium text-green-800 uppercase"
                  onClick={() => handleDetail(item.id)}
                >
                  {item.name}
                </div>
                <div className="text-sm" onClick={() => handleDetail(item.id)}>
                  {item.mota}
                </div>
                <div
                  className="uppercase underline underline-offset-8 mt-5 font-medium text-sky-700 hover:text-rose-800 cursor-pointer"
                  onClick={() => handleDetail(item.id)}
                >
                  xem thêm
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(data?.news?.length / perPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="h-screen ">
      <Header />
      <SearchImport />

      <div className="grid row-auto">
        <div className="grid grid-cols-3 overflow-x-hidden">
          <div className="col-span-3">
            <div className="p-5">
              <div className="border-[1px] shadow-xl bg-violet-100">
                <div className="px-5 py-3 text-green-700 text-xl font-semibold">
                  TIN TỨC
                </div>

                {displayService}
                <div className="w-full px-10 py-3">
                  <ReactPaginate
                    previousLabel={"Trước"}
                    nextLabel={"Sau"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
