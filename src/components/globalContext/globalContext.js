import React, { createContext, useState, useRef, useEffect } from "react";

import MyAlgo from '@randlabs/myalgo-connect';
import Cookies from "universal-cookie";
import algosdk from "algosdk";

const Context = createContext()


const Provider = ({children}) => {


  useEffect(() => {
    getSession()
    getGifTiers()
  }, [])


  const connectToMyAlgo = async() => {
    try {
      const accounts = await myAlgoWallet.current.connect();
      const addresses = accounts.map(account => account.address);
      const addressString = JSON.stringify(addresses);
      const addressStringleft = addressString.substring(2, 6);
      const addressStringright = addressString.substring(addressString.length -6 , addressString.length - 2);
      const concatenateStringaddress = addressStringleft + '...' + addressStringright;
      console.log(accounts, 'accounts')

      setWalletAddress(concatenateStringaddress);
      setFullWalletAddress(addresses[0]);

      const microalgos = 10**6;

      async function printAccountBalance (addresses) {
        console.log('balance', 'balancebalance')
        const url = 'https://algoindexer.algoexplorerapi.io/'
        // const url = "https://algoindexer.testnet.algoexplorerapi.io"
        // const url = "https://api.algoexplorer.io/idx2"

        const indexer = new algosdk.Indexer("", url, "") //for testnet
        const accountInfo = await indexer.lookupAccountByID(addresses).do()
        const balance = accountInfo.account.amount / microalgos
        console.log(balance, 'balancebalance')
        setWalletBalance(balance);
      }

    printAccountBalance(addresses)
    setWalletConnected(true);


  } catch (err) {
    console.error(err, 'err');
    setWalletConnected(false);
  }
  }

  const getGifTiers = () =>{

    const cookies = new Cookies();

    fetch(`${domain}/get-gif-tiers/`, {
      method: 'GET',
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((data) => {
        setGifTiers([])
        if(data.length > 4){
          for (let i = 1; i <= 4 ; i++) {
            console.log(i)
            setGifTiers(e => [...e, data[i-1]])
          }
        } else {
          data.map(e => {
            setGifTiers(v => [...v, e])
          })
        }
      })
      .catch((err) => {
        setGifTiers([])
        console.log(err);
      })
  }


  function getSession()  {

    const cookies = new Cookies();


    fetch(`${domain}/session/`, {
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": cookies.get("csrftoken"),
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;

      return {
        width,
        height
      };
    }
    useEffect(() => {
     function handleResize() {
       setWindowDimensions(getWindowDimensions());
     }

     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
    }, []);

  // const domain = ""
  //const domain = "http://127.0.0.1:8000"
  //const domain = "https://asalp.io"
  const domain = "https://giftchain.charity"
  const [authenticated, setAuthenticated] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [blogListings, setBlogListings] = useState([])
  const [showDonatePopup, setShowDonatePopup] = useState(false)
  const [donateCampaign, setDonateCampaign] = useState({})
  const [walletAddress, setWalletAddress] = useState("...")
  const [fullWalletAddress, setFullWalletAddress] = useState("")
  const [ walletBalance, setWalletBalance ] = useState(0)
  const [ walletConnected, setWalletConnected ] = useState(false)
  const [metrics, setMetrics] = useState({})
  const [gifTiers, setGifTiers] = useState([])


  const faqs = {
    "Donor": {
      "Why would I use Algorand as opposed to fiat or other cryptocurrency?": `ALGO is a cryptocurrency native to the carbon neutral blockchain, Algorand. We have built our platform on it chiefly due to the fact that it is secure, has negligible fess and when scaled it is respectable to the environment. This was very important to us as we need a blockchain that is both financially feasible and sustainable so when we mint high volumes of Charity NFTs we are not damaging the environment. /
This unfortunately would not be the case if asalp were to be a D’App on Ethereum, for example, as the high gas fees would not make it worth it for a donor trying to support a charity. ETH and BTC operate on the Proof Of Work blockchain protocol meaning, in short, when transaction volume increases vast amounts of  electricity , typically from non renewable resources, are needed to confirm the next blocks. This is detrimental to the environment and is evidently not #greencrypto! / /
Furthermore fiat is not a great option as payment providers such as Visa, Mastercard, Paypal take excessive processing fees. The beauty of decentralized platforms harnicing blockchain technology is that we can use smart contracts and escrow addresses meaning there are no human intermediaries involved ever. In this way, the donations go directly to the charity's wallet instantly, thanks to Algroand’s transaction speed. /
As a result, due to the negligible fees, charities would actually receive more money after the transaction is processed than if it were to be done in fiat.`,
      "Which Charity should I donate to?": `Selecting a charity is a purely personal choice, perhaps you have loved ones affected by certain causes or there are certain campaigns that resonate with you more than others. We recommend that you take a look at all of our categories and select after a prolonged thought!`,
      "Is my wallet secure?": `Yes!`,
      "How can I buy Algorand?": `You can buy Algorand on any cryptocurrency exchange. Algorand is a carbon neutral cryptocurrency thus it fits in line with many charity’s business models and core values. `,
      "How do I know it's the actual organisation I am donating to?": `We do extensive checks, for our own compliance and to make sure only legitimate and authentic organisations make it on our page. We make sure we are corresponding with real representatives from the organisations and do further checks to make sure this is exactly  the organisation that they say they are. Charities are unable to launch a campaign until thorough vetting has occurred.`,
      "Any other payment currency options?": `Yes, USDC will be an option in the near future with $ASALP  as well. The charities will need to opt into the asset ID in order for donations to be sent in another currency.`
    },
    "Charity": {
      "What's in it for us?": `Benefits for you: /
                                /
                                -  Opens up a new donation demographic of crypto enthusiasts who can support your cause;  /
                                - 2 passive income streams: Direct donations and NFT royalties from resales;  /
                                - Provides alternative payment options for current donors;  /
                                - Shows you are open to new fundraising techniques and early to web3 D’Apps;  /
                                - Get 3% royalties from any resale of C-NFTs, on the platform;  /
                                - Pay virtually no fees for payments being processed,( unlike Paypal, Visa, Mastercard);  /
                                - What better if even your payment processor was green? /
                                - Our algorithm incentivises larger donations;  /
                                - Supporting carbon neutral blockchains;  /
                                - We are constantly creating new use cases for C-NFTs further encouraging people to contribute through this way;  /
                                - You do not have to use asalp exclusively, it can be used parallel with current practises; /
                                - A the forefront of a new asset class centred around fundraising and charitable giving; /
                                - Its free, no sign up or listing fees`,
      "How do we get the donations?": `The donations come straight into your wallet. They may be in Algorand or USDC tokens.`,
      "How quickly do we receive the donations?": `Instantly, there are no intermediaries involved.`,
      "What are the fees?": `The platform takes a 2.9% commission. This is to ensure the site can be maintained,  that we are constantly improving the generative design and integrating new use cases for C-NFTs. Moreover when our tokenomics is released one will see that a portion of our commission will go back into buying $ASALP tokens with the funds going towards into the incentives wallet. This creates a sustainable, cyclical rewards program and an attractive investment model for charities, donors and businesses.`,
      // "What is the C-NFT input?":`The input is the display picture of the campaign, this will be then used by our algorithm as an input for the donor's generative art to come from. We suggest using images that resonate with your campaign!`,
    },
    "Charity NFTs": {
      "What exactly are Charity NFTs?":`Charity NFTs are generative works of art in the form of Non Fungible Tokens, that are rewards automatically transferred to donors after they make a crypto-contribution to a charity, on asalp. No piece is the same and we have coded the inputs to tailor the donation amount to the intricacy of the design, giving it a truly personable experience. The Charity NFTs are minted at the time of the donation and the user will need to opt in for the asset after the   donation has been made. After the transfer to the donor’s wallet the user has a unique piece of digital NFT art also acting as a a personal donation certificate. /
                                        The donation amount which created the C-NFT should be the benchmark for any future resales. In this way C-NFT are tokens that hold their value and are a new asset class, earned through charitable giving which highlights the role it will have in a modern investment portfolio.`,
      "How do I know what C-NFT I will get?":`The Ai will randomly create and mint your Charity NFT at the time the donation is made. We aim to relate the intricacy of the art representative of the donation amount. A future update will be swapping your C-NFTs if you are not satisfied with your one.`,
      "Can I rent/ lease my Charity NFT?":`Yes, of course. All NFTs on the platform can be leased out. This is coming in the new year and demonstrates that C-NFTs are a yielding asset, making it a truly winning green investment.`,
      "Will you be introducing a token?":`Yes, we have huge plans for our $ASALP token. There will be DeFi games available, staking rewards, quick sell options for C-NFTs and even lotteries. /
                                          Providing multiple use cases for C-NFTs is key to incentivising donations from the public, which ultimately go into the hands of charities to be able tackle the most pressing environmental and social issues we are faced with today.`,
    }
  }

  const aboutRef = useRef()
  const blogRef = useRef()
  const roadmapRef = useRef()
  const faqRef = useRef()
  const contactRef = useRef()
  const campaignsRef = useRef()
  const communityRef = useRef()
  const rankingsRef = useRef()
  const headerRef = useRef()
  const myAlgoWallet = useRef(new MyAlgo())

  const globalContext = {
    windowDimensions,
    aboutRef,
    blogRef,
    roadmapRef,
    faqRef,
    contactRef,
    blogListings,
    faqs,
    domain,
    authenticated,
    setAuthenticated,
    campaignsRef,
    communityRef,
    rankingsRef,
    headerRef,
    showDonatePopup,
    setShowDonatePopup,
    donateCampaign,
    setDonateCampaign,
    walletAddress,
    setWalletAddress,
    myAlgoWallet,
    walletBalance,
    setWalletBalance,
    connectToMyAlgo,
    walletConnected,
    setWalletConnected,
    fullWalletAddress,
    setFullWalletAddress,
    metrics,
    setMetrics,
    gifTiers,
    setGifTiers
  };


  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export {Context, Provider};
