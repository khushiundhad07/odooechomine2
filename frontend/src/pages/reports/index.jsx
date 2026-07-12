import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { useESGStore } from "../../store/useESGStore";
import { PageHeader, KPICard } from "../../components/common/UI";
import { computeOverall, emissionsByDept, departmentScores, isOverdue } from "../../utils/scoreCalculations";
import { exportCSV, exportExcel, exportPDF } from "../../utils/exportUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function ExportButtons({ title, rows, prefix }) {
  return (
    <div className="flex gap-2">
      <button data-testid={`${prefix}-export-pdf`} onClick={() => { exportPDF({ title, rows, filename: `${prefix}.pdf` }); toast.success("PDF exported"); }} className="brut-btn !py-1.5 bg-white"><Download className="h-4 w-4"/> PDF</button>
      <button data-testid={`${prefix}-export-excel`} onClick={() => { exportExcel(rows, `${prefix}.xlsx`); toast.success("Excel exported"); }} className="brut-btn !py-1.5 bg-white"><Download className="h-4 w-4"/> Excel</button>
      <button data-testid={`${prefix}-export-csv`} onClick={() => { exportCSV(rows, `${prefix}.csv`); toast.success("CSV exported"); }} className="brut-btn !py-1.5 bg-white"><Download className="h-4 w-4"/> CSV</button>
    </div>
  );
}

