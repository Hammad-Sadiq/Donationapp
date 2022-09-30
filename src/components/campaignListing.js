import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import Button from './button.js'

import Verified from "../assets/verified.png"
import GraphIcon from "../assets/graph_icon.png"

import AlgoSymbol from "../assets/algo_symbol.png"
import NumFormatter from "./numFormatter.js"
import Close from "../assets/close.png"

export default function CampaignListing(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain, setShowDonatePopup, setDonateCampaign } = globalContext
  const [hover, setHover] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [showMetricsButton, setShowMetricsButton] = useState(false)
  const [showBio, setShowBio] = useState(false)
  const cookies = new Cookies();

  //onClick={()=> {setSelctedCampaign(props.campaign['id']); window.location = campaign}}
  //  <p className="p2 gray-foreground">{props.campaign['days_left']} days</p>


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

  <div onMouseEnter={()=> handleHover()} onMouseLeave={()=> handleNonHover()} className={`${props.col} ${(windowDimensions.width >= 950)? 'campaign-listing' : 'campaign-listing-mobile'}`}>
    <div onClick={() => window.location = `/campaign/${props.campaign['slug']}`} className={`pointer ${props.col} ${(windowDimensions.width >= 950)? 'campaign-listing-click' : 'campaign-listing-click-mobile'}`} />
    <img className="campaign-listing-img" src={`${props.campaign['img']}`} />

    {(hover)?
      null
      :
      <div className="meter-bar-absolute-container">
      <div className="flex-row vertical-center">
      <h6 className="white-foreground"><b>{NumFormatter(props.campaign['raised'], 1)}</b> of <b>{NumFormatter(props.campaign['total'], 1)}</b>  </h6>
      <img className="algo-symbol-sm-white" src={AlgoSymbol} />
      <h6 className="white-foreground">raised</h6>
      </div>
        <div className="meter-bar-front-container margin-top-10p">
          <div style={{height: "100%", borderRadius: 2, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#004A99", width: `${((props.campaign['raised'] / props.campaign['total']) * 100 > 100) ? "100%" : (props.campaign['raised'] / props.campaign['total']) * 100}%`}} />
        </div>
      </div>
    }

    {(hover)?

      (showBio)?

      <div className="campaign-hover-bio">
      <div className="bio-outer-container center-center flex">
      <div onClick={()=> setShowBio(false)} className="close-button flex center-center pointer">
        <img src={Close} className="close-icon" />
      </div>
      <div className="bio-inner-container">
      <div className="bio-title-container flex-col horizontal-center margin-top-5">
        <h4 className="primary-foreground no-overflow">{`${props.campaign['campaign_name']}...`.substring(`${props.campaign['campaign_name']}...`.length - 52)}</h4>
        <h6 className="primary-foreground secondary-font margin-top-10p bold">{props.campaign['category']}</h6>

      </div>
        <div className={(windowDimensions.width >= 950)? "listing-bio-description" : "listing-bio-description-mobile"}>
          {props.campaign['description'].split(/[\r\n]/).map((val, ind) => {
            return(
              <p className="primary-foreground padding-top-2">{val}</p>
            )
          })}
        </div>
      </div>
      </div>
      </div>
      :
      <>
      {(showMetricsButton) ?
      <img className="graph-icon pointer" src={GraphIcon} onClick={()=> {setShowMetrics(!showMetrics); setShowMetricsButton(!showMetricsButton)}}/>
      :
       null
      }


      <div className="campaign-hover">

    <div className="campaign-listing-inner flex-col horizontal-center">
      <h5 className="primary-foreground">{props.campaign['title']}</h5>
      <div className="flex-row vertical-center pointer zindex-5" onClick={() => window.location = `/charity/${props.campaign['charity_slug']}`}>
        <h6>@{props.campaign['charity_name']}</h6>
        <img className="verified-symbol" src={Verified} />
      </div>

      <h6 className="primary-foreground vertical-center padding-top-5"><b>{NumFormatter(props.campaign['raised'], 1)}</b> of <b>{NumFormatter(props.campaign['total'], 1)}</b> <img className="algo-symbol-sm" src={AlgoSymbol} /> raised</h6>
      <div className="meter-bar-container margin-top-2">
        <div style={{height: "100%", borderRadius: 5, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#004A99", width: `${((props.campaign['raised'] / props.campaign['total']) * 100 > 100) ? "100%" : (props.campaign['raised'] / props.campaign['total']) * 100}%`}} />
      </div>

      <div className="flex-row margin-top-2">
        {/* <Button text="Bio" icon={null} buttonType="White-Blue" link={() => setShowBio(true)} /> */}
        <Button text="Donate" icon={null} buttonType="Highlight-Blue" link={() => {setShowDonatePopup(true); setDonateCampaign(props.campaign)}} />
      </div>

    </div>
    </div>
    </>

    :
    null
    }

  {(showMetrics && !(showBio)) ?
    <div className="listing-metrics-mini">
    <div className="col1 row1 right-metrics-divider center-center flex-col">
      <h3 className="secondary-foreground">{(props.campaign['days_left'] > 0) ? props.campaign['days_left'] : 0}</h3>
      <p className="primary-foreground p2 text-center">Days Left</p>

    </div>
    <div className="col2 row1 right-metrics-divider center-center flex-col">
      <div className="flex-row">
        <h3 className="primary-foreground">{NumFormatter(props.campaign['minted'], 1)}</h3>
      </div>

      <p className="primary-foreground p2 text-center">CNFTs Minted</p>

    </div>
    <div className="col3 row1 center-center flex-col">
      <h3 className="quaternary-foreground">{(props.campaign['rank'] && props.campaign['rank'] > 0) ? ((props.campaign['rank'] <= 500) ? props.campaign['rank'] : "500+") : "500+"}</h3>
      <p className="primary-foreground p2 text-center">Rank</p>
    </div>

    </div>

  :
  (hover && !(showBio))?
  <div className="category-header">
    <p className="p3 no-wrap white-foreground text-center">{props.campaign['category']}</p>
  </div>
  :
  null
  }

  </div>



  )

};
