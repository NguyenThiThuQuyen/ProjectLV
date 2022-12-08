import React from "react";
import { FaUsersCog, FaUserFriends } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const NavbarUser = () => {
  return (
    <div className="">
      <div className="flex w-full p-5 items-center justify-between">
        <div className="flex items-center ml-3">
          <ul className="flex">
            <li>
              <NavLink
                to="/manager/users-manager"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUsersCog className="mr-2 text-lg text-teal-700" />
                  <span>Q.LÝ NHÂN VIÊN</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manager/patient-manager"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUserFriends className="mr-2 text-lg text-teal-700" />
                  <span>Q.LÝ BỆNH NHÂN</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manager/parent-manager"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUserFriends className="mr-2 text-lg text-teal-700" />
                  <span>Q.LÝ PHỤ HUYNH</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
