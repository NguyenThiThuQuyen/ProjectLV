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

const Chart = () => {
  return (
    <div className="mt-4 overflow-x-hidden overflow-y-auto">
      <div className="w-full mt-10">
        <div className="mx-auto w-2/3 ">
          <ThongKe />
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
