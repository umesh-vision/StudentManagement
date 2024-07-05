import React, { Component } from 'react'
import {Routes,Route} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Login from './components/pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
class App extends Component{
  render() {
    return(        
      <Layout navigation={
        <Routes>
          <Route path='/'  element={<Login/>} ></Route>
        </Routes>
      } />
    );
  }
}
export default App;
