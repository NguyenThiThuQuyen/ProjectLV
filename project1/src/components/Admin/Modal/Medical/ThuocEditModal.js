import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ImUpload3 } from "react-icons/im";
import { editThuocAPI } from "../../../../redux/thuocRedux";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../utils/CommonUtils";
import { BiEdit } from "react-icons/bi";
import { Buffer } from "buffer";
import logo from "../../../../assets/upload/logo.png";
import {
  getAllThuocAPI,
  dataGetAllDovitinh,
  dataGetAllNhacungcap,
  dataCheckThuoc,
} from "../../../../redux/thuocRedux";
import {
  getAllLoaiThuocAPI,
  dataGetAllLoaiThuoc,
  dataCheck,
} from "../../../../redux/loaiThuocRedux";

export default function ThuocModalEdit(props) {
  const [preImg, setPreImg] = useState();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [name, setName] = useState();
  const [donvitinhId, setDonvitinhId] = useState("1");
  const [nhacungcapId, setNhacungcapId] = useState("1");
  const [image, setImage] = useState();
  const [medicalTypeId, setMedicalTypeId] = useState();
  const [id, setId] = useState();
  const params = {
    name: name,
    donvitinhId: donvitinhId,
    nhacungcapId: nhacungcapId,
    image: image,
    medicalTypeId: medicalTypeId,
    id: id,
  };

  const dispatch = useDispatch();
  const data = useSelector(dataGetAllLoaiThuoc);
  const dataDonViTinh = useSelector(dataGetAllDovitinh);
  const dataNhaCungCap = useSelector(dataGetAllNhacungcap);
  const check = useSelector(dataCheck);
  const checkThuoc = useSelector(dataCheckThuoc);

  useEffect(() => {
    setName(props.item.name);
    setNhacungcapId(props.nhacungcapId);
    setDonvitinhId(props.donvitinhId);
    setImage(props.item.image);
    setMedicalTypeId(props.item.medicalTypeId);
    setId(props.item.id);
  }, [props.item]);

  useEffect(() => {
    dispatch(getAllLoaiThuocAPI());
  }, [check]);

  useEffect(() => {
    let imageBase64 = "";
    if (props?.item?.image) {
      imageBase64 = new Buffer(props?.item?.image, "base64").toString("binary");
    }
    setImage(imageBase64);
    setPreImg(imageBase64);
  }, [showModalEdit]);

  useEffect(() => {
    dispatch(getAllThuocAPI());
  }, [checkThuoc]);

  const handleSaveEdit = () => {
    dispatch(editThuocAPI(params));
    setShowModalEdit(false);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
    setPreImg(base64);
  };

  return (
    <>
      <div className="ml-5">
        <button type="button" onClick={() => setShowModalEdit(true)}>
          <BiEdit className="cursor-pointer text-lg text-blue-600" />
        </button>
      </div>
      {showModalEdit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    SỬA THÔNG TIN THUỐC
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                {/*body*/}
                <div className="relative px-6 pb-16 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-2">
                      <div className="grid row-span-1 grid-cols-2">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên thuốc
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên loại thuốc
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            required
                            value={medicalTypeId}
                            onChange={(event) =>
                              setMedicalTypeId(event.target.value)
                            }
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

                      <div className="grid row-span-1 grid-cols-2">
                        {/* <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Nhà cung cấp
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            required
                            value={nhacungcapId}
                            onChange={(event) =>
                              setNhacungcapId(event.target.value)
                            }
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
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Đơn vị tính
                          </label>
                          <select
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            id=""
                            required
                            value={donvitinhId}
                            onChange={(event) =>
                              setDonvitinhId(event.target.value)
                            }
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
                            <img
                              src={preImg}
                              width={"100px"}
                              height={"100px"}
                            />
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
                    onClick={() => setShowModalEdit(false)}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSaveEdit()}
                  >
                    Lưu thông tin
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
