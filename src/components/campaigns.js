import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import Plus from "../assets/plus.png"
import CampaignListing from "./campaignListing.js"

import Grid from '@mui/material/Grid';
import CompaignCard from './CompaignCard'

export default function Campaigns(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain, setDonateCampaign } = globalContext

  const cookies = new Cookies();
  const [campaignListings, setCampaigns] = useState([])
  const [showing, setShowing] = useState(6)
  const [categories, setCategories] = useState()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [type, setType] = useState("Charity")

  function fetchCategories(type) {
    console.log(campaignListings, 'campaignListings')
    let url = null
    if (type === "Individual") {
      url = `${domain}/fetch-categories-personal/`
    } else {
      url = `${domain}/fetch-categories-charities/`
    }

    fetch(url, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchCampaigns(category, type) {
    fetch(`${domain}/fetch-campaigns/${category}/${type}`, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'dataaaaaaaaaaaaa')
        let datas = data.campaigns
        datas = Array(new Set(data.campaigns))
        console.log(datas)
        setCampaigns(data.campaigns)
        setDonateCampaign(data.campaigns[0])
      })
      .catch((err) => {
        console.log(err);
      });

  }

  useEffect(() => {
    fetchCategories(type)
    fetchCampaigns("All", "Charity")
  }, [])

  function switchSelector() {
    if (type === "Charity") {
      fetchCampaigns(selectedCategory, "Individual")
      setType("Individual")
      fetchCategories("Individual")


    } else {
      fetchCampaigns(selectedCategory, "Charity")
      setType("Charity")
      fetchCategories("Charity")
    }

  }


  return (
    <>

      <div ref={(props.ref) ? props.ref : null} className="section-outer vertical-center flex-col ">
        {/* <h2 className="primary-foreground text-center">Campaigns By Category</h2> */}
        <h2 className='text-center w-100 ftext fbold mb-4'>Campaigns by <span className='vTSec1'>Category</span></h2>
        <div className="flex-row padding-top-2 category-row center-center pointer" onClick={() => switchSelector()}>
          <h5 className={`${(type === "Charity") ? "primary-foreground" : "gray-foreground"} margin-right-20p`}>Charities</h5>
          <div className="slide-button-outer vertical-center flex-row">
            <div className={(type === "Charity") ? "slide-button-inner-left" : "slide-button-inner-right"} />
          </div>

          <h5 className={`${(type === "Individual") ? "primary-foreground" : "gray-foreground"} margin-left-20p`}>Individuals</h5>

        </div>
        <div className="flex-row padding-top-2 category-row horizontal-center">
          <h5 className="primary-foreground margin-right-20p">Select Category</h5>
          <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); fetchCampaigns(e.target.value, type) }} className="primary-foreground" name="categories" id="categories-list">
            {(categories && categories.length > 0) ? categories.map((val, ind) => {
              return (
                <option value={val}>{val}</option>
              )
            }) : null}
          </select>
        </div>
        {(campaignListings && campaignListings.length > 0) ?
          <div className="margin-top-2 center-center flex-col full-width-null">
            <Grid container justifyContent={'flex-start'} columnSpacing={10} rowSpacing={5} mb={4} >
              {campaignListings.map((campaign, ind) => {
                if (ind < showing) {
                  return (
                    <>
                      <Grid item md={4}>
                        <CompaignCard category={selectedCategory} campaign={campaign} col={(windowDimensions.width >= 950) ? "col2" : `row${ind + 2}`} />
                      </Grid>
                    </>
                  )
                } else {
                  return (<></>)
                }
              })}
            </Grid>
          </div>
          : null}



        {/* {
  (campaignListings && campaignListings.length > 0) ?
    <div className="margin-top-2 center-center flex-col full-width-null">
    { campaignListings.map((campaign, ind) => {
    if (ind >= showing || ind % 6 !== 0) {
      return(<></>)
    }

    return (
      <>
      <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2`}>
        <CampaignListing category={selectedCategory} campaign={campaign} col={(windowDimensions.width >= 950)? "col1": `row${ind+1}`}/>

        {(campaignListings.length > ind+1) ?
          <CampaignListing category={selectedCategory} campaign={campaignListings[ind+1]} col={(windowDimensions.width >= 950)? "col2": `row${ind+2}`} />
          :
          null
        }

        {(campaignListings.length > ind+2) ?
          <CampaignListing category={selectedCategory} campaign={campaignListings[ind+2]} col={(windowDimensions.width >= 950)? "col3": `row${ind+3}`} />
          :
          null
        }
      </div>

      <div className={`${(windowDimensions.width >= 950)? "campaign-column-2" : "campaign-row"} vertical-center flex-col margin-top-2`}>

        {(campaignListings.length > ind+3) ?
          <CampaignListing category={selectedCategory} campaign={campaignListings[ind+3]} col={(windowDimensions.width >= 950)? "col1": `row${ind+1}`} />
          :
          null
        }


        {(campaignListings.length > ind+4) ?
          <CampaignListing category={selectedCategory} campaign={campaignListings[ind+4]} col={(windowDimensions.width >= 950)? "col2": `row${ind+2}`} />
          :
          null
        }


        {(campaignListings.length > ind+5) ?
          <CampaignListing category={selectedCategory} campaign={campaignListings[ind+5]} col={(windowDimensions.width >= 950)? "col3": `row${ind+3}`} />
          :
          null
        }
      </div>
      </>
    )

    }) }
    </div>
   : null} */}

      </div>

      {(showing < campaignListings.length) ?
        <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={() => setShowing(showing + 6)}><img className="plus-icon" src={Plus} />See More</h5>
        :
        (campaignListings.length > 6) ?
          <h5 className="underline tertiary-foreground center-center flex-row padding-top-5 pointer" onClick={() => setShowing(6)}>Hide</h5>
          :
          null
      }
    </>



  )

};
