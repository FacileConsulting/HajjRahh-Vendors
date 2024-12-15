import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './config';
import './index.css';
import store from './store';
import reportWebVitals from './reportWebVitals';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log('#@@@locationIndex', window.location.pathname);

root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
