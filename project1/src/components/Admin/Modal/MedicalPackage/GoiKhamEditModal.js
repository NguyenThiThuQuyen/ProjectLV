import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBase64 } from "../../../../utils/CommonUtils";
import { ImUpload3 } from "react-icons/im";
import { editGoiKhamAPI } from "../../../../redux/goiKhamRedux";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { Buffer } from "buffer";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
export default function GoiKhamModalEdit(props) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [packageName, setPackageName] = useState();
  const [packageDecs, setPackageDecs] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [preImg, setPreImg] = useState();
  const [contentMarkdown, setContentMarkdown] = useState();
  const [contentHTML, setContentHTML] = useState();
  const [applydateId, setApplydateId] = useState(new Date());
  const [id, setId] = useState();
  const params = {
    packageName: packageName,
    packageDecs: packageDecs,
    image: image,
    price: price,
    applydateId: applydateId,
    id: id,
    contentMarkdown: contentMarkdown,
    contentHTML: contentHTML,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    let date = new Date(
      props?.item?.medicalPackageDataToPackagePrice?.applydateId
    );
    setPackageName(props?.item?.packageName);
    setPackageDecs(props?.item?.packageDecs);
    setApplydateId(date);
    setPrice(props?.item?.medicalPackageDataToPackagePrice?.price);
    setImage(props?.item?.image);
    setContentMarkdown(props?.item?.contentMarkdown);
    setContentHTML(props?.item?.contentHTML);
    setId(props?.item?.id);
  }, [props?.item]);

  useEffect(() => {
    let imageBase64 = "";
    if (props?.item?.image) {
      imageBase64 = new Buffer(props?.item?.image, "base64").toString("binary");
    }
    setImage(imageBase64);
    setPreImg(imageBase64);
  }, [showModalEdit]);

  const handleSave = () => {
    dispatch(editGoiKhamAPI(params));
    setShowModalEdit(false);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
    setPreImg(base64);
  };

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
    setContentHTML(html);
    setContentMarkdown(text);
  }

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
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base font-bold text-slate-500">
                    THÊM GÓI TƯ VẤN
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
                <div className="relative p-6 flex-auto">
                  <form className="w-full">
                    <div className="grid grid-rows-2 w-[80%] mx-auto">
                      <div className="grid row-span-1 grid-cols-3">
                        <div className="col-span-1 mx-3">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Tên gói tư vấn
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-md p-2 mt-1 outline-slate-300"
                            value={packageName}
                            onChange={(event) =>
                              setPackageName(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-1 mx-3">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Giá tiền (VND)
                          </label>
                          <input
                            type="text"
                            placeholder="..."
                            className="w-full h-10 border rounded-md p-2 mt-1  outline-slate-300"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                          />
                        </div>
                        <div className="col-span-1 mx-3">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Ngày áp dụng
                          </label>
                          <DatePicker
                            className="w-full border border-2 p-2 rounded-lg mt-1 bg-slate-100 outline-slate-300"
                            selected={applydateId}
                            value={applydateId}
                            required
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
                        <div className="col-span-2 mx-3">
                          <label htmlFor="" className="text-slate-600 ml-2">
                            Mô tả ngắn
                          </label>
                          <textarea
                            type="text"
                            placeholder="..."
                            className=" w-full h-16 border rounded-lg p-2 mt-1  outline-slate-300"
                            value={packageDecs}
                            onChange={(event) =>
                              setPackageDecs(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-span-1 mx-3 relative">
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
                    <MdEditor
                      style={{ height: "200px", marginTop: "70px" }}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={handleEditorChange}
                      value={contentMarkdown}
                    />
                  </form>
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
