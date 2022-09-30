import React, { useState, useContext, useRef, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { First } from 'react-bootstrap/esm/PageItem'
import { Link, useNavigate } from "react-router-dom"
import blueBtnS from "../assets/blueBtnS.png"
import btnS from "../assets/btnS.png"
import asi from "../assets/asi.png"
import myalgo from "../assets/myalgo.png"
// import btnS from "../assets/btnS.png"

import "./cp.css"


function NewHeader() {
    const globalContext = useContext(Context);
    const { authenticated, windowDimensions, domain, showDonatePopup, setShowDonatePopup, donateCampaign, setDonateCampaign, walletBalance, setWalletBalance, fullWalletAddress, ipfsUrl, walletConnected, setWalletConnected, connectToMyAlgo, myAlgoWallet, metrics, setMetrics } = globalContext

    const [newdiv, setnewdiv] = useState(true)
    const chng = () => {
        setnewdiv(e => !e);
        console.log("i am", newdiv)
    }
    const [disconnect, setdisconnect] = useState(false)
    const dscnt = () => {
        setdisconnect(true);
    }
    const navigate = useNavigate();
    console.log(walletConnected, 'walletConnected')
    const good = () => {
        connectToMyAlgo()
        setnewdiv(true);
    }
    const bad = () => {
        setWalletConnected(false)
        setnewdiv(true);
    }
    return (
        <div>
            <Navbar bg="light" expand="lg" className='navPadding px-4'>
                <Container fluid>
                    <Navbar.Brand href="/"> <img height={50} src={require('../assets/giftchainlogo.png').default} alt='' /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ml-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <Nav.Link href="/" style={{fontSize:"15px"}}>Donate</Nav.Link>
                            {/* <Nav.Link href="/" style={{fontSize:"15px"}}>NFT Marketplace</Nav.Link> */}
                            {/* <Nav.Link href="#">NFT Marketplace</Nav.Link> */}
                            {/* <Nav.Link href="#action3">Get started</Nav.Link> */}
                            {/* <Link className='pop' to="/GettingStarted" > Get Started</Link> */}

                        </Nav>
                        <div className="d-flex">
                            <div className='clm'>
                                <>
                                    {
                                        walletConnected ?
                                            <div>
                                                <Button className='NavBtn zero' variant="outline-success" onClick={chng} > {walletBalance} <img className='mg' src={btnS} /></Button>
                                            </div>
                                            :
                                            <div>
                                                <Button className='NavBtn' variant="outline-success" onClick={chng}>Connect Wallet</Button>
                                            </div>
                                    }
                                </>
                                {/* <Button className='NavBtn' variant="outline-success" onClick={chng}>Connect Wallet</Button> */}
                                {
                                    !newdiv &&
                                    <>
                                        {walletConnected ?
                                            <div className='fntz'>
                                                <button className='btn btn-dark' onClick={bad}>disconnect</button>
                                            </div>

                                            : <div className='fnt'>
                                                <div className='nt'>
                                                    {/* <img className='kl' src={asi} style={{cursor: 'pointer'}} /> */}
                                                    <img className='kl' src={myalgo} onClick={good} style={{cursor: 'pointer'}} />
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            {authenticated
                            ?   <Button href='/profile/' className='NavBtn' variant="outline-success ml-3">Dashboard</Button>
                            :   <Button onClick={() => navigate('/signup')} className='NavBtn' variant="outline-success ml-3">Charity Sign up/in</Button>
                            }
                            {/* <div>  */}
                            {/* <Link className='NavBtn' variant="outline-success ml-3" to="/signup" > Charity Sign up/in</Link> */}
                            {/* </div> */}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NewHeader