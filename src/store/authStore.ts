import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Định nghĩa các Role có trong hệ thống
export type UserRole = 'student' | 'instructor' | 'admin' | 'guest';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // MOCK DATA: Để bạn làm UI cho sướng, mình set mặc định là student nhé
      // Sau này chạy thật thì để null và false
      user: {
        id: '1',
        name: 'Học Viên Đẹp Trai',
        email: 'student@maco.com',
        role: 'student',
        avatar: 'https://github.com/shadcn.png',
      },
      isAuthenticated: true,
      token: 'mock-token-123',

      login: (user, token) => set({ user, token, isAuthenticated: true }),
      
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      
      updateUser: (newData) => set((state) => ({
        user: state.user ? { ...state.user, ...newData } : null
      })),
    }),
    {
      name: 'maco-auth-storage', // Lưu vào LocalStorage để F5 không bị mất login
    }
  )
);