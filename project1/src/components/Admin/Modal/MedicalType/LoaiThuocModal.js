import { useState } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { ImDownload3, ImUpload3 } from "react-icons/im";
import { addLoaiThuocAPI } from "../../../../redux/loaiThuocRedux";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../assets/upload/logo.png";
export default function LoaiThuocModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const params = {
    name: name,
    // id: id,
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(addLoaiThuocAPI(params));
    setShowModal(false);
  };

  return (
    <>
      <div className="mt-4 ml-5">
        <div className="ml-5 flex justify-start">
          <div className="flex items-center border border-scale-200 p-1 rounded">
            <input
              className="border-0 outline-0 bg-transparent"
              type="text"
              placeholder="Tìm kiếm..."
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
              Thêm loại thuốc
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
                    THÊM LOẠI THUỐC
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="">
                    {/* <div className="grid grid-rows-2"> */}
                    <div className="grid row-span-1 grid-cols-3">
                      <div className="col-span-3 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Tên loại thuốc
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    {/* </div> */}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ĐÓNG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSave()}
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
