import { AdminState } from "./IComman";

// Define the User interface
export interface User {
  username: string;
  role: string;
  userId:number;
  
}

// Define the AuthState interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token:string;
  profile?: AdminState;
  isSnackOpen:boolean;
  snackMessage:string;
}

// Define the AuthContextProps interface
export interface AuthContextProps {
  state: AuthState;
  handleSnack:(snackMessage:string)=>void;
  login: (username: string, role: string,token:string,userId:number) => void;
  logout: () => void;
  setProfile:(state:any)=>void;
}