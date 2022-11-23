import React, { useState } from "react";
import "./Search.css";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
// import { createLogger } from "redux-logger";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { BiSearch } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    let test = removeVietnameseTones(searchWord); // đổi ký tự nhập thành không dấu

    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      let remove = removeVietnameseTones(value.title); //đổi title thành không dấu
      return (
        remove.toLowerCase().includes(test.toLowerCase()) || // đổi thành chữ thường
        remove.includes(test)
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  };
  return (
    <>
      <div className="flex pb-10 mt-5">
        {/* <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        /> */}
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          className="pl-5 w-full h-12 border hover:border-none rounded-l-3xl p-2 bg-slate-50 shadow-lg outline-slate-300"
        />
        <div className="overflow-hidden overflow-y-auto">
          {filteredData.length === 0 ? (
            <>
              {" "}
              <button className="hover:bg-green-600 border w-[90px] rounded-r-3xl h-12 bg-slate-50 shadow-lg">
                <BiSearch
                  size={22}
                  className="text-slate-600 ml-5 hover:text-white"
                />
              </button>
            </>
          ) : (
            <div id="clearBtn" onClick={clearInput}>
              <button className="hover:bg-green-600 border w-[90px] rounded-r-3xl h-12 bg-slate-50 shadow-lg">
                <MdOutlineCancel
                  size={22}
                  className="text-slate-600 ml-5 hover:text-white"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="absolute bg-white mt-[-25px] w-[770px] h-[200px] shadow-lg overflow-hidden overflow-y-scroll">
          {filteredData.slice(0, 15).map((value, key) => {
            let imageBase64 = new Buffer(value.img, "base64").toString(
              "binary"
            );
            return (
              <div>
                <Link to={value.link}>
                  <p className="title-dataItem px-5 py-2 hover:bg-sky-200">
                    {imageBase64 !== undefined ? (
                      <div className="flex">
                        <img className="img-dataResult" src={imageBase64}></img>
                        <span className="mt-1">{value.title}</span>
                      </div>
                    ) : (
                      <span className="mt-1">{value.title}</span>
                    )}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Search;
