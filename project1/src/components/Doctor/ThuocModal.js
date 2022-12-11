import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import { dataGetAllThuoc, getAllThuocAPI } from "../../redux/thuocRedux";
import {
  createPrescriptionDetailAPI,
  getAllPrescriptionsDetailAPI,
  dataGetAllPrescriptionsDetail,
  deletePrescriptionsDetailAPI,
  dataCheck,
} from "../../redux/prescriptionDetailRedux";
import logo from "../../assets/upload/logo.png";
export default function ThuocModal(props) {
  console.log("props:", props);
  const [showModalThuoc, setShowModalThuoc] = useState(false);
  const [medicalId, setMedicalId] = useState();
  const [prescriptionId, setPrescriptionId] = useState();
  const [lieudung, setLieudung] = useState();
  const [cachdung, setCachdung] = useState();
  const [soluong, setSoluong] = useState();
  const [solandung, setSolandung] = useState();
  const [ghichu, setGhichu] = useState();
  const dispatch = useDispatch();
  const data = useSelector(dataGetAllThuoc);
  const check = useSelector(dataCheck);
  const dataGetAllChitiet = useSelector(dataGetAllPrescriptionsDetail);

  const params = {
    lieudung: lieudung,
    cachdung: cachdung,
    soluong: soluong,
    solandung: solandung,
    ghichu: ghichu,
    medicalId: medicalId,
    prescriptionId: props?.params2?.id,
  };

  console.log("params:", params);

  useEffect(() => {
    dispatch(getAllPrescriptionsDetailAPI(props?.params2?.id));
  }, [check]);

  useEffect(() => {
    if (data.medicals) {
      setMedicalId(data.medicals[0].id);
    }
  }, [data]);

  useEffect(() => {
    setShowModalThuoc(true);
  }, [props?.openModal === true]);

  useEffect(() => {
    dispatch(getAllThuocAPI());
  }, []);

  const handleClose = () => {
    setShowModalThuoc(false);
    props.handleClose(false);
  };

  const handleSave = async () => {
    let create = await dispatch(createPrescriptionDetailAPI(params));
    console.log("create:", create);
    if (create.payload.chitiet.code == 0) {
      setCachdung("");
      setLieudung("");
      setSoluong("");
      setSolandung("");
      setGhichu("");
    }
    setShowModalThuoc(true);
  };

  const handleDelete = (id) => {
    dispatch(deletePrescriptionsDetailAPI(id));
  };

  return (
    <>
      {showModalThuoc ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                  <h3 className="text-base font-bold text-slate-500 uppercase">
                    Thêm thực phẩm hỗ trợ
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-7">
                    <div className="col-span-5 border-r-4 border-slate-200">
                      <form action="">
                        <div className="grid row-auto">
                          <div className="grid grid-row-1">
                            <div className="grid grid-cols-2">
                              <div className="col-span-1 mx-3">
                                <label
                                  htmlFor=""
                                  className="text-slate-900 ml-2"
                                >
                                  Chọn thuốc hỗ trợ
                                </label>
                                <select
                                  className="mt-3 w-full bg-slate-100 h-12 border rounded-md p-2 outline-slate-300 shadow-lg"
                                  id=""
                                  onChange={(event) =>
                                    setMedicalId(event.target.value)
                                  }
                                  value={medicalId}
                                >
                                  {data.medicals &&
                                    data.medicals.length > 0 &&
                                    data.medicals.map((item, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={item.id}
                                          className="w-2/3"
                                        >
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="text-sky-700 mt-8 uppercase font-medium">
                            Hướng dẫn dùng
                          </div>

                          <div className="grid grid-row-1 mt-8">
                            <div className="grid grid-cols-2">
                              <div className="col-span-2 mx-3 flex">
                                <label
                                  htmlFor=""
                                  className="text-slate-900 ml-2 w-[100px]"
                                >
                                  Liều dùng:
                                </label>
                                <input
                                  type="text"
                                  className=" border-b ml-2 border-solid border-slate-400 w-2/3 h-6 outline-none"
                                  onChange={(event) =>
                                    setLieudung(event.target.value)
                                  }
                                  value={lieudung}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-row-1 mt-5">
                            <div className="grid grid-cols-2">
                              <div className="col-span-2 mx-3 flex">
                                <label
                                  htmlFor=""
                                  className="text-slate-900 ml-2 w-[100px]"
                                >
                                  Cách dùng:
                                </label>
                                <input
                                  type="text"
                                  className="border-b ml-2 border-solid border-slate-400 w-2/3 h-6 outline-none"
                                  onChange={(event) =>
                                    setCachdung(event.target.value)
                                  }
                                  value={cachdung}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-row-1 mt-5">
                            <div className="grid grid-cols-2">
                              <div className="col-span-2 mx-3 flex">
                                <label
                                  htmlFor=""
                                  className="text-slate-900 ml-2 w-[100px]"
                                >
                                  Số lượng:
                                </label>
                                <input
                                  type="text"
                                  className="border-b ml-2 border-solid border-slate-400 w-2/3 h-6 outline-none"
                                  onChange={(event) =>
                                    setSoluong(event.target.value)
                                  }
                                  value={soluong}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-row-1 mt-5">
                            <div className="grid grid-cols-2">
                              <div className="col-span-2 mx-3 flex">
                                <label
                                  htmlFor=""
                                  className="text-slate-900 ml-2 w-[100px]"
                                >
                                  Số lần dùng:
                                </label>
                                <input
                                  type="text"
                                  className="border-b ml-2 border-solid border-slate-400 w-2/3 h-6 outline-none"
                                  onChange={(event) =>
                                    setSolandung(event.target.value)
                                  }
                                  value={solandung}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-row-1 mt-5">
                            <div className="grid grid-cols-6">
                              <div className="col-span-5 mx-3">
                                <label
                                  htmlFor=""
                                  className="text-slate-900 ml-2"
                                >
                                  Ghi chú
                                </label>
                                <textarea
                                  type="text"
                                  placeholder="..."
                                  className="border-[1px] w-full h-16 rounded-lg p-2 mt-1 bg-slate-100 shadow-lg outline-slate-300"
                                  onChange={(event) =>
                                    setGhichu(event.target.value)
                                  }
                                  value={ghichu}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-row-1 mt-5">
                            <div className="grid grid-cols-6">
                              <div className="col-span-5 mx-3">
                                <div className="flex justify-end mt-5 ">
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
                      </form>
                    </div>
                    <div className="col-span-2 overflow-y-auto h-96">
                      <div className="text-sky-700 uppercase font-semibold ml-3 mb-5">
                        Danh sách thuốc hỗ trợ
                      </div>
                      <div className="">
                        {dataGetAllChitiet.getall &&
                          dataGetAllChitiet.getall.length > 0 &&
                          dataGetAllChitiet.getall.map((item, index) => {
                            return (
                              <div
                                key={index}
                                value={item.id}
                                className="border-y border-solid border-slate-200"
                              >
                                <div className="flex w-full">
                                  <div className="">
                                    <div className="mt-2 ml-3 text-sky-600">
                                      {
                                        item?.medicalDataToPrescriptionDetail
                                          ?.name
                                      }
                                    </div>
                                    {/* <div className="mt-1 ml-3">
                                      {
                                        item?.eatTimeslotDataToEatDetail
                                          ?.khunggioan
                                      }
                                    </div> */}
                                  </div>
                                  <div
                                    className="ml-auto mt-2"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <MdOutlineCancel
                                      title="Xóa"
                                      size={22}
                                      className="text-red-600 cursor-pointer"
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
