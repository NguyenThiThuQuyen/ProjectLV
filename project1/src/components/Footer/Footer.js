import React from 'react'
import { BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare } from 'react-icons/fa'
import { IconContext } from "react-icons";

function Footer() {
    return (
        <>
            <div className="bg-slate-200 mt-[380px] bottom-0 w-full">
                <div className="grid grid-cols-4 h-fit w-10/12 mx-auto">
                    <div className="col-span-1 px-10">
                        <div className="font-medium text-lg mt-3">
                            Children Care
                        </div>
                        <ul>
                            <li className='my-3 text-gray-700'>
                                6 Nguyen Luong Bang St.Saigon South (Phu My Hung),Dist.7, Ho Chi Minh City,Vietnam
                            </li>
                            <li className='my-3 text-gray-700'>Tel: (028) 54 11 33 33</li>
                            <li className='my-3 text-gray-700'>Fax: (028) 54 11 33 34</li>
                            <li className='my-3 text-gray-700'>Emergency: (028) 54 11 35 00</li>
                            <li className='my-3 text-gray-700'>Email: information@fvhospital.com</li>
                        </ul>
                    </div>
                    <div className="col-span-1 px-10">
                        <div className="font-medium text-lg mt-3">
                            Location
                        </div>
                        <ul>
                            <li className='my-3 text-gray-700'>FV Hospital</li>
                            <li className='my-3 text-gray-700'>FV Saigon Clinic</li>
                            <li className='my-3 text-gray-700'>The Rep Office in Vietnam</li>
                        </ul>

                        <div className="font-medium text-lg mt-3">
                            For Professionals
                        </div>
                        <ul>
                            <li className='my-3 text-gray-700'>FVH Partner Programmers</li>
                            <li className='my-3 text-gray-700'>Careers at FV</li>
                        </ul>
                    </div>
                    <div className="col-span-1 px-10">
                        <div className="font-medium text-lg mt-3">
                            Useful Links
                        </div>
                        <ul>
                            <li className='my-3 text-gray-700'>Find a Doctor</li>
                            <li className='my-3 text-gray-700'>Make an Appointment</li>
                            <li className='my-3 text-gray-700'>Ask use a Question</li>
                            <li className='my-3 text-gray-700'>Information Security Policy</li>
                            <li className='my-3 text-gray-700'>Gallery</li>
                        </ul>
                    </div>
                    <div className="col-span-1 px-10">
                        <div className="font-medium text-lg mt-3">
                            Follow us
                        </div>

                        <div className="flex mt-4">
                            <IconContext.Provider
                                value={{ color: 'red', size: '40px' }}
                            >
                                <div>
                                    <BsYoutube
                                        className='mr-4'
                                    />
                                </div>
                            </IconContext.Provider>

                            <IconContext.Provider
                                value={{ color: 'blue', size: '40px' }}
                            >
                                <div>
                                    <FaFacebookSquare />
                                </div>
                            </IconContext.Provider>
                        </div>




                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer