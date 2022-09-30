import React from 'react'
import './cp.css';
import arrow from '../imges/arrow.png'
import arrowl from '../imges/arrowl.png'
import logo from "../imges/logo.png"
import Section3 from './Section3';
import NewHeader from './NewHeader';
const Component = () => {
    return (
        <>
        <NewHeader/>
        <br></br>
        <br></br>
        <br></br>
            <div>
                <p className='getting'>Getting Started As A Charity.</p>
            </div>

            <div className='zz'>
                <div className='sz'>
                    <p className='you'>You do not need to buy crypto, mint NFTs or pay a sign up fee to accept crypto donations on GiftChain</p>
                </div>
            </div>

            <div className='accept1'>
                <div className='accept'>
                    <p className='acceptt'>Accept crypto powered by a <span className='carbon'> carbon neutral </span>  blockchain</p>
                </div>
            </div>

            <div className='daro'>
                <div className="aro">
                    <img src={arrow} className="aroo"></img>
                </div>
            </div>

            <div className='tap1'>
                <div className='tapp'>
                    <p className='tap'> Tap into a <span className='carbon'>new</span> donation demographic </p>
                </div>
            </div>

            <div className='daro'>
                <div className="aro">
                    <img className="laro aroo" src={arrowl} ></img>
                </div>
            </div>

            <div className='accept1'>
                <div className='accept'>
                    <p className='acceptt'>Automatically <span className='carbon'> reward </span>  your donors with a Charity-NFT</p>
                </div>
            </div>

            <div className='daro'>
                <div className="aro">
                    <img src={arrow} className="aroo"></img>
                </div>
            </div>

            <div className='tap1'>
                <div className='tapp'>
                    <p className='tap'> C-NFT designs change weekly to keep your campaigns <span className='carbon'>topical</span></p>
                </div>
            </div>

            <div className='daro'>
                <div className="aros">
                    <img className="laro aroos nw" src={arrowl} ></img>
                </div>
            </div>

            <div className='t1'>
                <div className='tt'>
                    <p className='t'> C-NFTs act as<span className='carbon'>proof of participation</span> in a fundraiser whilst also being a collectable and limited NFT</p>
                </div>
            </div>

            <div className='daro'>
                <div className="aros">
                    <img className="laro arooss" src={arrowl} ></img>
                </div>
            </div>

            <div className='accept1'>
                <div className='accept'>
                    <p className='acceptt A'>Allow artists to mint and sell NFTs on  <span className='carbon'>your behalf</span>with proceeds going to your campaigns. </p>
                </div>
            </div>

            <div className='daro'>
                <div className="aros">
                    <img className="laro arooss vb" src={arrowl} ></img>
                </div>
            </div>

            <div className='tap1'>
                <div className='tapp'>
                    <p className='tap'><span className='carbon'>Sign up </span> in 2 minutes and create an ALGO address to get started. </p>
                </div>
            </div>


            <div className='zx zxc'>
                <div className='z1'>
                    <div className='z'>

                        <div>
                            <a className='anker'>To accept donations</a> <br></br>

                            <p className='ale'>1.Simply sign up with all social handles and registration numbers.
                                <br></br>
                                2. Upload & list your campaigns. <br></br>
                                3. Add your Algo address, create one at myalgowallet.com.<br></br>
                                4. Opt in to accepting stablecoins (optional and only possible if you already have an ALGO balance using a non-exchange wallet).
                            </p>
                            <div className='lng'>
                                <p className='wait'>Wait For Varification </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Section3 />
            <div className='nm'>
                <div className='first'>
                    <p className='founder'>Founder</p>
                    <p className='milo'> Milo Simpson-pedler</p>
                    <a href={'https://www.linkedin.com/in/milo-s-9903341ab'} className='dii'>
                        <img className='ii' src={logo} />
                    </a>

                </div>

                <div className='second'>
                    <p className='founder'>Advisor</p>
                    <p className='milo'> Wendy Diamond</p>
                    <a href={'https://www.linkedin.com/in/wendydiamond'} className='dii'>
                        <img className='ii' src={logo} />
                    </a>
                </div>
            </div>


        </>
    )
}

export default Component