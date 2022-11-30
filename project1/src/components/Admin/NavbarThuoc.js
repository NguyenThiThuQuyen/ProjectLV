import React from "react";
import { FaUsersCog, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarThuoc = () => {
  return (
    // navbar
    <div className="">
      {/* wrapper */}
      <div className="flex w-full p-5 items-center justify-between">
        {/* search */}
        <div className="flex items-center ml-3">
          <ul className="flex">
            <li className="flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900">
              <Link to="/manager/medical-manager" className="flex uppercase">
                <FaUsersCog className="mr-2 text-lg text-teal-700" />
                Q.lý thuốc hỗ trợ
              </Link>
            </li>
            <li className="flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900">
              <Link
                to="/manager/medical-type-manager"
                className="flex uppercase"
              >
                <FaUserFriends className="mr-2 text-lg text-teal-700" />
                Q.LÝ loại thuốc
              </Link>
            </li>
          </ul>
        </div>
        {/* items */}
      </div>
    </div>
  );
};

export default NavbarThuoc;
