import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "client") navigate("/client");
    else if (role === "judge") navigate("/judge");
    else if (role === "lawyer") navigate("/lawyer");
  };

  return (
    <div 
      style={{ 
        // Soft bluish-white gradient background
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)",
        minHeight: "100vh",
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      {/* Glassmorphism Card */}
      <div 
        style={{
          // Glass effect properties
          background: "rgba(255, 255, 255, 0.65)", // Semi-transparent white
          backdropFilter: "blur(12px)",             // The blur effect
          WebkitBackdropFilter: "blur(12px)",       // Safari support
          border: "1px solid rgba(255, 255, 255, 0.5)", // Subtle white border
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)", // Soft colored shadow
          
          borderRadius: "20px",
          width: "380px",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        
        {/* Logo Section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          
          {/* Icon */}
          <div style={{ color: "#3b82f6", marginBottom: "0.5rem" }}>
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M14.5 6.5l-5 5" />
              <path d="M14.5 9L12 11.5l-1.5-1.5 2.5-2.5z" />
              <path d="M8 12l2 2" /> 
            </svg>
          </div>

          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "2px", color: "#1f2937", textTransform: "uppercase", margin: "0" }}>
            Justisync
          </h1>
          <p style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "1px", color: "#6b7280", marginTop: "4px", textTransform: "uppercase" }}>
            Court Management System
          </p>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#374151", marginTop: "1.5rem" }}>
            LOGIN
          </h2>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <input 
            placeholder="USERNAME" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: "100%", 
              backgroundColor: "rgba(255, 255, 255, 0.8)", 
              border: "1px solid #e5e7eb", 
              padding: "0.8rem 1rem", 
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              outline: "none",
              color: "#374151",
              boxSizing: "border-box" // Ensures padding doesn't break width
            }}
          />
          
          <input 
            type="password" 
            placeholder="PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: "100%", 
              backgroundColor: "rgba(255, 255, 255, 0.8)", 
              border: "1px solid #e5e7eb", 
              padding: "0.8rem 1rem", 
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              outline: "none",
              color: "#374151",
              boxSizing: "border-box"
            }}
          />

          {/* Role Selector */}
          <div style={{ position: "relative" }}>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ 
                width: "100%", 
                backgroundColor: "rgba(255, 255, 255, 0.8)", 
                border: "1px solid #e5e7eb", 
                padding: "0.8rem 1rem", 
                borderRadius: "0.5rem", 
                color: "#4b5563",
                fontSize: "0.875rem",
                cursor: "pointer",
                appearance: "none", // Hides default arrow
                boxSizing: "border-box"
              }}
            >
              <option value="client">Login as Client</option>
              <option value="judge">Login as Judge</option>
              <option value="lawyer">Login as Lawyer</option>
            </select>
            {/* Custom Arrow for select */}
            <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280" }}>
              ▼
            </div>
          </div>

          <button 
            type="submit"
            style={{ 
              width: "100%", 
              backgroundColor: "#3b82f6", 
              color: "white", 
              fontWeight: "bold", 
              padding: "0.8rem 1rem", 
              borderRadius: "50px", 
              border: "none", 
              cursor: "pointer", 
              marginTop: "0.5rem", 
              boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)",
              transition: "transform 0.1s ease"
            }}
            onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
            onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          >
            LOG IN
          </button>
        </form>

        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "1.5rem", fontSize: "0.75rem", color: "#3b82f6" }}>
          <label style={{ display: "flex", alignItems: "center", color: "#6b7280", cursor: "pointer" }}>
            <input type="checkbox" style={{ marginRight: "0.5rem" }} />
            Remember me
          </label>
          <Link to="/forgot-password" style={{ color: "#3b82f6", textDecoration: "none" }}>Forgot password?</Link>
        </div>

        {/* --- ADDED: Register Link Section --- */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
            Don't have an account? 
            <Link to="/register" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "bold", marginLeft: "0.25rem" }}>
              Register
            </Link>
          </p>
        </div>
        {/* ------------------------------------ */}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#9ca3af" }}>© 2024 LegalTech Solutions</p>
        </div>
      </div>
    </div>
  );
}