import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editPatientAPI } from "../../../../redux/patientRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { dataGetAllGender } from "../../../../redux/userRedux";
import { getBase64 } from "../../../../utils/CommonUtils";
import { ImUpload3 } from "react-icons/im";
import { Buffer } from "buffer";
import logo from "../../../../assets/upload/logo.png";

export default function PatientModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [childrentName, setChildrentName] = useState();
  const [gender, setgender] = useState("M");
  const [birthday, setBirthday] = useState(new Date());
  const [image, setImage] = useState();
  const [preImg, setPreImg] = useState();
  const [parentId, setParentId] = useState();
  const [id, setId] = useState();
  const dataGender = useSelector(dataGetAllGender);
  const params = {
    childrentName: childrentName,
    image: image,
    birthday: birthday,
    gender: gender,
    parentId: parentId,
    id: id,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let date = new Date(props?.item?.birthday);
    setChildrentName(props?.item?.childrentName);
    setImage(props?.item?.image);
    setBirthday(date);
    setgender(props?.item?.gender);
    setParentId(props?.item?.parentId);
    setId(props?.item?.id);
  }, [props.item]);

  useEffect(() => {
    let imageBase64 = "";
    if (props?.item?.image) {
      imageBase64 = new Buffer(props?.item?.image, "base64").toString("binary");
    }
    setImage(imageBase64);
    setPreImg(imageBase64);
  }, [showModalEdit]);

  const handleSaveEdit = () => {
    dispatch(editPatientAPI(params));
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    C???P NH???T TH??NG TIN B???NH NH??N
                  </h3>
                  <img src={logo} alt="" className="h-[1.8rem] " />
                </div>

                <div className="relative px-6 pt-6 pb-24 flex-auto">
                  <div className="grid grid-rows-2">
                    <div className="grid row-span-1 grid-cols-2">
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-800 ml-2">
                          H??? t??n tr???
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          required
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          value={childrentName}
                          onChange={(event) =>
                            setChildrentName(event.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-800 ml-2">
                          Gi???i t??nh
                        </label>
                        <select
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          id=""
                          required
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
                    <div className="grid row-span-1 grid-cols-2">
                      <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-800 ml-2">
                          Ng??y sinh
                        </label>
                        <DatePicker
                          className="w-full border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
                          selected={birthday}
                          required
                          value={birthday}
                          onChange={(date) => setBirthday(date)}
                          dateFormat="yyyy/MM/dd"
                          maxDate={new Date()}
                          isClearable
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />
                      </div>
                      <div className="col-span-1 mx-3 my-4 relative">
                        <label htmlFor="" className="text-slate-800 ml-2 flex">
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
                          <img src={preImg} width={"100px"} height={"100px"} />
                        </div>
                      </div>

                      {/* <div className="col-span-1 mx-3 my-4">
                        <label htmlFor="" className="text-slate-800 ml-2">
                          Ng?????i ?????i di???n
                        </label>
                        <select
                          className="w-full h-10 border rounded-md p-2 mt-1 bg-slate-100 outline-slate-300"
                          id=""
                          required
                          value={parentId}
                          onChange={(event) => setParentId(event.target.value)}
                        >
                          {data.patients &&
                            data.patients.length > 0 &&
                            data.patients.map((item, index) => {
                              return (
                                <option key={index} value={item.id}>
                                  {item.parentDataToPatient.email}
                                </option>
                              );
                            })}
                        </select>
                      </div> */}
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
