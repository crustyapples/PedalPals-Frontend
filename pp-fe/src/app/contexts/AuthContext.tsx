import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        setIsAuthenticated(true);
      }
    };

    loadToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('access_token', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthToken = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthToken must be used within an AuthProvider');
  }
  return context.getToken;
};
