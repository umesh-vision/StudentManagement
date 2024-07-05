export interface IAuthDetail{
    token:any,
    isLoggedIn: false,
    isAdmin:false,
    isUser:false,
    login: any,
    logout: any
  }
  export type IAuthContextType = {
    todos: IAuthDetail[];
  };