import React from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import Widget from "../../components/Admin/Widget/Widget";
import Chart from "../../components/Admin/Chart/Chart";

const HomeAdmin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
        <Widget />
        <Chart />
      </div>
    </div>
  );
};

export default HomeAdmin;
