import React from 'react';
import ReactDOM from 'react-dom';
import './css/generalStyle.css';
import './css/index.css';

import Router from './components/Router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);