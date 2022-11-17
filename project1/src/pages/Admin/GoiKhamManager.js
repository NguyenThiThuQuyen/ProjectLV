import React, { useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import { useNavigate } from "react-router-dom";
import GoiKhamModal from "../../components/Admin/Modal/MedicalPackage/GoiKhamModal";
import GoiKhamModalEdit from "../../components/Admin/Modal/MedicalPackage/GoiKhamEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGoiKhamAPI,
  dataGetAllGoiKham,
  dataCheck,
  deleteGoiKhamAPI,
  getGoiKhamAPI,
} from "../../redux/goiKhamRedux";
import moment from "moment/moment";
import { ToastContainer } from "react-toastify";

const GoiKhamManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllGoiKham);
  const navigate = useNavigate();
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllGoiKhamAPI());
  }, [check]);

  const handleDeleteGoiKham = (id) => {
    console.log("id", id);
    dispatch(deleteGoiKhamAPI(id));
  };

  const handleDetail = (medicalpackageId) => {
    navigate(`/manager/medical-package-detail/${medicalpackageId}`);
    dispatch(getGoiKhamAPI(medicalpackageId));
  };

  return (
    <>
      <div className="flex w-full">
        <ToastContainer />
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <GoiKhamModal />
          {/* <TableUser /> */}
          <div className="w-full px-10 py-3">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên gói khám
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giá
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày áp dụng
                  </th>
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    Hình ảnh
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.goikham &&
                  data.goikham.length > 0 &&
                  data.goikham.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let day = "";
                    day = moment(
                      item.medicalPackageDataToPackagePrice.applydateId
                    ).format("DD-MM-YYYY");
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.packageName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.medicalPackageDataToPackagePrice.price}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {day}
                        </td>
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <img
                            src={imageBase64}
                            alt=""
                            className=""
                            style={{ height: "70px", width: "70px" }}
                          />
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className=""
                              onClick={() => handleDetail(item.id)}
                            >
                              <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                            </div>
                            <div className="mr-3" title="Sửa">
                              <GoiKhamModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDeleteGoiKham(item.id)}
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

export default GoiKhamManager;
