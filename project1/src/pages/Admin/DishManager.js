import React, { useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import NavbarMenu from "../../components/Admin/NavbarMenu";
import { useNavigate } from "react-router-dom";
import DishModal from "../../components/Admin/Modal/Dish/DishModal";
import DishModalEdit from "../../components/Admin/Modal/Dish/DishEditModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDishesAPI,
  dataAllDishes,
  getDishAPI,
  deleteDishAPI,
  dataCheck,
} from "../../redux/monanRedux";

const DishManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(dataAllDishes);
  const check = useSelector(dataCheck);
  useEffect(() => {
    dispatch(getAllDishesAPI());
  }, [check]);

  const handleDetail = (dishId) => {
    navigate(`/manager/dish-manager/${dishId}`);
    dispatch(getDishAPI(dishId));
  };

  const handleDelete = (id) => {
    dispatch(deleteDishAPI(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          <NavbarMenu />
          <DishModal />

          <div className="w-full px-10 py-3">
            <table className="border border-slate-200">
              <thead>
                <tr className="border border-slate-200 bg-green-600">
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Tên món ăn
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Danh mục
                  </th>
                  <th className="border border-slate-200 p-3 text-white font-medium">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.dishes &&
                  data.dishes.length > 0 &&
                  data.dishes.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-slate-200">
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          {item?.categoryDataToDish?.name}
                        </td>
                        <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                          <div className="flex">
                            <div
                              className=""
                              onClick={() => handleDetail(item.id)}
                            >
                              <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                            </div>
                            <div className="mr-3" title="Sửa">
                              <DishModalEdit item={item} />
                            </div>
                            <div
                              className=""
                              title="Xóa"
                              onClick={() => handleDelete(item.id)}
                            >
                              <RiDeleteBinLine className="cursor-pointer text-lg text-red-700" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishManager;
