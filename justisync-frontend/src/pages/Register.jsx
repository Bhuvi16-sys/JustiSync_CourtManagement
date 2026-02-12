// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  
  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // FIX 1: Use 127.0.0.1 instead of localhost to stop "Failed to fetch"
      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // FIX 2: Send 'role' so the backend knows if it's a Client/Lawyer
        body: JSON.stringify({ name, email, password, role }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }
      
      alert("Registration Successful! Please Login.");
      
      // Redirect based on role
      if (role === "client") navigate("/client");
      else if (role === "judge") navigate("/judge");
      else if (role === "lawyer") navigate("/lawyer");

    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(12px)", borderRadius: "20px", width: "380px", padding: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
        
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#374151", marginBottom: "1.5rem" }}>REGISTER</h2>

        {error && <div style={{ color: "red", background: "#fee2e2", padding: "8px", borderRadius: "5px", width: "100%", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input placeholder="FULL NAME" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="WORK EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="client">Register as Client</option>
            <option value="judge">Register as Judge</option>
            <option value="lawyer">Register as Lawyer</option>
          </select>
          
          <input type="password" placeholder="SECURE PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />

          <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: loading ? "#93c5fd" : "#3b82f6", color: "white", fontWeight: "bold", padding: "0.8rem", borderRadius: "50px", border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "CREATING..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
          Already have an account? <Link to="/" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #e5e7eb", padding: "0.8rem", borderRadius: "0.5rem", outline: "none" };