import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ImUpload3 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { editCategoryAPI } from "../../../../redux/danhmucmonanRedux";

export default function CategoryEditModal(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [name, setName] = useState(false);

  const [id, setId] = useState();
  const params = {
    name: name,
    id: id,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setName(props.item.name);
    setId(props.item.id);
  }, [props.item]);

  const handleSaveEdit = () => {
    dispatch(editCategoryAPI(params));
    setShowModalEdit(false);
  };

  return (
    <>
      <div className="ml-5">
        <button type="button" onClick={() => setShowModalEdit(true)}>
          <BiEdit className="cursor-pointer text-lg text-blue-600" />
        </button>
      </div>
      {showModalEdit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM THUỐC
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEdit(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
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
                        value={name}
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
                    onClick={() => setShowModalEdit(false)}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSaveEdit()}
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
