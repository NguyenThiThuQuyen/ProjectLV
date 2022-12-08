import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import {
  MdOutlineDarkMode,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { RiFullscreenExitLine } from "react-icons/ri";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { getSearchAdminAPI, dataGetSearchAdmin } from "../../redux/searchRedux";
import SearchAdmin from "../Search/SearchAdmin";
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState([]);
  const dataSearch = useSelector(dataGetSearchAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchAdminAPI());
  }, []);

  useEffect(() => {
    if (dataSearch.search) {
      setSearch(dataSearch.search);
    }
  }, [dataSearch]);

  return (
    <div className="h-12 flex items-center text-base border-b-2 border-scale-700">
      <div className="flex w-full p-5 items-center justify-end">
        <div className="mr-5">
          <SearchAdmin
            data={search}
            placeholder={"Tìm kiếm bác sĩ, danh mục, dịch vụ ..."}
          />
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-2 relative">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-8 h-8 rounded-[50%]"
            />
          </div>
          <div className="">{user?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
