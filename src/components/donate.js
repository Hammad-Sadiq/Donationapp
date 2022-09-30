import React, { useState, useContext, useRef, useEffect } from 'react';
import { Context } from "./globalContext/globalContext.js";
import algosdk from "algosdk";
import crypto from 'crypto';
import Cookies from "universal-cookie";
import Moralis from 'moralis/dist/moralis.min.js';

import Close from "../assets/close.png"
import AlgoSymbol from "../assets/algo_symbol.png"
import CheckSymbol from "../assets/check.png"
import MintingVid from "../assets/minting.webm"
import Button from "./button.js"


export default function DonatePopup(props) {

  const cookies = new Cookies();
  const globalContext = useContext(Context);
  const { windowDimensions, domain, showDonatePopup, setShowDonatePopup, donateCampaign, setDonateCampaign, walletBalance, setWalletBalance, fullWalletAddress, walletConnected, setWalletConnected, connectToMyAlgo, myAlgoWallet, metrics, setMetrics, gifTiers } = globalContext
  const [donationScreen, setDonationScreen] = useState(1)
  const [donationAmount, setDonationAmount] = useState(5)
  const [isMinting, setIsMinting] = useState(false)
  const [selectedDonate, setSelectedDonate] = useState(5)
  const [optInComplete, setOptInComplete] = useState(false)
  const [loadingOptIn, setLoadingOptIn] = useState(false)
  const [error, setError] = useState("")
  const [confirmTc, setConfirmTc] = useState(false)
  const [donationTier, setDonationTier] = useState()

  const vidRef = useRef(null)
  const ipfsUrl = useRef(null)

  //let algod_token = 'RiNJ5BPP6e789HH3uzgZQ9gFGUGWK99FasPEhHkp'
  //let algod_address = 'https://testnet-algorand.api.purestake.io/ps2'
  //let purestake_token = {'X-Api-key': algod_token}
  const unitName = "GFTCHN"
  const assetName = useRef()
  const nftTxn = useRef()
  const trxIds = useRef()
  const algodClient = new algosdk.Algodv2("", 'https://node.algoexplorerapi.io', '');
  //const algodClient = new algosdk.Algodv2("",'https://node.testnet.algoexplorerapi.io', '');

  function donateScreenSwitch() {
    switch (donationScreen) {
      case 1:
        //Donation Amount Picker
        return (
          <div className="center-center flex-col full-width">
            <h4 className="primary-foreground">Donate</h4>
            <p className="p2 primary-foreground margin-top-2">Please select the amount you would like to donate</p>
            {(error !== "") ?
              <p className="secondary-foreground text-center">{error}</p>
              :
              null
            }
            {(selectedDonate === "Other") ?
              <div className="flex-col center-center margin-top-10">
                <div className="donate-input-row flex-row center-center">
                  <input min="5" type="number" className="donate-input" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} />
                  <img className="algo-symbol-input" src={AlgoSymbol} />
                </div>
                <div className="flex-row margin-top-20p pointer">
                  <h6 onClick={() => { setDonationAmount(0); setSelectedDonate(3) }} className="primary-foreground">Go Back</h6>
                </div>
              </div>

              :

              <>
                <div className="flex-row donate-options-row center-center margin-top-20p">
                  <div onClick={() => { setSelectedDonate(5); setDonationAmount(5) }} className={`col1 pointer donate-button flex-row center-center ${(selectedDonate === 5) ? "donate-selected" : null}`}>
                    <h3>5</h3>
                    <img className="algo-symbol" src={AlgoSymbol} />
                  </div>
                  <div onClick={() => { setSelectedDonate(10); setDonationAmount(10) }} className={`col2 pointer donate-button flex-row center-center ${(selectedDonate === 10) ? "donate-selected" : null}`}>
                    <h3>10</h3>
                    <img className="algo-symbol" src={AlgoSymbol} />
                  </div>
                </div>

                <div className="flex-row donate-options-row center-center margin-top-20p">
                  <div onClick={() => { setSelectedDonate(50); setDonationAmount(50) }} className={`col1 pointer donate-button flex-row center-center ${(selectedDonate === 50) ? "donate-selected" : null}`}>
                    <h3>50</h3>
                    <img className="algo-symbol" src={AlgoSymbol} />
                  </div>
                  <div onClick={() => setSelectedDonate("Other")} className={`col2 pointer donate-button flex-row center-center ${(selectedDonate === "Other") ? "donate-selected" : null}`}>
                    <h3>Other</h3>
                  </div>

                </div>
              </>

            }
            {(walletConnected) ?
              <div onClick={() => handleDonation()} className="flex-row center-center margin-top-10 pointer">
                <img className="plus-icon" src={CheckSymbol} />
                <h5 className="tertiary-foreground"><u>Donate</u></h5>
              </div>
              :
              <div onClick={() => connectToMyAlgo().then(setWalletConnected(true))} className="flex-row center-center margin-top-10 pointer">

                <h5 className="tertiary-foreground"><u>Connect Wallet</u></h5>
              </div>

            }
          </div>
        )
        break;
      case 2:
        //Algo Wallet
        return (
          <div className="">

          </div>
        )
        break;
      case 3:
        //Mint Screen
        return
        break;
      case 4:
        //Opt In Screen
        return (
          <div className="center-center flex-col full-width">
            <h4 className="primary-foreground">Charity NFT</h4>
            <div className="row justify-content-center align-items-center" style={{flexWrap: 'nowrap'}}>
              <div className="donate-optin-rows-outer col center-center">
                <div className="donate-optin-rows">
                  <div className="row1 flex-col horizontal-center vertical-start">
                    <p className="primary-foreground">Asset Name: {assetName.current}</p>
                  </div>
                  <div className="row2 flex-col horizontal-center vertical-start optin-border-top">
                    <p className="primary-foreground">Unit Name: {unitName}</p>

                  </div>
                  {(optInComplete) ?
                    null
                    :
                    <>
                      <div className="row3 tc-row">
                        <input type="checkbox" className="checkbox-input" value={confirmTc} onChange={(e) => setConfirmTc(!confirmTc)}></input>
                        <p className="primary-foreground p">I have read and agree to the <a href="https://info-205.gitbook.io/asalp.io-t-and-cs/asalp.io-t-and-cs" target="_blank">Terms and Conditions</a> for giftchain*</p>
                      </div>

                      <div className="row4 flex-col horizontal-center vertical-end optin-border-top">
                        <Button disabled={((confirmTc === true) && (!(loadingOptIn))) ? false : true} sClasses={''} text="Donate & Mint" icon={null} fullWidth={true} buttonType="Highlight-Blue" link={() => handleOptIn()} />
                      </div>
                    </>
                  }
                </div>

              </div>
              <div className="col w-100">
                <img className="opt-in-img" src={gifTiers[donationTier].gif_url} style={{height: '180px'}} />
              </div>
            </div>
          </div>
        )
        break;
    }

  }

  function updateMetrics() {
    fetch(`${domain}/rankings/`, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.rankings)
        let assetFirstName = "CNFT"
        assetName.current = `${assetFirstName}${data.rankings['minted'] + 1}`

      })
      .catch((err) => {
        console.log(err);
      });

  }




  async function handleTxs(dataURL) {

    Moralis.initialize("2LEjtf3CKKYDo7XDI7cbuSflxzaLkyRNfLpebHXI"); //Application ID from Moralis
    Moralis.serverURL = "https://kskreoe1kecg.usemoralis.com:2053/server"; // Server URL from Moralis
    const imgData = { source64: gifTiers[donationTier].base64 };
    const ipfs = await Moralis.Cloud.run("ipfsupload", imgData)
    .then((result) => {
      ipfsUrl.current = result.path
      console.log(ipfsUrl.current)
    })



    const params = await algodClient.getTransactionParams().do();

    let asalpPmt = (donationAmount * 1000000) * donateCampaign['asalp_fee']
    let charityPmt = (donationAmount * 1000000) * (1 - donateCampaign['asalp_fee'])

    let note_data = JSON.stringify({
      "standard": "arc69",
      "properties": {
        "campaign": donateCampaign['campaign_name'],
        "category": donateCampaign['category'],
        "charity": donateCampaign['charity_name'],
        "donation_amount": donationAmount,
        "donation_currency": "Algo",
      }


    })

    var enc = new TextEncoder();
    let note = enc.encode(note_data)

    console.log("NOTE")
    console.log(note)

    let addr = fullWalletAddress;
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1;
    let assetURL = ipfsUrl.current;
    let manager = undefined;
    let reserve = fullWalletAddress;
    let freeze = undefined;
    let clawback = undefined;

    let metadataHash = undefined;

    console.log("ADDR")
    console.log(addr)
    console.log(donateCampaign['asalp_wallet'])
    console.log(donateCampaign['charity_wallet'])

    const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: {
        ...params,
      },
      from: fullWalletAddress,
      to: donateCampaign['asalp_wallet'],
      amount: asalpPmt
    });

    const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: {
        ...params,
      },
      from: fullWalletAddress,
      to: donateCampaign['charity_wallet'],
      amount: charityPmt
    });

    const nftTxn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
      totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
      clawback, unitName, assetName.current, assetURL, metadataHash, params);

    console.log(nftTxn)
    const txnsToGroup = [txn1, txn2, nftTxn];
    const groupID = algosdk.computeGroupID(txnsToGroup)
    for (let i = 0; i < 3; i++) txnsToGroup[i]['group'] = groupID;

    try {
      trxIds.current = await myAlgoWallet.current.signTransaction(txnsToGroup.map(txn => txn.toByte()))

      const response = await algodClient.sendRawTransaction(trxIds.current.map(txn => txn.blob)).do();
      updateDb()

    } catch (error) {
      setError("Failed to complete Transaction")
      setDonationScreen(1)
      console.log(error)
    }
  }

  function updateDb() {

    let ids = `${trxIds.current.map((val, ind) => { return `${val.txID}, ` })}`
    var body = new FormData()
    body.append('campaign_id', donateCampaign['id'])
    body.append('donation_amount', donationAmount)
    body.append('trx_ids', ids)
    body.append('donor_wallet_addr', fullWalletAddress)
    body.append('ipfs_url', ipfsUrl.current)
    body.append('confirm_tc', confirmTc)
    body.append('tier_id', gifTiers[donationTier].id)

    fetch(`${domain}/donate/`, {
      method: 'POST',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
      body: body
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log(json)

        setOptInComplete(true)
        setConfirmTc(false)
        setLoadingOptIn(false)
      })
      .catch(error => {
        //setNotice("Unable to submit form")
        console.log(error)
      })

  }


  function handleDonation() {
    updateMetrics()

    if (donationAmount < 5) {
      setError("Minimum Donation is 5A")
      return null
    } else if (donationAmount > walletBalance) {
      setError("You don't have enough in your wallet to cover this donation.")
      return null
    } else {
      setError("")
    }

    handleSelectTier()


  }

  function handleSelectTier() {
    console.log("HANDLE SELECT TIER")
    console.log(gifTiers)
    gifTiers.map((tier, id) => {
      console.log(tier.min_algo)
      console.log(tier.max_algo)
      console.log(donationAmount)
      if ((tier.min_algo <= donationAmount) && (tier.max_algo >= donationAmount) && (tier.num_available > 0)) {
        console.log("Found Tier")
        setDonationTier(id)
        setDonationScreen(4)

      }
    })
    console.log("DOMATION TIER")
    console.log(donationTier)
    if (!(donationTier)) {
      setError("Critical Error. Please contact an Admin.")
      console.log("ERROR")
    }




  }

  async function handleOptIn() {

    try {

      setLoadingOptIn(true)
      handleTxs()

      //const indexer = new algosdk.Indexer("", "https://algoindexer.testnet.algoexplorerapi.io", "") //for testnet
      const indexer = new algosdk.Indexer("", "https://api.algoexplorer.io/idx2", "") //for mainnet
      const accountInfo = await indexer.lookupAccountByID(fullWalletAddress).do()
      const balance = accountInfo.account.amount / (10 ** 6)
      setWalletBalance(balance);
      console.log(fullWalletAddress, balance)

    } catch (error) {
      setError("Failed to complete Transaction")
      console.log(error)
    }
  }

  return (
    <>
      {(showDonatePopup) ?
        <div className="donate-popup flex center-center">
          <div onClick={() => { setShowDonatePopup(false); setIsMinting(false); setDonateCampaign({}); setLoadingOptIn(false); setConfirmTc(false); setDonationScreen(1); setOptInComplete(false); updateMetrics(); ipfsUrl.current = null }} className="donate-popup-outer" />
          <div className="donate-popup-inner flex-col center-center">
            <div onClick={() => { setShowDonatePopup(false); setIsMinting(false); setDonateCampaign({}); setLoadingOptIn(false); setConfirmTc(false); setDonationScreen(1); setOptInComplete(false); updateMetrics(); ipfsUrl.current = null }} className="close-button flex center-center pointer">
              <img src={Close} className="close-icon" />
            </div>
            {donateScreenSwitch()}
          </div>
        </div>
        :
        null
      }
    </>
  )

};
