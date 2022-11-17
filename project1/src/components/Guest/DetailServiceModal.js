import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  getGoiKhamAPI,
  dataGetGoiKham,
  dataCheck,
} from "../../redux/goiKhamRedux";

export default function DetailServiceModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const check = useSelector(dataCheck);
  const data = useSelector(dataGetGoiKham);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGoiKhamAPI(params.medicalpackageId));
  }, [check]);
  let imageBase64 = "";
  if (data?.goikham?.image) {
    imageBase64 = new Buffer(data?.goikham?.image, "base64").toString("binary");
  }

  const handleDetail = (medicalpackageId) => {
    navigate(`/detail-service/${medicalpackageId}`);
    dispatch(getGoiKhamAPI(medicalpackageId));
  };

  let day = "";
  day = moment(
    data?.goikham?.medicalPackageDataToPackagePrice?.applydateId
  ).format("YYYY-MM-DD");
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="text-right text-sm mt-2 italic cursor-pointer hover:underline hover:underline-offset-2"
      >
        Xem mô tả ngắn về gói tư vấn
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <div
                    className="text-base font-medium text-green-500 underline underline-offset-2 hover:text-green-700 cursor-pointer"
                    onClick={() => handleDetail(data?.goikham?.id)}
                  >
                    Xem chi tiết
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="">
                    <div className="text-center text-xl font-semibold text-sky-700">
                      {data?.goikham?.packageName}
                    </div>
                    <div className="w-full mt-10">
                      <div className="mx-auto">
                        <div className="grid grid-cols-4 w-3/2">
                          <div className="col-span-1">
                            <img
                              src={imageBase64}
                              alt=""
                              className="h-[200px] w-[300px]"
                            />
                          </div>
                          <div className="col-span-3 ml-5">
                            <div className="flex">
                              <span className="mx-2 mt-5 text-green-500 font-semibold text-md">
                                GIÁ TƯ VẤN:
                              </span>
                              <div className="text-red-600 mt-4 text-xl font-semibold">
                                {
                                  data?.goikham
                                    ?.medicalPackageDataToPackagePrice?.price
                                }
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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
