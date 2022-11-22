import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { getReceiptAPI, dataGetAReceipt } from "../../redux/receiptRedux";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
const Receipt = () => {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const params = useParams();
  console.log("componentRef:", componentRef);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const data = useSelector(dataGetAReceipt);
  console.log("data:", data);

  useEffect(() => {
    dispatch(getReceiptAPI(params.id));
  }, []);

  return (
    <div ref={componentRef}>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div className="flex w-full" onClick={() => handlePrint()}>
        In hóa đơn
      </div>

      <div className="w-2/5 mx-auto border-2 p-5 mt-5">
        <div className="text-center uppercase font-medium text-lg mt-3">
          trung tâm tư vấn dinh dưỡng trẻ children's care
        </div>
        <div className="mt-3">
          Địa chỉ: số 391, đường 30/4, Phường Hưng Lợi, Quận Ninh Kiều, TP.Cần
          Thơ
        </div>
        <div className="">Điện thoại: 0313 950 242 - 0313 700 436</div>
        <div className="text-center uppercase font-medium text-2xl mt-3">
          biên lai thu tiền
        </div>
        <div className="flex mt-1">
          <span className="font-medium mr-2">Họ tên người đại diện:</span>
          <div className="">
            {
              data?.receipt?.phieudatchoDataToReceipt?.patientDataToPhieudatcho
                ?.parentDataToPatient?.name
            }
          </div>
        </div>
        <div className="flex mt-1">
          <span className="font-medium mr-2">Họ tên trẻ:</span>
          <div className="">
            {
              data?.receipt?.phieudatchoDataToReceipt?.patientDataToPhieudatcho
                ?.childrentName
            }
          </div>
        </div>
        <div className="flex mt-1">
          <span className="font-medium mr-2">Bác sĩ tư vấn:</span>
          <div className="">
            {
              data?.receipt?.phieudatchoDataToReceipt?.doctorDataToPhieudatcho
                ?.name
            }
          </div>
        </div>
        <div className="flex mt-1">
          <span className="font-medium mr-2">Ngày tư vấn:</span>
          <div className="">
            {moment(
              data?.receipt?.phieudatchoDataToReceipt?.scheduleDataToPhieudatcho
                ?.registerDate
            ).format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="flex mt-1">
          <span className="font-medium mr-2">Khung giờ tư vấn:</span>
          <div className="">
            {
              data?.receipt?.phieudatchoDataToReceipt?.scheduleDataToPhieudatcho
                ?.timeSlotDataToSchedule?.timeslot
            }
          </div>
        </div>
        <div className="flex mt-1">
          <span className="font-medium mr-2">Hình thức thanh toán:</span>
          <div className="">Tiền mặt</div>
        </div>
        <div className="mt-5">
          <table className="border mx-auto border-slate-200">
            <thead>
              <tr className="border border-slate-200 bg-green-600">
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Gói tư vấn
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Giá
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Số tiền
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
