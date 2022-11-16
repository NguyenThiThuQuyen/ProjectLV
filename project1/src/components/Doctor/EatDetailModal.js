import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataAllEatDates, getAllEatDatesAPI } from "../../redux/ngayanRedux";
import {
  getAllDishesAPI,
  dataGetFindDishToCate,
  getFindDishToCateAPI,
} from "../../redux/monanRedux";
import { MdOutlineCancel } from "react-icons/md";
import {
  getAllSessionsAPI,
  dataGetAllSessions,
} from "../../redux/sessionRedux";
import {
  getCreateEatDetailAPI,
  deleteEatDetailAPI,
  DataGetFindEatDetailToDate,
  getFindEatDetailToDateAPI,
  dataCheck,
} from "../../redux/chitietanRedux";
import {
  getAllFindEatTimeslotsToSessionAPI,
  dataGetAllFindEatTimeslotsToSession,
  dataGetFindEatTimeslotsToEatDetail,
  getFindEatTimeslotsToEatDetailAPI,
} from "../../redux/eatTimeslotRedux";
import {
  dataGetAllCaterogy,
  getAllCaterogyAPI,
} from "../../redux/danhmucmonanRedux";

export default function EatDetailModal(props) {
  // console.log("props:", props);
  const [showModalEatDetail, setShowModalEatDetail] = useState(false);
  const [dishId, setDishId] = useState();
  const [huongdanan, setHuongdanan] = useState();
  const [solan, setSolan] = useState("1");
  const [ghichu, setGhichu] = useState();
  const [eatdateId, setEatdateId] = useState();
  const [menuId, setMenuId] = useState();
  const [menuName, setMenuName] = useState();
  const [eatTimeslotId, setEatTimeslotId] = useState();
  const [loidan, setLoidan] = useState();
  const [dishCategory, setDishCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [mang, setMang] = useState([]);
  const dataEatDates = useSelector(dataAllEatDates);
  const dataCate = useSelector(dataGetAllCaterogy);
  const dataFindDish = useSelector(dataGetFindDishToCate);
  // console.log("dataFindDish:", dataFindDish);
  const dataFindEatTimeslots = useSelector(dataGetAllFindEatTimeslotsToSession);
  // console.log("dataFindEatTimeslots:", dataFindEatTimeslots);
  const dataSession = useSelector(dataGetAllSessions);

  const dataDetail = useSelector(DataGetFindEatDetailToDate);

  let dataFind = useSelector(dataGetFindEatTimeslotsToEatDetail);
  console.log("dataFind:", dataFind);

  const check = useSelector(dataCheck);

  const dispatch = useDispatch();

  const params = {
    eatdateId: eatdateId,
    name: menuName,
    menuId: menuId,
    dishId: dishId,
    huongdanan: huongdanan,
    solan: solan,
    ghichu: ghichu,
    dishCategory: dishCategory,
    categoryName: categoryName,
    eatTimeslotId: eatTimeslotId,
  };
  console.log("params:", params);

  useEffect(() => {
    setShowModalEatDetail(true);
  }, [props?.openModal === true]);

  useEffect(() => {
    setEatdateId(props?.params2?.eatdateId);
    setMenuId(props?.params2?.menuId);
    setMenuName(props?.params2?.menuName);
    setCategoryName(props?.params2?.categoryName);
    setDishCategory(props?.params2?.categoryId);
  }, [props?.params2]);

  useEffect(() => {
    dispatch(getAllDishesAPI());
    dispatch(getFindDishToCateAPI());
    dispatch(getAllSessionsAPI());
  }, [check]);

  useEffect(() => {
    dispatch(getFindDishToCateAPI(props?.params2?.categoryId));
    setDishCategory(props?.params2?.categoryId);
  }, [props?.params2?.categoryId]);

  useEffect(() => {
    dispatch(
      getFindEatDetailToDateAPI({
        eatdateId: props?.params2?.eatdateId,
        menuId: props?.params2?.menuId,
      })
    );
  }, [check]);

  const handleFindDishToCate = (id) => {
    dispatch(getFindDishToCateAPI(id));
  };

  useEffect(() => {
    dataCate.categories &&
      dataCate.categories.length > 0 &&
      dataCate.categories.map((item, index) => {
        const findid = handleFindDishToCate(item.id);
      });
  }, [dataCate]);

  const handleClose = () => {
    setShowModalEatDetail(false);
    props.handleClose(false);
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
  };

  const handleSave = async () => {
    dispatch(getCreateEatDetailAPI(params));
    setEatTimeslotId();
    setDishId();
    setShowModalEatDetail(true);
    // props.handleMo(false);
    // setTimeout(function () {
    //   window.location.reload(1);
    // }, 500);
  };

  const handleFindEatTimeslot = (id) => {
    dispatch(getAllFindEatTimeslotsToSessionAPI({ sessionId: id }));
  };

  useEffect(() => {
    dispatch(
      getFindEatTimeslotsToEatDetailAPI({
        data: {
          array: dataFindEatTimeslots,
          obj: { menuId: menuId, eatdateId: eatdateId },
        },
      })
    );
  }, [dataFindEatTimeslots]);

  const handleDelete = (id) => {
    dispatch(deleteEatDetailAPI(id));
  };
  return (
    <>
      {showModalEatDetail ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/6 mx-auto max-w-7xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM KHẨU PHẦN ĂN
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-7">
                    <div className="col-span-5 border-r-4 border-slate-200">
                      <form className="">
                        <div className="grid grid-rows-5">
                          <div className="grid row-span-1 grid-cols-2">
                            <div className="col-span-2 mx-3 flex">
                              <label htmlFor="" className="text-slate-900 ml-2">
                                Tiêu đề thực đơn:
                              </label>
                              <input
                                type="text"
                                className="border-b uppercase ml-2 border-solid border-slate-400 w-auto h-6 outline-none"
                                value={menuName}
                                disabled
                                onChange={(event) =>
                                  setMenuName(event.target.value)
                                }
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
                                value={eatdateId}
                                disabled
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
                                        className="ml-2 w-1/2 h-12 shadow-lg rounded-lg p-2 mr-3 bg-green-300 hover:bg-green-500 cursor-pointer hover:text-white text-center"
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
                                {dataFind &&
                                  dataFind.length > 0 &&
                                  dataFind.map((item, index) => {
                                    return (
                                      <>
                                        {item.checkTimes === true ? (
                                          <>
                                            <option
                                              key={index}
                                              value={item.id}
                                              disabled
                                              className="w-full h-12 shadow-lg rounded-lg p-2 mr-3 bg-orange-300 text-white text-center cursor-no-drop"
                                            >
                                              {item.khunggioan}
                                            </option>
                                          </>
                                        ) : (
                                          <>
                                            <option
                                              key={index}
                                              value={item.id}
                                              className="w-full h-12 shadow-lg rounded-lg p-2 mr-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer hover:text-white text-center"
                                            >
                                              {item.khunggioan}
                                            </option>
                                          </>
                                        )}
                                      </>
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
                              {/* <select
                                className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                                id=""
                                value={dishCategory}
                                disabled
                              >
                                <option>{categoryName}</option>
                              </select> */}

                              <select
                                className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-200 outline-slate-300"
                                id=""
                                value={dishCategory}
                                disabled
                                onClick={(e) =>
                                  handleFindDishToCate(e.target.value)
                                }
                              >
                                {dataCate.categories &&
                                  dataCate.categories.length > 0 &&
                                  dataCate.categories.map((item, index) => {
                                    // console.log("item: ", item);
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
                                onChange={(event) =>
                                  setDishId(event.target.value)
                                }
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
                                onChange={(event) =>
                                  setSolan(event.target.value)
                                }
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
                                onChange={(event) =>
                                  setGhichu(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="col-span-2 overflow-y-auto h-96">
                      <div className="text-sky-700 uppercase font-semibold ml-3 mb-5">
                        Thực đơn đã thêm theo ngày
                      </div>
                      <div className="">
                        {dataDetail &&
                          dataDetail.length > 0 &&
                          dataDetail.map((item, index) => {
                            return (
                              <div
                                key={index}
                                value={item.id}
                                className="border-y border-solid border-slate-200"
                              >
                                <div className="flex w-full">
                                  <div className="">
                                    <div className="mt-2 ml-3 text-sky-600">
                                      {item?.dishDataToEatDetail?.name}
                                    </div>
                                    <div className="mt-1 ml-3">
                                      {
                                        item?.eatTimeslotDataToEatDetail
                                          ?.khunggioan
                                      }
                                    </div>
                                  </div>
                                  <div className="ml-auto mt-2">
                                    <MdOutlineCancel
                                      title="Xóa"
                                      size={22}
                                      className="text-red-600 cursor-pointer"
                                      onClick={() => handleDelete(item.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
