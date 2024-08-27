import  { Component } from 'react';
import { Link } from 'react-router-dom';
import withNavigate from './NavigationExtenstion';
import withAuth from '../../context/AuthContextExtenstion';
import { text, wrapWithB, wrapWithH5 } from '../../custom-hooks/custom';
import { pipe } from '../../custom-hooks/pipe';
import { deleteAllCookies } from '../../services/cookie';
import { AuthContextProps } from '../../services/IContext';
import { getStudentById } from '../../Redux/Reducers/Student/StudentReducer';
import toast from 'react-hot-toast';
import { AppBar, Menu, MenuItem} from '@material-ui/core';

interface NavItem {
  label: string;
  path: string;
}

type NavbarProps={
  auth:AuthContextProps;
  navigate: (path: string) => void;
}

interface NavbarState {
  studentItems: NavItem[];
  studentItemsMUI:NavItem[];
  adminItems: NavItem[];
  adminItemsMUI: NavItem[];
  userName: string;
  url: string;
  showMenu:boolean
}

const transformString = pipe(text,wrapWithH5,wrapWithB);

class Navigation extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      studentItems:[
        { label: 'Student Board', path: '/pages/student/dashboard' },
        { label: 'Profile', path: '/pages/student/viewstudent' }
      ],
      studentItemsMUI:[
        { label: 'Student Board', path: '/mui/student/dashboard' },
        { label: 'Profile', path: '/pages/student/viewstudent' }
      ],
      adminItems:[
        { label: 'Admin Board',  path: '/pages/admin/dashboard' },
        { label: 'Student Profile', path: '/pages/student/viewstudent' }
      ],
      adminItemsMUI:[
        { label: 'Admin Home',  path: '/mui/admin/adminhome' },
        { label: 'Student Profile', path: '/mui/student/viewstudent' }
      ],
      userName: '',
      url: '',
      showMenu:false
    };
  }
  
  async componentDidMount() {    
    await deleteAllCookies();
    this.props.navigate('/');
  }

  async componentDidUpdate(prevProps: Readonly<NavbarProps>, prevState: Readonly<NavbarState>, snapshot?: any) {
    if(prevProps!==this.props)
    {    
      let id=this.props.auth.state.user?.userId;
      if(id!==undefined && id>0){
        const result=await getStudentById(id);
        this.setState({url:result.image})
        this.setState({userName:result.studentName})
      }
    }
  }

  handleLogout = () => {
    this.props.auth.handleSnack("Logged out successfully");
  //  toast.success('Logged out successfull');
    deleteAllCookies();
    this.props.auth.logout();
    this.props.navigate('/');
  };

  clearProfile = () => {
    this.props.auth.setProfile(undefined);  
  };
  handleMenu=()=>{
    this.setState((prevState)=>({
      showMenu:!prevState.showMenu
    }))
  }
  render() {
    const { user } = this.props.auth.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to='/' style={{paddingTop:"12px"}}>{transformString("Vision Student Management")}</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                {user !== null ? (
                  user.role === 'student' ? (
                    <>
                      {this.state.studentItemsMUI.map((item) => (
                        <AppBar style={{backgroundColor:"#212529",width:'75%'}} position="static" key={item.path}>                    
                          <Link className="nav-link" to={item.path}>
                            {item.label}
                          </Link>
                        </AppBar>
                      ))}
                    </>
                  ) : (
                    <>
                      {this.state.adminItemsMUI.map((item) => (
                        <AppBar style={{backgroundColor:"#212529",width:'75%'}} className="nav-item" position="static"  key={item.path}>                         
                            <Link className="nav-link" to={item.path} onClick={this.clearProfile}>
                              {item.label}
                            </Link>
                        </AppBar>                          
                      ))}
                      <Menu
                        id="basic-menu"
                        getContentAnchorEl={null} 
                        anchorEl={null}
                        open={this.state.showMenu}
                        onClose={this.handleMenu}                       
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}    
                        style={{ position: 'fixed', top: 55, right: 0 }}                
                      >                    
                        <MenuItem><Link to="/mui/timetable" className="nav-link">Time Table</Link></MenuItem>
                        <MenuItem className="btn btn-danger" onClick={this.handleLogout}>Logout</MenuItem>
                      </Menu>     
                    </>
                  )
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/pages/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/pages/contactus" className="nav-link">Contact Us</Link>
                    </li>      
                    <li className="nav-item">
                      <Link to="/pages/dropzone" className="nav-link">Drop Zone</Link>
                    </li>            
                  </>
                )}
              </ul>
              {user &&
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <label className="nav-link">{this.state.userName}</label>
                  </li>
                  <li className="nav-item">
                    <img src={this.state.url} onClick={this.handleMenu} className="nav-link" alt="User" width="60" height="40" style={{ padding:"1px", backgroundColor: 'white' }} />
                  </li>  
                    
                  {
                    user.role === 'student' &&  
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
                    </li>
                  }
                </ul>
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default withAuth(withNavigate(Navigation));


