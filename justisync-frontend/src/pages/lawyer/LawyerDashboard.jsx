// File: src/pages/lawyer/LawyerDashboard.jsx
import React, { useEffect, useState } from "react";
import GlassCard from "../../components/GlassCard";
import { fetchClient } from "../../utils/fetchClient"; // <--- Import this

export default function LawyerDashboard() {
  // 1. Replace hardcoded data with State
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data on Load
  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchClient("/cases", "GET");
        setCases(data);
      } catch (err) {
        console.error("Failed to load cases", err);
      } finally {
        setLoading(false);
      }
    };
    loadCases();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading Dashboard...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Top Stats - Calculated dynamically from Real Data */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
        <GlassCard>
          <p style={label}>Active Cases</p>
          <h3 style={{ ...big, color: "#4f46e5" }}>{cases.length}</h3>
          <p style={{ color: "#16a34a", fontWeight: "bold" }}>Total Ongoing</p>
        </GlassCard>

        <GlassCard>
          <p style={label}>Pending Evidence</p>
          {/* Count cases where evidence is NOT 'Complete' */}
          <h3 style={{ ...big, color: "#2563eb" }}>
            {cases.filter(c => c.evidence !== 'Complete').length}
          </h3>
          <p style={{ color: "#ef4444", fontWeight: "bold" }}>Needs Attention</p>
        </GlassCard>

        <GlassCard>
          <p style={label}>Next Hearing</p>
          <h3 style={{ ...big, fontSize: "1.5rem", color: "#1e293b" }}>
             {/* Show date of first case or 'No Date' */}
             {cases.length > 0 ? cases[0].date : "No Hearings"}
          </h3>
        </GlassCard>
      </div>

      {/* Activity Table */}
      <GlassCard>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "#334155" }}>My Cases</h3>
          <button style={viewBtn}>View All</button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={theadRow}>
              <th style={th}>Client / Case No</th>
              <th style={th}>Type</th>
              <th style={th}>Status</th>
              <th style={th}>Evidence</th>
              <th style={th}>Hearing Date</th>
            </tr>
          </thead>

          <tbody>
            {cases.map((c, i) => (
              <tr key={c.case_id || i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                
                {/* 3. Update keys to match Backend Response */}
                <td style={tdBold}>{c.client_name || c.case_number || "Unknown"}</td>
                <td style={td}>{c.case_type || c.type}</td>

                <td style={td}>
                  <span style={statusBadge}>{c.status}</span>
                </td>

                <td style={td}>
                  <span
                    style={{
                      ...pill,
                      background:
                        c.evidence === "Complete" ? "#dcfce7" :
                        c.evidence === "Pending" ? "#fef3c7" : "#eff6ff",
                      color:
                        c.evidence === "Complete" ? "#15803d" :
                        c.evidence === "Pending" ? "#92400e" : "#2563eb"
                    }}
                  >
                    {c.evidence || "N/A"}
                  </span>
                </td>

                <td style={td}>{c.date || "Not Scheduled"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

/* ---------------- styles (Kept same as original) ---------------- */
const label = { fontSize: "0.75rem", fontWeight: "bold", color: "#64748b", textTransform: "uppercase" };
const big = { fontSize: "2.5rem", fontWeight: "800", margin: "8px 0" };
const viewBtn = { background: "white", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "8px", fontSize: "0.8rem", cursor: "pointer" };
const theadRow = { color: "#94a3b8", fontSize: "0.75rem", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" };
const th = { padding: "12px" };
const td = { padding: "16px", color: "#475569" };
const tdBold = { padding: "16px", fontWeight: "bold", color: "#1e293b" };
const statusBadge = { padding: "4px 8px", borderRadius: "4px", background: "#eff6ff", color: "#2563eb", fontSize: "0.75rem", fontWeight: "bold" };
const pill = { padding: "4px 8px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: "bold" };