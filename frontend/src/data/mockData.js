// EcoSphere mock data - realistic, referentially valid
export const DEPARTMENTS = [
  { id: "d1", name: "Manufacturing", code: "MFG", head: "S. Rao", parent: null, employeeCount: 134, status: "Active" },
  { id: "d2", name: "Human Resources", code: "HR", head: "A. Mehta", parent: null, employeeCount: 24, status: "Active" },
  { id: "d3", name: "Information Technology", code: "IT", head: "P. Nair", parent: null, employeeCount: 58, status: "Active" },
  { id: "d4", name: "Finance", code: "FIN", head: "R. Iyer", parent: null, employeeCount: 32, status: "Active" },
  { id: "d5", name: "Procurement", code: "PRC", head: "M. Verma", parent: null, employeeCount: 18, status: "Active" },
  { id: "d6", name: "Sales & Marketing", code: "SLM", head: "K. Shah", parent: null, employeeCount: 41, status: "Active" },
  { id: "d7", name: "R&D", code: "RND", head: "D. Kumar", parent: null, employeeCount: 27, status: "Active" },
  { id: "d8", name: "Administration", code: "ADM", head: "L. Fernandes", parent: null, employeeCount: 15, status: "Active" },
];

export const EMPLOYEES = [
  { id: "e1", name: "Aditi Rao", email: "aditi@ecosphere.com", deptId: "d1", role: "Employee", points: 320, xp: 820, avatar: "AR" },
  { id: "e2", name: "Karan Shah", email: "karan@ecosphere.com", deptId: "d6", role: "Manager", points: 180, xp: 450, avatar: "KS" },
  { id: "e3", name: "Priya Nair", email: "priya@ecosphere.com", deptId: "d3", role: "Employee", points: 640, xp: 1220, avatar: "PN" },
  { id: "e4", name: "Rahul Iyer", email: "rahul@ecosphere.com", deptId: "d4", role: "Department Head", points: 210, xp: 540, avatar: "RI" },
  { id: "e5", name: "Sneha Nair", email: "sneha@ecosphere.com", deptId: "d1", role: "Employee", points: 90, xp: 250, avatar: "SN" },
  { id: "e6", name: "Dev Kumar", email: "dev@ecosphere.com", deptId: "d7", role: "Employee", points: 470, xp: 950, avatar: "DK" },
  { id: "e7", name: "Meera Verma", email: "meera@ecosphere.com", deptId: "d5", role: "Employee", points: 150, xp: 320, avatar: "MV" },
  { id: "e8", name: "Arjun Patel", email: "arjun@ecosphere.com", deptId: "d3", role: "Employee", points: 380, xp: 780, avatar: "AP" },
  { id: "e9", name: "Riya Kapoor", email: "riya@ecosphere.com", deptId: "d2", role: "Employee", points: 210, xp: 590, avatar: "RK" },
  { id: "e10", name: "Sameer Joshi", email: "sameer@ecosphere.com", deptId: "d1", role: "Employee", points: 130, xp: 290, avatar: "SJ" },
  { id: "e11", name: "Nisha Rao", email: "nisha@ecosphere.com", deptId: "d6", role: "Employee", points: 60, xp: 180, avatar: "NR" },
  { id: "e12", name: "Vikram Singh", email: "vikram@ecosphere.com", deptId: "d1", role: "Auditor", points: 220, xp: 610, avatar: "VS" },
  { id: "e13", name: "Ananya Das", email: "ananya@ecosphere.com", deptId: "d7", role: "Employee", points: 300, xp: 640, avatar: "AD" },
  { id: "e14", name: "Rohan Gupta", email: "rohan@ecosphere.com", deptId: "d3", role: "Employee", points: 175, xp: 410, avatar: "RG" },
  { id: "e15", name: "Isha Malhotra", email: "isha@ecosphere.com", deptId: "d8", role: "Executive", points: 90, xp: 200, avatar: "IM" },
  { id: "e16", name: "Kabir Sen", email: "kabir@ecosphere.com", deptId: "d4", role: "Employee", points: 140, xp: 360, avatar: "KX" },
  { id: "e17", name: "Tara Bose", email: "tara@ecosphere.com", deptId: "d2", role: "Manager", points: 260, xp: 700, avatar: "TB" },
  { id: "e18", name: "Yash Bhatt", email: "yash@ecosphere.com", deptId: "d5", role: "Employee", points: 40, xp: 110, avatar: "YB" },
  { id: "e19", name: "Zoya Khan", email: "zoya@ecosphere.com", deptId: "d6", role: "Employee", points: 195, xp: 480, avatar: "ZK" },
  { id: "e20", name: "Neel Mehta", email: "neel@ecosphere.com", deptId: "d7", role: "Employee", points: 355, xp: 820, avatar: "NM" },
];

