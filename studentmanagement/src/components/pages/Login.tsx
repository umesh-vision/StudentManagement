import { Component} from 'react'
import { onChange,validationForm} from '../../utils/util'
import { login } from '../../Redux/Reducers/Auth/AuthReducers';
import "../../styles/nav.css"
class Login extends Component<any,any>{  
  constructor(props:any) {
    super(props);
    this.state = {    
      username: {name :'username',value:'',required:true,error:''},
      password: {name :'password',value:'',required:true,error:''}
    }
  }

  render() {     
    const{username,password}=this.state;
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
                  name={username.name}
                  value={username.value}
                  onChange={this.onChange}
                  placeholder='User Name'
                  className="form-control invalid"                  
                />     
                <label className='danger'>{username.error}</label>              
              </div>
              <div className='text-denger'></div>
              <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input
                  type='password' 
                  name={password.name}
                  value={password.value}
                  onChange={this.onChange}
                  placeholder='Password'
                  className="form-control"                             
                />
                <label className='danger'>{password.error}</label>            
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
  
  onChange=(e:any)=>{   debugger     
    const name=e.target.name;
    let value=e.target.value;
    onChange(this,name,value);
  }

  onLogin=(async(e:any)=>{    
       e.preventDefault(); 
    if(validationForm(this)){
      const{username,password}=this.state;    
      let model={
        userName:username.value,
        password:password.value       
      }  
      if(await login(model)){
        console.log("Successed")
      }       
    }
  })
}
export default Login;
