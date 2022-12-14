import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ImUpload3 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import logo from "../../../../assets/upload/logo.png";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {
  getAllCaterogyAPI,
  dataGetAllCaterogy,
} from "../../../../redux/danhmucmonanRedux";
import { editDishAPI } from "../../../../redux/monanRedux";

export default function DishModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [name, setName] = useState(false);
  const [categoryId, setCategoryId] = useState(false);
  const [contentHTML, setContentHTML] = useState(false);
  const [contentMarkdown, setContentMarkdown] = useState(false);
  const [id, setId] = useState();
  const params = {
    name: name,
    categoryId: categoryId,
    contentMarkdown: contentMarkdown,
    contentHTML: contentHTML,
    id: id,
  };

  const dispatch = useDispatch();
  const data = useSelector(dataGetAllCaterogy);

  useEffect(() => {
    setName(props.item.name);
    setCategoryId(props?.item?.categoryId);
    setContentMarkdown(props?.item?.contentMarkdown);
    setContentHTML(props?.item?.contentHTML);
    setId(props.item.id);
  }, [props.item]);

  useEffect(() => {
    dispatch(getAllCaterogyAPI());
  }, []);

  const handleSaveEdit = () => {
    dispatch(editDishAPI(params));
    setShowModalEdit(false);
  };

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
  }
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
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    S???A TH??NG TIN M??N ??N
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid row-span-1 grid-cols-3">
                    <div className="col-span-1 mx-3 my-1">
                      <label htmlFor="" className="text-slate-600 ml-2">
                        T??n m??n ??n
                      </label>
                      <input
                        type="text"
                        placeholder="..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                      />
                    </div>
                    <div className="col-span-1 mx-3 my-1">
                      <label htmlFor="" className="text-slate-600 ml-2">
                        Danh m???c
                      </label>
                      <select
                        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                        id=""
                        value={categoryId}
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
                    style={{ height: "280px", marginTop: "40px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalEdit(false)}
                  >
                    ????NG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSaveEdit()}
                  >
                    L??U TH??NG TIN
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
