import React, { useState, useContext, useEffect } from 'react';
import Animation from "../assets/animate.gif"
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import MenuButton from './menuButton.js'

import AlgoSymbol from "../assets/algo_symbol.png"


export default function Hero(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain, metrics, setMetrics } = globalContext
  const cookies = new Cookies();

  function getRankings()  {
    fetch(`${domain}/rankings/`, {
    method: 'GET',
    headers: {
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("RANKINGS", data.rankings)
      setMetrics(data.rankings)

    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(()=> {
    getRankings()
  }, [])

  return(
  <div ref={(props.propsRef)? props.propsRef : null} className="section-outer grid-2-col padding-top-5">

    <div className={`${(windowDimensions.width >= 800)? "col1" : "row2"} center-center block`}>
      <h1 className="primary-foreground">Decentralised Donating,</h1>
      <h1 className="primary-foreground">only on <font className="tertiary-foreground">asalp.</font></h1>
      <ul className="topmarg1">
        <li><h5 className="primary-foreground">Support social causes + climate with ALGO.</h5></li>
        <li><h5 className="primary-foreground">Donors are rewarded with Charity NFTs.</h5></li>
        <li><h5 className="primary-foreground">Show active participation in philanthropy with C-NFTs.</h5></li>
      </ul>

      <div className={`flex-row ${(windowDimensions.width >= 800)? null : "horizontal-center"}`}>
        <MenuButton text="Charity Sign Up" icon={null} buttonType="Highlight-Blue" link={()=> window.location = "/signup"} />
        <div style={{paddingLeft: 20}}>
          <MenuButton text="Community" icon={null} buttonType="Highlight-Green" link={()=> window.location = "/#community"} />
        </div>
      </div>

      <div className="hero-metrics-container topmarg2">

        <div className="col1 row1 right-metrics-divider center-center flex-col">
          <h3 className="secondary-foreground">{metrics['donors']}+</h3>
          <p className="primary-foreground text-center">Number of Donors</p>

        </div>
        <div className="col2 row1 right-metrics-divider center-center flex-col">
          <div className="flex-row">
            <h3 className="primary-foreground">{(metrics['raised'])? metrics['raised'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}+<img className="algo-symbol" src={AlgoSymbol} /></h3>

          </div>

          <p className="primary-foreground text-center">Total Raised</p>

        </div>
        <div className="col3 row1 center-center flex-col">
          <h3 className="quaternary-foreground">{metrics['minted']}+</h3>
          <p className="primary-foreground text-center">CNFT's Minted</p>
        </div>

      </div>

  </div>

    <div className={`${(windowDimensions.width >= 915)? "col2" : "row1"} horizontal-center flex`}>
      <img className={(windowDimensions.width >= 915)? "hero-animate-norm" : "hero-animate-mobile"} src={Animation} />
    </div>


  </div>
  )

};
