import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";
// import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

// axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_MY_DOMAIN}
          clientId={process.env.REACT_APP_MY_CLIENTID}
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
