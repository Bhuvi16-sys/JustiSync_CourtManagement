import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// GlassCard Component
const GlassCard = ({ children, style }) => (
  <div style={{ background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)", borderRadius: "16px", padding: "24px", ...style }}>
    {children}
  </div>
);

export default function Calendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Data State
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'Hearing', time: '' });

  // 1. GET Request: Data Load karo
  useEffect(() => {
    const loadEvents = async () => {
        const token = localStorage.getItem('token'); // Token nikalo
        try {
            const response = await fetch('http://localhost:5000/api/schedule', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Token bhejo
                }
            });

            if (!response.ok) throw new Error("Failed to fetch");
            
            const data = await response.json();
            // Backend se { date: "2026-01-08", ... } aana chahiye
            setEvents(data);
        } catch (err) {
            console.error("Failed to load schedule", err);
        }
    };
    loadEvents();
  }, []);

  const handleDateClick = (day) => {
    // Format: YYYY-MM-DD
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateString);
    setIsModalOpen(true);
  };

  // 2. POST Request: Save karo
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Token nikalo

    // Agar token nahi hai toh login par bhejo
    if (!token) {
        alert("Please Login First!");
        return;
    }

    try {
        const payload = { 
            ...newEvent, 
            date: selectedDate,
            case_id: 101 // <--- ZAROORI: Backend ko case_id chahiye (Dummy 101)
        };
        
        const response = await fetch('http://localhost:5000/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // <--- ZAROORI: Token Header
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Backend Rejected");
        }
        
        const savedEvent = await response.json();

        // UI update karo bina refresh kiye
        setEvents([...events, savedEvent]);
        setIsModalOpen(false);
        setNewEvent({ title: '', type: 'Hearing', time: '' });
        alert("✅ Hearing Scheduled Successfully!");
        
    } catch (err) {
        console.error(err);
        alert("❌ Failed to save event. Check Console.");
    }
  };

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ minHeight: "100px" }}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      // Date string format same hona chahiye jo backend bhej raha hai (YYYY-MM-DD)
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      
      const dayEvents = events.filter(e => e.date === dateString);

      days.push(
        <div key={d} onClick={() => handleDateClick(d)} style={{ minHeight: "120px", borderTop: "1px solid #f1f5f9", borderRight: "1px solid #f1f5f9", padding: "8px", cursor: "pointer", background: selectedDate === dateString ? "#eff6ff" : "white" }}>
          <div style={{ fontWeight: "bold", color: "#64748b", marginBottom: "8px" }}>{d}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {dayEvents.map((ev, idx) => (
              <div key={idx} style={{ fontSize: "0.65rem", padding: "4px", borderRadius: "4px", background: ev.type === "Trial" ? "#fee2e2" : "#dbeafe", color: ev.type === "Trial" ? "#991b1b" : "#1e40af" }}>
                {ev.time.slice(0,5)} {ev.title} 
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
      <div style={{ marginBottom: "20px" }}>
         <button onClick={() => navigate('/judge')} style={{ background: "none", border: "1px solid #cbd5e1", padding: "8px 12px", borderRadius: "8px", cursor: "pointer" }}>← Back</button>
      </div>
      <GlassCard>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
          <h2>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
          <div>
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>◀</button>
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>▶</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} style={{textAlign:"center", fontWeight:"bold"}}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", border: "1px solid #eee" }}>
          {renderDays()}
        </div>
      </GlassCard>

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "16px", width: "400px" }}>
            <h3>Schedule Hearing for {selectedDate}</h3>
            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input placeholder="Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required style={{padding: "8px"}} />
                <input type="time" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} required style={{padding: "8px"}} />
                <select value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})} style={{padding: "8px"}}>
                    <option>Hearing</option><option>Trial</option><option>Motion</option>
                </select>
                <div style={{display:"flex", gap:"10px", marginTop:"10px"}}>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" style={{background: "blue", color: "white"}}>Save</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}