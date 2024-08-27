import { Component} from 'react'
import { onChange,validationForm} from '../../utils/util'
import "../../styles/nav.css"
import withAuth from '../../context/AuthContextExtenstion';
import withNavigate from '../layouts/NavigationExtenstion';
import { AuthContextProps } from '../../services/IContext';
import { AuthReducersLogin } from '../../Redux/Reducers/auth/AuthReducersLogin';
import Validation from '../../utils/validation';
import { withTranslation } from 'react-i18next';
import AnimatedCP from '../MUI/comman/AnimatedCP';

type LoginProps = { 
  auth:AuthContextProps, 
  navigate: (path: string) => void;
  i18n: any; 
  t: (key: string) => string; 
};

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
    this.onLogin = this.onLogin.bind(this);    
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.auth.logout();
  }
  changeLanguage = (lng:any) => {debugger
    const { i18n } = this.props;
    i18n.changeLanguage(lng); 
  };

  render() {  
    const { t } = this.props; 
    
    const { username, password,submitted} = this.state;
    return(  
      <AnimatedCP element={
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 right'>    
            <b>Choose Language : &nbsp;</b>
            <button className="btn btn-success" onClick={() => this.changeLanguage('en')}>EN</button>
            &nbsp;<button className="btn btn-danger" onClick={() => this.changeLanguage('fr')}>FR</button> 
          </div>
          <div className='col-md-12'>
            <h1>{t('login')}</h1>        
            <form onSubmit={this.onLogin} id="login" name="login-form">
              <div className="form-group">
                <label htmlFor='userName'>{t('userName')}</label>
                <input  
                  type='text'
                  name={"username"}
                  value={username.value}
                  onChange={this.onChange}
                  placeholder={t('userName')}
                  className="form-control"                  
                />     
                <Validation fieldName='User name' fieldType='string' value={username.value} showValidation={submitted} />             
              </div>          
              <div className="form-group">
                <label htmlFor='password'>{t('password')}</label>
                <input
                  type='password' 
                  name={"password"}
                  value={password.value}
                  onChange={this.onChange}
                  placeholder={t('password')}
                  className="form-control"                             
                />
                <Validation fieldName='Password' fieldType='string' value={password.value} showValidation={submitted} />                       
              </div>      
              <div className="form-group" style={{ paddingTop: "5px" }} >
                <button className="btn btn-success" >Login</button>
              </div>
            </form>
          </div>        
        </div>
      </div>}
      />
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
        this.props.auth.login(username, dto.role,dto.token,dto.userId);  
        this.props.auth.handleSnack("Logged in successfully");
        
       //dto.role==='admin'?this.props.navigate('/pages/admin/dashboard'):this.props.navigate('/pages/student/dashboard'); 
        dto.role==='admin'?this.props.navigate('/mui/admin/adminhome'):this.props.navigate('/mui/student/dashboard');   

      }       
    }
  }
}

export default withAuth(withNavigate(withTranslation()(Login))); 

