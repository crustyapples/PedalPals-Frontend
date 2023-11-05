import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
  getEmail: () => Promise<string | null>;
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

  const login = async (token: string, email: string) => {
    await AsyncStorage.setItem('access_token', token);
    await AsyncStorage.setItem('email', email);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('email');
    setIsAuthenticated(false);
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  };

  const getEmail = async () => {
    const email = await AsyncStorage.getItem('email');
    return email;
  }



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken, getEmail }}>
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
    throw new Error('useAuthDetails must be used within an AuthProvider');
  }

  return context.getToken;
};

export const useAuthEmail = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthEmail must be used within an AuthProvider');
  }

  return context.getEmail;
}