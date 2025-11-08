import { useState, useEffect } from "react";

export default function useCount(key = "visit_count") {
  const [count, setCount] = useState(() => {
    try {
      return Number(localStorage.getItem(key) || 0);
    } catch { return 0; }
  });

  useEffect(() => {
    localStorage.setItem(key, String(count));
  }, [key, count]);

  const inc = (n = 1) => setCount(c => c + n);
  const reset = () => setCount(0);

  return { count, inc, reset };
}
