import type { User } from '@/types';
import { createContext } from 'react';

interface UserContextType {
  user: User | null;
  fetchingUser: boolean;
  setFetchingUser: (fetchingUser: boolean) => void;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
