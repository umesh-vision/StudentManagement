import React from 'react';
import {useNavigate} from 'react-router-dom';

const withNavigate = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigate;
