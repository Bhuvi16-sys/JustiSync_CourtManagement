import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  
  // State for form fields
  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Logic to route user based on their professional role
    if (role === "client") navigate("/client");
    else if (role === "judge") navigate("/judge");
    else if (role === "lawyer") navigate("/lawyer");
  };

  return (
    <div 
      style={{ 
        // Soft bluish-white gradient background (Matches Login)
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
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          
          borderRadius: "20px",
          width: "380px",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        
        {/* Logo Section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
          
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
            REGISTER
          </h2>
        </div>

        {/* Form Section */}
        <form onSubmit={handleRegister} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {/* Full Name Input */}
          <input 
            placeholder="FULL NAME" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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

          {/* Email Input */}
          <input 
            type="email"
            placeholder="WORK EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
                appearance: "none",
                boxSizing: "border-box"
              }}
            >
              <option value="client">Register as Client</option>
              <option value="judge">Register as Judge</option>
              <option value="lawyer">Register as Lawyer</option>
            </select>
            {/* Custom Arrow */}
            <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280" }}>
              ▼
            </div>
          </div>
          
          {/* Password Input */}
          <input 
            type="password" 
            placeholder="SECURE PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

          {/* Register Button */}
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
            CREATE ACCOUNT
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}