import React from 'react';

const GlassCard = ({ children, style = {}, className = "" }) => {
  return (
    <div 
      style={{
        background: "rgba(255, 255, 255, 0.65)", // Clean white glass
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s, box-shadow 0.2s",
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.15)"; // Blue glow on hover
        e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)";
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;