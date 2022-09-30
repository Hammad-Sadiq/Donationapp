import React, {useContext, useEffect} from 'react';

import '../../App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Context } from "../globalContext/globalContext.js";

import HomePage from '../../pages/home.js'
import LoginPage from '../../pages/login.js'
import PendingPage from '../../pages/pending.js'
import SignupPage from '../../pages/signup.js'
import CampaignLandingPage from '../../pages/campaignLanding.js'
import CharityLandingPage from '../../pages/charityLanding.js'
import Component from '../Component';

function RouterComponent() {
  const globalContext = useContext(Context);
  const { authenticated } = globalContext

  useEffect(()=> {
    if ((window.location.pathname === "/login" || window.location.pathname === "/login/" ) && authenticated) {
      console.log("trying to redirect")
      window.location = "/profile"
    }
  }, [])

  return (
    <Router>
        <Routes>
        {(!(authenticated)) ?
          <>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="GettingStarted" element={<Component />} />
        
        <Route path="pending-verification" element={<PendingPage />} />
        <Route path="campaign" element={<CampaignLandingPage />} >
          <Route path=":campaignSlug" element={<CampaignLandingPage />} />
        </Route>
        <Route path="charity" element={<CharityLandingPage />} >
          <Route path=":charitySlug" element={<CharityLandingPage />} />
        </Route>
        </>
        :
        null
        }
        <Route path="/" element={<HomePage />} />
        <Route path="campaign" element={<CampaignLandingPage />} >
          <Route path=":campaignSlug" element={<CampaignLandingPage />} />
        </Route>
        <Route path="charity" element={<CharityLandingPage />} >
          <Route path=":charitySlug" element={<CharityLandingPage />} />
        </Route>
        </Routes>
    </Router>
  );
}

export default RouterComponent;
