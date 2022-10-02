import { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { editTimeslotAPI } from "../../../../redux/timeslotRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
export default function TimeslotModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [timeslot, setTimeslot] = useState();
  const [id, setId] = useState();
  const params = {
    timeslot: timeslot,
    id: id,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeslot(props.item.timeslot);
    setId(props.item.id);
  }, [props.item]);

  const handleSaveEdit = () => {
    dispatch(editTimeslotAPI(params));
    setShowModalEdit(false);
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
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    SỬA KHUNG GIỜ
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEdit(false)}
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
                        <div className="col-span-3 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            ID
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            required
                            disabled
                            value={id}
                            onChange={(event) => setId(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-3 mx-3 my-4">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên loại thuốc
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                            required
                            value={timeslot}
                            onChange={(event) =>
                              setTimeslot(event.target.value)
                            }
                          />
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
                    onClick={() => setShowModalEdit(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSaveEdit()}
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
