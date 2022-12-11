import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { createNewsAPI } from "../../../../redux/newsRedux";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../utils/CommonUtils";
import logo from "../../../../assets/upload/logo.png";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import { toast } from "react-toastify";
export default function UserModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [mota, setMota] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [gender, setgender] = useState();
  const [roleId, setRoleId] = useState();

  const [contentMarkdown, setContentMarkdown] = useState();
  const [contentHTML, setContentHTML] = useState();
  const [description, setDescription] = useState();

  const params = {
    name: name,
    mota: mota,
    image: image,
    contentMarkdown: contentMarkdown,
    contentHTML: contentHTML,
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!name) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
    } else {
      dispatch(createNewsAPI(params));
      setShowModal(false);
      props.handleMo(false);
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
  }

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
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM TIN TỨc
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid row-auto">
                      <div className="grid row-span-1 grid-cols-4">
                        <div className="col-span-2 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tiêu đề
                          </label>
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>

                        <div className="col-span-1 mx-3 my-1 relative">
                          <label
                            htmlFor=""
                            className="text-slate-600 ml-2 flex"
                          >
                            Tải ảnh
                            <ImUpload3 className="mt-1 ml-2" />
                          </label>
                          <input
                            type="file"
                            placeholder="..."
                            className="mt-2"
                            onChange={(event) => uploadImage(event)}
                          />
                          <div className="absolute">
                            <img src={image} width={"100px"} height={"100px"} />
                          </div>
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-4">
                        <div className="col-span-2 mx-3">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Mô tả ngắn
                          </label>
                          <textarea
                            type="text"
                            placeholder="Nhập thông tin mô tả ngắn"
                            className="w-full h-16 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) => setMota(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <MdEditor
                        style={{ height: "200px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    Lưu thông tin
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
