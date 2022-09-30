import { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ImUpload3 } from "react-icons/im";
import { getBase64 } from "../../../../utils/CommonUtils";
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

  const dispatch = useDispatch();
  const data = useSelector(dataGetAllLoaiThuoc);
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

  const handleSave = () => {
    dispatch(addThuocAPI(params));
    setShowModal(false);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  return (
    <>
      <div className="mt-8 ml-10">
        <button
          className="flex bg-green-700 hover:bg-green-600 p-2 rounded-md text-white"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlusLg className="mr-2 mt-1" />
          Thêm thuốc
        </button>
        {/* </Link> */}
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
                    THÊM THUỐC
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
                            Tên thuốc
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Đơn vị tính
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên loại thuốc
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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
                      </div>

                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Nhà cung cấp
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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
                            <img src={image} />
                          </div>
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
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    Save Changes
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
