import React, { useState, useEffect, useContext } from 'react';

import MenuButton from './menuButton.js'
import Button from './button.js'
import { Context } from "./globalContext/globalContext.js";
import Logo from "../assets/logo.png"
import GiftIcon from "../assets/gift.png"
import AlgoSymbol from "../assets/algo_symbol.png"
import Disconnect from "../assets/disconnect.png"
import Menu from "../assets/menu.png"


export default function Header(props) {

  const globalContext = useContext(Context);
  const { windowDimensions, aboutRef, myAlgoWallet, contactRef, authenticated, walletAddress, setWalletAddress, walletBalance, setWalletBalance, connectToMyAlgo, walletConnected, setWalletConnected } = globalContext

  const [ showWalletMenu, setShowWalletMenu ] = useState(false)
  const [ showHamburgerMenu, setShowHamburgerMenu ] = useState(false)



  useEffect(()=> {
    window.addEventListener('scroll', listenToScroll)
    return ()=> {
      window.removeEventListener('scroll', listenToScroll)
    }

  }, [])

  const listenToScroll = () => {
    setShowWalletMenu(false)
    setShowHamburgerMenu(false)
  }


  function handleDisconnect () {
    setWalletConnected(false)
  }

  return(


  <div onScroll={()=> {setShowWalletMenu(false); setShowHamburgerMenu(false)}} ref={props.propsRef} className={(windowDimensions.width >= 600)? "header-outer" : "header-outer-mobile"}>
  {(!(authenticated))?
  <div className="top-banner">
    <h5 className="white-foreground text-center">Support global causes with Algo</h5>
  </div>
  :
  null
}
    <div onClick={()=> window.location = "/"} className="col1 logo-container-header pointer">
      <img src={Logo} className="logo" />
    </div>

    {(windowDimensions.width >= 600)?
    <div className="col2 menu-container-outer flex-col vertical-end horizontal-end">

    <div className="flex-row full-width-null row1 horizontal-end">
    {(walletConnected)?
    <div className="wallet-outer pointer" onClick={()=> setShowWalletMenu(true)}>
    {(showWalletMenu)?
      <div className="wallet-menu-outer center-center flex-row col1-2" onMouseLeave={()=> setShowWalletMenu(false)} onClick={()=> handleDisconnect()}>
        <img src={Disconnect} className="wallet-menu-icon" />
        <h5 className="tertiary-foreground">Disconnect</h5>
      </div>
      :
      <>
      <div className="wallet-inner col1 right-metrics-divider center-center flex">
        <h6 className="primary-foreground vertical-center">{walletBalance} <img className="algo-symbol-sm" src={AlgoSymbol} /></h6>
      </div>
      <div className="wallet-inner col2 center-center flex">
        <h6 className="primary-foreground">{walletAddress}</h6>
      </div>
      </>
    }
    </div>
    :
    <MenuButton text=" Connect Wallet " icon={null} buttonType="Highlight-Green" link= {() => connectToMyAlgo().then(setWalletConnected(true)) }/>

     }

    {(authenticated)?
    <div className={`margin-left-20p padding-right-30p flex-row horizontal-end ${(walletConnected)? "header-button-container" : null}`}>
      <MenuButton text="Dashboard" icon={null} buttonType="Highlight-Blue" link={()=> window.location = "/profile"} />
    </div>
    :
    <div className={`margin-left-20p padding-right-30p flex-row horizontal-end ${(walletConnected)? "header-button-container" : null}`} >
      <MenuButton text="Sign Up" icon={null} buttonType="Highlight-Blue" link={()=> window.location = "/signup"} />
    </div>
    }

     </div>
    <div className="menu-container-main row2">
      <MenuButton text="Donate" icon={GiftIcon} link={() => window.location = "/#featured-campaigns"} />
      <MenuButton text="Rankings" icon={null} link={() => window.location = "/#rankings"} />
      <MenuButton text="Get Started" icon={null} link={() => window.location = "/#about"} />



      </div>

    </div>

    :
    <div className="col2 menu-container-main-mobile">
      <img src={Menu} className="hamburger-menu-icon pointer" onClick={()=> setShowHamburgerMenu(!showHamburgerMenu)}/>

      {(showHamburgerMenu)?
        <div className="hamburger-menu-outer" onMouseLeave={()=> setShowHamburgerMenu(false)}>

          {(authenticated)?
            <MenuButton text="Dashboard" icon={null} buttonType="Highlight-Blue" link={()=> window.location = "/profile"} />
            :
            <MenuButton text="Sign Up" icon={null} buttonType="Highlight-Blue" link={()=> window.location = "/signup"} />
          }
          <MenuButton text="Donate" icon={null} link={() => window.location = "/#featured-campaigns"} />
          <MenuButton text="Rankings" icon={null} link={() => window.location = "/#rankings"} />
          <MenuButton text="Get Started" icon={null} link={() => window.location = "/#about"} />

        </div>
        :
        null
      }




    </div>

    }

    {(windowDimensions.width <= 600)?
      (walletConnected)?
      <div className="wallet-outer pointer row2 co11-2 margin-top-neg" onClick={()=> setShowWalletMenu(!showWalletMenu)}>


      {(showWalletMenu)?
        <div className="wallet-menu-outer center-center flex-row col1-2" onMouseLeave={()=> setShowWalletMenu(false)} onClick={()=> handleDisconnect()}>
          <img src={Disconnect} className="wallet-menu-icon" />
          <h5 className="tertiary-foreground">Disconnect</h5>
        </div>
        :
        <>
        <div className="wallet-inner col1 right-metrics-divider center-center flex">
          <h6 className="primary-foreground vertical-center">{walletBalance} <img className="algo-symbol-sm" src={AlgoSymbol} /></h6>
        </div>
        <div className="wallet-inner col2 center-center flex">
          <h6 className="primary-foreground">{walletAddress}</h6>
        </div>
        </>
      }
    </div>
    :
    <div className="full-width-null col1-2 row2 margin-top-neg">
      <Button fullWidth={true} text=" Connect Wallet " icon={null} buttonType="Highlight-Green" link= {() => connectToMyAlgo().then(setWalletConnected(true))} />
    </div>
    :
    null
     }
  </div>
  )

};
