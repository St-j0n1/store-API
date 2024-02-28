import { useCallback, useEffect, useState } from "react";

const useProductFetch = ({ url, method }) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFetch = useCallback(() => {
    setLoading(true);
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCTS}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response Failed");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return () => {
      setProducts(null);
      setError(null);
      setLoading(false);
    };
  }, [url, method]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  return { products, error, loading, resendRequest: onFetch };
};

export default useProductFetch;
