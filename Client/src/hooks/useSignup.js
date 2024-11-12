import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
    }
    if (response.ok) {
      //save uer to localstorage
      localStorage.setItem("user", JSON.stringify(data));

      //update auth context
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      setLoading(false);
    }
  };

  return { error, loading, signup };
};
