import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3 } from "react-icons/im";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {
  getAllCaterogyAPI,
  dataGetAllCaterogy,
} from "../../../../redux/danhmucmonanRedux";
import { createDishAPI } from "../../../../redux/monanRedux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
export default function DishModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(false);
  const [categoryId, setCategoryId] = useState(false);
  const [contentHTML, setContentHTML] = useState(false);
  const [contentMarkdown, setContentMarkdown] = useState(false);

  const params = {
    name: name,
    categoryId: categoryId,
    contentMarkdown: contentMarkdown,
    contentHTML: contentHTML,
  };

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
  }
  const data = useSelector(dataGetAllCaterogy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCaterogyAPI());
    setCategoryId(params.categoryId[0]);
  }, []);

  const handleSave = () => {
    dispatch(createDishAPI(params));
    setShowModal(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-4 ml-5">
        <div className="ml-5 flex justify-start">
          <div className="flex items-center border border-scale-200 p-1 rounded">
            <input
              className="border-0 outline-0 bg-transparent"
              type="text"
              placeholder="Tìm kiếm..."
            />
            <BsSearch />
          </div>
        </div>
        <div className="flex">
          <div className="ml-6 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <BsPlusLg className="mr-2 mt-1 text-teal-700" />
              Thêm món ăn
            </button>
          </div>
          <div className="ml-8 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
            >
              <ImDownload3 className="mr-2 mt-1 text-teal-700" />
              Xuất excel
            </button>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500">
                    TẠO MÓN ĂN
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid row-span-1 grid-cols-3">
                    <div className="col-span-1 mx-3 my-1">
                      <label htmlFor="" className="text-slate-600 ml-2">
                        Tên món ăn
                      </label>
                      <input
                        type="text"
                        placeholder="..."
                        onChange={(event) => setName(event.target.value)}
                        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                      />
                    </div>
                    <div className="col-span-1 mx-3 my-1">
                      <label htmlFor="" className="text-slate-600 ml-2">
                        Danh mục
                      </label>
                      <select
                        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                        id=""
                        onChange={(event) => setCategoryId(event.target.value)}
                      >
                        {data.categories &&
                          data.categories.length > 0 &&
                          data.categories.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <MdEditor
                    style={{ height: "200px", marginTop: "40px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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
