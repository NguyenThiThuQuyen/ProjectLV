import React, { useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import GoiKhamModal from "../../components/Admin/Modal/MedicalPackage/GoiKhamModal";
import GoiKhamModalEdit from "../../components/Admin/Modal/MedicalPackage/GoiKhamEditModal";
import { RiDeleteBinLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllGiaGoiKhamAPI,
  dataGetAllGiaGoiKham,
  dataCheck,
  //   deleteGoiKhamAPI,
} from "../../redux/giaGoiKhamRedux";

const GoiKhamManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllGiaGoiKham);
  console.log("first:", data);
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllGiaGoiKhamAPI());
  }, [check]);

  //   const handleDeleteGoiKham = (id) => {
  //     dispatch(deleteGoiKhamAPI(id));
  //   };

  return (
    <>
      <div className="flex w-full">
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
                    Gói tư vấn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Mô tả
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giá
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Ngày áp dụng
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.prices &&
                  data.prices.length > 0 &&
                  data.prices.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.medicalPackageDataToPackagePrice.packageName}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.medicalPackageDataToPackagePrice.packageDecs}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.price}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.applydateId}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-3">
                              <GoiKhamModalEdit item={item} />
                            </div>
                            <div className="">
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
