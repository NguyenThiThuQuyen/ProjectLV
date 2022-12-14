import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { addUserAPI } from "../../../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../utils/CommonUtils";
import logo from "../../../../assets/upload/logo.png";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import {
  getAllRoleAPI,
  getAllGenderAPI,
  dataGetAllGender,
  dataGetAllRole,
  dataCheck,
} from "../../../../redux/userRedux";
import { toast } from "react-toastify";
export default function UserModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [gender, setgender] = useState();
  const [roleId, setRoleId] = useState();

  const [contentMarkdown, setContentMarkdown] = useState();
  const [contentHTML, setContentHTML] = useState();
  const [description, setDescription] = useState();

  const dataGender = useSelector(dataGetAllGender);
  const dataRole = useSelector(dataGetAllRole);
  const check = useSelector(dataCheck);
  const params = {
    name: name,
    email: email,
    image: image,
    address: address,
    phone: phone,
    gender: gender,
    roleId: roleId,

    contentMarkdown: contentMarkdown,
    contentHTML: contentHTML,
    description: description,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenderAPI());
    dispatch(getAllRoleAPI());
  }, [check]);

  // const handleXemMenu = (id, menuId) => {
  //   dispatch(
  //     getFindEatDetailToDateAPI({
  //       menuId: dataFindId?.menuId,
  //       eatdateId: dataFindId?.eatdateId,
  //     })
  //   );
  //   navigator(`/manager/detail-menu/${menuId}/${id}`);
  // };

  const handleSave = () => {
    if (!name) {
      toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
    } else {
      dispatch(addUserAPI(params));
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
                    TH??M NG?????I D??NG
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-3">
                      <div className="grid row-span-1 grid-cols-4">
                        <div className="col-span-1 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            H??? t??n
                          </label>
                          <input
                            type="text"
                            placeholder="Nguy???n V??n A"
                            className="w-full h-10 border rounded-sm p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            S??? ??i???n tho???i
                          </label>
                          <input
                            type="text"
                            placeholder="0771231234"
                            className="w-full h-10 border rounded-sm p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            onChange={(event) => setPhone(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Gi???i t??nh
                          </label>
                          <select
                            className="w-full h-10 border rounded-sm p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            id=""
                            onChange={(event) => setgender(event.target.value)}
                          >
                            {dataGender.data &&
                              dataGender.data.length > 0 &&
                              dataGender.data.map((item, index) => {
                                return (
                                  <option key={index} value={item.keyMap}>
                                    {item.value}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-1 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Email
                          </label>
                          <input
                            type="text"
                            placeholder="abc@gmail.com"
                            className="w-full h-10 border rounded-sm p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-4">
                        <div className="col-span-2 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            ?????a ch???
                          </label>
                          <input
                            type="text"
                            placeholder="Nh???p ?????a ch??? th?????ng tr??"
                            className="w-full h-10 border rounded-sm p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            onChange={(event) => setAddress(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-1">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Quy???n
                          </label>
                          <select
                            className="w-full h-10 border rounded-sm p-2 mt-1 bg-slate-50 border-slate-300 outline-slate-300"
                            id=""
                            onChange={(event) => setRoleId(event.target.value)}
                          >
                            {dataRole.data &&
                              dataRole.data.length > 0 &&
                              dataRole.data.map((item, index) => {
                                return (
                                  <option key={index} value={item.keyMap}>
                                    {item.value}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-1 mx-3 my-1 relative">
                          <label
                            htmlFor=""
                            className="text-slate-600 ml-2 flex"
                          >
                            T???i ???nh
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
                    </div>
                    {roleId === "R2" ? (
                      <div className="mt-5">
                        <MdEditor
                          style={{ height: "200px" }}
                          renderHTML={(text) => mdParser.render(text)}
                          onChange={handleEditorChange}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    ????NG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    L??u th??ng tin
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
