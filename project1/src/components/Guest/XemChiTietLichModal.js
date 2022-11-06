import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPhieudatchoAPI } from "../../redux/phieudatchoRedux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function XemChiTietLichModal(props) {
  // console.log("props params 111:", props);
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
      console.log("taothanhcong:", taothanhcong);
      if (taothanhcong.payload.code == "0") {
        setTimeout(function () {
          window.location.reload(1);
        }, 4000);
      }
      setShowModal(false);
      props.hanldeCloseThongTin(false);
    }
  };

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
                  <div className="flex">
                    <span>Tên phụ huynh: </span>
                    <div className="mx-5">
                      {props?.params2?.testTenPhuHuynh}
                    </div>
                  </div>

                  <div className="flex">
                    <span>SDT:</span>
                    <div className="mx-5">{props?.params2?.testPhone}</div>
                  </div>

                  <div className="flex">
                    <span>Tên goi kham: </span>
                    <div className="mx-5">{props?.params2?.testGoiKham}</div>
                  </div>

                  <div className="flex">
                    <span>Gia goi kham</span>
                    <div className="mx-5">{props?.params2?.testGiaGoiKham}</div>
                  </div>

                  <div className="flex">
                    <span>Ngày khám: </span>
                    <div className="mx-5">{props?.params2?.registerDate}</div>
                  </div>
                  <div className="flex">
                    <span>Khung gio kham: </span>
                    <div className="mx-5">{props?.params2?.testTimeslot}</div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => hanldeClose()}
                  >
                    Close
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
