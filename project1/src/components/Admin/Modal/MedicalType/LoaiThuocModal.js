import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { addLoaiThuocAPI } from "../../../../redux/loaiThuocRedux";
import { useDispatch, useSelector } from "react-redux";

export default function LoaiThuocModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  //   const [id, setId] = useState();
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
      <div className="mt-8 ml-10">
        <button
          className="flex bg-green-700 hover:bg-green-600 p-2 rounded-md text-white"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <BsPlusLg className="mr-2 mt-1" />
          Thêm loại thuốc
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
                    THÊM LOẠI THUỐC
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
                    {/* <div className="grid grid-rows-2"> */}
                    <div className="grid row-span-1 grid-cols-3">
                      <div className="col-span-3 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Tên loại thuốc
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
