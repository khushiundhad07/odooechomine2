import React, { useState } from "react";
import { toast } from "sonner";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useESGStore } from "../../store/useESGStore";
import { PageHeader, StatusBadge, ScoreCard } from "../../components/common/UI";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/dialog";
import { Switch } from "../../components/ui/switch";
import { computeOverall } from "../../utils/scoreCalculations";

export function Departments() {
  const state = useESGStore();
  const add = useESGStore((s) => s.addDepartment);
  const del = useESGStore((s) => s.deleteDepartment);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:"", code:"", head:"", employeeCount:0 });
  return (
    <div className="space-y-4">
      <PageHeader title="Departments" description="Manage organizational units." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="brut-btn bg-[#20C968] text-white"><Plus className="h-4 w-4"/> New Department</button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Department</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Name" className="brut-input col-span-2" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})}/>
              <input placeholder="Code" className="brut-input" value={form.code} onChange={(e) => setForm({...form,code:e.target.value})}/>
              <input placeholder="Head" className="brut-input" value={form.head} onChange={(e) => setForm({...form,head:e.target.value})}/>
              <input type="number" placeholder="Employees" className="brut-input" value={form.employeeCount} onChange={(e) => setForm({...form,employeeCount:parseInt(e.target.value)})}/>
            </div>
            <DialogFooter><button className="brut-btn bg-[#20C968] text-white" onClick={() => { if (!form.name) return toast.error("Name required"); add(form); toast.success("Added"); setOpen(false); }}>Save</button></DialogFooter>
          </DialogContent>
        </Dialog>
      }/>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Name","Code","Head","Employees","Status",""].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>
            {state.departments.map((d) => (
              <tr key={d.id} className="border-b border-slate-200">
                <td className="px-3 py-2 font-bold">{d.name}</td><td className="px-3 py-2">{d.code}</td>
                <td className="px-3 py-2">{d.head}</td><td className="px-3 py-2">{d.employeeCount}</td>
                <td className="px-3 py-2"><StatusBadge status={d.status}/></td>
                <td className="px-3 py-2"><button onClick={() => del(d.id)} className="text-red-600"><Trash2 className="h-4 w-4"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Categories() {
  const state = useESGStore();
  const add = useESGStore((s) => s.addCategory);
  const [name, setName] = useState("");
  const [type, setType] = useState("CSR Activity");
  return (
    <div className="space-y-4">
      <PageHeader title="Categories" description="Classify activities across modules."/>
      <div className="brut p-4 flex gap-2 flex-wrap">
        <input placeholder="Category name" className="brut-input flex-1 min-w-[200px]" value={name} onChange={(e) => setName(e.target.value)}/>
        <select className="brut-input" value={type} onChange={(e) => setType(e.target.value)}>{["CSR Activity","Challenge","ESG","Training","Product","Policy"].map(s=><option key={s}>{s}</option>)}</select>
        <button className="brut-btn bg-[#20C968] text-white" onClick={() => { if (!name) return toast.error("Name required"); add({ name, type }); toast.success("Added"); setName(""); }}>Add</button>
      </div>
      <div className="brut overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b-2 border-[#101828]"><tr className="text-left">{["Name","Type","Status"].map((h) => <th key={h} className="px-3 py-2 text-xs uppercase font-bold">{h}</th>)}</tr></thead>
          <tbody>{state.categories.map((c) => <tr key={c.id} className="border-b border-slate-200"><td className="px-3 py-2 font-bold">{c.name}</td><td className="px-3 py-2">{c.type}</td><td className="px-3 py-2"><StatusBadge status={c.status}/></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

export function ESGConfig() {
  const state = useESGStore();
  const upd = useESGStore((s) => s.updateESGConfiguration);
  const reset = useESGStore((s) => s.resetDemoData);
  const [c, setC] = useState(state.config);
  const totalW = c.envWeight + c.socWeight + c.govWeight;
  const scores = computeOverall({ ...state, config: c });

  const save = () => {
    if (totalW !== 100) return toast.error("Weights must sum to 100");
    upd(c); toast.success("Configuration updated");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="ESG Configuration" description="Global settings that drive ESG behavior." action={
        <div className="flex gap-2">
          <button data-testid="reset-demo" onClick={() => { reset(); toast.success("Demo data reset"); }} className="brut-btn bg-white"><RotateCcw className="h-4 w-4"/> Reset Demo</button>
          <button data-testid="config-save" onClick={save} className="brut-btn bg-[#20C968] text-white">Save</button>
        </div>
      }/>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label="Overall (preview)" score={scores.overall} color="#101828"/>
        <ScoreCard label="Environmental" score={scores.env} color="#20C968"/>
        <ScoreCard label="Social" score={scores.soc} color="#3F7DF4"/>
        <ScoreCard label="Governance" score={scores.gov} color="#8064F4"/>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-3">Score Weights (sum must = 100)</div>
          {[
            { key: "envWeight", label: "Environmental", color: "#20C968" },
            { key: "socWeight", label: "Social", color: "#3F7DF4" },
            { key: "govWeight", label: "Governance", color: "#8064F4" },
          ].map((w) => (
            <div key={w.key} className="mb-3">
              <div className="flex justify-between text-sm"><span className="font-bold">{w.label}</span><span>{c[w.key]}%</span></div>
              <input data-testid={`weight-${w.key}`} type="range" min="0" max="100" value={c[w.key]} onChange={(e) => setC({...c, [w.key]: parseInt(e.target.value)})} className="w-full" style={{ accentColor: w.color }}/>
            </div>
          ))}
          <div className={`text-sm font-bold ${totalW===100?"text-emerald-600":"text-red-600"}`}>Total: {totalW}%</div>
        </div>

        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-3">Toggles & Defaults</div>
          {[
            { key: "autoEmissionCalc", label: "Auto Emission Calculation" },
            { key: "csrEvidenceRequired", label: "CSR Evidence Required" },
            { key: "challengeEvidenceRequired", label: "Challenge Evidence Required" },
            { key: "badgeAutoAward", label: "Badge Auto-Award" },
          ].map((t) => (
            <div key={t.key} className="flex justify-between items-center py-1.5 border-b last:border-b-0 border-slate-100">
              <span className="text-sm">{t.label}</span>
              <Switch checked={c[t.key]} onCheckedChange={(v) => setC({...c, [t.key]: v})} data-testid={`toggle-${t.key}`}/>
            </div>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div><label className="text-xs font-bold">Policy XP</label><input type="number" className="brut-input w-full" value={c.policyXP} onChange={(e) => setC({...c, policyXP: parseInt(e.target.value)})}/></div>
            <div><label className="text-xs font-bold">Currency</label><input className="brut-input w-full" value={c.defaultCurrency} onChange={(e) => setC({...c, defaultCurrency: e.target.value})}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotifSettings() {
  const state = useESGStore();
  const upd = useESGStore((s) => s.updateESGConfiguration);
  const c = state.config;
  return (
    <div className="space-y-4">
      <PageHeader title="Notification Settings" description="Choose what and how you get notified."/>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-3">Channels</div>
          {[["inAppNotifications","In-App"],["emailNotifications","Email (simulated)"]].map(([k,l]) => (
            <div key={k} className="flex justify-between py-1.5 border-b last:border-b-0 border-slate-100"><span className="text-sm">{l}</span><Switch checked={c[k]} onCheckedChange={(v) => upd({[k]:v})}/></div>
          ))}
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-3">Notification Types</div>
          {[["notifyComplianceNew","New Compliance Issue"],["notifyComplianceOverdue","Overdue Compliance"],["notifyCSR","CSR Approval Decisions"],["notifyChallenge","Challenge Approvals"],["notifyPolicy","Policy Reminders"],["notifyBadge","Badge Unlocks"],["notifyReward","Reward Redemptions"],["notifyGoal","Goal Deadlines"]].map(([k,l]) => (
            <div key={k} className="flex justify-between py-1.5 border-b last:border-b-0 border-slate-100"><span className="text-sm">{l}</span><Switch checked={c[k]} onCheckedChange={(v) => upd({[k]:v})}/></div>
          ))}
        </div>
      </div>
      <div className="brut p-4 grid grid-cols-3 gap-3">
        <div><label className="text-xs font-bold">Policy reminder (days)</label><input type="number" className="brut-input w-full" value={c.reminderInterval} onChange={(e) => upd({reminderInterval: parseInt(e.target.value)})}/></div>
        <div><label className="text-xs font-bold">Overdue frequency (days)</label><input type="number" className="brut-input w-full" value={c.overdueFrequency} onChange={(e) => upd({overdueFrequency: parseInt(e.target.value)})}/></div>
        <div><label className="text-xs font-bold">Goal warning (days)</label><input type="number" className="brut-input w-full" value={c.goalWarningDays} onChange={(e) => upd({goalWarningDays: parseInt(e.target.value)})}/></div>
      </div>
    </div>
  );
}
