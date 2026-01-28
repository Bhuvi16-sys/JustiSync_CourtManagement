import React from "react";
import GlassCard from "../../components/GlassCard";

export default function LawyerDashboard() {
  const clients = [
    {
      name: "John Doe",
      type: "Patent Dispute",
      status: "Discovery",
      evidence: "Uploaded",
      date: "22 Feb 2026",
      update: "2h ago"
    },
    {
      name: "Tech Corp",
      type: "Merger Review",
      status: "Reviewing",
      evidence: "Pending",
      date: "25 Feb 2026",
      update: "5h ago"
    },
    {
      name: "Sarah C.",
      type: "Liability",
      status: "Court Date",
      evidence: "Complete",
      date: "28 Feb 2026",
      update: "1d ago"
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Top Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px"
        }}
      >
        <GlassCard>
          <p style={label}>Active Clients</p>
          <h3 style={{ ...big, color: "#4f46e5" }}>12</h3>
          <p style={{ color: "#16a34a", fontWeight: "bold" }}>
            +2 New this month
          </p>
        </GlassCard>

        <GlassCard>
          <p style={label}>Pending Motions</p>
          <h3 style={{ ...big, color: "#2563eb" }}>05</h3>
          <p style={{ color: "#ef4444", fontWeight: "bold" }}>
            2 Due in 48h
          </p>
        </GlassCard>

        <GlassCard>
          <p style={label}>Billable Hours</p>
          <h3 style={{ ...big, color: "#1e293b" }}>34.5</h3>
        </GlassCard>
      </div>

      {/* Activity Table */}
      <GlassCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}
        >
          <h3 style={{ margin: 0, color: "#334155" }}>
            Recent Activity
          </h3>

          <button style={viewBtn}>View All</button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left"
          }}
        >
          <thead>
            <tr style={theadRow}>
              <th style={th}>Client</th>
              <th style={th}>Type</th>
              <th style={th}>Status</th>
              <th style={th}>Evidence</th>
              <th style={th}>Scheduled Date</th>
              <th style={{ ...th, textAlign: "right" }}>Updated</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={tdBold}>{c.name}</td>
                <td style={td}>{c.type}</td>

                <td style={td}>
                  <span style={statusBadge}>{c.status}</span>
                </td>

                <td style={td}>
                  <span
                    style={{
                      ...pill,
                      background:
                        c.evidence === "Complete"
                          ? "#dcfce7"
                          : c.evidence === "Uploaded"
                          ? "#eff6ff"
                          : "#fef3c7",
                      color:
                        c.evidence === "Complete"
                          ? "#15803d"
                          : c.evidence === "Uploaded"
                          ? "#2563eb"
                          : "#92400e"
                    }}
                  >
                    {c.evidence}
                  </span>
                </td>

                <td style={td}>{c.date}</td>

                <td style={{ ...td, textAlign: "right", color: "#94a3b8" }}>
                  {c.update}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

/* ---------------- styles ---------------- */

const label = {
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#64748b",
  textTransform: "uppercase"
};

const big = {
  fontSize: "2.5rem",
  fontWeight: "800",
  margin: "8px 0"
};

const viewBtn = {
  background: "white",
  border: "1px solid #cbd5e1",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  cursor: "pointer"
};

const theadRow = {
  color: "#94a3b8",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  borderBottom: "1px solid #e2e8f0"
};

const th = { padding: "12px" };

const td = {
  padding: "16px",
  color: "#475569"
};

const tdBold = {
  padding: "16px",
  fontWeight: "bold",
  color: "#1e293b"
};

const statusBadge = {
  padding: "4px 8px",
  borderRadius: "4px",
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: "0.75rem",
  fontWeight: "bold"
};

const pill = {
  padding: "4px 8px",
  borderRadius: "999px",
  fontSize: "0.7rem",
  fontWeight: "bold"
};
