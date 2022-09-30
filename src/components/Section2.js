import Grid from '@mui/material/Grid';
import CompaignCard from './CompaignCard'

import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";

function Section2(props) {
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

  return (
    <>
  {(campaignListings && campaignListings.length > 0) ?
    <Grid container ref={(props.ref)? props.ref : null} className="section-outer  padding-top-5" >
        <h2 className='text-center w-100 ftext fbold mb-4'>Featured <span className='vTSec1'>Campaigns</span></h2>
        <Grid container pt={4} >
            <Grid item md={12}>
                 <Grid container justifyContent={'space-between'} columnSpacing={10} rowSpacing={5} >
                        <Grid item md={4}>
                            <CompaignCard category={campaignListings[0]['category']} campaign={campaignListings[0]} />
                        </Grid>
                        {
                        (campaignListings.length > 1) ?
                            <Grid item md={4}>
                                <CompaignCard  category={campaignListings[1]['category']} campaign={campaignListings[1]} />
                            </Grid>
                            :
                            null
                        }
                        
                        {
                        (campaignListings.length > 2) ?
                            <Grid item md={4}>
                                <CompaignCard  category={campaignListings[2]['category']} campaign={campaignListings[2]} />
                            </Grid>
                            :
                            null
                        }
                        {
                        (campaignListings.length > 3) ?
                            <Grid item md={4}>
                                <CompaignCard  category={campaignListings[3]['category']} campaign={campaignListings[3]} />
                            </Grid>
                            :
                            null
                        }
                        {
                        (campaignListings.length > 4) ?
                            <Grid item md={4}>
                                <CompaignCard  category={campaignListings[4]['category']} campaign={campaignListings[4]} />
                            </Grid>
                            :
                            null
                        }
                        {
                        (campaignListings.length > 5) ?
                            <Grid item md={4}>
                                <CompaignCard  category={campaignListings[5]['category']} campaign={campaignListings[5]} />
                            </Grid>
                            :
                            null
                        }
                        
                 </Grid>
            </Grid>
        </Grid>
    </Grid>
    : null
   }
  </>
  )
}

export default Section2