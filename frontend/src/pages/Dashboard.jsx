import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Users, Shield, Trophy, Globe2, AlertTriangle, Award, Plus, ArrowRight, TrendingDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useESGStore } from "../store/useESGStore";
import { KPICard, ScoreCard, PageHeader, StatusBadge, SeverityBadge } from "../components/common/UI";
import { computeOverall, emissionsByMonth, emissionsByScope, emissionsBySource, departmentScores, isOverdue } from "../utils/scoreCalculations";
import { formatDistanceToNow } from "date-fns";

const COLORS = ["#20C968", "#3F7DF4", "#8064F4", "#FBBF35", "#14B8C8", "#EC4899", "#F79009", "#F04438"];
const tooltipStyle = { border: "1px solid #D0D5DD", borderRadius: 12, boxShadow: "0 12px 30px rgba(16,24,40,0.10)" };

export default function Dashboard() {
  const state = useESGStore();
  const nav = useNavigate();
  const { env, soc, gov, overall } = computeOverall(state);
  const totalEmissions = state.carbonTransactions.reduce((s, t) => s + t.calculatedEmission, 0);
  const carbonAvoided = Math.round(state.employees.reduce((s, e) => s + (e.xp || 0), 0) * 0.6);
  const csrTotal = state.participations.length || 1;
  const csrApproved = state.participations.filter((p) => p.status === "Approved").length;
  const openIssues = state.complianceIssues.filter((i) => i.status === "Open" || i.status === "In Progress").length;
  const overdueIssues = state.complianceIssues.filter(isOverdue).length;
  const activeChallenges = state.challenges.filter((c) => c.status === "Active").length;
  const rewardsRedeemed = state.redemptions.length;
  const engagement = Math.min(100, Math.round((state.employees.filter((e) => (e.xp || 0) > 0).length / state.employees.length) * 100));

  const trend = emissionsByMonth(state);
  const scopes = emissionsByScope(state);
  const sources = emissionsBySource(state);
  const depts = departmentScores(state).sort((a, b) => b.score - a.score);
  const leaderboard = [...state.employees].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 5);
  const overdueList = state.complianceIssues.filter(isOverdue).slice(0, 4);
  const pendingCSR = state.participations.filter((p) => p.status === "Submitted").slice(0, 4);
  const pendingChallenges = state.challengeParticipations.filter((p) => p.status === "Submitted").slice(0, 4);
  const badgesRecent = [...state.employeeBadges].sort((a, b) => b.unlockedAt.localeCompare(a.unlockedAt)).slice(0, 4);
  const goalsNear = state.goals.filter((g) => g.status === "At Risk" || g.status === "On Track").slice(0, 4);
  const activity = state.notifications.slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive ESG Overview"
        description="Real-time performance across Environmental, Social and Governance."
        action={
          <div className="flex flex-wrap gap-2">
            <button data-testid="qa-carbon" onClick={() => nav("/environmental/transactions")} className="brut-btn bg-[#20C968] text-white"><Plus className="h-4 w-4" /> Log Carbon</button>
            <button data-testid="qa-csr" onClick={() => nav("/social/csr-activities")} className="brut-btn bg-[#3F7DF4] text-white"><Plus className="h-4 w-4" /> CSR Activity</button>
            <button data-testid="qa-challenge" onClick={() => nav("/gamification/challenges")} className="brut-btn bg-[#FBBF35]"><Plus className="h-4 w-4" /> Challenge</button>
            <button data-testid="qa-issue" onClick={() => nav("/governance/compliance")} className="brut-btn bg-[#F04438] text-white"><AlertTriangle className="h-4 w-4" /> Raise Issue</button>
          </div>
        }
      />

      {/* Score row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard label="Overall ESG" score={overall} color="#101828" testId="score-overall" segments={[
          { label: "Environmental", short: "E", color: "#20C968", weight: state.config.envWeight },
          { label: "Social", short: "S", color: "#3F7DF4", weight: state.config.socWeight },
          { label: "Governance", short: "G", color: "#8064F4", weight: state.config.govWeight },
        ]} />
        <ScoreCard label="Environmental" score={env} color="#20C968" testId="score-env" />
        <ScoreCard label="Social" score={soc} color="#3F7DF4" testId="score-soc" />
        <ScoreCard label="Governance" score={gov} color="#8064F4" testId="score-gov" />
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <KPICard label="Total CO₂ Emissions" value={`${(totalEmissions / 1000).toFixed(1)} t`} sub="kg CO₂e cumulative" color="#20C968" testId="kpi-emissions" />
        <KPICard label="Carbon Avoided" value={`${carbonAvoided} kg`} sub="from actions & challenges" color="#14B8C8" />
        <KPICard label="CSR Participation" value={`${Math.round((csrApproved / csrTotal) * 100)}%`} sub={`${csrApproved} approved`} color="#3F7DF4" />
        <KPICard label="Employee Engagement" value={`${engagement}%`} sub="active in gamification" color="#EC4899" />
        <KPICard label="Open Issues" value={openIssues} sub="Compliance" color="#F79009" />
        <KPICard label="Overdue Issues" value={overdueIssues} sub="Requires action" color="#F04438" testId="kpi-overdue" />
        <KPICard label="Active Challenges" value={activeChallenges} sub="Running now" color="#FBBF35" />
        <KPICard label="Rewards Redeemed" value={rewardsRedeemed} sub="This year" color="#8064F4" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="brut eco-motif p-4 lg:col-span-2" style={{ "--motif-color": "#20C968" }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Emissions Trend</div>
              <div className="text-lg font-extrabold">Monthly CO₂e (kg)</div>
            </div>
            <TrendingDown className="h-5 w-5 text-[#20C968]" />
          </div>
          <ResponsiveContainer width="100%" height={240} className="anim-chart">
            <LineChart data={trend}>
              <CartesianGrid stroke="#e9eef5" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" stroke="#667085" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#667085" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="value" stroke="#20C968" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="brut eco-motif p-4" style={{ "--motif-color": "#8064F4" }}>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Department ESG Ranking</div>
          <div className="text-lg font-extrabold mb-2">Top departments</div>
          <ResponsiveContainer width="100%" height={240} className="anim-chart">
            <BarChart data={depts.slice(0, 8)}>
              <CartesianGrid stroke="#e9eef5" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="code" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {depts.slice(0, 8).map((d, i) => <Cell key={d.id} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="brut eco-motif p-4" style={{ "--motif-color": "#20C968" }}>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Emissions by Scope</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={scopes} dataKey="value" nameKey="name" outerRadius={80} label>
                {scopes.map((s, i) => <Cell key={s.name} fill={COLORS[i]} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="brut eco-motif p-4" style={{ "--motif-color": "#14B8C8" }}>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Emissions by Source</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sources} layout="vertical">
              <XAxis type="number" fontSize={11} />
              <YAxis type="category" dataKey="name" width={90} fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="#8064F4" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="brut eco-motif p-4" style={{ "--motif-color": "#FBBF35" }}>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Employee Leaderboard</div>
          <div className="mt-3 space-y-2">
            {leaderboard.map((e, i) => (
              <div key={e.id} className="flex items-center gap-3 p-2 border-2 border-slate-200 rounded">
                <div className={`h-7 w-7 rounded-lg grid place-items-center font-extrabold border-2 border-[#101828] ${i === 0 ? 'bg-[#FBBF35]' : i === 1 ? 'bg-slate-200' : i === 2 ? 'bg-orange-300' : 'bg-white'}`}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{e.name}</div>
                  <div className="text-xs text-slate-500">{state.departments.find((d) => d.id === e.deptId)?.name}</div>
                </div>
                <div className="text-sm font-bold text-[#20C968]">{e.xp} XP</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts / activity */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-2">Overdue Compliance</div>
          {overdueList.length === 0 && <div className="text-xs text-slate-500">None 🎉</div>}
          {overdueList.map((i) => (
            <div key={i.id} className="p-2 border-2 border-red-300 rounded mb-2 bg-red-50">
              <div className="flex justify-between items-start"><div className="text-xs font-bold">{i.ref}</div><SeverityBadge severity={i.severity} /></div>
              <div className="text-xs mt-1 text-slate-700 line-clamp-2">{i.description}</div>
            </div>
          ))}
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-2">Pending CSR Approvals</div>
          {pendingCSR.length === 0 && <div className="text-xs text-slate-500">All caught up</div>}
          {pendingCSR.map((p) => {
            const emp = state.employees.find((e) => e.id === p.empId);
            const act = state.csrActivities.find((a) => a.id === p.activityId);
            return <div key={p.id} className="p-2 border-2 border-slate-200 rounded mb-2"><div className="text-xs font-bold">{emp?.name}</div><div className="text-xs text-slate-600 truncate">{act?.title}</div></div>;
          })}
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-2">Goals Nearing Deadline</div>
          {goalsNear.map((g) => (
            <div key={g.id} className="p-2 border-2 border-slate-200 rounded mb-2">
              <div className="flex justify-between"><div className="text-xs font-bold truncate">{g.name}</div><StatusBadge status={g.status} /></div>
              <div className="text-[11px] text-slate-500 mt-1">Due {g.end}</div>
            </div>
          ))}
        </div>
        <div className="brut p-4">
          <div className="text-xs uppercase font-bold text-slate-500 mb-2">Recent Badges</div>
          {badgesRecent.map((b, i) => {
            const badge = state.badges.find((x) => x.id === b.badgeId);
            const emp = state.employees.find((e) => e.id === b.empId);
            return (
              <div key={i} className="p-2 border-2 border-[#FBBF35] rounded-xl mb-2 bg-amber-50 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#FBBF35]" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{badge?.name}</div>
                  <div className="text-[11px] text-slate-600 truncate">{emp?.name} · {b.unlockedAt}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="brut p-4">
        <div className="text-xs uppercase font-bold text-slate-500 mb-3">Recent ESG Activity</div>
        <div className="space-y-2">
          {activity.map((n) => (
            <div key={n.id} className="flex items-center justify-between p-2 border-b last:border-b-0 border-slate-100">
              <div className="min-w-0">
                <div className="text-sm font-semibold">{n.title}</div>
                <div className="text-xs text-slate-600">{n.message}</div>
              </div>
              <div className="text-xs text-slate-500 whitespace-nowrap">{formatDistanceToNow(new Date(n.ts), { addSuffix: true })}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
