import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import NavbarMenu from "../../components/Admin/NavbarMenu";
// import DishModalEdit from "../../components/Admin/Modal/User/DishEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getDishAPI, dataGetADish, dataCheck } from "../../redux/monanRedux";

const DishSingle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params:", params);
  const check = useSelector(dataCheck);
  const dataDish = useSelector(dataGetADish);
  console.log("dish: ", dataDish);
  useEffect(() => {
    dispatch(getDishAPI(params.dishId));
  }, [check]);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <NavbarMenu />
        {/* <DishModalEdit /> */}

        <div className="p-10">
          <div className="uppercase font-medium text-sky-600 text-xl">
            {dataDish?.dish?.name}
          </div>
          <div className="flex">
            <span className="text-slate-700">Danh mục món:</span>
            <div className="ml-3">
              {dataDish?.dish?.categoryDataToDish?.name}
            </div>
          </div>
          <div className="mt-10">
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: dataDish?.dish?.contentHTML,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishSingle;
