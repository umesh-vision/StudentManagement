import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Navbar,Nav,Container} from 'react-bootstrap';
import { getCookie } from '../../services/cookie';

let role='';
class Navigation extends Component{

  componentDidMount=(async()=>{ 
    role=await getCookie("role");    
  });

  render() {
    return(        
        <Navbar bg="dark" variant="dark" expand="lg">            
          <Container>               
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
                <Nav><Link className="navbar-brand" to='/'>Vision Student Management</Link></Nav> 
                {role===''??<Nav><Link className="navbar-brand" to='/pages/Home'>Home</Link></Nav> }                
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
     )
  }
}
export default Navigation;