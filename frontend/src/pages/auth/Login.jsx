import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe2, Leaf, Users, Shield, Trophy } from "lucide-react";
import { toast } from "sonner";
import { useESGStore } from "../../store/useESGStore";

const DEMO = [
  { email: "admin@ecosphere.com", password: "admin123", label: "Administrator" },
  { email: "manager@ecosphere.com", password: "manager123", label: "Manager" },
  { email: "employee@ecosphere.com", password: "employee123", label: "Employee" },
];

export default function Login() {
  const nav = useNavigate();
  const login = useESGStore((s) => s.login);
  const [email, setEmail] = useState("admin@ecosphere.com");
  const [password, setPassword] = useState("admin123");
  const [remember, setRemember] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) { toast.success("Signed in"); nav("/dashboard"); }
    else toast.error("Invalid credentials");
  };

  const fillDemo = (d) => { setEmail(d.email); setPassword(d.password); };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FFF9ED] decor-grid">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden bg-[#101828] text-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#20C968] border-2 border-white grid place-items-center">
            <Globe2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold">EcoSphere</div>
            <div className="text-[11px] uppercase tracking-widest text-slate-300">ESG Platform</div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">Building Sustainable Organizations</div>
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">Measure. Improve.<br/>Prove your <span className="text-[#20C968]">ESG</span> impact.</h1>
          <p className="mt-4 text-slate-300 max-w-md">Track carbon, engage employees, ensure compliance and gamify sustainability — all in one enterprise platform.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            {[
              { c: "#20C968", i: Leaf, t: "Environmental", s: "Carbon & Goals" },
              { c: "#3F7DF4", i: Users, t: "Social", s: "CSR & Diversity" },
              { c: "#8064F4", i: Shield, t: "Governance", s: "Policies & Audits" },
              { c: "#FBBF35", i: Trophy, t: "Gamification", s: "Challenges & Rewards" },
            ].map((f) => (
              <div key={f.t} className="border border-white/20 rounded-2xl p-3 bg-white/10 backdrop-blur-sm">
                <div className="h-8 w-8 rounded-xl grid place-items-center border-2 border-white/40" style={{ background: f.c }}>
                  <f.i className="h-4 w-4 text-white" />
                </div>
                <div className="mt-2 font-bold text-sm">{f.t}</div>
                <div className="text-xs text-slate-300">{f.s}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-slate-400">© 2026 EcoSphere • Hackathon Prototype</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="brut w-full max-w-md p-6 sm:p-8" data-testid="login-form">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-xl bg-[#20C968] border-2 border-[#101828] grid place-items-center"><Globe2 className="h-5 w-5 text-white" /></div>
            <div className="font-extrabold">EcoSphere</div>
          </div>
          <h2 className="text-2xl font-extrabold">Welcome back</h2>
          <p className="text-sm text-slate-600 mb-6">Sign in to your EcoSphere workspace</p>

          <label className="text-xs font-bold uppercase tracking-widest">Email</label>
          <input data-testid="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="brut-input w-full mt-1 mb-4" />

          <label className="text-xs font-bold uppercase tracking-widest">Password</label>
          <input data-testid="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="brut-input w-full mt-1 mb-3" />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
          </label>

          <button data-testid="login-submit" type="submit" className="brut-btn w-full mt-5 bg-[#20C968] text-white">Sign In</button>

          <div className="mt-6 border-t-2 border-dashed border-slate-300 pt-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Demo accounts</div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO.map((d) => (
                <button type="button" key={d.email} onClick={() => fillDemo(d)} data-testid={`demo-${d.label.toLowerCase()}`} className="brut-sm p-2 text-left hover:-translate-y-0.5 transition">
                  <div className="text-[11px] font-bold">{d.label}</div>
                  <div className="text-[10px] text-slate-500 truncate">{d.email}</div>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
