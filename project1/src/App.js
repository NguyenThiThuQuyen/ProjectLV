import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Guest from "./routes/guest";
import Admin from "./routes/admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Guest />} index />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Routes>
        <Route path="/admin/*" element={<Admin />} index />
      </Routes>
    </>
  );
}

export default App;
