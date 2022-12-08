import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3 } from "react-icons/im";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import logo from "../../../../assets/upload/logo.png";
import { createCategoryAPI } from "../../../../redux/danhmucmonanRedux";

import "react-toastify/dist/ReactToastify.css";
export default function CategoryModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const params = { name: name };

  const handleSave = () => {
    dispatch(createCategoryAPI(params));
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  const handleClose = () => {
    setShowModal(false);
    props.handleClose(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500">
                    TẠO DANH MỤC MÓN ĂN
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid row-span-1 grid-cols-1">
                    <div className="col-span-1 mx-3 my-1">
                      <label htmlFor="" className="text-slate-600 ml-2">
                        Tên danh mục món ăn
                      </label>
                      <input
                        type="text"
                        placeholder="..."
                        onChange={(event) => setName(event.target.value)}
                        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose(false)}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    LƯU THÔNG TIN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
