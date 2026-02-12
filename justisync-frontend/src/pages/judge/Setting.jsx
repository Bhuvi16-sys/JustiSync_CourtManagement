import React, { useState } from 'react';
import GlassCard from '../../components/GlassCard';
import { User, Bell, Lock, Monitor, Save } from 'lucide-react'; // Ensure you have lucide-react installed
import { useNavigate } from 'react-router-dom';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();


  // Simple styles object to keep the JSX cleaner
  const styles = {
    container: { display: "flex", gap: "24px", alignItems: "start" },
    sidebar: { display: "flex", flexDirection: "column", gap: "8px", width: "250px" },
    tabBtn: (isActive) => ({
      display: "flex", alignItems: "center", gap: "12px",
      padding: "12px 16px", borderRadius: "12px", border: "none",
      background: isActive ? "#eff6ff" : "transparent",
      color: isActive ? "#2563eb" : "#64748b",
      fontWeight: isActive ? "bold" : "500",
      cursor: "pointer", textAlign: "left", fontSize: "0.9rem",
      transition: "all 0.2s ease"
    }),
    sectionTitle: { fontSize: "1.1rem", fontWeight: "bold", color: "#1e293b", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" },
    label: { display: "block", fontSize: "0.75rem", fontWeight: "bold", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" },
    input: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", color: "#334155", marginBottom: "16px" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
    saveBtn: { background: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }
  };

  return (

    <div style={styles.container}>

        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
         <button 
           onClick={() => navigate('/judge')} // Or navigate(-1) to go back one page
           style={{ background: "none", border: "1px solid #cbd5e1", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", color: "#64748b" }}
         >
           ← Back to Dashboard
         </button>
      </div>


      
      {/* --- SETTINGS SIDEBAR --- */}
      <div style={styles.sidebar}>
        <GlassCard style={{ padding: "12px" }}>
          <button style={styles.tabBtn(activeTab === 'profile')} onClick={() => setActiveTab('profile')}>
            <User size={18} /> Profile
          </button>
          <button style={styles.tabBtn(activeTab === 'notifications')} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} /> Notifications
          </button>
          <button style={styles.tabBtn(activeTab === 'appearance')} onClick={() => setActiveTab('appearance')}>
            <Monitor size={18} /> Appearance
          </button>
          <button style={styles.tabBtn(activeTab === 'security')} onClick={() => setActiveTab('security')}>
            <Lock size={18} /> Security
          </button>
        </GlassCard>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div style={{ flex: 1 }}>
        <GlassCard>
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={styles.sectionTitle}>Profile & Account</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e2e8f0", overflow: "hidden" }}>
                  <img src="https://ui-avatars.com/api/?name=Judge+Gellar&background=0D8ABC&color=fff" alt="Profile" style={{ width: "100%", height: "100%" }} />
                </div>
                <button style={{ color: "#2563eb", background: "none", border: "none", fontWeight: "bold", cursor: "pointer" }}>Change Picture</button>
              </div>

              <div style={styles.row}>
                <div>
                  <label style={styles.label}>Full Name</label>
                  <input type="text" defaultValue="Hon. Robert Gellar" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>Email</label>
                  <input type="email" defaultValue="r.gellar@court.gov" style={styles.input} />
                </div>
              </div>
              <div style={styles.row}>
                <div>
                  <label style={styles.label}>Court Division</label>
                  <input type="text" defaultValue="Family Court - Div 4" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>Timezone</label>
                  <select style={styles.input}>
                    <option>Eastern Standard Time (EST)</option>
                    <option>Pacific Standard Time (PST)</option>
                  </select>
                </div>
              </div>
              <button style={styles.saveBtn}><Save size={16}/> Save Changes</button>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
             <div>
                <h2 style={styles.sectionTitle}>Notification Preferences</h2>
                {['Email Alerts for Hearings', 'Urgent Motion SMS', 'Docket Updates'].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ fontWeight: "500", color: "#334155" }}>{item}</span>
                    <input type="checkbox" defaultChecked style={{ accentColor: "#2563eb", width: "16px", height: "16px" }} />
                  </div>
                ))}
             </div>
          )}

          {/* Add other tabs as needed... */}
        </GlassCard>
      </div>
    </div>
  );
}