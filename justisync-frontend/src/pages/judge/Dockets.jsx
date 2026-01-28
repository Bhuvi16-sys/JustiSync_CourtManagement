import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import GlassCard from "../../components/GlassCard"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dockets() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const dockets = [
    {
      id: "#DK2026-001",
      title: "State v. Reynolds",
      type: "Criminal",
      judge: "Hon. A. Kumar",
      status: "Active",
      nextHearing: "18 Jan 2026",
    },
    {
      id: "#DK2026-014",
      title: "Parker v. Global Tech",
      type: "Civil",
      judge: "Hon. R. Sharma",
      status: "Pending",
      nextHearing: "22 Jan 2026",
    },
    {
      id: "#DK2026-021",
      title: "Williams Custody",
      type: "Family",
      judge: "Hon. L. Mehta",
      status: "Scheduled",
      nextHearing: "26 Jan 2026",
    },
  ];

  return (

    <DashboardLayout role="Judge" title="Court Dockets">
      {/* TOP SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
         <button 
           onClick={() => navigate('/judge')} // Or navigate(-1) to go back one page
           style={{ background: "none", border: "1px solid #cbd5e1", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", color: "#64748b" }}
         >
           ← Back to Dashboard
         </button>
      </div>
        <GlassCard>
          <p style={labelStyle}>Total Dockets</p>
          <h2 style={valueStyle}>63</h2>
        </GlassCard>

        <GlassCard>
          <p style={labelStyle}>Active</p>
          <h2 style={{ ...valueStyle, color: "#16a34a" }}>41</h2>
        </GlassCard>

        <GlassCard>
          <p style={labelStyle}>Pending</p>
          <h2 style={{ ...valueStyle, color: "#f59e0b" }}>22</h2>
        </GlassCard>
      </div>

      {/* DOCKET TABLE */}
      <GlassCard>
        <h3 style={{ marginBottom: "16px", color: "#334155" }}>
          Current Docket List
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={headRow}>
              <th style={th}>Docket ID</th>
              <th style={th}>Case</th>
              <th style={th}>Type</th>
              <th style={th}>Judge</th>
              <th style={th}>Status</th>
              <th style={th}>Next Hearing</th>
            </tr>
          </thead>

          <tbody>
            {dockets.map((d, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={tdMono}>{d.id}</td>
                <td style={td}>{d.title}</td>
                <td style={td}>{d.type}</td>
                <td style={td}>{d.judge}</td>
                <td style={td}>
                  <span style={statusBadge(d.status)}>{d.status}</span>
                </td>
                <td style={td}>{d.nextHearing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </DashboardLayout>
  );
}

/* ---------------- STYLES ---------------- */

const labelStyle = {
  fontSize: "0.75rem",
  color: "#64748b",
  fontWeight: "bold",
  textTransform: "uppercase",
};

const valueStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#1e293b",
};

const headRow = {
  fontSize: "0.75rem",
  color: "#94a3b8",
  textTransform: "uppercase",
  borderBottom: "1px solid #e2e8f0",
};

const th = { padding: "12px" };

const td = {
  padding: "16px",
  fontSize: "0.9rem",
  color: "#475569",
};

const tdMono = {
  ...td,
  fontFamily: "monospace",
  color: "#64748b",
};

const statusBadge = (status) => ({
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "0.7rem",
  fontWeight: "bold",
  background:
    status === "Active"
      ? "#dcfce7"
      : status === "Pending"
      ? "#fffbeb"
      : "#eff6ff",
  color:
    status === "Active"
      ? "#16a34a"
      : status === "Pending"
      ? "#f59e0b"
      : "#2563eb",
});
