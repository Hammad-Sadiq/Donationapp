import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Arrow from "../assets/next.png"
import Algorand from "../assets/algorand.png"

export default function Sponsored(props) {
  const globalContext = useContext(Context);
  const { windowDimensions } = globalContext

  return(
  <div ref={(props.propsRef)? props.propsRef : null} className="section-outer-short horizontal-center flex">
    <div className={`${(windowDimensions.width >= 915)? "sponsored-outer" : "sponsored-outer-mobile"}`}>
      <div className="col1 flex-col center-center">
      <div className="sponsored-inner">
      <h6>Grant Recipient of</h6>
      <a href="https://algorand.foundation/news/asalp-grant-award" className="padding-top-5 link">Visit website<img src={Arrow} className="arrow"/></a>
      </div>
      </div>

      <div className="col2 flex-col center-center">
        <img src={Algorand} className="algorand-logo" />
      </div>
    </div>

  </div>
  )

};
