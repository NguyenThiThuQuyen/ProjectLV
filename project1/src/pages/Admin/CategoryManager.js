import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NavbarMenu from "../../components/Admin/NavbarMenu";
import { ImDownload3 } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPlusLg, BsSearch, BsThreeDots } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import CategoryModal from "../../components/Admin/Modal/Category/CategoryModal";
import CategoryEditModal from "../../components/Admin/Modal/Category/CategoryEditModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCaterogyAPI,
  dataGetAllCaterogy,
  deleteCategoryAPI,
  dataCheck,
} from "../../redux/danhmucmonanRedux";

const CategoryManager = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllCaterogy);
  console.log("data:", data);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllCaterogyAPI());
  }, [check]);

  const handleDelete = (id) => {
    dispatch(deleteCategoryAPI(id));
  };

  // const handleDetail = (medicalpackageId) => {
  //   navigate(`/manager/medical-package-detail/${medicalpackageId}`);
  //   dispatch(getGoiKhamAPI(medicalpackageId));
  // };

  const handleCategoryModal = () => {
    setShowModal(true);
  };

  const handleDong = (test) => {
    setShowModal(test);
  };

  const handleMoLai = (data) => {
    console.log("dddd:", data);
    setShowModal(data);
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarMenu />
          <div className="ml-5">
            <div className="mt-7 ml-5">
              <div className="ml-5 flex justify-start">
                <div className="flex items-center border border-scale-200 p-1 rounded">
                  <input
                    className="border-0 outline-0 bg-transparent"
                    type="text"
                    placeholder="Tìm kiếm..."
                    // onChange={(e) => setQuery(e.target.value)}
                  />
                  <BsSearch />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="ml-6 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                  onClick={() => handleCategoryModal()}
                >
                  <BsPlusLg className="mr-2 mt-1 text-teal-700" />
                  Thêm danh mục
                </button>
                <div className="">
                  {showModal === true ? (
                    <CategoryModal
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
          <div className="w-full px-10 py-3">
            <table className="border border-slate-200 w-1/2">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium ">
                    Tên danh mục món ăn
                  </th>

                  <th className="border border-slate-200 p-3 text-white font-medium text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.categories &&
                  data.categories.length > 0 &&
                  data.categories.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700 text-center">
                          {item.name}
                        </td>

                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex justify-center">
                            <div className="mr-3" title="Sửa">
                              <CategoryEditModal item={item} />
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

export default CategoryManager;
