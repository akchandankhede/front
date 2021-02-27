import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import './index.css';

const theme  = createMuiTheme({
    palette: {
        primary : {
            main :'#1261A3'
        },
        secondary: {
            main : '#248641'
        },
        default: {
            main: '#FFFFFF'
        }
    },
    typography :{
        fontFamily : "'Montserrat', sans-serif"
    },
})


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
