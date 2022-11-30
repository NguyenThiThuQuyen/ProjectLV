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
  const user = JSON.parse(localStorage.getItem("user"));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const data = useSelector(dataGetAReceipt);

  useEffect(() => {
    dispatch(getReceiptAPI(params.id));
  }, []);

  return (
    <>
      <div className="flex w-full" onClick={() => handlePrint()}>
        In hóa đơn
      </div>
      <div ref={componentRef}>
        <div className="w-2/5 mx-auto border-2 border-slate-600 px-5 pb-5 mt-2">
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
            <span className="font-medium mr-2 uppercase">Số hóa đơn:</span>
            <div className="">000025</div>
          </div>
          <div className="flex mt-1">
            <span className="font-medium mr-2">Họ tên người đại diện:</span>
            <div className="">
              {
                data?.receipt?.phieudatchoDataToReceipt
                  ?.patientDataToPhieudatcho?.parentDataToPatient?.name
              }
            </div>
          </div>
          <div className="flex mt-1">
            <span className="font-medium mr-2">Họ tên trẻ:</span>
            <div className="">
              {
                data?.receipt?.phieudatchoDataToReceipt
                  ?.patientDataToPhieudatcho?.childrentName
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
                data?.receipt?.phieudatchoDataToReceipt
                  ?.scheduleDataToPhieudatcho?.registerDate
              ).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="flex mt-1">
            <span className="font-medium mr-2">Khung giờ tư vấn:</span>
            <div className="">
              {
                data?.receipt?.phieudatchoDataToReceipt
                  ?.scheduleDataToPhieudatcho?.timeSlotDataToSchedule?.timeslot
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
                <tr className="border border-slate-400">
                  <th className="border border-slate-200 p-1 text-black font-medium">
                    Gói tư vấn
                  </th>
                  <th className="border border-slate-200 p-1 text-black font-medium">
                    Giá
                  </th>
                  <th className="border border-slate-200 p-1 text-black font-medium">
                    Số tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-200">
                  <td className="border-y border-slate-300 p-1">
                    {
                      data?.receipt?.phieudatchoDataToReceipt
                        ?.goituvanDataToPhieudatcho?.packageName
                    }
                  </td>
                  <td className="border-y border-slate-300 p-1">
                    {
                      data?.receipt?.phieudatchoDataToReceipt
                        ?.goituvanDataToPhieudatcho
                        ?.medicalPackageDataToPackagePrice[0]?.price
                    }
                  </td>
                  <td className="border-y border-slate-300 p-1">
                    {
                      data?.receipt?.phieudatchoDataToReceipt
                        ?.goituvanDataToPhieudatcho
                        ?.medicalPackageDataToPackagePrice?.price
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="w-full">
              <div className="flex justify-end mt-3">
                <span className="text-lg font-medium mr-2">
                  Tổng tiền thanh toán:
                </span>
                <div className="text-xl">250.000</div>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-10">
            <div className="grid row-auto">
              <div className="grid grid-cols-2">
                <div className="col-span-1 text-center">
                  <div className="text-black font-medium">
                    Nhân viên lập hóa đơn
                  </div>
                  <div className="mt-3">{user?.name}</div>
                  <div className="text-black italic mt-3">Ký tên</div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-black font-medium">Người thanh toán</div>
                  <div className="text-black italic">(Ký và ghi rõ họ tên)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
