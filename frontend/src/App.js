import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useESGStore } from "./store/useESGStore";
import AppShell from "./components/layout/AppShell";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import * as Env from "./pages/environmental";
import * as Soc from "./pages/social";
import * as Gov from "./pages/governance";
import * as Gam from "./pages/gamification";
import * as Rep from "./pages/reports";
import * as Set from "./pages/settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

function Protected({ children }) {
  const user = useESGStore((s) => s.currentUser);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected><AppShell /></Protected>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/environmental" element={<Env.Overview />} />
          <Route path="/environmental/transactions" element={<Env.Transactions />} />
          <Route path="/environmental/emission-factors" element={<Env.EmissionFactors />} />
          <Route path="/environmental/goals" element={<Env.Goals />} />
          <Route path="/environmental/products" element={<Env.Products />} />

          <Route path="/social" element={<Soc.Overview />} />
          <Route path="/social/csr-activities" element={<Soc.CSRActivities />} />
          <Route path="/social/participation" element={<Soc.Participation />} />
          <Route path="/social/diversity" element={<Soc.Diversity />} />
          <Route path="/social/training" element={<Soc.Training />} />

          <Route path="/governance" element={<Gov.Overview />} />
          <Route path="/governance/policies" element={<Gov.Policies />} />
          <Route path="/governance/acknowledgements" element={<Gov.Acknowledgements />} />
          <Route path="/governance/audits" element={<Gov.Audits />} />
          <Route path="/governance/compliance" element={<Gov.Compliance />} />

          <Route path="/gamification" element={<Gam.Overview />} />
          <Route path="/gamification/challenges" element={<Gam.Challenges />} />
          <Route path="/gamification/participation" element={<Gam.Participation />} />
          <Route path="/gamification/badges" element={<Gam.Badges />} />
          <Route path="/gamification/rewards" element={<Gam.Rewards />} />
          <Route path="/gamification/redemptions" element={<Gam.Redemptions />} />
          <Route path="/gamification/leaderboard" element={<Gam.Leaderboard />} />

          <Route path="/reports/environmental" element={<Rep.EnvReport />} />
          <Route path="/reports/social" element={<Rep.SocReport />} />
          <Route path="/reports/governance" element={<Rep.GovReport />} />
          <Route path="/reports/summary" element={<Rep.Summary />} />
          <Route path="/reports/custom" element={<Rep.Custom />} />

          <Route path="/settings/departments" element={<Set.Departments />} />
          <Route path="/settings/categories" element={<Set.Categories />} />
          <Route path="/settings/esg" element={<Set.ESGConfig />} />
          <Route path="/settings/notifications" element={<Set.NotifSettings />} />

          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
