import { Component} from 'react'
import withAuth from '../../../context/AuthContextExtenstion';
class StudentDashboard extends Component<any,any>{  
    render(){
        return("Student")
    }
}

export default withAuth(StudentDashboard);