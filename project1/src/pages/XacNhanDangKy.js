import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation, useParams } from "react-router-dom";
const Confirm = () => {
  const detailparams = useParams();

  return (
    <div className="h-screen bg-slate-50">
      <Header />

      <div className="w-full">
        <div className="w-2/3 mx-auto mt-32">ádfg</div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirm;
