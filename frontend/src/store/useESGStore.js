import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as M from "../data/mockData";
import { evalBadges } from "../utils/badgeRules";

const seed = () => ({
  currentUser: null,
  role: "ESG Administrator",
  departments: M.DEPARTMENTS,
  employees: M.EMPLOYEES,
  emissionFactors: M.EMISSION_FACTORS,
  carbonTransactions: M.CARBON_TRANSACTIONS,
  goals: M.ENV_GOALS,
  products: M.PRODUCTS,
  csrActivities: M.CSR_ACTIVITIES,
  participations: M.PARTICIPATIONS,
  diversity: M.DIVERSITY,
  training: M.TRAINING,
  policies: M.POLICIES,
  acknowledgements: M.ACKNOWLEDGEMENTS,
  audits: M.AUDITS,
  complianceIssues: M.COMPLIANCE_ISSUES,
  challenges: M.CHALLENGES,
  challengeParticipations: M.CHALLENGE_PARTICIPATIONS,
  badges: M.BADGES,
  employeeBadges: M.EMPLOYEE_BADGES,
  rewards: M.REWARDS,
  redemptions: M.REDEMPTIONS,
  notifications: M.NOTIFICATIONS,
  categories: M.CATEGORIES,
  config: M.DEFAULT_CONFIG,
});

const uid = (p) => `${p}${Date.now()}${Math.floor(Math.random() * 1000)}`;
const nowIso = () => new Date().toISOString();

