import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  getAUserAPI,
  dataGetAUser,
  dataCheck,
  deleteUserAPI,
} from "../../redux/userRedux";
import NavbarUser from "../../components/Admin/NavbarUser";
import { email } from "react-admin";
const Single = () => {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params);
  // const location = useLocation();
  // const id = location.search.split("=")[1];
  const check = useSelector(dataCheck);
  const user = useSelector(dataGetAUser);
  console.log(user);
  useEffect(() => {
    dispatch(getAUserAPI(params.userId));
  }, [check]);
  return (
    // single
    <div className="flex w-full">
      <Sidebar />
      {/* singleContainer */}
      <div className="flex-initial w-5/6">
        <Navbar />
        <NavbarUser />
        {/* top */}
        <div className="flex p-5 gap-5">
          {/* left */}
          <div className="flex-2 shadow-xl border-[1px] p-5 relative">
            {/* editButton */}
            <div className="absolute top-0 right-0 px-3 py-1.5 text-xs text-indigo-600 bg-slate-200 cursor-pointer rounded-[3px]">
              Edit
            </div>
            <h1 className="mb-3 font-bold text-lg">Information</h1>
            {/* item */}

            {user &&
              user.length > 0 &&
              user.map((item, index) => {
                console.log("111:", user);
                return (
                  <div className="flex gap-5" key={item.id}>
                    <img
                      src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                      alt=""
                      className="w-24 h-24 rounded-[50%] object-cover"
                    />
                    <div className="">
                      <h1 className="mb-2	text-slate-600">{item.name}</h1>
                      <div className="mb-2 text-sm">
                        <span className="font-bold text-slate-500">Email:</span>
                        <span className="font-normal ml-2">{email}</span>
                      </div>
                      <div className="mb-2 text-sm">
                        <span className="font-bold text-slate-500">Phone:</span>
                        <span className="font-normal ml-2">+1 2345 67 89</span>
                      </div>
                      <div className="mb-2 text-sm">
                        <span className="font-bold text-slate-500">
                          Address:
                        </span>
                        <span className="font-normal ml-2">
                          Elton St. 234 Garden Yd. NewYork
                        </span>
                      </div>
                      <div className="mb-2 text-sm">
                        <span className="font-bold text-slate-500">
                          Country:
                        </span>
                        <span className="font-normal ml-2">USA</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        <List />
      </div> */}
      </div>
    </div>
  );
};

export default Single;
