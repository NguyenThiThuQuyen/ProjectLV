import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NavbarUser from "../../components/Admin/NavbarUser";
import ParentModal from "../../components/Admin/Modal/Parent/ParentModal";
import ParentModalEdit from "../../components/Admin/Modal/Parent/ParentEditModal";
import { RiDeleteBinLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllParentsAPI,
  dataGetAllParent,
  dataCheck,
  deleteParentAPI,
} from "../../redux/parentRedux";

const ParentManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllParent);
  console.log("data parent:", data);
  const check = useSelector(dataCheck);

  useEffect(() => {
    dispatch(getAllParentsAPI());
  }, [check]);

  const handleDeleteParent = (id) => {
    dispatch(deleteParentAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
          <ParentModal />
          <div className="w-full px-10 py-4">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Email
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điện Thoại
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Giới Tính
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.parents &&
                  data.parents.length > 0 &&
                  data.parents.map((item, index) => {
                    console.log("123:", item.genderDataToParent);
                    return (
                      <tr key={item.id}>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.email}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.phone}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.genderDataToParent.gender}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-3">
                              <ParentModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              onClick={() => handleDeleteParent(item.id)}
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

export default ParentManager;
