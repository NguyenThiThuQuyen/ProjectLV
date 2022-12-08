import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addPatientAPI } from "../../../../redux/patientRedux";
import { useDispatch, useSelector } from "react-redux";
import { ImUpload3 } from "react-icons/im";
import { BsPlusLg } from "react-icons/bs";
import moment from "moment";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import NavbarUser from "../../NavbarUser";
import { getBase64 } from "../../../../utils/CommonUtils";
import { Link, useParams, useLocation } from "react-router-dom";
import logo from "../../../../assets/upload/logo.png";
import {
  getAllGenderAPI,
  dataGetAllGender,
  dataCheck,
} from "../../../../redux/userRedux";
import { getAParentAPI, dataGetAParent } from "../../../../redux/parentRedux";
import { toast } from "react-toastify";
export default function PatientModal2(props) {
  console.log("props:", props);
  const [showModal, setShowModal] = useState(false);
  const [childrentName, setChildrentName] = useState();
  const [gender, setgender] = useState("M");
  const [birthday, setBirthday] = useState(new Date());
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const dataGender = useSelector(dataGetAllGender);
  const check = useSelector(dataCheck);
  const [parentId, setParentId] = useState();
  const params = {
    childrentName: childrentName,
    birthday: birthday,
    image: image,
    parentId: parentId,
    gender: gender,
    name: name,
  };

  const dispatch = useDispatch();

  const data = useSelector(dataGetAParent);

  useEffect(() => {
    setParentId(props?.paramsphuhynh?.parentId);
  }, [props.paramsphuhynh]);

  useEffect(() => {
    dispatch(getAllGenderAPI());
    dispatch(getAParentAPI(props?.paramsphuhynh?.parentId));
  }, [check]);

  const handleSave = () => {
    dispatch(addPatientAPI(params));
    setShowModal(false);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
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
      {showModal === true ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM THÔNG TIN CỦA TRẺ
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid row-auto">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-800 ml-2">
                            Tên người đại diện
                          </label>

                          <div className="w-full text-sky-700 h-10 border rounded-md p-2 mt-1 bg-white outline-slate-300 cursor-not-allowed">
                            {data?.parent?.name}
                          </div>
                        </div>

                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-800 ml-2">
                            Điện thoại
                          </label>

                          <div className="w-full text-sky-700 h-10 border rounded-md p-2 mt-1 bg-white outline-slate-300 cursor-not-allowed">
                            {data?.parent?.phone}
                          </div>
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-800 ml-2">
                            Họ tên trẻ
                          </label>
                          <input
                            type="text"
                            placeholder="VD: Nguyễn Văn A"
                            className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) =>
                              setChildrentName(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-800 ml-2">
                            Giới tính
                          </label>
                          <select
                            className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
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
                      </div>

                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-800 ml-2">
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
                        <div className="col-span-1 mx-3 my-4 relative">
                          <label
                            htmlFor=""
                            className="text-slate-800 ml-2 flex"
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
                    </div>
                  </form>
                </div>
                <div className="flex mt-14 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                    LƯU THÔNG TIN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
