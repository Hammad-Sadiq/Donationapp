import React, { useState, useContext } from 'react';
import { Context } from "./globalContext/globalContext.js";

import DownArrow from "../assets/down_arrow.png"
import UpArrow from "../assets/up_arrow.png"

export default function Faq(props) {
  const globalContext = useContext(Context);
  const { windowDimensions, faqs } = globalContext

  const [ faqScreen, setFaqScreen ] = useState("Donor")
  const [ shownQuest, setShownQuest ] = useState("")


  return(
  <div ref={(props.ref)? props.ref : null} className="section-outer flex-col vertical-center margin-top-5">
    <h2 className="primary-foreground text-center">FAQ</h2>
    <div className="row w-75 justify-content-center">
      <div onClick={()=> setFaqScreen("Donor")} className={`faq-menu-inner col-4 pointer ${(faqScreen === "Donor")? "selected-faq-menu" : null}`}>
        <h5 className="primary-foreground">Donor</h5>
      </div>

      <div onClick={()=> setFaqScreen("Charity")} className={`faq-menu-inner col-4 pointer ${(faqScreen === "Charity")? "selected-faq-menu" : null}`}>
        <h5 className="primary-foreground">Charity</h5>
      </div>

      {/* <div onClick={()=> setFaqScreen("Charity NFTs")} className={`faq-menu-inner col-4 pointer ${(faqScreen === "Charity NFTs")? "selected-faq-menu" : null}`}>
        <h5 className="primary-foreground">Charity NFTs</h5>
      </div> */}
    </div>


    <div className="faq-list-outer">
      {(faqScreen && faqScreen in faqs)? Object.keys(faqs[faqScreen]).map((val, ind) => {

        return (
          <div className="faq-inner pointer" onClick={()=> {(shownQuest === val)? setShownQuest("") : setShownQuest(val)}}>
            <div className="col1 faq-question-container">
              <h5>{val}</h5>

            </div>
            <div className="col2 faq-drop-icon-container">
              <img src={(shownQuest === val) ? UpArrow : DownArrow} className="drop-arrow" />

            </div>

            {(shownQuest && shownQuest === val) ?
              <div className="faq-answer-container">
              {faqs[faqScreen][val].split("/").map((val, ind) => {
                return(
                  <p className="primary-foreground padding-top-2">{val}</p>
                )
              })}

              </div>
              :
              null
            }
          </div>
        )
      })
    :
  null}

    </div>
  </div>
  )

};
