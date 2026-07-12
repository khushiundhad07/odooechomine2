import React, { useState } from "react";
import { useESGStore } from "../store/useESGStore";
import { PageHeader } from "../components/common/UI";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

export default function Notifications() {
  const state = useESGStore();
  const nav = useNavigate();
  const markRead = useESGStore((s) => s.markNotificationRead);
  const markAll = useESGStore((s) => s.markAllNotificationsRead);
  const del = useESGStore((s) => s.deleteNotification);
  const [filter, setFilter] = useState("all");
  const types = ["all", ...new Set(state.notifications.map((n) => n.type))];
  const list = state.notifications.filter((n) => filter === "all" || n.type === filter);
  return (
    <div className="space-y-4">
      <PageHeader title="Notifications" description="All ESG platform notifications." action={<button onClick={markAll} className="brut-btn bg-white">Mark all read</button>}/>
      <div className="flex gap-2 flex-wrap">
        {types.map((t) => <button key={t} onClick={() => setFilter(t)} className={`brut-btn !py-1.5 ${filter===t?"bg-[#101828] text-white":"bg-white"}`}>{t}</button>)}
      </div>
      <div className="space-y-2">
        {list.map((n) => (
          <div key={n.id} className={`brut p-3 flex items-center justify-between gap-2 ${!n.read?"bg-[#FFF9ED]":"bg-white"}`}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2"><span className="text-[10px] uppercase font-bold text-slate-500">{n.type}</span><span className="text-[11px] text-slate-500">{formatDistanceToNow(new Date(n.ts), { addSuffix: true })}</span></div>
              <div className="text-sm font-bold">{n.title}</div>
              <div className="text-xs text-slate-600">{n.message}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { markRead(n.id); nav(n.link); }} className="brut-btn !py-1 !px-2 text-xs">Open</button>
              <button onClick={() => del(n.id)} className="brut-btn !py-1 !px-2 text-xs text-red-600"><Trash2 className="h-3 w-3"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
