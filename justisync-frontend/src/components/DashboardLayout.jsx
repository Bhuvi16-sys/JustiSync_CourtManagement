
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function DashboardLayout({ title, role = "Judge" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => navigate("/logout");

  // Menu Items
  const getMenuItems = () => {
    const common = [];

    if (role === "Judge") {
      return [
        { name: "My Cases", icon: "⚖️", path: "/judge/" },
        { name: "Calendar", icon: "📅", path: "/judge/Calendar" },
        { name: "Research", icon: "🔍", path: "/judge/Setting" },
        ...common
      ];
    }
    if (role === "Client") {
       return [
         { name: "Case Status", icon: "📁", path: "/client/" },
         ...common
       ];
    }

     if (role === "Lawyer") {
      return [
        { name: "Client Cases", icon: "💼", path: "/laywer/" },
        ...common
      ];
    }

    return common;
  };
    

  const menuItems = getMenuItems();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#334155"
      }}
    >
      {/* --- SIDEBAR --- */}
      <aside
        style={{
          width: "260px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.6)",
          zIndex: 100
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ color: "#2563eb", marginBottom: "0.5rem" }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "1.2rem",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "#1e293b",
              margin: 0
            }}
          >
            JUSTISYNC
          </h1>

          <p
            style={{
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "1px",
              color: "#64748b",
              marginTop: "4px",
              textTransform: "uppercase"
            }}
          >
            {role} DASHBOARD
          </p>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: "0 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => item.path && navigate(item.path)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left",
                background:
                  location.pathname === item.path
                    ? "rgba(255, 255, 255, 0.7)"
                    : "transparent",
                color:
                  location.pathname === item.path
                    ? "#2563eb"
                    : "#475569",
                fontWeight:
                  location.pathname === item.path ? "bold" : "normal"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
              <span style={{ fontSize: "0.9rem" }}>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.5)"
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid transparent",
              background: "transparent",
              color: "#ef4444",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main
        style={{
          marginLeft: "260px",
          flex: 1,
          padding: "2rem",
          height: "100vh",
          overflowY: "auto"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
