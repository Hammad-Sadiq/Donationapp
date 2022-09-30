import React, { useState, useContext, useRef, useEffect } from 'react';
import '../App.css';
import { Context } from "../components/globalContext/globalContext.js";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

import Home from "../assets/home.png";
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Community from '../components/community.js'
import Verified from "../assets/verified.png"
import Twitter from "../assets/twitter.png"
import Instagram from "../assets/instagram.png"
import Internet from "../assets/internet.png"
import Share from "../assets/share.png"
import Close from "../assets/close.png"
import AlgoSymbol from "../assets/algo_symbol.png"
import Plus from "../assets/plus.png"
import DownArrow from "../assets/down_arrow_2.png"

import SocialButton from "../components/socialButton.js"
import Button from '../components/button.js'
import CampaignListing from "../components/campaignListing.js"
import DonatePopup from "../components/donate.js"

import Grid from '@mui/material/Grid';
import profileImg from '../assets/profileImg.png'
import largTick from '../assets/Twitter_Verified_Badge.png'
import camp1 from '../assets/camp1.png'
import camp2 from '../assets/camp2.png'
import camp3 from '../assets/camp3.png'
import camp4 from '../assets/camp4.png'
import CampSection2 from "../components/CampSection2.js"
import NewHeader from '../components/NewHeader';

