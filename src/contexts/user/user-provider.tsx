import type { User } from '@/types';
import { useState } from 'react';
import { UserContext } from './user-context';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [fetchingUser, setFetchingUser] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, fetchingUser, setFetchingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
