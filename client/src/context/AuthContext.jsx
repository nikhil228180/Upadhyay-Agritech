import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getMe } from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe(token)
        .then((res) => {
          setUser({ ...res.data.data, token });
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    const userData = res.data.data;
    localStorage.setItem("token", userData.token);
    setUser(userData);
    return userData;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    const userData = res.data.data;
    localStorage.setItem("token", userData.token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const token = user?.token || localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, isAdmin, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}