import React from 'react'
import Slider from "react-slick";
import Header from '../components/Header/Header'
import bacsi1 from "../assets/upload/bacsi1.jpg";
import bacsi2 from "../assets/upload/bacsi2.jpg";
import bacsi3 from "../assets/upload/bacsi3.jpg";
import RightArrow from "../assets/slick-arrow/arrow1.svg";
import LeftArrow from "../assets/slick-arrow/arrow2.svg";
function Schedule() {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} />
    );
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 5,
        speed: 500,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
    };
    return (
        <div className="h-screen bg-slate-200">
            <Header />
            <div className="w-full">
                <div className="w-9/12 mx-auto">
                    <Slider {...settings}>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi1} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi2} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi3} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi1} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi2} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi3} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi1} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi2} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi3} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi1} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi2} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-32 p-2 box-border border-2 hover:border-sky-300">
                            <img
                                className='h-52 w-52 mx-auto'
                                src={bacsi3} alt=""
                            />
                            <div className="text-center mt-3 text-base font-medium">Dr. Adam Jonson</div>
                            <div className="text-center text-sm font-light">CHIEF OPERATING OFFICER</div>
                            <div className="text-center">
                                <button className='rounded mt-5 py-2 px-6 
                                                    box-border border-2 border-sky-300
                                                    hover:bg-sky-600 hover:text-white
                                                    bg-transparent text-black font text-sm'>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                    </Slider>

                </div>
            </div>

        </div>
    )
}

export default Schedule