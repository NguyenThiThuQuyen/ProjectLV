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
import {
  getAllGenderAPI,
  dataGetAllGender,
  dataCheck,
} from "../../../../redux/userRedux";
export default function PatientModal2(props) {
  const [showModal, setShowModal] = useState(false);
  const [childrentName, setChildrentName] = useState();
  const [gender, setgender] = useState("M");
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  // const [id, setId] = useState();
  const dataGender = useSelector(dataGetAllGender);
  const check = useSelector(dataCheck);
  const [parentId, setParentId] = useState();
  const params = {
    childrentName: childrentName,
    birthday: birthday,
    address: address,
    image: image,
    parentId: parentId,
    gender: gender,
    name: name,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setParentId(props.item.id);
    setName(props.item.name);
  }, [props.item]);
  console.log("props.item:", props.item);

  useEffect(() => {
    dispatch(getAllGenderAPI());
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
  return (
    <>
      <div className="ml-5">
        <button type="button" onClick={() => setShowModal(true)}>
          <BsPlusLg className="cursor-pointer text-lg text-blue-600" />
        </button>
      </div>
      {showModal === true ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM THÔNG TIN CỦA TRẺ
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-2">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên người đại diện
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            disabled
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Họ tên trẻ
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) =>
                              setChildrentName(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Giới tính
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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

                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ngày sinh
                          </label>
                          <DatePicker
                            className="w-full border border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
                            selected={birthday}
                            onChange={(date) => setBirthday(date)}
                            dateFormat="yyyy/MM/dd"
                            maxDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) => setAddress(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4 relative">
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
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex mt-14 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <Link
                    to="/manager/patient-manager"
                    className="flex"
                    // onClick={() => setShowModal(true)}
                  >
                    <button
                      className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleSave()}
                    >
                      SAVE
                    </button>
                  </Link>
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
