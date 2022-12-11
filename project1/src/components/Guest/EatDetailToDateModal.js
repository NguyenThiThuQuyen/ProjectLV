import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  DataGetFindEatDetailToDate,
  getFindEatDetailToDateAPI,
} from "../../redux/chitietanRedux";
import {
  datagetFindIdPhieuDatCho,
  findIdPhieuDatChoPrescriptionAPI,
} from "../../redux/prescriptionRedux";
export default function EatDetailToDateModal(props) {
  console.log("props:", props);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector(DataGetFindEatDetailToDate);
  console.log("data:", data);

  useEffect(() => {
    dispatch(
      getFindEatDetailToDateAPI({
        eatdateId: +props.paramsEatDateId,
        menuId: props.paramsMenuId,
      })
    );
  }, []);

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  const handleClose = () => {
    setShowModal(false);
    props.handleClose(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[90%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <div className="text-base font-medium text-green-500 underline underline-offset-2 hover:text-green-700 cursor-pointer"></div>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2">
                    {data &&
                      data.length > 0 &&
                      data.map((item, index) => {
                        if (item?.eatDateDataToEatDetail?.id)
                          return (
                            <>
                              <div className="col-span-1">
                                <div className="">
                                  <div className="min-h-[500px] border-y border-slate-400 px-5 shadow-lg">
                                    <div className="row-span-1">
                                      <div className="flex mt-3">
                                        <span className="font-normal uppercase text-sm text-green-500">
                                          Thực đơn
                                        </span>
                                        <span className=" mx-1 font-normal uppercase text-sm text-green-500">
                                          {
                                            item?.eatDateDataToEatDetail
                                              ?.eatdate
                                          }
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
                                          {
                                            item?.eatTimeslotDataToEatDetail
                                              ?.khunggioan
                                          }
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
                                                item?.dishDataToEatDetail
                                                  ?.contentHTML,
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
                              </div>
                            </>
                          );
                      })}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    ĐÓNG
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
