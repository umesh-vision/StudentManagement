import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/style.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './i18n'; 
declare module 'react-animations';

ReactDOM.render(
  <React.StrictMode>  
    <BrowserRouter>
    <AuthProvider> 
      <App />
    </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') 
);

