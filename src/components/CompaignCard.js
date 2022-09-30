import Grid from '@mui/material/Grid';
import sec2 from '../assets/sec2.png'
import tick from '../assets/Twitter_Verified_Badge.png'
import btnS from '../assets/btnS.png'
// import {Button} from 'react-bootstrap'
import Button from './button.js'
import ProgressBar from 'react-bootstrap/ProgressBar'

import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import NumFormatter from "./numFormatter.js"

function CompaignCard(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain, setShowDonatePopup, setDonateCampaign } = globalContext
  const [hover, setHover] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [showMetricsButton, setShowMetricsButton] = useState(false)
  const [showBio, setShowBio] = useState(false)
  const cookies = new Cookies();

  

  return (
    <div className='featureC p-2'>
        <div className='catD' style={{height:'250px', cursor: 'pointer'}} onClick={() => window.location = `/campaign/${props?.campaign?.slug}`} >
            <img src={`${props?.campaign?.img}`} className='w-100 h-100' style={{objectFit:'cover'}} />
            <span className='CatOnImg ftext'>{props?.campaign?.category}</span>
        </div>
        <Grid container py={1} px={2} justifyContent={'space-between'} alignItems={'center'} className='underCImg'
          onClick={() => window.location = `/campaign/${props?.campaign?.slug}`}
          >
            <Grid item md={3}>
                <p className='m-0 text-white'>{NumFormatter(props?.campaign?.raised, 1)} <img src={btnS} style={{marginTop: '-4px'}} /></p>
            </Grid>
            <Grid item md={8} >
                <ProgressBar>
                    <ProgressBar style={{backgroundColor:'white'}} now={NumFormatter(props?.campaign?.raised, 1)} max={NumFormatter(props?.campaign?.total, 1)} key={1} />
                    <ProgressBar style={{backgroundColor:'#004A99'}} now={NumFormatter(props?.campaign?.total, 1)} max={NumFormatter(props?.campaign?.total, 1)} key={2} />
                </ProgressBar>
            </Grid>
            <Grid item md={1}></Grid>
        </Grid>
        <Grid container>
            <Grid item md={9} style={{cursor: 'pointer'}} onClick={() => window.location = `/charity/${props?.campaign?.charity_slug}`} >
                <div style={{height:'90px',overflow:'hidden'}}><h5 className='sec2CT ftext fbold'>{props?.campaign?.campaign_name}</h5></div>
                <div style={{display:'flex',alignItems:'center',height:'50px',overflow:'hidden'}} > <p className='smTSec1 fbold'>@{props?.campaign?.charity_name} <img height={20} src={tick} /> </p></div>
            </Grid>
            <Grid item md={3} className='itemC'>
                    <p className='smText' >{(props?.campaign?.days_left > 0) ? props?.campaign?.days_left : 0} days left</p>
                    {/* <Button buttonType="Highlight-Blue" className='sec1CBtn ftext w-100 text-center p-1' variant="outline-success" link={() => {setShowDonatePopup(true); setDonateCampaign(props.campaign)}} >Donate</Button> */}
                    <Button text="Donate" icon={null} sClasses={'sec1CBtn ftext w-100 text-center p-1'} buttonType="Highlight-Blue" link={() => {setShowDonatePopup(true); setDonateCampaign(props.campaign)}} />
            </Grid>
        </Grid>
    </div>
  )
}

export default CompaignCard