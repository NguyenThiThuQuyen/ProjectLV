import React, { useState, useEffect } from "react";
import { FaUsersCog, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarConsult = () => {
  const [check, setCheck] = useState(true);

  return (
    // navbar
    <div className="">
      {/* wrapper */}
      <div className="flex w-full p-5 items-center justify-between">
        {/* search */}
        {check === true ? (
          <div className="flex items-center ml-3">
            <ul className="flex">
              <li
                className="flex underline underline-offset-8 text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                onClick={() => setCheck(true)}
              >
                <Link to="/manager/consult" className="flex">
                  <FaUsersCog className="mr-2 text-lg text-teal-700" />
                  LỊCH HÔM NAY
                </Link>
              </li>
              <li
                className="flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                onClick={() => setCheck(false)}
              >
                <Link to="/manager/consult-alldate" className="flex">
                  <FaUserFriends className="mr-2 text-lg text-teal-700" />
                  Q.LÝ LỊCH TƯ VẤN
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center ml-3">
            <ul className="flex">
              <li
                className="flex text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                onClick={() => setCheck(true)}
              >
                <Link to="/manager/consult" className="flex">
                  <FaUsersCog className="mr-2 text-lg text-teal-700" />
                  LỊCH HÔM NAY
                </Link>
              </li>
              <li
                className="flex underline underline-offset-8 text-sm p-3 text-slate-600 font-medium cursor-pointer hover:bg-slate-300 hover:text-green-900"
                onClick={() => setCheck(false)}
              >
                <Link to="/manager/consult-alldate" className="flex">
                  <FaUserFriends className="mr-2 text-lg text-teal-700" />
                  Q.LÝ LỊCH TƯ VẤN
                </Link>
              </li>
            </ul>
          </div>
        )}
        {/* items */}
      </div>
    </div>
  );
};

export default NavbarConsult;
