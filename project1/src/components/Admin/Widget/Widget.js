import { AiOutlineUp } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
const Widget = () => {
  return (
    <div className="">
      <div className="grid grid-cols-3 w-full p-5 mt-5">
        <div className="col-span-1 mx-auto border-2 w-4/5 shadow-lg rounded-md h-34 bg-slate-50">
          <div className="flex px-5 py-3">
            <div className="mr-auto text-sm uppercase font-medium text-slate-600">
              Người dùng
            </div>
            <div className="ml-auto">
              <div className="flex text-green-700 font-medium">
                <AiOutlineUp className="mt-1 mr-1" />
                50 %
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium px-5">12345</div>
          <div className="flex px-5 py-3">
            <div className="mr-auto italic text-slate-700 underline underline-offset-2 hover:text-green-700 cursor-pointer">
              Xem tất cả
            </div>
            <div className="ml-auto">
              <FaUserCircle size={22} className="text-green-700" />
            </div>
          </div>
        </div>

        <div className="col-span-1 mx-auto border-2 w-4/5 shadow-lg rounded-md h-34 bg-slate-50">
          <div className="flex px-5 py-3">
            <div className="mr-auto text-sm uppercase font-medium text-slate-600">
              Người dùng
            </div>
            <div className="ml-auto">
              <div className="flex text-green-700 font-medium">
                <AiOutlineUp className="mt-1 mr-1" />
                50 %
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium px-5">12345</div>
          <div className="flex px-5 py-3">
            <div className="mr-auto italic text-slate-700 underline underline-offset-2 hover:text-green-700 cursor-pointer">
              Xem tất cả
            </div>
            <div className="ml-auto">
              <FaUserCircle size={22} className="text-green-700" />
            </div>
          </div>
        </div>

        <div className="col-span-1 mx-auto border-2 w-4/5 shadow-lg rounded-md h-34 bg-slate-50">
          <div className="flex px-5 py-3">
            <div className="mr-auto text-sm uppercase font-medium text-slate-600">
              Người dùng
            </div>
            <div className="ml-auto">
              <div className="flex text-green-700 font-medium">
                <AiOutlineUp className="mt-1 mr-1" />
                50 %
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium px-5">12345</div>
          <div className="flex px-5 py-3">
            <div className="mr-auto italic text-slate-700 underline underline-offset-2 hover:text-green-700 cursor-pointer">
              Xem tất cả
            </div>
            <div className="ml-auto">
              <FaUserCircle size={22} className="text-green-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
