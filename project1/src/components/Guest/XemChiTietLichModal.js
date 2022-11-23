import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPhieudatchoAPI } from "../../redux/phieudatchoRedux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function XemChiTietLichModal(props) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  const hanldeClose = () => {
    setShowModal(false);
    props.hanldeCloseThongTin(false);
  };

  const handleXacNhanThongTin = async () => {
    if (
      !props?.params2?.testPhone ||
      !props?.params2?.testGoiKham ||
      !props?.params2?.registerDate ||
      !props?.params2?.testTimeslot
    ) {
      setShowModal(true);
      alert("Vui lòng nhập đầy đủ thông tin !");
    } else {
      let taothanhcong = await dispatch(createPhieudatchoAPI(props.params));
      if (taothanhcong.payload.code == "0") {
        setTimeout(function () {
          window.location.reload(1);
        }, 4000);
      }
      setShowModal(false);
      props.hanldeCloseThongTin(false);
    }
  };

  const ngaykham = moment(props?.params2?.registerDate).format("DD/MM/yyyy");
  const ngaysinh = moment(props?.params?.birthday).format("DD/MM/yyyy");

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500">
                    XEM THÔNG TIN VỪA NHẬP
                  </h3>
                </div>

                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="border-2 border-slate-100 shadow-lg mt-5">
                      <div className="text-green-700 uppercase text-md font-medium mt-3 mx-3">
                        Thông tin phụ huynh
                      </div>
                      <div className="grid grid-rows-1">
                        <div className="grid row-span-1 grid-cols-3">
                          <div className="col-span-1 mx-3 my-3">
                            <label
                              htmlFor=""
                              className="text-sky-800 font-medium ml-2"
                            >
                              Tên phụ huynh
                            </label>
                            <div
                              type="text"
                              placeholder="..."
                              disabled
                              className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1 bg-sky-100 text-sky-900"
                              // onChange={(event) => setName(event.target.value)}
                            >
                              {props?.params?.name}
                            </div>
                          </div>

                          <div className="col-span-1 mx-3 my-3">
                            <label
                              htmlFor=""
                              className="text-sky-800 font-medium ml-2"
                            >
                              Điện thoại
                            </label>
                            <div
                              type="text"
                              placeholder="..."
                              disabled
                              className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                              // onChange={(event) => setName(event.target.value)}
                            >
                              {props?.params?.phone}
                            </div>
                          </div>

                          <div className="col-span-1 mx-3 my-3">
                            <label
                              htmlFor=""
                              className="text-sky-800 font-medium ml-2"
                            >
                              Email
                            </label>
                            <div
                              type="text"
                              placeholder="..."
                              disabled
                              className="border-b ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                              // onChange={(event) => setName(event.target.value)}
                            >
                              {props?.params?.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-slate-100 shadow-lg mt-10">
                      <div className="text-green-700 uppercase text-md font-medium mt-3 mx-3">
                        Thông tin bệnh nhân
                      </div>
                      <div className="grid grid-rows-1">
                        <div className="grid row-span-1 grid-cols-3">
                          <div className="col-span-1 mx-3 my-3">
                            <label
                              htmlFor=""
                              className="text-sky-800 font-medium ml-2"
                            >
                              Tên trẻ
                            </label>
                            <div
                              type="text"
                              placeholder="..."
                              disabled
                              className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1 bg-sky-100 text-sky-900"
                              // onChange={(event) => setName(event.target.value)}
                            >
                              {props?.params?.childrentName}
                            </div>
                          </div>

                          <div className="col-span-1 mx-3 my-3">
                            <label
                              htmlFor=""
                              className="text-sky-800 font-medium ml-2"
                            >
                              Ngày sinh
                            </label>
                            <div
                              type="text"
                              placeholder="..."
                              disabled
                              className="border-b uppercase ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                              // onChange={(event) => setName(event.target.value)}
                            >
                              {ngaysinh}
                            </div>
                          </div>

                          <div className="col-span-1 mx-3 my-3">
                            <label
                              htmlFor=""
                              className="text-sky-800 font-medium ml-2"
                            >
                              Địa chỉ
                            </label>
                            <div
                              type="text"
                              placeholder="..."
                              disabled
                              className="border-b ml-2 border-solid border-slate-400 w-auto outline-none mt-1"
                            >
                              {props?.params?.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-slate-100 shadow-lg mt-10">
                      <div className="text-green-700 uppercase text-md font-medium mt-3 mx-3">
                        Thông tin gói tư vấn
                      </div>

                      <div className="px-3 pb-3">
                        <div className="flex mt-2">
                          <div className="text-sky-800 font-medium ml-2">
                            Bác sĩ tư vấn:
                          </div>
                          <div className="ml-2 uppercase">
                            {props?.params?.tenbacsi}
                          </div>
                        </div>

                        <div className="flex mt-2">
                          <div className="text-sky-800 font-medium ml-2">
                            Gói tư vấn:
                          </div>
                          <div className="ml-2">
                            {props?.params?.testGoiKham}
                          </div>
                        </div>
                        <div className="flex mt-2">
                          <div className="text-sky-800 font-medium ml-2">
                            Giá gói khám:
                          </div>
                          <div className="ml-2">
                            {props?.params?.testGiaGoiKham}
                          </div>
                        </div>
                        <div className="flex mt-2">
                          <div className="text-sky-800 font-medium ml-2">
                            Khung giờ tư vấn:
                          </div>
                          <div className="ml-2">
                            {props?.params?.testTimeslot}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => hanldeClose()}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleXacNhanThongTin()}
                  >
                    XÁC NHẬN THÔNG TIN ĐẶT LỊCH
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
