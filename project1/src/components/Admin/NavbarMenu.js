import React, { useState, useEffect } from "react";
import { FaUsersCog, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavbarMenu = () => {
  const [check, setCheck] = useState(true);

  return (
    // navbar
    <div className="">
      <div className="flex w-full p-5 items-center justify-between">
        <div className="flex items-center ml-3">
          <ul className="flex">
            <li>
              <NavLink
                to="/manager/dish-manager"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUsersCog className="mr-2 text-lg text-teal-700" />
                  <span>MÓN ĂN</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manager/category-manager"
                className={({ isActive }) =>
                  isActive
                    ? "flex text-sm p-3 font-medium cursor-pointer bg-yellow-500 text-white"
                    : "flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                }
              >
                <div className="flex">
                  <FaUserFriends className="mr-2 text-lg text-teal-700" />
                  <span>DANH MỤC MÓN ĂN</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
