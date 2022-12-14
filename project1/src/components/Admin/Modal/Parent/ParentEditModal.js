import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { editParentAPI } from "../../../../redux/parentRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { dataGetAllGender } from "../../../../redux/userRedux";
import logo from "../../../../assets/upload/logo.png";
export default function ParentModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [gender, setgender] = useState("M");
  const [id, setId] = useState();
  const dataGender = useSelector(dataGetAllGender);

  const params = {
    name: name,
    email: email,
    phone: phone,
    gender: gender,
    address: address,
    id: id,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setName(props?.item?.name);
    setEmail(props?.item?.email);
    setPhone(props?.item?.phone);
    setgender(props?.item?.genderDataToParent?.value);
    setAddress(props?.item?.address);
    setId(props?.item?.id);
  }, [props.item]);

  const handleSaveEdit = () => {
    dispatch(editParentAPI(params));
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
                    C???P NH???T TH??NG TIN NG?????I ?????I DI???N
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <form className=""> */}
                  <div className="grid grid-rows-2">
                    <div className="grid row-span-1 grid-cols-3">
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          H??? t??n
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Email
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          disabled
                          required
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Gi???i t??nh
                        </label>
                        <select
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          id=""
                          value={gender}
                          onChange={(event) => setgender(event.target.value)}
                        >
                          {dataGender.data &&
                            dataGender.data.length > 0 &&
                            dataGender.data.map((item, index) => {
                              return (
                                <option key={index} value={item.keyMap}>
                                  {item.value}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="grid row-span-1 grid-cols-3">
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          ??i???n tho???i
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>
                      <div className="col-span-2 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          ?????a ch???
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-white-600 text-red-600 hover:text-white hover:bg-red-500 hover font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalEdit(false)}
                  >
                    ????NG
                  </button>
                  <button
                    className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => handleSaveEdit()}
                  >
                    L??U TH??NG TIN
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
