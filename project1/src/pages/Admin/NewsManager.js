import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NewsModal from "../../components/Admin/Modal/News/NewsModal";
import NewsEditModal from "../../components/Admin/Modal/News/NewsEditModal";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BsPlusLg, BsSearch, BsThreeDots } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllNewsAPI,
  getNewsAPI,
  dataGetAllNews,
  dataCheck,
  deleteNewsAPI,
} from "../../redux/newsRedux";

const NewsManager = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllNews);
  console.log("data:", data);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllNewsAPI());
  }, [check]);

  const handleDelete = (id) => {
    dispatch(deleteNewsAPI(id));
  };

  const handleDetail = (newsId) => {
    navigate(`/manager/news-detail-manager/${newsId}`);
    dispatch(getNewsAPI(newsId));
  };

  const handleNewsModal = () => {
    setShowModal(true);
  };

  const handleDong = (test) => {
    setShowModal(test);
  };

  const handleMoLai = (data) => {
    setShowModal(data);
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ToastContainer />
          <div className="mt-4 ml-5">
            <div className="ml-5 flex justify-start">
              <div className="flex items-center border border-scale-200 p-1 rounded">
                <input
                  className="border-0 outline-0 bg-transparent"
                  type="text"
                  placeholder="Tìm kiếm..."
                />
                <BsSearch />
              </div>
            </div>
            <div className="flex">
              <div className="ml-6 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                  onClick={() => handleNewsModal()}
                >
                  <BsPlusLg className="mr-2 mt-1 text-teal-700" />
                  Thêm tin tức
                </button>
                <div className="">
                  {showModal === true ? (
                    <NewsModal
                      openModal={showModal}
                      handleClose={handleDong}
                      handleMo={handleMoLai}
                    />
                  ) : (
                    <>
                      <div className=""></div>
                    </>
                  )}
                </div>
              </div>
              <div className="ml-8 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                >
                  <ImDownload3 className="mr-2 mt-1 text-teal-700" />
                  Xuất excel
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tiêu đề tin
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Mô tả ngắn
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Ảnh đại diện
                  </th> */}
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Điện Thoại
                  </th> */}

                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.news &&
                  data.news.length > 0 &&
                  data.news.map((item, index) => {
                    let imageBase64 = "";
                    if (item?.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.mota}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <img
                            src={imageBase64}
                            alt=""
                            className="rounded-full"
                            style={{ height: "70px", width: "70px" }}
                          />
                        </td> */}

                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className=""
                              onClick={() => handleDetail(item.id)}
                            >
                              <BsThreeDots className="cursor-pointer text-lg text-green-700" />
                            </div>
                            <div className="mr-5" title="Sửa">
                              <NewsEditModal item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDelete(item.id)}
                            >
                              <RiDeleteBinLine className="cursor-pointer text-lg text-red-700" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsManager;
