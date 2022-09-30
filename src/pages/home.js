import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Context } from "../components/globalContext/globalContext.js";
import { useLocation } from "react-router-dom";

import CompareImg from '../assets/compare.png'

import MenuButton from '../components/menuButton.js'

import Header from '../components/header.js'
import Hero from '../components/hero.js'
import FeaturedCampaigns from '../components/featuredCampaigns.js'
import Campaigns from '../components/campaigns.js'
import Rankings from '../components/rankings.js'
import GetStarted from '../components/getStarted.js'
import Sponsored from '../components/sponsored.js'
import Blog from '../components/blog.js'
import Roadmap from '../components/roadmap.js'
import Faq from '../components/faq.js'
import Contact from '../components/contact.js'
import Footer from '../components/footer.js'
import Community from '../components/community.js'
import DonatePopup from "../components/donate.js"
import NewHeader from "../components/NewHeader.js"
import Section1 from "../components/Section1.js"
import Section2 from "../components/Section2.js"
import Section3 from "../components/Section3.js"
import Section4 from "../components/Section4.js"
import CampSection1 from "../components/CampSection1.js"
import CampSection2 from "../components/CampSection2.js"
import Profile from "../components/Profile.js"




export default function HomePage() {

  const globalContext = useContext(Context);
  const { windowDimensions, aboutRef, contactRef, blogRef, roadmapRef, faqRef, campaignsRef, rankingsRef, communityRef, headerRef } = globalContext
  const { hash } = useLocation();
  const [position, setPosition] = useState()

  useEffect(()=> {
    window.addEventListener('scroll', listenToScroll)
    return ()=> {
      window.removeEventListener('scroll', listenToScroll)
    }

  }, [])

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll / height

    setPosition(scrolled)
  }

  //
return (
  <div className="home">
    <DonatePopup />
    {/* <Header propsRef={headerRef}/> */}
    <NewHeader />
    {/* <Profile /> */}
    {/* <CampSection2 /> */}

    {/* hero replaced by section1 */}
    {/* <Hero />   */}
    <Section1 />

    {/* FeaturedCampaigns replaced by Section2 */}
    {/* <FeaturedCampaigns/>  */}
    <Section2 />

    <Section3 />


    <Campaigns propsRef={campaignsRef}/> 
    {/* <Section4 /> */}
    <Rankings propsRef={rankingsRef}/>
    {/* <GetStarted propsRef={aboutRef}/> */}
    {/* <Sponsored /> */}
    {/* <div className="section-outer">
    <div className="compare-img-outer">
      <img className="compare-img" src={CompareImg} />
    </div>
    </div> */}
    <Blog propsRef={blogRef}/>
    {/* <Roadmap propsRef={roadmapRef}/> */}
    <Faq propsRef={faqRef}/>
    <Contact propsRef={contactRef}/>
    <Footer />
    <Community propsRef={communityRef}/>
    <p className="text-center padding-top-2 padding-bottom-2">Copyright 2022 ©Giftchain. All Rights Reserved</p>

    {(position >= 0.10)?
    <div className="return-button">
      <MenuButton text="Return to Top" icon={null} buttonType="Highlight-Green" link={()=> headerRef.current.scrollIntoView()} />
    </div>
    :
    null
  }
  </div>

)
};
