import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsPlusLg } from "react-icons/bs";
import { editGoiKhamAPI } from "../../../../redux/goiKhamRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";

export default function GoiKhamModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [packageName, setPackageName] = useState();
  const [packageDecs, setPackageDecs] = useState();
  const [price, setPrice] = useState();
  const [applydateId, setApplydateId] = useState();
  const [reservationticketId, setReservationticketId] = useState();
  const [id, setId] = useState();
  const params = {
    packageName: packageName,
    packageDecs: packageDecs,
    price: price,
    applydateId: applydateId,
    reservationticketId: reservationticketId,
    id: id,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setPackageName(props.item.packageName);
    setPackageDecs(props.item.packageDecs);
    setReservationticketId(props.item.reservationticketId);
    setId(props.item.id);
  }, [props.item]);

  const handleSaveEdit = () => {
    dispatch(editGoiKhamAPI(params));
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
                    CẬP NHẬT THÔNG TIN GÓI KHÁM TƯ VẤN
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                          required
                          value={packageName}
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
                          required
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}
                        />
                      </div>
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Phiếu đặt chỗ
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          required
                          value={reservationticketId}
                          onChange={(event) =>
                            setReservationticketId(event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid row-span-1 grid-cols-3">
                      {/* <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Ngày sinh
                        </label>
                        <DatePicker
                          className="w-full border border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
                          selected={applydateId}
                          onChange={(date) => setApplydateId(date)}
                          dateFormat="yyyy/MM/dd"
                          maxDate={new Date()}
                          isClearable
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />
                      </div> */}
                      <div className="col-span-2 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Mô tả
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          required
                          value={packageDecs}
                          onChange={(event) =>
                            setPackageDecs(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
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
                    type="submit"
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
