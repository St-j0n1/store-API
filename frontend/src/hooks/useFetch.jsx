import { useCallback, useEffect, useState } from "react";

const useFetch = ({ url, method, envVariable }) => {
  const [fetchRequest, setFetchRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const envValue = process.env[envVariable];

  const onFetch = useCallback(() => {
    setLoading(true);
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${envValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response Failed");
        return res.json();
      })
      .then((data) => setFetchRequest(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return () => {
      setFetchRequest(null);
      setError(null);
      setLoading(false);
    };
  }, [url, method, envValue]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  return { fetchRequest, error, loading, resendRequest: onFetch };
};

export default useFetch;