export const EMISSION_FACTORS = [
  { id: "ef1", name: "Grid Electricity", activity: "Electricity", scope: "Scope 2", unit: "kWh", value: 0.82, source: "IEA 2024", region: "IN", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef2", name: "Diesel", activity: "Fuel", scope: "Scope 1", unit: "litre", value: 2.68, source: "DEFRA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef3", name: "Petrol", activity: "Fuel", scope: "Scope 1", unit: "litre", value: 2.31, source: "DEFRA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef4", name: "Natural Gas", activity: "Fuel", scope: "Scope 1", unit: "m3", value: 2.02, source: "DEFRA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef5", name: "Air Travel (short)", activity: "Travel", scope: "Scope 3", unit: "km", value: 0.158, source: "DEFRA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef6", name: "Road Travel (car)", activity: "Travel", scope: "Scope 3", unit: "km", value: 0.171, source: "DEFRA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef7", name: "Waste Landfill", activity: "Waste", scope: "Scope 3", unit: "kg", value: 0.467, source: "EPA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef8", name: "Water Consumption", activity: "Water", scope: "Scope 3", unit: "m3", value: 0.344, source: "EPA", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef9", name: "Purchased Steel", activity: "Materials", scope: "Scope 3", unit: "kg", value: 1.85, source: "GHG Protocol", region: "GLOBAL", from: "2025-01-01", to: null, status: "Active" },
  { id: "ef10", name: "Purchased Plastic", activity: "Materials", scope: "Scope 3", unit: "kg", value: 2.75, source: "GHG Protocol", region: "GLOBAL", from: "2025-01-01", to: null, status: "Inactive" },
];

const months = ["2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02"];
export const CARBON_TRANSACTIONS = [
  { id: "ct1", ref: "CT-0001", date: "2025-04-12", deptId: "d1", sourceModule: "Manufacturing", sourceRecord: "MO/2025/0034", efId: "ef2", quantity: 850, calculatedEmission: 2278, calcType: "Auto", status: "Posted" },
  { id: "ct2", ref: "CT-0002", date: "2025-05-08", deptId: "d1", sourceModule: "Fleet", sourceRecord: "TR/2025/0117", efId: "ef2", quantity: 420, calculatedEmission: 1125.6, calcType: "Auto", status: "Posted" },
  { id: "ct3", ref: "CT-0003", date: "2025-06-02", deptId: "d3", sourceModule: "Expense", sourceRecord: "EXP/2025/0421", efId: "ef1", quantity: 12400, calculatedEmission: 10168, calcType: "Auto", status: "Posted" },
  { id: "ct4", ref: "CT-0004", date: "2025-06-19", deptId: "d5", sourceModule: "Purchase", sourceRecord: "PO/2025/0093", efId: "ef9", quantity: 2200, calculatedEmission: 4070, calcType: "Auto", status: "Posted" },
  { id: "ct5", ref: "CT-0005", date: "2025-07-11", deptId: "d1", sourceModule: "Manufacturing", sourceRecord: "MO/2025/0068", efId: "ef1", quantity: 8400, calculatedEmission: 6888, calcType: "Auto", status: "Posted" },
  { id: "ct6", ref: "CT-0006", date: "2025-07-24", deptId: "d6", sourceModule: "Expense", sourceRecord: "EXP/2025/0498", efId: "ef5", quantity: 6200, calculatedEmission: 979.6, calcType: "Auto", status: "Posted" },
  { id: "ct7", ref: "CT-0007", date: "2025-08-14", deptId: "d1", sourceModule: "Fleet", sourceRecord: "TR/2025/0198", efId: "ef2", quantity: 610, calculatedEmission: 1634.8, calcType: "Auto", status: "Posted" },
  { id: "ct8", ref: "CT-0008", date: "2025-09-05", deptId: "d1", sourceModule: "Manufacturing", sourceRecord: "MO/2025/0102", efId: "ef4", quantity: 1450, calculatedEmission: 2929, calcType: "Auto", status: "Posted" },
  { id: "ct9", ref: "CT-0009", date: "2025-09-27", deptId: "d3", sourceModule: "Expense", sourceRecord: "EXP/2025/0611", efId: "ef1", quantity: 13100, calculatedEmission: 10742, calcType: "Auto", status: "Posted" },
  { id: "ct10", ref: "CT-0010", date: "2025-10-10", deptId: "d5", sourceModule: "Purchase", sourceRecord: "PO/2025/0141", efId: "ef9", quantity: 1800, calculatedEmission: 3330, calcType: "Auto", status: "Posted" },
  { id: "ct11", ref: "CT-0011", date: "2025-10-29", deptId: "d1", sourceModule: "Fleet", sourceRecord: "TR/2025/0233", efId: "ef3", quantity: 260, calculatedEmission: 600.6, calcType: "Auto", status: "Posted" },
  { id: "ct12", ref: "CT-0012", date: "2025-11-08", deptId: "d6", sourceModule: "Expense", sourceRecord: "EXP/2025/0702", efId: "ef5", quantity: 4200, calculatedEmission: 663.6, calcType: "Auto", status: "Posted" },
  { id: "ct13", ref: "CT-0013", date: "2025-11-21", deptId: "d1", sourceModule: "Manufacturing", sourceRecord: "MO/2025/0154", efId: "ef1", quantity: 7900, calculatedEmission: 6478, calcType: "Auto", status: "Posted" },
  { id: "ct14", ref: "CT-0014", date: "2025-12-03", deptId: "d7", sourceModule: "Manual", sourceRecord: "MAN-014", efId: "ef8", quantity: 120, calculatedEmission: 41.28, calcType: "Manual", status: "Posted" },
  { id: "ct15", ref: "CT-0015", date: "2025-12-15", deptId: "d1", sourceModule: "Fleet", sourceRecord: "TR/2025/0289", efId: "ef2", quantity: 540, calculatedEmission: 1447.2, calcType: "Auto", status: "Posted" },
  { id: "ct16", ref: "CT-0016", date: "2026-01-06", deptId: "d1", sourceModule: "Manufacturing", sourceRecord: "MO/2026/0011", efId: "ef4", quantity: 1310, calculatedEmission: 2646.2, calcType: "Auto", status: "Posted" },
  { id: "ct17", ref: "CT-0017", date: "2026-01-18", deptId: "d3", sourceModule: "Expense", sourceRecord: "EXP/2026/0034", efId: "ef1", quantity: 11800, calculatedEmission: 9676, calcType: "Auto", status: "Posted" },
  { id: "ct18", ref: "CT-0018", date: "2026-01-30", deptId: "d5", sourceModule: "Purchase", sourceRecord: "PO/2026/0022", efId: "ef9", quantity: 1650, calculatedEmission: 3052.5, calcType: "Auto", status: "Posted" },
  { id: "ct19", ref: "CT-0019", date: "2026-02-08", deptId: "d1", sourceModule: "Fleet", sourceRecord: "TR/2026/0041", efId: "ef2", quantity: 490, calculatedEmission: 1313.2, calcType: "Auto", status: "Posted" },
  { id: "ct20", ref: "CT-0020", date: "2026-02-15", deptId: "d6", sourceModule: "Expense", sourceRecord: "EXP/2026/0088", efId: "ef5", quantity: 3800, calculatedEmission: 600.4, calcType: "Auto", status: "Posted" },
];

