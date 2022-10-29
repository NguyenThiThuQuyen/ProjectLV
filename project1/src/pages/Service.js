import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import hinh1 from "../assets/upload/Cover02-5939-1559712582.jpg";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import {
  getAllMedicalPackageHomeAllAPI,
  dataGetAllGoiKhamHomeAll,
} from "../redux/goiKhamRedux";

const Service = () => {
  const dispatch = useDispatch();
  const dataPackage = useSelector(dataGetAllGoiKhamHomeAll);

  useEffect(() => {
    dispatch(getAllMedicalPackageHomeAllAPI());
  }, []);

  return (
    <div className="h-screen ">
      <Header />
      {/* <div className={navbar ? "navbar active" : "navbar"}> */}
      <div className="w-full">
        <div className="w-full mx-auto">
          <img className="h-2/3 w-3/4 mx-auto " src={hinh1} alt="" />
        </div>
      </div>
      <div className="p-16 bg-slate-200">
        <div className="text-red-700 text-xl font-semibold underline underline-offset-8">
          GÓI TƯ VẤN DINH DƯỠNG CHO TRẺ
        </div>
        <div className="" data-aos="fade-up" data-aos-duration="1500">
          {dataPackage.data &&
            dataPackage.data.length > 0 &&
            dataPackage.data.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                // <div className={navbar ? "navbar active" : "navbar"}>
                <div className="bg-white hover:text-white hover:bg-blue-300 my-10 border-solid border border-slate-200 shadow-md shadow-slate-300 items-center justify-items-center h-auto mx-auto w-9/12">
                  <div className="grid grid-cols-2 justify-items-center">
                    <div className="col-span-1 my-5">
                      <img
                        src={imageBase64}
                        alt=""
                        className="w-full h-[200px] w-[300px]"
                      />
                    </div>
                    <div className="col-span-1 w-full mt-5">
                      <div className="font-medium text-green-800">
                        {item.packageName}
                      </div>
                      <div className="text-sm">{item.packageDecs}</div>
                      <button className="font-medium mt-5 hover:text-sky-500 border-2 p-2 rounded-md bg-sky-400 hover:bg-white hover:border-sky-500">
                        TƯ VẤN NGAY
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Service;
