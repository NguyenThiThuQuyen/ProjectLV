import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { AiOutlineAreaChart } from "react-icons/ai";
import { FaUsersCog, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
const ChartNavbar = () => {
  return (
    <div className="">
      <div className="">
        {/* wrapper */}
        <div className="flex w-full p-5 items-center justify-between">
          {/* search */}
          <div className="flex items-center ml-3">
            <ul className="flex">
              <li className="flex text-md p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900 uppercase">
                <Link to="/manager/users-manager" className="flex">
                  <RiMoneyDollarBoxLine className="mr-2 text-lg mt-1 text-teal-700" />
                  Tổng danh thu
                </Link>
              </li>
              <li className="flex text-md p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900 uppercase">
                <Link to="/manager/patient-manager" className="flex">
                  <AiOutlineAreaChart className="mr-2 text-lg mt-1 text-teal-700" />
                  Biểu đồ
                </Link>
              </li>
            </ul>
          </div>
          {/* items */}
        </div>
      </div>
    </div>
  );
};

export default ChartNavbar;
