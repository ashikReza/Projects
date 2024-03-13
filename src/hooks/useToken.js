import { useEffect } from "react";
import axios from "axios";
import { api } from "../api/index";
import { useAuth } from "./useAuth";

const useToken = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;

            setAuth({ ...auth, authToken: token });

            // Modify the original request headers
            originalRequest.headers.Authorization = `Bearer ${token}`;

            // Retry the original request with the modified headers
            return axios(originalRequest);
          } catch (error) {
            console.error("Error refreshing token:", error);
            // Handle error gracefully
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]);

  return { api };
};

export default useToken;
