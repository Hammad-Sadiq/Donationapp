import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";

export default function Roadmap(props) {
  const globalContext = useContext(Context);
  const { windowDimensions } = globalContext

  var today = new Date();
  var quarter = Math.floor((today.getMonth() + 3) / 3);

  return(
  <div ref={(props.ref)? props.ref : null} className="section-outer flex-col vertical-center margin-top-5">
    <h2 className="primary-foreground text-center">Product Roadmap</h2>
    <div className="roadmap-line-outer center-center flex-col">

      <div className="roadmap-line" />
      <div className="center-center flex-col">
        <div className={(quarter === 4)? "roadmap-ball" : "roadmap-ball-faded"}/>
      </div>
      <div className="center-center flex-col">
        <div className={(quarter === 1)? "roadmap-ball" : "roadmap-ball-faded"} />
      </div>
      <div className="center-center flex-col">
        <div className={(quarter === 2)? "roadmap-ball" : "roadmap-ball-faded"} />
      </div>
      <div className="center-center flex-col">
        <div className={(quarter === 3)? "roadmap-ball" : "roadmap-ball-faded"} />
      </div>
    </div>

    <div className={`${(windowDimensions.width >= 915)? "roadmap-container-column" : "roadmap-container-row"} `}>
    <div className={`${(windowDimensions.width >= 915)? "col1" : "row1"} roadmap-inner flex-col ${(quarter === 4)? "top-border-green" : "opacity-50 top-border-blue"}`}>
    <div className="row1">
      <h3 className="primary-foreground">Q4 2021</h3>
      <ul>
        <li className="li-2"><p className="primary-foreground">Asalp Launched on MainNet</p></li>
        <li className="li-2"><p className="primary-foreground">Charities can accept donations in crypto and reward donors with Charity NFTs.</p></li>
        <li className="li-2"><p className="primary-foreground">Personal fundraising listings.</p></li>
      </ul>
      </div>
    </div>
    <div className={`${(windowDimensions.width >= 915)? "col2" : "row2"} roadmap-inner flex-col ${(quarter === 1)? "top-border-green" : "opacity-50 top-border-blue"}`}>
    <div className="row1">
      <h3 className="primary-foreground">Q1 2022</h3>
      <ul>
        <li className="li-2"><p className="primary-foreground">Charity NFTs and Art NFTs can be traded on our Marketplace.</p></li>
        <li className="li-2"><p className="primary-foreground">Increased filtering between campaigns and charities.</p></li>
        <li className="li-2"><p className="primary-foreground">Accept USDC</p></li>
        <li className="li-2"><p className="primary-foreground">"Donate an NFT"</p></li>
        <li className="li-2"><p className="primary-foreground">Tax deductible receipts</p></li>
      </ul>
      </div>
    </div>
    <div className={`${(windowDimensions.width >= 915)? "col3" : "row3"} roadmap-inner flex-col ${(quarter === 2)? "top-border-green" : "opacity-50 top-border-blue"}`}>
    <div className="row1">
      <h3 className="primary-foreground">Q2 2022</h3>
      <ul>
        <li className="li-2"><p className="primary-foreground">Defi Games for C-NFTs</p></li>
        <li className="li-2"><p className="primary-foreground">Swapping mechanisms for C-NFTs.</p></li>
        <li className="li-2"><p className="primary-foreground">$ASALP token + staking rewards for C-NFTs.</p></li>
        <li className="li-2"><p className="primary-foreground">Monthly subscription donations in ALGO</p></li>
        <li className="li-2"><p className="primary-foreground">Renting for CNFTs</p></li>
      </ul>
      </div>
    </div>

    <div className={`${(windowDimensions.width >= 915)? "col4" : "row4"} roadmap-inner flex-col ${(quarter === 3)? "top-border-green" : "opacity-50 top-border-blue"}`}>
    <div className="row1">
      <h3 className="primary-foreground">Q3 2022</h3>
      <ul>
        <li className="li-2"><p className="primary-foreground">Further Utility for C-NFTs including access to real life events, exhibitions and physical assets.</p></li>
        <li className="li-2"><p className="primary-foreground">Cross chain donations.</p></li>
        <li className="li-2"><p className="primary-foreground">C-NFT and $ASALP Lotteries.</p></li>
      </ul>
      </div>
    </div>
    </div>
  </div>
  )

};
