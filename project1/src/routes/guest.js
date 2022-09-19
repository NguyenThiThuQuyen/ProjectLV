import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../pages/Homepage';
import Schedule from '../pages/Schedule';


function guest() {
    return (
        <div>
            <Routes>
                <Route path='/' index element={<Homepage />} />
                <Route path='/schedule' element={<Schedule />} />
            </Routes>

        </div>
    )
}

export default guest