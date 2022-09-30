import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import Button from './button.js'

import Verified from "../assets/verified.png"
import GraphIcon from "../assets/graph_icon.png"

import AlgoSymbol from "../assets/algo_symbol.png"

export default function RankingListing(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain } = globalContext
  const [hover, setHover] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [showMetricsButton, setShowMetricsButton] = useState(false)
  const cookies = new Cookies();

  //onClick={()=> {setSelctedCampaign(props.campaign['id']); window.location = campaign}}
  //  <p className="p2 gray-foreground">{props.campaign['days_left']} days</p>
  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  function handleHover() {
    setShowMetrics(false)
    setShowMetricsButton(true)
    setHover(true)
  }

  function handleNonHover() {
    setShowMetricsButton(false)
    setShowMetrics(false)
    setHover(false)
  }

  return(

  <div onClick={() =>  window.location = props.redirect_to} onMouseEnter={()=> handleHover()} onMouseLeave={()=> handleNonHover()} className={`${props.col} ${(windowDimensions.width >= 950)? 'rank-listing' : 'rank-listing-mobile'} ${(props.campaign['rank'] <= 3) ? "" : "light-blue-background"} pointer`}>
    <div className="col1 center-center flex-col ">
      <img className="rank-listing-img" src={`${props.campaign['img']}`} />
    </div>
    <div className="col2 horizontal-center flex-col">
      <h6>{props.campaign['title']}</h6>
      <p className="padding-top-2">{nFormatter(props.campaign['raised'], 1)} <img className="algo-symbol-sm" src={AlgoSymbol} /> - Total Raised</p>
    </div>
    <div className="col3 center-center flex-col">
      <div className={`${(props.campaign['rank'] <= 3) ? "rank-circle-green" : "rank-circle-gray"} center-center`}>
        <p className={`${(props.campaign['rank'] <= 3) ? "white-foreground" : ""} center-center`}>{props.campaign['rank']}</p>
      </div>
    </div>


  </div>



  )

};
