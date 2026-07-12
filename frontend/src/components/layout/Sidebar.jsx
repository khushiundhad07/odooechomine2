import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Leaf, Users, Shield, Trophy, FileBarChart, Settings, User, LogOut,
  ChevronDown, ChevronRight, Globe2,
} from "lucide-react";
import { useESGStore } from "../../store/useESGStore";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#101828" },
  {
    label: "Environmental", icon: Leaf, color: "#20C968", children: [
      { to: "/environmental", label: "Overview" },
      { to: "/environmental/transactions", label: "Carbon Transactions" },
      { to: "/environmental/emission-factors", label: "Emission Factors" },
      { to: "/environmental/goals", label: "Environmental Goals" },
      { to: "/environmental/products", label: "Product ESG Profiles" },
    ]
  },
  {
    label: "Social", icon: Users, color: "#3F7DF4", children: [
      { to: "/social", label: "Overview" },
      { to: "/social/csr-activities", label: "CSR Activities" },
      { to: "/social/participation", label: "Employee Participation" },
      { to: "/social/diversity", label: "Diversity Metrics" },
      { to: "/social/training", label: "Training Completion" },
    ]
  },
  {
    label: "Governance", icon: Shield, color: "#8064F4", children: [
      { to: "/governance", label: "Overview" },
      { to: "/governance/policies", label: "ESG Policies" },
      { to: "/governance/acknowledgements", label: "Acknowledgements" },
      { to: "/governance/audits", label: "Audits" },
      { to: "/governance/compliance", label: "Compliance Issues" },
    ]
  },
  {
    label: "Gamification", icon: Trophy, color: "#FBBF35", children: [
      { to: "/gamification", label: "Overview" },
      { to: "/gamification/challenges", label: "Challenges" },
      { to: "/gamification/participation", label: "Challenge Participation" },
      { to: "/gamification/badges", label: "Badges" },
      { to: "/gamification/rewards", label: "Rewards" },
      { to: "/gamification/redemptions", label: "Reward Redemptions" },
      { to: "/gamification/leaderboard", label: "Leaderboard" },
    ]
  },
  {
    label: "Reports", icon: FileBarChart, color: "#14B8C8", children: [
      { to: "/reports/environmental", label: "Environmental Report" },
      { to: "/reports/social", label: "Social Report" },
      { to: "/reports/governance", label: "Governance Report" },
      { to: "/reports/summary", label: "ESG Summary" },
      { to: "/reports/custom", label: "Custom Report Builder" },
    ]
  },
  {
    label: "Settings", icon: Settings, color: "#475569", children: [
      { to: "/settings/departments", label: "Departments" },
      { to: "/settings/categories", label: "Categories" },
      { to: "/settings/esg", label: "ESG Configuration" },
      { to: "/settings/notifications", label: "Notification Settings" },
    ]
  },
];

export default function Sidebar({ open, onClose }) {
  const loc = useLocation();
  const logout = useESGStore((s) => s.logout);
  const [expanded, setExpanded] = useState(() => {
    // auto-expand section that matches route
    const initial = {};
    nav.forEach((n) => {
      if (n.children?.some((c) => loc.pathname.startsWith(c.to))) initial[n.label] = true;
    });
    return initial;
  });

  const toggle = (label) => setExpanded((e) => ({ ...e, [label]: !e[label] }));

  return (
    <aside
      data-testid="app-sidebar"
      className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 border-r-2 border-[#101828] bg-white/95 backdrop-blur-xl transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="flex items-center gap-3 px-5 py-5 border-b-2 border-[#101828] relative overflow-hidden">
        <div className="h-10 w-10 rounded-xl bg-[#20C968] border-2 border-[#101828] grid place-items-center" style={{ boxShadow: "3px 3px 0 0 rgb(16 24 40 / 0.78)" }}>
          <Globe2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-lg font-extrabold tracking-tight leading-none">EcoSphere</div>
          <div className="text-[11px] uppercase tracking-widest text-slate-500">ESG Platform</div>
        </div>
      </div>

      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
        {nav.map((item) => {
          if (!item.children) {
            const active = loc.pathname === item.to;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${active ? "bg-[#101828] text-white border-[#101828]" : "border-transparent hover:bg-slate-100 text-slate-800"}`}
                style={active ? { boxShadow: "3px 3px 0 0 rgb(16 24 40 / 0.76)" } : {}}
              >
                <Icon className="h-4 w-4" /> {item.label}
              </NavLink>
            );
          }
          const isOpen = expanded[item.label];
          const Icon = item.icon;
          const anyActive = item.children.some((c) => loc.pathname.startsWith(c.to));
          return (
            <div key={item.label}>
              <button
                onClick={() => toggle(item.label)}
                data-testid={`nav-group-${item.label.toLowerCase()}`}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${anyActive ? "text-[#101828]" : "text-slate-700 hover:bg-slate-100"}`}
                style={anyActive ? { background: `${item.color}14` } : {}}
              >
                <span className="h-7 w-7 rounded-full grid place-items-center" style={{ background: `${item.color}18` }}>
                  <Icon className="h-4 w-4" style={{ color: item.color }} />
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {isOpen && (
                <div className="ml-6 mt-1 space-y-0.5 border-l-2 border-slate-200 pl-3 transition-all duration-200">
                  {item.children.map((c) => {
                    const active = loc.pathname === c.to;
                    return (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        onClick={onClose}
                        data-testid={`nav-${c.to.replace(/\//g, "-").slice(1)}`}
                        className={`block px-2 py-1.5 text-sm rounded-lg transition-all ${active ? "font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
                        style={active ? { color: item.color, background: `${item.color}18`, borderLeft: `4px solid ${item.color}`, marginLeft: -3 } : {}}
                      >
                        {c.label}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t-2 border-[#101828] p-3 bg-white/95">
        <NavLink to="/profile" onClick={onClose} data-testid="nav-profile" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 text-sm font-semibold">
          <User className="h-4 w-4" /> Profile
        </NavLink>
        <button data-testid="nav-logout" onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-red-50 text-sm font-semibold text-red-600">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
