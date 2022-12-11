import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchImport from "../components/Search/SearchImport";

const Contact = () => {
  return (
    <div className="h-screen ">
      <Header />
      <SearchImport />
      <div className="w-full flex">
        <div className="w-1/3 flex justify-center my-10"></div>
        <div className="w-2/3 border-2">
          <div className="my-10 flex justify-center">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe
                  width="834"
                  height="565"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=h%E1%BA%BBm%20391,%20%C4%91%C6%B0%E1%BB%9Dng%2030/4%20Ninh%20Ki%E1%BB%81u,%20C%E1%BA%A7n%20Th%C6%A1&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