export const ENV_GOALS = [
  { id: "g1", name: "Reduce Fleet Emissions", deptId: "d1", metric: "kg CO2e", baseline: 8000, target: 5000, current: 6100, start: "2025-01-01", end: "2026-12-31", owner: "S. Rao", status: "On Track" },
  { id: "g2", name: "Cut Packaging Waste", deptId: "d1", metric: "tonnes", baseline: 150, target: 120, current: 128, start: "2025-01-01", end: "2026-09-30", owner: "D. Kumar", status: "On Track" },
  { id: "g3", name: "Office Energy Cut", deptId: "d3", metric: "kWh", baseline: 100000, target: 80000, current: 82000, start: "2025-01-01", end: "2026-06-30", owner: "P. Nair", status: "On Track" },
  { id: "g4", name: "Water Reduction", deptId: "d1", metric: "m3", baseline: 12000, target: 9000, current: 11200, start: "2025-01-01", end: "2026-12-31", owner: "S. Rao", status: "At Risk" },
  { id: "g5", name: "Recycled Material %", deptId: "d5", metric: "%", baseline: 12, target: 30, current: 22, start: "2025-01-01", end: "2026-12-31", owner: "M. Verma", status: "On Track" },
  { id: "g6", name: "Zero Landfill Waste", deptId: "d8", metric: "kg", baseline: 3000, target: 0, current: 0, start: "2025-01-01", end: "2025-12-31", owner: "L. Fernandes", status: "Achieved" },
];

export const PRODUCTS = [
  { id: "p1", name: "EcoBottle 500ml", sku: "EB-500", category: "Consumer Goods", carbon: 0.42, recycled: 78, energy: 1.2, water: 0.8, packaging: "Recycled PET", recycScore: 85, envR: "A", socR: "B", govR: "A", overall: "A", certifications: "ISO 14001", status: "Active" },
  { id: "p2", name: "GreenPack Box", sku: "GP-100", category: "Packaging", carbon: 0.9, recycled: 92, energy: 0.6, water: 0.3, packaging: "Cardboard", recycScore: 95, envR: "A", socR: "A", govR: "A", overall: "A", certifications: "FSC", status: "Active" },
  { id: "p3", name: "SolarLamp Lite", sku: "SL-01", category: "Electronics", carbon: 3.4, recycled: 30, energy: 0.4, water: 0.5, packaging: "Recycled PET", recycScore: 60, envR: "B", socR: "A", govR: "B", overall: "B", certifications: "RoHS", status: "Active" },
  { id: "p4", name: "BioClean Detergent", sku: "BC-2L", category: "Consumer Goods", carbon: 1.1, recycled: 65, energy: 0.9, water: 2.1, packaging: "Bioplastic", recycScore: 70, envR: "B", socR: "B", govR: "A", overall: "B", certifications: "EcoLabel", status: "Active" },
  { id: "p5", name: "SteelCup", sku: "SC-350", category: "Consumer Goods", carbon: 2.8, recycled: 55, energy: 3.4, water: 1.1, packaging: "Cardboard", recycScore: 78, envR: "B", socR: "A", govR: "A", overall: "B", certifications: "-", status: "Active" },
  { id: "p6", name: "EcoTote Bag", sku: "ET-05", category: "Consumer Goods", carbon: 0.28, recycled: 100, energy: 0.2, water: 0.6, packaging: "None", recycScore: 92, envR: "A", socR: "A", govR: "A", overall: "A", certifications: "GOTS", status: "Active" },
  { id: "p7", name: "GreenCharger 20W", sku: "GC-20", category: "Electronics", carbon: 4.6, recycled: 25, energy: 0.3, water: 0.4, packaging: "Recycled PET", recycScore: 55, envR: "C", socR: "B", govR: "B", overall: "B", certifications: "CE", status: "Active" },
  { id: "p8", name: "EcoNotebook", sku: "EN-A5", category: "Stationery", carbon: 0.35, recycled: 88, energy: 0.1, water: 0.7, packaging: "Cardboard", recycScore: 90, envR: "A", socR: "A", govR: "A", overall: "A", certifications: "FSC", status: "Active" },
];

