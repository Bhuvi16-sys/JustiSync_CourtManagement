import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; // <--- Import API

export default function Login() {
  const navigate = useNavigate();
  
  const [role, setRole] = useState("client"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error dikhane ke liye

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Backend ko call karo (Real Check)
      const data = await loginUser(email, password);
      
      // 2. Token Save karo (Browser Memory mein)
      localStorage.setItem("token", data.token); 
      
      // 3. User Role Check karo (Security)
      // Agar user ne 'Judge' select kiya par wo asal mein 'Client' hai, toh error do
      if (data.user.role.toLowerCase() !== role.toLowerCase()) {
         setError(`Error: This account is registered as a ${data.user.role}`);
         return;
      }

      // 4. Success! Sahi page par bhejo
      if (role === "client") navigate("/client");
      else if (role === "judge") navigate("/judge");
      else if (role === "lawyer") navigate("/lawyer");

    } catch (err) {
      console.error("Login Failed", err);
      setError("Invalid Email or Password");
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(12px)", borderRadius: "20px", width: "380px", padding: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Logo Section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
           <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937" }}>JUSTISYNC</h1>
           <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#374151", marginTop: "1rem" }}>LOGIN</h2>
        </div>

        {/* ERROR Message */}
        {error && <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{error}</p>}

        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <input 
            type="email"
            placeholder="EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
          />
          
          <input 
            type="password" 
            placeholder="PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
          />

          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}
          >
            <option value="client">Login as Client</option>
            <option value="judge">Login as Judge</option>
            <option value="lawyer">Login as Lawyer</option>
          </select>

          <button 
            type="submit"
            style={{ width: "100%", backgroundColor: "#3b82f6", color: "white", fontWeight: "bold", padding: "0.8rem 1rem", borderRadius: "50px", border: "none", cursor: "pointer", marginTop: "0.5rem" }}
          >
            LOG IN
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Don't have an account? 
            <Link to="/register" style={{ color: "#3b82f6", fontWeight: "bold", marginLeft: "5px" }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}