import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Logo from "../assets/logo.png"
import Discord from "../assets/discord.png"
import Github from "../assets/github.png"
import Twitter from "../assets/twitter.png"
import Instagram from "../assets/instagram.png"
import LinkedIn from "../assets/linkedin.png"
import Medium from "../assets/medium.png"

import SocialButton from "./socialButton.js"

export default function Community(props) {

  const globalContext = useContext(Context);
  const { windowDimensions} = globalContext

  return(
  <div ref={(props.ref)? props.ref : null} id="community" className="community-outer">


    <h4 className="primary-foreground">Join Our Community</h4>
    <div className="community-icon-container padding-top-2">

      <SocialButton url="https://discord.gg/KzXUjrKdej" img={Discord} title="Discord" />
      <SocialButton url="https://github.com/asalpio" img={Github} title="Github" />
      <SocialButton url="https://twitter.com/asalp_io" img={Twitter} title="Twitter" />
      <SocialButton url="https://www.instagram.com/asalp.io/" img={Instagram} title="Instagram" />
      <SocialButton url="https://www.linkedin.com/company/76176784/" img={LinkedIn} title="LinkedIn" />
      <SocialButton url="https://asalp.medium.com/" img={Medium} title="Medium" />

    </div>
  </div>
  )

};
