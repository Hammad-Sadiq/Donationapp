import React from 'react'
import Grid from '@mui/material/Grid';
import CompaignCard from './CompaignCard'

function Section4() {
  return (
    <Grid container className="section-outer" >
        <h2 className='text-center w-100 ftext fbold mb-4'>Campaigns by <span className='vTSec1'>Category</span></h2>
        <Grid container pt={4} >
            <Grid item md={12}>
                 <Grid container justifyContent={'space-between'} columnSpacing={10} rowSpacing={5} >
                        <Grid item md={4}>
                            <CompaignCard />
                        </Grid>
                        <Grid item md={4}>
                            <CompaignCard />
                        </Grid>
                        <Grid item md={4}>
                            <CompaignCard />
                        </Grid>
                        <Grid item md={4}>
                            <CompaignCard />
                        </Grid>
                        <Grid item md={4}>
                            <CompaignCard />
                        </Grid>
                        <Grid item md={4}>
                            <CompaignCard />
                        </Grid>
                 </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Section4