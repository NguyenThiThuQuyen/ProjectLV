import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataAllEatDates, getAllEatDatesAPI } from "../../redux/ngayanRedux";
import {
  getAllDishesAPI,
  dataGetFindDishToCate,
  getFindDishToCateAPI,
} from "../../redux/monanRedux";

import {
  getAllFindEatTimeslotsToSessionAPI,
  dataGetAllFindEatTimeslotsToSession,
} from "../../redux/eatTimeslotRedux";

import {
  getAllSessionsAPI,
  dataGetAllSessions,
} from "../../redux/sessionRedux";
import { createMenuAPI } from "../../redux/menuRedux";
import { createPrescriptionAPI } from "../../redux/prescriptionRedux";
import {
  dataGetAllCaterogy,
  getAllCaterogyAPI,
} from "../../redux/danhmucmonanRedux";

export default function MenuModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [dishId, setDishId] = useState();
  const [huongdanan, setHuongdanan] = useState();
  const [solan, setSolan] = useState();
  const [ghichu, setGhichu] = useState();
  const [eatdateId, setEatdateId] = useState();
  const [menuId, setMenuId] = useState();
  const [eatTimeslotId, setEatTimeslotId] = useState();

  const [loidan, setLoidan] = useState();
  const [sessionId, setSessionId] = useState();

  const dataEatDates = useSelector(dataAllEatDates);
  console.log("dataEatDates:", dataEatDates);
  const dataCate = useSelector(dataGetAllCaterogy);
  const dataFindDish = useSelector(dataGetFindDishToCate);
  const dataSession = useSelector(dataGetAllSessions);
  const dataFindEatTimeslots = useSelector(dataGetAllFindEatTimeslotsToSession);

  const dispatch = useDispatch();

  const params = {
    eatdateId: eatdateId,
    dishId: dishId,
    huongdanan: huongdanan,
    solan: solan,
    ghichu: ghichu,
    name: menuId,
    eatTimeslotId: eatTimeslotId,
  };

  console.log("params:", params);

  useEffect(() => {
    setShowModal(true);
  }, [props?.openModal === true]);

  useEffect(() => {
    dispatch(getAllEatDatesAPI());
    dispatch(getAllDishesAPI());
    dispatch(getAllCaterogyAPI());
    dispatch(getFindDishToCateAPI());
    dispatch(getAllSessionsAPI());
    // dispatch(getAllFindEatTimeslotsToSessionAPI());
  }, []);

  useEffect(() => {
    if (dataEatDates.eatdates) {
      setEatdateId(dataEatDates.eatdates[0].id);
    }
  }, [dataEatDates]);

  const handleFindDishToCate = (id) => {
    dispatch(getFindDishToCateAPI(id));
    setDishId(id);
  };

  const handleClose = () => {
    setShowModal(false);
    props.handleClose(false);
  };

  const handleSave = async () => {
    if (!eatTimeslotId || !eatdateId || !dishId) {
      setShowModal(true);
      alert("Vui lòng nhập đầy đủ thông tin !");
    } else {
      let getData = await dispatch(createMenuAPI(params));
      let getId = getData.payload.menu.data.menuId;
      let data2 = {
        eatdateId: eatdateId,
        menuId: getData.payload.menu.data.menuId,
      };
      if (props?.getParams) {
        props.getParams(data2);
      }

      let dataLuu = {
        dateCreate: props.params2.dateCreate,
        reservationTicketId: props.params2.reservationTicketId,
        menuId: getId,
        loidan: loidan,
        eatdateId: eatdateId,
      };
      dispatch(createPrescriptionAPI(dataLuu));
      setTimeout(function () {
        window.location.reload(1);
      }, 4000);

      setShowModal(false);
      props.handleMo(false);
    }
  };

  const handleFindEatTimeslot = (id) => {
    dispatch(getAllFindEatTimeslotsToSessionAPI({ sessionId: id }));
    setSessionId(id);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/5 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500">
                    TẠO THỰC ĐƠN
                  </h3>
                </div>
                <div className="relative px-6 py-4 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-5">
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-2 mx-3 flex">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Tiêu đề thực đơn:
                          </label>
                          <input
                            type="text"
                            className="border-b uppercase ml-2 border-solid border-slate-400 w-2/3 h-6 outline-none"
                            onChange={(event) => setMenuId(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Chọn ngày:
                          </label>
                          <select
                            className="ml-3 w-1/2 h-11 border rounded-lg p-2 bg-sky-300 outline-slate-300 shadow-lg hover:bg-sky-400"
                            id=""
                            onChange={(event) =>
                              setEatdateId(event.target.value)
                            }
                          >
                            {dataEatDates.eatdates &&
                              dataEatDates.eatdates.length > 0 &&
                              dataEatDates.eatdates.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.eatdate}
                                  </option>
                                );
                              })}
                          </select>
                        </div>

                        <div className="col-span-2 mx-3 flex">
                          <label
                            htmlFor=""
                            className="text-slate-900 ml-2 mt-3"
                          >
                            Chọn buổi ăn:
                          </label>
                          <div
                            className="flex w-4/5"
                            id=""
                            onClick={(e) =>
                              handleFindEatTimeslot(e.target.value)
                            }
                          >
                            {dataSession.session &&
                              dataSession.session.length > 0 &&
                              dataSession.session.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.id}
                                    className={
                                      item.id == sessionId
                                        ? "ml-2 w-1/2 h-12 shadow-lg rounded-lg p-2 mr-3 bg-green-500 hover:bg-green-500 cursor-pointer hover:text-white text-center"
                                        : "ml-2 w-1/2 h-12 shadow-lg rounded-lg p-2 mr-3 bg-green-300 hover:bg-green-500 cursor-pointer hover:text-white text-center"
                                    }
                                  >
                                    {item.name}
                                  </option>
                                );
                              })}
                          </div>
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-4 mt-1">
                        <div className="col-span-2 mx-3 mb-3">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Chọn giờ ăn
                          </label>
                          <div
                            className="flex"
                            id=""
                            onClick={(event) =>
                              setEatTimeslotId(event.target.value)
                            }
                          >
                            {dataFindEatTimeslots &&
                              dataFindEatTimeslots.length > 0 &&
                              dataFindEatTimeslots.map((item, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={item.id}
                                    className={
                                      item.id == eatTimeslotId
                                        ? "w-full h-12 shadow-lg rounded-lg p-2 mr-3 bg-orange-500 cursor-pointer hover:text-white text-center"
                                        : "w-full h-12 shadow-lg rounded-lg p-2 mr-3 bg-yellow-400 hover:bg-yellow-500 cursor-pointer hover:text-white text-center"
                                    }
                                  >
                                    {item.khunggioan}
                                  </option>
                                );
                              })}
                          </div>
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3 mt-2">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Chọn mục dinh dưỡng
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onClick={(e) =>
                              handleFindDishToCate(e.target.value)
                            }
                          >
                            {dataCate.categories &&
                              dataCate.categories.length > 0 &&
                              dataCate.categories.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-1 mx-3 mt-2">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Chọn món ăn
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) => setDishId(event.target.value)}
                          >
                            {dataFindDish?.finddish?.data &&
                              dataFindDish?.finddish?.data.length > 0 &&
                              dataFindDish?.finddish?.data.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item?.name}
                                    </option>
                                  );
                                }
                              )}
                          </select>
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Số lần ăn
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) => setSolan(event.target.value)}
                          />
                        </div>

                        <div className="col-span-1 mx-3">
                          <label htmlFor="" className="text-slate-900 ml-2">
                            Ghi chú
                          </label>
                          <textarea
                            type="text"
                            placeholder="..."
                            className=" w-full h-10 border rounded-lg px-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) => setGhichu(event.target.value)}
                          />
                        </div>
                      </div>
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
