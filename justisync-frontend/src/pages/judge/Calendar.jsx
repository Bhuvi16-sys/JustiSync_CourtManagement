import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added for navigation

// Simple reused Card style (Glassmorphism)
const GlassCard = ({ children, style }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    padding: "24px",
    ...style
  }}>
    {children}
  </div>
);

export default function Calendar() {
  const navigate = useNavigate(); // 2. Initialize navigate
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [events, setEvents] = useState([
    { date: "2026-01-14", title: "State v. Anderson", type: "Trial", time: "09:00" },
    { date: "2026-01-14", title: "Doe Discovery", type: "Hearing", time: "14:00" },
    { date: "2026-01-20", title: "Merger Review", type: "Motion", time: "10:30" },
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', type: 'Hearing', time: '' });

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateString);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, date: selectedDate }]);
    setIsModalOpen(false);
    setNewEvent({ title: '', type: 'Hearing', time: '' }); 
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ minHeight: "100px" }}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateString);

      days.push(
        <div 
          key={d} 
          onClick={() => handleDateClick(d)}
          style={{ 
            minHeight: "120px", 
            borderTop: "1px solid #f1f5f9", 
            borderRight: "1px solid #f1f5f9",
            padding: "8px", 
            cursor: "pointer",
            background: selectedDate === dateString ? "#eff6ff" : "white"
          }}
        >
          <div style={{ fontWeight: "bold", color: "#64748b", marginBottom: "8px" }}>{d}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {dayEvents.map((ev, idx) => (
              <div key={idx} style={{ 
                fontSize: "0.65rem", 
                padding: "4px", 
                borderRadius: "4px", 
                background: ev.type === "Trial" ? "#fee2e2" : "#dbeafe",
                color: ev.type === "Trial" ? "#991b1b" : "#1e40af",
                borderLeft: ev.type === "Trial" ? "3px solid #ef4444" : "3px solid #3b82f6",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {ev.time} {ev.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* 3. BACK NAVIGATION HEADER */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
         <button 
           onClick={() => navigate('/judge')} // Or navigate(-1) to go back one page
           style={{ background: "none", border: "1px solid #cbd5e1", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", color: "#64748b" }}
         >
           ← Back to Dashboard
         </button>
      </div>

      <GlassCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, color: "#1e293b" }}>
            {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={navBtnStyle} onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>◀ Prev</button>
            <button style={navBtnStyle} onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>Next ▶</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "10px" }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ fontWeight: "bold", color: "#94a3b8", textAlign: "center", paddingBottom: "10px" }}>{day}</div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderLeft: "1px solid #f1f5f9", borderTop: "1px solid #f1f5f9" }}>
          {renderDays()}
        </div>
      </GlassCard>

      {/* MODAL (Same as your original code) */}
      {isModalOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3 style={{ marginTop: 0, color: "#1e293b" }}>Schedule Hearing</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Date: {selectedDate}</p>
            
            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
              <div>
                <label style={labelStyle}>Case Title / Number</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. State v. Smith"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Type</label>
                    <select value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})} style={inputStyle}>
                      <option>Hearing</option>
                      <option>Trial</option>
                      <option>Motion</option>
                      <option>Conference</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Time</label>
                    <input type="time" required value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={cancelBtnStyle}>Cancel</button>
                <button type="submit" style={saveBtnStyle}>Schedule Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Styles (Same as before) ---
const navBtnStyle = { padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "bold" };
const overlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalStyle = { background: "white", padding: "30px", borderRadius: "16px", width: "400px" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" };
const labelStyle = { display: "block", fontSize: "0.85rem", fontWeight: "bold", color: "#475569", marginBottom: "6px" };
const saveBtnStyle = { padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };
const cancelBtnStyle = { padding: "10px 20px", background: "transparent", color: "#64748b", border: "1px solid #cbd5e1", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };