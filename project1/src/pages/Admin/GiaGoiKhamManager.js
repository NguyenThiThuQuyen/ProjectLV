// import React, { useEffect } from "react";
// import Sidebar from "../../components/Admin/Sidebar";
// import Navbar from "../../components/Admin/Navbar";
// import GoiKhamModal from "../../components/Admin/Modal/MedicalPackage/GoiKhamModal";
// import GoiKhamModalEdit from "../../components/Admin/Modal/MedicalPackage/GoiKhamEditModal";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { Buffer } from "buffer";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllGiaGoiKhamAPI,
//   dataGetAllGiaGoiKham,
//   dataCheck,
// } from "../../redux/giaGoiKhamRedux";

// const GoiKhamManager = () => {
//   const dispatch = useDispatch();
//   const data = useSelector(dataGetAllGiaGoiKham);
//   const check = useSelector(dataCheck);

//   useEffect(() => {
//     dispatch(getAllGiaGoiKhamAPI());
//   }, [check]);

//   return (
//     <>
//       <div className="flex w-full">
//         <Sidebar />
//         <div className="flex-initial w-5/6">
//           <Navbar />
//           <GoiKhamModal />
//           <div className="w-full px-10 py-3">
//             <table className="border border-slate-200">
//               <thead>
//                 <tr className="border border-slate-200 bg-green-600">
//                   <th className="border border-slate-200 p-3 text-white font-medium">
//                     Gói tư vấn
//                   </th>
//                   <th className="border border-slate-200 p-3 text-white font-medium">
//                     Hình ảnh
//                   </th>
//                   <th className="border border-slate-200 p-3 text-white font-medium">
//                     Mô tả
//                   </th>
//                   <th className="border border-slate-200 p-3 text-white font-medium">
//                     Giá
//                   </th>
//                   <th className="border border-slate-200 p-3 text-white font-medium">
//                     Ngày áp dụng
//                   </th>
//                   <th className="border border-slate-200 p-3 text-white font-medium">
//                     Điều chỉnh
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.prices &&
//                   data.prices.length > 0 &&
//                   data.prices.map((item, index) => {
//                     let imageBase64 = "";
//                     if (item.medicalPackageDataToPackagePrice.image) {
//                       imageBase64 = new Buffer(
//                         item.medicalPackageDataToPackagePrice.image,
//                         "base64"
//                       ).toString("binary");
//                     }
//                     return (
//                       <tr key={item.id} className="hover:bg-slate-200">
//                         <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
//                           {item.medicalPackageDataToPackagePrice.packageName}
//                         </td>
//                         <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
//                           <img
//                             src={imageBase64}
//                             alt=""
//                             className=""
//                             style={{ height: "70px", width: "70px" }}
//                           />
//                         </td>
//                         <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
//                           {item.medicalPackageDataToPackagePrice.packageDecs}
//                         </td>
//                         <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
//                           {item.price}
//                         </td>
//                         <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
//                           {item.applydateId}
//                         </td>
//                         <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
//                           <div className="flex">
//                             <div className="mr-3" title="Sửa">
//                               <GoiKhamModalEdit item={item} />
//                             </div>
//                             <div className="">
//                               <RiDeleteBinLine className="cursor-pointer text-lg text-red-700" />
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GoiKhamManager;
