'use client';

import type React from 'react';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService, type LoginResponse } from '@/services/auth-service';

interface AuthContextType {
  user: LoginResponse['user'] | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For now, we'll just check if there's a token
        // In a real app, you might want to validate the token with the server
        if (authService.isAuthenticated()) {
          // Here you would typically fetch the user profile
          // For now, we'll just set a placeholder user
          setUser({
            id: 1,
            email: 'user@example.com',
            first_name: 'John',
            last_name: 'Doe',
            role: 'learner',
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname?.startsWith('/auth');

      if (!user && !isAuthRoute && pathname !== '/') {
        router.push('/auth/login');
      } else if (user && isAuthRoute) {
        router.push('/');
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);

      // Redirect based on user role
      if (response.user.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (response.user.role === 'tutor') {
        router.push('/dashboard/tutor');
      } else {
        router.push('/dashboard/learner');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      await authService.register(userData);
      router.push('/auth/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
