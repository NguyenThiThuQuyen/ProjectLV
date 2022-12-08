import React from "react";
import { FaUsersCog, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavbarPhieuDatCho = () => {
  return (
    // navbar
    <div className="">
      {/* wrapper */}
      <div className="flex w-full p-5 items-center justify-between">
        {/* search */}
        <div className="flex items-center ml-3">
          <ul className="flex">
            <li>
              <NavLink
                to="/manager/reservation-ticket-manager"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUsersCog className="mr-2 text-lg text-teal-700" />
                  <span>Q.LÝ LỊCH TƯ VẤN</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manager/reservation-ticket-date"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUserFriends className="mr-2 text-lg text-teal-700" />
                  <span>LỊCH TƯ VẤN THEO NGÀY</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* items */}
      </div>
    </div>
  );
};

export default NavbarPhieuDatCho;
