import { Component } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Login from './components/pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './components/pages/Home';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../src/styles/ag-grid.css"
import 'react-responsive-pagination/themes/classic.css';
import 'ckeditor5/ckeditor5.css';
import { AuthContextProps } from './services/IContext';
import withNavigate from './components/layouts/NavigationExtenstion';
import withAuth from './context/AuthContextExtenstion';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import ViewStudentDetail from './components/pages/student/ViewStudentDetail';
import StudentDashboard from './components/pages/student/studentpost/StudentDashboard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";

type IProps={ 
  auth:AuthContextProps
}

class App extends Component<IProps>{ 
  render() {
    return(  
      <>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />       
        <Layout navigation={
          <Routes>       
              <Route path='/' element={<Login />} />     
              <Route path='/pages/home' element={<Home />} />
              {this.props.auth.state.isAuthenticated?(<Route path="/pages/admin/dashboard" element={<AdminDashboard />}/>):(<Route path="/" element={<Login />} />)}
              {this.props.auth.state.isAuthenticated?(<Route path="/pages/student/viewstudent" element={<ViewStudentDetail />}/>):(<Route path="/" element={<Login />} />)}
              {this.props.auth.state.isAuthenticated?(<Route path='/pages/student/dashboard' element={<StudentDashboard />}/>):(<Route path="/" element={<Login />} />)}
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        } />
      </>
    );
  }
}
export default withAuth(withNavigate(App));
