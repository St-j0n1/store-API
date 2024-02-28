import { useEffect, useState } from "react";

const useLocalStorage = (key, fallback) => {
  const storedValue = localStorage.getItem(key);
  let parsedValue;

  try {
    parsedValue = JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error parsing JSON for key '${key}':`, error);
    parsedValue = fallback;
  }

  const [value, setValue] = useState(parsedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