export const CSR_ACTIVITIES = [
  { id: "a1", title: "Community Tree Plantation Drive", category: "Environment", deptId: "d2", description: "Plant 500 saplings in local parks.", location: "Bangalore", start: "2026-03-05", end: "2026-03-05", maxParticipants: 60, currentParticipants: 24, points: 50, coordinator: "Tara Bose", evidenceRequired: true, status: "Published" },
  { id: "a2", title: "Digital Literacy Workshop", category: "Education", deptId: "d3", description: "Teach basic computer skills at NGO.", location: "Mumbai", start: "2026-02-20", end: "2026-02-22", maxParticipants: 30, currentParticipants: 18, points: 40, coordinator: "Priya Nair", evidenceRequired: true, status: "Ongoing" },
  { id: "a3", title: "Blood Donation Camp", category: "Health", deptId: "d2", description: "Company-wide blood donation drive.", location: "HQ", start: "2026-04-12", end: "2026-04-12", maxParticipants: 100, currentParticipants: 46, points: 30, coordinator: "Riya Kapoor", evidenceRequired: false, status: "Published" },
  { id: "a4", title: "E-Waste Collection Campaign", category: "Environment", deptId: "d3", description: "Collect and recycle office e-waste.", location: "All Sites", start: "2026-02-01", end: "2026-02-28", maxParticipants: 200, currentParticipants: 88, points: 25, coordinator: "Arjun Patel", evidenceRequired: true, status: "Ongoing" },
  { id: "a5", title: "Rural Education Support Program", category: "Education", deptId: "d2", description: "Mentor students in rural schools.", location: "Karnataka", start: "2026-01-15", end: "2026-06-15", maxParticipants: 40, currentParticipants: 22, points: 60, coordinator: "Tara Bose", evidenceRequired: true, status: "Ongoing" },
  { id: "a6", title: "Community Health Awareness Program", category: "Health", deptId: "d2", description: "Health checkups at community centers.", location: "Pune", start: "2026-03-20", end: "2026-03-21", maxParticipants: 40, currentParticipants: 12, points: 35, coordinator: "Riya Kapoor", evidenceRequired: true, status: "Published" },
];

export const PARTICIPATIONS = [
  { id: "pr1", empId: "e1", activityId: "a1", proof: "photo.jpg", status: "Submitted", comment: "", points: 50, submitted: "2026-02-14", approvedBy: null, approvedOn: null },
  { id: "pr2", empId: "e2", activityId: "a2", proof: "cert.pdf", status: "Approved", comment: "Great!", points: 40, submitted: "2026-02-10", approvedBy: "e17", approvedOn: "2026-02-11" },
  { id: "pr3", empId: "e3", activityId: "a4", proof: "photo.jpg", status: "Approved", comment: "", points: 25, submitted: "2026-02-05", approvedBy: "e17", approvedOn: "2026-02-06" },
  { id: "pr4", empId: "e4", activityId: "a5", proof: "cert.pdf", status: "Approved", comment: "", points: 60, submitted: "2026-01-20", approvedBy: "e17", approvedOn: "2026-01-21" },
  { id: "pr5", empId: "e5", activityId: "a1", proof: "", status: "Draft", comment: "", points: 0, submitted: null, approvedBy: null, approvedOn: null },
  { id: "pr6", empId: "e6", activityId: "a4", proof: "photo.jpg", status: "Approved", comment: "", points: 25, submitted: "2026-02-02", approvedBy: "e17", approvedOn: "2026-02-03" },
  { id: "pr7", empId: "e7", activityId: "a2", proof: "cert.pdf", status: "Rejected", comment: "Proof unclear", points: 0, submitted: "2026-02-11", approvedBy: "e17", approvedOn: "2026-02-12" },
  { id: "pr8", empId: "e8", activityId: "a4", proof: "photo.jpg", status: "Approved", comment: "", points: 25, submitted: "2026-02-04", approvedBy: "e17", approvedOn: "2026-02-05" },
  { id: "pr9", empId: "e9", activityId: "a3", proof: "", status: "Submitted", comment: "", points: 30, submitted: "2026-02-13", approvedBy: null, approvedOn: null },
  { id: "pr10", empId: "e10", activityId: "a1", proof: "", status: "Draft", comment: "", points: 0, submitted: null, approvedBy: null, approvedOn: null },
  { id: "pr11", empId: "e13", activityId: "a5", proof: "cert.pdf", status: "Approved", comment: "", points: 60, submitted: "2026-01-25", approvedBy: "e17", approvedOn: "2026-01-26" },
  { id: "pr12", empId: "e14", activityId: "a4", proof: "photo.jpg", status: "Submitted", comment: "", points: 25, submitted: "2026-02-15", approvedBy: null, approvedOn: null },
];

export const DIVERSITY = {
  gender: [{ name: "Female", value: 42 }, { name: "Male", value: 55 }, { name: "Non-binary", value: 3 }],
  age: [{ name: "20-29", value: 32 }, { name: "30-39", value: 41 }, { name: "40-49", value: 18 }, { name: "50+", value: 9 }],
  leadership: [{ name: "Female", value: 38 }, { name: "Male", value: 58 }, { name: "Non-binary", value: 4 }],
  inclusionIndex: 78,
  diversityScore: 74,
};

