import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-[#FFF9ED] decor-grid eco-shell">
      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 anim-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
