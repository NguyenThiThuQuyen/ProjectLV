import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import ThuocModal from "../../components/Admin/Modal/Medical/ThuocModal";
import ThuocModalEdit from "../../components/Admin/Modal/Medical/ThuocEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllThuocAPI,
  dataGetAllThuoc,
  dataCheckThuoc,
  deleteThuocAPI,
} from "../../redux/thuocRedux";
const ThuocManager = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllThuoc);
  const check = useSelector(dataCheckThuoc);

  useEffect(() => {
    dispatch(getAllThuocAPI());
  }, [check]);
  const handleDeleteThuoc = (id) => {
    dispatch(deleteThuocAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <ThuocModal />
          {/* <TableUser /> */}
          <div className="w-full px-10 py-3">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    ID
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên thuốc
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Loại thuốc
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Đơn vị
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Hình ảnh
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Nhà cung cấp
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Điều chỉnh
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.medicals &&
                  data.medicals.length > 0 &&
                  data.medicals.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.id}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.medicalTypeDataToMedical.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.donvitinhDataToMedical.donvitinh}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <img
                            src={imageBase64}
                            alt=""
                            style={{ height: "54px", width: "100px" }}
                          />
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item.nhacungcapDataToMedical.nhacungcap}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div className="mr-3" title="Sửa">
                              <ThuocModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDeleteThuoc(item.id)}
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

export default ThuocManager;
