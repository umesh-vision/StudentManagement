import React, { Component } from 'react'
import {Routes,Route} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Login from './components/pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Admin from './components/pages/Admin';
import Student from './components/pages/Student';
class App extends Component{
  render() {
    return(        
      <Layout navigation={
        <Routes>
          <Route path='/'  element={<Login />} ></Route>
          <Route path='/pages/Admin'  element={<Admin />} ></Route>
          <Route path='/pages/Student' element={<Student />} ></Route>
        </Routes>
      } />
    );
  }
}
export default App;
