import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import hinh1 from "../assets/upload/Cover02-5939-1559712582.jpg";
import { Buffer } from "buffer";
import moment from "moment";
import { TbBellRinging } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import {
  getGoiKhamAPI,
  dataGetGoiKham,
  dataCheck,
} from "../redux/goiKhamRedux";
import SearchImport from "../components/Search/SearchImport";

const DetailService = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetGoiKham);
  useEffect(() => {
    dispatch(getGoiKhamAPI(params.medicalpackageId));
  }, [check]);
  let imageBase64 = "";
  if (data?.goikham?.image) {
    imageBase64 = new Buffer(data?.goikham?.image, "base64").toString("binary");
  }

  let day = "";
  day = moment(
    data?.goikham?.medicalPackageDataToPackagePrice?.applydateId
  ).format("YYYY-MM-DD");

  return (
    <div className="h-screen ">
      <Header />
      <SearchImport />
      <div className="mt-10">
        <div className="text-center text-xl font-semibold text-sky-700 uppercase">
          {data?.goikham?.packageName}
        </div>
        <div className="w-full mt-10">
          <div className="w-3/4 mx-auto">
            <div className="grid grid-cols-4 w-3/2">
              <div className="col-span-1">
                <img src={imageBase64} alt="" className="h-[200px] w-[300px]" />
              </div>
              <div className="col-span-3 ml-5">
                <div className="text-sm font-semibold text-sky-700">
                  <button className="mx-2 rounded py-3 px-2 box-border border-1 bg-rose-600 hover:bg-rose-500 text-white">
                    <Link to="/schedule">
                      <div className="flex animate-pulse">
                        <TbBellRinging
                          className="animate-bounce mr-1"
                          size={22}
                        />
                        ĐẶT LỊCH NGAY
                      </div>
                    </Link>
                  </button>
                </div>
                <div className="flex">
                  <span className="mx-2 mt-5 text-green-500 font-semibold text-md">
                    GIÁ TƯ VẤN:
                  </span>
                  <div className="text-red-600 mt-4 text-xl font-semibold">
                    {data?.goikham?.medicalPackageDataToPackagePrice?.price}
                  </div>
                </div>
                <div className="mt-5">
                  <span className="mr-2">Mô tả:</span>
                  <div className="text-stone-700">
                    {data?.goikham?.packageDecs}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mt-10"
              dangerouslySetInnerHTML={{ __html: data?.goikham?.contentHTML }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailService;
