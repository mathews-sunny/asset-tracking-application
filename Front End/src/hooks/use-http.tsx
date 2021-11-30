import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (
          response.status === 409 ||
          response.status === 400 ||
          response.status === 404
        ) {
          const errorData = await response.json();
          applyData({ status: false, message: errorData.message });
        }
        if (response.status === 201) {
          const data = await response.json();
          applyData({
            status: true,
            message: data.message,
            id: data.id || null,
            asset: data.asset || null,
          });
        }
        if (!response.ok) {
          throw new Error("Server Down");
        }

        const data = await response.json();
        if (data.message) {
          applyData({ status: true, message: data.message });
        }
        applyData(data);
      } catch (err) {
        if (typeof err === "string") {
          err.toUpperCase();
        } else if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
