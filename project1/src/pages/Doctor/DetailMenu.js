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
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params:", params);

  const data = useSelector(DataGetFindEatDetailToDate);

  console.log("data:", data);

  useEffect(() => {
    dispatch(
      getFindEatDetailToDateAPI({ eatdateId: params.id, menuId: params.menuId })
    );
  }, []);

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
            <div className="w-full px-5 py-4">
              <div className="text-sky-700 uppercase font-medium text-xl mt-10">
                Thông tin thực đơn
              </div>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  if (item?.eatDateDataToEatDetail?.id)
                    return (
                      <div className="grid grid-cols-9 mt-5">
                        <div className="col-span-8 border-y border-slate-400 px-5 shadow-lg">
                          <div className="row-span-1">
                            <div className="flex mt-3">
                              <span className="font-normal text-sky-700 uppercase text-sm text-green-500">
                                Thực đơn
                              </span>
                              <span className=" mx-1 font-normal text-sky-700 uppercase text-sm text-green-500">
                                {item?.eatDateDataToEatDetail?.eatdate}
                              </span>
                            </div>
                          </div>

                          <div className="row-span-1">
                            <div className="flex mt-3">
                              <span className="font-normal text-sky-900 text-md uppercase">
                                Món ăn:
                              </span>
                              <span className="mx-5 uppercase rounded-md">
                                {item.dishDataToEatDetail.name}
                              </span>
                            </div>
                          </div>

                          <div className="row-span-1">
                            <div className="flex mt-3">
                              <span className="font-normal text-sky-900 text-md uppercase">
                                Giờ ăn:
                              </span>
                              <span className="mx-5 bg-yellow-400 rounded-md">
                                {item?.eatTimeslotDataToEatDetail?.khunggioan}
                              </span>
                            </div>
                          </div>

                          <div className="row-span-1">
                            <div className="flex mt-3">
                              <span className="font-normal text-sky-900 text-md uppercase">
                                Số lần ăn:
                              </span>
                              <span className="mx-5 bg-green-400 text-center w-[40px] rounded-md">
                                {item?.solan}
                              </span>
                            </div>
                          </div>

                          <div className="row-span-1">
                            <div className="mt-3">
                              <span className="font-normal text-sky-900 text-md uppercase">
                                Cách chế biến:
                              </span>
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
                          <div className="row-span-1">
                            <div className="mt-3">
                              <span className="font-normal text-sky-900 text-md uppercase">
                                Ghi chú:
                              </span>
                              <span className="mx-5 text-red-700">
                                {item.ghichu}
                              </span>
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
