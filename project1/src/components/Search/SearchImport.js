import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchAPI, dataGetSearch } from "../../redux/searchRedux";

import Search from "./Search.js";

const SearchImport = () => {
  const [search, setSearch] = useState([]);
  const dataSearch = useSelector(dataGetSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchAPI());
  }, []);

  useEffect(() => {
    if (dataSearch.search) {
      setSearch(dataSearch.search);
    }
  }, [dataSearch]);

  return (
    <div className="w-full bg-green-50">
      <div className="w-1/2 mx-auto">
        <div className="pt-28">
          <div className="text-center font-SmoochSans mt-2 ml-3 text-4xl text-sky-600 font-medium drop-shadow-xl shadow-white">
            Đăng Ký Khám Qua Childrent's Care
          </div>
          <div className="text-center text-slate-800 font-[430] text-lg">
            Để được tiếp đón ưu tiên hoặc được tư vấn với bác sĩ riêng
          </div>
        </div>
        <Search
          data={search}
          placeholder={"Tìm kiếm bác sĩ, danh mục, dịch vụ ..."}
        />
      </div>
    </div>
  );
};

export default SearchImport;
