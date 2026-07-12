import React, { useState } from "react";
import { toast } from "sonner";
import { Trophy, Award, Gift, Plus, Star, Crown, Medal } from "lucide-react";
import { useESGStore } from "../../store/useESGStore";
import { PageHeader, KPICard, StatusBadge, ProgressBar } from "../../components/common/UI";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/dialog";

const COLORS = ["#20C968", "#3F7DF4", "#8064F4", "#FBBF35", "#EC4899", "#F79009"];

export function Overview() {
  const state = useESGStore();
  const activeEmployees = state.employees.filter((e) => (e.xp || 0) > 0).length;
  const totalXp = state.employees.reduce((s, e) => s + (e.xp || 0), 0);
  const active = state.challenges.filter((c) => c.status === "Active").length;
  const completed = state.challengeParticipations.filter((p) => p.status === "Approved").length;
  const badges = state.employeeBadges.length;
  const rewards = state.redemptions.length;
  const top = [...state.employees].sort((a, b) => b.xp - a.xp)[0];
  const deptXP = state.departments.map((d) => ({ name: d.code, value: state.employees.filter((e) => e.deptId === d.id).reduce((s, e) => s + e.xp, 0) })).sort((a,b) => b.value - a.value);
  return (
    <div className="space-y-6">
      <PageHeader title="Gamification" description="Engage employees through challenges, badges and rewards." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Total XP" value={totalXp.toLocaleString()} color="#FBBF35" />
        <KPICard label="Active Employees" value={activeEmployees} color="#20C968" />
        <KPICard label="Active Challenges" value={active} sub={`${completed} completed`} color="#3F7DF4" />
        <KPICard label="Badges / Rewards" value={`${badges} / ${rewards}`} color="#EC4899" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Department XP Leaderboard</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deptXP}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4"/>
              <XAxis dataKey="name" fontSize={11}/><YAxis fontSize={11}/><Tooltip contentStyle={{ border: "2px solid #101828", borderRadius: 6 }} />
              <Bar dataKey="value" radius={[4,4,0,0]}>{deptXP.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Top Employee</div>
          {top && (
            <div className="mt-6 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-[#FBBF35] border-4 border-[#101828] grid place-items-center text-3xl font-extrabold" style={{ boxShadow: "5px 5px 0 0 #101828" }}>{top.avatar}</div>
              <div className="mt-3 text-lg font-extrabold">{top.name}</div>
              <div className="text-xs text-slate-500">{state.departments.find((d) => d.id === top.deptId)?.name}</div>
              <div className="mt-2 flex gap-3">
                <span className="brut-sm px-3 py-1 text-sm font-extrabold bg-[#FBBF35]">🏆 {top.xp} XP</span>
                <span className="brut-sm px-3 py-1 text-sm font-extrabold bg-emerald-100">{top.points} PTS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Challenges() {
  const state = useESGStore();
  const join = useESGStore((s) => s.joinChallenge);
  const addCh = useESGStore((s) => s.addChallenge);
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:"", category:"Environment", description:"", xp:100, difficulty:"Medium", evidenceRequired:true, start:"", deadline:"", owner:"", status:"Active" });
  const list = state.challenges.filter((c) => tab === "All" || c.status === tab);
  const save = () => {
    if (!form.title || form.xp <= 0) { toast.error("Title & XP required"); return; }
    if (form.deadline && form.start && form.deadline < form.start) { toast.error("Deadline must be after start"); return; }
    addCh(form); toast.success("Challenge created"); setOpen(false);
  };
  return (
    <div className="space-y-4">
      <PageHeader title="Challenges" description="Sustainability challenges employees can join." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button data-testid="add-challenge-btn" className="brut-btn bg-[#FBBF35]"><Plus className="h-4 w-4"/> New Challenge</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Challenge</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Title" className="brut-input col-span-2" value={form.title} onChange={(e) => setForm({...form,title:e.target.value})}/>
              <input placeholder="Category" className="brut-input" value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}/>
              <select className="brut-input" value={form.difficulty} onChange={(e) => setForm({...form,difficulty:e.target.value})}>{["Easy","Medium","Hard"].map(x=><option key={x}>{x}</option>)}</select>
              <input type="number" placeholder="XP" className="brut-input" value={form.xp} onChange={(e) => setForm({...form,xp:parseInt(e.target.value)})}/>
              <input placeholder="Owner" className="brut-input" value={form.owner} onChange={(e) => setForm({...form,owner:e.target.value})}/>
              <input type="date" className="brut-input" value={form.start} onChange={(e) => setForm({...form,start:e.target.value})}/>
              <input type="date" className="brut-input" value={form.deadline} onChange={(e) => setForm({...form,deadline:e.target.value})}/>
              <textarea placeholder="Description" className="brut-input col-span-2" value={form.description} onChange={(e) => setForm({...form,description:e.target.value})}/>
            </div>
            <DialogFooter><button className="brut-btn bg-[#FBBF35]" onClick={save}>Save</button></DialogFooter>
          </DialogContent>
        </Dialog>
      }/>
      <div className="flex gap-2 flex-wrap">
        {["All","Draft","Active","Under Review","Completed","Archived"].map((s) => (
          <button key={s} onClick={() => setTab(s)} className={`brut-btn !py-1.5 ${tab===s?"bg-[#FBBF35]":"bg-white"}`}>{s}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((c) => (
          <div key={c.id} className="brut brut-hover p-4">
            <div className="flex justify-between"><div className="text-xs uppercase font-bold text-slate-500">{c.difficulty} · {c.category}</div><StatusBadge status={c.status}/></div>
            <div className="font-extrabold text-lg mt-1">{c.title}</div>
            <div className="text-xs text-slate-600 mt-1 line-clamp-2">{c.description}</div>
            <div className="mt-3 flex justify-between text-xs"><span>Deadline {c.deadline}</span><span className="font-extrabold text-[#FBBF35]">{c.xp} XP</span></div>
            <button data-testid={`join-challenge-${c.id}`} onClick={() => { join(c.id, state.currentUser?.empId || "e1"); toast.success("Joined challenge"); }} className="brut-btn w-full mt-3 bg-[#F79009] text-white">Join Challenge</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Participation() {
  const state = useESGStore();
  const approve = useESGStore((s) => s.approveChallenge);
  const reject = useESGStore((s) => s.rejectChallenge);
  const upd = useESGStore((s) => s.updateChallengeProgress);
  const sub = useESGStore((s) => s.submitChallenge);
  return (
    <div className="space-y-4">
      <PageHeader title="Challenge Participation" description="Progress tracking and approval workflow." />
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Employee","Challenge","Progress","Proof","XP","Status","Actions"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {state.challengeParticipations.map((p) => {
              const c = state.challenges.find((x) => x.id === p.challengeId);
              const e = state.employees.find((x) => x.id === p.empId);
              return (
                <tr key={p.id} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-bold">{e?.name}</td>
                  <td className="px-3 py-2">{c?.title}</td>
                  <td className="px-3 py-2 w-40"><ProgressBar value={p.progress} color="#FBBF35"/><div className="text-[10px] mt-0.5">{p.progress}%</div></td>
                  <td className="px-3 py-2">{p.proof || "-"}</td>
                  <td className="px-3 py-2 font-bold">{p.xp}</td>
                  <td className="px-3 py-2"><StatusBadge status={p.status}/></td>
                  <td className="px-3 py-2">
                    {(p.status === "Joined" || p.status === "In Progress") && <div className="flex gap-1">
                      <button onClick={() => { upd(p.id, Math.min(100, p.progress + 25)); }} className="text-xs font-bold text-blue-600">+25%</button>
                      <button onClick={() => { sub(p.id, "photo.jpg"); toast.success("Submitted"); }} className="text-xs font-bold text-emerald-600">Submit</button>
                    </div>}
                    {p.status === "Submitted" && <div className="flex gap-1">
                      <button data-testid={`approve-ch-${p.id}`} onClick={() => { const ok = approve(p.id); if (ok) toast.success("Approved!"); else toast.error("Evidence required"); }} className="text-xs font-bold text-emerald-600">Approve</button>
                      <button onClick={() => { reject(p.id); toast("Rejected"); }} className="text-xs font-bold text-red-600">Reject</button>
                    </div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Badges() {
  const state = useESGStore();
  const empId = state.currentUser?.empId || "e1";
  const myBadges = new Set(state.employeeBadges.filter((b) => b.empId === empId).map((b) => b.badgeId));
  return (
    <div className="space-y-4">
      <PageHeader title="Badges" description="Unlock badges by achieving sustainability milestones." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.badges.map((b) => {
          const unlocked = myBadges.has(b.id);
          return (
            <div key={b.id} className={`brut p-4 ${unlocked?"bg-amber-50":"opacity-70"}`}>
              <div className="flex items-center gap-3">
                <div className={`h-14 w-14 rounded grid place-items-center border-2 border-[#101828] ${unlocked?"bg-[#FBBF35]":"bg-slate-200"}`} style={{ boxShadow: "3px 3px 0 0 #101828" }}>
                  <Award className="h-7 w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold">{b.name}</div>
                  <div className="text-xs text-slate-600">{b.description}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">Rule: {b.metric} {b.operator} {b.value}</div>
              <div className="mt-2"><StatusBadge status={unlocked?"Approved":"Pending"}/></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Rewards() {
  const state = useESGStore();
  const redeem = useESGStore((s) => s.redeemReward);
  const empId = state.currentUser?.empId || "e1";
  const emp = state.employees.find((e) => e.id === empId);

  const doRedeem = (r) => {
    const res = redeem(r.id, empId);
    if (res.ok) toast.success(`Redeemed ${r.name}!`);
    else toast.error(res.error);
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Rewards Marketplace" description={`Your balance: ${emp?.points || 0} points`} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.rewards.map((r) => (
          <div key={r.id} className="brut brut-hover p-4">
            <div className="h-24 bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-[#101828] rounded mb-3 grid place-items-center"><Gift className="h-10 w-10 text-[#FBBF35]"/></div>
            <div className="flex justify-between"><div className="font-extrabold">{r.name}</div><StatusBadge status={r.status}/></div>
            <div className="text-xs text-slate-600 mt-1">{r.description}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs">Stock: <b>{r.stock}</b></div>
              <div className="text-lg font-extrabold text-[#FBBF35]">{r.points} pts</div>
            </div>
            <button data-testid={`redeem-${r.id}`} disabled={r.stock <= 0 || r.status !== "Active" || (emp?.points || 0) < r.points} onClick={() => doRedeem(r)} className="brut-btn w-full mt-3 bg-[#FBBF35] disabled:opacity-50 disabled:cursor-not-allowed">Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Redemptions() {
  const state = useESGStore();
  return (
    <div className="space-y-4">
      <PageHeader title="Reward Redemptions" description="History of all reward redemptions." />
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Employee","Reward","Points","Date"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {state.redemptions.map((r) => {
              const e = state.employees.find((x) => x.id === r.empId);
              const rw = state.rewards.find((x) => x.id === r.rewardId);
              return <tr key={r.id} className="border-b border-slate-200"><td className="px-3 py-2 font-bold">{e?.name}</td><td className="px-3 py-2">{rw?.name}</td><td className="px-3 py-2 font-bold">{r.points}</td><td className="px-3 py-2">{r.date}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Leaderboard() {
  const state = useESGStore();
  const sorted = [...state.employees].sort((a, b) => b.xp - a.xp);
  const [me] = [state.currentUser?.empId || "e1"];
  const podium = sorted.slice(0, 3);
  return (
    <div className="space-y-6">
      <PageHeader title="Leaderboard" description="Top performers driving ESG impact." />
      <div className="grid md:grid-cols-3 gap-4">
        {[1,0,2].map((idx) => {
          const p = podium[idx]; if (!p) return null;
          const rank = idx + 1;
          const heights = { 0: "h-40", 1: "h-52", 2: "h-32" };
          const colors = { 0: "#C0C0C0", 1: "#FBBF35", 2: "#CD7F32" };
          const Icon = rank === 1 ? Crown : rank === 2 ? Medal : Star;
          return (
            <div key={p.id} className={`brut p-4 flex flex-col items-center justify-end ${heights[idx]}`}>
              <Icon className="h-8 w-8" style={{ color: colors[idx] }}/>
              <div className="mt-2 text-lg font-extrabold">{p.name}</div>
              <div className="text-xs text-slate-500">{state.departments.find((d) => d.id === p.deptId)?.name}</div>
              <div className="mt-2 brut-sm px-3 py-1 text-sm font-extrabold" style={{ background: colors[idx] }}>#{rank} · {p.xp} XP</div>
            </div>
          );
        })}
      </div>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Rank","Employee","Department","XP","Points","Badges"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {sorted.map((e, i) => {
              const isMe = e.id === me;
              const badges = state.employeeBadges.filter((b) => b.empId === e.id).length;
              return (
                <tr key={e.id} className={`border-b border-slate-200 ${isMe?"bg-emerald-50 border-l-4 border-l-[#20C968]":""}`}>
                  <td className="px-3 py-2 font-extrabold">#{i+1}</td>
                  <td className="px-3 py-2 font-bold">{e.name} {isMe && <span className="text-xs text-[#20C968]">(You)</span>}</td>
                  <td className="px-3 py-2">{state.departments.find((d) => d.id === e.deptId)?.name}</td>
                  <td className="px-3 py-2 font-bold text-[#FBBF35]">{e.xp}</td>
                  <td className="px-3 py-2">{e.points}</td>
                  <td className="px-3 py-2">{badges}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
