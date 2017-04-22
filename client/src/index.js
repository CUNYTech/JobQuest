import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import muiTheme from './components/Theme/Theme';
import Auth from './modules/Auth';


// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>), 
  document.getElementById('root')
);
