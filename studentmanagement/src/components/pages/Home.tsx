import { Component} from 'react'
import withAuth from '../../context/AuthContextExtenstion';
import withNavigate from '../layouts/NavigationExtenstion';

class Home extends Component<any,any>{  
    render(){
        return("Home")
    }
}
export default withAuth(withNavigate(Home));
