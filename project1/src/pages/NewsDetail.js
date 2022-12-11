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
import { getNewsAPI, dataGetNews, dataCheck } from "../redux/newsRedux";
import SearchImport from "../components/Search/SearchImport";

const NewsDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetNews);
  useEffect(() => {
    dispatch(getNewsAPI(params.newsId));
  }, [check]);
  let imageBase64 = "";
  if (data?.news?.image) {
    imageBase64 = new Buffer(data?.news?.image, "base64").toString("binary");
  }

  return (
    <div className="h-screen ">
      <Header />
      <SearchImport />
      <div className="mt-10">
        <div className="text-center text-xl font-semibold text-sky-700 uppercase">
          {data?.news?.name}
        </div>
        <div className="w-full mt-10">
          <div className="w-2/3 mx-auto">
            <div className="col-span-3 ml-5">
              <div className="mt-5">
                <div className="text-stone-700 italic">{data?.news?.mota}</div>
              </div>
            </div>
          </div>
          <div className="w-3/4 mt-5 mx-auto">
            <div className="flex justify-center">
              <img src={imageBase64} alt="" className="h-[400px] w-[600px]" />
            </div>
            <div
              className="my-10 "
              dangerouslySetInnerHTML={{ __html: data?.news?.contentHTML }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetail;
