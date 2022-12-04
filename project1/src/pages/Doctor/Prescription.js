import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import { BsPlusLg } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GiMedicalPackAlt } from "react-icons/gi";
import NavbarConsult from "../../components/Doctor/NavbarConsult";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuModal from "../../components/Doctor/MenuModal";
import EatDetailModal from "../../components/Doctor/EatDetailModal";
import MenuModalToDate from "../../components/Doctor/MenuModalToDate";
import ThuocModal from "../../components/Doctor/ThuocModal";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import hinh1 from "../../assets/upload/kisspng-pharmacy-medicine-vector-graphics-portable-network-5d0528b7a97598.5057332015606191916941.png";
import { dataAllEatDates, getAllEatDatesAPI } from "../../redux/ngayanRedux";
import {
  getFindCaterogyInMenuIdAPI,
  dataGetFindCaterogyInMenuId,
} from "../../redux/danhmucmonanRedux";
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
  createPrescriptionAPI,
  editPrescriptionAPI,
} from "../../redux/prescriptionRedux";
import {
  dataGetTimPhieutheongay,
  timPhieuTheoNgayAPI,
  getPhieudatchoAPI,
  dataGetAPhieudatcho,
} from "../../redux/phieudatchoRedux";
import {
  getAllPrescriptionsDetailAPI,
  dataGetAllPrescriptionsDetail,
  getPrescriptionsDetailAPI,
  dataCheck,
} from "../../redux/prescriptionDetailRedux";
import { ToastContainer } from "react-toastify";

