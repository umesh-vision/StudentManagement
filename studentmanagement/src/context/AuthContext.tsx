import React, { Component, createContext, ReactNode } from 'react';
import { AuthContextProps, AuthState, User } from '../services/context';

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

class AuthProvider extends Component<{ children: ReactNode }, AuthState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token:''
    };
  }

  login = (username:string,role:string,token:string) => { 
    const user: User = {username,role}; 
    this.setState({
      isAuthenticated: true,
      user,
      token:token
    });
  };

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token:''
    });
  };

  render() {
    const value = {
      state: this.state,
      login: this.login,
      logout: this.logout,
    };

    return <AuthContext.Provider value={value}>{this.props.children}</AuthContext.Provider>;
  }
}

export { AuthProvider, AuthContext };
