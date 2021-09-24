import { useEffect, useState } from 'react';

export default function useLocalstorage<T>(
  key: string,
  initialVal: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialVal);

  useEffect(() => {
    const localStorageValue = window.localStorage.getItem(key);
    if (localStorageValue !== null) {
      setState(JSON.parse(localStorageValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
