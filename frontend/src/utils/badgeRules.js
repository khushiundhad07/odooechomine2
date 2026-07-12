// Evaluate badges - returns array of newly unlocked badge IDs
export function evalBadges(state, empId) {
  const already = new Set(state.employeeBadges.filter((b) => b.empId === empId).map((b) => b.badgeId));
  const emp = state.employees.find((e) => e.id === empId);
  if (!emp) return [];

  const metrics = {
    "Total XP": emp.xp || 0,
    "Completed Challenges": state.challengeParticipations.filter((p) => p.empId === empId && p.status === "Approved").length,
    "Approved CSR Participations": state.participations.filter((p) => p.empId === empId && p.status === "Approved").length,
    "Policy Acknowledgements": state.acknowledgements.filter((a) => a.empId === empId && a.status === "Acknowledged").length,
    "Carbon Reduction": Math.round((emp.xp || 0) * 0.6), // demo proxy
  };

  const unlocked = [];
  state.badges.forEach((b) => {
    if (b.status !== "Active") return;
    if (already.has(b.id)) return;
    const v = metrics[b.metric] || 0;
    const op = b.operator;
    const target = b.value;
    const ok = op === ">=" ? v >= target : op === ">" ? v > target : op === "==" ? v === target : false;
    if (ok) unlocked.push(b.id);
  });
  return unlocked;
}
