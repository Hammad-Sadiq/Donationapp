import React from 'react'
import Grid from '@mui/material/Grid';
import profileImg from '../assets/profileImg.png'
import largTick from '../assets/largTick.png'
import camp1 from '../assets/camp1.png'
import camp2 from '../assets/camp2.png'
import camp3 from '../assets/camp3.png'
import camp4 from '../assets/camp4.png'

function Profile() {
  return (
    <Grid container className="section-outer  padding-top-5" >
        <Grid container  >
            <Grid item md={7}  >
                <Grid container  spacing={3} >
                    <Grid item md={3}  >
                        <div className='imgO h-100' >
                            <div className='imgC h-100' >
                                <img src={profileImg} className='w-100 h-100' />
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={9}  >
                       <h2 className='text-left w-100 ftext fbold mb-2'>Charity Name <img src={largTick} className='largTick' /></h2> 
                       <p className='sec1CT ftext '>EIN # :</p>
                       <p className='sec1CT ftext '>Non-Profit Reg #:</p>
                       <p className='sec1CT ftext '>Country:</p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={5}   >
               <Grid container className='graphC' justifyContent={'space-between'}>
                    <div>
                        <h2 className='sec2CT ftext'>145k</h2>
                        <p className='smTSec1 ftext fbold text-center'>Algos Raised</p>
                    </div>
                    <div>
                        <h2 className='sec2CT ftext'>444</h2>
                        <p className='smTSec1 ftext fbold text-center'>C-NFTs  minted</p>
                    </div>
                    <div>
                        <h2 className='sec2CT ftext'>456</h2>
                        <p className='smTSec1 ftext fbold text-center'>Supporting NFTs</p>
                    </div>
                </Grid>
                <Grid container justifyContent={'end'} mt={3}>
                    <Grid item md={5}   >
                        <Grid container justifyContent={'space-between'} > 
                            <img src={camp1} className='CampSicon' />
                            <img src={camp2} className='CampSicon' />
                            <img src={camp3} className='CampSicon' />
                            <img src={camp4} className='CampSicon' />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container mt={3} >
            <div style={{border:'2px solid #004A99'}}  placeholder="Bio"  className='graphC px-3 m-0 w-100' >

            </div>
        </Grid>
        
    </Grid>
  )
}

export default Profile