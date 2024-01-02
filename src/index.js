import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Provider Uzerinden Yapilan Erisim Islemlerinin 
// Tum Projede Gecerli Olmasi Icin
// Provider in index.js Dosyasinda Import Edilmesi Gerekiyor
import { Provider } from './context/task';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
