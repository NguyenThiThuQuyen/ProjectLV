import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BiSearch } from "react-icons/bi";
import { BsPersonCheck } from "react-icons/bs";
import hinh1 from "../assets/upload/h1.png";
import hinh2 from "../assets/upload/h2.png";
import hinh3 from "../assets/upload/h3.png";
import hinh4 from "../assets/upload/h4.png";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search/Search.js";
import ReactPaginate from "react-paginate";
import "./Admin/Pagination.css";

// import { getSearchAPI, dataGetSearch } from "../redux/searchRedux";
import {
  dataGetDoctorHome,
  getAllDoctorHomeAPI,
  getAUserAPI,
  dataCheck,
} from "../redux/userRedux";

import SearchImport from "../components/Search/SearchImport";
const AllDocTorHome = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [paging, setPaging] = useState();
  const [search, setSearch] = useState([]);
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetDoctorHome);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctorHomeAPI("ALL"));
  }, [check]);

  const handleDetail = (userId) => {
    navigate(`/detail-doctor/${userId}`);
    dispatch(getAUserAPI(userId));
  };

  useEffect(() => {
    if (data?.data) {
      setPaging(data?.data?.slice(0, 10));
    }
  }, [data]);

  const perPage = 8;
  const pagesVisited = pageNumber * perPage;

  const displayAllDoctor =
    paging &&
    paging?.length > 0 &&
    paging?.slice(pagesVisited, pagesVisited + perPage).map((item) => {
      let imageBase64 = "";
      if (item.image) {
        imageBase64 = new Buffer(item.image, "base64").toString("binary");
      }

      return (
        <>
          <div className="col-span-1 mx-5 my-12" key={item.id}>
            <div className="w-full hover:bg-slate-100 bg-white border h-[340px] border-green-300 shadow-2xl shadow-slate-300 relative">
              <div
                className="w-full mt-5"
                onClick={() => handleDetail(item.id)}
              >
                <img
                  src={imageBase64}
                  alt=""
                  className="h-52 w-52 pt-5 rounded-full mx-auto"
                />
              </div>
              <div className="w-full absolute">
                <div className="w-5/6 mx-auto mt-5 bg-sky-100 border shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200">
                  <div
                    onClick={() => handleDetail(item.id)}
                    className="text-center mt-5 text-md font-medium uppercase"
                  >
                    {item.name}
                  </div>
                  <div
                    onClick={() => handleDetail(item.id)}
                    className="text-center px-4 text-sm text-slate-500"
                  >
                    Chuy??n khoa Nhi
                  </div>
                  <div
                    className="hover:bg-green-800 mt-5 grid justify-items-center bg-green-700"
                    onClick={() => handleDetail(item.id)}
                  >
                    <button className="hover:bg-green-800 mx-5 py-3 px-5 box-border border-1 bg-green-700 text-white">
                      <div className="flex hover:animate-bounce">
                        <BsPersonCheck className="mr-1" size={25} />
                        ?????T L???CH NGAY
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });

  const pageCount = Math.ceil(data?.data?.length / perPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="h-screen">
      <Header />
      <SearchImport />
      <div className="w-full">
        <div className="w-3/4 mb-5 mx-auto">
          <div className="my-10 text-center font-medium text-green-700 text-2xl">
            Tr???i nghi???m t?? v???n hi???n ?????i c??ng Children's Care
          </div>
          <div className="grid row-auto">
            <div className="grid grid-cols-4">
              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh1} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    ?????t kh??m t??? xa
                  </div>
                  <div className="text-slate-600 mt-3">
                    B??c s?? c???a Children's Care lu??n s???n s??ng t?? v???n v?? ch??m s??c
                    s???c kh???e cho b???n m???i l??c m???i n??i
                  </div>
                </div>
              </div>

              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh2} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    ?????i ng?? chuy??n gia v?? c?? s??? y t??? h??ng ?????u
                  </div>
                  <div className="text-slate-600 mt-3">
                    D??? d??ng k???t n???i v???i c??c b??c s?? ??u t??, t???n t??m, c?? chuy??n m??n
                    cao ?????n t??? c??c BV tuy???n trung ????ng & ph??ng kh??m uy t??n
                  </div>
                </div>
              </div>

              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh3} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    Ti???p ????n ??u ti??n v???i nhi???u quy???n l???i ?????c bi???t
                  </div>
                  <div className="text-slate-600 mt-3">
                    ?????t kh??m h???n tr?????c t???i ph??ng kh??m t?? v???n c??ng nhi???u ?????c
                    quy???n d??nh ri??ng cho b???n v?? gia ????nh
                  </div>
                </div>
              </div>

              <div className="col-span-1 px-4">
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100">
                  <img src={hinh4} alt="" className="h-32 w-28 pt-5 mx-auto" />
                </div>
                <div className="text-center mt-5">
                  <div className="font-medium text-lg text-sky-600 h-[60px]">
                    Gi?? kh??m b???ng v???i gi?? t???i c?? s??? y t???
                  </div>
                  <div className="text-slate-600 mt-3">
                    Kh??ng nh???ng v???y c??n gi??p b???n ti???t ki???m th???i gian v?? c??c chi
                    ph?? ph??t sinh kh??c
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-32 bg-red-50">
        <div className="w-5/6 mx-auto pt-10">
          <div className="font-semibold text-xl uppercase text-sky-700">
            Ch???n b??c s??
          </div>
          <div className="grid grid-cols-4">
            {displayAllDoctor}
            <div className="w-full px-10 py-3">
              <ReactPaginate
                previousLabel={"Tr?????c"}
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

      <Footer />
    </div>
  );
};

export default AllDocTorHome;
