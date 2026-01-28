import React from "react";
import GlassCard from "../../components/GlassCard";

export default function ClientDashboard() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
      
      {/* MAIN CASE CARD */}
      <GlassCard style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              background: "#dcfce7",
              color: "#15803d",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              border: "1px solid #bbf7d0"
            }}
          >
            ACTIVE CASE
          </span>

          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#1e293b",
              margin: "12px 0 4px 0"
            }}
          >
            Case #CR-2024-88
          </h3>

          <p style={{ color: "#64748b", margin: 0 }}>State v. Anderson</p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#475569",
              marginBottom: "8px"
            }}
          >
            <span>Case Progress</span>
            <span style={{ color: "#4f46e5" }}>65%</span>
          </div>

          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#f1f5f9",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: "65%",
                height: "100%",
                background: "linear-gradient(90deg, #3b82f6, #4f46e5)"
              }}
            />
          </div>

          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "12px" }}>
            Current Phase:{" "}
            <span style={{ color: "#334155", fontWeight: "bold" }}>
              Evidence Filing
            </span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Upload Documents
          </button>

          <button
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              background: "white",
              color: "#475569",
              border: "1px solid #cbd5e1",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            View Timeline
          </button>
        </div>
      </GlassCard>

      {/* SIDE */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <GlassCard style={{ textAlign: "center", padding: "40px 20px" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: "#94a3b8",
              textTransform: "uppercase"
            }}
          >
            Next Hearing
          </p>

          <h2
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              color: "#1e293b",
              margin: 0
            }}
          >
            14
          </h2>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#4f46e5"
            }}
          >
            JANUARY
          </p>
        </GlassCard>

        <GlassCard style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#e2e8f0"
            }}
          />

          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: "bold",
                color: "#94a3b8",
                textTransform: "uppercase"
              }}
            >
              Your Attorney
            </p>

            <p style={{ fontWeight: "bold", color: "#1e293b" }}>
              Harvey Specter
            </p>

            <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Pearson Hardman LLP
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
