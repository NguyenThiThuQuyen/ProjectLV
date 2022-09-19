import React from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";

const HomeAdmin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-initial w-5/6">
        <Navbar />
      </div>
    </div>
  );
};

export default HomeAdmin;
