import React, { useState } from "react";
import { toast } from "sonner";
import { Leaf, Plus, Search, Trash2, Edit } from "lucide-react";
import { useESGStore } from "../../store/useESGStore";
import { PageHeader, KPICard, StatusBadge, ProgressBar } from "../../components/common/UI";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { computeEnvScore, emissionsByMonth, emissionsByScope, emissionsBySource, emissionsByDept } from "../../utils/scoreCalculations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/dialog";

const COLORS = ["#20C968", "#3F7DF4", "#8064F4", "#FBBF35", "#14B8C8", "#EC4899", "#F79009", "#F04438"];

export function Overview() {
  const state = useESGStore();
  const total = Math.round(state.carbonTransactions.reduce((s, t) => s + t.calculatedEmission, 0));
  const avoided = Math.round(state.employees.reduce((s, e) => s + (e.xp || 0), 0) * 0.6);
  const active = state.goals.filter((g) => g.status === "On Track" || g.status === "At Risk" || g.status === "Active").length;
  const achieved = state.goals.filter((g) => g.status === "Achieved").length;
  return (
    <div className="space-y-6">
      <PageHeader title="Environmental" description="Track emissions, factors, goals and product impact." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Environmental Score" value={computeEnvScore(state)} sub="/ 100" color="#20C968" />
        <KPICard label="Total Emissions" value={`${(total/1000).toFixed(1)} t`} sub="kg CO₂e" color="#20C968" />
        <KPICard label="Carbon Avoided" value={`${avoided} kg`} color="#14B8C8" />
        <KPICard label="Goals Active / Achieved" value={`${active} / ${achieved}`} color="#3F7DF4" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Emissions by Department</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={emissionsByDept(state)}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="name" fontSize={11} /><YAxis fontSize={11} />
              <Tooltip contentStyle={{ border: "2px solid #101828", borderRadius: 6 }} />
              <Bar dataKey="value" fill="#20C968" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Monthly Trend</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={emissionsByMonth(state)}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
              <XAxis dataKey="month" fontSize={11} /><YAxis fontSize={11} />
              <Tooltip contentStyle={{ border: "2px solid #101828", borderRadius: 6 }} />
              <Line type="monotone" dataKey="value" stroke="#20C968" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Emissions by Scope</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={emissionsByScope(state)} dataKey="value" nameKey="name" outerRadius={80} label>
                {emissionsByScope(state).map((s, i) => <Cell key={s.name} fill={COLORS[i]} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500">Goal Progress</div>
          <div className="mt-2 space-y-3">
            {state.goals.slice(0,5).map((g) => {
              const range = Math.abs(g.baseline - g.target) || 1;
              const done = Math.abs(g.baseline - g.current);
              const pct = Math.round((done / range) * 100);
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-xs mb-1"><span className="font-bold">{g.name}</span><StatusBadge status={g.status} /></div>
                  <ProgressBar value={pct} color="#20C968" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Transactions() {
  const state = useESGStore();
  const add = useESGStore((s) => s.addCarbonTransaction);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0,10), deptId: state.departments[0]?.id, sourceModule: "Manual", sourceRecord: "", efId: state.emissionFactors[0]?.id, quantity: 0 });
  const list = state.carbonTransactions.filter((t) => !q || t.ref.toLowerCase().includes(q.toLowerCase()) || t.sourceModule.toLowerCase().includes(q.toLowerCase()));

  const submit = () => {
    if (!form.quantity || form.quantity <= 0) { toast.error("Quantity must be > 0"); return; }
    add(form);
    toast.success("Carbon transaction saved");
    setOpen(false);
    setForm({ ...form, quantity: 0, sourceRecord: "" });
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Carbon Transactions" description="All emissions data across the organization." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button data-testid="add-ct-btn" className="brut-btn bg-[#20C968] text-white"><Plus className="h-4 w-4"/> New Transaction</button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>New Carbon Transaction</DialogTitle></DialogHeader>
            <div className="grid gap-3">
              <div>
                <label className="text-xs font-bold">Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="brut-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-bold">Department</label>
                  <select value={form.deptId} onChange={(e) => setForm({...form, deptId: e.target.value})} className="brut-input w-full">
                    {state.departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-bold">Source Module</label>
                  <select value={form.sourceModule} onChange={(e) => setForm({...form, sourceModule: e.target.value})} className="brut-input w-full">
                    {["Purchase","Manufacturing","Expense","Fleet","Manual"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="text-xs font-bold">ERP Reference</label>
                <input value={form.sourceRecord} onChange={(e) => setForm({...form, sourceRecord: e.target.value})} className="brut-input w-full" placeholder="e.g. PO/2026/0022" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-bold">Emission Factor</label>
                  <select value={form.efId} onChange={(e) => setForm({...form, efId: e.target.value})} className="brut-input w-full">
                    {state.emissionFactors.map((f) => <option key={f.id} value={f.id}>{f.name} ({f.value} {f.unit})</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-bold">Quantity</label>
                  <input data-testid="ct-quantity" type="number" min="0" value={form.quantity} onChange={(e) => setForm({...form, quantity: parseFloat(e.target.value)})} className="brut-input w-full" />
                </div>
              </div>
              <div className="text-sm p-3 bg-emerald-50 border-2 border-emerald-300 rounded">
                Calculated: <b>{(form.quantity * (state.emissionFactors.find(f => f.id === form.efId)?.value || 0)).toFixed(2)} kg CO₂e</b>
              </div>
            </div>
            <DialogFooter><button data-testid="ct-save-btn" className="brut-btn bg-[#20C968] text-white" onClick={submit}>Save Transaction</button></DialogFooter>
          </DialogContent>
        </Dialog>
      } />

      <div className="brut p-3 flex items-center gap-2">
        <Search className="h-4 w-4 text-slate-500" />
        <input placeholder="Search reference or module..." value={q} onChange={(e) => setQ(e.target.value)} className="outline-none flex-1 bg-transparent" />
      </div>

      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]">
            <tr className="text-left">
              {["Ref","Date","Dept","Source","Activity","Qty","Emission (kg)","Scope","Status"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold tracking-widest">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((t) => {
              const ef = state.emissionFactors.find((f) => f.id === t.efId);
              const d = state.departments.find((x) => x.id === t.deptId);
              return (
                <tr key={t.id} className="border-b border-slate-200">
                  <td className="px-3 py-2 font-bold">{t.ref}</td>
                  <td className="px-3 py-2">{t.date}</td>
                  <td className="px-3 py-2">{d?.code}</td>
                  <td className="px-3 py-2">{t.sourceModule}</td>
                  <td className="px-3 py-2">{ef?.name}</td>
                  <td className="px-3 py-2">{t.quantity} {ef?.unit}</td>
                  <td className="px-3 py-2 font-bold">{t.calculatedEmission.toFixed(1)}</td>
                  <td className="px-3 py-2">{ef?.scope}</td>
                  <td className="px-3 py-2"><StatusBadge status={t.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmissionFactors() {
  const state = useESGStore();
  const update = useESGStore((s) => s.updateEmissionFactor);
  const del = useESGStore((s) => s.deleteEmissionFactor);
  const add = useESGStore((s) => s.addEmissionFactor);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:"", activity:"", scope:"Scope 1", unit:"kg", value:0, source:"", region:"GLOBAL", from:new Date().toISOString().slice(0,10), status:"Active" });

  const save = () => {
    if (!form.name || form.value <= 0) { toast.error("Name and factor value required"); return; }
    add(form); toast.success("Factor added"); setOpen(false);
  };
  return (
    <div className="space-y-4">
      <PageHeader title="Emission Factors" description="Reference factors used to auto-calculate carbon emissions." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="brut-btn bg-[#20C968] text-white" data-testid="add-ef-btn"><Plus className="h-4 w-4"/> New Factor</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Emission Factor</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Name" className="brut-input col-span-2" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})}/>
              <input placeholder="Activity" className="brut-input" value={form.activity} onChange={(e) => setForm({...form, activity:e.target.value})}/>
              <select className="brut-input" value={form.scope} onChange={(e) => setForm({...form, scope:e.target.value})}>{["Scope 1","Scope 2","Scope 3"].map(s=><option key={s}>{s}</option>)}</select>
              <input placeholder="Unit" className="brut-input" value={form.unit} onChange={(e) => setForm({...form, unit:e.target.value})}/>
              <input type="number" placeholder="Value" className="brut-input" value={form.value} onChange={(e) => setForm({...form, value:parseFloat(e.target.value)})}/>
              <input placeholder="Source" className="brut-input col-span-2" value={form.source} onChange={(e) => setForm({...form, source:e.target.value})}/>
            </div>
            <DialogFooter><button className="brut-btn bg-[#20C968] text-white" onClick={save}>Save</button></DialogFooter>
          </DialogContent>
        </Dialog>
      }/>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Name","Activity","Scope","Unit","Value","Source","Region","Status",""].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {state.emissionFactors.map((f) => (
              <tr key={f.id} className="border-b border-slate-200">
                <td className="px-3 py-2 font-bold">{f.name}</td><td className="px-3 py-2">{f.activity}</td>
                <td className="px-3 py-2">{f.scope}</td><td className="px-3 py-2">{f.unit}</td>
                <td className="px-3 py-2 font-bold">{f.value}</td><td className="px-3 py-2">{f.source}</td>
                <td className="px-3 py-2">{f.region}</td><td className="px-3 py-2"><StatusBadge status={f.status}/></td>
                <td className="px-3 py-2 flex gap-2">
                  <button onClick={() => update(f.id, { status: f.status === "Active" ? "Inactive" : "Active" })} className="text-xs font-bold text-blue-600">{f.status === "Active" ? "Deactivate" : "Activate"}</button>
                  <button onClick={() => del(f.id)} className="text-xs font-bold text-red-600"><Trash2 className="h-3 w-3 inline"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Goals() {
  const state = useESGStore();
  return (
    <div className="space-y-4">
      <PageHeader title="Environmental Goals" description="Target-driven initiatives with real-time progress tracking." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.goals.map((g) => {
          const range = Math.abs(g.baseline - g.target) || 1;
          const done = Math.abs(g.baseline - g.current);
          const pct = Math.round((done / range) * 100);
          const dept = state.departments.find((d) => d.id === g.deptId);
          return (
            <div key={g.id} className="brut brut-hover p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500">{dept?.name}</div>
                  <div className="font-extrabold text-lg mt-0.5">{g.name}</div>
                </div>
                <StatusBadge status={g.status} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="border-2 border-slate-200 rounded p-2"><div className="text-slate-500">Baseline</div><div className="font-bold">{g.baseline}</div></div>
                <div className="border-2 border-slate-200 rounded p-2"><div className="text-slate-500">Current</div><div className="font-bold">{g.current}</div></div>
                <div className="border-2 border-slate-200 rounded p-2"><div className="text-slate-500">Target</div><div className="font-bold">{g.target}</div></div>
              </div>
              <div className="mt-3"><ProgressBar value={pct} color={g.status === "At Risk" ? "#F79009" : "#20C968"} /></div>
              <div className="mt-2 flex justify-between text-xs text-slate-600"><span>{pct}% complete</span><span>Due {g.end}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Products() {
  const state = useESGStore();
  return (
    <div className="space-y-4">
      <PageHeader title="Product ESG Profiles" description="Sustainability metrics per product SKU." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {state.products.map((p) => (
          <div key={p.id} className="brut brut-hover p-4">
            <div className="flex items-center justify-between"><div className="text-xs font-bold uppercase text-slate-500">{p.category}</div>
              <span className="brut-sm px-2 py-0.5 text-xs font-extrabold bg-[#20C968] text-white border-[#101828]">{p.overall}</span></div>
            <div className="mt-1 font-extrabold text-lg">{p.name}</div>
            <div className="text-xs text-slate-500">{p.sku}</div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between"><span>Carbon</span><b>{p.carbon} kg</b></div>
              <div className="flex justify-between"><span>Recycled</span><b>{p.recycled}%</b></div>
              <div className="flex justify-between"><span>Recyc. Score</span><b>{p.recycScore}</b></div>
              <div className="flex justify-between"><span>Packaging</span><b>{p.packaging}</b></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
