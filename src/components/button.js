import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";
import { Button as BootBtn } from 'react-bootstrap'

export default function Button(props) {

  const styleClass = props?.sClasses?.length > 0 ? props?.sClasses : 'button highlight-primary'
  console.log('props', props);
  const globalContext = useContext(Context);
  const { windowDimensions} = globalContext

  const [thumbOpacity, setThumbOpacity ] = useState(1)

  const buttonType = (props.buttonType)? props.buttonType : "None"

  console.log("Disabled")
  console.log(props.disabled)
  console.log(props.disabled !== null)
  function buttonTypeSwitch () {
    switch (buttonType) {
      case "Highlight-Blue":
      return (
        <>
        {/* {(props.text) ? <button disabled={(props.disabled !== null)? props.disabled : false} className={`${(windowDimensions.width >= 600)? "button highlight-primary" : "button-mobile highlight-primary"} ${(props.disabled !== null && props.disabled == true)? "no-pointer" : ''}`} onClick={()=> (props.link) ? props.link() : null}><h6>{props.text}</h6></button> : null } */}
        {(props.text) ? <BootBtn disabled={(props.disabled !== null)? props.disabled : false} className={`${(windowDimensions.width >= 600)? styleClass : styleClass } ${(props.disabled !== null && props.disabled == true)? "no-pointer" : ''}`} onClick={()=> (props.link) ? props.link() : null}><h6 className='popinss'>{props.text}</h6></BootBtn> : null }
        </>
      )
      break;
      case "Highlight-Green":
      return (
        <>
        {(props.text) ? <button disabled={(props.disabled !== null)? props.disabled : false} className={`${(windowDimensions.width >= 600)? "button highlight-green" : "button-mobile highlight-green"} ${(props.disabled !== null && props.disabled == true)? "no-pointer" : ''}`} onClick={()=> (props.link) ? props.link() : null}><h6>{props.text}</h6></button> : null }
        </>
      )
      break;
      case "White-Blue":
      return (
        <>
        {(props.text) ? <button disabled={(props.disabled !== null)? props.disabled : false} className={`${(windowDimensions.width >= 600)? "button border-primary" : "button-mobile border-primary"} ${(props.disabled !== null && props.disabled == true)? "no-pointer" : ''}`} onClick={()=> (props.link) ? props.link() : null}><h6>{props.text}</h6></button> : null }
        </>
      )
      break;
    }

  }

  console.log(windowDimensions.width >= 600)
  return(
  <div 
  className={`${(props.fullWidth)? "full-width-button-outer" : "button-outer"}`}
  >
    {buttonTypeSwitch()}
  </div>
  )

};
