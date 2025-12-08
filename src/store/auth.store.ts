import { create } from 'zustand';
import { User } from '../types';
import { authService } from '../api/services';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setToken: (token) => set({ token }),

  login: (token, user) => {
    authService.setToken(token);
    localStorage.setItem('authUser', JSON.stringify(user));
    set({ 
      token, 
      user, 
      isAuthenticated: true,
      isLoading: false 
    });
  },

  logout: () => {
    authService.logout();
    localStorage.removeItem('authUser');
    set({ 
      token: null, 
      user: null, 
      isAuthenticated: false 
    });
  },

  // Initialize auth state from localStorage
  initialize: () => {
    const token = authService.getToken();
    const userStr = localStorage.getItem('authUser');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ 
          token, 
          user,
          isAuthenticated: true,
          isLoading: false 
        });
      } catch (error) {
        // If parsing fails, clear invalid data
        authService.logout();
        localStorage.removeItem('authUser');
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));
