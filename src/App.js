import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Perview from './editor/perview';
import Tree from './editor/tree';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { DataContextProvider } from './editor/data_model';
import EditorToolbar from './editor/toolbar';
import AttrEditor from './editor/attr_view';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [data] = useState({
    id: 'root'
  });

  return (
    <div className="app">
      <MuiThemeProvider theme={darkTheme}>
        <DataContextProvider data={data}>
          <Grid container spacing={0}>
            <Grid container item xs={12} spacing={0}>
              <EditorToolbar />
            </Grid>
            <Grid container item xs={12} spacing={0}>
              <Grid item xs={3}>
                <Paper>
                  <Tree></Tree>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <Perview />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper>
                  <AttrEditor/>
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={0}>
              Footer here
            </Grid>
          </Grid>
        </DataContextProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
