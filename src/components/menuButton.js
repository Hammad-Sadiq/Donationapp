import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";

export default function MenuButton(props) {

  const globalContext = useContext(Context);
  const { windowDimensions} = globalContext

  const [thumbOpacity, setThumbOpacity ] = useState(1)

  const buttonType = (props.buttonType)? props.buttonType : "None"

  function buttonTypeSwitch () {
    switch (buttonType) {
      case "None":
      return (
        (props.text) ? <button className={(windowDimensions.width >= 600)? "menu-button" : "menu-button-mobile"} onClick={()=> (props.link) ? props.link() : null}><h6 className="primary-foreground">{props.text}</h6></button> : null
      )
      break;
      case "Thumbprint":
      return (
        <>
        {(props.text) ? <button className={(windowDimensions.width >= 600)? "menu-button" : "menu-button-mobile"} onMouseEnter={()=> setThumbOpacity(.7)} onMouseLeave={()=> setThumbOpacity(1)} onClick={()=> (props.link) ? props.link() : null}><h6 className="primary-foreground">{props.text}</h6></button> : null }
        <div className="thumbprint" onMouseEnter={()=> setThumbOpacity(.7)} onMouseLeave={()=> setThumbOpacity(1)} onClick={()=> (props.link) ? props.link() : null} style={{opacity: thumbOpacity}}/>
        </>
      )
      break;
      case "Highlight-Blue":
      return (
        <>
        {(props.text) ? <button className={(windowDimensions.width >= 600)? "menu-button highlight-blue" : "menu-button-mobile highlight-blue"} onClick={()=> (props.link) ? props.link() : null}><h6>{props.text}</h6></button> : null }
        </>
      )
      break;
      case "Highlight-Green":
      return (
        <>
        {(props.text) ? <button className={(windowDimensions.width >= 600)? "menu-button highlight-green" : "menu-button-mobile highlight-green"} onClick={()=> (props.link) ? props.link() : null}><h6>{props.text}</h6></button> : null }
        </>
      )
      break;
    }

  }

  return(
  <div className={(windowDimensions.width >= 600)? "menu-button-outer" : "menu-button-outer-mobile"}>
  <div className="flex-row center-center">
    {(props.icon)? <img src={props.icon} className="menu-button-icon" /> : null}
    {buttonTypeSwitch()}
  </div>
  </div>
  )

};
