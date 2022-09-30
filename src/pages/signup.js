import React, { useState, useContext, useRef, useEffect } from 'react';
import '../App.css';
import { Context } from "../components/globalContext/globalContext.js";
import Cookies from "universal-cookie";

import Arrow from "../assets/right_arrow.png";
import Back from "../assets/back.png";
import Eye from "../assets/eye.png";
import NewHeader from "../components/NewHeader.js"
import Footer from '../components/footer.js'
import Community from '../components/community.js'

export default function SignupPage(props) {

  const globalContext = useContext(Context);
  const { windowDimensions, domain, authenticated, setAuthenticated } = globalContext


  const cookies = new Cookies();

  const [notice, setNotice] = useState()

  const [orgName, setOrgName] = useState()
  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [country, setCountry] = useState()
  const [compRegNo, setCompRegNo] = useState("")
  const [ein, setEin] = useState("")
  const [nonprofRegNo, setNonprofRegNo] = useState("")
  const [profileImg, setProfileImg] = useState()
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [twitterUrl, setTwitterUrl] = useState("")
  const [instaUrl, setInstaUrl] = useState("")
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()
  const [signupScreen, setSignupScreen] = useState(1)
  const [signupOneValidated, setSignupOneValidated] = useState(false)
  const [signupTwoValidated, setSignupTwoValidated] = useState(false)
  const [signupThreeValidated, setSignupThreeValidated] = useState(false)
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [confirmTc, setConfirmTc] = useState(false)
  const [type, setType] = useState("Charity")

  let emailRef = useRef()
  let passwordRef = useRef()
  let orgNameRef = useRef()
  let nameRef = useRef()
  let addressRef = useRef()
  let password2Ref = useRef()
  let compRegRef = useRef()
  let einRef = useRef()
  let nonprofRegRef = useRef()
  let websiteRef = useRef()
  let twitterRef = useRef()
  let instaRef = useRef()
  let profileRef = useRef()

  const countrySelect = () => {
    return(
       <select className="p" id="country" name="country" value={country} onChange={(e) => {setCountry(e.target.value); console.log(e.target.value)}}>
   <option value=""></option>
   <option value="Afganistan">Afghanistan</option>
   <option value="Albania">Albania</option>
   <option value="Algeria">Algeria</option>
   <option value="American Samoa">American Samoa</option>
   <option value="Andorra">Andorra</option>
   <option value="Angola">Angola</option>
   <option value="Anguilla">Anguilla</option>
   <option value="Antigua & Barbuda">Antigua & Barbuda</option>
   <option value="Argentina">Argentina</option>
   <option value="Armenia">Armenia</option>
   <option value="Aruba">Aruba</option>
   <option value="Australia">Australia</option>
   <option value="Austria">Austria</option>
   <option value="Azerbaijan">Azerbaijan</option>
   <option value="Bahamas">Bahamas</option>
   <option value="Bahrain">Bahrain</option>
   <option value="Bangladesh">Bangladesh</option>
   <option value="Barbados">Barbados</option>
   <option value="Belarus">Belarus</option>
   <option value="Belgium">Belgium</option>
   <option value="Belize">Belize</option>
   <option value="Benin">Benin</option>
   <option value="Bermuda">Bermuda</option>
   <option value="Bhutan">Bhutan</option>
   <option value="Bolivia">Bolivia</option>
   <option value="Bonaire">Bonaire</option>
   <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
   <option value="Botswana">Botswana</option>
   <option value="Brazil">Brazil</option>
   <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
   <option value="Brunei">Brunei</option>
   <option value="Bulgaria">Bulgaria</option>
   <option value="Burkina Faso">Burkina Faso</option>
   <option value="Burundi">Burundi</option>
   <option value="Cambodia">Cambodia</option>
   <option value="Cameroon">Cameroon</option>
   <option value="Canada">Canada</option>
   <option value="Canary Islands">Canary Islands</option>
   <option value="Cape Verde">Cape Verde</option>
   <option value="Cayman Islands">Cayman Islands</option>
   <option value="Central African Republic">Central African Republic</option>
   <option value="Chad">Chad</option>
   <option value="Channel Islands">Channel Islands</option>
   <option value="Chile">Chile</option>
   <option value="China">China</option>
   <option value="Christmas Island">Christmas Island</option>
   <option value="Cocos Island">Cocos Island</option>
   <option value="Colombia">Colombia</option>
   <option value="Comoros">Comoros</option>
   <option value="Congo">Congo</option>
   <option value="Cook Islands">Cook Islands</option>
   <option value="Costa Rica">Costa Rica</option>
   <option value="Cote DIvoire">Cote DIvoire</option>
   <option value="Croatia">Croatia</option>
   <option value="Cuba">Cuba</option>
   <option value="Curaco">Curacao</option>
   <option value="Cyprus">Cyprus</option>
   <option value="Czech Republic">Czech Republic</option>
   <option value="Denmark">Denmark</option>
   <option value="Djibouti">Djibouti</option>
   <option value="Dominica">Dominica</option>
   <option value="Dominican Republic">Dominican Republic</option>
   <option value="East Timor">East Timor</option>
   <option value="Ecuador">Ecuador</option>
   <option value="Egypt">Egypt</option>
   <option value="El Salvador">El Salvador</option>
   <option value="Equatorial Guinea">Equatorial Guinea</option>
   <option value="Eritrea">Eritrea</option>
   <option value="Estonia">Estonia</option>
   <option value="Ethiopia">Ethiopia</option>
   <option value="Falkland Islands">Falkland Islands</option>
   <option value="Faroe Islands">Faroe Islands</option>
   <option value="Fiji">Fiji</option>
   <option value="Finland">Finland</option>
   <option value="France">France</option>
   <option value="French Guiana">French Guiana</option>
   <option value="French Polynesia">French Polynesia</option>
   <option value="French Southern Ter">French Southern Ter</option>
   <option value="Gabon">Gabon</option>
   <option value="Gambia">Gambia</option>
   <option value="Georgia">Georgia</option>
   <option value="Germany">Germany</option>
   <option value="Ghana">Ghana</option>
   <option value="Gibraltar">Gibraltar</option>
   <option value="Great Britain">Great Britain</option>
   <option value="Greece">Greece</option>
   <option value="Greenland">Greenland</option>
   <option value="Grenada">Grenada</option>
   <option value="Guadeloupe">Guadeloupe</option>
   <option value="Guam">Guam</option>
   <option value="Guatemala">Guatemala</option>
   <option value="Guinea">Guinea</option>
   <option value="Guyana">Guyana</option>
   <option value="Haiti">Haiti</option>
   <option value="Hawaii">Hawaii</option>
   <option value="Honduras">Honduras</option>
   <option value="Hong Kong">Hong Kong</option>
   <option value="Hungary">Hungary</option>
   <option value="Iceland">Iceland</option>
   <option value="Indonesia">Indonesia</option>
   <option value="India">India</option>
   <option value="Iran">Iran</option>
   <option value="Iraq">Iraq</option>
   <option value="Ireland">Ireland</option>
   <option value="Isle of Man">Isle of Man</option>
   <option value="Israel">Israel</option>
   <option value="Italy">Italy</option>
   <option value="Jamaica">Jamaica</option>
   <option value="Japan">Japan</option>
   <option value="Jordan">Jordan</option>
   <option value="Kazakhstan">Kazakhstan</option>
   <option value="Kenya">Kenya</option>
   <option value="Kiribati">Kiribati</option>
   <option value="Korea North">Korea North</option>
   <option value="Korea Sout">Korea South</option>
   <option value="Kuwait">Kuwait</option>
   <option value="Kyrgyzstan">Kyrgyzstan</option>
   <option value="Laos">Laos</option>
   <option value="Latvia">Latvia</option>
   <option value="Lebanon">Lebanon</option>
   <option value="Lesotho">Lesotho</option>
   <option value="Liberia">Liberia</option>
   <option value="Libya">Libya</option>
   <option value="Liechtenstein">Liechtenstein</option>
   <option value="Lithuania">Lithuania</option>
   <option value="Luxembourg">Luxembourg</option>
   <option value="Macau">Macau</option>
   <option value="Macedonia">Macedonia</option>
   <option value="Madagascar">Madagascar</option>
   <option value="Malaysia">Malaysia</option>
   <option value="Malawi">Malawi</option>
   <option value="Maldives">Maldives</option>
   <option value="Mali">Mali</option>
   <option value="Malta">Malta</option>
   <option value="Marshall Islands">Marshall Islands</option>
   <option value="Martinique">Martinique</option>
   <option value="Mauritania">Mauritania</option>
   <option value="Mauritius">Mauritius</option>
   <option value="Mayotte">Mayotte</option>
   <option value="Mexico">Mexico</option>
   <option value="Midway Islands">Midway Islands</option>
   <option value="Moldova">Moldova</option>
   <option value="Monaco">Monaco</option>
   <option value="Mongolia">Mongolia</option>
   <option value="Montserrat">Montserrat</option>
   <option value="Morocco">Morocco</option>
   <option value="Mozambique">Mozambique</option>
   <option value="Myanmar">Myanmar</option>
   <option value="Nambia">Nambia</option>
   <option value="Nauru">Nauru</option>
   <option value="Nepal">Nepal</option>
   <option value="Netherland Antilles">Netherland Antilles</option>
   <option value="Netherlands">Netherlands (Holland, Europe)</option>
   <option value="Nevis">Nevis</option>
   <option value="New Caledonia">New Caledonia</option>
   <option value="New Zealand">New Zealand</option>
   <option value="Nicaragua">Nicaragua</option>
   <option value="Niger">Niger</option>
   <option value="Nigeria">Nigeria</option>
   <option value="Niue">Niue</option>
   <option value="Norfolk Island">Norfolk Island</option>
   <option value="Norway">Norway</option>
   <option value="Oman">Oman</option>
   <option value="Pakistan">Pakistan</option>
   <option value="Palau Island">Palau Island</option>
   <option value="Palestine">Palestine</option>
   <option value="Panama">Panama</option>
   <option value="Papua New Guinea">Papua New Guinea</option>
   <option value="Paraguay">Paraguay</option>
   <option value="Peru">Peru</option>
   <option value="Phillipines">Philippines</option>
   <option value="Pitcairn Island">Pitcairn Island</option>
   <option value="Poland">Poland</option>
   <option value="Portugal">Portugal</option>
   <option value="Puerto Rico">Puerto Rico</option>
   <option value="Qatar">Qatar</option>
   <option value="Republic of Montenegro">Republic of Montenegro</option>
   <option value="Republic of Serbia">Republic of Serbia</option>
   <option value="Reunion">Reunion</option>
   <option value="Romania">Romania</option>
   <option value="Russia">Russia</option>
   <option value="Rwanda">Rwanda</option>
   <option value="St Barthelemy">St Barthelemy</option>
   <option value="St Eustatius">St Eustatius</option>
   <option value="St Helena">St Helena</option>
   <option value="St Kitts-Nevis">St Kitts-Nevis</option>
   <option value="St Lucia">St Lucia</option>
   <option value="St Maarten">St Maarten</option>
   <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
   <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
   <option value="Saipan">Saipan</option>
   <option value="Samoa">Samoa</option>
   <option value="Samoa American">Samoa American</option>
   <option value="San Marino">San Marino</option>
   <option value="Sao Tome & Principe">Sao Tome & Principe</option>
   <option value="Saudi Arabia">Saudi Arabia</option>
   <option value="Senegal">Senegal</option>
   <option value="Seychelles">Seychelles</option>
   <option value="Sierra Leone">Sierra Leone</option>
   <option value="Singapore">Singapore</option>
   <option value="Slovakia">Slovakia</option>
   <option value="Slovenia">Slovenia</option>
   <option value="Solomon Islands">Solomon Islands</option>
   <option value="Somalia">Somalia</option>
   <option value="South Africa">South Africa</option>
   <option value="Spain">Spain</option>
   <option value="Sri Lanka">Sri Lanka</option>
   <option value="Sudan">Sudan</option>
   <option value="Suriname">Suriname</option>
   <option value="Swaziland">Swaziland</option>
   <option value="Sweden">Sweden</option>
   <option value="Switzerland">Switzerland</option>
   <option value="Syria">Syria</option>
   <option value="Tahiti">Tahiti</option>
   <option value="Taiwan">Taiwan</option>
   <option value="Tajikistan">Tajikistan</option>
   <option value="Tanzania">Tanzania</option>
   <option value="Thailand">Thailand</option>
   <option value="Togo">Togo</option>
   <option value="Tokelau">Tokelau</option>
   <option value="Tonga">Tonga</option>
   <option value="Trinidad & Tobago">Trinidad & Tobago</option>
   <option value="Tunisia">Tunisia</option>
   <option value="Turkey">Turkey</option>
   <option value="Turkmenistan">Turkmenistan</option>
   <option value="Turks & Caicos Is">Turks & Caicos Is</option>
   <option value="Tuvalu">Tuvalu</option>
   <option value="Uganda">Uganda</option>
   <option value="United Kingdom">United Kingdom</option>
   <option value="Ukraine">Ukraine</option>
   <option value="United Arab Erimates">United Arab Emirates</option>
   <option value="United States of America">United States of America</option>
   <option value="Uraguay">Uruguay</option>
   <option value="Uzbekistan">Uzbekistan</option>
   <option value="Vanuatu">Vanuatu</option>
   <option value="Vatican City State">Vatican City State</option>
   <option value="Venezuela">Venezuela</option>
   <option value="Vietnam">Vietnam</option>
   <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
   <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
   <option value="Wake Island">Wake Island</option>
   <option value="Wallis & Futana Is">Wallis & Futana Is</option>
   <option value="Yemen">Yemen</option>
   <option value="Zaire">Zaire</option>
   <option value="Zambia">Zambia</option>
   <option value="Zimbabwe">Zimbabwe</option>
      </select>

    )
  }
  useEffect(()=> {
    if (authenticated) {
      window.location = "/profile"
    }
  }, [])


  function handleGoToOne() {
    setSignupScreen(1)
    setNotice("")
  }


  function handleGoToTwo() {
    if (signupOneValidated) {
      setSignupScreen(2)
      setNotice("")
    } else {
      setNotice ("Please finish filling out the current screen")
    }
  }

  function handleGoToThree() {
    if (signupOneValidated && signupTwoValidated) {
      setSignupScreen(3)
      setNotice("")
    } else {
      setNotice ("Please finish filling out the current screen")
    }
  }
  function headingSwitch() {
      switch(signupScreen){
        case 1:
        return (
          <div className="flex-row">
          <h5 className="primary-foreground padding-right-6p">Step 1 of 3</h5>
          <h5 className="gray-foreground">- General</h5>
          </div>
        )
        break;
        case 2:
        return (
          <div className="flex-row">
          <h5 className="primary-foreground padding-right-6p">Step 2 of 3</h5>
          <h5 className="gray-foreground">- Company</h5>
          </div>

        )
        break;
        case 3:
        return (
          <div className="flex-row">
          <h5 className="primary-foreground padding-right-6p">Step 3 of 3</h5>
          <h5 className="gray-foreground">- Social networks</h5>
          </div>
        )
        break;
      }
  }

  function screenSwitch() {
      switch(signupScreen){
        case 1:
        return (
          <>
          <div className={`row2 ${(windowDimensions.width >= 915)? "col1" : "col1-2"} single-input-outer`} onClick={()=> orgNameRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Organization Name*</p>
            <input className="p" value={orgName} onChange={(e) => setOrgName(e.target.value)} ref={orgNameRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row2 col2" : "row3 col1-2"} single-input-outer`} onClick={()=> nameRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Representative Full Name*</p>
            <input className="p" value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row3 col1" : " row4 col1-2"} single-input-outer`} onClick={()=> emailRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Representative Email*</p>
            <input className="p" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} ></input>
          </div>

          <div className={`${(windowDimensions.width >= 915)? "row3 col2" : "row5 col1-2"} single-input-split `}>
            <div className="col1">
            <p className="primary-foreground p2 form-label-margin">Charity's Head Office Address*</p>
            <input className="p" value={address} onChange={(e) => setAddress(e.target.value)} ref={addressRef} ></input>
            </div>
            <div className="col2">
            <p className="primary-foreground p2 form-label-margin">Country</p>
            {countrySelect()}
            </div>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row4 col1" : " row6 col1-2"} single-input-outer`} onClick={()=> passwordRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Password*</p>
            <div className="flex-row">
              <input className="p" type={(showPass1)? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} ></input>
              <img src={Eye} className="pointer eye-icon" onClick={()=> setShowPass1(!(showPass1))} />
            </div>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row4 col2" : "row 7row3 col1-2"} single-input-outer`} onClick={()=> password2Ref.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Confirm Password*</p>
            <div className="flex-row">
              <input className="p" type={(showPass2)? "text" : "password"} value={password2} onChange={(e) => setPassword2(e.target.value)} ref={password2Ref} ></input>
              <img src={Eye} className="pointer eye-icon" onClick={()=> setShowPass2(!(showPass2))} />
            </div>
          </div>

          <div onClick={()=> handleVerification1()} className={`${(windowDimensions.width >= 915)? "row5 col1-2" : "row8 col1-2"} flex-row horizontal-end vertical-center pointer margin-top-5`}>

            <h5 className="link underline tertiary-foreground">Next step</h5>
            <img src={Arrow} className="next-icon" />
          </div>
          </>
        )
        break;
        case 2:
        return (
          <>
          <div className={`row2 ${(windowDimensions.width >= 915)? "col1" : "col1-2"} single-input-outer`} onClick={()=> compRegRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Company Registration No.</p>
            <input placeholder="Leave blank if this does not apply to your organization" className="p" value={compRegNo} onChange={(e) => setCompRegNo(e.target.value)} ref={compRegRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row2 col2" : "row3 col1-2"} single-input-outer`} onClick={()=> einRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">EIN: For U.S. Charities</p>
            <input placeholder="Leave blank if this does not apply to your organization" className="p" value={ein} onChange={(e) => setEin(e.target.value)} ref={einRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row3 col1" : " row4 col1-2"} single-input-outer`} onClick={()=> nonprofRegRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Nonprofit Registration No.</p>
            <input placeholder="Leave blank if this does not apply to your organization" className="p" value={nonprofRegNo} onChange={(e) => setNonprofRegNo(e.target.value)} ref={nonprofRegRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row3 col2" : " row5 col1-2"} single-input-outer`}>
            <div className="flex-row vertical-center h55">
              <img className="prof-img-preview" src={(profileImg)? URL.createObjectURL(profileImg) : null} />
              <div className="file-input-container">

                <p className="primary-foreground p2">Upload a Profile Image</p>
                <input accept="image/*" className="file-upload" ref={profileRef} id="upload" type="file" onChange={(e) => setProfileImg(e.target.files[0])}/>
                <button onClick={()=> profileRef.current.click()} className="file-upload-button"><h6 className="secondary-foreground">Upload</h6></button>
              </div>
            </div>
          </div>



          <div className={`${(windowDimensions.width >= 915)? "row5 col1-2" : "row8 col1-2"} flex-row horizontal-end vertical-center margin-top-5`}>
            <img src={Back} onClick={()=> setSignupScreen(1)} className="back-icon-force pointer" />

            <h5 onClick={()=> handleVerification2()} className={`link underline tertiary-foreground pointer ${(windowDimensions.width >= 915)? "h5" : "h5-mobile"}`}>Next step</h5>
            <img src={Arrow} onClick={()=> handleVerification2()} className="next-icon pointer" />
          </div>
          </>

        )
        break;
        case 3:
        return (
          <>
          <div className={`row2 ${(windowDimensions.width >= 915)? "col1" : "col1-2"} single-input-outer`} onClick={()=> websiteRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Website URL</p>
            <input placeholder="https://mywebsite.com/" className="p" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} ref={websiteRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row2 col2" : "row3 col1-2"} single-input-outer`} onClick={()=> twitterRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Twitter URL</p>
            <input placeholder="https://twitter.com/your_username" className="p" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} ref={twitterRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row3 col1" : " row4 col1-2"} single-input-outer`} onClick={()=> instaRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Instagram URL</p>
            <input placeholder="https://www.instagram.com/your_username" className="p" value={instaUrl} onChange={(e) => setInstaUrl(e.target.value)} ref={instaRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row4 col1" : " row5 col1-2"} tc-row`}>
            <input type="checkbox" className="checkbox-input" value={confirmTc} onChange={(e) => setConfirmTc(!confirmTc)}></input>
              <p className="primary-foreground p">I have read and agree to the <a href="https://info-205.gitbook.io/asalp.io-t-and-cs/asalp.io-t-and-cs" target="_blank">Terms and Conditions</a> for asalp.io*</p>
          </div>

          <div className={`${(windowDimensions.width >= 915)? "row5 col1-2" : "row8 col1-2"} flex-row horizontal-end vertical-center margin-top-5`}>
            <img src={Back} onClick={()=> setSignupScreen(2)} className="back-icon-force pointer" />

            <h5 onClick={()=> handleVerification3()} className={`link underline tertiary-foreground pointer ${(windowDimensions.width >= 915)? "h5" : "h5-mobile"}`}>Finish</h5>
            <img src={Arrow} onClick={()=> handleVerification3()} className="next-icon pointer" />
          </div>
          </>
        )
        break;
        case 0:
        return (
          <>
          <div className={`row2 ${(windowDimensions.width >= 915)? "col1" : "col1-2"} single-input-outer`} onClick={()=> nameRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Full Name*</p>
            <input className="p" value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row2 col2" : " row3 col1-2"} single-input-outer`} onClick={()=> emailRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Email*</p>
            <input className="p" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} ></input>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row3 col1" : " row4 col1-2"} single-input-outer`} onClick={()=> passwordRef.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Password*</p>
            <div className="flex-row">
              <input className="p" type={(showPass1)? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} ></input>
              <img src={Eye} className="pointer eye-icon" onClick={()=> setShowPass1(!(showPass1))} />
            </div>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row3 col2" : "row5 col1-2"} single-input-outer`} onClick={()=> password2Ref.current.focus()}>
            <p className="primary-foreground p2 form-label-margin">Confirm Password*</p>
            <div className="flex-row">
              <input className="p" type={(showPass2)? "text" : "password"} value={password2} onChange={(e) => setPassword2(e.target.value)} ref={password2Ref} ></input>
              <img src={Eye} className="pointer eye-icon" onClick={()=> setShowPass2(!(showPass2))} />
            </div>
          </div>
          <div className={`${(windowDimensions.width >= 915)? "row4 col1" : " row6 col1-2"} single-input-outer`}>
            <div className="flex-row vertical-center h55">
              <img className="prof-img-preview" src={(profileImg)? URL.createObjectURL(profileImg) : null} />
              <div className="file-input-container">

                <p className="primary-foreground p2">Upload a Profile Image</p>
                <input accept="image/*" className="file-upload" ref={profileRef} id="upload" type="file" onChange={(e) => setProfileImg(e.target.files[0])}/>
                <button onClick={()=> profileRef.current.click()} className="file-upload-button"><h6 className="secondary-foreground">Upload</h6></button>
              </div>
            </div>
          </div>

          <div className={`${(windowDimensions.width >= 915)? "row5 col1" : " row7 col1-2"} tc-row`}>
            <input type="checkbox" className="checkbox-input" value={confirmTc} onChange={(e) => setConfirmTc(!confirmTc)}></input>
              <p className="primary-foreground p">I have read and agree to the <a href="https://info-205.gitbook.io/asalp.io-t-and-cs/asalp.io-t-and-cs" target="_blank">Terms and Conditions</a> for asalp.io*</p>
          </div>

          <div className={`${(windowDimensions.width >= 915)? "row6 col1-2" : "row8 col1-2"} flex-row horizontal-end vertical-center margin-top-5`}>

            <h5 onClick={()=> handleVerificationIndividual()} className={`link underline tertiary-foreground pointer ${(windowDimensions.width >= 915)? "h5-force" : "h5-force-mobile"}`}>Finish</h5>
            <img src={Arrow} onClick={()=> handleVerificationIndividual()} className="next-icon-force pointer" />
          </div>
          </>
        )
        break;
      }
  }

  const emailRe =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameRe = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*){1,2}$/;
  const passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  function handleVerificationIndividual() {
    setSignupOneValidated(false)
    console.log(name)
    setNotice("")
    if (!(name) || name === "") {
      setNotice ("Name is required.")
    } else if (!(nameRe.test(name))) {
      setNotice ("Name must be a valid first and last name")
    } else if (!(email) || email === "") {
      setNotice ("Email is required.")
    } else if (!(emailRe.test(email))) {
      setNotice("Email must be a valid email.")
    } else if (!(password) || password === "") {
      setNotice("Password is required.")
    } else if (!(passRe.test(password))) {
      setNotice("Password must contain 8 characters or more, one uppercase letter, one lowercase letter, and one number")
    } else if (!(password2) || password2 === "") {
      setNotice("Confirmation Password is required.")
    } else if (!(password === password2)) {
      setNotice("Passwords do not match")
    } else if (!(confirmTc === true)) {
      setNotice("Please read and accept the terms and conditions")
    } else {
      setNotice("")
      submit()
    }
  }

  function handleVerification1() {
    setSignupOneValidated(false)
    console.log(name)
    setNotice("")
    if (!(orgName) || orgName === "") {
      setNotice ("Organization name is required.")
    } else if (!(name) || name === "") {
      setNotice ("Name is required.")
    } else if (!(nameRe.test(name))) {
      setNotice ("Name must be a valid first and last name")
    } else if (!(email) || email === "") {
      setNotice ("Email is required.")
    } else if (!(emailRe.test(email))) {
      setNotice("Email must be a valid email.")
    } else if (!(address) || address === "") {
      setNotice ("Address is required.")
    } else if (!(password) || password === "") {
      setNotice("Password is required.")
    } else if (!(passRe.test(password))) {
      setNotice("Password must contain 8 characters or more, one uppercase letter, one lowercase letter, and one number")
    } else if (!(password2) || password2 === "") {
      setNotice("Confirmation Password is required.")
    } else if (!(password === password2)) {
      setNotice("Passwords do not match")
    }else {
      setNotice("")
      setSignupOneValidated(true)
      setSignupScreen(2)
    }
  }

  function handleVerification2() {
    setNotice("")
    setSignupTwoValidated(true)
    setSignupScreen(3)
  }


  function handleVerification3() {
  if (!(confirmTc === true)) {
     setNotice("Please read and accept the terms and conditions")
   } else {
    setNotice("")
    setSignupThreeValidated(true)
    submit()
   }
  }

  function submit() {

    var body = new FormData()
    body.append('profile_pic', profileImg)
    if (type === "Individual") {
      body.append('org_name', name)
    } else {
      body.append('org_name', orgName)
    }
    body.append('company_reg', compRegNo)
    body.append('ein', ein)
    body.append('nonprof_reg', nonprofRegNo)
    body.append('website_url', websiteUrl)
    body.append('twitter_url', twitterUrl)
    body.append('instagram_url', instaUrl)
    body.append('email', email)
    body.append('first_name', name.split(" ")[0])
    body.append('last_name', name.split(" ")[1])
    body.append('address', address)
    body.append('country', country)
    body.append('password', password)
    body.append('confirm_tc', confirmTc)
    body.append('is_individual', (type === "Individual")? true : false)

    console.log(country)

      fetch(`${domain}/user/register/organization/update/`, {
        method: 'POST',
        headers: {
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: 'same-origin',
        body:body
        })
        .then(res => {
          return res.json()
        })
        .then(json => {
          //Clear Form
          if ("msg" in json) {
            if (json.msg === "Success") {
              window.location = "pending-verification"

            } else {
              setNotice(json.msg)
              throw("Err")

            }
          } else {
            setNotice("Invalid Data or User Already Exists")
            throw("Err")

          }

        })
        .catch(error => {
          //setNotice("Unable to submit form")
          console.log(error)
        })
    }

    function switchSelector () {
      if (type === "Charity") {
        setType("Individual")
        setSignupScreen(0)

      } else {
        setType("Charity")
        setSignupScreen(1)
      }
    }

return (
  <div className="signup">
    <NewHeader />
    <div ref={(props.propsRef)? props.propsRef : null} className="section-outer margin-bottom-20 flex-col center-center short-top" id="contact">
      <h2 className="primary-foreground text-center">Sign up</h2>
      <div className="flex-row padding-top-2 category-row center-center pointer" onClick={() => switchSelector()}>
           <h5 className={`${(type === "Charity") ? "primary-foreground" : "gray-foreground"} margin-right-20p`}>Charities</h5>
           <div className="slide-button-outer vertical-center flex-row">
           <div className={(type === "Charity") ? "slide-button-inner-left" : "slide-button-inner-right"} />
           </div>

           <h5 className={`${(type === "Individual") ? "primary-foreground" : "gray-foreground"} margin-left-20p`}>Individuals</h5>

         </div>
      <div className="flex-row horizontal-center">
        <p className="flex-row horizontal-center padding-right-6p margin-top-5">Already have an account?</p>
        <p className="link tertiary-foreground pointer margin-top-5" onClick={()=> window.location="login"}> Go to log in.</p>
      </div>
      {(type === "Charity") ?
      <div className="signup-line-outer center-center flex-col">

        <div className="signup-line" />
        <div className="center-center flex-col pointer" onClick={()=> handleGoToOne()}>
          <div className={(signupScreen === 1) ? "signup-ball" : "signup-ball-faded"} />
        </div>
        <div className="center-center flex-col pointer" onClick={()=> handleVerification1()}>
          <div className={(signupScreen === 2) ? "signup-ball" : "signup-ball-faded"} />
        </div>
        <div className="center-center flex-col pointer" onClick={()=> handleVerification2()}>
          <div className={(signupScreen === 3) ? "signup-ball" : "signup-ball-faded"} />
        </div>
      </div>
      :
      null
      }

      <div className={`${(windowDimensions.width > 915) ? "signup-form-outer" : "signup-form-outer-mobile"} margin-top-5`}>
        <div className="row1 col1-2">
          {headingSwitch()}
          <p className="secondary-foreground">{notice}</p>

        </div>
        {screenSwitch()}

      </div>

    </div>

    <Footer />
    <Community />
    <p className="text-center padding-top-2 padding-bottom-2">Copyright 2021 ©Asalp. All Rights Reserved</p>
  </div>

)
};
