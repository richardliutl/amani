import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgi3ec71yWT0bDupqkpDt7jGT69Fgj_Bk",
  authDomain: "amani-web.firebaseapp.com",
  projectId: "amani-web",
  storageBucket: "amani-web.appspot.com",
  messagingSenderId: "614058163380",
  appId: "1:614058163380:web:41eab81a19795946146be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
