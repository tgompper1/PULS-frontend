import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext'

const container= document.getElementById('root');
const root = createRoot(container);
root.render(
  
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
  ,
);

/*
    We have used BrowserRouter to keep our UI in sync with the URL. 
    BrowserRouter helps with seamless transitions while switching between components. 
    Basically, it will only reload/refresh the component that needs to be changed 
    instead of refreshing/reloading the entire page. Though BrowserRouter is not a necessity, 
    it is a must if you want your app to be responsive.
*/