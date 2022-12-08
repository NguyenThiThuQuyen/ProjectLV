import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import LoaiThuocModal from "../../components/Admin/Modal/MedicalType/LoaiThuocModal";
import LoaiThuocModalEdit from "../../components/Admin/Modal/MedicalType/LoaiThuocEditModal";
import { RiDeleteBinLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllLoaiThuocAPI,
  dataGetAllLoaiThuoc,
  dataCheck,
  deleteLoaiThuocAPI,
} from "../../redux/loaiThuocRedux";
import NavbarThuoc from "../../components/Admin/NavbarThuoc";

const LoaiThuocManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllLoaiThuoc);
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllLoaiThuocAPI());
  }, [check]);

  const handleDeleteLoaiThuoc = (id) => {
    dispatch(deleteLoaiThuocAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarThuoc />
          <LoaiThuocModal />
          {/* <TableUser /> */}
          <div className="w-full px-10 py-3">
            <table className="border w-1/2 border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  {/* <th className="border border-slate-200 p-3 text-white font-medium">
                    ID
                  </th> */}
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên loại thuốc
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.medicaltypes &&
                  data.medicaltypes.length > 0 &&
                  data.medicaltypes.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        {/* <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.id}
                        </td> */}
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-3" title="Sửa">
                              <LoaiThuocModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDeleteLoaiThuoc(item.id)}
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

export default LoaiThuocManager;
