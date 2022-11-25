import { useState, useEffect } from "react";
import {
  getThongkeTheoTuanAPI,
  dataGetThongkeTheoTuan,
  getThongkeDoanhthuAPI,
  dataGetThongkeDoanhThu,
} from "../../../redux/ThongkeRedux";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import ThongKe from "./DangKyTuVan/ThongKe";
import ThongKeDoanhThu from "./DoanhThu/ThongKeDoanhThu";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";

const labelsDoanhThu = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const Chart = () => {
  const [label, setLabel] = useState([]);
  const [label2, setLabel2] = useState([]);
  const [data, setData] = useState({});

  const [dataTKDoanhThu, setDataTKDoanhThu] = useState({});
  const [nam, setNam] = useState("2022");

  const dispatch = useDispatch();

  const dataThongke = useSelector(dataGetThongkeTheoTuan);
  const dataDoanhThu = useSelector(dataGetThongkeDoanhThu);
  console.log("dataDoanhThu:", dataDoanhThu);

  useEffect(() => {
    if (dataThongke?.res1?.length == 7) {
      setData((prev) => ({
        ...prev,
        datasets: [
          {
            label: "7 ngày trước",
            data: dataThongke?.res1?.map((item) => {
              return item;
            }),
            backgroundColor: "rgba(255, 99, 132, 0.8)",
          },
        ],
      }));
    } else if (dataThongke?.res1?.length == 2) {
      setData((prev) => ({
        ...prev,
        datasets: [
          {
            label: "7 ngày trước",
            data: dataThongke?.res1[0]?.map((item) => {
              return item;
            }),
            backgroundColor: "rgba(255, 99, 132, 0.8)",
          },
          {
            label: "14 ngày trước",
            data: dataThongke?.res1[1]?.map((item) => {
              return item;
            }),
            backgroundColor: "rgba(53, 162, 235, 0.7)",
          },
        ],
      }));
    }
  }, [dataThongke]);

  const labelArr = () => {
    let arr1 = [];
    let arr2 = [];

    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label = moment(new Date())
        .subtract(i + 1, "days")
        .locale("en")
        .format("dddd - DD/MM");
      obj.label2 = moment(new Date())
        .subtract(i + 1, "days")
        .locale("en")
        .format("DD/MM");
      obj.label3 = moment(new Date())
        .subtract(i + 8, "days")
        .locale("en")
        .format("DD/MM");

      arr1.push(obj.label);
      arr2.push(obj.label2 + " - " + obj.label3);
    }

    setLabel(arr1);
    setLabel2(arr2);
  };

  useEffect(() => {
    labelArr();
    dispatch(getThongkeTheoTuanAPI(1));
    dispatch(getThongkeDoanhthuAPI(2022));
  }, []);

  useEffect(() => {
    if (label) {
      setData({ labels: label });
    }
  }, [label]);

  useEffect(() => {
    if (dataDoanhThu !== []) {
      console.log("vào:", dataDoanhThu.length);
      setDataTKDoanhThu({
        labels: labelsDoanhThu,
        datasets: [
          {
            fill: true,
            label: `Thống kê theo năm ${nam}`,
            data: dataDoanhThu.map((item) => {
              return item;
            }),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }
  }, [dataDoanhThu]);

  console.log("dataTKDoanhThu111111:", dataTKDoanhThu);

  const handleChon = (e) => {
    if (e == 1) {
      dispatch(getThongkeTheoTuanAPI(e));
      setData({
        labels: label,
      });
    } else if (e == 2) {
      dispatch(getThongkeTheoTuanAPI(e));
      setData({
        labels: label2,
      });
    }
  };

  const handleChonNam = (e) => {
    dispatch(getThongkeDoanhthuAPI(e));
    setNam(e);
  };

  return (
    <div className="mt-4 overflow-x-hidden overflow-y-auto">
      {/* thong ke dang ky theo ngay */}
      <div className="w-full mt-10">
        <div className="ml-48">
          <select name="" id="" onChange={(e) => handleChon(e.target.value)}>
            <option value={1}>7 ngày trước</option>
            <option value={2}>14 ngày trước</option>
          </select>
        </div>
        <div className="mx-auto w-2/3 ">
          {data.datasets ? <ThongKe thongke={data} /> : null}
        </div>
      </div>

      {/* thong ke doanh thu */}
      <div className="w-full mt-10">
        <div className="ml-48">
          <select name="" id="" onChange={(e) => handleChonNam(e.target.value)}>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
        </div>
        <div className="mx-auto w-2/3 ">
          {/* <ThongKeDoanhThu /> */}
          {dataTKDoanhThu.datasets ? (
            <ThongKeDoanhThu thongkedthu={dataTKDoanhThu} />
          ) : null}
        </div>
      </div>

      <div className="w-full flex mx-10 mt-10">
        <div className="mr-auto w-1/3 border-2 shadow-lg p-5">
          <div className="">
            <div className="flex text-md p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900 uppercase">
              <Link to="/manager/users-manager" className="flex">
                <RiMoneyDollarBoxLine className="mr-2 text-lg mt-1 text-teal-700" />
                Tổng doanh thu
              </Link>
            </div>
          </div>
          <div className="px-10 py-5">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={4} />
          </div>
          <div className="">
            <div className="text-slate-700 font-medium italic">Chú thích:</div>
            <div className="px-10">
              <div className="flex mt-2">
                <div className="h-5 w-7 bg-sky-500"></div>
                <div className="ml-2 text-slate-800 font-medium">
                  Doanh thu: 70 %
                </div>
              </div>
              <div className="flex mt-2 ">
                <div className="h-5 w-7 border border-black bg-white"></div>
                <div className="ml-2 text-slate-800 font-medium">
                  Danh thu: 70 %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
