import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Store from "./store"
import persistor from "./store"
import {Provider} from "react-redux"
import Profile from "./pages/profile/Profile"
import { PersistGate } from 'redux-persist/integration/react'
import Header from './Components/Header/Trail1';

ReactDOM.render(
    // Setting up global Store
    <Provider store={Store}>
    <React.StrictMode>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
    </React.StrictMode>
    
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
