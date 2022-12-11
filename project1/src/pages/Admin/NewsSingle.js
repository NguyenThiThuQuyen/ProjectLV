import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import UserModalEdit from "../../components/Admin/Modal/User/UserEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Buffer } from "buffer";

import { getNewsAPI, dataGetNews, dataCheck } from "../../redux/newsRedux";
const NewsSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params:", params);
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetNews);
  console.log("data: ", data);
  useEffect(() => {
    dispatch(getNewsAPI(params.newsId));
  }, [check]);
  let imageBase64 = "";
  if (data?.news?.image) {
    imageBase64 = new Buffer(data?.news?.image, "base64").toString("binary");
  }
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <div className="grid grid-cols-2 p-5">
          <div className="col-span-2 shadow-xl border-[1px] p-5 relative">
            <div className="flex pl-2 absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              {/* <GoiKhamModalEdit item={data?.goikham} /> */}
              Edit
            </div>
            <h1 className="mb-3 font-medium text-center text-lg text-green-700">
              THÔNG TIN CHI TIẾT TIN TỨC
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
                  <span className="font-bold text-slate-500">Tiêu đề:</span>
                  <span className="font-normal ml-2">{data?.news?.name}</span>
                </div>
                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">Mô tả ngắn:</span>
                  <span className="font-normal ml-2">{data?.news?.mota}</span>
                </div>

                <div className="mb-2 text-md">
                  <span className="font-bold text-slate-500">
                    Mô tả chi tiết
                  </span>
                  <div
                    className="mt-3 my-5 "
                    dangerouslySetInnerHTML={{
                      __html: data?.news?.contentHTML,
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

export default NewsSingle;
