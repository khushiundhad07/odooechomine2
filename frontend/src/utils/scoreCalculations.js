// ESG score calculations - all normalized 0-100
export function computeEnvScore(state) {
  const totalEmissions = state.carbonTransactions.reduce((s, t) => s + (t.calculatedEmission || 0), 0);
  // baseline emissions target 80,000 kg CO2e - lower is better
  const carbonPerf = Math.max(0, Math.min(100, 100 - (totalEmissions / 800)));
  const goalsAvg =
    state.goals.length === 0
      ? 60
      : state.goals.reduce((s, g) => {
          const range = Math.abs(g.baseline - g.target) || 1;
          const done = Math.abs(g.baseline - g.current);
          return s + Math.max(0, Math.min(100, (done / range) * 100));
        }, 0) / state.goals.length;
  const prodAvg =
    state.products.length === 0
      ? 70
      : state.products.reduce((s, p) => s + (p.recycScore || 0), 0) / state.products.length;
  return Math.round(carbonPerf * 0.4 + goalsAvg * 0.4 + prodAvg * 0.2);
}

export function computeSocialScore(state) {
  const total = state.participations.length || 1;
  const approved = state.participations.filter((p) => p.status === "Approved").length;
  const csrRate = (approved / total) * 100;
  const engRate = Math.min(100, (approved / (state.employees.length || 1)) * 100 * 4);
  const divScore = state.diversity?.diversityScore || 70;
  const trainAvg =
    state.training.length === 0
      ? 70
      : state.training.reduce((s, t) => s + ((t.completed / (t.assigned || 1)) * 100), 0) / state.training.length;
  return Math.round(csrRate * 0.3 + engRate * 0.25 + divScore * 0.2 + trainAvg * 0.25);
}

export function computeGovScore(state) {
  const ackTotal = state.acknowledgements.length || 1;
  const acked = state.acknowledgements.filter((a) => a.status === "Acknowledged").length;
  const ackRate = (acked / ackTotal) * 100;
  const auditCompl =
    state.audits.length === 0
      ? 70
      : (state.audits.filter((a) => a.status === "Completed" || a.status === "Closed").length / state.audits.length) * 100;
  const issues = state.complianceIssues;
  const open = issues.filter((i) => i.status === "Open" || i.status === "In Progress").length;
  const overdue = issues.filter((i) => isOverdue(i)).length;
  const critical = issues.filter((i) => i.severity === "Critical" && (i.status === "Open" || i.status === "In Progress")).length;
  const issuePenalty = Math.min(60, open * 3 + overdue * 5 + critical * 8);
  const gov = ackRate * 0.4 + auditCompl * 0.3 + (100 - issuePenalty) * 0.3;
  return Math.round(Math.max(0, Math.min(100, gov)));
}

export function computeOverall(state) {
  const env = computeEnvScore(state);
  const soc = computeSocialScore(state);
  const gov = computeGovScore(state);
  const w = state.config;
  const total = w.envWeight + w.socWeight + w.govWeight || 100;
  const overall = (env * w.envWeight + soc * w.socWeight + gov * w.govWeight) / total;
  return { env, soc, gov, overall: Math.round(overall) };
}

export function isOverdue(i) {
  if (!i.due) return false;
  if (i.status !== "Open" && i.status !== "In Progress") return false;
  return new Date(i.due) < new Date();
}

// aggregations for charts
export function emissionsByMonth(state) {
  const map = {};
  state.carbonTransactions.forEach((t) => {
    const m = (t.date || "").slice(0, 7);
    if (!m) return;
    map[m] = (map[m] || 0) + (t.calculatedEmission || 0);
  });
  return Object.entries(map)
    .sort()
    .map(([month, value]) => ({ month, value: Math.round(value) }));
}

export function emissionsByDept(state) {
  const map = {};
  state.carbonTransactions.forEach((t) => {
    const d = state.departments.find((x) => x.id === t.deptId);
    if (!d) return;
    map[d.code] = (map[d.code] || 0) + (t.calculatedEmission || 0);
  });
  return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) }));
}

export function emissionsByScope(state) {
  const map = { "Scope 1": 0, "Scope 2": 0, "Scope 3": 0 };
  state.carbonTransactions.forEach((t) => {
    const ef = state.emissionFactors.find((f) => f.id === t.efId);
    if (!ef) return;
    map[ef.scope] += t.calculatedEmission || 0;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) }));
}

export function emissionsBySource(state) {
  const map = {};
  state.carbonTransactions.forEach((t) => {
    map[t.sourceModule] = (map[t.sourceModule] || 0) + (t.calculatedEmission || 0);
  });
  return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) }));
}

export function departmentScores(state) {
  return state.departments.map((d) => {
    const emissions = state.carbonTransactions.filter((t) => t.deptId === d.id).reduce((s, t) => s + t.calculatedEmission, 0);
    const csrCount = state.participations.filter((p) => {
      const emp = state.employees.find((e) => e.id === p.empId);
      return emp?.deptId === d.id && p.status === "Approved";
    }).length;
    const openIssues = state.complianceIssues.filter((i) => i.deptId === d.id && (i.status === "Open" || i.status === "In Progress")).length;
    const env = Math.max(0, Math.min(100, 100 - emissions / 400));
    const soc = Math.min(100, csrCount * 20 + 40);
    const gov = Math.max(0, 100 - openIssues * 10);
    const score = Math.round(env * 0.4 + soc * 0.3 + gov * 0.3);
    return { ...d, score, env: Math.round(env), soc: Math.round(soc), gov: Math.round(gov), emissions: Math.round(emissions) };
  });
}
