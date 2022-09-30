import React from 'react'
import Grid from '@mui/material/Grid';
import TabCon from './TabCon';
import CompaignCard from './CompaignCard';

function CampSection2({ FCData, SCData, TCData, Ftitle, Stitle, Ttitle }) {
  console.log('FCData', FCData)
  return (
    <Grid container className="section-outer  padding-top-5"  >
      {/* <TabCon/> */}
      <Grid container justifyContent={'flex-start'} columnSpacing={10} >
        <h6 className='w-100 text-center randomCatTitle'>{Stitle}</h6>
        {/* {FCData?.length > 0 &&
          <Grid item md={4} >
            <h6 className='w-100 text-center randomCatTitle'>{Ftitle}</h6>
            {
              FCData?.map(itm => {
                return <div className='my-3'><CompaignCard category={itm?.category} campaign={itm} /></div>
              })
            }
          </Grid>
        } */}
        {SCData?.length > 0 &&
              SCData?.map(itm => {
                return <Grid item md={4} >
                  <div className='my-3'><CompaignCard category={itm?.category} campaign={itm} /></div>
                </Grid>
              })
        }
        {/* {TCData?.length > 0 &&
          <Grid item md={4} >
            <h6 className='w-100 text-center randomCatTitle'>{Ttitle}</h6>
            {
              TCData?.map(itm => {
                return <div className='my-3'><CompaignCard category={itm?.category} campaign={itm} /></div>
              })
            }
          </Grid>
        } */}
      </Grid>

      <Grid my={2} container justifyContent={'space-between'} columnSpacing={10} rowSpacing={5} >
        <Grid item md={4} >
          <p className='text-center ftext smTSec1'>Terms and conditions</p>
        </Grid>
        <Grid item md={4} >
          <p className='text-center ftext smTSec1'>@ 2022 asalp . All rights reserved</p>
        </Grid>
        <Grid item md={4} >
          <p className='text-center ftext smTSec1'>Privacy policy</p>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CampSection2