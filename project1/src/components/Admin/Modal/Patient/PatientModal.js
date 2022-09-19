import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addPatientAPI } from "../../../../redux/patientRedux";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import NavbarUser from "../../NavbarUser";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  getAllGendersAPI,
  dataGetAllGender,
  dataCheck,
} from "../../../../redux/patientRedux";
export default function PatientModal(props) {
  const [showModal, setShowModal] = useState(true);
  const [childrentName, setChildrentName] = useState();
  const [genderId, setGenderId] = useState("1");
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const dataGender = useSelector(dataGetAllGender);
  const check = useSelector(dataCheck);
  const id = useLocation();
  const [parentId, setParentId] = useState(id.search.split("=")[1]);
  // const idParent = id.search.split("=")[1];
  // console.log("idParent:", idParent);
  // console.log("id1234: ", id.search.split("=")[1]);
  const params = {
    childrentName: childrentName,
    birthday: birthday,
    address: address,
    image: image,
    parentId: parentId,
    genderId: genderId,
    // idParent: idParent,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGendersAPI());
  }, [check]);

  const handleSave = () => {
    dispatch(addPatientAPI(params));
    setShowModal(false);
  };
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarUser />
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
                                Id parent
                              </label>
                              <input
                                type="text"
                                placeholder="..."
                                className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                                disabled
                                required
                                value={parentId}
                                onChange={(event) =>
                                  setParentId(event.target.value)
                                }
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
                                onChange={(event) =>
                                  setGenderId(event.target.value)
                                }
                              >
                                {dataGender.genders &&
                                  dataGender.genders.length > 0 &&
                                  dataGender.genders.map((item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.gender}
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
                              {/* <input
                                type="text"
                                placeholder="..."
                                className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                                onChange={(event) =>
                                  setBirthday(event.target.value)
                                }
                              /> */}
                              <DatePicker
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                dateFormat="Pp"
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
                                onChange={(event) =>
                                  setAddress(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <Link
                        to="/admin/patient-manager"
                        className="flex"
                        // onClick={() => setShowModal(true)}
                      >
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        </div>
      </div>
    </>
  );
}