export default function CharityLandingPage(props) {

  const globalContext = useContext(Context);
  const { windowDimensions, domain, authenticated, setAuthenticated } = globalContext

  const [showBio, setShowBio] = useState(false)

  const [campaignListings, setCampaigns] = useState([])
  const [showing, setShowing] = useState(6)
  const [charityDetails, setCharityDetails] = useState({})

  let params = useParams();

  console.log(params.charitySlug)

  function fetchCharity(slug) {
    fetch(`${domain}/fetch-charity/${slug}`, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data) => {
        setCharityDetails(data.charity)
        console.log(data.charity, "charity");
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
        setCampaigns(data.campaigns)
      })
      .catch((err) => {
        console.log(err);
      });

  }

  useEffect(() => {
    fetchCharity(params.charitySlug)
    fetchCampaigns(params.charitySlug)
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

  const cookies = new Cookies();

  console.log(charityDetails, 'charityDetails')

  return (
    <>
      <NewHeader />
      <Grid container className="section-outer  padding-top-5" >
        <Grid container  >
          <Grid item md={8}  >
            <Grid container spacing={3} >
              <Grid item md={3}  >
                <div className='imgO h-100' >
                  <div className='imgC h-100' >
                    <img src={charityDetails?.charity_profile_img} className='w-100 h-100' />
                  </div>
                </div>
              </Grid>
              <Grid item md={9}  >
                <h2 className='text-left w-100 ftext fbold mb-2'>{charityDetails?.charity_name} <img src={largTick} height={'20'} className='largTick' /></h2>
                <p className='sec1CT ftext '>EIN # : {charityDetails?.ein}</p>
                <p className='sec1CT ftext '>Non-Profit Reg #: {charityDetails?.nonprof_reg}</p>
                <p className='sec1CT ftext '>Country: {charityDetails?.country}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}   >
            <Grid container className='graphC' justifyContent={'space-around'}>
              <div>
                <h2 className='sec2CT ftext text-center'>{nFormatter(charityDetails.raised, 1)}+</h2>
                <p className='smTSec1 ftext fbold text-center'>Algos Raised</p>
              </div>
              <div>
                <h2 className='sec2CT ftext text-center'>{nFormatter(charityDetails.minted, 1)}+</h2>
                <p className='smTSec1 ftext fbold text-center'>C-NFTs  minted</p>
              </div>
              {/* <div>
                        <h2 className='sec2CT ftext text-center'>456</h2>
                        <p className='smTSec1 ftext fbold text-center'>Supporting NFTs</p>
                    </div> */}
            </Grid>
            <Grid container justifyContent={'end'} mt={3}>
              <Grid item md={7}   >
                <Grid container justifyContent={'space-between'} >
                  <a href='#'><img src={camp1} className='CampSicon' /></a>
                  <a href={charityDetails?.website_url}><img src={camp2} className='CampSicon' /></a>
                  <a href={charityDetails?.twitter_url}><img src={camp3} className='CampSicon' /></a>
                  <a href={charityDetails?.instagram_url}><img src={camp4} className='CampSicon' /></a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container mt={3} >
          <div style={{ border: '2px solid #004A99', minHeight: '150px' }} placeholder="Bio" className='graphC px-3 m-0 w-100' >
            <span className='bioText'> {charityDetails.bio}</span>
          </div>
        </Grid>

      </Grid>
      <CampSection2
        Ftitle={'NFTs'}
        Stitle={'Campaigns'}
        Ttitle={'NFTs supporting Charity'}
        FCData={charityDetails.nfts_cat}
        SCData={campaignListings}
        TCData={charityDetails.nfts_cat}
      />
      {/* <div className="charity-landing">
      <Header />
      <DonatePopup /> 
      <div className="flex-col center-center inner-page margin-top-10p">
      <div className={`section-outer flex-col padding-top-2 ${(windowDimensions.width >= 950)? "border-blue campaign-landing-inner" : "campaign-landing-inner-mobile" }  center-center`}>
      <div className={`${(windowDimensions.width >= 950)? "landing-section-main-cols": `landing-section-main-rows`}`}>
      <div className={`${(windowDimensions.width >= 950)? "col1": `row1`} charity-landing-col horizontal-center flex-col`}>

        <div className="flex-row pointer" onClick={()=> window.location = `/charity/${charityDetails.charity_slug}`}>
          <img src={`${charityDetails.charity_profile_img}`} className="campaign-landing-profile-img" />

          <div style={{width: "50%", marginLeft: 20,}}>
            <div className="flex-row margin-left-2 vertical-center">
              <h5 className="primary-foreground">{charityDetails.charity_name}</h5>
              <img className="verified-symbol-2" src={Verified} />
            </div>
            <div className="flex-row vertical-center margin-top-2">
              <SocialButton url={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this charity on asalp!`} img={Share} title="" />
                {(charityDetails.website_url)?
                <SocialButton url={charityDetails.website_url} img={Internet} title="" />
                :
                null}

                {(charityDetails.twitter_url)?
                <SocialButton url={charityDetails.twitter_url} img={Twitter} title="" />
                :
                null}

                {(charityDetails.instagram_url)?
                <SocialButton url={charityDetails.instagram_url} img={Instagram} title="" />
                :
                null}
            </div>
          </div>
        </div>

      </div>

      <div className="row2">
        {(charityDetails.company_reg)? <p className=" primary-foreground">Company Registration #: {charityDetails.company_reg}</p> : null }
        {(charityDetails.nonprof_reg)? <p className=" primary-foreground">Nonprofit Registration #: {charityDetails.nonprof_reg}</p> : null }
        {(charityDetails.ein)? <p className=" primary-foreground">EIN: {charityDetails.ein}</p> : null }
        {(charityDetails.country)? <p className=" primary-foreground">Country: {charityDetails.country}</p> : null }
      </div>

      <div className={`${(windowDimensions.width >= 950)? "col2": `row3`} charity-landing-col horizontal-center flex-col`}>
      <div className="charity-metrics-container">

        <div className="col1 row1 right-metrics-divider center-center flex-col">
          <h3 className="secondary-foreground">{nFormatter(charityDetails.donors, 1)}+</h3>
          <p className="primary-foreground text-center">Number of Donors</p>

        </div>
        <div className="col2 row1 right-metrics-divider center-center flex-col">
          <div className="flex-row">
            <h3 className="primary-foreground">{nFormatter(charityDetails.raised, 1)}+<img className="algo-symbol" src={AlgoSymbol} /></h3>

          </div>

          <p className="primary-foreground text-center">Total Raised</p>

        </div>
        <div className="col3 row1 center-center flex-col">
          <h3 className="quaternary-foreground">{nFormatter(charityDetails.minted, 1)}+</h3>
          <p className="primary-foreground text-center">CNFT's Minted</p>
        </div>

      </div>
      </div>


      </div>

      <h4 className="tertiary-foreground margin-top-5">Campaigns</h4>


      {(campaignListings && campaignListings.length > 0) ?
        <div id="campaigns" className={`margin-top-2 center-center flex-col full-width-null ${(windowDimensions.width >= 950)? "row3": "row4"}`}>
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

          <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2`}>

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
      </div>

      <Footer />
      <Community />
      <p className="text-center padding-top-2 padding-bottom-2">Copyright 2021 ©Asalp. All Rights Reserved</p>
    </div> */}
    </>
  )
};
