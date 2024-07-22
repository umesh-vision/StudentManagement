import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import withAuth from '../../context/AuthContextExtenstion';
import withNavigate from './NavigationExtenstion';
import { AuthContextProps } from '../../services/IContext';
import toast from 'react-hot-toast';
import { deleteAllCookies } from '../../services/cookie';

interface IProps{ 
  auth:AuthContextProps;
  navigate: (path: string) => void;
}


class Navigation extends Component<IProps,any>{ 
  async componentDidMount() {
    await deleteAllCookies();
    this.props.navigate('/');
  }


  handleLogout = () => {
    toast.success('Logged out successfully!');
    deleteAllCookies();
    this.props.auth.logout();
    this.props.navigate('/');
  };

  clearProfile = () => {
    this.props.auth.setProfile(undefined);  
  };

  render() { 
    const { user } = this.props.auth.state;
    if (user !==null) { 
        return (     
        <div className=''>       
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Nav><Link className="navbar-brand container" to='/'>Vision Student Management</Link></Nav> 
            <div className="navbar-nav"> 
              {
                user.role === 'student'?
                <>
                  <li className="nav-item">
                    <Link to={"/pages/student/dashboard"} className="nav-link">Student Board</Link>
                  </li> 
                  <li className="nav-item">
                    <Link to={"/pages/student/viewstudent"} className="nav-link">Student Profile</Link>
                  </li>                
                  <button className="btn navbar-btn btn-danger" onClick={this.handleLogout}><span className="glyphicon glyphicon-lock"></span>Logout</button>         
                </>:
                <>          
                  <li className="nav-item">
                    <Link to={"/pages/admin/dashboard"} onClick={this.clearProfile} className="nav-link">Admin Board</Link>
                  </li> 
                  <li className="nav-item">
                    <Link to={"/pages/student/viewstudent"} onClick={this.clearProfile} className="nav-link">Student Profile</Link>
                  </li>            
                  <button className="btn navbar-btn btn-danger" style={{float: "right"}} onClick={this.handleLogout}><span className="glyphicon glyphicon-lock"></span>Logout</button>                  
                </>
              }        
            </div>
          </nav>
        </div>
      )
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

