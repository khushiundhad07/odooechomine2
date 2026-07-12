import React, { useState } from "react";
import { toast } from "sonner";
import { Users, Plus, Check, X } from "lucide-react";
import { useESGStore } from "../../store/useESGStore";
import { PageHeader, KPICard, StatusBadge, ProgressBar } from "../../components/common/UI";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { computeSocialScore } from "../../utils/scoreCalculations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/dialog";

const COLORS = ["#20C968", "#3F7DF4", "#8064F4", "#FBBF35", "#EC4899", "#F79009"];

export function Overview() {
  const state = useESGStore();
  const total = state.participations.length || 1;
  const approved = state.participations.filter((p) => p.status === "Approved").length;
  const pending = state.participations.filter((p) => p.status === "Submitted").length;
  const active = state.csrActivities.filter((a) => a.status === "Published" || a.status === "Ongoing").length;

  const partByDept = state.departments.map((d) => {
    const c = state.participations.filter((p) => state.employees.find((e) => e.id === p.empId)?.deptId === d.id && p.status === "Approved").length;
    return { name: d.code, value: c };
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Social" description="CSR engagement, diversity and training performance." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Social Score" value={computeSocialScore(state)} color="#3F7DF4" />
        <KPICard label="Active Activities" value={active} color="#3F7DF4" />
        <KPICard label="Participation Rate" value={`${Math.round((approved/total)*100)}%`} color="#EC4899" />
        <KPICard label="Diversity Score" value={state.diversity.diversityScore} color="#8064F4" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">CSR Participation by Dept</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={partByDept}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="name" fontSize={11}/><YAxis fontSize={11}/><Tooltip contentStyle={{ border: "2px solid #101828", borderRadius: 6 }} />
              <Bar dataKey="value" fill="#3F7DF4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Diversity Distribution</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={state.diversity.gender} dataKey="value" nameKey="name" outerRadius={80} label>
                {state.diversity.gender.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function CSRActivities() {
  const state = useESGStore();
  const add = useESGStore((s) => s.addCSRActivity);
  const join = useESGStore((s) => s.joinCSRActivity);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:"", category:"Environment", deptId:state.departments[0]?.id, description:"", location:"", start:"", end:"", maxParticipants:50, points:30, coordinator:"", evidenceRequired:true });

  const save = () => {
    if (!form.title) { toast.error("Title required"); return; }
    add(form); toast.success("Activity created"); setOpen(false);
  };

  return (
    <div className="space-y-4">
      <PageHeader title="CSR Activities" description="Company-wide social initiatives employees can join." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button data-testid="add-csr-btn" className="brut-btn bg-[#3F7DF4] text-white"><Plus className="h-4 w-4"/> New Activity</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New CSR Activity</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Title" className="brut-input col-span-2" value={form.title} onChange={(e) => setForm({...form, title:e.target.value})}/>
              <input placeholder="Category" className="brut-input" value={form.category} onChange={(e) => setForm({...form, category:e.target.value})}/>
              <input placeholder="Location" className="brut-input" value={form.location} onChange={(e) => setForm({...form, location:e.target.value})}/>
              <input type="date" className="brut-input" value={form.start} onChange={(e) => setForm({...form, start:e.target.value})}/>
              <input type="date" className="brut-input" value={form.end} onChange={(e) => setForm({...form, end:e.target.value})}/>
              <input type="number" placeholder="Max participants" className="brut-input" value={form.maxParticipants} onChange={(e) => setForm({...form, maxParticipants:parseInt(e.target.value)})}/>
              <input type="number" placeholder="Points" className="brut-input" value={form.points} onChange={(e) => setForm({...form, points:parseInt(e.target.value)})}/>
              <textarea placeholder="Description" className="brut-input col-span-2" value={form.description} onChange={(e) => setForm({...form, description:e.target.value})}/>
            </div>
            <DialogFooter><button className="brut-btn bg-[#3F7DF4] text-white" onClick={save}>Publish</button></DialogFooter>
          </DialogContent>
        </Dialog>
      }/>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.csrActivities.map((a) => (
          <div key={a.id} className="brut brut-hover p-4">
            <div className="flex items-center justify-between"><div className="text-xs uppercase font-bold text-slate-500">{a.category}</div><StatusBadge status={a.status}/></div>
            <div className="font-extrabold text-lg mt-1">{a.title}</div>
            <div className="text-xs text-slate-600 mt-1">{a.location} · {a.start}</div>
            <div className="text-sm mt-2 line-clamp-2">{a.description}</div>
            <div className="mt-3 text-xs flex justify-between"><span>{a.currentParticipants}/{a.maxParticipants} joined</span><span className="font-bold text-[#3F7DF4]">{a.points} pts</span></div>
            <ProgressBar value={(a.currentParticipants/a.maxParticipants)*100} color="#3F7DF4" />
            <button onClick={() => { join(a.id, state.currentUser?.empId || "e1"); toast.success("Joined activity"); }} data-testid={`join-csr-${a.id}`} className="brut-btn w-full mt-3 bg-white">Join Activity</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Participation() {
  const state = useESGStore();
  const approve = useESGStore((s) => s.approveCSRParticipation);
  const reject = useESGStore((s) => s.rejectCSRParticipation);
  const submit = useESGStore((s) => s.submitCSRParticipation);
  const [filter, setFilter] = useState("all");
  const list = state.participations.filter((p) => filter === "all" || p.status === filter);

  return (
    <div className="space-y-4">
      <PageHeader title="Employee Participation" description="Review and approve CSR participation submissions." />
      <div className="flex gap-2 flex-wrap">
        {["all","Draft","Submitted","Approved","Rejected"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} data-testid={`filter-${s.toLowerCase()}`} className={`brut-btn !py-1.5 ${filter===s?"bg-[#3F7DF4] text-white":"bg-white"}`}>{s}</button>
        ))}
      </div>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Employee","Activity","Proof","Points","Submitted","Status","Actions"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {list.map((p) => {
              const emp = state.employees.find((e) => e.id === p.empId);
              const act = state.csrActivities.find((a) => a.id === p.activityId);
              return (
                <tr key={p.id} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-bold">{emp?.name}</td>
                  <td className="px-3 py-2">{act?.title}</td>
                  <td className="px-3 py-2">{p.proof || <span className="text-slate-400">—</span>}</td>
                  <td className="px-3 py-2 font-bold">{p.points}</td>
                  <td className="px-3 py-2">{p.submitted || "-"}</td>
                  <td className="px-3 py-2"><StatusBadge status={p.status}/></td>
                  <td className="px-3 py-2">
                    {p.status === "Draft" && <button onClick={() => { submit(p.id, "photo.jpg"); toast.success("Submitted"); }} className="text-xs font-bold text-blue-600">Submit</button>}
                    {p.status === "Submitted" && <div className="flex gap-2">
                      <button data-testid={`approve-csr-${p.id}`} onClick={() => { const ok = approve(p.id); if (ok) toast.success("Approved"); else toast.error("Evidence required"); }} className="brut-sm px-2 py-1 text-xs bg-emerald-50 text-emerald-700 font-bold flex items-center gap-1"><Check className="h-3 w-3"/> Approve</button>
                      <button onClick={() => { reject(p.id, "Rejected"); toast("Rejected"); }} className="brut-sm px-2 py-1 text-xs bg-red-50 text-red-700 font-bold flex items-center gap-1"><X className="h-3 w-3"/> Reject</button>
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

export function Diversity() {
  const state = useESGStore();
  return (
    <div className="space-y-6">
      <PageHeader title="Diversity Metrics" description="Workforce diversity and inclusion insights." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Diversity Score" value={state.diversity.diversityScore} color="#8064F4" />
        <KPICard label="Inclusion Index" value={state.diversity.inclusionIndex} color="#EC4899" />
        <KPICard label="Female %" value={`${state.diversity.gender.find((g)=>g.name==="Female")?.value}%`} color="#3F7DF4" />
        <KPICard label="Leadership Female" value={`${state.diversity.leadership.find((g)=>g.name==="Female")?.value}%`} color="#20C968" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { title: "Gender", data: state.diversity.gender },
          { title: "Age", data: state.diversity.age },
          { title: "Leadership", data: state.diversity.leadership },
        ].map((c) => (
          <div key={c.title} className="brut p-4">
            <div className="text-xs uppercase font-bold text-slate-500 mb-2">{c.title}</div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={c.data} dataKey="value" nameKey="name" outerRadius={80} label>{c.data.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Legend /></PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Training() {
  const state = useESGStore();
  return (
    <div className="space-y-4">
      <PageHeader title="Training Completion" description="Track mandatory and elective training programs." />
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Title","Category","Dept","Assigned","Completed","Progress","Deadline","Status"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {state.training.map((t) => {
              const pct = Math.round((t.completed/t.assigned)*100);
              const d = state.departments.find((x) => x.id === t.deptId);
              return (
                <tr key={t.id} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-bold">{t.title}</td><td className="px-3 py-2">{t.category}</td>
                  <td className="px-3 py-2">{d?.code || "ALL"}</td><td className="px-3 py-2">{t.assigned}</td><td className="px-3 py-2">{t.completed}</td>
                  <td className="px-3 py-2 w-40"><ProgressBar value={pct} color="#3F7DF4" /><div className="text-[10px] mt-0.5">{pct}%</div></td>
                  <td className="px-3 py-2">{t.deadline}</td><td className="px-3 py-2"><StatusBadge status={t.status}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
