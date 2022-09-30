import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";

export default function SocialButton(props) {

  const globalContext = useContext(Context);
  const { windowDimensions} = globalContext

  return(
    <div onClick={()=> window.open(props.url, '_blank')} className="community-icon-inner-container pointer">
      <div className="community-icon-outer">
        <img src={props.img} className="community-icon" />
      </div>
      <p className={`primary-foreground margin-top-5 ${(windowDimensions.width >= 600)? null : "p2"}`}>{props.title}</p>
    </div>
  )

};
