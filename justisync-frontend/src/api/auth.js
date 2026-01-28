// src/api/auth.js

import { fetchClient } from "../utils/fetchClient";

export const loginUser = async (email, password) => {
  return fetchClient("/auth/login", "POST", { email, password });
};

export const registerUser = async (name, email, password) => {
  return fetchClient("/auth/register", "POST", { name, email, password });
};

export const getUserProfile = async () => {
  return fetchClient("/auth/profile", "GET");
};
