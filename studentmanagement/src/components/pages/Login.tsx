import { Component} from 'react'
import { onChange,validationForm} from '../../utils/util'
import "../../styles/nav.css"
import withAuth from '../../context/AuthContextExtenstion';
import withNavigate from '../layouts/NavigationExtenstion';
import { AuthContextProps } from '../../services/IContext';
import { AuthReducersLogin } from '../../Redux/Reducers/auth/AuthReducersLogin';
import Validation from '../../utils/validation';

type LoginProps = { auth:AuthContextProps,  navigate: (path: string) => void;};
interface IContext{
  username:any,
  password:any,
  submitted:boolean
}
 
class Login extends Component<LoginProps,IContext>{ 
  constructor(props:LoginProps) {
    super(props);
    this.state = {    
      username:{name:"",value:""},
      password:{name:"",value:""},
      submitted:false
    }   
  }
  componentDidMount() {
    this.props.auth.logout();
  }
  
  render() {  
    const { username, password,submitted} = this.state;
    return(  
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Login</h1>    
            <form onSubmit={this.onLogin}>
              <div className="form-group">
                <label htmlFor='userName'>User Name</label>
                <input  
                  type='text'
                  name={"username"}
                  value={username.value}
                  onChange={this.onChange}
                  placeholder='User Name'
                  className="form-control invalid"                  
                />     
                <Validation fieldName='User name' fieldType='string' value={username.value} showValidation={submitted} />             
              </div>
              <div className='text-denger'></div>
              <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input
                  type='password' 
                  name={"password"}
                  value={password.value}
                  onChange={this.onChange}
                  placeholder='Password'
                  className="form-control"                             
                />
                <Validation fieldName='Password' fieldType='string' value={password.value} showValidation={submitted} />             
                <label className='danger'></label>            
              </div>      
              <div className="form-group" style={{ paddingTop: "5px" }} >
                <button className="btn btn-success" >Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  onChange=(e:any)=>{       
    const name=e.target.name;
    let value=e.target.value;
    onChange(this,name,value);
  }

  onLogin=async(e:any)=>{ 
    this.setState({submitted:true})    
    e.preventDefault(); 
    if(validationForm(this))
    {    
      const { username, password} = this.state;
      let model={
        userName:username.value,
        password:password.value       
      }        
      let dto=await AuthReducersLogin(model);
      if(dto.status){
        this.props.auth.login(username, dto.role,dto.token);
        dto.role==='admin'?this.props.navigate('/pages/admin/dashboard'):this.props.navigate('/pages/student/dashboard');  
      }       
    }
  }
}

export default withAuth(withNavigate(Login));

