import axios from 'axios';
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
} | null>(null);

export function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const value = { user, setUser, loading };

  useEffect(() => {
    axios
      .get<User>('/api/auth/whoami', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }
  if (context === null) {
    throw new Error('Context is null');
  }
  return context;
}

// export const getUser = () => useContext(UserContext);
