import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import withAuth from '../../context/AuthContextExtenstion';
import withNavigate from './NavigationExtenstion';
import { AuthContextProps } from '../../services/IContext';

interface IProps{ 
  auth:AuthContextProps;
  navigate: (path: string) => void;
}

interface Props { 
 futureChange:any
}

class Navigation extends Component<IProps,Props>{ 
  handleLogout = () => {
    this.props.auth.logout();
    this.props.navigate('/');
  };
  render() {    
    const { user } = this.props.auth.state;
    if (user !==null) {     
      if (user.role === 'student') {
        return (
        <div className=''>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Nav><Link className="navbar-brand container" to='/'>Vision Student Management</Link></Nav> 
              <div className="navbar-nav mr-auto"> 
                <li className="nav-item">
                  <Link to={"/pages/student/dashboard"} className="nav-link">Student Board</Link>
                </li> 
                <button className="btn navbar-btn btn-primary" onClick={this.handleLogout}><span className="glyphicon glyphicon-lock"></span>Logout</button>
              </div>
          </nav>
        </div>)
      }
      if(user.role === 'admin'){
        return (
        <div className=''>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Nav><Link className="navbar-brand container" to='/'>Vision Student Management</Link></Nav> 
              <div className="navbar-nav mr-auto"> 
                <li className="nav-item">
                  <Link to={"/pages/admin/dashboard"} className="nav-link">Admin Board</Link>
                </li> 
                <button className="btn navbar-btn btn-primary" onClick={this.handleLogout}><span className="glyphicon glyphicon-lock"></span>Logout</button>
              </div>
          </nav>
        </div>)
      }
    }
    else{
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Nav><Link className="navbar-brand container" to='/'>Vision Student Management</Link></Nav> 
              <div className="navbar-nav mr-auto"> 
                <li className="nav-item">
                  <Link to={"/pages/home"} className="nav-link">Home</Link>
                </li>               
              </div>
          </nav>
        </div>
      )      
    }
  }  
}
export default withAuth(withNavigate(Navigation));

