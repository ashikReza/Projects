import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/index.js";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useDebugValue(auth, (auth) =>
    auth?.user ? "User Logged in" : "User not logged in"
  );

  // Logout function
  const logout = () => {
    setAuth(null); // Clear the authentication state
  };

  return { auth, setAuth, logout }; // Return the logout function
};
