import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Verified from "../assets/verify.png"
import Deposit from "../assets/deposit.png"
import Campaign from "../assets/campaign.png"

import Artboard1 from "../assets/Artboard1.png"
import Artboard2 from "../assets/Artboard2.png"
import Artboard3 from "../assets/Artboard3.png"
import Artboard4 from "../assets/Artboard4.png"
import Artboard5 from "../assets/Artboard5.png"
import Artboard6 from "../assets/Artboard6.png"

export default function GetStarted(props) {
  const globalContext = useContext(Context);
  const { windowDimensions } = globalContext

  return(
  <div ref={(props.propsRef)? props.propsRef : null} className="section-outer margin-top-5" id="about">

  <h2 className="primary-foreground text-center">How To Get Started</h2>
  <div className={`${(windowDimensions.width >= 915)? "getting-started-container-main margin-top-5" : ""} `}>

  <div className={`${(windowDimensions.width >= 915)? "getting-started-container-column margin-top-5 row1" : "getting-started-container-row margin-top-5"} `}>
  <div className={`${(windowDimensions.width >= 915)? "col1 vertical-center get-started-inner" : "row1 horizontal-center get-started-inner-mobile"} flex-col`}>
    <img src={Artboard1} className={`${(windowDimensions.width >= 915)? "get-started-graphic" : "get-started-graphic-mobile"} `} />
    <h6 className="primary-foreground margin-top-2">Step 1.</h6>
    <p className="margin-top-2">Firstly, do not let blockchain confuse you!</p>
    <p className="margin-top-2">Our platform will handle everything and all we need from you is to create an Algorand Wallet Address ( Step 2 & 3) and then upload a campaign. </p>
    <p className="margin-top-2"><strong>Sign up</strong> including all your charity’s info and social accounts!</p>
  </div>
  <div className={`${(windowDimensions.width >= 915)? "col2 vertical-center get-started-inner" : "row2 horizontal-center get-started-inner-mobile"} flex-col`}>
    <img src={Artboard2} className={`${(windowDimensions.width >= 915)? "get-started-graphic" : "get-started-graphic-mobile"} `} />
    <h6 className="primary-foreground margin-top-2">Step 2.</h6>
    <p className="margin-top-2">Create an <strong><u>Algorand wallet address</u></strong> either by:</p>
    <p>A) Downloading the “<a href="https://apps.apple.com/us/app/algorand-wallet/id1459898525">Alogrand Wallet App</a>” on an app store; </p>
    <p>B) Installing the “<a href="https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm">Algosigner</a>” Google Chrome extension’</p>
    <p>C) Go to “<a href="https://wallet.myalgo.com/">MyAlgo</a>” website and press “new wallet”.</p>
    <p>Keep the secret 25 word phrase you are given a secret and safe.</p>
  </div>
  <div className={`${(windowDimensions.width >= 915)? "col3 vertical-center get-started-inner" : "row3 horizontal-center get-started-inner-mobile"} flex-col`}>
    <img src={Artboard3} className={`${(windowDimensions.width >= 915)? "get-started-graphic" : "get-started-graphic-mobile"} `} />
    <h6 className="primary-foreground margin-top-2">Step 3.</h6>
    <p className="margin-top-2">Alternatively you can get an Algorand Wallet address by generating one from your crypto exchange.</p>
    <p>{`Create an account with a crypto exchange by following the instructions on their page; then search for “ALGO” in “balances” and press “deposit”, this will generate an ALGO address.`}</p>
  </div>

  </div>

  <div className={`${(windowDimensions.width >= 915)? "getting-started-container-column margin-top-5 row2" : "getting-started-container-row margin-top-5"} `}>
  <div className={`${(windowDimensions.width >= 915)? "col1 vertical-center get-started-inner" : "row1 horizontal-center get-started-inner-mobile"} flex-col`}>
    <img src={Artboard4} className={`${(windowDimensions.width >= 915)? "get-started-graphic" : "get-started-graphic-mobile"} `} />
    <h6 className="primary-foreground margin-top-2">Step 4.</h6>
    <p className="margin-top-2">When launching a campaign please make sure to use a portrait, high resolution display image for all your campaigns.</p>
    <p className="margin-top-2">Each campaign can have a different picture.</p>
  </div>
  <div className={`${(windowDimensions.width >= 915)? "col2 vertical-center get-started-inner" : "row2 horizontal-center get-started-inner-mobile"} flex-col`}>
    <img src={Artboard5} className={`${(windowDimensions.width >= 915)? "get-started-graphic" : "get-started-graphic-mobile"} `} />
    <h6 className="primary-foreground margin-top-2">Step 5.</h6>
    <p className="margin-top-2">Inform your followers and supporters that you are accepting donations in cryptocurrency and they can be rewarded with tradable Charity NFTs, only on <strong>asalp.</strong></p>
  </div>
  <div className={`${(windowDimensions.width >= 915)? "col3 vertical-center get-started-inner" : "row3 horizontal-center get-started-inner-mobile"} flex-col`}>
    <img src={Artboard6} className={`${(windowDimensions.width >= 915)? "get-started-graphic" : "get-started-graphic-mobile"} `} />
    <h6 className="primary-foreground margin-top-2">Step 6.</h6>
    <p className="margin-top-2">We do the rest!</p>
    <p>We <strong>never</strong> have access to your funds!</p>
    <p>Please keep safe all information related to your account!</p>
  </div>

  </div>
  </div>
  </div>
  )

};
