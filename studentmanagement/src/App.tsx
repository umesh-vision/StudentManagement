import { Component, Suspense } from 'react'
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminHome from './components/MUI/admin/AdminHome';
import ViewStudent from './components/MUI/student/ViewStudent';
import StudentDashboard from './components/MUI/student/StudentDashboard';
import { Snackbar } from '@material-ui/core';
import TimeTable from './components/MUI/timetable/TimeTable';
import ContactUs from './components/pages/ContactUs';
import DropZonePage from './components/pages/DropZonePage';
import AnimatedCP from './components/MUI/comman/AnimatedCP';

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

        <Snackbar
          anchorOrigin={{
           vertical: "top",
           horizontal: "right"
          }}
       
          open={this.props.auth.state.isSnackOpen}
          autoHideDuration={5000}
          onClose={()=>this.props.auth.handleSnack("")}
          message={this.props.auth.state.snackMessage}
        />
        <Suspense fallback={<div>Loading...</div>}>
  
        <Layout navigation={
          <Routes>  
              <Route path='/pages/home' element={<Home />} />
              <Route path='/' element={<Login />} />
              <Route path='/pages/contactus' element={<ContactUs />}/>
              <Route path='/pages/dropzone' element={<DropZonePage />}/>
              {this.props.auth.state.isAuthenticated?(<Route path="/pages/admin/dashboard" element={<AdminDashboard />}/>):(<Route path="/" element={<Login />} />)} 
              {this.props.auth.state.isAuthenticated?(<Route path="/mui/admin/adminhome" element={<AdminHome />}/>):(<Route path="/" element={<Login />} />)}
              {this.props.auth.state.isAuthenticated?(<Route path="/mui/student/viewstudent" element={<ViewStudent />}/>):(<Route path="/" element={<Login />} />)}
              {this.props.auth.state.isAuthenticated?(<Route path="/pages/student/viewstudent" element={<ViewStudentDetail />}/>):(<Route path="/" element={<Login />} />)}
            
              {this.props.auth.state.isAuthenticated?(<Route path='/mui/student/dashboard' element={<StudentDashboard />}/>):(<Route path="/" element={<Login />} />)}
              {this.props.auth.state.isAuthenticated?(<Route path='/mui/timetable' element={<TimeTable />}/>):(<Route path="/" element={<Login />} />)}
              {this.props.auth.state.isAuthenticated?(<Route path='/pages/student/dashboard' element={<StudentDashboard />}/>):(<Route path="/" element={<Login />} />)}
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        } />
        </Suspense>
      </>
    );
  }
}
export default withAuth(withNavigate(App));
