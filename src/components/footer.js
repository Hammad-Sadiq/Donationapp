import React, { useState, useContext } from 'react';
import MenuButton from './menuButton.js'
import { Context } from "./globalContext/globalContext.js";
import Logo from "../assets/logo.png"
import GiftIcon from "../assets/gift.png"

export default function Footer(props) {

  const globalContext = useContext(Context);
  const { windowDimensions, aboutRef, contactRef, authenticated } = globalContext

  return(
  <div ref={(props.ref)? props.ref : null} className="footer-outer">

    <div className={(windowDimensions.width >= 850)? "footer-menu" : "footer-menu-mobile"}>
      <div onClick={()=> window.location = "/"} className="logo-container pointer">
        <img src={require('../assets/giftchainlogo.png').default} className="logo" />
      </div>


      <div className={(windowDimensions.width >= 600)? "footer-menu-container-main" : "footer-menu-container-main-mobile"} >
        <MenuButton text="Donate" icon={(windowDimensions.width >= 600)? GiftIcon : null} link={() => window.location = "/#featured-campaigns"} />
        <MenuButton text="Rankings" icon={null} link={() => window.location = "/#rankings"} />
        <MenuButton text="Get Started" icon={null} thumbprint={false} link={() => window.location = "/#about"} />
      </div>
    </div>
    </div>
  )

};
