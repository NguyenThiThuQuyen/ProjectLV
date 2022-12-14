import { useState, useEffect } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { getBase64 } from "../../../../utils/CommonUtils";
import logo from "../../../../assets/upload/logo.png";
import {
  addThuocAPI,
  dataGetAllDovitinh,
  dataGetAllNhacungcap,
  getAllNhaCungCapAPI,
  getAllDonViTinhAPI,
  dataCheckThuoc,
} from "../../../../redux/thuocRedux";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLoaiThuocAPI,
  dataGetAllLoaiThuoc,
  dataCheck,
} from "../../../../redux/loaiThuocRedux";

export default function ThuocModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [donvitinhId, setDonvitinhId] = useState("1");
  const [nhacungcapId, setNhacungcapId] = useState("1");
  const [medicalTypeId, setMedicalTypeId] = useState();
  const params = {
    name: name,
    image: image,
    donvitinhId: donvitinhId,
    nhacungcapId: nhacungcapId,
    medicalTypeId: medicalTypeId,
  };
  console.log("param:", params);

  const dispatch = useDispatch();
  const data = useSelector(dataGetAllLoaiThuoc);
  console.log("data:", data);
  const dataDonViTinh = useSelector(dataGetAllDovitinh);
  const dataNhaCungCap = useSelector(dataGetAllNhacungcap);
  const check = useSelector(dataCheck);
  const checkThuoc = useSelector(dataCheckThuoc);

  useEffect(() => {
    dispatch(getAllDonViTinhAPI());
    dispatch(getAllNhaCungCapAPI());
  }, [checkThuoc]);

  useEffect(() => {
    dispatch(getAllLoaiThuocAPI());
  }, [check]);

  useEffect(() => {
    if (dataDonViTinh.dvt) {
      setDonvitinhId(dataDonViTinh.dvt[0].id);
    }
  }, [dataDonViTinh]);

  useEffect(() => {
    if (data.medicaltypes) {
      setMedicalTypeId(data.medicaltypes[0].id);
    }
  }, [data]);

  const handleSave = () => {
    dispatch(addThuocAPI(params));
    setShowModal(false);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  return (
    <>
      <div className="mt-4 ml-5">
        <div className="ml-5 flex justify-start">
          <div className="flex items-center border border-scale-200 p-1 rounded">
            <input
              className="border-0 outline-0 bg-transparent"
              type="text"
              placeholder="T??m ki???m..."
            />
            <BsSearch />
          </div>
        </div>
        <div className="flex">
          <div className="ml-6 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <BsPlusLg className="mr-2 mt-1 text-teal-700" />
              Th??m thu???c h??? tr???
            </button>
          </div>
          <div className="ml-8 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
            >
              <ImDownload3 className="mr-2 mt-1 text-teal-700" />
              Xu???t excel
            </button>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    TH??M THU???C
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                {/*body*/}
                <div className="relative p-6 pb-20 flex-auto">
                  <form className="">
                    <div className="grid row-auto">
                      <div className="grid gird-row-1">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              T??n thu???c
                            </label>
                            <input
                              type="text"
                              placeholder="..."
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              onChange={(event) => setName(event.target.value)}
                            />
                          </div>
                          <div className="col-span-1 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              ????n v??? t??nh
                            </label>
                            <select
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              id=""
                              onChange={(event) =>
                                setDonvitinhId(event.target.value)
                              }
                              // value={medicalTypeId}
                            >
                              {dataDonViTinh.dvt &&
                                dataDonViTinh.dvt.length > 0 &&
                                dataDonViTinh.dvt.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.donvitinh}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid gird-row-1">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 mx-3 my-4">
                            <label htmlFor="" className="text-slate-600 ml-2">
                              T??n lo???i thu???c
                            </label>
                            <select
                              className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                              id=""
                              onChange={(event) =>
                                setMedicalTypeId(event.target.value)
                              }
                              // value={medicalTypeId}
                            >
                              {data.medicaltypes &&
                                data.medicaltypes.length > 0 &&
                                data.medicaltypes.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          {/* <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Nh?? cung c???p
                          </label>
                          <select
                            className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            onChange={(event) =>
                              setNhacungcapId(event.target.value)
                            }
                            // value={medicalTypeId}
                          >
                            {dataNhaCungCap.ncc &&
                              dataNhaCungCap.ncc.length > 0 &&
                              dataNhaCungCap.ncc.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.nhacungcap}
                                  </option>
                                );
                              })}
                          </select>
                        </div> */}
                          <div className="col-span-1 mx-3 my-4 relative">
                            <label
                              htmlFor=""
                              className="text-slate-600 ml-2 flex"
                            >
                              T???i ???nh
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
                    ????NG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    L??u th??ng tin
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
