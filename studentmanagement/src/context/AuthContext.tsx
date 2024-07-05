// context/todoContext.tsx
import React from 'react';
import { IAuthDetail ,IAuthContextType} from '../services/context';
import { deleteCookie, getCookie, setCookie } from '../services/cookie';

export const AuthContext = React.createContext<IAuthContextType | null>(null);

export const getToken = (async() => {
  return await getCookie('token');
 });

export const getRole = (async() => {
  return await getCookie('role');
});
  

const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const loginHandler = (async (token:any) => {
       return await setCookie('token',token,1,'');
    });
    
    const logoutHandler = (async(token:any) => {      
        return await deleteCookie('token');
    });

    const [todos, setTodos] = React.useState<IAuthDetail[]>([
    {
        token: getToken(),
        isLoggedIn: false,
        isAdmin: false,
        isUser: false,
        login:loginHandler(getToken()),
        logout:logoutHandler(getToken())
    },
  ]); 
  return <AuthContext.Provider value={{todos}}>{children}</AuthContext.Provider>;
};

export default AuthContext;