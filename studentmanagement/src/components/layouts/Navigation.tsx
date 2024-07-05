import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Navbar,Nav,Container} from 'react-bootstrap';
import { getCookie ,deleteCookie} from '../../services/cookie';
import AuthContext from '../../context/AuthContext';
import { IAuthContextType } from '../../services/context';


type Props = {};


type State = {
  showStudentBoard: boolean,
  showAdminBoard: boolean,
  authCtx:any
}


  // componentDidMount=(async()=>{ 
  //   role=await getCookie("role");    
  // });

  // render() {
  //   return(        
  //       <Navbar bg="dark" variant="dark" expand="lg">            
  //         <Container>               
  //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //           <Navbar.Collapse id="basic-navbar-nav">
  //           <Nav className='me-auto'>
  //               <Nav><Link className="navbar-brand" to='/'>Vision Student Management</Link></Nav> 
  //               {role===''??<Nav><Link className="navbar-brand" to='/pages/Home'>Home</Link></Nav> }                
  //           </Nav>
  //           </Navbar.Collapse>
  //         </Container>
  //       </Navbar>
  //    )
  // }
  class Navigation extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showStudentBoard: false,
        showAdminBoard: false,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        authCtx: React.useContext(AuthContext) as IAuthContextType
      };
    }
    
    componentDidMount=(async()=>{
      const role = await getCookie('role'); 
      if (role!==undefined) {
        if(role==='student'){
          this.setState({showStudentBoard:true,showAdminBoard:false})
        }
        if(role==='admin'){
          this.setState({showAdminBoard:true,showStudentBoard:false})
        }
      }
    })
  
    logOut() {
      deleteCookie('role');
      deleteCookie('token');
      this.setState({
        showStudentBoard: false,
        showAdminBoard: false
      });
    }
  
    render() {
      const {showStudentBoard, showAdminBoard } = this.state;  
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Nav><Link className="navbar-brand" to='/'>Vision Student Management</Link></Nav> 
            <div className="navbar-nav mr-auto">
              {showStudentBoard && (
                <li className="nav-item">
                  <Link to={"/pages/student"} className="nav-link">Student Board </Link>
                </li>
              )}  
              {showAdminBoard && (
                <li className="nav-item">
                   <Link to={"/pages/Admin"} className="nav-link">Admin Board</Link>
                </li>
              )}  
              
            </div>
  
            {/* {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )} */}
          </nav>
        </div>
      );
    }
  }
  
export default Navigation;

function useContext(AuthContext: any) {
  throw new Error('Function not implemented.');
}
