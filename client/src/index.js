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
const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      light:'#fefbfe',
      main: '#fff',
      dark:'#a5a5a5'
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
    },
    custom: {
      light:'#2a2a2a',
      main: '#101010'
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
