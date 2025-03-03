export type UserRole = 'user' | 'admin';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt: string;
  isActive: boolean;
  profileImageUrl?: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (data: SignUpData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isAdmin: () => boolean;
} 