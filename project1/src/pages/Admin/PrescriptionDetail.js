import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import {
  dataGetPrescriptionsDetail,
  getPrescriptionsDetailAPI,
} from "../../redux/prescriptionDetailRedux";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const PrescriptionDetail = () => {
  const params = useParams();

  const dispatch = useDispatch();
  console.log("params: ", params);
  const data = useSelector(dataGetPrescriptionsDetail);
  console.log("data", data);

  useEffect(() => {
    dispatch(getPrescriptionsDetailAPI(params?.id));
  }, []);

  const nsinh = data?.phieudatcho?.patientDataToPhieudatcho?.birthday;
  const ngaysinh = moment(nsinh).format("DD/MM/YYYY");
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />

        <div className="w-full">
          <div className="text-green-700 uppercase text-center font-medium text-xl mt-10">
            Thông tin thuốc hỗ trợ
          </div>
          <div className="mx-auto w-3/4 mt-7 border shadow-lg p-5">
            <div className="">
              <div className="">
                <div className=" mt-10">
                  <div className="px-3 pb-3">
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Tên thuốc hỗ trợ:
                      </div>
                      <div className="ml-2 uppercase font-medium">
                        {data?.medicalDataToPrescriptionDetail?.name}
                      </div>
                    </div>

                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Cách dùng:
                      </div>
                      <div className="ml-2 bg-orange-400 rounded-lg px-3">
                        {data?.cachdung}
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Liều dùng:
                      </div>
                      <div className="ml-2 bg-yellow-400 rounded-lg px-3">
                        {data?.lieudung}
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Số lần dùng:
                      </div>
                      <div className="ml-2 rounded-lg px-3 bg-sky-400">
                        {data?.solandung}
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <div className="text-sky-800 font-medium ml-2">
                        Số lượng:
                      </div>
                      <div className="ml-2 rounded-lg px-3 bg-sky-400">
                        {data?.soluong}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
