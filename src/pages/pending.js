import React, { useState, useContext, useRef, useEffect } from 'react';
import '../App.css';
import { Context } from "../components/globalContext/globalContext.js";
import Cookies from "universal-cookie";

import Complete from "../assets/complete.png";
import Home from "../assets/home.png";
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Community from '../components/community.js'
import NewHeader from '../components/NewHeader';

export default function PendingPage(props) {

  const globalContext = useContext(Context);
  const { windowDimensions, domain, authenticated, setAuthenticated } = globalContext


  const cookies = new Cookies();

  const [notice, setNotice] = useState()

  useEffect(()=> {
    if (authenticated) {
      console.log("trying to redirect from login page")
      console.log("Window Is Authenticated")
      window.location = "/profile"
    }
  }, [])


return (
  <div className="login">
    <NewHeader />
    <div ref={(props.propsRef)? props.propsRef : null} className="section-outer margin-bottom-20 flex-col vertical-center" id="contact">
      <div className="flex-row vertical-center horizontal-center">
        <img src={Complete} className="complete-icon" />
        <h2 className="primary-foreground text-center">Registration Completed!</h2>
      </div>
      <div className="form-outer margin-top-2">
        <div className="row1 col1-2 flex-col vertical-center">
          <p className="primary-foreground">Your registration is in review, which is a process that can take up to few days. You can try logging in in a few days.</p>
          <div className="flex-row center-center padding-top-5 pointer" onClick={()=> window.location = "/"}>
            <img src={Home} className="home-icon pointer" />
            <h5 className="tertiary-foreground underline pointer">Go to home page</h5>
          </div>
        </div>


      </div>

    </div>

    <Footer />
    <Community />
    <p className="text-center padding-top-2 padding-bottom-2">Copyright 2021 ©Asalp. All Rights Reserved</p>
  </div>

)
};
