import React from "react";
import { useESGStore } from "../store/useESGStore";
import { PageHeader, KPICard } from "../components/common/UI";
import { Award } from "lucide-react";

export default function Profile() {
  const state = useESGStore();
  const user = state.currentUser;
  const emp = state.employees.find((e) => e.id === user?.empId);
  const dept = state.departments.find((d) => d.id === emp?.deptId);
  const badges = state.employeeBadges.filter((b) => b.empId === user?.empId);
  const myCSR = state.participations.filter((p) => p.empId === user?.empId);
  const myCh = state.challengeParticipations.filter((p) => p.empId === user?.empId);
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your personal ESG contribution."/>
      <div className="brut p-6 flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-[#20C968] text-white grid place-items-center text-2xl font-extrabold border-2 border-[#101828]" style={{ boxShadow: "4px 4px 0 0 #101828" }}>{emp?.avatar || "U"}</div>
        <div>
          <div className="text-2xl font-extrabold">{emp?.name || user?.name}</div>
          <div className="text-sm text-slate-600">{dept?.name || "-"} · {state.role}</div>
          <div className="text-xs text-slate-500">{user?.email}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="XP" value={emp?.xp || 0} color="#FBBF35"/>
        <KPICard label="Points" value={emp?.points || 0} color="#20C968"/>
        <KPICard label="Badges" value={badges.length} color="#EC4899"/>
        <KPICard label="Contributions" value={myCSR.length + myCh.length} color="#3F7DF4"/>
      </div>
      <div className="brut p-4">
        <div className="text-xs uppercase font-bold text-slate-500 mb-3">Your Badges</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {badges.length === 0 && <div className="text-sm text-slate-500">No badges yet — join challenges to earn XP!</div>}
          {badges.map((b) => {
            const badge = state.badges.find((x) => x.id === b.badgeId);
            return <div key={b.badgeId} className="brut-sm p-3 bg-amber-50 flex items-center gap-2"><Award className="h-5 w-5 text-[#FBBF35]"/><div><div className="font-bold text-sm">{badge?.name}</div><div className="text-[11px] text-slate-500">{b.unlockedAt}</div></div></div>;
          })}
        </div>
      </div>
    </div>
  );
}
