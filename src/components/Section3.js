import React from 'react'
import Grid from '@mui/material/Grid';
import R1L1 from '../assets/R1L1.png'
import R1L2 from '../assets/R1L2.png'
import R1L3 from '../assets/R1L3.png'
import R1L4 from '../assets/R1L4.png'
import R2L1 from '../assets/R2L1.png'
import R2L2 from '../assets/R2L2.png'
import R2L3 from '../assets/R2L3.png'
import R3L1 from '../assets/R3L1.png'
import R3L2 from '../assets/R3L2.png'
import R3L3 from '../assets/R3L3.png'
import R3L4 from '../assets/image2.png'

function Section3() {
  return (
    <Grid container px={4} pt={5} >
        <h3 className='text-center w-100 ftext fbold mt-4'>Trusted <span className='vTSec1'>By</span></h3>
        <Grid item md={12}>
            <Grid container className='logoC py-4' justifyContent={'space-around'} alignItems={'center'} >
                <Grid className='text-center' item md={3}>
                    <img src={R1L1} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={3}>
                    <img src={R1L2} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={3}>
                    <img src={R1L3} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={3}>
                    <img src={R1L4} className='r1Imgs w-75'  />
                </Grid>
            </Grid>
            <Grid container className='logoC py-4 px-4 ' justifyContent={'space-around'} alignItems={'center'} >
                <Grid className='text-center' item md={4}>
                    <img src={R2L1} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={4}>
                    <img src={R2L2} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={4}>
                    <img src={R2L3} className='r1Imgs w-75'  />
                </Grid>
            </Grid>
            <Grid container className='logoC pt-4' justifyContent={'space-around'} alignItems={'center'} >
                <Grid className='text-center' item md={3}>
                    <img src={R3L1} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={3}>
                    <img src={R3L2} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={3}>
                    <img src={R3L3} className='r1Imgs w-75'  />
                </Grid>
                <Grid className='text-center' item md={3}>
                    <img src={R3L4} className='r1Imgs w-75'  />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Section3