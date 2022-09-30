import React, { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import sec1 from '../assets/sec1.png'
import btnS from '../assets/btnS.png'
import { Button } from 'react-bootstrap';
import brand from "../imges/brand.png";
import { Link, useNavigate } from "react-router-dom"

import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";

function Section1(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, domain, metrics, setMetrics, gifTiers, setGifTiers } = globalContext
  const cookies = new Cookies();

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

  function getRankings() {
    fetch(`${domain}/rankings/`, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("RANKINGS", data.rankings)
        setMetrics(data.rankings)

      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    getRankings()
  }, [])
  return (<>
    <div className='main_hero_section'>
      <div className="container">
        <div className="row">
          <div className='col-lg-9 col-md-9 col-sm-12'></div>
          <div className='col-lg-3 col-md-3 col-sm-12'><div className="grid"  ><p className="grid_line" >Mint one after donating to charity</p></div> </div>
        </div>
      </div>


      <Grid container ref={(props.propsRef) ? props.propsRef : null} className="section-outer  padding-top-hero" >
      
        <Grid container >

          <Grid item lg={6} md={12} sm={12}>
            <div className='hero_sec_headings mb-5'>
              <div>
                <h1 className='sec1H ' id="sec1H">Mint Charity NFTs</h1>
                <h1 className='sec1H mt-3'> After Donating <span className='h1Span'>ALGO</span></h1>
                <h1 className='sec1H   mt-3' id="sec1H">  To Vetted Charities.</h1>
                <p className='sec1para smTSec1 ftext fbold mt-4  ' id="sec1H">Limited tiered NFT rewards</p>
                <p className='sec1para smTSec1 ftext fbold mt-4  ' id="sec1H"> based on your donation amount.</p>
                <p className='sec1para smTSec ftext fbold mt-4  ' id="sec1H">Carbon neutral blockchain</p>
                <div>
                  <div className='btn_div mt-5' id="sec1H">
                    <div>
                      <Link to="/signup"><Button className="sign_up">Sign Up</Button></Link>
                      <p className='charities_heading'>(charities)</p>
                    </div>
                    <a href="https://discord.gg/KzXUjrKdej"><Button className="discard">Discard</Button></a>
                  </div>
                </div>
              </div>
            </div>

          </Grid>

          <Grid item md={1} sm={12}></Grid>
          <Grid item lg={5} md={12} sm-={12} className='text-center'>
            <Grid container className='text-right'>

              <Grid container spacing={1} mb={1} >

                {(gifTiers.length > 0) ? gifTiers.map(item => {
                  return (
                    <Grid key={item?.id} item md={6} >
                      <div className='imgConSec1 p-2' >
                        <img src={item?.gif_url} className='w-100' /> 
                        <div className='my-1' style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h5 className='ml-3 sec1CT fbold ftext'>{item?.num_available} left</h5>
                          <Button className='sec1CBtn fbold ftext' variant="outline-success">{'<'}{item?.max_algo} <img src={btnS} /></Button>
                        </div>
                      </div>
                    </Grid>
                  )
                }) : null}
                {/* <Grid item md={6} >
                        <div className='imgConSec1 p-2' >
                            <img src={sec1} className='w-100' />
                            <div className='my-1' style={{display:'flex',justifyContent:'space-between'}}>
                                <h5 className='ml-3 sec1CT fbold ftext'>45 left</h5>
                                <Button className='sec1CBtn fbold ftext' variant="outline-success">{'<'}50 <img src={btnS}  /></Button>
                            </div>
                        </div>
                      </Grid> */}
                {/* <Grid item md={6} >
                        <div className='imgConSec1 p-2' >
                            <img src={sec1} className='w-100' />
                            <div className='my-1' style={{display:'flex',justifyContent:'space-between'}}>
                                <h5 className='ml-3 sec1CT fbold ftext'>45 left</h5>
                                <Button className='sec1CBtn fbold ftext' variant="outline-success">{'<'}50 <img src={btnS}  /></Button>
                            </div>
                        </div>
                      </Grid> */}
              </Grid>
              {/* <Grid container spacing={1}>
                      <Grid item md={6} >
                        <div className='imgConSec1 p-2' >
                            <img src={sec1} className='w-100' />
                            <div className='my-1' style={{display:'flex',justifyContent:'space-between'}}>
                                <h5 className='ml-3 sec1CT fbold ftext'>45 left</h5>
                                <Button className='sec1CBtn fbold ftext' variant="outline-success">{'<'}50 <img src={btnS}  /></Button>
                            </div>
                        </div>
                      </Grid>
                      <Grid item md={6} >
                        <div className='imgConSec1 p-2' >
                            <img src={sec1} className='w-100' />
                            <div className='my-1' style={{display:'flex',justifyContent:'space-between'}}>
                                <h5 className='ml-3 sec1CT fbold ftext'>45 left</h5>
                                <Button className='sec1CBtn fbold ftext' variant="outline-success">{'<'}50 <img src={btnS}  /></Button>
                            </div>
                        </div>
                      </Grid>
                  </Grid> */}
            </Grid>
            <div className="row">
              <div className='col-lg-6 col-md-6 col-sm-12'>   <h2 className='vTSec1 ftext text-center'>{(metrics['raised']) ? metrics['raised'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}+</h2>
                <p className='smTSec1 ftext fbold text-center'>Total Algo Raised</p></div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <h2 className='vTSec1 ftext text-center'>{metrics['minted']}+</h2>
                <p className='smTSec1 ftext fbold text-center'>C-NFTs minted</p>

              </div>

            </div>
            {/* <Grid container mt={10}>
            <Grid item md={10}>
              <Grid container justifyContent={'flex-start'} spacing={5}>
                {/* <div>
                                    <h2 className='vTSec1 ftext text-center'>{metrics['donors']}+</h2>
                                    <p className='smTSec1 ftext fbold text-center'>Donors</p>
                                </div> */}
            {/* <Grid item>
                  <h2 className='vTSec1 ftext text-center'>{(metrics['raised']) ? metrics['raised'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}+</h2>
                  <p className='smTSec1 ftext fbold text-center'>Total Algo Raised</p>
                </Grid>
                <Grid item>
                  <h2 className='vTSec1 ftext text-center'>{metrics['minted']}+</h2>
                  <p className='smTSec1 ftext fbold text-center'>C-NFTs minted</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
            {/* <p className='sec1para smTSec1 ftext fbold mt-3'>This weeks Charity-NFT Designs</p> */}
          </Grid>
        </Grid>
      </Grid>
      <div className='container-fluid mt-5' style={{height:"40vh"}}>
        <div className="pic_div">
          <div className='container'>
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12 "></div>
              <div className="col-lg-6 col-md-12 col-sm-12"><h4 className="product_line">Hear first about our new products</h4></div>
              <div className="col-lg-3 col-md-12 col-sm-12 "></div>
            </div>
          </div>

          <div className='container'>

            <div className="d-flex flex-wrap gap-4 justify-content-center mt-4">

              <input type="text" className='form-control' placeholder="enter email" />
              <Button className='submit'>Submit</Button>

            </div>
            <div className='d-flex  justify-content-center backed_pic_div '>
              <h4 className='backed_heading'>Backed by</h4>
              <div style={{ height: "58px", width: "211px" }}> <img src={brand} alt="" style={{ width: "100%" }} /></div>

            </div>
          </div>


        </div>



      </div>
    </div>
  </>)
}

export default Section1
