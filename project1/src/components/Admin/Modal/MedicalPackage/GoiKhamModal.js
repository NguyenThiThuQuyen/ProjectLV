import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { addGoiKhamAPI } from "../../../../redux/goiKhamRedux";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../../utils/CommonUtils";
import { ImDownload3, ImUpload3 } from "react-icons/im";
export default function GoiKhamModal() {
  const [showModal, setShowModal] = useState(false);
  const [packageName, setPackageName] = useState();
  const [packageDecs, setPackageDecs] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [applydateId, setApplydateId] = useState();
  const params = {
    packageName: packageName,
    packageDecs: packageDecs,
    image: image,
    price: price,
    applydateId: applydateId,
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(addGoiKhamAPI(params));
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
              placeholder="Search..."
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
              Thêm gói tư vấn
            </button>
          </div>
          <div className="ml-8 mt-8">
            <button
              className="flex text-teal-800 font-medium hover:text-slate-600"
              type="button"
            >
              <ImDownload3 className="mr-2 mt-1 text-teal-700" />
              Xuất excel
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
                    THÊM GÓI TƯ VẤN
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
                <div className="relative p-6 pb-20 flex-auto">
                  <form className="">
                    <div className="grid grid-rows-2">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên gói tư vấn
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) =>
                              setPackageName(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Giá tiền (VND)
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) => setPrice(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ngày áp dụng
                          </label>
                          <DatePicker
                            className="w-full border border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
                            selected={applydateId}
                            onChange={(date) => setApplydateId(date)}
                            dateFormat="yyyy/MM/dd"
                            minDate={new Date()}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                          />
                        </div>
                      </div>

                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Mô tả
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            onChange={(event) =>
                              setPackageDecs(event.target.value)
                            }
                          />
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
                            <img src={image} width={"100px"} height={"100px"} />
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