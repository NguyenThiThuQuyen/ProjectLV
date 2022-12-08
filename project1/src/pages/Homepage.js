import React from "react";
import { ToastContainer } from "react-toastify";
import Content from "../components/Content/Content";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
function Homepage() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Homepage;
