import React, { useState, useContext, useRef, useEffect } from 'react';
import '../App.css';
import { Context } from "../components/globalContext/globalContext.js";
import Cookies from "universal-cookie";

import Send from "../assets/send.png";
import Eye from "../assets/eye.png";
import NewHeader from "../components/NewHeader.js"
import Footer from '../components/footer.js'
import Community from '../components/community.js'

export default function LoginPage(props) {

  const globalContext = useContext(Context);
  const { windowDimensions, domain, authenticated, setAuthenticated } = globalContext


  const cookies = new Cookies();

  const [notice, setNotice] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showPass, setShowPass] = useState(false)

  let emailRef = useRef()
  let passwordRef = useRef()

  useEffect(()=> {
    if (authenticated) {
      console.log("trying to redirect from login page")
      console.log("Window Is Authenticated")
      window.location = "/profile"
    }
  }, [])

  const emailRe =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  function handleVerification() {
    setNotice("")
    if (!(email) || email === "") {
      setNotice ("Email is required.")
    } else if (!(emailRe.test(email))) {
      setNotice("Email must be a valid email.")
    } else if (!(password) || password === "") {
      setNotice("Password is required.")
    } else {
      submit()
    }
  }

  function submit() {
      let body = JSON.stringify({
        "username": email,
        "password": password})

      fetch(`${domain}/user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: 'same-origin',
        body:body
        })
        .then(res => {
          if (res.ok) {
            return res
          } else {
            setNotice("Invalid Credentials or Not Yet Verified")
            throw "Err"
          }
        })
        .then(json => {
          setEmail("")
          setPassword("")
          setAuthenticated(true)
          window.location = "/profile"

        })
        .catch(error => {
          console.log(error)
        })
    }

return (
  <div className="login">
    <NewHeader />
    <div ref={(props.propsRef)? props.propsRef : null} className="section-outer margin-bottom-20 flex-col center-center short-top" id="contact">
      <h2 className="primary-foreground text-center">Login</h2>
      <div className="flex-row horizontal-center">
        <p className="flex-row horizontal-center padding-right-6p margin-top-5">Need an account?</p>
        <p className="link tertiary-foreground pointer margin-top-5" onClick={()=> window.location="signup"}> Go to registration.</p>
      </div>

      <div className="form-outer margin-top-2">
        <div className="row1 col1-2">
          <p className="secondary-foreground">{notice}</p>

        </div>
        <div className={`row2 ${(windowDimensions.width >= 915)? "col1" : "col1-2"} single-input-outer`} onClick={()=> emailRef.current.focus()}>
          <p className="primary-foreground p2 form-label-margin">Email</p>
          <input className="p" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} ></input>
        </div>
        <div className={`${(windowDimensions.width >= 915)? "row2 col2" : "row3 col1-2"} single-input-outer`} onClick={()=> passwordRef.current.focus()}>
          <p className="primary-foreground p2 form-label-margin">Password</p>
          <div className="flex-row">
          <input className="p" type={(showPass)? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} ></input>
          <img src={Eye} className="pointer eye-icon" onClick={()=> setShowPass(!(showPass))} />
          </div>
        </div>

        <div onClick={()=> handleVerification()} className={`${(windowDimensions.width >= 915)? "row3 col1-2" : "row4 col1-2"} flex-row horizontal-end vertical-center pointer margin-top-5`}>
          <img src={Send} className="send-icon" />
          <h5 className="link underline tertiary-foreground">Send</h5>
        </div>

      </div>

    </div>

    <Footer />
    <Community />
    <p className="text-center padding-top-2 padding-bottom-2">Copyright 2021 ©Asalp. All Rights Reserved</p>
  </div>

)
};