export const TRAINING = [
  { id: "t1", title: "ESG Fundamentals", category: "ESG", deptId: null, assigned: 320, completed: 268, deadline: "2026-03-31", status: "Ongoing" },
  { id: "t2", title: "Anti-Bribery & Compliance", category: "Compliance", deptId: null, assigned: 320, completed: 244, deadline: "2026-02-28", status: "Ongoing" },
  { id: "t3", title: "Diversity & Inclusion", category: "HR", deptId: null, assigned: 320, completed: 210, deadline: "2026-04-15", status: "Ongoing" },
  { id: "t4", title: "Data Privacy Basics", category: "Governance", deptId: "d3", assigned: 58, completed: 52, deadline: "2026-02-15", status: "Overdue" },
  { id: "t5", title: "Waste Segregation SOP", category: "Environment", deptId: "d1", assigned: 134, completed: 120, deadline: "2026-03-10", status: "Ongoing" },
  { id: "t6", title: "Cyber Security", category: "IT", deptId: "d3", assigned: 58, completed: 58, deadline: "2025-12-31", status: "Completed" },
  { id: "t7", title: "Health & Safety Refresh", category: "Safety", deptId: "d1", assigned: 134, completed: 94, deadline: "2026-04-30", status: "Ongoing" },
  { id: "t8", title: "Supplier Code of Conduct", category: "Governance", deptId: "d5", assigned: 18, completed: 11, deadline: "2026-03-15", status: "Ongoing" },
];

export const POLICIES = [
  { id: "pol1", name: "Environmental Sustainability Policy", code: "POL-ENV-01", version: "2.1", deptId: null, description: "Framework for sustainability across operations.", file: "env-policy-v2.1.pdf", effective: "2025-06-01", review: "2026-06-01", owner: "S. Rao", ackRequired: true, status: "Published" },
  { id: "pol2", name: "Anti-Bribery and Ethics Policy", code: "POL-GOV-02", version: "1.4", deptId: null, description: "Zero-tolerance policy for bribery.", file: "anti-bribery-v1.4.pdf", effective: "2025-03-01", review: "2026-03-01", owner: "R. Iyer", ackRequired: true, status: "Published" },
  { id: "pol3", name: "Diversity and Inclusion Policy", code: "POL-SOC-01", version: "1.2", deptId: null, description: "Inclusive workplace guidelines.", file: "dnI-v1.2.pdf", effective: "2025-01-15", review: "2026-01-15", owner: "T. Bose", ackRequired: true, status: "Published" },
  { id: "pol4", name: "Responsible Procurement Policy", code: "POL-PRC-01", version: "1.0", deptId: "d5", description: "Sustainable supplier requirements.", file: "resp-proc-v1.0.pdf", effective: "2025-08-01", review: "2026-08-01", owner: "M. Verma", ackRequired: true, status: "Published" },
  { id: "pol5", name: "Data Privacy and Governance Policy", code: "POL-IT-01", version: "3.0", deptId: "d3", description: "Data handling and privacy standards.", file: "data-priv-v3.0.pdf", effective: "2025-04-01", review: "2026-04-01", owner: "P. Nair", ackRequired: true, status: "Published" },
  { id: "pol6", name: "Employee Health and Safety Policy", code: "POL-HSE-01", version: "1.8", deptId: null, description: "Workplace safety standards.", file: "hse-v1.8.pdf", effective: "2025-02-01", review: "2026-02-01", owner: "L. Fernandes", ackRequired: true, status: "Published" },
];

// Auto-generate ack records for a set of employees across policies
export const ACKNOWLEDGEMENTS = (() => {
  const list = [];
  let idc = 1;
  const empSample = EMPLOYEES.slice(0, 20).map(e => e.id);
  POLICIES.forEach(pol => {
    empSample.forEach((eid, i) => {
      const acknowledged = (i + parseInt(pol.id.slice(3))) % 4 !== 0; // ~75% ack
      list.push({
        id: `ack${idc++}`,
        policyId: pol.id,
        empId: eid,
        status: acknowledged ? "Acknowledged" : "Pending",
        date: acknowledged ? "2025-12-05" : null,
        reminderCount: acknowledged ? 0 : 1,
        lastReminder: acknowledged ? null : "2026-01-15",
      });
    });
  });
  return list.slice(0, 20).concat(list.slice(20)); // keep all
})();

export const AUDITS = [
  { id: "au1", ref: "AUD-2025-001", title: "Q2 Waste Audit", type: "Environmental", deptId: "d1", lead: "V. Singh", team: ["S. Rao"], planned: "2025-06-12", completed: "2025-06-18", scope: "Waste tracking", findings: 3, result: "Minor issues", status: "Completed" },
  { id: "au2", ref: "AUD-2025-002", title: "Vendor Compliance Check", type: "Governance", deptId: "d5", lead: "V. Singh", team: ["M. Verma"], planned: "2025-07-01", completed: null, scope: "Supplier ESG docs", findings: 1, result: "Under Review", status: "In Progress" },
  { id: "au3", ref: "AUD-2025-003", title: "Energy Consumption Audit", type: "Environmental", deptId: "d3", lead: "V. Singh", team: ["P. Nair"], planned: "2025-09-20", completed: "2025-09-28", scope: "Office electricity", findings: 2, result: "Improvements needed", status: "Completed" },
  { id: "au4", ref: "AUD-2026-001", title: "Fleet Fuel Audit", type: "Environmental", deptId: "d1", lead: "V. Singh", team: [], planned: "2026-03-15", completed: null, scope: "Fleet fuel records", findings: 0, result: "-", status: "Planned" },
  { id: "au5", ref: "AUD-2026-002", title: "Data Protection Audit", type: "Governance", deptId: "d3", lead: "V. Singh", team: [], planned: "2026-04-10", completed: null, scope: "GDPR compliance", findings: 0, result: "-", status: "Planned" },
];

