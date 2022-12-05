import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { getCreateParentPatientAPI } from "../../../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../utils/CommonUtils";
// import PatientModal from "../Patient/PatientModal";
import logo from "../../../../assets/upload/logo.png";

import { Link } from "react-router-dom";
import {
  getAllGenderAPI,
  dataGetAllGender,
  dataCheck,
} from "../../../../redux/userRedux";
export default function ParentModal() {
  const [showModal, setShowModal] = useState(false);
  // parent
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("123");
  const [genderparent, setGenderparent] = useState();

  // patient
  const [childrentName, setChildrentName] = useState();
  const [genderpatient, setGenderpatient] = useState();
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const dataGender = useSelector(dataGetAllGender);
  const check = useSelector(dataCheck);

  const params = {
    // parent
    name: name,
    email: email,
    phone: phone,
    address: address,
    password: password,
    genderparent: genderparent,

    // patient
    childrentName: childrentName,
    birthday: birthday,
    image: image,
    genderpatient: genderpatient,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenderAPI());
  }, [check]);

  //   const idParent = localStorage.getItem("id")
  //     ? JSON.parse(localStorage.getItem("id"))
  //     : false;

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const handleSave = async () => {
    dispatch(getCreateParentPatientAPI(params));
    setShowModal(false);
  };

  return (
    <>
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
              className="flex text-teal-800 font-medium hover:text-slate-800"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <BsPlusLg className="mr-2 mt-1 text-teal-700" />
              Thêm thông tin
            </button>
          </div>
          <div className="ml-8 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-800"
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
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM NGƯỜI DÙNG
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative px-6 pt-3 pb-20 flex-auto">
                  <form className="">
                    <div className="text-sky-800 uppercase text-sm font-medium">
                      Thông tin phụ huynh
                    </div>
                    <div className="grid row-auto">
                      <div className="grid row-span-1">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-800 ml-2">
                              Họ tên người đại diện trẻ
                            </label>
                            <input
                              type="text"
                              placeholder="..."
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              onChange={(event) => setName(event.target.value)}
                            />
                          </div>
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-800 ml-2">
                              Số điện thoại
                            </label>
                            <input
                              type="text"
                              placeholder="..."
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              onChange={(event) => setPhone(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid row-span-1">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-800 ml-2">
                              Giới tính
                            </label>
                            <select
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
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
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-800 ml-2">
                              Email
                            </label>
                            <input
                              type="text"
                              placeholder="..."
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid row-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-800 ml-2">
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-3 text-sky-800 uppercase text-sm font-medium">
                      Thông tin trẻ
                    </div>
                    <div className="grid row-auto">
                      <div className="grid row-span-1">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-800 ml-2">
                              Họ tên trẻ
                            </label>
                            <input
                              type="text"
                              placeholder="..."
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              onChange={(event) =>
                                setChildrentName(event.target.value)
                              }
                            />
                          </div>
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              Ngày sinh
                            </label>
                            <DatePicker
                              className="w-full border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
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
                      </div>

                      <div className="grid row-span-1">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 mx-3 mt-2">
                            <label htmlFor="" className="text-slate-800 ml-2">
                              Giới tính
                            </label>
                            <select
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
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

                          {/* hinh */}
                          <div className="col-span-1 mx-3 mt-2">
                            <label
                              htmlFor=""
                              className="text-slate-600 ml-2 flex relative"
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
                              <img
                                src={image}
                                width={"100px"}
                                height={"100px"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ĐÓNG
                  </button>
                  <div
                    // to={`/manager/patient-modal-manager?id=${idParent + 1}`}
                    className="flex"
                  >
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
