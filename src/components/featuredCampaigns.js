import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import Plus from "../assets/plus.png"
import CampaignListing from "./campaignListing.js"

export default function FeaturedCampaigns(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain } = globalContext

  const cookies = new Cookies();
  const [campaignListings, setCampaigns ] = useState([])

  function fetchCampaigns () {
    fetch(`${domain}/fetch-featured-campaigns/`, {
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
    fetchCampaigns()
  }, [])

  useEffect(() => {
    console.log('campaignListings', campaignListings)
  }, [campaignListings])
  

  return(
    <>
  {(campaignListings && campaignListings.length > 0) ?

      <div id="featured-campaigns" ref={(props.ref)? props.ref : null} className="section-outer vertical-center flex-col margin-top-5">
    <h2 className="primary-foreground text-center">Featured Campaigns</h2>

    <div className="margin-top-2 center-center flex-col full-width-null">

      <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2`}>
        <CampaignListing category={campaignListings[0]['category']} campaign={campaignListings[0]} col={(windowDimensions.width >= 950)? "col1": `row1`}/>

        {(campaignListings.length > 1) ?
          <CampaignListing category={campaignListings[1]['category']} campaign={campaignListings[1]} col={(windowDimensions.width >= 950)? "col2": `row2`} />
          :
          null
        }

        {(campaignListings.length > 2) ?
          <CampaignListing category={campaignListings[2]['category']} campaign={campaignListings[2]} col={(windowDimensions.width >= 950)? "col3": `row3`} />
          :
          null
        }
      </div>

      <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2`}>

        {(campaignListings.length > 3) ?
          <CampaignListing category={campaignListings[3]['category']} campaign={campaignListings[3]} col={(windowDimensions.width >= 950)? "col1": `row1`} />
          :
          null
        }


        {(campaignListings.length > 4) ?
          <CampaignListing category={campaignListings[4]['category']} campaign={campaignListings[4]} col={(windowDimensions.width >= 950)? "col2": `row2`} />
          :
          null
        }


        {(campaignListings.length > 5) ?
          <CampaignListing category={campaignListings[5]['category']} campaign={campaignListings[5]} col={(windowDimensions.width >= 950)? "col3": `row3`} />
          :
          null
        }
      </div>

    </div>
    </div>
   : null
   }

  </>



  )

};
