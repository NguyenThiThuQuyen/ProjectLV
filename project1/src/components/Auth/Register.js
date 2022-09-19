import React from 'react'
import { Link } from "react-router-dom";
import bglogin from "../../assets/upload/bglogin.jpg"

function Register() {


    return (
        <>
            <div className="w-full flex flex-wrap justify-center">
                <img src={bglogin} alt=""
                    className='mx-auto h-screen w-full object-cover opacity-80'
                />
                <div className="fixed py-40">
                    <div className="border-2 border-slate-200 shadow-lg shadow-indigo-400 mx-auto w-11/12 bg-white">
                        <div className="grid grid-cols-2">
                            <div className="col-span-1">
                                <div className="font-HindMadurai text-3xl mt-14 font-bold text-center text-sky-700">SIGN UP</div>
                                {/* <div className="flex w-full my-3">
                                    <div className="flex mx-auto">
                                        <div className="mx-1">
                                            <FaFacebookF className='border-2 border-slate-500 rounded-full bg-white' size={22} color={'black'} />
                                        </div>
                                        <div className="mx-1">
                                            <AiOutlineGooglePlus className='border-2 border-slate-500 rounded-full bg-white' size={22} color={'black'} />
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="text-slate-500 text-center">or use your account</div> */}
                                <form className="xl:mx-24 md:mx-8 xs:mx-6">
                                    <div className="grid grid-cols-1">
                                        <div className="col-span-1 my-2">
                                            <input
                                                type="text"
                                                placeholder='Username'
                                                className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div className="col-span-1 my-2">
                                            <input
                                                type="text"
                                                placeholder='Email'
                                                className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div className="col-span-1 my-2">
                                            <input
                                                type="text"
                                                placeholder='Phone Number'
                                                className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div className="col-span-1 my-2">
                                            <input
                                                type="password"
                                                placeholder='Password'
                                                className="border rounded-lg p-2 mt-1 w-full bg-slate-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 my-5 w-full">
                                        <div className="col-span-1 my-2 mx-auto">
                                            <button className='border-2 rounded-3xl px-7 py-2 bg-sky-500 text-white font-medium
                                                                    hover:bg-transparent 
                                                                    hover:border-2
                                                                    hover:border-sky-500
                                                                    hover:text-black'>
                                                SIGN UP
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-span-1 bg-indigo-600">
                                <div className="px-8 text-center mt-20">
                                    <div className="text-white text-4xl font-medium">Hello, Friend!</div>
                                    <div className="text-white text-lg my-6">Enter your personal details and start journey with us</div>
                                    <div className="w-full">
                                        <button className='border-2 rounded-3xl px-7 py-2 bg-transparent text-white font-medium
                                                                    hover:bg-white 
                                                                    hover:border-2
                                                                    hover:border-white
                                                                    hover:text-black'
                                        >
                                            <Link to="/login">
                                                SIGN UP
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register