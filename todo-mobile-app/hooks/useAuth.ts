import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
const API_URL = API_BASE_URL + '/api'

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });
  const segments = useSegments();

  useEffect(() => {
    const checkAuthAndProtectRoutes = async () => {
      try {
        const currentRoute = segments[0];
        console.log('🔍 [Route] Current route:', currentRoute);

        const token = await AsyncStorage.getItem('token');
        const userStr = await AsyncStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        setState({
          user,
          token,
          isLoading: false,
        });

        const protectedRoutes = ['profile', 'home', ''];
        const authRoutes = ['login', 'register'];

        if (!token) {
          if (protectedRoutes.includes(currentRoute)) {
            console.log('🔒 [Auth] No token found, redirecting from protected route to login');
            router.replace('/auth/login');
          }
        } else {
          if (authRoutes.includes(currentRoute)) {
            console.log('🔒 [Auth] User authenticated, redirecting from auth route to home');
            router.replace('/');
          }
        }
      } catch (error) {
        console.error('❌ [Auth] Error checking auth:', error);
        setState({
          user: null,
          token: null,
          isLoading: false,
        });
      }
    };

    checkAuthAndProtectRoutes();
  }, [segments]);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      setState({
        user,
        token,
        isLoading: false,
      });
    } catch (error) {
      console.error('❌ [Auth] Error checking auth:', error);
      setState({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔑 [Auth] Attempting login...');
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.token || !data.data?.user) {
        throw new Error('Invalid response format from server');
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.data.user));

      setState({
        user: data.data.user,
        token: data.token,
        isLoading: false,
      });

      console.log('✅ [Auth] Login successful, redirecting to home');
      router.replace('/');
    } catch (error) {
      console.error('❌ [Auth] Login error:', error);
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw new Error('Login failed: Unknown error');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (!data.token || !data.data?.user) {
        throw new Error('Invalid response format from server');
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.data.user));

      setState({
        user: data.data.user,
        token: data.token,
        isLoading: false,
      });

      router.replace('/');
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw new Error('Registration failed: Unknown error');
    }
  };

  const logout = async () => {
    try {
      console.log('🔒 [Auth] Attempting logout...');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setState({
        user: null,
        token: null,
        isLoading: false,
      });
      console.log('✅ [Auth] Logout successful, redirecting to index');
      router.replace('/');
    } catch (error) {
      console.error('❌ [Auth] Logout error:', error);
      throw error;
    }
  };

  return {
    ...state,
    checkAuth,
    login,
    register,
    logout,
  };
};