// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { saveToken, getToken, removeToken } from "../utils/tokenManager.js";
import { loginUser, registerUser, getUserProfile } from "../api/auth.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // When app loads, check for token
  useEffect(() => {
    const token = getToken();
    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  async function loadProfile() {
    try {
      const data = await getUserProfile();
      setUser(data.user);
    } catch {
      removeToken();
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const res = await loginUser(email, password);
    saveToken(res.token);
    await loadProfile();
  }

  async function register(name, email, password) {
    const res = await registerUser(name, email, password);
    saveToken(res.token);
    await loadProfile();
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
