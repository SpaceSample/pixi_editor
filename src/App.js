import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Perview from './editor/perview';
import Tree from './editor/tree';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { DataContextProvider } from './editor/data_model';
import EditorToolbar from './editor/toolbar';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [data] = useState({
    id:'root',
    c:[
      {
        id:'a1',
        t:'Sprite',
        a:{
          x:100,
          y:100,
          image:"./assets/tank1.png"
        }
      }
    ]
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
              <Grid item xs={2}>
                <Paper>
                  <Tree></Tree>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper>
                  <Perview/>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>Right</Paper>
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
