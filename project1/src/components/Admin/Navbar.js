import React from "react";
import { BsSearch } from "react-icons/bs";
import {
  MdOutlineDarkMode,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { RiFullscreenExitLine } from "react-icons/ri";
import { AiOutlineUnorderedList } from "react-icons/ai";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    // navbar
    <div className="h-12 flex items-center text-base border-b-2 border-scale-700">
      {/* wrapper */}
      <div className="flex w-full p-5 items-center justify-end">
        {/* search */}
        {/* <div className="flex items-center border border-scale-200 p-1">
          <input
            className="border-0 outline-0 bg-transparent"
            type="text"
            placeholder="Tìm kiếm..."
          />
          <BsSearch />
        </div> */}
        {/* items */}
        <div className="flex items-center">
          {/* <div className="flex items-center mr-5 relative">
            <MdOutlineDarkMode className="text-xl" />
          </div>
          <div className="flex items-center mr-5 relative">
            <RiFullscreenExitLine className="text-xl" />
          </div>
          <div className="flex items-center mr-5 relative">
            <MdOutlineNotificationsActive className="text-xl" />
            <div className="w-3.5 h-3.5 bg-red-600 rounded-[50%] text-white flex items-center font-xs justify-center font-bold top-[-5px] right-[-5px]">
              1
            </div>
          </div>
          <div className="flex items-center mr-5 relative">
            <AiOutlineUnorderedList className="text-xl" />
          </div> */}

          <div className="flex items-center mr-2 relative">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              //   avatar
              className="w-8 h-8 rounded-[50%]"
            />
          </div>
          <div className="">{user.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