export const COMPLIANCE_ISSUES = [
  { id: "ci1", ref: "CI-001", auditId: "au1", deptId: "d1", severity: "High", description: "Missing hazardous waste disposal record for Q2.", ownerId: "e12", due: "2026-02-05", status: "Open", corrective: "Compile records and file with authority.", resolution: "", resolved: null },
  { id: "ci2", ref: "CI-002", auditId: "au2", deptId: "d5", severity: "Medium", description: "Late vendor ESG disclosure documentation.", ownerId: "e7", due: "2026-01-30", status: "Resolved", corrective: "Send reminders and collect docs.", resolution: "All vendor docs collected.", resolved: "2026-01-28" },
  { id: "ci3", ref: "CI-003", auditId: null, deptId: "d3", severity: "Medium", description: "Delayed policy acknowledgement across IT team.", ownerId: "e3", due: "2026-02-25", status: "In Progress", corrective: "Automated reminders.", resolution: "", resolved: null },
  { id: "ci4", ref: "CI-004", auditId: "au2", deptId: "d5", severity: "High", description: "Supplier ESG documentation incomplete.", ownerId: "e7", due: "2026-02-01", status: "Open", corrective: "Assign compliance owner per vendor.", resolution: "", resolved: null },
  { id: "ci5", ref: "CI-005", auditId: "au3", deptId: "d3", severity: "Low", description: "Energy consumption audit discrepancy.", ownerId: "e3", due: "2026-03-15", status: "In Progress", corrective: "Reconcile meter readings.", resolution: "", resolved: null },
  { id: "ci6", ref: "CI-006", auditId: null, deptId: "d1", severity: "Critical", description: "Employee safety-training non-compliance in Line 2.", ownerId: "e12", due: "2026-01-20", status: "Open", corrective: "Schedule immediate training.", resolution: "", resolved: null },
  { id: "ci7", ref: "CI-007", auditId: null, deptId: "d1", severity: "High", description: "Missing fleet fuel records for last quarter.", ownerId: "e12", due: "2026-03-01", status: "Open", corrective: "Integrate fleet logs.", resolution: "", resolved: null },
  { id: "ci8", ref: "CI-008", auditId: "au1", deptId: "d1", severity: "Low", description: "Recyclable bin labels missing.", ownerId: "e12", due: "2026-02-20", status: "In Progress", corrective: "Order signage.", resolution: "", resolved: null },
  { id: "ci9", ref: "CI-009", auditId: null, deptId: "d4", severity: "Medium", description: "Delayed finance controls review.", ownerId: "e4", due: "2026-02-28", status: "Open", corrective: "Schedule review.", resolution: "", resolved: null },
  { id: "ci10", ref: "CI-010", auditId: "au3", deptId: "d3", severity: "Medium", description: "Server room cooling optimization.", ownerId: "e3", due: "2026-04-01", status: "Open", corrective: "Adjust HVAC schedule.", resolution: "", resolved: null },
];

export const CHALLENGES = [
  { id: "ch1", title: "Sustainability Sprint", category: "Environment", description: "Cut personal emissions by 20% this month.", xp: 200, difficulty: "Hard", evidenceRequired: true, start: "2026-02-01", deadline: "2026-02-28", owner: "S. Rao", status: "Active" },
  { id: "ch2", title: "Recycle Challenge", category: "Environment", description: "Log recycling activities for 15 days.", xp: 80, difficulty: "Easy", evidenceRequired: true, start: "2026-02-01", deadline: "2026-02-15", owner: "D. Kumar", status: "Active" },
  { id: "ch3", title: "Commute Green Week", category: "Environment", description: "Use non-car commute for a week.", xp: 120, difficulty: "Medium", evidenceRequired: false, start: "2026-02-20", deadline: "2026-02-27", owner: "K. Shah", status: "Draft" },
  { id: "ch4", title: "Plastic-Free Week", category: "Environment", description: "Zero single-use plastic for 7 days.", xp: 100, difficulty: "Medium", evidenceRequired: true, start: "2026-01-05", deadline: "2026-01-12", owner: "T. Bose", status: "Completed" },
  { id: "ch5", title: "Cycle to Work Challenge", category: "Health", description: "Cycle to work 8 times this month.", xp: 150, difficulty: "Medium", evidenceRequired: true, start: "2026-02-01", deadline: "2026-02-28", owner: "R. Kapoor", status: "Active" },
  { id: "ch6", title: "Zero-Waste Lunch", category: "Environment", description: "Bring reusable lunch for 10 days.", xp: 60, difficulty: "Easy", evidenceRequired: false, start: "2026-01-15", deadline: "2026-02-15", owner: "T. Bose", status: "Under Review" },
  { id: "ch7", title: "Green Office Innovation", category: "Innovation", description: "Submit an office sustainability idea.", xp: 250, difficulty: "Hard", evidenceRequired: true, start: "2026-01-01", deadline: "2026-03-31", owner: "D. Kumar", status: "Active" },
  { id: "ch8", title: "Sustainable Commuting Month", category: "Environment", description: "Reduce commute footprint over 30 days.", xp: 200, difficulty: "Hard", evidenceRequired: true, start: "2026-02-01", deadline: "2026-03-01", owner: "K. Shah", status: "Active" },
];

