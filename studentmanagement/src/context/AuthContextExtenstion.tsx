import React from 'react';
import { AuthContext } from './AuthContext';


function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return class AuthComponent extends React.Component<P> {
    render() {
      return (
        <AuthContext.Consumer>
          {context => {
            if (!context) {
              throw new Error('AuthContext must be used within an AuthProvider');
            }
            return <Component {...this.props} auth={context} />;
          }}
        </AuthContext.Consumer>
      );
    }
  };
}

export default withAuth;
