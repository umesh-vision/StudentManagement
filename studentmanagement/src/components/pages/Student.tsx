import { Component} from 'react'
import withAuth from '../../context/AuthContextExtenstion';
class Student extends Component<any,any>{  
    render(){
        return("Student")
    }
}

export default withAuth(Student);