import { useState } from "react";
import { useAuthorization } from "../contexts/AuthorizationContext";

const useRequest = ({ url, method, envVariable }) => {
  const [loading, setLoading] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const { closeRegistration, closeRessetPassword } = useAuthorization(false);

  const envValue = process.env[envVariable];

  const sendRequest = async (body, custom) => {
    setLoading(true);

    const res = await fetch(url || custom, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${envValue}`,
      },
      body: !!body && method !== "GET" ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    setLoading(false);
    setSentRequest(true);

    setTimeout(() => {
      setSentRequest(false);
    }, 1000);

    setTimeout(() => {
      closeRegistration();
      closeRessetPassword();
    }, 1000);

    return data;
  };

  return { loading, sentRequest, sendRequest };
};

export default useRequest;
