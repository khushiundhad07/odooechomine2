import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function exportCSV(rows, filename = "report.csv") {
  if (!rows?.length) return;
  const keys = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, filename);
}

export function exportExcel(rows, filename = "report.xlsx", sheet = "Report") {
  const ws = XLSX.utils.json_to_sheet(rows || []);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheet);
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buf], { type: "application/octet-stream" });
  triggerDownload(blob, filename);
}

export function exportPDF({ title, subtitle, rows, filename = "report.pdf" }) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  doc.setFontSize(18);
  doc.text(title || "EcoSphere Report", 40, 40);
  if (subtitle) {
    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text(subtitle, 40, 60);
    doc.setTextColor(0);
  }
  if (rows?.length) {
    const head = [Object.keys(rows[0])];
    const body = rows.map((r) => head[0].map((k) => r[k]));
    autoTable(doc, {
      startY: 80,
      head,
      body,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [15, 23, 42], textColor: 255 },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });
  }
  doc.save(filename);
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
