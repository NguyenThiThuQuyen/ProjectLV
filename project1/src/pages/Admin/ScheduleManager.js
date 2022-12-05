import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import ScheduleModal from "../../components/Admin/Modal/Schedule/ScheduleModal";
import ScheduleModalEdit from "../../components/Admin/Modal/Schedule/ScheduleEditModal";
import "./Pagination.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSchedulesAPI,
  dataGetAllSchedule,
  dataCheck,
  deleteScheduleAPI,
  getAScheduleAPI,
} from "../../redux/scheduleRedux";
import { ImDownload3 } from "react-icons/im";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";

const ScheduleManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(dataGetAllSchedule);
  const check = useSelector(dataCheck);
  const [paging, setPaging] = useState();
  useEffect(() => {
    dispatch(getAllSchedulesAPI());
  }, [check]);
  useEffect(() => {
    if (data.schedules) {
      setPaging(data?.schedules?.slice(0, 100));
    }
  }, [data]);
  const handleDelete = (id) => {
    dispatch(deleteScheduleAPI(id));
  };

  const handleDetail = (scheduleId) => {
    navigate(`/manager/schedule-detail/${scheduleId}`);
    dispatch(getAScheduleAPI(scheduleId));
  };

  const handleScheduleModal = () => {
    setShowModal(true);
  };

  const handleDong = (test) => {
    setShowModal(test);
  };

  const handleMoLai = (data) => {
    setShowModal(data);
  };

  const removeAccents = (str) => {
    // hàm bỏ dấu tiếng việt
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  };

  const schedulePerPage = 10;
  const pagesVisited = pageNumber * schedulePerPage;

  const displaySchedules =
    paging &&
    paging?.length > 0 &&
    paging

      ?.filter((item) => {
        let name = removeAccents(item?.userDataToSchedule?.name);
        let timeslot = removeAccents(item?.timeSlotDataToSchedule?.timeslot);
        let input = removeAccents(query);
        return (
          name.includes(input) ||
          name.toLowerCase().includes(input) ||
          timeslot.includes(input) ||
          timeslot.toLowerCase().includes(input)
          //   ||
          // item?.registerDate?.includes(query) ||
          // item?.registerDate?.toLowerCase().includes(query)
        );
      })
      ?.slice(pagesVisited, pagesVisited + schedulePerPage)
      .map((item, index) => {
        let day = "";
        day = moment(item?.registerDate).format("dddd - DD/MM/YYYY");
        return (
          <tbody>
            <tr key={item?.id}>
              <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                {item?.userDataToSchedule?.name}
              </td>
              <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                {day}
              </td>
              <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                {item?.timeSlotDataToSchedule?.timeslot}
              </td>
              <td className="border-y border-slate-300 py-3 px-7 text-slate-700">
                <div className="flex">
                  <div className="" onClick={() => handleDetail(item.id)}>
                    <AiOutlineEye className="cursor-pointer text-lg text-green-700" />
                  </div>
                  <div className="mr-3" title="Sửa">
                    <ScheduleModalEdit item={item} />
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
          </tbody>
        );
      });

  const pageCount = Math.ceil(data?.schedules?.length / schedulePerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-initial w-5/6">
          <Navbar />
          {/* <ScheduleModal /> */}
          <div className="ml-5">
            <div className="mt-7 ml-5">
              <div className="ml-5 flex justify-start">
                <div className="flex items-center border border-scale-200 p-1 rounded">
                  <input
                    className="border-0 outline-0 bg-transparent"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <BsSearch />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="ml-6 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                  onClick={() => handleScheduleModal()}
                >
                  <BsPlusLg className="mr-2 mt-1 text-teal-700" />
                  Thêm lịch tư vấn
                </button>
                <div className="">
                  {showModal === true ? (
                    <ScheduleModal
                      openModal={showModal}
                      handleClose={handleDong}
                      handleMo={handleMoLai}
                    />
                  ) : (
                    <>
                      <div className=""></div>
                    </>
                  )}
                </div>
              </div>

              <div className="ml-8 mt-8">
                <button
                  className="flex text-teal-800 font-medium hover:text-slate-600"
                  type="button"
                >
                  <ImDownload3 className="mr-2 mt-1 text-teal-700" />
                  Xuất excel
                </button>
              </div>
            </div>
          </div>

          <table className="border ml-10 mt-3 border-slate-200">
            <thead>
              <tr className="border border-slate-200 bg-green-600">
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Tên bác sĩ
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Ngày tư vấn
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Khung giờ TV
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Thao tác
                </th>
              </tr>
            </thead>
            {displaySchedules}
          </table>

          <div className="w-full px-10 py-3">
            <ReactPaginate
              previousLabel={"Trước"}
              nextLabel={"Sau"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleManager;