export function EnvReport() {
  const state = useESGStore();
  const rows = state.carbonTransactions.map((t) => ({ Ref: t.ref, Date: t.date, Dept: state.departments.find((d) => d.id === t.deptId)?.code, Source: t.sourceModule, Factor: state.emissionFactors.find((f) => f.id === t.efId)?.name, Qty: t.quantity, "Emission (kg)": t.calculatedEmission.toFixed(1), Status: t.status }));
  const total = state.carbonTransactions.reduce((s, t) => s + t.calculatedEmission, 0);
  return (
    <div className="space-y-4">
      <PageHeader title="Environmental Report" description="Emissions, factors, and goal progress." action={<ExportButtons title="Environmental Report" rows={rows} prefix="env-report"/>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Total Emissions" value={`${(total/1000).toFixed(1)}t`} color="#20C968"/>
        <KPICard label="Transactions" value={rows.length} color="#20C968"/>
        <KPICard label="Active Goals" value={state.goals.filter((g) => g.status !== "Achieved" && g.status !== "Closed").length} color="#3F7DF4"/>
        <KPICard label="Products Tracked" value={state.products.length} color="#8064F4"/>
      </div>
      <div className="brut p-4">
        <div className="text-xs uppercase font-bold text-slate-500">Emissions by Department</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={emissionsByDept(state)}><CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4"/><XAxis dataKey="name"/><YAxis/><Tooltip contentStyle={{ border: "2px solid #101828", borderRadius: 6 }}/><Bar dataKey="value" fill="#20C968" radius={[4,4,0,0]}/></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SocReport() {
  const state = useESGStore();
  const rows = state.participations.map((p) => ({ Employee: state.employees.find((e) => e.id === p.empId)?.name, Activity: state.csrActivities.find((a) => a.id === p.activityId)?.title, Status: p.status, Points: p.points, Date: p.submitted || "-" }));
  return (
    <div className="space-y-4">
      <PageHeader title="Social Report" description="CSR & diversity performance." action={<ExportButtons title="Social Report" rows={rows} prefix="social-report"/>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Participations" value={rows.length} color="#3F7DF4"/>
        <KPICard label="Approved" value={rows.filter((r) => r.Status === "Approved").length} color="#20C968"/>
        <KPICard label="Diversity Score" value={state.diversity.diversityScore} color="#8064F4"/>
        <KPICard label="Training Programs" value={state.training.length} color="#EC4899"/>
      </div>
    </div>
  );
}

export function GovReport() {
  const state = useESGStore();
  const rows = state.complianceIssues.map((i) => ({ Ref: i.ref, Severity: i.severity, Dept: state.departments.find((d) => d.id === i.deptId)?.code, Owner: state.employees.find((e) => e.id === i.ownerId)?.name, Due: i.due, Status: i.status, Overdue: isOverdue(i) ? "Yes" : "No" }));
  return (
    <div className="space-y-4">
      <PageHeader title="Governance Report" description="Policies, audits, and compliance issues." action={<ExportButtons title="Governance Report" rows={rows} prefix="gov-report"/>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Total Issues" value={rows.length} color="#8064F4"/>
        <KPICard label="Open" value={rows.filter((r) => r.Status === "Open" || r.Status === "In Progress").length} color="#F79009"/>
        <KPICard label="Overdue" value={rows.filter((r) => r.Overdue === "Yes").length} color="#F04438"/>
        <KPICard label="Audits" value={state.audits.length} color="#3F7DF4"/>
      </div>
    </div>
  );
}

export function Summary() {
  const state = useESGStore();
  const { env, soc, gov, overall } = computeOverall(state);
  const depts = departmentScores(state).sort((a,b) => b.score - a.score);
  const rows = depts.map((d) => ({ Dept: d.name, Env: d.env, Soc: d.soc, Gov: d.gov, Overall: d.score }));
  return (
    <div className="space-y-4">
      <PageHeader title="ESG Summary Report" description="Consolidated executive view." action={<ExportButtons title="ESG Summary" rows={rows} prefix="esg-summary"/>}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Overall ESG" value={overall} color="#101828"/>
        <KPICard label="Environmental" value={env} color="#20C968"/>
        <KPICard label="Social" value={soc} color="#3F7DF4"/>
        <KPICard label="Governance" value={gov} color="#8064F4"/>
      </div>
      <div className="brut p-4">
        <div className="text-xs uppercase font-bold text-slate-500 mb-2">Department Rankings</div>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-slate-500"><tr>{["Rank","Dept","Env","Soc","Gov","Overall"].map((h) => <th key={h} className="text-left py-2">{h}</th>)}</tr></thead>
          <tbody>
            {depts.map((d, i) => <tr key={d.id} className="border-t border-slate-200"><td className="py-2 font-extrabold">#{i+1}</td><td className="py-2 font-bold">{d.name}</td><td className="py-2">{d.env}</td><td className="py-2">{d.soc}</td><td className="py-2">{d.gov}</td><td className="py-2 font-extrabold">{d.score}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Custom() {
  const state = useESGStore();
  const [module, setModule] = useState("environmental");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  let rows = [];
  if (module === "environmental") {
    rows = state.carbonTransactions
      .filter((t) => dept === "all" || t.deptId === dept)
      .filter((t) => !from || t.date >= from)
      .filter((t) => !to || t.date <= to)
      .map((t) => ({ Ref: t.ref, Date: t.date, Dept: state.departments.find((d) => d.id === t.deptId)?.code, Source: t.sourceModule, Emission: t.calculatedEmission.toFixed(1) }));
  } else if (module === "social") {
    rows = state.participations
      .filter((p) => status === "all" || p.status === status)
      .map((p) => ({ Employee: state.employees.find((e) => e.id === p.empId)?.name, Activity: state.csrActivities.find((a) => a.id === p.activityId)?.title, Status: p.status, Points: p.points }));
  } else if (module === "governance") {
    rows = state.complianceIssues
      .filter((i) => dept === "all" || i.deptId === dept)
      .filter((i) => status === "all" || i.status === status)
      .map((i) => ({ Ref: i.ref, Severity: i.severity, Owner: state.employees.find((e) => e.id === i.ownerId)?.name, Due: i.due, Status: i.status }));
  } else {
    rows = state.challengeParticipations.map((p) => ({ Employee: state.employees.find((e) => e.id === p.empId)?.name, Challenge: state.challenges.find((c) => c.id === p.challengeId)?.title, Status: p.status, XP: p.xp }));
  }

  return (
    <div className="space-y-4">
      <PageHeader title="Custom Report Builder" description="Filter, preview and export in PDF / Excel / CSV." action={<ExportButtons title="Custom Report" rows={rows} prefix="custom-report"/>}/>
      <div className="brut p-4 grid md:grid-cols-5 gap-3">
        <div><label className="text-xs font-bold">Module</label>
          <select className="brut-input w-full" value={module} onChange={(e) => setModule(e.target.value)}>{["environmental","social","governance","gamification"].map(s=><option key={s} value={s}>{s}</option>)}</select>
        </div>
        <div><label className="text-xs font-bold">Department</label>
          <select className="brut-input w-full" value={dept} onChange={(e) => setDept(e.target.value)}><option value="all">All</option>{state.departments.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select>
        </div>
        <div><label className="text-xs font-bold">Status</label>
          <select className="brut-input w-full" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">All</option>{["Draft","Submitted","Approved","Rejected","Open","In Progress","Resolved","Closed"].map(s=><option key={s}>{s}</option>)}</select>
        </div>
        <div><label className="text-xs font-bold">From</label><input type="date" className="brut-input w-full" value={from} onChange={(e) => setFrom(e.target.value)}/></div>
        <div><label className="text-xs font-bold">To</label><input type="date" className="brut-input w-full" value={to} onChange={(e) => setTo(e.target.value)}/></div>
      </div>
      <div className="brut overflow-x-auto">
        <div className="p-3 flex items-center gap-2 border-b-2 border-slate-100"><FileText className="h-4 w-4"/><b>Preview</b> <span className="text-xs text-slate-500">({rows.length} rows)</span></div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr>{rows[0] && Object.keys(rows[0]).map((k) => <th key={k} className="text-left px-3 py-2 text-xs uppercase font-bold">{k}</th>)}</tr></thead>
          <tbody>{rows.slice(0,30).map((r,i) => <tr key={i} className="border-b border-slate-200">{Object.values(r).map((v,j) => <td key={j} className="px-3 py-2">{String(v)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
