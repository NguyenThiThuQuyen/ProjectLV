import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import { BsPlusLg } from "react-icons/bs";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuModal from "../../components/Doctor/MenuModal";
import EatDetailModal from "../../components/Doctor/EatDetailModal";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { dataAllEatDates, getAllEatDatesAPI } from "../../redux/ngayanRedux";
import {
  DataGetFindEatDetailToDate,
  getFindEatDetailToDateAPI,
} from "../../redux/chitietanRedux";
import {
  getFindMenuToPrescriptionAPI,
  dataGetFindMenuToPrescription,
} from "../../redux/menuRedux";
import {
  datagetFindIdPhieuDatCho,
  findIdPhieuDatChoPrescriptionAPI,
} from "../../redux/prescriptionRedux";
import { ToastContainer } from "react-toastify";

const Prescription = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEatDetail, setShowModalEatDetail] = useState(false);
  const [loidan, setLoidan] = useState();
  const [menuId, setMenuId] = useState();
  const [eatdateId, setEatdateId] = useState();
  const [reservationTicketId, setReservationTicketId] = useState();
  const paramsTuvan = useParams();
  const navigator = useNavigate();
  const today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const params = {
    dateCreate: date,
    loidan: loidan,
    menuId: menuId,
    reservationTicketId: reservationTicketId,
    eatdateId: eatdateId,
  };

  const dispatch = useDispatch();
  const dataEatDates = useSelector(dataAllEatDates);
  console.log("dataEatDates:", dataEatDates);

  useEffect(() => {
    setReservationTicketId(paramsTuvan.id);
    dispatch(
      findIdPhieuDatChoPrescriptionAPI({ reservationTicketId: paramsTuvan.id })
    );
    dispatch(getAllEatDatesAPI());
  }, []);

  const handleFind = async (menuId) => {
    let datafind = await dispatch(
      getFindMenuToPrescriptionAPI({ menuId: menuId })
    );
    let findMennu = datafind.payload.menuId;
    setMenuId(findMennu);
  };

  const data = useSelector(DataGetFindEatDetailToDate);
  console.log("data1111111", data);

  const dataFindId = useSelector(datagetFindIdPhieuDatCho);
  const dataFindMenu = useSelector(dataGetFindMenuToPrescription);

  useEffect(() => {
    dispatch(getAllEatDatesAPI(data));
  }, [data]);

  useEffect(() => {
    dispatch(
      getFindEatDetailToDateAPI({
        menuId: dataFindId?.menuId,
        eatdateId: dataFindId?.eatdateId,
      })
    );
  }, [dataFindId]);
  console.log("dataFindId:", dataFindId);

  const handleMenu = () => {
    setShowModal(true);
  };
  const handleDong = (test) => {
    setShowModal(test);
    setShowModalEatDetail(test);
  };
  const handleMoLai = (data) => {
    setShowModal(data);
    setShowModalEatDetail(data);
  };

  const handleEatDetail = () => {
    setShowModalEatDetail(true);
  };

  const getParams = async (data) => {
    let test = await dispatch(getFindEatDetailToDateAPI(data));
    if (data.menuId) {
      handleFind(data.menuId);
    }
  };

  const handleXemMenu = (id, menuId) => {
    console.log("id", id, menuId);
    dispatch(
      getFindEatDetailToDateAPI({
        menuId: dataFindId?.menuId,
        eatdateId: dataFindId?.eatdateId,
      })
    );
    navigator(`/manager/detail-menu/${menuId}/${id}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <div className="w-full mt-10">
            <div className="w-2/3 ml-5 mr-auto">
              <div className="border-2 border-slate-200 p-4 shadow-lg">
                <div className="flex ">
                  <span className="font-medium">Ngày lập:</span>
                  <div className="ml-3">{date}</div>
                </div>
                {dataFindId === null ? (
                  <>
                    <div className="w-full mt-5">
                      <button
                        className="p-2 bg-yellow-500 text-white text-md font-medium rounded-md mx-auto"
                        onClick={() => handleMenu()}
                      >
                        <div className="flex">
                          <BsPlusLg className="mt-1 mr-2" />
                          <span>Tạo thực đơn</span>
                        </div>
                      </button>
                      <div className="">
                        {showModal === true ? (
                          <MenuModal
                            openModal={showModal}
                            handleClose={handleDong}
                            getParams={getParams}
                            handleMo={handleMoLai}
                            params2={params}
                          />
                        ) : (
                          <>
                            <div className=""></div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="mt-5">
                  <label htmlFor="" className="font-medium">
                    Lời dặn:
                  </label>
                  <textarea
                    type="text"
                    placeholder="..."
                    className=" w-full h-16 border rounded-lg p-2 mt-1  outline-slate-300"
                  />
                </div>
                <div className="w-full text-right mt-2">
                  <button className="p-3 bg-green-500 text-white text-sm font-medium rounded-md mx-auto">
                    LƯU THÔNG TIN
                  </button>
                </div>
              </div>
            </div>
          </div>

          {dataFindId !== null ? (
            <div className="">
              <div className="mt-16 text-sky-700 font-semibold text-xl ml-5">
                THỰC ĐƠN THEO NGÀY
              </div>
              <div className="">
                <div
                  className="grid grid-cols-3 p-5"
                  id=""
                  value={eatdateId}
                  // disabled
                  onChange={(event) => setEatdateId(event.target.value)}
                >
                  {dataEatDates.eatdates &&
                    dataEatDates.eatdates.length > 0 &&
                    dataEatDates.eatdates.map((item, index) => {
                      console.log("item", item);
                      return (
                        <div className="">
                          {item.check === true ? (
                            <div
                              key={index}
                              value={item.id}
                              className="p-5 bg-green-400 mt-7 ml-5 col-span-1 shadow-lg hover:bg-white border-slate-300 border"
                            >
                              <div className="uppercase font-semibold">
                                <div className="">{item.eatdate}</div>
                              </div>
                              <div className="">
                                <div className="flex mt-3">
                                  <button
                                    className="p-2 hover:bg-yellow-700 text-white text-md font-medium rounded-md bg-yellow-600"
                                    onClick={() => handleMenu()}
                                  >
                                    <div className="flex">
                                      <BsPlusLg className="mt-1 mr-2" />
                                      <span>Thêm khẩu phần ăn</span>
                                    </div>
                                  </button>
                                </div>
                                <div className="flex mt-3">
                                  <div
                                    className="italic hover:underline hover:underline-offset-2"
                                    onClick={() =>
                                      handleXemMenu(item.id, dataFindId?.menuId)
                                    }
                                  >
                                    Xem chi tiết thực đơn đã tạo
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={index}
                              value={item.id}
                              className="p-5 bg-green-200 mt-7 ml-5 col-span-1 shadow-lg hover:bg-white border-slate-300 border"
                            >
                              <div className="uppercase font-semibold">
                                <div className="">{item.eatdate}</div>
                              </div>
                              <div className="">
                                <div className="flex mt-3">
                                  <button
                                    className="p-2 bg-sky-500 text-white text-md font-medium rounded-md hover:bg-green-600"
                                    onClick={() => handleMenu()}
                                  >
                                    <div className="flex">
                                      <BsPlusLg className="mt-1 mr-2" />
                                      <span>Thêm thực đơn</span>
                                    </div>
                                  </button>
                                </div>
                                <div className="flex mt-3">
                                  <div
                                    className="italic text-red-600"
                                    // onClick={() =>
                                    //   handleXemMenu(item.id, dataFindId?.menuId)
                                    // }
                                  >
                                    Chưa có thực đơn, vui lòng thêm thực đơn !
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="">null</div>
            </>
          )}

          {/* {dataFindId !== null ? (
            <>
              <div className="w-full px-10 py-4">
                <div className="text-sky-700 uppercase font-medium text-xl mt-10">
                  Thông tin thực đơn
                </div>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => {
                    console.log("item: ", item);
                    console.log(
                      "item 1111111:",
                      item?.eatDateDataToEatDetail?.id
                    );
                    const test = item?.eatDateDataToEatDetail?.id
                    if(item?.eatDateDataToEatDetail?.id)
                    return (
                      <div className="grid grid-cols-9">
                        <div className="col-span-1 border-2 border-slate-400">
                          {item?.eatDateDataToEatDetail?.eatdate}

                          <div className="mt-5">
                            <button
                              className="p-2 bg-yellow-500 text-white text-md font-medium rounded-md mx-auto"
                              onClick={() => handleEatDetail()}
                            >
                              <span>Thêm giờ ăn</span>
                            </button>
                            <div className="">
                              {showModalEatDetail === true ? (
                                <EatDetailModal
                                  openModal={showModalEatDetail}
                                  handleClose={handleDong}
                                  getParams={getParams}
                                  handleMo={handleMoLai}
                                  params2={params}
                                  item={item}
                                />
                              ) : (
                                <>
                                  <div className="">null</div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-8">
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="flex">
                              <span>Giờ ăn:</span>
                              <span className="mx-5">{item.gioan}</span>
                            </div>
                          </div>
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="flex">
                              <span>Món ăn:</span>
                              <span className="mx-5">
                                {item.dishDataToEatDetail.name}
                              </span>
                            </div>
                          </div>
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="">
                              <span>Cách chế biến:</span>
                              <div className="ml-5">
                                <span
                                  className=""
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item?.dishDataToEatDetail?.contentHTML,
                                  }}
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div className="row-span-1 border-2 border-slate-400">
                            <div className="flex">
                              <span>Ghi chú:</span>
                              <span className="mx-5">{item.ghichu}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Prescription;
