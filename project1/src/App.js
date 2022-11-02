import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Guest from "./routes/guest";
import Admin from "./routes/admin";
import { useNavigate } from "react-router-dom";
// import {  } from "react-router-dom";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user: " + user);
  const navigator = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/*" element={<Guest />} index />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/*" element={<Admin />} index />
      </Routes>
    </>
  );
}

export default App;
