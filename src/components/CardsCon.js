import React from 'react'
import CompaignCard from './CompaignCard'
import Grid from '@mui/material/Grid';

function CardsCon() {
  return (
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
  )
}

export default CardsCon