import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Bell, Menu, Search, User } from "lucide-react";
import { useESGStore } from "../../store/useESGStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { format, formatDistanceToNow } from "date-fns";

const ROUTE_TITLES = {
  "/dashboard": "Dashboard",
  "/environmental": "Environmental Overview",
  "/environmental/transactions": "Carbon Transactions",
  "/environmental/emission-factors": "Emission Factors",
  "/environmental/goals": "Environmental Goals",
  "/environmental/products": "Product ESG Profiles",
  "/social": "Social Overview",
  "/social/csr-activities": "CSR Activities",
  "/social/participation": "Employee Participation",
  "/social/diversity": "Diversity Metrics",
  "/social/training": "Training Completion",
  "/governance": "Governance Overview",
  "/governance/policies": "ESG Policies",
  "/governance/acknowledgements": "Policy Acknowledgements",
  "/governance/audits": "Audits",
  "/governance/compliance": "Compliance Issues",
  "/gamification": "Gamification Overview",
  "/gamification/challenges": "Challenges",
  "/gamification/participation": "Challenge Participation",
  "/gamification/badges": "Badges",
  "/gamification/rewards": "Rewards",
  "/gamification/redemptions": "Reward Redemptions",
  "/gamification/leaderboard": "Leaderboard",
  "/reports/environmental": "Environmental Report",
  "/reports/social": "Social Report",
  "/reports/governance": "Governance Report",
  "/reports/summary": "ESG Summary",
  "/reports/custom": "Custom Report Builder",
  "/settings/departments": "Departments",
  "/settings/categories": "Categories",
  "/settings/esg": "ESG Configuration",
  "/settings/notifications": "Notification Settings",
  "/notifications": "Notifications",
  "/profile": "Profile",
};

const ROLES = ["ESG Administrator", "ESG Manager", "Department Head", "Auditor", "Employee", "Executive"];

export default function Header({ onMenuClick }) {
  const loc = useLocation();
  const nav = useNavigate();
  const notifications = useESGStore((s) => s.notifications);
  const user = useESGStore((s) => s.currentUser);
  const role = useESGStore((s) => s.role);
  const switchRole = useESGStore((s) => s.switchRole);
  const markAll = useESGStore((s) => s.markAllNotificationsRead);
  const markRead = useESGStore((s) => s.markNotificationRead);
  const logout = useESGStore((s) => s.logout);
  const [notifOpen, setNotifOpen] = useState(false);
  const [q, setQ] = useState("");

  const title = ROUTE_TITLES[loc.pathname] || "EcoSphere";
  const parts = loc.pathname.split("/").filter(Boolean);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b-2 border-[#101828] shadow-[0_10px_28px_rgba(16,24,40,0.05)]">
      <div className="flex items-center gap-3 px-4 lg:px-6 py-3">
        <button data-testid="header-menu-btn" className="lg:hidden brut-btn !py-1.5 !px-2" onClick={onMenuClick}><Menu className="h-4 w-4" /></button>
        <div className="min-w-0 flex-1">
          <div className="text-xs text-slate-500 truncate">
            <Link to="/dashboard" className="hover:underline">Home</Link>
            {parts.map((p, i) => (
              <span key={i}> / <span className="capitalize">{p.replace(/-/g, " ")}</span></span>
            ))}
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight" data-testid="page-title">{title}</h1>
        </div>

        <div className="hidden md:flex items-center gap-2 border-2 border-[#101828] rounded-xl bg-white px-3 py-1.5 w-72" style={{ boxShadow: "3px 3px 0 0 rgb(16 24 40 / 0.72)" }}>
          <Search className="h-4 w-4 text-slate-500" />
          <input
            data-testid="global-search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
          <SheetTrigger asChild>
            <button data-testid="header-notif-btn" className="relative brut-btn !py-2 !px-3">
              <Bell className="h-4 w-4" />
              {unread > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#F04438] text-white text-[10px] grid place-items-center font-bold border-2 border-[#101828]">{unread}</span>}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Notifications</span>
                <button data-testid="notif-mark-all" onClick={markAll} className="text-xs text-[#20C968] font-bold">Mark all read</button>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
              {notifications.slice(0, 30).map((n) => (
                <button key={n.id} onClick={() => { markRead(n.id); nav(n.link); setNotifOpen(false); }} data-testid={`notif-item-${n.id}`}
                  className={`w-full text-left brut-sm px-3 py-2 hover:translate-x-[-2px] transition ${!n.read ? "bg-[#FFF9ED]" : "bg-white"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs uppercase font-bold text-slate-500">{n.type}</div>
                    <div className="text-[11px] text-slate-500">{formatDistanceToNow(new Date(n.ts), { addSuffix: true })}</div>
                  </div>
                  <div className="text-sm font-semibold">{n.title}</div>
                  <div className="text-xs text-slate-600">{n.message}</div>
                </button>
              ))}
              {notifications.length === 0 && <div className="text-center text-sm text-slate-500 py-10">No notifications</div>}
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid="header-user-btn" className="flex items-center gap-2 brut-btn !py-1.5 !px-2">
              <div className="h-7 w-7 rounded-full bg-[#20C968] text-white grid place-items-center text-xs font-bold border-2 border-[#101828]">
                {(user?.name || "U").split(" ").map((s) => s[0]).join("").slice(0, 2)}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-xs font-bold">{user?.name || "User"}</div>
                <div className="text-[10px] text-slate-500 uppercase">{role}</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Signed in as {user?.email || "-"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-slate-500 uppercase">Switch role</DropdownMenuLabel>
            {ROLES.map((r) => (
              <DropdownMenuItem key={r} onSelect={() => switchRole(r)} data-testid={`role-${r.toLowerCase().replace(/\s/g, "-")}`}>
                <span className={r === role ? "font-bold text-[#20C968]" : ""}>{r}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => nav("/profile")}><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
            <DropdownMenuItem onSelect={logout} data-testid="user-logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
