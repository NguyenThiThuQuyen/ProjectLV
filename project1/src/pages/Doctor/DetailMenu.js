import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGetFindEatDetailToDate,
  getFindEatDetailToDateAPI,
} from "../../redux/chitietanRedux";
const DetailMenu = () => {
  const params = useParams();
  console.log("params:", params);

  const data = useSelector(DataGetFindEatDetailToDate);

  console.log("data:", data);

  //   const handleQuaylai = () => {

  //   }

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          {/* <NavbarConsult /> */}
          {/* <div className="" onClick={() => handleQuaylai()}>
            Quay lại
          </div> */}
          <div className="">
            <div className="w-full px-10 py-4">
              <div className="text-sky-700 uppercase font-medium text-xl mt-10">
                Thông tin thực đơn
              </div>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  console.log("item: ", item);
                  console.log(
                    "item 1111111:",
                    item?.eatDateDataToEatDetail?.id
                  );
                  const test = item?.eatDateDataToEatDetail?.id;
                  if (item?.eatDateDataToEatDetail?.id)
                    return (
                      <div className="grid grid-cols-9">
                        {/* <div className="col-span-1 border-2 border-slate-400">
                          {item?.eatDateDataToEatDetail?.eatdate}

                        
                        </div> */}
                        <div className="col-span-8">
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="flex">
                              <span>Giờ ăn:</span>
                              <span className="mx-5">{item.gioan}</span>
                            </div>
                          </div>
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="flex">
                              <span>Món ăn:</span>
                              <span className="mx-5">
                                {item.dishDataToEatDetail.name}
                              </span>
                            </div>
                          </div>
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="">
                              <span>Cách chế biến:</span>
                              <div className="ml-5">
                                <span
                                  className=""
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item?.dishDataToEatDetail?.contentHTML,
                                  }}
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="flex">
                              <span>Ghi chú:</span>
                              <span className="mx-5">{item.ghichu}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMenu;
