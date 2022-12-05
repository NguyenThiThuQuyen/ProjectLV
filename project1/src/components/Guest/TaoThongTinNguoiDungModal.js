import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import bglogin from "../../assets/upload/logo.png";
import { getBase64 } from "../../utils/CommonUtils";
import { ImUpload3, ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import XemChiTietLichModal from "./XemChiTietLichModal";
import {
  getCreateParentPatientAPI,
  dataGetAllGender,
  getAllGenderAPI,
} from "../../redux/userRedux";
import { getLoginGuestAPI, dataCheck } from "../../redux/Auth/guestRedux";
import { createPhieudatchoAPI } from "../../redux/phieudatchoRedux";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TaoThongTinNguoiDungModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [showModalXemLai, setShowModalXemLai] = useState(false);
  const [check, setCheck] = useState(true);

  // parent
  const [name, setName] = useState("A");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("01234567");
  const [password, setPassword] = useState("");
  const [genderparent, setGenderparent] = useState("M");

  // patient
  const [childrentName, setChildrentName] = useState("B");
  const [genderpatient, setGenderpatient] = useState("M");
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState("ADFG");
  const [parentId, setParentId] = useState();
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const dataGender = useSelector(dataGetAllGender);

  const params = {
    // newCreateUserId: newCreateUserId
    // parent
    name: name,
    email: email,
    phone: phone,
    password: password,
    genderparent: genderparent,

    // patient
    childrentName: childrentName,
    birthday: birthday,
    address: address,
    image: image,
    genderpatient: genderpatient,
    parentId: parentId,
  };

  useEffect(() => {
    dispatch(getAllGenderAPI());
  }, []);

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  const parent = JSON.parse(localStorage.getItem("parent"));

  const paramsparent = {
    email: email,
    password: password,
  };

  const checkTest = useSelector(dataCheck);

  const handleSave = async () => {
    dispatch(getCreateParentPatientAPI(params));

    let test = await dispatch(getLoginGuestAPI(paramsparent));
    if (test.payload.code === 0) {
      setShowModal(false);
      props.hanldeParent(true);
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const hanldeClose = async () => {
    setShowModal(false);
    props.hanldeParent(false);
  };

  const handleopen = (data3) => {
    setShowModalXemLai(data3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getLoginGuestAPI(paramsparent));
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="items-start justify-between p-5 border-b border-solid border-slate-200">
                  {check === true ? (
                    <div className="flex justify-between">
                      <div className="flex">
                        <div
                          className="text-sm font-semibold underline underline-offset-8 text-green-700 cursor-pointer"
                          onClick={() => setCheck(true)}
                        >
                          ĐĂNG NHẬP
                        </div>

                        <div
                          className="mx-5 text-sm font-semibold text-green-700 cursor-pointer"
                          onClick={() => setCheck(false)}
                        >
                          TẠO THÔNG TIN
                        </div>
                      </div>
                      <div
                        children="cursor-pointer"
                        title="Đóng"
                        onClick={() => hanldeClose()}
                      >
                        <ImCancelCircle size={20} className="text-green-800" />
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <div className="flex">
                        <div
                          className="text-sm font-semibold text-green-700"
                          onClick={() => setCheck(true)}
                        >
                          ĐĂNG NHẬP
                        </div>
                        <div
                          className="mx-5 text-sm font-semibold underline underline-offset-8 text-green-700"
                          onClick={() => setCheck(false)}
                        >
                          TẠO THÔNG TIN
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {check === true ? (
                  <div className="">
                    {/* <div className="border-2 border-slate-200 shadow-lg shadow-indigo-400 mx-auto w-11/12 bg-white"> */}
                    <div className="mt-10">
                      <img
                        src={bglogin}
                        alt=""
                        className="mx-auto w-[40px] h-[40px] object-cover opacity-80"
                      />
                      <div className="text-2xl mt-5 font-medium text-center text-sky-700 uppercase">
                        Đăng nhập
                      </div>

                      <form
                        className="xl:mx-24 md:mx-8 xs:mx-6"
                        onSubmit={handleSubmit}
                      >
                        <div className="grid grid-cols-1">
                          <div className="col-span-1 my-2">
                            <input
                              type="text"
                              placeholder="Email"
                              onChange={(event) => setEmail(event.target.value)}
                              className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1">
                          <div className="col-span-1 my-2">
                            <input
                              type="password"
                              placeholder="Password"
                              className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 my-5 w-full">
                          <div className="col-span-1 my-2 mx-auto">
                            <button
                              className="border-2 rounded-3xl px-7 py-2 bg-sky-500 text-white font-medium
                                                                  hover:bg-transparent 
                                                                  hover:border-2
                                                                  hover:border-sky-500
                                                                  hover:text-black"
                              type="submit"
                            >
                              ĐĂNG NHẬP
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* </div> */}
                  </div>
                ) : (
                  <div className="">
                    <div className="relative p-6 flex-auto">
                      <div className="shadow-lg shadow-slate-300 border-slate-200 pb-5">
                        <div className="text-sm font-semibold text-sky-700 ml-5">
                          NHẬP THÔNG TIN NGƯỜI ĐẠI DIỆN TRẺ:
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-red-600 ml-5">
                            Thông tin bắt buộc nhập *
                          </div>
                          <div className="grid grid-rows-2 mt-2">
                            <div className="grid row-span-1 grid-cols-3">
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Họ tên người đại diện
                                </label>
                                <input
                                  type="text"
                                  placeholder="Ví dụ: Nguyễn Văn A"
                                  onChange={(event) =>
                                    setName(event.target.value)
                                  }
                                  className="w-full h-10 border-2 rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                />
                              </div>
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Chọn giới tính
                                </label>

                                <select
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  id=""
                                  onChange={(event) =>
                                    setGenderparent(event.target.value)
                                  }
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
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Địa chỉ liên hệ
                                </label>
                                <input
                                  type="text"
                                  placeholder="Nhập địa chỉ thường trú"
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  onChange={(event) =>
                                    setAddress(event.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid row-span-1 grid-cols-3 mt-2">
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Email
                                </label>
                                <input
                                  type="text"
                                  placeholder="Ví dụ: abc@gmail.com"
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  onChange={(event) =>
                                    setEmail(event.target.value)
                                  }
                                />
                              </div>
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Mật khẩu:
                                </label>
                                <input
                                  type="text"
                                  placeholder="..."
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  onChange={(event) =>
                                    setPassword(event.target.value)
                                  }
                                />
                              </div>
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Điện thoại liên hệ
                                </label>
                                <input
                                  type="text"
                                  placeholder="07772343456"
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  onChange={(event) =>
                                    setPhone(event.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="shadow-lg shadow-slate-300 border-slate-200 py-5">
                        <div className="text-sm font-semibold text-sky-700 ml-5 mt-5">
                          NHẬP THÔNG TIN TRẺ:
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-red-600 ml-5">
                            Thông tin bắt buộc nhập *
                          </div>

                          <div className="grid grid-rows-2 mt-2">
                            <div className="grid row-span-1 grid-cols-3">
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Họ tên trẻ
                                </label>
                                <input
                                  type="text"
                                  placeholder="Ví dụ: Nguyễn Văn B"
                                  className="w-full h-10 border-2 rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  onChange={(event) =>
                                    setChildrentName(event.target.value)
                                  }
                                />
                              </div>
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Chọn giới tính
                                </label>
                                <select
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  id=""
                                  onChange={(event) =>
                                    setGenderpatient(event.target.value)
                                  }
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
                              <div className="col-span-1 mx-5">
                                <label htmlFor="" className="text-slate-700">
                                  Ngày sinh
                                </label>
                                <DatePicker
                                  className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300 bg-slate-100"
                                  selected={birthday}
                                  onChange={(date) => setBirthday(date)}
                                  dateFormat="yyyy/MM/dd"
                                  maxDate={new Date()}
                                  isClearable
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                />
                              </div>
                            </div>

                            <div className="grid row-span-1 grid-cols-3 mt-4">
                              <div className="col-span-1 mx-3 relative">
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
                                {/* <div className="absolute">
                                  <img
                                    src={image}
                                    width={"100px"}
                                    height={"100px"}
                                  />
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => hanldeClose()}
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

                    {showModalXemLai ? (
                      <>
                        <XemChiTietLichModal
                          openModal={showModalXemLai}
                          handleMoLai={handleopen}
                        />
                        ;
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
