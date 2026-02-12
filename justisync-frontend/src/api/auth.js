// File: src/api/auth.js

import { fetchClient } from "../utils/fetchClient";

// Login Function
export const loginUser = async (email, password) => {
  // Backend ko Email aur Password bhejta hai
  return fetchClient("/auth/login", "POST", { email, password });
};

// Register Function (UPDATED)
export const registerUser = async (name, email, password, role) => {
  // Backend ko Name, Email, Password, aur Role bhejta hai
  // 'role' bhejna zaroori hai taaki backend sahi table update kare
  return fetchClient("/auth/register", "POST", { name, email, password, role });
};

// Profile Fetch Function (Optional, for Dashboard)
export const getUserProfile = async () => {
  return fetchClient("/auth/profile", "GET");
};