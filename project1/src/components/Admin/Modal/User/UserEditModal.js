import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { getBase64 } from "../../../../utils/CommonUtils";
import { editUserAPI } from "../../../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { ImUpload3 } from "react-icons/im";
import {
  dataGetAllGender,
  dataGetAllRole,
  dataCheck,
} from "../../../../redux/userRedux";
export default function UserModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [gender, setgender] = useState("M");
  const [roleId, setRoleId] = useState();
  const [id, setId] = useState();

  const dataRole = useSelector(dataGetAllRole);
  const dataGender = useSelector(dataGetAllGender);
  const check = useSelector(dataCheck);

  const params = {
    name: name,
    email: email,
    image: image,
    phone: phone,
    address: address,
    gender: gender,
    roleId: roleId,
    id: id,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setName(props.item.name);
    setEmail(props.item.email);
    setImage(props.item.image);
    setPhone(props.item.phone);
    setAddress(props.item.address);
    setgender(props.item.gender);
    setRoleId(props.item.roleId);
    setId(props.item.id);
  }, [props.item]);

  const handleSaveEdit = () => {
    dispatch(editUserAPI(params));
    setShowModalEdit(false);
  };

  // useEffect(() => {
  //   dispatch(getAllRoleAPI());
  //   dispatch(getAllGenderAPI());
  // }, [check]);

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    SỬA NGƯỜI DÙNG
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-rows-3">
                    <div className="grid row-span-1 grid-cols-3">
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Họ tên
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Giới tính
                        </label>
                        <select
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
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
                          Điện thoại
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>
                      <div className="col-span-2 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Điạ chỉ
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid row-span-1 grid-cols-3">
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Quyền
                        </label>
                        <select
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          id=""
                          required
                          value={roleId}
                          onChange={(event) => setRoleId(event.target.value)}
                        >
                          {dataRole.data &&
                            dataRole.data.length > 0 &&
                            dataRole.data.map((item, index) => {
                              return (
                                <option key={index} value={item.keyMap}>
                                  {item.value}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="col-span-1 mx-3 my-4 relative">
                        <label htmlFor="" className="text-slate-600 ml-2 flex">
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
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-600 ml-2">
                          Id
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          disabled
                          className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={id}
                          onChange={(event) => setId(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
