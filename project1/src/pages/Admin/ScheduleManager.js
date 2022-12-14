import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import ScheduleModal from "../../components/Admin/Modal/Schedule/ScheduleModal";
import ScheduleModalEdit from "../../components/Admin/Modal/Schedule/ScheduleEditModal";
import "./Pagination.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
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
import { set } from "lodash";
import { MdSettingsRemote } from "react-icons/md";

const ScheduleManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [getId, setGetId] = useState();
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(dataGetAllSchedule);
  const check = useSelector(dataCheck);
  const [paging, setPaging] = useState();
  const [truyen, setTruyen] = useState();
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

  const handleModalEdit = (item) => {
    setShowModalEdit(true);
    setTruyen(item);
  };

  const handleDong = (test) => {
    setShowModal(test);
    setShowModalEdit(test);
  };

  const handleMoLai = (data) => {
    setShowModal(data);
    setShowModalEdit(data);
  };

  const removeAccents = (str) => {
    // h??m b??? d???u ti???ng vi???t
    var AccentsMap = [
      "a??????????????????????????????????????????????",
      "A??????????????????????????????????????????????",
      "d??",
      "D??",
      "e??????????????????????????????",
      "E??????????????????????????????",
      "i????????????",
      "I????????????",
      "o??????????????????????????????????????????????",
      "O??????????????????????????????????????????????",
      "u?????????????????????????????",
      "U?????????????????????????????",
      "y??????????????",
      "Y??????????????",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  };

  const handleGetId = (id) => {};

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
                {item?.id}
              </td>
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
                    <BsThreeDots className="cursor-pointer text-lg text-green-700" />
                  </div>
                  <div className="mr-3" title="S???a">
                    {/* <ScheduleModalEdit item={item} /> */}
                    <div className="ml-5">
                      <button
                        type="button"
                        onClick={() => handleModalEdit(item)}
                      >
                        <BiEdit className="cursor-pointer text-lg text-blue-600" />
                      </button>
                    </div>
                  </div>
                  <div
                    className=""
                    title="X??a"
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
        <div className="">
          {showModalEdit === true ? (
            <ScheduleModalEdit
              openModal={showModalEdit}
              handleClose={handleDong}
              handleMo={handleMoLai}
              item={truyen}
            />
          ) : null}
        </div>
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
                    placeholder="T??m ki???m..."
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
                  Th??m l???ch t?? v???n
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
                  Xu???t excel
                </button>
              </div>
            </div>
          </div>

          <table className="border ml-10 mt-3 border-slate-200">
            <thead>
              <tr className="border border-slate-200 bg-green-600">
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Id
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  T??n b??c s??
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Ng??y t?? v???n
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Khung gi??? TV
                </th>
                <th className="border border-slate-200 p-3 text-white font-medium">
                  Thao t??c
                </th>
              </tr>
            </thead>
            {displaySchedules}
          </table>

          <div className="w-full px-10 py-3">
            <ReactPaginate
              previousLabel={"Tr?????c"}
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
