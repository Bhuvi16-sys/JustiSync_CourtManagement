import React from 'react';
import GlassCard from '../../components/GlassCard';
import { useNavigate } from "react-router-dom";

export default function JudgeDashboard() {
  const navigate = useNavigate();
  
  // Hearings Data
  const hearings = [
    { time: "09:00 AM", id: "#CR2024-88", name: "State v. Anderson", client: "Mark Anderson", status: "Scheduled" },
    { time: "10:30 AM", id: "#CV2024-101", name: "Doe v. Smith Corp", client: "Jane Doe", status: "In Progress" },
    { time: "01:00 PM", id: "#CR2023-12", name: "State v. Henderson", client: "Liam Henderson", status: "Pending" },
    { time: "02:45 PM", id: "#FM2024-11", name: "Gellar Custody", client: "Ross Gellar", status: "Confirmed" },
  ];

  // Lawyers Data
  const lawyers = [
    { name: "Harvey Specter", firm: "Pearson Hardman", contact: "h.specter@ph.com", activeCases: 14 },
    { name: "Alicia Florrick", firm: "Lockhart/Gardner", contact: "a.florrick@lg.com", activeCases: 8 },
    { name: "Saul Goodman", firm: "Goodman Law", contact: "s.goodman@lbm.com", activeCases: 5 },
  ];

  return (
    <>
      {/* --- TOP STATS ROW --- */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "24px"
      }}>
        <GlassCard>
          <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Active Cases</p>
          <h2>128</h2>
        </GlassCard>

        <GlassCard>
          <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Pending Verdicts</p>
          <h2 style={{ color: "#ef4444" }}>12</h2>
        </GlassCard>

        <GlassCard>
          <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Monthly Hearings</p>
          <h2>45</h2>
        </GlassCard>

        <GlassCard>
          <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Clearance Rate</p>
          <h2>82%</h2>
        </GlassCard>
      </div>

      {/* --- MAIN GRID --- */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        gap: "24px"
      }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* HEARINGS */}
          <GlassCard>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3>Today's Hearing Schedule</h3>
              <button
                onClick={() => navigate('/judge/calendar')}
                style={{
                  background: "#82abe0",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                View Calendar
              </button>
            </div>

            <table width="100%">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Case ID</th>
                  <th>Client</th>
                  <th>Case Name</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {hearings.map((h, i) => (
                  <tr key={i}>
                    <td>{h.time}</td>
                    <td>{h.id}</td>
                    <td>{h.client}</td>
                    <td>{h.name}</td>
                    <td>{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>

          {/* LAWYERS */}
          <GlassCard>
            <h3>Counsel Directory</h3>

            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Firm</th>
                  <th>Email</th>
                  <th>Cases</th>
                </tr>
              </thead>

              <tbody>
                {lawyers.map((l, i) => (
                  <tr key={i}>
                    <td>{l.name}</td>
                    <td>{l.firm}</td>
                    <td>{l.contact}</td>
                    <td>{l.activeCases}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* MONTHLY */}
          <GlassCard>
            <h3>Monthly Case Output</h3>
            <p>Judgments: 24</p>
            <p>Hearings: 45</p>
            <p>Adjourned: 8</p>
          </GlassCard>

        

          {/* MINI CALENDAR */}
          {/* MINI CALENDAR */}
<GlassCard
  onClick={() => navigate('/judge/Calendar')}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    cursor: "pointer"
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "16px",
      alignItems: "center"
    }}
  >
    <h3
      style={{
        margin: 0,
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#1e293b"
      }}
    >
      January 2026
    </h3>

    <div style={{ display: "flex", gap: "8px" }}>
      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>◀</span>
      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>▶</span>
    </div>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "8px",
      width: "100%"
    }}
  >
    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
      <div
        key={i}
        style={{
          textAlign: "center",
          fontSize: "0.7rem",
          fontWeight: "bold",
          color: "#94a3b8",
          paddingBottom: "4px"
        }}
      >
        {day}
      </div>
    ))}

    {[...Array(4)].map((_, i) => (
      <div key={`empty-${i}`} />
    ))}

    {[...Array(31)].map((_, i) => {
      const day = i + 1;
      const isSelected = day === 14;
      const isToday = day === 8;

      return (
        <div
          key={i}
          style={{
            height: "32px",
            width: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            fontWeight:
              isSelected || isToday ? "bold" : "normal",
            color: isSelected
              ? "white"
              : isToday
              ? "#2563eb"
              : "#475569",
            backgroundColor: isSelected
              ? "#2563eb"
              : isToday
              ? "#eff6ff"
              : "transparent",
            borderRadius: "50%",
            cursor: "pointer",
            margin: "0 auto",
            boxShadow: isSelected
              ? "0 4px 6px rgba(37,99,235,0.3)"
              : "none"
          }}
        >
          {day}
        </div>
      );
    })}
  </div>
</GlassCard>



          {/* TASKS */}
          <GlassCard> <h3 style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#334155", marginBottom: "12px" }}>Action Items</h3> <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}> <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#475569" }}> <input type="checkbox" style={{ accentColor: "#2563eb" }} /> Review discovery motion </li> <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#475569" }}> <input type="checkbox" style={{ accentColor: "#2563eb" }} /> Sign warrant #8821 </li> </ul> </GlassCard>

        </div>
      </div>
    </>
  );
}
