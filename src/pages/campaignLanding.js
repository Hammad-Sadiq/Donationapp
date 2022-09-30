import React, { useState, useContext, useRef, useEffect } from 'react';
import '../App.css';
import { Context } from "../components/globalContext/globalContext.js";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

// import Home from "../assets/home.png";
// import Header from '../components/header.js'
import NewHeader from '../components/NewHeader.js'
import CampSection1 from '../components/CampSection1.js'
import CampSection2 from '../components/CampSection2.js'


// import Footer from '../components/footer.js'
// import Community from '../components/community.js'
// import Verified from "../assets/verified.png"
// import Twitter from "../assets/twitter.png"
// import Instagram from "../assets/instagram.png"
// import Internet from "../assets/internet.png"
// import Share from "../assets/share.png"
// import Close from "../assets/close.png"
// import AlgoSymbol from "../assets/algo_symbol.png"
// import Plus from "../assets/plus.png"
// import DownArrow from "../assets/down_arrow_2.png"

// import SocialButton from "../components/socialButton.js"
// import Button from '../components/button.js'
// import CampaignListing from "../components/campaignListing.js"
// import DonatePopup from "../components/donate.js"

export default function CampaignLandingPage(props) {
  const cookies = new Cookies();

  const globalContext = useContext(Context);
  const { windowDimensions, domain, authenticated, setAuthenticated, setShowDonatePopup, setDonateCampaign } = globalContext

  // const [showBio, setShowBio] = useState(false)

  const [campaignListings, setCampaigns] = useState([])
  // const [showing, setShowing] = useState(6)
  const [campaignDetails, setCampaignDetails] = useState({})

  let params = useParams();

  function fetchCampaign(slug) {
    fetch(`${domain}/fetch-campaign/${slug}`, {
    method: 'GET',
    headers: {
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        setCampaignDetails(data.campaign)
        console.log('yoyok details:',data.campaign)
        fetchCampaigns(data.campaign.charity_slug)
      }

    })
      .then((res) => res.json())
      .then((data) => {
        setCampaignDetails(data.campaign)
        console.log('yoyok details:', data.campaign)
        fetchCampaigns(data.campaign.charity_slug)
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function fetchCampaigns(charity_slug) {
    fetch(`${domain}/fetch-organization-campaigns/${charity_slug}`, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        setCampaigns(data.campaigns)
        console.log('yoyok:',data.campaigns)
      }

    })
    .catch((err) => {
      console.log(err);
    });

  }

  useEffect(() => {
    console.log(params.campaignSlug, 'slug')
    fetchCampaign(params.campaignSlug)
  }, [])

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
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  return (
    <div className="campaign-landing">
      <NewHeader />
      <CampSection1 campaignDetails={campaignDetails} campaign={campaignDetails} />
      <CampSection2
        Ftitle={'From Category'}
        Stitle={'Campaigns'}
        Ttitle={'NFT’s Supporting Cause'}
        FCData={campaignDetails?.same_category_objs}
        SCData={campaignListings}
        TCData={campaignDetails?.same_cause_1}
      />
      {/* {console.log('campaignDetails', campaignDetails)} */}
      {/* <Header /> */}
      {/* <DonatePopup /> */}
      {/* <div className="flex-col center-center inner-page">

    {(windowDimensions.width >= 950) ?
      <>
    <div className={`section-outer flex-col padding-top-2 campaign-landing-inner center-center ${(windowDimensions.width >= 950) ? "border-blue" : null}`}>
    <div className="landing-section-main-cols">
    <div className={`col1 ${(windowDimensions.width >= 1200)? "charity-info": `charity-info-full`}`}>
      <img src={`${campaignDetails.charity_profile_img}`} className="campaign-landing-profile-img margin-top-5" />
      <h3 className="primary-foreground">{campaignDetails.campaign_name}</h3>
      <div className="flex-row vertical-center margin-top-15 pointer" onClick={()=> window.location = `/charity/${campaignDetails.charity_slug}`}>
        <h6>@{campaignDetails.charity_name}</h6>
        <img className="verified-symbol" src={Verified} />
      </div>

      <div className="category-header-2 margin-top-5">
        <p className="white-foreground text-center">{campaignDetails.category}</p>
      </div>

      <div className="flex-row vertical-center margin-top-10">
        <SocialButton url={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this campaign on asalp!`} img={Share} title="" />
        {(campaignDetails.website_url)?
        <SocialButton url={campaignDetails.website_url} img={Internet} title="" />
        :
        null}

        {(campaignDetails.twitter_url)?
        <SocialButton url={campaignDetails.twitter_url} img={Twitter} title="" />
        :
        null}

        {(campaignDetails.instagram_url)?
        <SocialButton url={campaignDetails.instagram_url} img={Instagram} title="" />
        :
        null}

      </div>
      <div>
        {(campaignDetails.company_reg)? <p className=" primary-foreground">Company Registration #: {campaignDetails.company_reg}</p> : null }
        {(campaignDetails.nonprof_reg)? <p className=" primary-foreground">Nonprofit Registration #: {campaignDetails.nonprof_reg}</p> : null }
        {(campaignDetails.ein)? <p className=" primary-foreground">EIN: {campaignDetails.ein}</p> : null }
        {(campaignDetails.country)? <p className=" primary-foreground">Country: {campaignDetails.country}</p> : null }
      </div>
    </div>

    <div className="col2 campaign-info">
    {(showBio) ?

      <div className="bio-outer-container center-center flex">
      <div onClick={()=> setShowBio(false)} className="close-button flex center-center pointer">
        <img src={Close} className="close-icon" />
      </div>
      <div className="bio-inner-container">
      <div className="bio-title-container flex-col horizontal-center">
        <h4 className="primary-foreground">{campaignDetails.campaign_name}</h4>
        <h6 className="primary-foreground secondary-font margin-top-5 bold">{campaignDetails.category}</h6>

      </div>
        <div className="bio-description">
          {campaignDetails.description.split(/[\r\n]/).map((val, ind) => {
            return(
              <p className="primary-foreground padding-top-2">{val}</p>
            )
          })}
        </div>
      </div>
      </div>
      :
      <>
      <img src={`${campaignDetails.img}`} className="campaign-info-img" />
      <div className="rank-header">
        <p className="white-foreground text-center bold">#{(campaignDetails['rank'] && campaignDetails['rank'] > 0) ? ((campaignDetails['rank'] <= 500) ? campaignDetails['rank'] : "500+") : "500+"}</p>
      </div>
      <div className="bio-button-container">
        <Button text="Bio" icon={null} buttonType="Highlight-Blue" link={() => setShowBio(true)} />
      </div>
      </>
    }
    </div>

    <div className={`${(windowDimensions.width >= 950)? "col3": `row3`} ${(windowDimensions.width >= 1200)? "metrics-info": `metrics-info-full`} center-center flex`}>
      <div className={`${(windowDimensions.width >= 1200)? "metric-info-inner": "metric-info-inner-mobile"} flex-col vertical-center`}>
        <button className="button highlight-primary" onClick={()=> { setDonateCampaign(campaignDetails); setShowDonatePopup(true)}}><h6>Donate</h6></button>

        <div className="meter-container center-center flex-col">
        <h6 className="primary-foreground vertical-center padding-top-5"><b>{nFormatter(campaignDetails.raised, 1)}</b> of <b>{nFormatter(campaignDetails.total, 1)}</b> <img className="algo-symbol-sm" src={AlgoSymbol} /> raised</h6>
        <div className="meter-bar-container margin-top-2">
          <div className="meter-bar-inner" style={{width: `${((campaignDetails.raised / campaignDetails.total) * 100 > 100) ? "100%" : (campaignDetails.raised / campaignDetails.total) * 100}%`}} />
        </div>
        </div>

        <h4 className="primary-foreground margin-top-10 text-center">{campaignDetails.category}</h4>
        <p className="primary-foreground margin-top text-center">Category</p>


        <h4 className="secondary-foreground margin-top-10 text-center">{(campaignDetails.days_left >= 0)? campaignDetails.days_left : 0}</h4>
        <p className="primary-foreground margin-top text-center">Days Left</p>


        <h4 className="primary-foreground margin-top-10 text-center">{nFormatter(campaignDetails.raised, 1)}</h4>
        <p className="primary-foreground margin-top text-center">Amount Raised</p>


        <h4 className="quaternary-foreground margin-top-10 text-center">{nFormatter(campaignDetails.minted, 1)}</h4>
        <p className="primary-foreground margin-top text-center">CNFT's Minted</p>

      </div>
    </div>


    </div>

    <div className={`flex-row center-center margin-top-10 pointer ${(windowDimensions.width >= 950)? "row3": "row5"}`} onClick={()=> window.location = "#campaigns"}>
      <img className="plus-icon" src={DownArrow} />
      <h4 className="tertiary-foreground"><u>See More By {campaignDetails.charity_name}</u></h4>
    </div>

    {(campaignListings && campaignListings.length > 0) ?
      <div id="campaigns" className={`margin-top-5 center-center flex-col full-width-null ${(windowDimensions.width >= 950)? "row4": "row5"}`}>
      { campaignListings.map((campaign, ind) => {
        console.log(showing, campaignListings.length)
      if (ind >= showing || ind % 6 !== 0) {
        return(<></>)
      }

      return (
        <>
        <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2 full-width-null`}>
          <CampaignListing category={campaign["category"]} campaign={campaign} col={(windowDimensions.width >= 950)? "col1": `row${ind+1}`}/>

          {(campaignListings.length > ind+1) ?
            <CampaignListing category={campaignListings[ind+1]["category"]} campaign={campaignListings[ind+1]} col={(windowDimensions.width >= 950)? "col2": `row${ind+2}`} />
            :
            null
          }

          {(campaignListings.length > ind+2) ?
            <CampaignListing category={campaignListings[ind+2]["category"]} campaign={campaignListings[ind+2]} col={(windowDimensions.width >= 950)? "col3": `row${ind+3}`} />
            :
            null
          }
        </div>

        <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2 full-width-null`}>

          {(campaignListings.length > ind+3) ?
            <CampaignListing category={campaignListings[ind+3]["category"]} campaign={campaignListings[ind+3]} col={(windowDimensions.width >= 950)? "col1": `row${ind+1}`} />
            :
            null
          }


          {(campaignListings.length > ind+4) ?
            <CampaignListing category={campaignListings[ind+4]["category"]} campaign={campaignListings[ind+4]} col={(windowDimensions.width >= 950)? "col2": `row${ind+2}`} />
            :
            null
          }


          {(campaignListings.length > ind+5) ?
            <CampaignListing category={campaignListings[ind+5]['category']} campaign={campaignListings[ind+5]} col={(windowDimensions.width >= 950)? "col3": `row${ind+3}`} />
            :
            null
          }
        </div>
        </>
      )

      }) }
      </div>
     : null}
     </div>

    {(showing < campaignListings.length)?
    <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={()=> setShowing(showing + 6)}><img className="plus-icon" src={Plus} />See More</h5>
    :
    (campaignListings.length > 6)?
    <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={()=> setShowing(6)}>Hide</h5>
    :
    null
    }
    </>




      :




      <>
      <div className="margin-top-2 full-width-null">
      <Button text="Donate" fullWidth={true} icon={null} buttonType="Highlight-Blue" link={()=> {setShowDonatePopup(true); setDonateCampaign(campaignDetails)}} />
     </div>
    <div className={`section-outer flex-col padding-top-2 campaign-landing-inner-mobile center-center ${(windowDimensions.width >= 950) ? "border-blue" : null}`}>
    <div className="landing-section-main-rows">

    <div className="row1 campaign-info">
    {(showBio) ?

      <div className="bio-outer-container center-center flex">
      <div onClick={()=> setShowBio(false)} className="close-button flex center-center pointer">
        <img src={Close} className="close-icon" />
      </div>
      <div className="bio-inner-container">
      <div className="bio-title-container flex-col horizontal-center">
        <h4 className="primary-foreground">{campaignDetails.campaign_name}</h4>
        <h6 className="primary-foreground secondary-font margin-top-5 bold">{campaignDetails.category}</h6>

      </div>
        <div className="bio-description">
          {campaignDetails.description.split("/").map((val, ind) => {
            return(
              <p className="primary-foreground padding-top-2">{val}</p>
            )
          })}
        </div>
      </div>
      </div>
      :
      <>
      <img src={`${campaignDetails.img}`} className="campaign-info-img" />
      <div className="rank-header">
        <p className="white-foreground text-center bold">#{(campaignDetails['rank'] && campaignDetails['rank'] > 0) ? ((campaignDetails['rank'] <= 500) ? campaignDetails['rank'] : "500+") : "500+"}</p>
      </div>
      <div className="bio-button-container">
        <Button text="Bio" icon={null} buttonType="Highlight-Blue" link={() => setShowBio(true)} />
      </div>
      </>
    }
    </div>

    <div className="row2 charity-info-full-mobile">
      <div className="flex-row vertical-center">
        <img src={`${campaignDetails.charity_profile_img}`} className="campaign-landing-profile-img margin-top-5" />
        <div className="margin-left-5">
          <h3 className="primary-foreground">{campaignDetails.campaign_name}</h3>
          <div className="flex-row vertical-center pointer" onClick={()=> window.location = `/charity/${campaignDetails.charity_slug}`}>
            <h6>@{campaignDetails.charity_name}</h6>
            <img className="verified-symbol" src={Verified} />
          </div>
          <div className="flex-row vertical-center margin-top-5">
            <SocialButton url={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this campaign on asalp!`} img={Share} title="" />
            {(campaignDetails.website_url)?
            <SocialButton url={campaignDetails.website_url} img={Internet} title="" />
            :
            null}

            {(campaignDetails.twitter_url)?
            <SocialButton url={campaignDetails.twitter_url} img={Twitter} title="" />
            :
            null}

            {(campaignDetails.instagram_url)?
            <SocialButton url={campaignDetails.instagram_url} img={Instagram} title="" />
            :
            null}

          </div>
          <div>
            {(campaignDetails.company_reg)? <p className=" primary-foreground">Company Registration #: {campaignDetails.company_reg}</p> : null }
            {(campaignDetails.nonprof_reg)? <p className=" primary-foreground">Nonprofit Registration #: {campaignDetails.nonprof_reg}</p> : null }
            {(campaignDetails.ein)? <p className=" primary-foreground">EIN: {campaignDetails.ein}</p> : null }
            {(campaignDetails.country)? <p className=" primary-foreground">Country: {campaignDetails.country}</p> : null }
          </div>
        </div>
      </div>


      <div className="category-header-2 margin-top-5">
        <p className="white-foreground text-center">{campaignDetails.category}</p>
      </div>


    </div>


    <div className="row3 metrics-info-full center-center flex">
      <div className="metric-info-inner flex-col vertical-center">
        <button className="button highlight-primary" onClick={()=> {setShowDonatePopup(true); setDonateCampaign(campaignDetails)}}><h6>Donate</h6></button>

        <div className="meter-container center-center flex-col">
        <h6 className="primary-foreground vertical-center padding-top-5"><b>{nFormatter(campaignDetails.raised, 1)}</b> of <b>{nFormatter(campaignDetails.total, 1)}</b> <img className="algo-symbol-sm" src={AlgoSymbol} /> raised</h6>
        <div className="meter-bar-container margin-top-2">
          <div className="meter-bar-inner" style={{width: `${((campaignDetails.raised / campaignDetails.total) * 100 > 100) ? "100%" : (campaignDetails.raised / campaignDetails.total) * 100}%`}} />
        </div>
        </div>

        <h4 className="primary-foreground margin-top-10 text-center">{campaignDetails.category}</h4>
        <p className="primary-foreground margin-top text-center">Category</p>


        <h4 className="secondary-foreground margin-top-10 text-center">{(campaignDetails.days_left >= 0)? campaignDetails.days_left : 0}</h4>
        <p className="primary-foreground margin-top text-center">Days Left</p>


        <h4 className="primary-foreground margin-top-10 text-center">{nFormatter(campaignDetails.raised, 1)}</h4>
        <p className="primary-foreground margin-top text-center">Amount Raised</p>


        <h4 className="quaternary-foreground margin-top-10 text-center">{nFormatter(campaignDetails.minted, 1)}</h4>
        <p className="primary-foreground margin-top text-center">CNFT's Minted</p>

      </div>
    </div>


    </div>



    <div className={`flex-row center-center margin-top-10 pointer ${(windowDimensions.width >= 950)? "row2": "row4"}`} onClick={()=> window.location = "#campaigns"}>
      <img className="plus-icon" src={DownArrow} />
      <h4 className="tertiary-foreground"><u>See More By {campaignDetails.charity_name}</u></h4>
    </div>

    {(campaignListings && campaignListings.length > 0) ?
      <div id="campaigns" className={`margin-top-5 center-center flex-col ${(windowDimensions.width >= 950)? "row3": "row4"}`}>
      { campaignListings.map((campaign, ind) => {
        console.log(showing, campaignListings.length)
      if (ind >= showing || ind % 6 !== 0) {
        return(<></>)
      }

      return (
        <>
        <div className="campaign-row vertical-center flex-col margin-top-2">
          <CampaignListing category={campaign["category"]} campaign={campaign} col={`row${ind+1}`}/>

          {(campaignListings.length > ind+1) ?
            <CampaignListing category={campaignListings[ind+1]["category"]} campaign={campaignListings[ind+1]} col={`row${ind+2}`} />
            :
            null
          }

          {(campaignListings.length > ind+2) ?
            <CampaignListing category={campaignListings[ind+2]["category"]} campaign={campaignListings[ind+2]} col={`row${ind+3}`} />
            :
            null
          }
        </div>

        <div className="campaign-row vertical-center flex-col margin-top-2">

          {(campaignListings.length > ind+3) ?
            <CampaignListing category={campaignListings[ind+3]["category"]} campaign={campaignListings[ind+3]} col={`row${ind+1}`} />
            :
            null
          }


          {(campaignListings.length > ind+4) ?
            <CampaignListing category={campaignListings[ind+4]["category"]} campaign={campaignListings[ind+4]} col={`row${ind+2}`} />
            :
            null
          }


          {(campaignListings.length > ind+5) ?
            <CampaignListing category={campaignListings[ind+5]['category']} campaign={campaignListings[ind+5]} col={`row${ind+3}`} />
            :
            null
          }
        </div>
        </>
      )

      }) }
      </div>
     : null}
     </div>

    {(showing < campaignListings.length)?
    <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={()=> setShowing(showing + 6)}><img className="plus-icon" src={Plus} />See More</h5>
    :
    (campaignListings.length > 6)?
    <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={()=> setShowing(6)}>Hide</h5>
    :
    null
    }
    </>
    }

    </div>
    <Footer />
    <Community />
    <p className="text-center padding-top-2 padding-bottom-2">Copyright 2021 ©Asalp. All Rights Reserved</p>  */}

    </div>

  )
};
