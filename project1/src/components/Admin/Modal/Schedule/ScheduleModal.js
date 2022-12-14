import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import logo from "../../../../assets/upload/logo.png";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../../redux/services/userService";
import { checkthemlichbacsi } from "../../../../redux/services/scheduleService";
import Select from "react-select";
import localization from "moment/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ImDownload3, ImUpload3 } from "react-icons/im";

import {
  createScheduleAPI,
  getAllDoctorAPI,
  dataGetDoctor,
  dataCheck,
  //   deletePatientAPI,
} from "../../../../redux/scheduleRedux";

import {
  getAllTimeslotAPI,
  datagetAllTimeslot,
} from "../../../../redux/timeslotRedux";
import { toast } from "react-toastify";

export default function ScheduleModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [registerDate, setRegisterDate] = useState("");
  const [createDate, setCreateDate] = useState();
  const [timeslotId, setTimeslotId] = useState([]);
  const [userId, setUserId] = useState("");
  const [mangBacSi, setMangBacSi] = useState([]);
  const [mangNgay, setMangNgay] = useState([]);
  const [arrCheck, setArrayCheck] = useState([]);
  const dataDoctor = useSelector(dataGetDoctor);
  const dataTimeslot = useSelector(datagetAllTimeslot);
  const params = {
    registerDate: registerDate,
    timeslotId: timeslotId,
    userId: userId,
  };

  useEffect(() => {
    dispatch(getAllTimeslotAPI());
    dispatch(getAllDoctorAPI());
    getDate();
    // choiceTimes();
  }, [props?.openModal]);
  console.log("=============> props?.openModal", props?.openModal);
  useEffect(() => {
    if (dataDoctor?.doctor?.data) {
      setUserId(dataDoctor?.doctor?.data[0]?.id);
    }
  }, [dataDoctor]);

  const getDate = () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      object.lable = moment(new Date())
        .add(i, "days")
        .format("dddd - DD/MM/YYYY");
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    setCreateDate(arrDate);
  };

  useEffect(() => {
    if (registerDate && userId) {
      choiceTimes();
    }
  }, [registerDate]);
  useEffect(() => {
    // console.log("update userId");
    if (registerDate && userId) {
      // check();
      choiceTimes();
    }
  }, [userId]);
  useEffect(() => {
    // check();
    choiceTimes();
  }, []);
  const check = async () => {
    let res = await checkthemlichbacsi(userId, registerDate);
    // console.log("res api", res);
  };
  useEffect(() => {
    if (createDate) {
      setRegisterDate(createDate[0].value);
    }
  }, [createDate]);

  const choiceTimes = async () => {
    let data = dataTimeslot.timeslot;
    if (data && data.length > 0) {
      data = data.map((item) => ({
        ...item,
        isSelected: false,
        datontai: false,
      }));
      // setTimeslotId(data);
      // ch???y 2 d??ng map ????? push kt
      let res = await checkthemlichbacsi(userId, registerDate);
      if (data.length > 0) {
        let arr = [];
        data.map((item1, index1) => {
          res?.check?.map((item2, index2) => {
            if (item1.id === item2.timeslotId * 1) {
              let obj = {};
              item1.datontai = true;
              // data.push(obj);
            }
          });
        });
        setTimeslotId(data);
      }
    }
  };

  useEffect(() => {
    if (dataTimeslot.timeslot) {
      choiceTimes();
    }
  }, [dataTimeslot]);

  const handleClickBtnTime = (time) => {
    if (timeslotId && timeslotId.length > 0) {
      let times = timeslotId.map((item) => {
        if (item?.id === time?.id) item.isSelected = !item.isSelected;
        return item;
      });
      setTimeslotId(times);
    }
  };

  const dispatch = useDispatch();

  const handleSave = async () => {
    console.log("click ");
    let result = [];
    let data = params.timeslotId;
    console.log("data", data);
    if (data && data.length > 0) {
      let selectTime = data.filter((item) => item.isSelected === true);
      if (selectTime && selectTime.length > 0) {
        selectTime.map((schedule, index) => {
          let object = {};
          object.userId = params.userId;
          object.registerDate = params.registerDate * 1;
          object.timeslotId = schedule.id;
          result.push(object);
        });
      }
    }
    console.log("result", result);
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      userId: params.userId,
      registerDate: params.registerDate * 1,
    });
    console.log("res", res);
    if (res.code == 0) {
      toast.success(res.message);
      dispatch(createScheduleAPI());
      props.handleMo(false);
      setShowModal(false);
      setTimeout(function () {
        window.location.reload(1);
      }, 4000);
    }
  };

  useEffect(() => {
    let arr = [];
    dataDoctor?.doctor?.data &&
      dataDoctor?.doctor?.data.length > 0 &&
      dataDoctor?.doctor?.data.map((item, index) => {
        const options = { value: item.id, label: item.name };
        arr.push(options);
      });
    setMangBacSi(arr);
  }, [dataDoctor]);

  useEffect(() => {
    let arr = [];
    createDate &&
      createDate.length > 0 &&
      createDate.map((item, index) => {
        const options = { value: item.value, label: item.lable };
        arr.push(options);
      });
    setMangNgay(arr);
  }, [createDate]);

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  const handleBacSi = (item) => {
    setUserId(item.value);
  };

  const handleNgay = (item) => {
    setRegisterDate(item.value);
  };

  const handleClose = () => {
    setShowModal(false);
    props.handleClose(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-auto my-6 mx-auto">
              <div className="border-0 rounded-md shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                  <div className="text-base font-bold text-slate-500">
                    TH??M L???CH T?? V???N
                  </div>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="p-6 pb-5">
                  <form className="">
                    <div className="grid row-auto">
                      {/* <div className="grid row-span-1"> */}
                      <div className="grid grid-cols-2">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            T??n b??c s??
                          </label>

                          <Select
                            className="w-full"
                            options={mangBacSi}
                            onChange={handleBacSi}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ch???n ng??y
                          </label>
                          {/* <select
                            className="w-full border-2 p-2 rounded-md mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setRegisterDate(event.target.value)
                            }
                          >
                            {createDate &&
                              createDate.length > 0 &&
                              createDate.map((item, index) => {
                                return (
                                  <option value={item.value} key={index}>
                                    {item.lable}
                                  </option>
                                );
                              })}
                          </select> */}
                          <Select
                            className="w-full"
                            options={mangNgay}
                            onChange={handleNgay}
                          />
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="grid row-span-1 relative">
                        <div className="grid-cols-2 ">
                          <div className="col-span-2 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              Khung gi???
                            </label>
                            <div
                              id=""
                              className="row-auto grid grid-cols-5"
                              onChange={(event) =>
                                setTimeslotId(event.target.value)
                              }
                            >
                              {timeslotId &&
                                timeslotId.length > 0 &&
                                timeslotId.map((item, index) => {
                                  return (
                                    <div className="col-span-1">
                                      {item.datontai === false ? (
                                        <div
                                          className={
                                            item.isSelected === true
                                              ? "cursor-pointer inline-flex m-2 w-fit h-10 border rounded-md p-2 mt-1 bg-green-300 outline-slate-300"
                                              : "cursor-pointer inline-flex m-2 w-fit h-10 border rounded-md p-2 mt-1 bg-slate-200 hover:bg-slate-300 outline-slate-300"
                                          }
                                          key={index}
                                          value={item.id}
                                          onClick={() =>
                                            handleClickBtnTime(item)
                                          }
                                        >
                                          {item.timeslot}
                                        </div>
                                      ) : (
                                        <div
                                          className={
                                            "cursor-pointer inline-flex m-2 w-fit h-10 border rounded-md p-2 mt-1 bg-red-500 outline-slate-300"
                                          }
                                          key={index}
                                          value={item.id}
                                        >
                                          {item.timeslot}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
