import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-multi-carousel/lib/styles.css';
import 'rodal/lib/rodal.css'
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import 'react-alice-carousel/lib/alice-carousel.css';
import { GlobalContext } from './context/GlobalContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalContext>
    <App />
  </GlobalContext>
);

