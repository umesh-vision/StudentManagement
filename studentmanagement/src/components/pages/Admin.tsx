import { Component} from 'react'
import withAuth from '../../context/AuthContextExtenstion';
class Admin extends Component<any,any>{  
    render(){
        return("Admin")
    }
}
export default withAuth(Admin);
