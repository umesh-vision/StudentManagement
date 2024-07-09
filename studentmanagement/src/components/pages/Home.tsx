import { Component} from 'react'
import withAuth from '../../context/AuthContextExtenstion';

class Home extends Component<any,any>{  
    render(){
        return("Home")
    }
}

export default withAuth(Home);
