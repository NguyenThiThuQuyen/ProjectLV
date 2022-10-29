import React, { useState, useEffect } from "react";
import "./Content.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/upload/banner1.jpg";
import bacsi4 from "../../assets/upload/bacsi4.jpg";
import hinh1 from "../../assets/upload/hinh1.jpg";
import capture from "../../assets/upload/Capture.JPG";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbBellRinging } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dataGetDoctorHome,
  getAllDoctorHomeAPI,
  dataCheck,
} from "../../redux/userRedux";

import {
  getAllMedicalPackaheHomeAPI,
  dataGetAllGoiKhamHome,
  getGoiKhamAPI,
} from "../../redux/goiKhamRedux";

const Content = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataGetDoctorHome);
  const dataPackage = useSelector(dataGetAllGoiKhamHome);
  const check = useSelector(dataCheck);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllDoctorHomeAPI());
    dispatch(getAllMedicalPackaheHomeAPI());
  }, [check]);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "45px" }}> {dots} </ul>
      </div>
    ),
  };

  const handleDetail = (medicalpackageId) => {
    navigate(`/detail-service/${medicalpackageId}`);
    dispatch(getGoiKhamAPI(medicalpackageId));
  };

  return (
    <>
      <Slider {...settings}>
        <div className="flex flex-wrap">
          <div className="flex-wrap grid justify-items-start">
            <img
              className="w-full h-[740px] object-cover"
              src={banner1}
              alt="bn3"
            />
            <div
              data-aos="fade-right"
              className="fixed box-border ml-24 w-5/12 p-4 mt-[12%] border-0 border-slate-200 shadow-lg shadow-rose-200 style-bg"
            >
              <div className="flex ml-3 font-Caveat text-5xl text-rose-600">
                Children's Care
              </div>
              <div className="font-Bangers mt-3 ml-3 text-4xl text-neutral-800 drop-shadow-xl shadow-white">
                Dinh dưỡng hợp lý là nền tảng của
              </div>
              <div className="font-SmoochSans mt-2 ml-3 text-4xl text-sky-500 font-medium drop-shadow-xl shadow-white">
                Sức khỏe, Tầm vóc và Trí tuệ
              </div>
              <div className="ml-3 text-lg drop-shadow-xl shadow-black">
                Trẻ sẽ được thăm khám và điều trị theo phác đồ toàn diện, khoa
                học
              </div>
              <div className="ml-3 text-md drop-shadow-xl shadow-black">
                Khám lâm sàng,
              </div>
              <div className="ml-3 text-md drop-shadow-xl shadow-black">
                Xét nghiệm chẩn đoán,
              </div>
              <div className="ml-3 text-md drop-shadow-xl shadow-black">
                Xây dựng khẩu phần đến lên thực đơn cá thể hóa,
              </div>
              <div className="ml-3 text-md drop-shadow-xl shadow-black">
                Hướng dẫn chế biến món ăn…
              </div>

              <div className="mt-5 grid justify-items-center">
                <button className=" mx-5 rounded py-3 px-5 box-border border-1 bg-rose-600  hover:bg-rose-500 text-white">
                  <Link to="/schedule">
                    <div className="flex animate-pulse">
                      <TbBellRinging
                        className="animate-bounce mr-1"
                        size={25}
                      />
                      ĐẶT LỊCH NGAY
                    </div>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Slider>

      <div className="grid grid-cols-2 justify-items-center bg-zinc-200 mt-[-4px]">
        <div className="flex col-span-1 py-5">
          <div className="rounded-full bg-sky-500">
            <BsFillTelephoneFill
              className="animate-pulse m-2 p-1"
              size={30}
              color={"white"}
            />
          </div>
          <div className="mt-1 ml-2 text-sky-600 text-2xl font-medium">
            012-345-678
          </div>
        </div>
        <div className="flex col-span-1 py-5">
          <div className="rounded-full bg-sky-500">
            <AiOutlineSchedule
              className="animate-pulse mt-1 m-2 p-1"
              size={30}
              color={"white"}
            />
          </div>
          <div className="mt-1 ml-2 text-sky-600 text-2xl font-medium">
            Đặt lịch tư vấn
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-duration="1500" className="">
        <h1 className="font-MPLUSRounded text-4xl mt-16 mb-5 text-center text-sky-600">
          Dịch Vụ
        </h1>
        <div className="border-solid border-2 border-slate-200 shadow-lg shadow-slate-300 items-center justify-items-center h-auto mx-auto w-9/12 p-4">
          <div className="grid grid-cols-2 justify-items-center bg-white">
            {dataPackage.data &&
              dataPackage.data.length > 0 &&
              dataPackage.data.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <>
                    <div className="col-span-1 mt-10">
                      <div className="grid grid-cols-2 justify-items-center">
                        <div className="col-span-1 px-5">
                          <img
                            src={imageBase64}
                            alt=""
                            className="w-full h-[200px]"
                          />
                        </div>
                        <div className="col-span-1 w-full">
                          <div className="font-medium text-sky-700 cursor-pointer">
                            {item.packageName}
                          </div>
                          <div className="text-sm">{item.packageDecs}</div>
                          <div
                            className="font-medium mt-5 underline underline-offset-8 hover:text-sky-500 cursor-pointer"
                            onClick={() => handleDetail(item.id)}
                          >
                            LEARN MORE
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>

          <div className="justify-center items-center mt-10">
            <FaArrowDown className="animate-bounce cursor-pointer mx-auto text-slate-700" />
          </div>
          <Link to="/service" className="">
            <div className="cursor-pointer text-center text-slate-500">
              <span className="">Xem thêm ...</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <div className="bg-emerald-50 h-[300px]">
          <div className="w-full py-32">
            <img className="h-[600px] w-[1000px] mx-auto " src={hinh1} alt="" />
          </div>
        </div>
        <div className="bg-sky-400 h-[540px]"></div>
        <div className="bg-sky-400 h-[300px]">
          <div className="text-center text-white font-bold font-HindMadurai text-5xl">
            How We Work
          </div>
          <div className="grid grid-cols-2 container mx-auto px-32 mt-6">
            <div className="col-span-1 px-6 text-white text-justify">
              Its departments are equipped with state-of-the-art diagnostic and
              therapeutic equipment and operated by top-category physicians,
              Ph.D. and Doctors of Medicine, associate professors and professors
              knowledgeable of the best available practices of European schools.
              Partnerships with specialized clinics and research centers in
              Russia and Europe make possible consultations by doctors of unique
              specialties.
            </div>
            <div className="col-span-1 px-6 text-white text-justify">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
              <div className="">
                <button
                  className="rounded mt-5 py-4 px-10 
                                                    box-border border-2 border-white
                                                    hover:bg-white hover:text-black
                                                    bg-transparent text-white font text-lg"
                >
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sky-400 h-[230px]">
          <div className="w-full">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="h-full w-full border border-slate-200 shadow-lg shadow-slate-300 bg-white mx-auto"
            >
              <div className="w-full">
                <img className="h-full w-full mx-auto " src={capture} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-96">
        <div className="text-center font-medium text-sky-700 text-3xl">
          Meet The Team
        </div>
        <Slider {...settings}>
          <div className="w-full">
            <div className="w-9/12 mx-auto">
              <div className="grid grid-cols-3">
                {data.data &&
                  data.data.length > 0 &&
                  data.data.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <>
                        <div className="col-span-1 mx-5" key={item.id}>
                          <div className=" bg-slate-200">
                            <div className="w-full mt-5">
                              <img
                                src={imageBase64}
                                alt=""
                                className="h-52 w-52 pt-5 rounded-full mx-auto"
                              />
                              <div className="text-center mt-3 text-xl font-medium">
                                {item.name}
                              </div>
                              <div className="text-center mt-2 text-lg font-light">
                                CHIEF OPERATING OFFICER
                              </div>
                              <div className="text-center mt-2 px-4 py-4">
                                Sức khỏe, sự an toàn của bạn là sứ mệnh và nguồn
                                cảm hứng của chúng tôi
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="justify-center items-center mt-10">
                <FaArrowDown className="animate-bounce cursor-pointer mx-auto text-slate-700" />
              </div>
              <div className="cursor-pointer text-center text-slate-500">
                Xem thêm ...
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <div className="mt-20">
        <div className="">
          <img src={bacsi4} alt="" />
        </div>
        <div className="mt-[-150px] absolute w-full">
          <div className="w-full">
            <div
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="500"
              className="h-[450px] w-8/12 p-4 border-4 border-slate-200 shadow-lg shadow-slate-300 bg-white mx-auto"
            >
              <div className="text-sky-600 text-center font-medium text-3xl my-5">
                Contact Us
              </div>
              <div className="text-center">
                Sample text. Click to select the text box. Click again or double
                click to start editing the text.
              </div>
              <form className="xl:mx-24 md:mx-8 xs:mx-6">
                <div className="grid grid-cols-3 ">
                  <div className="col-span-1 mx-5 my-7">
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      className="w-full h-10 border rounded-lg p-2 mt-1"
                    />
                  </div>
                  <div className="col-span-1 mx-5 my-7">
                    <input
                      type="text"
                      placeholder="Enter your email address..."
                      className="w-full h-10 border rounded-lg p-2 mt-1"
                    />
                  </div>
                  <div className="col-span-1 mx-5 my-7">
                    <input
                      type="text"
                      placeholder="Telephone number..."
                      className="w-full h-10 border rounded-lg p-2 mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-3 mx-5">
                    <input
                      type="text"
                      placeholder="Enter your message"
                      className="w-full h-20 border rounded-lg p-2 mt-1"
                    />
                  </div>
                </div>
                <div className="mt-10 w-full pr-5 text-right">
                  <button
                    className="rounded px-6 py-4 text-white hover:text-black
                                                         bg-sky-500 hover:bg-white hover:border-2
                                                         hover:border-sky-500 mr-auto "
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