const Prescription = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEatDetail, setShowModalEatDetail] = useState(false);
  const [showMenuModalToDate, setShowMenuModalToDate] = useState(false);
  const [showModalThuoc, setShowModalThuoc] = useState(false);
  const [checkTuvan, setCheckTuvan] = useState(false);

  const [loidan, setLoidan] = useState();
  const [menuId, setMenuId] = useState();
  const [eatdateId, setEatdateId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [dateCreate, setDateCreate] = useState();
  const [reservationTicketId, setReservationTicketId] = useState();
  const [menuName, setMenuName] = useState();
  const [thuoc, setThuoc] = useState();
  const [thuocId, setThuocId] = useState();

  const paramsTuvan = useParams();

  const navigator = useNavigate();
  const today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const dispatch = useDispatch();
  const dataEatDates = useSelector(dataAllEatDates);

  const dataTimphieu = useSelector(dataGetAPhieudatcho);

  const dataFindCate = useSelector(dataGetFindCaterogyInMenuId);
  const dataGetAllChitiet = useSelector(dataGetAllPrescriptionsDetail);

  useEffect(() => {
    setReservationTicketId(paramsTuvan.id);
    dispatch(
      findIdPhieuDatChoPrescriptionAPI({ reservationTicketId: paramsTuvan.id })
    );
    dispatch(getAllEatDatesAPI());

    dispatch(getPhieudatchoAPI(paramsTuvan.id));
  }, []);

  useEffect(() => {
    if (checkTuvan == true) {
      dispatch(getPhieudatchoAPI(paramsTuvan.id));
    }
  }, [checkTuvan]);

  const handleFind = async (menuId) => {
    let datafind = await dispatch(
      getFindMenuToPrescriptionAPI({ menuId: menuId })
    );
    let findMennu = datafind.payload.menuId;
    setMenuId(findMennu);
  };

  const data = useSelector(DataGetFindEatDetailToDate);

  const dataFindId = useSelector(datagetFindIdPhieuDatCho);

  useEffect(() => {
    if (dataFindId) {
      dispatch(getAllPrescriptionsDetailAPI(dataFindId.id));
    }
  }, [dataFindId]);

  useEffect(() => {
    dispatch(getAllEatDatesAPI(data));

    setCategoryId(data[0]?.dishDataToEatDetail?.categoryDataToDish?.id);
    setCategoryName(data[0]?.dishDataToEatDetail?.categoryDataToDish?.name);
  }, [data]);

  useEffect(() => {
    dispatch(
      getFindEatDetailToDateAPI({
        menuId: dataFindId?.menuId,
        eatdateId: dataFindId?.eatdateId,
      })
    );
    const testfindMenu = dataFindId?.menuId;
    setMenuId(testfindMenu);
    const testMenuName = dataFindId?.menuDataToPrescription?.name;
    setMenuName(testMenuName);
  }, [dataFindId]);

  useEffect(() => {
    dispatch(getFindCaterogyInMenuIdAPI(dataFindId?.menuId));
  }, []);

  // useEffect(() => {
  //   dataGetAllChitiet.getall &&
  //     dataGetAllChitiet.getall.length > 0 &&
  //     dataGetAllChitiet.getall.map((item, index) => {
  //       setThuoc(item?.medicalDataToPrescriptionDetail?.name);
  //     });
  // }, [dataGetAllChitiet]);

  const handleMenu = () => {
    setShowModal(true);
  };

  const handleThuoc = () => {
    setShowModalThuoc(true);
  };

  const handleDong = (test) => {
    setShowModal(test);
    setShowModalEatDetail(test);
    setShowMenuModalToDate(test);
    setShowModalThuoc(test);
  };
  const handleMoLai = (data) => {
    setShowModal(data);
    setShowModalEatDetail(data);
    setShowMenuModalToDate(data);
    setShowModalThuoc(data);
  };

  const handleEatDetail = (id) => {
    setEatdateId(id);
    setShowModalEatDetail(true);
  };

  const getParams = async (data) => {
    let test = await dispatch(getFindEatDetailToDateAPI(data));

    if (data.menuId) {
      handleFind(data.menuId);
    }
  };

  const handleXemMenu = (id, menuId) => {
    dispatch(
      getFindEatDetailToDateAPI({
        menuId: dataFindId?.menuId,
        eatdateId: dataFindId?.eatdateId,
      })
    );
    navigator(`/manager/detail-menu/${menuId}/${id}`);
  };

  const handleCreateMenuToDate = (id) => {
    setEatdateId(id);
    setShowMenuModalToDate(true);
  };

  const handleSave = async () => {
    let testdata = await dispatch(editPrescriptionAPI(params));
    if (testdata.payload.code == 0) {
      setCheckTuvan(true);
    }
  };

  const handleDetail = (id) => {
    navigator(`/manager/prescription-detail/${id}`);
    dispatch(getPrescriptionsDetailAPI(id));
  };

  const params = {
    dateCreate: dateCreate,
    loidan: loidan,
    menuId: menuId,
    reservationTicketId: reservationTicketId,
    eatdateId: eatdateId,
    categoryId: categoryId,
    categoryName: categoryName,
    menuName: menuName,
    id: dataFindId?.id,
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
              {dataTimphieu?.phieudatcho?.status !== "Đã tư vấn" ? (
                <>
                  <div className="border-2 border-slate-200 p-4 shadow-lg">
                    <div className="flex ">
                      <span className="font-medium">Ngày lập:</span>
                      <div className="ml-3">{date}</div>
                    </div>
                    {dataFindId === null ? (
                      <>
                        <div className="w-full flex mt-5">
                          <div className="">
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
                        value={loidan}
                        className=" w-full h-16 border rounded-lg p-2 mt-1  outline-slate-300"
                        onChange={(event) => setLoidan(event.target.value)}
                      />
                    </div>
                    <div className="w-full text-right mt-2">
                      <button
                        className="p-3 bg-green-500 text-white text-sm font-medium rounded-md mx-auto"
                        onClick={() => handleSave()}
                      >
                        LƯU THÔNG TIN
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {dataFindId !== null ? (
            <div className="grid grid-cols-3">
              <div className="col-span-1 mt-24">
                <div className="border-[1px] mt-10 mx-5 shadow-lg py-4 h-1/2">
                  <div className="text-sky-700 font-semibold text-md ml-5 uppercase">
                    Thuốc hỗ trợ
                  </div>
                  {dataTimphieu?.phieudatcho?.status !== "Đã tư vấn" ? (
                    <div className="ml-5 mt-5">
                      <button
                        className="p-2 bg-orange-500 text-white text-md font-medium rounded-md mx-auto"
                        onClick={() => handleThuoc()}
                      >
                        <div className="flex animate-pulse">
                          <GiMedicalPackAlt className="mt-1 mr-2 animate-bounce" />
                          <span>Thêm thuốc hỗ trợ</span>
                        </div>
                      </button>
                      <div className="">
                        {showModalThuoc === true ? (
                          <ThuocModal
                            openModal={showModalThuoc}
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
                  ) : (
                    <div className=""></div>
                  )}

                  {dataGetAllChitiet.getall &&
                  dataGetAllChitiet.getall.length > 0 ? (
                    <>
                      <div className="w-full mt-4">
                        {dataGetAllChitiet.getall &&
                          dataGetAllChitiet.getall.length > 0 &&
                          dataGetAllChitiet.getall.map((item, index) => {
                            console.log(
                              "dataGetAllChitiet.getall:",
                              dataGetAllChitiet.getall
                            );

                            return (
                              <>
                                <div className="flex border-y border-solid border-slate-200 mx-3">
                                  <div className="my-2 ml-4 w-5/6">
                                    {
                                      item?.medicalDataToPrescriptionDetail
                                        ?.name
                                    }
                                  </div>
                                  <div
                                    className="my-auto w-1/6"
                                    onClick={() => handleDetail(item.id)}
                                  >
                                    <BiDotsHorizontalRounded size={20} />
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </>
                  ) : (
                    <div className="w-full">
                      <img
                        src={hinh1}
                        alt=""
                        className="h-[10rem] mx-auto mt-10"
                      />
                      <div className="text-green-600 italic text-center">
                        Chưa có thuốc hỗ trợ nào
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <div className="">
                  <div className="mt-16 text-sky-700 font-semibold text-xl ml-10">
                    THỰC ĐƠN THEO NGÀY
                  </div>
                  <div className="">
                    <div className="grid grid-cols-2 p-5" id="">
                      {dataEatDates.eatdates &&
                        dataEatDates.eatdates.length > 0 &&
                        dataEatDates.eatdates.map((item, index) => {
                          return (
                            <div className="">
                              {item.check === true ? (
                                <div
                                  key={index}
                                  value={item.id}
                                  className="p-5 bg-green-400 mt-7 ml-5 col-span-1 shadow-lg hover:bg-green-300 border-slate-300 border"
                                >
                                  <div className="uppercase font-semibold">
                                    <div className="">{item.eatdate}</div>
                                  </div>
                                  <div className="">
                                    {dataTimphieu?.phieudatcho?.status !==
                                    "Đã tư vấn" ? (
                                      <>
                                        {/* {checkTuvan === false ? (
                                  <> */}
                                        <div className="flex mt-3">
                                          <button
                                            className="p-2 hover:bg-yellow-700 text-white text-md font-medium rounded-md bg-yellow-600 shadow-lg"
                                            onClick={() =>
                                              handleEatDetail(item.id)
                                            }
                                          >
                                            <div className="flex">
                                              <BsPlusLg className="mt-1 mr-2" />
                                              <span>Thêm khẩu phần</span>
                                            </div>
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
                                                <div className=""></div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex mt-3">
                                          <div
                                            className="italic hover:underline hover:underline-offset-2"
                                            onClick={() =>
                                              handleXemMenu(
                                                item.id,
                                                dataFindId?.menuId
                                              )
                                            }
                                          >
                                            Xem chi tiết thực đơn đã tạo
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="flex mt-3">
                                          <div
                                            className="italic hover:underline hover:underline-offset-2"
                                            onClick={() =>
                                              handleXemMenu(
                                                item.id,
                                                dataFindId?.menuId
                                              )
                                            }
                                          >
                                            Xem chi tiết thực đơn đã tạo
                                          </div>
                                        </div>
                                      </>
                                    )}
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
                                    {dataTimphieu?.phieudatcho?.status !==
                                    "Đã tư vấn" ? (
                                      <>
                                        {/* {checkTuvan === false ? (
                                  <> */}
                                        <div className="flex mt-3">
                                          <button
                                            className="p-2 bg-sky-500 text-white text-md font-medium rounded-md hover:bg-green-600 shadow-lg"
                                            onClick={() =>
                                              handleCreateMenuToDate(item.id)
                                            }
                                          >
                                            <div className="flex">
                                              <BsPlusLg className="mt-1 mr-2" />
                                              <span>Thêm thực đơn</span>
                                            </div>
                                          </button>
                                          <div className="">
                                            {showMenuModalToDate === true ? (
                                              <MenuModalToDate
                                                openModal={showMenuModalToDate}
                                                handleClose={handleDong}
                                                getParams={getParams}
                                                handleMo={handleMoLai}
                                                params2={params}
                                                item={item}
                                              />
                                            ) : (
                                              <>
                                                <div className=""></div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex mt-3">
                                          <div className="italic text-red-600">
                                            Chưa có thực đơn, vui lòng thêm thực
                                            đơn!
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="flex mt-3">
                                          <div className="italic text-red-600">
                                            Chưa có thực đơn, vui lòng thêm thực
                                            đơn !
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
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
          ) : (
            <>
              <div className=""></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Prescription;
