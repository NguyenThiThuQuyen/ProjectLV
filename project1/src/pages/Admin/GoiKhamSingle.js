import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import GoiKhamModalEdit from "../../components/Admin/Modal/MedicalPackage/GoiKhamEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Buffer } from "buffer";

import {
  getGoiKhamAPI,
  dataGetGoiKham,
  dataCheck,
} from "../../redux/goiKhamRedux";
const GoiKhamSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetGoiKham);
  console.log("data: ", data);
  useEffect(() => {
    dispatch(getGoiKhamAPI(params.medicalpackageId));
  }, [check]);
  let imageBase64 = "";
  if (data?.goikham?.image) {
    imageBase64 = new Buffer(data?.goikham?.image, "base64").toString("binary");
  }
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <div className="grid grid-cols-2 p-5">
          <div className="col-span-2 shadow-xl border-[1px] p-5 relative">
            <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              <GoiKhamModalEdit item={data?.goikham} />
              Edit
            </div>
            <h1 className="mb-3 font-medium text-center text-lg text-green-700">
              THÔNG TIN CHI TIẾT GÓI TƯ VẤN
            </h1>
            <div className="flex gap-5">
              <img
                src={imageBase64}
                alt=""
                className="mt-4"
                style={{ height: "300px", width: "300px" }}
              />
              <div className="ml-3">
                <h1 className="mb-2	text-slate-800 font-medium">
                  {/* {user?.user?.name} */}
                </h1>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Gói tư vấn:</span>
                  <span className="font-normal ml-2">
                    {data?.goikham?.packageName}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">
                    Giá niêm yết:
                  </span>
                  <span className="font-normal ml-2">
                    {data?.goikham?.medicalPackageDataToPackagePrice?.price}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">
                    Ngày áp dụng:
                  </span>
                  <span className="font-normal ml-2">
                    {data?.goikham?.medicalPackageDataToPackagePrice?.applydateId?.slice(
                      0,
                      10
                    )}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Mô tả ngắn:</span>
                  <span className="font-normal ml-2">
                    {data?.goikham?.packageDecs}
                  </span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">
                    Mô tả chi tiết
                  </span>
                  <div
                    className="mt-3 my-5 "
                    dangerouslySetInnerHTML={{
                      __html: data?.goikham?.contentHTML,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoiKhamSingle;
