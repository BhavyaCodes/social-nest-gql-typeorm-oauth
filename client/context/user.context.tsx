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
} | null>(null);

export function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<null | User>(null);
  const value = { user, setUser };

  useEffect(() => {
    axios
      .get<User>(`api/auth/whoami`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((e) => {
        setUser(null);
      });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const getUser = () => useContext(UserContext);