export const useESGStore = create(
  persist(
    (set, get) => ({
      ...seed(),

      // AUTH ---
      login: (email, password) => {
        const map = {
          "admin@ecosphere.com": { role: "ESG Administrator", empId: "e2" },
          "manager@ecosphere.com": { role: "ESG Manager", empId: "e17" },
          "employee@ecosphere.com": { role: "Employee", empId: "e1" },
        };
        const m = map[email?.toLowerCase()];
        if (!m || !password) return false;
        const emp = get().employees.find((e) => e.id === m.empId);
        set({ currentUser: { email, ...m, name: emp?.name || email, empId: m.empId }, role: m.role });
        return true;
      },
      logout: () => set({ currentUser: null }),
      switchRole: (role) => set({ role }),

      // ENV ---
      addEmissionFactor: (ef) =>
        set((s) => ({ emissionFactors: [{ id: uid("ef"), ...ef }, ...s.emissionFactors] })),
      updateEmissionFactor: (id, patch) =>
        set((s) => ({ emissionFactors: s.emissionFactors.map((e) => (e.id === id ? { ...e, ...patch } : e)) })),
      deleteEmissionFactor: (id) =>
        set((s) => ({ emissionFactors: s.emissionFactors.filter((e) => e.id !== id) })),

      addCarbonTransaction: (data) => {
        const s = get();
        const ef = s.emissionFactors.find((f) => f.id === data.efId);
        const emission = Number(data.quantity) * (ef?.value || 0);
        const ref = `CT-${String(s.carbonTransactions.length + 1).padStart(4, "0")}`;
        const t = { id: uid("ct"), ref, calculatedEmission: emission, status: "Posted", calcType: "Auto", ...data };
        set({ carbonTransactions: [t, ...s.carbonTransactions] });
        get().addNotification({ type: "Carbon", title: "Carbon Transaction Generated", message: `${ref} logged (${emission.toFixed(1)} kg CO2e)`, module: "environmental", link: "/environmental/transactions" });
        return t;
      },
      updateGoal: (id, patch) => set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)) })),
      addGoal: (g) => set((s) => ({ goals: [{ id: uid("g"), status: "Active", ...g }, ...s.goals] })),

      addProduct: (p) => set((s) => ({ products: [{ id: uid("p"), ...p }, ...s.products] })),

      // SOCIAL ---
      addCSRActivity: (a) =>
        set((s) => ({ csrActivities: [{ id: uid("a"), currentParticipants: 0, status: "Published", ...a }, ...s.csrActivities] })),
      joinCSRActivity: (activityId, empId) => {
        const s = get();
        const already = s.participations.find((p) => p.activityId === activityId && p.empId === empId);
        if (already) return;
        set((st) => ({
          participations: [
            { id: uid("pr"), empId, activityId, proof: "", status: "Draft", comment: "", points: 0, submitted: null, approvedBy: null, approvedOn: null },
            ...st.participations,
          ],
          csrActivities: st.csrActivities.map((a) => (a.id === activityId ? { ...a, currentParticipants: (a.currentParticipants || 0) + 1 } : a)),
        }));
      },
      submitCSRParticipation: (id, proof) =>
        set((s) => ({
          participations: s.participations.map((p) =>
            p.id === id ? { ...p, proof, status: "Submitted", submitted: nowIso().slice(0, 10) } : p
          ),
        })),
      approveCSRParticipation: (id) => {
        const s = get();
        const p = s.participations.find((x) => x.id === id);
        if (!p) return;
        const act = s.csrActivities.find((a) => a.id === p.activityId);
        if (s.config.csrEvidenceRequired && act?.evidenceRequired && !p.proof) {
          get().addNotification({ type: "CSR", title: "Approval Blocked", message: "Evidence required before approval", module: "social", link: "/social/participation" });
          return false;
        }
        const points = act?.points || 0;
        set((st) => ({
          participations: st.participations.map((x) => (x.id === id ? { ...x, status: "Approved", points, approvedOn: nowIso().slice(0, 10), approvedBy: st.currentUser?.empId || "e17" } : x)),
          employees: st.employees.map((e) => (e.id === p.empId ? { ...e, points: (e.points || 0) + points, xp: (e.xp || 0) + points } : e)),
        }));
        get().addNotification({ type: "CSR", title: "CSR Approved", message: `Participation approved (+${points} pts)`, module: "social", link: "/social/participation" });
        get().evaluateBadges(p.empId);
        return true;
      },
      rejectCSRParticipation: (id, comment) =>
        set((s) => ({
          participations: s.participations.map((p) => (p.id === id ? { ...p, status: "Rejected", comment } : p)),
        })),

      // GOVERNANCE ---
      acknowledgePolicy: (policyId, empId) =>
        set((s) => ({
          acknowledgements: s.acknowledgements.map((a) =>
            a.policyId === policyId && a.empId === empId
              ? { ...a, status: "Acknowledged", date: nowIso().slice(0, 10) }
              : a
          ),
        })),
      addAudit: (a) => set((s) => ({ audits: [{ id: uid("au"), ref: `AUD-${new Date().getFullYear()}-${String(s.audits.length + 1).padStart(3, "0")}`, findings: 0, status: "Planned", ...a }, ...s.audits] })),
      addComplianceIssue: (i) => {
        const ref = `CI-${String(get().complianceIssues.length + 1).padStart(3, "0")}`;
        const issue = { id: uid("ci"), ref, status: "Open", corrective: "", resolution: "", resolved: null, ...i };
        set((s) => ({ complianceIssues: [issue, ...s.complianceIssues] }));
        get().addNotification({ type: "Compliance", title: "New Compliance Issue", message: `${ref} raised (${i.severity})`, module: "governance", link: "/governance/compliance" });
        return issue;
      },
      updateComplianceIssue: (id, patch) =>
        set((s) => ({
          complianceIssues: s.complianceIssues.map((i) => (i.id === id ? { ...i, ...patch, ...(patch.status === "Resolved" ? { resolved: nowIso().slice(0, 10) } : {}) } : i)),
        })),

      // GAMIFICATION ---
      addChallenge: (c) => set((s) => ({ challenges: [{ id: uid("ch"), status: "Draft", ...c }, ...s.challenges] })),
      joinChallenge: (challengeId, empId) => {
        const s = get();
        if (s.challengeParticipations.some((p) => p.challengeId === challengeId && p.empId === empId)) return;
        set((st) => ({
          challengeParticipations: [
            { id: uid("cp"), challengeId, empId, progress: 0, proof: "", status: "Joined", xp: 0, submitted: null, approvedBy: null },
            ...st.challengeParticipations,
          ],
        }));
      },
      updateChallengeProgress: (id, progress) =>
        set((s) => ({
          challengeParticipations: s.challengeParticipations.map((p) => (p.id === id ? { ...p, progress, status: progress > 0 ? "In Progress" : p.status } : p)),
        })),
      submitChallenge: (id, proof) =>
        set((s) => ({
          challengeParticipations: s.challengeParticipations.map((p) =>
            p.id === id ? { ...p, proof, status: "Submitted", submitted: nowIso().slice(0, 10) } : p
          ),
        })),
      approveChallenge: (id) => {
        const s = get();
        const p = s.challengeParticipations.find((x) => x.id === id);
        if (!p) return;
        const ch = s.challenges.find((c) => c.id === p.challengeId);
        if (s.config.challengeEvidenceRequired && ch?.evidenceRequired && !p.proof) return false;
        const xp = ch?.xp || 0;
        set((st) => ({
          challengeParticipations: st.challengeParticipations.map((x) => (x.id === id ? { ...x, status: "Approved", xp, approvedBy: st.currentUser?.empId || "e2" } : x)),
          employees: st.employees.map((e) => (e.id === p.empId ? { ...e, points: (e.points || 0) + xp, xp: (e.xp || 0) + xp } : e)),
        }));
        get().addNotification({ type: "Challenge", title: "Challenge Approved", message: `${ch?.title} approved (+${xp} XP)`, module: "gamification", link: "/gamification/participation" });
        get().evaluateBadges(p.empId);
        return true;
      },
      rejectChallenge: (id) =>
        set((s) => ({
          challengeParticipations: s.challengeParticipations.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)),
        })),

      evaluateBadges: (empId) => {
        if (!get().config.badgeAutoAward) return;
        const newly = evalBadges(get(), empId);
        if (newly.length === 0) return;
        set((s) => ({
          employeeBadges: [
            ...s.employeeBadges,
            ...newly.map((bid) => ({ empId, badgeId: bid, unlockedAt: nowIso().slice(0, 10) })),
          ],
        }));
        newly.forEach((bid) => {
          const b = get().badges.find((x) => x.id === bid);
          get().addNotification({ type: "Badge", title: "Badge Unlocked", message: `${b?.name} unlocked!`, module: "gamification", link: "/gamification/badges" });
        });
      },

      redeemReward: (rewardId, empId) => {
        const s = get();
        const r = s.rewards.find((x) => x.id === rewardId);
        const e = s.employees.find((x) => x.id === empId);
        if (!r || !e) return { ok: false, error: "Not found" };
        if (r.status !== "Active") return { ok: false, error: "Reward inactive" };
        if (r.stock <= 0) return { ok: false, error: "Out of stock" };
        if ((e.points || 0) < r.points) return { ok: false, error: "Not enough points" };
        set((st) => ({
          rewards: st.rewards.map((x) => (x.id === rewardId ? { ...x, stock: x.stock - 1, status: x.stock - 1 <= 0 ? "Out of Stock" : x.status } : x)),
          employees: st.employees.map((x) => (x.id === empId ? { ...x, points: x.points - r.points } : x)),
          redemptions: [{ id: uid("rd"), empId, rewardId, date: nowIso().slice(0, 10), points: r.points }, ...st.redemptions],
        }));
        get().addNotification({ type: "Reward", title: "Reward Redeemed", message: `${r.name} redeemed for ${r.points} pts`, module: "gamification", link: "/gamification/redemptions" });
        return { ok: true };
      },

      // NOTIFICATIONS ---
      addNotification: (n) =>
        set((s) => ({
          notifications: [
            { id: uid("n"), ts: nowIso(), read: false, ...n },
            ...s.notifications,
          ].slice(0, 100),
        })),
      markNotificationRead: (id) =>
        set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
      markAllNotificationsRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      deleteNotification: (id) =>
        set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),

      // SETTINGS ---
      addDepartment: (d) => set((s) => ({ departments: [{ id: uid("d"), status: "Active", employeeCount: 0, ...d }, ...s.departments] })),
      updateDepartment: (id, patch) => set((s) => ({ departments: s.departments.map((d) => (d.id === id ? { ...d, ...patch } : d)) })),
      deleteDepartment: (id) => set((s) => ({ departments: s.departments.filter((d) => d.id !== id) })),
      addCategory: (c) => set((s) => ({ categories: [{ id: uid("cat"), status: "Active", ...c }, ...s.categories] })),
      updateESGConfiguration: (patch) => set((s) => ({ config: { ...s.config, ...patch } })),

      resetDemoData: () => set({ ...seed() }),
    }),
    {
      name: "ecosphere-store",
      version: 1,
    }
  )
);
