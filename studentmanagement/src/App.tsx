import React, { Component } from 'react'
import {Routes,Route} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Login from './components/pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Admin from './components/pages/Admin';
import Student from './components/pages/Student';
import { AuthProvider } from './context/AuthContext';
import Home from './components/pages/Home';

class App extends Component{
  render() {
    return(       
      <AuthProvider> 
        <Layout navigation={
          <Routes>       
              <Route path='/' element={<Login />} /> 
              <Route path='/pages/home'  element={<Home />} />
              <Route path="/pages/admin" element={<Admin />} />
              <Route path='/pages/student' element={<Student />} />
          </Routes>
        } />
      </AuthProvider>
    );
  }
}
export default App;
