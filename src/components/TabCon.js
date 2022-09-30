import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CardsCon from './CardsCon';
import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabCon() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        className="tabsContainer"
      >
        <Tab
          {...a11yProps(0)}
          label="From  Category"
          wrapped
        />
        <Tab {...a11yProps(1)} label="More by Charity" />
        <Tab {...a11yProps(2)} label="NFT’s Supporting Charity" />
      </Tabs>
    </Box>
    <TabPanel value={value} className='tabP' index={0}>
        <CardsCon/>     
    </TabPanel>
    <TabPanel value={value} className='tabP' index={1}>
        <CardsCon/> 
    </TabPanel>
    <TabPanel value={value} className='tabP' index={2}>
        <CardsCon/> 
    </TabPanel>
    </Box>
  );
}
