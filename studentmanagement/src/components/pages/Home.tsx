import { Component} from 'react'
import withAuth from '../../context/AuthContextExtenstion';
import withNavigate from '../layouts/NavigationExtenstion';
import { AuthContextProps } from '../../services/IContext';

interface IProps{ 
    auth:AuthContextProps;
}
  
class Home extends Component<any,any>{  
    render(){
        return("Home")
    }
}

export default withAuth(withNavigate(Home));
