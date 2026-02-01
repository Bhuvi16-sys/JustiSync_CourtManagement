import React, { useState } from 'react';
import GlassCard from '../../components/GlassCard';
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";

export default function JudgeDashboard() {
  const navigate = useNavigate();
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  // --- WHISPER INTEGRATION LOGIC ---
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl, blob) => {
      setLoading(true);
      try {
        const formData = new FormData();
        // Whisper expects a file named 'file' and the specific model 'whisper-1'
        formData.append("file", blob, "recording.wav");
        formData.append("model", "whisper-1");

        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            // NOTE: In production, move this to a backend to protect your API key
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
          },
          body: formData,
        });

        const data = await response.json();
        setTranscription(data.text || "Transcription failed. Check console.");
      } catch (err) {
        console.error("Whisper Error:", err);
      } finally {
        setLoading(false);
      }
    }
  });

  // Data for Tables
  const hearings = [
    { time: "09:00 AM", id: "#CR2024-88", name: "State v. Anderson", client: "Mark Anderson", status: "Scheduled" },
    { time: "10:30 AM", id: "#CV2024-101", name: "Doe v. Smith Corp", client: "Jane Doe", status: "In Progress" },
    { time: "01:00 PM", id: "#CR2023-12", name: "State v. Henderson", client: "Liam Henderson", status: "Pending" },
    { time: "02:45 PM", id: "#FM2024-11", name: "Gellar Custody", client: "Ross Gellar", status: "Confirmed" },
  ];

  const lawyers = [
    { name: "Harvey Specter", firm: "Pearson Hardman", contact: "h.specter@ph.com", activeCases: 14 },
    { name: "Alicia Florrick", firm: "Lockhart/Gardner", contact: "a.florrick@lg.com", activeCases: 8 },
    { name: "Saul Goodman", firm: "Goodman Law", contact: "s.goodman@lbm.com", activeCases: 5 },
  ];

  return (
    <>
      {/* TOP STATS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <GlassCard><p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Active Cases</p><h2>128</h2></GlassCard>
        <GlassCard><p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Pending Verdicts</p><h2 style={{ color: "#ef4444" }}>12</h2></GlassCard>
        <GlassCard><p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Monthly Hearings</p><h2>45</h2></GlassCard>
        <GlassCard><p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>Clearance Rate</p><h2>82%</h2></GlassCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "24px" }}>
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <GlassCard>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3>Today's Hearing Schedule</h3>
              <button onClick={() => navigate('/judge/calendar')} style={{ background: "#82abe0", border: "none", padding: "6px 14px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>View Calendar</button>
            </div>
            <table width="100%">
              <thead><tr><th>Time</th><th>Case ID</th><th>Client</th><th>Case Name</th><th>Status</th></tr></thead>
              <tbody>{hearings.map((h, i) => (<tr key={i}><td>{h.time}</td><td>{h.id}</td><td>{h.client}</td><td>{h.name}</td><td>{h.status}</td></tr>))}</tbody>
            </table>
          </GlassCard>

          <GlassCard>
            <h3>Counsel Directory</h3>
            <table width="100%">
              <thead><tr><th>Name</th><th>Firm</th><th>Email</th><th>Cases</th></tr></thead>
              <tbody>{lawyers.map((l, i) => (<tr key={i}><td>{l.name}</td><td>{l.firm}</td><td>{l.contact}</td><td>{l.activeCases}</td></tr>))}</tbody>
            </table>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* WHISPER VOICE CARD */}
          <GlassCard>
            <h3 style={{ fontSize: "0.9rem", color: "#334155" }}>AI Voice Memo</h3>
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "12px" }}>Status: <strong>{status}</strong></p>
            
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <button 
                onClick={startRecording} 
                disabled={status === "recording"}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "none", background: "#22c55e", color: "white", cursor: "pointer" }}
              >
                Record
              </button>
              <button 
                onClick={stopRecording} 
                disabled={status !== "recording"}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", cursor: "pointer" }}
              >
                Stop
              </button>
            </div>

            {loading && <p style={{ fontSize: "0.8rem", color: "#2563eb" }}>Transcribing audio...</p>}
            
            {transcription && (
              <div style={{ background: "rgba(255,255,255,0.4)", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "0.85rem", margin: 0 }}><strong>Transcript:</strong> {transcription}</p>
              </div>
            )}
          </GlassCard>

          {/* MONTHLY STATS */}
          <GlassCard>
            <h3>Monthly Output</h3>
            <p>Judgments: 24</p><p>Hearings: 45</p>
          </GlassCard>

          {/* TASKS */}
          <GlassCard>
            <h3 style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#334155", marginBottom: "12px" }}>Action Items</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
                <input type="checkbox" /> Review discovery motion
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
                <input type="checkbox" /> Sign warrant #8821
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </>
  );
}