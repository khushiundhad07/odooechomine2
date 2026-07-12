import React from "react";

const NAVY = "#101828";

function tintShadow(color, opacity = 0.18) {
  return `0 16px 34px ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`;
}

export function KPICard({ label, value, sub, color = NAVY, accent, testId }) {
  return (
    <div
      data-testid={testId}
      className="brut brut-hover eco-motif p-4 relative overflow-hidden"
      style={{ "--motif-color": color, boxShadow: `4px 4px 0 0 rgb(16 24 40 / 0.74), ${tintShadow(color, 0.13)}` }}
    >
      <div className="kpi-strip absolute top-0 left-4 right-8 rounded-b-full" style={{ background: color }} />
      <div className="absolute left-0 top-6 h-9 w-1.5 rounded-r-full" style={{ background: color }} />
      <div className="text-[11px] font-extrabold text-slate-500 mt-2">{label}</div>
      <div className="mt-1 text-3xl font-extrabold tracking-tight anim-count" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
    </div>
  );
}

function ESGGauge({ score, segments }) {
  const size = 148;
  const stroke = 12;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const gap = 8;
  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-my-1 rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EEF2F6" strokeWidth={stroke} />
        {segments.map((seg) => {
          const length = (seg.weight / 100) * circumference - gap;
          const dash = `${Math.max(0, length)} ${circumference}`;
          const circle = (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += (seg.weight / 100) * circumference;
          return circle;
        })}
      </svg>
      <div className="absolute top-[58px] left-1/2 -translate-x-1/2 text-center">
        <div className="text-4xl font-extrabold text-[#101828] anim-count">{score}</div>
        <div className="text-[10px] font-bold text-slate-500">ESG SCORE</div>
      </div>
      <div className="mt-1 grid w-full grid-cols-3 gap-1 text-[10px] font-bold text-slate-600">
        {segments.map((seg) => (
          <div key={seg.label} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-center">
            <span style={{ color: seg.color }}>{seg.short}</span> {seg.weight}%
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScoreCard({ label, score, color = NAVY, testId, segments }) {
  return (
    <div
      data-testid={testId}
      className="brut eco-motif p-4 overflow-hidden"
      style={{ "--motif-color": color, boxShadow: `5px 5px 0 0 rgb(16 24 40 / 0.8), ${tintShadow(color, 0.11)}` }}
    >
      <div className="kpi-strip mb-3 rounded-full" style={{ background: color }} />
      <div className="text-[11px] font-extrabold text-slate-500">{label}</div>
      {segments ? (
        <div className="relative mt-1">
          <ESGGauge score={score} segments={segments} />
        </div>
      ) : (
        <>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold anim-count" style={{ color }}>{score}</span>
            <span className="text-slate-500 font-semibold">/ 100</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ background: color, width: `${score}%` }} />
          </div>
        </>
      )}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-300",
    "On Track": "bg-emerald-50 text-emerald-700 border-emerald-300",
    Achieved: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Completed: "bg-blue-50 text-blue-700 border-blue-300",
    Published: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Ongoing: "bg-blue-50 text-blue-700 border-blue-300",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-300",
    Draft: "bg-slate-50 text-slate-700 border-slate-300",
    Joined: "bg-slate-50 text-slate-700 border-slate-300",
    Submitted: "bg-amber-50 text-amber-700 border-amber-300",
    Pending: "bg-amber-50 text-amber-700 border-amber-300",
    "Under Review": "bg-purple-50 text-purple-700 border-purple-300",
    "At Risk": "bg-orange-50 text-orange-700 border-orange-300",
    Planned: "bg-slate-50 text-slate-700 border-slate-300",
    Rejected: "bg-red-50 text-red-700 border-red-300",
    Open: "bg-red-50 text-red-700 border-red-300",
    Resolved: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Closed: "bg-slate-50 text-slate-700 border-slate-300",
    Cancelled: "bg-slate-50 text-slate-700 border-slate-300",
    Acknowledged: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Inactive: "bg-slate-50 text-slate-700 border-slate-300",
    Archived: "bg-slate-50 text-slate-700 border-slate-300",
    "Out of Stock": "bg-red-50 text-red-700 border-red-300",
    Posted: "bg-emerald-50 text-emerald-700 border-emerald-300",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${map[status] || "bg-slate-50 text-slate-700 border-slate-300"}`}>{status}</span>;
}

export function SeverityBadge({ severity }) {
  const map = {
    Low: "bg-emerald-100 text-emerald-800 border-emerald-400",
    Medium: "bg-amber-100 text-amber-800 border-amber-400",
    High: "bg-orange-100 text-orange-800 border-orange-400",
    Critical: "bg-red-100 text-red-800 border-red-500",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border-2 text-[11px] font-extrabold ${map[severity] || ""}`}>{severity}</span>;
}

export function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]" data-testid="section-title">{title}</h2>
        {description && <p className="text-sm text-slate-600 mt-1 max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="brut eco-motif p-10 text-center">
      {Icon && <Icon className="h-10 w-10 mx-auto text-slate-400" />}
      <div className="text-lg font-bold mt-3">{title}</div>
      {message && <div className="text-sm text-slate-600 mt-1">{message}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ProgressBar({ value, color = "#20C968" }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  );
}
