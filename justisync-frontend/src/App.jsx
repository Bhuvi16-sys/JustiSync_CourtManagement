import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

// Judge Pages
import JudgeDashboard from "./pages/judge/JudgeDashboard";
import Calendar from "./pages/judge/Calendar";
import Setting from "./pages/judge/Setting";

// Other Dashboards
import LawyerDashboard from "./pages/lawyer/LawyerDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";

// Layout
import DashboardLayout from "./components/DashboardLayout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* JUDGE */}
        <Route path="/judge" element={<DashboardLayout role="Judge" />}>
          <Route index element={<JudgeDashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* LAWYER */}
        <Route path="/lawyer" element={<DashboardLayout role="Lawyer" />}>
          <Route index element={<LawyerDashboard />} />
        </Route>

        {/* CLIENT */}
        <Route path="/client" element={<DashboardLayout role="Client" />}>
          <Route index element={<ClientDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
