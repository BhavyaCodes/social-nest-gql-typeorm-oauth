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

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios
      .get<User>(`${apiBaseUrl}/auth/whoami`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((e) => {
        setUser(null);
      });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const getUser = () => useContext(UserContext);
