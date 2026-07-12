import React, { useState } from "react";
import { toast } from "sonner";
import { Plus, AlertTriangle } from "lucide-react";
import { useESGStore } from "../../store/useESGStore";
import { PageHeader, KPICard, StatusBadge, SeverityBadge, ProgressBar } from "../../components/common/UI";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { computeGovScore, isOverdue } from "../../utils/scoreCalculations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/dialog";

const COLORS = ["#20C968", "#F79009", "#F04438", "#8064F4"];

export function Overview() {
  const state = useESGStore();
  const published = state.policies.filter((p) => p.status === "Published").length;
  const ack = state.acknowledgements.filter((a) => a.status === "Acknowledged").length;
  const total = state.acknowledgements.length || 1;
  const open = state.complianceIssues.filter((i) => i.status === "Open" || i.status === "In Progress").length;
  const overdue = state.complianceIssues.filter(isOverdue).length;
  const critical = state.complianceIssues.filter((i) => i.severity === "Critical").length;
  const bySeverity = ["Low","Medium","High","Critical"].map((s, i) => ({ name: s, value: state.complianceIssues.filter((x) => x.severity === s).length, color: COLORS[i] }));
  return (
    <div className="space-y-6">
      <PageHeader title="Governance" description="Policies, audits, and compliance oversight." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Governance Score" value={computeGovScore(state)} color="#8064F4" />
        <KPICard label="Published Policies" value={published} color="#8064F4" />
        <KPICard label="Ack Rate" value={`${Math.round((ack/total)*100)}%`} color="#20C968" />
        <KPICard label="Overdue Issues" value={overdue} color="#F04438" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Issues by Severity</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={bySeverity}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="name" fontSize={11}/><YAxis fontSize={11}/><Tooltip contentStyle={{ border: "2px solid #101828", borderRadius: 6 }} />
              <Bar dataKey="value" radius={[4,4,0,0]}>{bySeverity.map((b) => <Cell key={b.name} fill={b.color}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Audit Status</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={["Planned","In Progress","Completed","Closed"].map((s, i) => ({ name: s, value: state.audits.filter((a) => a.status === s).length }))} dataKey="value" nameKey="name" outerRadius={80} label>
                {["Planned","In Progress","Completed","Closed"].map((_, i) => <Cell key={i} fill={COLORS[i]}/>)}
              </Pie><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function Policies() {
  const state = useESGStore();
  return (
    <div className="space-y-4">
      <PageHeader title="ESG Policies" description="Central repository of company policies and their acknowledgement status." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.policies.map((p) => {
          const acks = state.acknowledgements.filter((a) => a.policyId === p.id);
          const done = acks.filter((a) => a.status === "Acknowledged").length;
          const pct = acks.length ? Math.round((done / acks.length) * 100) : 0;
          return (
            <div key={p.id} className="brut brut-hover p-4">
              <div className="flex items-center justify-between"><div className="text-xs uppercase font-bold text-slate-500">{p.code} · v{p.version}</div><StatusBadge status={p.status}/></div>
              <div className="font-extrabold text-lg mt-1">{p.name}</div>
              <div className="text-xs text-slate-600 mt-1 line-clamp-2">{p.description}</div>
              <div className="mt-3 text-xs flex justify-between"><span>Ack: {done}/{acks.length}</span><span className="text-slate-500">Review {p.review}</span></div>
              <ProgressBar value={pct} color="#8064F4"/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Acknowledgements() {
  const state = useESGStore();
  const ack = useESGStore((s) => s.acknowledgePolicy);
  const [filter, setFilter] = useState("Pending");
  const list = state.acknowledgements.filter((a) => filter === "all" || a.status === filter).slice(0, 60);
  return (
    <div className="space-y-4">
      <PageHeader title="Policy Acknowledgements" description="Employee-by-policy acknowledgement tracking." />
      <div className="flex gap-2">
        {["Pending","Acknowledged","all"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`brut-btn !py-1.5 ${filter===s?"bg-[#8064F4] text-white":"bg-white"}`}>{s}</button>
        ))}
      </div>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Policy","Employee","Dept","Status","Ack Date","Reminders",""].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {list.map((a) => {
              const p = state.policies.find((x) => x.id === a.policyId);
              const e = state.employees.find((x) => x.id === a.empId);
              const d = state.departments.find((x) => x.id === e?.deptId);
              return (
                <tr key={a.id} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-bold">{p?.name}</td>
                  <td className="px-3 py-2">{e?.name}</td>
                  <td className="px-3 py-2">{d?.code}</td>
                  <td className="px-3 py-2"><StatusBadge status={a.status}/></td>
                  <td className="px-3 py-2">{a.date || "-"}</td>
                  <td className="px-3 py-2">{a.reminderCount}</td>
                  <td className="px-3 py-2">{a.status === "Pending" && <button onClick={() => { ack(a.policyId, a.empId); toast.success("Acknowledged"); }} className="text-xs font-bold text-emerald-600">Acknowledge</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Audits() {
  const state = useESGStore();
  const addAudit = useESGStore((s) => s.addAudit);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:"", type:"Environmental", deptId:state.departments[0]?.id, lead:"", planned:"", scope:"", team:[], result:"-" });
  return (
    <div className="space-y-4">
      <PageHeader title="Audits" description="Internal ESG and compliance audits." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="brut-btn bg-[#8064F4] text-white"><Plus className="h-4 w-4"/> New Audit</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Audit</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Title" className="brut-input col-span-2" value={form.title} onChange={(e) => setForm({...form,title:e.target.value})}/>
              <select className="brut-input" value={form.type} onChange={(e) => setForm({...form,type:e.target.value})}>{["Environmental","Social","Governance"].map(s=><option key={s}>{s}</option>)}</select>
              <select className="brut-input" value={form.deptId} onChange={(e) => setForm({...form,deptId:e.target.value})}>{state.departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select>
              <input placeholder="Lead auditor" className="brut-input" value={form.lead} onChange={(e) => setForm({...form,lead:e.target.value})}/>
              <input type="date" className="brut-input" value={form.planned} onChange={(e) => setForm({...form,planned:e.target.value})}/>
              <input placeholder="Scope" className="brut-input col-span-2" value={form.scope} onChange={(e) => setForm({...form,scope:e.target.value})}/>
            </div>
            <DialogFooter><button className="brut-btn bg-[#8064F4] text-white" onClick={() => { if (!form.title) { toast.error("Title required"); return; } addAudit(form); toast.success("Audit planned"); setOpen(false); }}>Save</button></DialogFooter>
          </DialogContent>
        </Dialog>
      }/>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Ref","Title","Type","Dept","Lead","Planned","Findings","Result","Status"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {state.audits.map((a) => {
              const d = state.departments.find((x) => x.id === a.deptId);
              return (
                <tr key={a.id} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-bold">{a.ref}</td><td className="px-3 py-2">{a.title}</td>
                  <td className="px-3 py-2">{a.type}</td><td className="px-3 py-2">{d?.code}</td>
                  <td className="px-3 py-2">{a.lead}</td><td className="px-3 py-2">{a.planned}</td>
                  <td className="px-3 py-2 font-bold">{a.findings}</td><td className="px-3 py-2">{a.result}</td>
                  <td className="px-3 py-2"><StatusBadge status={a.status}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Compliance() {
  const state = useESGStore();
  const addIssue = useESGStore((s) => s.addComplianceIssue);
  const updIssue = useESGStore((s) => s.updateComplianceIssue);
  const [view, setView] = useState("table");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ deptId:state.departments[0]?.id, severity:"Medium", description:"", ownerId:state.employees[0]?.id, due:"", corrective:"" });

  const save = () => {
    if (!form.description || !form.due || !form.severity || !form.ownerId) { toast.error("All fields required"); return; }
    addIssue(form); toast.success("Compliance issue raised"); setOpen(false); setForm({ ...form, description:"", due:"" });
  };

  const cols = ["Open","In Progress","Resolved","Closed"];

  return (
    <div className="space-y-4">
      <PageHeader title="Compliance Issues" description="Track, assign and resolve compliance items." action={
        <div className="flex gap-2">
          <div className="brut-sm p-1 flex gap-1">
            <button onClick={() => setView("table")} className={`px-2 py-1 text-xs font-bold rounded ${view==="table"?"bg-[#101828] text-white":""}`}>Table</button>
            <button onClick={() => setView("kanban")} className={`px-2 py-1 text-xs font-bold rounded ${view==="kanban"?"bg-[#101828] text-white":""}`}>Kanban</button>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><button data-testid="add-issue-btn" className="brut-btn bg-[#F04438] text-white"><Plus className="h-4 w-4"/> Raise Issue</button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Raise Compliance Issue</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-3">
                <select className="brut-input" value={form.deptId} onChange={(e) => setForm({...form,deptId:e.target.value})}>{state.departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select>
                <select className="brut-input" value={form.severity} onChange={(e) => setForm({...form,severity:e.target.value})}>{["Low","Medium","High","Critical"].map(s=><option key={s}>{s}</option>)}</select>
                <select className="brut-input col-span-2" value={form.ownerId} onChange={(e) => setForm({...form,ownerId:e.target.value})}>{state.employees.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
                <input data-testid="issue-due" type="date" className="brut-input col-span-2" value={form.due} onChange={(e) => setForm({...form,due:e.target.value})}/>
                <textarea data-testid="issue-desc" placeholder="Description" className="brut-input col-span-2" value={form.description} onChange={(e) => setForm({...form,description:e.target.value})}/>
                <textarea placeholder="Corrective action" className="brut-input col-span-2" value={form.corrective} onChange={(e) => setForm({...form,corrective:e.target.value})}/>
              </div>
              <DialogFooter><button data-testid="issue-save" className="brut-btn bg-[#F04438] text-white" onClick={save}>Save</button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }/>

      {view === "table" ? (
        <div className="brut overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Ref","Description","Dept","Severity","Owner","Due","Status",""].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
            <tbody>
              {state.complianceIssues.map((i) => {
                const d = state.departments.find((x) => x.id === i.deptId);
                const o = state.employees.find((x) => x.id === i.ownerId);
                const overdue = isOverdue(i);
                return (
                  <tr key={i.id} className={`border-b border-slate-200 ${overdue?"bg-red-50 border-l-4 border-l-red-500":""}`}>
                    <td className="px-3 py-2 font-bold">{i.ref}</td>
                    <td className="px-3 py-2 max-w-md">{i.description} {overdue && <span className="brut-sm bg-red-100 text-red-700 border-red-500 px-1.5 py-0.5 text-[10px] font-extrabold ml-1">OVERDUE</span>}</td>
                    <td className="px-3 py-2">{d?.code}</td>
                    <td className="px-3 py-2"><SeverityBadge severity={i.severity}/></td>
                    <td className="px-3 py-2">{o?.name}</td>
                    <td className="px-3 py-2">{i.due}</td>
                    <td className="px-3 py-2"><StatusBadge status={i.status}/></td>
                    <td className="px-3 py-2">
                      <select value={i.status} onChange={(e) => { updIssue(i.id, { status: e.target.value }); toast.success("Status updated"); }} className="brut-input !py-1 text-xs">
                        {["Open","In Progress","Resolved","Closed"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-3">
          {cols.map((col) => (
            <div key={col} className="brut p-3">
              <div className="text-xs uppercase font-bold mb-2">{col}</div>
              {state.complianceIssues.filter((i) => i.status === col).map((i) => (
                <div key={i.id} className={`p-2 border-2 rounded mb-2 ${isOverdue(i)?"border-red-500 bg-red-50":"border-slate-200"}`}>
                  <div className="text-xs font-bold flex justify-between">{i.ref} <SeverityBadge severity={i.severity}/></div>
                  <div className="text-xs text-slate-700 mt-1 line-clamp-2">{i.description}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Due {i.due}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
