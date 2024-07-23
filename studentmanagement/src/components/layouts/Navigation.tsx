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
  adminItems: NavItem[];
  userName: string;
  url: string;
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
       adminItems:[
        { label: 'Admin Board',  path: '/pages/admin/dashboard' },
        { label: 'Student Profile', path: '/pages/student/viewstudent' }
      ],
      userName: '',
      url: '',
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
                      {this.state.studentItems.map((item) => (
                        <li className="nav-item" key={item.path}>
                          <Link className="nav-link" to={item.path}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </>
                  ) : (
                    <>
                      {this.state.adminItems.map((item) => (
                        <li className="nav-item" key={item.path}>
                          <Link className="nav-link" to={item.path} onClick={this.clearProfile}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </>
                  )
                ) : (
                  <li className="nav-item">
                    <Link to="/pages/home" className="nav-link">Home</Link>
                  </li>
                )}
              </ul>
              {user && (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <img src={this.state.url} className="nav-link" alt="User" width="60" height="40" style={{ padding:"1px", backgroundColor: 'white' }} />
                  </li>
                  <li className="nav-item">
                    <label className="nav-link">{this.state.userName}</label>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default withAuth(withNavigate(Navigation));