export const CHALLENGE_PARTICIPATIONS = [
  { id: "cp1", challengeId: "ch1", empId: "e1", progress: 60, proof: "photo.jpg", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp2", challengeId: "ch2", empId: "e3", progress: 100, proof: "log.pdf", status: "Approved", xp: 80, submitted: "2026-02-15", approvedBy: "e2" },
  { id: "cp3", challengeId: "ch4", empId: "e6", progress: 100, proof: "photo.jpg", status: "Approved", xp: 100, submitted: "2026-01-12", approvedBy: "e2" },
  { id: "cp4", challengeId: "ch5", empId: "e9", progress: 50, proof: "", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp5", challengeId: "ch7", empId: "e13", progress: 100, proof: "idea.pdf", status: "Submitted", xp: 0, submitted: "2026-02-10", approvedBy: null },
  { id: "cp6", challengeId: "ch1", empId: "e3", progress: 40, proof: "", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp7", challengeId: "ch6", empId: "e8", progress: 100, proof: "photo.jpg", status: "Submitted", xp: 0, submitted: "2026-02-14", approvedBy: null },
  { id: "cp8", challengeId: "ch8", empId: "e20", progress: 30, proof: "", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp9", challengeId: "ch5", empId: "e6", progress: 75, proof: "photo.jpg", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp10", challengeId: "ch2", empId: "e14", progress: 100, proof: "log.pdf", status: "Approved", xp: 80, submitted: "2026-02-14", approvedBy: "e2" },
  { id: "cp11", challengeId: "ch4", empId: "e3", progress: 100, proof: "photo.jpg", status: "Approved", xp: 100, submitted: "2026-01-11", approvedBy: "e2" },
  { id: "cp12", challengeId: "ch7", empId: "e6", progress: 80, proof: "", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp13", challengeId: "ch1", empId: "e20", progress: 55, proof: "", status: "In Progress", xp: 0, submitted: null, approvedBy: null },
  { id: "cp14", challengeId: "ch2", empId: "e10", progress: 40, proof: "", status: "Joined", xp: 0, submitted: null, approvedBy: null },
];

export const BADGES = [
  { id: "b1", name: "Green Starter", description: "Reach 100 XP", metric: "Total XP", operator: ">=", value: 100, icon: "leaf", status: "Active" },
  { id: "b2", name: "CSR Champion", description: "5+ approved CSR participations", metric: "Approved CSR Participations", operator: ">=", value: 5, icon: "heart", status: "Active" },
  { id: "b3", name: "Eco Warrior", description: "Complete 5 challenges", metric: "Completed Challenges", operator: ">=", value: 5, icon: "shield", status: "Active" },
  { id: "b4", name: "Sustainability Hero", description: "Reach 1000 XP", metric: "Total XP", operator: ">=", value: 1000, icon: "trophy", status: "Active" },
  { id: "b5", name: "Carbon Hero", description: "Reduce 500 kg carbon", metric: "Carbon Reduction", operator: ">=", value: 500, icon: "globe", status: "Active" },
  { id: "b6", name: "Team Player", description: "5 policy acknowledgements", metric: "Policy Acknowledgements", operator: ">=", value: 5, icon: "users", status: "Active" },
];

export const EMPLOYEE_BADGES = [
  { empId: "e3", badgeId: "b1", unlockedAt: "2025-11-10" },
  { empId: "e3", badgeId: "b4", unlockedAt: "2026-01-05" },
  { empId: "e6", badgeId: "b1", unlockedAt: "2025-12-01" },
  { empId: "e1", badgeId: "b1", unlockedAt: "2025-11-20" },
  { empId: "e20", badgeId: "b1", unlockedAt: "2025-12-15" },
  { empId: "e8", badgeId: "b1", unlockedAt: "2025-11-25" },
];

export const REWARDS = [
  { id: "r1", name: "Eco Water Bottle", description: "Insulated steel bottle", points: 100, stock: 25, image: "bottle", start: "2026-01-01", end: "2026-12-31", status: "Active" },
  { id: "r2", name: "Extra Day Off", description: "One extra paid leave day", points: 500, stock: 10, image: "calendar", start: "2026-01-01", end: "2026-12-31", status: "Active" },
  { id: "r3", name: "Company Merchandise Pack", description: "T-shirt, cap and tote", points: 250, stock: 0, image: "shirt", start: "2026-01-01", end: "2026-12-31", status: "Out of Stock" },
  { id: "r4", name: "Coffee Voucher", description: "5 coffees at partner cafe", points: 80, stock: 40, image: "coffee", start: "2026-01-01", end: "2026-12-31", status: "Active" },
  { id: "r5", name: "Tree Plantation in Your Name", description: "Plant a tree with certificate", points: 150, stock: 30, image: "tree", start: "2026-01-01", end: "2026-12-31", status: "Active" },
  { id: "r6", name: "Wellness Voucher", description: "Yoga class credit", points: 200, stock: 15, image: "sparkles", start: "2026-01-01", end: "2026-12-31", status: "Active" },
];

export const REDEMPTIONS = [
  { id: "rd1", empId: "e3", rewardId: "r1", date: "2026-01-10", points: 100 },
  { id: "rd2", empId: "e6", rewardId: "r4", date: "2026-01-15", points: 80 },
  { id: "rd3", empId: "e20", rewardId: "r5", date: "2026-01-22", points: 150 },
  { id: "rd4", empId: "e8", rewardId: "r1", date: "2026-02-01", points: 100 },
  { id: "rd5", empId: "e17", rewardId: "r6", date: "2026-02-05", points: 200 },
  { id: "rd6", empId: "e1", rewardId: "r4", date: "2026-02-10", points: 80 },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "CSR", title: "CSR Approval Pending", message: "Aditi Rao submitted proof for Tree Plantation", ts: "2026-02-14T10:30:00", read: false, module: "social", link: "/social/participation" },
  { id: "n2", type: "Compliance", title: "Overdue Compliance Issue", message: "CI-006 in Manufacturing is overdue", ts: "2026-02-13T09:00:00", read: false, module: "governance", link: "/governance/compliance" },
  { id: "n3", type: "Badge", title: "Badge Unlocked", message: "Priya Nair earned Sustainability Hero", ts: "2026-01-05T14:20:00", read: true, module: "gamification", link: "/gamification/badges" },
  { id: "n4", type: "Carbon", title: "Carbon Transaction Generated", message: "CT-0020 auto-created from Expense", ts: "2026-02-15T11:00:00", read: true, module: "environmental", link: "/environmental/transactions" },
  { id: "n5", type: "Challenge", title: "Challenge Approved", message: "Recycle Challenge participation approved", ts: "2026-02-15T08:15:00", read: false, module: "gamification", link: "/gamification/participation" },
  { id: "n6", type: "Policy", title: "Acknowledgement Reminder", message: "5 pending policy acknowledgements", ts: "2026-02-15T07:00:00", read: false, module: "governance", link: "/governance/acknowledgements" },
  { id: "n7", type: "Goal", title: "Goal Deadline Approaching", message: "Office Energy Cut goal deadline 2026-06-30", ts: "2026-02-14T09:00:00", read: true, module: "environmental", link: "/environmental/goals" },
  { id: "n8", type: "Reward", title: "Reward Redeemed", message: "Aditi Rao redeemed Coffee Voucher", ts: "2026-02-10T16:30:00", read: true, module: "gamification", link: "/gamification/redemptions" },
  { id: "n9", type: "CSR", title: "CSR Approved", message: "E-Waste Collection participation approved", ts: "2026-02-06T11:00:00", read: true, module: "social", link: "/social/participation" },
  { id: "n10", type: "Compliance", title: "New Compliance Issue", message: "CI-010 raised in IT", ts: "2026-02-12T14:00:00", read: false, module: "governance", link: "/governance/compliance" },
  { id: "n11", type: "Badge", title: "Badge Unlocked", message: "Aditi Rao earned Green Starter", ts: "2025-11-20T10:00:00", read: true, module: "gamification", link: "/gamification/badges" },
  { id: "n12", type: "Carbon", title: "Carbon Transaction Generated", message: "CT-0019 auto-created from Fleet", ts: "2026-02-08T09:30:00", read: true, module: "environmental", link: "/environmental/transactions" },
  { id: "n13", type: "Policy", title: "New Policy Published", message: "Data Privacy v3.0 available", ts: "2025-04-01T09:00:00", read: true, module: "governance", link: "/governance/policies" },
  { id: "n14", type: "Challenge", title: "Challenge Started", message: "Sustainability Sprint is now active", ts: "2026-02-01T08:00:00", read: true, module: "gamification", link: "/gamification/challenges" },
  { id: "n15", type: "Reward", title: "Reward Redeemed", message: "Sneha Nair redeemed Company Merchandise", ts: "2026-01-05T12:00:00", read: true, module: "gamification", link: "/gamification/redemptions" },
  { id: "n16", type: "CSR", title: "CSR Approval Pending", message: "Rohan Gupta submitted proof for E-Waste", ts: "2026-02-15T13:00:00", read: false, module: "social", link: "/social/participation" },
  { id: "n17", type: "Compliance", title: "Overdue Compliance Issue", message: "CI-004 in Procurement is overdue", ts: "2026-02-02T08:00:00", read: false, module: "governance", link: "/governance/compliance" },
  { id: "n18", type: "Goal", title: "Goal At Risk", message: "Water Reduction at 32% progress", ts: "2026-02-10T09:00:00", read: false, module: "environmental", link: "/environmental/goals" },
  { id: "n19", type: "Badge", title: "Badge Unlocked", message: "Rohan Gupta earned Green Starter", ts: "2025-11-25T09:00:00", read: true, module: "gamification", link: "/gamification/badges" },
  { id: "n20", type: "Carbon", title: "Emission Factor Updated", message: "Grid Electricity factor updated", ts: "2025-12-31T09:00:00", read: true, module: "environmental", link: "/environmental/emission-factors" },
];

export const CATEGORIES = [
  { id: "cat1", name: "Environment", type: "CSR Activity", status: "Active" },
  { id: "cat2", name: "Education", type: "CSR Activity", status: "Active" },
  { id: "cat3", name: "Health", type: "CSR Activity", status: "Active" },
  { id: "cat4", name: "Innovation", type: "Challenge", status: "Active" },
  { id: "cat5", name: "Compliance", type: "Training", status: "Active" },
  { id: "cat6", name: "Governance", type: "ESG", status: "Active" },
  { id: "cat7", name: "Consumer Goods", type: "Product", status: "Active" },
  { id: "cat8", name: "Anti-Bribery", type: "Policy", status: "Active" },
];

export const DEFAULT_CONFIG = {
  autoEmissionCalc: true,
  csrEvidenceRequired: true,
  challengeEvidenceRequired: true,
  badgeAutoAward: true,
  envWeight: 40,
  socWeight: 30,
  govWeight: 30,
  policyXP: 20,
  defaultCarbonUnit: "kg CO2e",
  defaultCurrency: "INR",
  inAppNotifications: true,
  emailNotifications: false,
  notifyComplianceNew: true,
  notifyComplianceOverdue: true,
  notifyCSR: true,
  notifyChallenge: true,
  notifyPolicy: true,
  notifyBadge: true,
  notifyReward: true,
  notifyGoal: true,
  reminderInterval: 7,
  overdueFrequency: 3,
  goalWarningDays: 14,
};
