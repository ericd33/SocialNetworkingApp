import React from "react";
import { auth } from './firebase/config'; //NO ELIMINAR (IMPORTANTE ROMPE TODO);
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import { MapaProvider } from "./Components/Events/map/contex";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxAccessToken } from "./Components/Events/map/constMap";
mapboxgl.accessToken = mapboxAccessToken;

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      light:'#fefbfe',
      main: '#fff',
      dark:'#a5a5a5'
    },
    secondary: {
      main: '#ffd000',
    },
    custom: {
      light:'#3b3b3b',
      main:'#2a2a2a',
      dark: '#101010'
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MapaProvider>
          <ThemeProvider theme={theme}>        
            <App />
          </ThemeProvider>
        </MapaProvider> 
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
