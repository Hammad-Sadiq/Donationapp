import React, { useState, useContext, useRef } from 'react';
import { Context } from "./globalContext/globalContext.js";
import Cookies from "universal-cookie";

import Send from "../assets/send.png";

export default function Contact(props) {

  const cookies = new Cookies();
  const globalContext = useContext(Context);
  const { windowDimensions, domain } = globalContext

  const [notice, setNotice] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()

  let emailRef = useRef()
  let nameRef = useRef()
  let messRef = useRef()
  const emailRe =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  function handleVerification() {
    setNotice("")
    if (!(name) || name === "") {
      setNotice("Name is required.")
    } else if (!(email) || email === "") {
      setNotice ("Email is required.")
    } else if (!(emailRe.test(email))) {
      setNotice("Email must be a valid email.")
    } else if (!(message) || message === "") {
      setNotice("Message is required.")
    } else {
      submit()
    }
  }

  function submit() {
    let body = JSON.stringify({
      "name": name,
      "email": email,
      "message": message})

    fetch(`${domain}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      body:body
      })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          setNotice("Unable to submit form")
        }
      })
      .then(json => {
        setName("")
        setEmail("")
        setMessage("")
        setNotice("Your message has been submitted.")




      })
      .catch(error => {
        setNotice("Unable to submit form")
        console.log(error)
      })
  }

  return(
  <div ref={(props.propsRef)? props.propsRef : null} className="section-outer" id="contact">
    <h2 className="primary-foreground text-center">Contact Us</h2>
    <div className="contact-outer margin-top-5">
      <div className="row1 col1-2">
        <p className="primary-foreground">Have a question or want to submit feedback? Submit the form below and we'll respond soon.</p>
        <p className="secondary-foreground">{notice}</p>

      </div>
      <div className={`row2 ${(windowDimensions.width >= 600)? "col1" : "col1-2"} single-input-outer`} onClick={()=> nameRef.current.focus()}>
        <p className="primary-foreground p2 form-label-margin">Name</p>
        <input className="p" value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} ></input>
      </div>
      <div className={`row3 ${(windowDimensions.width >= 600)? "col1" : "col1-2"} single-input-outer`} onClick={()=> emailRef.current.focus()}>
        <p className="primary-foreground p2 form-label-margin">Email</p>
        <input className="p" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} ></input>

      </div>
      <div className={`${(windowDimensions.width >= 600)? "row2-3 col2" : "row4 col1-2"} multi-input-outer`} onClick={()=> messRef.current.focus()}>
        <p className="primary-foreground p2 form-label-margin">Message</p>
        <textarea className="p" value={message} onChange={(e) => setMessage(e.target.value)} ref={messRef} ></textarea>

      </div>

      <div onClick={()=> handleVerification()} className={`${(windowDimensions.width >= 600)? "row4 col1-2" : "row5 col1-2"} flex-row horizontal-end vertical-center pointer`}>
        <img src={Send} className="send-icon" />
        <h5 className="link underline tertiary-foreground">Send</h5>
      </div>

    </div>
  </div>
  )

};
