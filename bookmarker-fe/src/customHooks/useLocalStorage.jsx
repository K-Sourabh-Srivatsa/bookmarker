import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        localStorage.removeItem(key);
        return initialValue;
      }

      const item = localStorage.getItem(key);
      
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new Event('localStorageChange'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setStoredValue(initialValue);
          localStorage.removeItem(key);
        } else {
          const item = localStorage.getItem(key);
          setStoredValue(item ? JSON.parse(item) : initialValue);
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;