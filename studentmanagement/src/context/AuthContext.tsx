import { Component, createContext, ReactNode } from 'react';
import { AuthContextProps, AuthState, User } from '../services/IContext';

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

class AuthProvider extends Component<{ children: ReactNode }, AuthState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token:'',
      isSnackOpen:false,
      snackMessage:""
    };
  }

  login = (username:string,role:string,token:string,userId:number) => { 
    const user: User = {username,role,userId}; 
    this.setState({
      isAuthenticated: true,
      user,
      token:token
    });
  };

  setProfile=(state:any)=>{
    this.setState({profile:state})
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token:'',
      profile:undefined
    });
  };

  handleSnack=async(message:string)=>{   
    this.setState((prevState)=>({
      isSnackOpen:!prevState.isSnackOpen,
      snackMessage:message
    }));
  }

  render() {
    const value = {
      state: this.state,
      handleSnack:(message:string)=>this.handleSnack(message),
      login: this.login,
      logout: this.logout,
      setProfile: this.setProfile,
    };
    return <AuthContext.Provider value={value}>{this.props.children}</AuthContext.Provider>;
  }
}

export { AuthProvider, AuthContext };
