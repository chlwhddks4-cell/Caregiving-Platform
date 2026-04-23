// 새 파일 생성 src/context/AuthContext.tsx
import { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  // AuthContext.tsx 안에 이게 있어야 해요
useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsLoggedIn(true);
    setUser(JSON.parse(user));
  }
}, []);

  // 로그인 함수
  const login = (userData: any, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 다른 파일에서 쓸 수 있게 export
export const useAuth = () => useContext(AuthContext);