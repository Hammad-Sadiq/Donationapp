import React, { useState, useContext, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";
import Plus from "../assets/plus.png"
import RankingListing from "./rankingListing.js"

export default function Rankings(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain } = globalContext

  const cookies = new Cookies();
  const [rankListings, setRankListings ] = useState([])
  const [ showing, setShowing ] = useState(15)
  const [selector, setSelector] = useState(0)

  function fetchCampaigns () {
    setRankListings([])
    fetch(`${domain}/fetch-campaign-rankings/`, {
    method: 'GET',
    headers: {
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) => {
      setRankListings(data.campaigns)
    })
    .catch((err) => {
      console.log(err);
    });

  }

  function fetchCharities () {
    setRankListings([])
    fetch(`${domain}/fetch-charity-rankings/`, {
    method: 'GET',
    headers: {
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) => {
      setRankListings(data.charities)
    })
    .catch((err) => {
      console.log(err);
    });

  }

  useEffect(() => {
    fetchCharities()
  }, [])

  function createRows() {
    let rows = []

    console.log(rankListings.length)
    console.log(rankListings.length > (0*3))

    for(var i = 0; i < 5; i++) {

      if (rankListings.length > i) {
        rows.push(createRow(i))
      }
    }

    return rows;
  }

  function createRow(i) {
    return (
      <div className={`${(windowDimensions.width >= 950)? "rank-column" : "rank-row"} vertical-center flex-col margin-top-2`}>
    {(rankListings.length > i) ?
      <RankingListing redirect_to={`${(selector === 0) ? "/charity/" : "/campaign/"}${rankListings[i]['slug']}`} campaign={rankListings[i]} col={(windowDimensions.width >= 950)? "col1": `row1`} />
      :
      null
    }
    {(rankListings.length > (i + 5)) ?
      <RankingListing redirect_to={`${(selector === 0) ? "/charity/" : "/campaign/"}${rankListings[i + 5]['slug']}`} campaign={rankListings[(i + 5)]} col={(windowDimensions.width >= 950)? "col2": `row2`} />
      :
      null
    }
    {(rankListings.length > (i + 10)) ?
      <RankingListing redirect_to={`${(selector === 0) ? "/charity/" : "/campaign/"}${rankListings[i + 10]['slug']}`} campaign={rankListings[(i + 10)]} col={(windowDimensions.width >= 950)? "col3": `row3`} />
      :
      null
    }
    </div>

  )
  }

  function switchSelector () {
    if (selector === 0) {
      fetchCampaigns()
      setSelector(1)

    } else {
      fetchCharities()
      setSelector(0)
    }
  }


  return(
    <>

    <div id="rankings" ref={(props.ref)? props.ref : null} className="section-outer vertical-center flex-col margin-top-5">
    <h2 className="primary-foreground text-center">Last 7 Days</h2>
    <div className="flex-row padding-top-2 category-row center-center pointer" onClick={() => switchSelector()}>
      <h5 className={`${(selector === 0) ? "primary-foreground" : "gray-foreground"} margin-right-20p`}>Charities</h5>
      <div className="slide-button-outer vertical-center flex-row">
      <div className={(selector === 0) ? "slide-button-inner-left" : "slide-button-inner-right"} />
      </div>

      <h5 className={`${(selector === 1) ? "primary-foreground" : "gray-foreground"} margin-left-20p`}>Campaigns</h5>

    </div>

  {(rankListings && rankListings.length > 0) ?
    <>
    {
    createRows().map((val, ind) => {
      return ( <>{val}</> )
    })
    }
    </>
   : null}

   </div>
  </>



  )

};
