export interface AuthContextType{
  token: string;
  isLoggedIn: boolean;
  isAdmin:boolean;
  login: () => void;
  logout: () => void;
};
  
// Define the User interface
export interface User {
  username: string;
  role: string;
}

// Define the AuthState interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token:string
}

// Define the AuthContextProps interface
export interface AuthContextProps {
  state: AuthState;
  login: (username: string, role: string,token:string) => void;
  logout: () => void;
}