# EcoSphere – ESG Management Platform (PRD)

## Problem Statement
Hackathon prototype for a full ESG management SaaS: measure emissions, drive CSR participation, ensure governance compliance, gamify sustainability, and export executive reports. Frontend-only React app with Zustand + localStorage — no backend.

## Architecture
- React 19 + CRA + Craco (existing template, no Vite conversion)
- Zustand + `persist` middleware (localStorage) for all shared state
- react-router-dom v7 nested routing under a single AppShell
- shadcn/ui (Dialog, Sheet, DropdownMenu, Switch) + custom Neo-Brutalist utility classes in `index.css`
- Recharts for all charts, lucide-react for icons
- jsPDF + jspdf-autotable + xlsx + native Blob for real PDF/Excel/CSV exports
- Manrope + JetBrains Mono via Google Fonts

## Modules Implemented (2026-02)
- **Auth**: login page with 3 demo accounts, role switcher (6 roles), logout, protected routes
- **Dashboard**: 4 ESG score cards, 8 KPI cards, 6 charts (trend/dept/scope/source/leaderboard), overdue/CSR/goal/badge alert lists, 4 quick actions
- **Environmental**: Overview, Carbon Transactions (add w/ auto emission calc), Emission Factors (CRUD), Goals (progress cards), Product ESG Profiles
- **Social**: Overview, CSR Activities (create+join), Employee Participation (approve/reject with evidence rule), Diversity Metrics (3 pie charts), Training Completion
- **Governance**: Overview, Policies (ack progress per policy), Acknowledgements (mark ack), Audits (create), Compliance Issues (table+kanban, severity, overdue detection, raise/update)
- **Gamification**: Overview, Challenges (create+join+status tabs), Participation (progress+submit+approve), Badges (locked/unlocked view), Rewards marketplace (redeem with validation), Redemptions history, Leaderboard (podium + full list)
- **Reports**: Environmental / Social / Governance / ESG Summary / Custom Builder — all with PDF/Excel/CSV export
- **Settings**: Departments CRUD, Categories, ESG Configuration (weights + toggles + live preview + reset demo data), Notification Settings
- **Notifications**: Header drawer + full page with mark-read, delete, filter
- **Profile**: user summary + badges

## Shared State Actions (all present in store)
login, logout, switchRole, addEmissionFactor/updateEmissionFactor/deleteEmissionFactor, addCarbonTransaction (auto-computes emission, adds notification), addGoal/updateGoal, addProduct, addCSRActivity, joinCSRActivity, submitCSRParticipation, approveCSRParticipation (evidence rule, awards points+XP, evaluates badges, adds notification), rejectCSRParticipation, acknowledgePolicy, addAudit, addComplianceIssue (auto-notifies), updateComplianceIssue (overdue detection via scoreCalculations.isOverdue), addChallenge, joinChallenge, updateChallengeProgress, submitChallenge, approveChallenge (awards XP+badges), rejectChallenge, evaluateBadges, redeemReward (points+stock validation), addNotification/markNotificationRead/markAllNotificationsRead/deleteNotification, addDepartment/updateDepartment/deleteDepartment, addCategory, updateESGConfiguration, resetDemoData.

## Score Calculations
- Env = carbonPerf*0.4 + goalsAvg*0.4 + productAvg*0.2
- Soc = csrRate*0.3 + engagement*0.25 + diversity*0.2 + training*0.25
- Gov = ackRate*0.4 + auditCompletion*0.3 + (100 - issuePenalty)*0.3
- Overall = Env*envW + Soc*socW + Gov*govW, weights configurable in Settings/ESG (must sum to 100)
- Live-preview on the config page as weights change

## Mock Data
8 departments, 20 employees, 10 emission factors, 20 carbon transactions, 6 goals, 8 products, 6 CSR activities, 12 CSR participations, 8 training records, 6 policies, 120 acknowledgements, 5 audits, 10 compliance issues (incl. overdue+critical), 8 challenges, 14 challenge participations, 6 badges, 6 employee badges, 6 rewards (1 out of stock), 6 redemptions, 20 notifications, 8 categories.

## Known Limitations
- No backend: everything lives in localStorage. Refresh persists state; Reset Demo Data restores mock defaults.
- Exports contain only the filtered mock/current-state rows.
- Email notifications are simulated (toggle only, no actual send).

## Next / Backlog
- P1: Per-role UI gating (currently role switch only labels; can hide/show actions)
- P1: Add Challenge/CSR file-upload evidence UI (currently uses filename placeholder)
- P2: Global search results panel (input present, results deferred)
- P2: More detailed drill-down drawers per KPI
- P2: Backend integration plan (FastAPI + MongoDB) - store shape is 1:1 mappable
