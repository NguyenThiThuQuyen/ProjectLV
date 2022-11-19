import { useState, useEffect } from "react";
import {
  getThongkeTheoTuanAPI,
  dataGetThongkeTheoTuan,
} from "../../../redux/ThongkeRedux";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
// Animation
// import { easeQuadInOut } from "d3-ease";
//   import AnimatedProgressProvider from "./AnimatedProgressProvider";
//   import ChangingProgressProvider from "./ChangingProgressProvider";
import ThongKe from "./ThongKe";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
const Chart = () => {
  const [label, setLabel] = useState([]);
  const [label2, setLabel2] = useState([]);
  const [data, setData] = useState({});

  console.log("data: ", data);

  const dispatch = useDispatch();

  const dataThongke = useSelector(dataGetThongkeTheoTuan);
  console.log("dataThongke:", dataThongke);

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
  }, []);

  useEffect(() => {
    if (label) {
      setData({ labels: label });
    }
  }, [label]);

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

  return (
    <div className="mt-4 overflow-x-hidden overflow-y-auto">
      <div className="w-full mt-10">
        <div className="">
          <select name="" id="" onChange={(e) => handleChon(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <div className="mx-auto w-2/3 ">
          {data.datasets ? <ThongKe thongke={data} /> : null}
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
