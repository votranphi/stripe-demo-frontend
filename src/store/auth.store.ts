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
    set({ 
      token, 
      user, 
      isAuthenticated: true,
      isLoading: false 
    });
  },

  logout: () => {
    authService.logout();
    set({ 
      token: null, 
      user: null, 
      isAuthenticated: false 
    });
  },

  // Initialize auth state from localStorage
  initialize: () => {
    const token = authService.getToken();
    if (token) {
      set({ 
        token, 
        isAuthenticated: true,
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
    }
  },
}));
