import React from "react";
import Content from "../components/Content/Content";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
function Homepage() {
  // console.log(process.env.REACT_APP_ROUTER_BASE_NAME)
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Homepage;
