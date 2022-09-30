import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Grid from '@mui/material/Grid';
import compImg from '../assets/compImg.png'
import smTick from '../assets/Twitter_Verified_Badge.png'
import CustomModal from './CustomModal';
import blueBtnS from '../assets/blueBtnS.png'
import camp1 from '../assets/camp1.png'
import camp2 from '../assets/camp2.png'
import camp3 from '../assets/camp3.png'
import camp4 from '../assets/camp4.png'
import acceptedC from '../assets/acceptedC.png'
import acceptedC1 from '../assets/acceptedC1.png'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ReactApexChart from 'react-apexcharts'
// import {Button} from 'react-bootstrap'
import DonatePopup from "../components/donate.js"
import Button from './button.js'
import NumFormatter from "./numFormatter.js"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import closed from "../assets/close.png"
// import Popup from "reactjs-popup";
//

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};


function CampSection1({ campaignDetails, campaign }) {
  console.log('campaing', campaign)
  const [openModal, setOpenModal] = useState(false)
  const globalContext = useContext(Context);
  const { windowDimensions, domain, setShowDonatePopup, setDonateCampaign } = globalContext

  const agePersentSeries = []
    { campaignDetails.age_persent_1 > 0 && agePersentSeries.push(campaignDetails.age_persent_1)}
    { campaignDetails.age_persent_2 > 0 && agePersentSeries.push(campaignDetails.age_persent_2)}
    { campaignDetails.age_persent_3 > 0 && agePersentSeries.push(campaignDetails.age_persent_3)}
    { campaignDetails.age_persent_4 > 0 && agePersentSeries.push(campaignDetails.age_persent_4)}
    { campaignDetails.age_persent_5 > 0 && agePersentSeries.push(campaignDetails.age_persent_5)}
  console.log(agePersentSeries, 'agePersentSeriesagePersentSeries')
  const agePersentLabels = []
    { campaignDetails.age_persent_1 > 0 && agePersentLabels.push(campaignDetails.age_persent_1 + `% ${campaignDetails.cause_1}`) }
    { campaignDetails.age_persent_2 > 0 && agePersentLabels.push(campaignDetails.age_persent_2 + `% ${campaignDetails.cause_2}`)}
    { campaignDetails.age_persent_3 > 0 && agePersentLabels.push(campaignDetails.age_persent_3 + `% ${campaignDetails.cause_3}`)}
    { campaignDetails.age_persent_4 > 0 && agePersentLabels.push(campaignDetails.age_persent_4 + `% ${campaignDetails.cause_4}`)}
    { campaignDetails.age_persent_5 > 0 && agePersentLabels.push(campaignDetails.age_persent_5 + `% ${campaignDetails.cause_5}`)}

  const totalPersentSeries = agePersentSeries.reduce((a, b) => a + b, 0)
  if (totalPersentSeries < 100) {
    agePersentSeries.push(100 - totalPersentSeries)
    agePersentLabels.push(`${100 - totalPersentSeries}% Other`)
  }

  console.log('agePersentSeries', agePersentLabels, agePersentSeries);
  //   const series = [33, 33, 33]
  const series = agePersentSeries
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    //   legend: {
    //         show: false
    //       },
    dataLabels: { enabled: false },
    //   labels: ['33% Travel', '33% Supplies', '33% Staff'],
    labels: agePersentLabels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  const bioclick = () => {

    // console.log("i am Good Boy")

  }
  return (
    <Grid container className="section-outer  padding-top-5" >
      <DonatePopup />
      <Grid container  >
        <Grid item md={4}  >
          <div className='imgO' >
            <div className='imgC' >
              <img src={campaignDetails.img} className='w-100' style={{borderRadius: '7px'}} />
            </div>
            <span className='CatOnCatImg ftext'>{campaignDetails.category}</span>
            <span className='CatOnCatImgHash ftext'>#{(campaignDetails['rank'] && campaignDetails['rank'] > 0) ? ((campaignDetails['rank'] <= 500) ? campaignDetails['rank'] : "500+") : "500+"}</span>
            <span className='CatOnCatImgBio ftext' onClick={() => bioclick()}  >Bio </span>

            <Popup
              trigger={<span className='CatOnCatImgBio ftext' onClick={() => bioclick()}  >Bio </span>}
              modal
              contentStyle={contentStyle}
            >
              {close => (
                <div className='modaled'>
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  {campaignDetails?.description}
                </div>
              )}
            </Popup>
          </div>
          {/* {campaignDetails.description} */}
          {/* <CustomModal desc={campaignDetails.description} /> */}
          <Grid container justifyContent={'center'} mt={2}>
            <Grid item md={9} >
              <Grid container justifyContent={'space-between'}>
                <a href='#'><img src={camp1} className='CampSicon' /></a>
                <a href={campaignDetails?.website_url}><img src={camp2} className='CampSicon' /></a>
                <a href={campaignDetails?.twitter_url}><img src={camp3} className='CampSicon' /></a>
                <a href={campaignDetails?.instagram_url}><img src={camp4} className='CampSicon' /></a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={7}>
          <Grid container  >
            <Grid item md={9}>
              <div className='textC'>
                <a href={`/charity/${campaignDetails?.charity_slug}`}><p style={{ position: 'relative' }} className='uText smTSec1 ftext fbold' >{campaignDetails.charity_name}   <img src={smTick} height={15} style={{marginTop: '-10px'}} /> </p></a>
              </div>
            </Grid>
            <Grid item md={3}>
              <Grid container justifyContent={'end'} >
                <Grid item md={12} className='progCon'>
                  <ProgressBar>
                    <ProgressBar style={{ backgroundColor: 'rgb(215 214 206)' }} now={campaignDetails['raised']} max={campaignDetails['total']} key={1} />
                    <ProgressBar style={{ backgroundColor: '#004A99' }} now={campaignDetails['total'] - campaignDetails['raised']} max={campaignDetails['total']} key={2} />
                  </ProgressBar>
                  <p>{NumFormatter(campaignDetails.total, 1)} <img src={blueBtnS} /> target</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <h2 className='text-left w-100 ftext fbold mb-4'>{campaignDetails.campaign_name} <span className='vTSec1'>#{(campaignDetails['rank'] && campaignDetails['rank'] > 0) ? ((campaignDetails['rank'] <= 500) ? campaignDetails['rank'] : "500+") : "500+"}</span></h2>
          <Grid container mt={5}>
            <Grid item md={9}>
              <Grid container justifyContent={'flex-start'} spacing={5}>
                <Grid item sm={'auto'}>
                  <h2 className='vTSec1 ftext text-center'>{NumFormatter(campaignDetails.raised, 1)}</h2>
                  <p className='smTSec1 ftext fbold text-center'>Algos Raised</p>
                </Grid>
                <Grid item sm={'auto'}>
                  <h2 className='vTSec1 ftext text-center'>{NumFormatter(campaignDetails.minted, 1)}</h2>
                  <p className='smTSec1 ftext fbold text-center'>C-NFTs Minted</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={5} className='graphC' spacing={2}>
            <Grid item md={7}>
              <Grid container>
                <Grid item md={12}  >
                  <p className='sec1CT fbold ftext'>Donation  Proceeds</p>
                  <ReactApexChart options={options} series={series} type="pie" style={{ width: '100%' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5}>
              <p className='sec1CT fbold ftext text-center'>Accepts</p>
              <div className='acceptC mt-4'>
                <img src={acceptedC} style={{marginTop: '-2px'}} />
                {/* <img src={acceptedC1} className='ml-2' /> */}
              </div>
              <div className='text-center mt-5'>
                {/* <Button className='sec1CBtn mt-5 ftext text-center py-3 px-4' variant="outline-success">Donate</Button> */}
                <Button text="Donate" icon={null} sClasses={'sec1CBtn mt-5 ftext text-center py-3 px-4'} buttonType="Highlight-Blue" link={() => { setShowDonatePopup(true); setDonateCampaign(campaign) }} />
              </div>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}

export default CampSection1
