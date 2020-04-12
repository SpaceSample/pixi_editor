import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GamePerview from './game_perview';
import FilePerview from './file_perview';
import Paper from '@material-ui/core/Paper';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel({value, index, children}) {
  if (index === value) {
    return (
      <div>
        {children}
      </div>
    )
  }
  return  null;
}

function LeftPanel() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="xxx">
          <Tab label="Game Perview" {...a11yProps(0)} />
          <Tab label="File Perview" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <GamePerview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FilePerview />
      </TabPanel>
    </Paper>
  );
}

export default LeftPanel;