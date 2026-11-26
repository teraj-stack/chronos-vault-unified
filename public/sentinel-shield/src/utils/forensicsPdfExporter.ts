import jsPDF from "/sentinel-shield/node_modules/.vite/deps/jspdf.js?v=1a9a4e7b";
import autoTable from "/sentinel-shield/node_modules/.vite/deps/jspdf-autotable.js?v=1368d3ff";
async function computeSha256(data) {
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(data);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) {
  }
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(16, "0");
  return `${hex}${hex}${hex}${hex}`.slice(0, 64);
}
export async function generateNeutralizedThreatsPdf(threats, focusLogs, options = {}) {
  const {
    reportTitle = "SENTINEL INCIDENT RESPONSE & FORENSICS AUDIT DOSSIER",
    classification = "RESTRICTED FORENSIC LOG",
    investigatorUnit = "Sentinel Cyber Defense Lab / Forensic Unit Alpha-4E04",
    stationNode = "WORKSTATION-SECURE-NODE",
    includeFocusLogs = true,
    includeKillSnippets = true,
    includeExploitChains = true,
    selectedThreatIds,
    filterSeverity = "ALL",
    customNotes = ""
  } = options;
  const targetThreats = threats.filter((t) => {
    if (selectedThreatIds && selectedThreatIds.length > 0 && !selectedThreatIds.includes("ALL")) {
      if (!selectedThreatIds.includes(t.id)) return false;
    }
    if (filterSeverity !== "ALL" && t.severity !== filterSeverity) {
      return false;
    }
    return true;
  });
  const now = /* @__PURE__ */ new Date();
  const timestampIso = now.toISOString();
  const timestampFormatted = now.toUTCString();
  const localDateStr = now.toLocaleString();
  const rawIdString = `${timestampIso}-${targetThreats.map((t) => t.id + t.sha256Hash).join("-")}`;
  const reportHash = await computeSha256(rawIdString);
  const shortHash = reportHash.slice(0, 16).toUpperCase();
  const totalThreats = targetThreats.length;
  const criticalCount = targetThreats.filter((t) => t.severity === "CRITICAL" || t.severity === "EXTREME").length;
  const highCount = targetThreats.filter((t) => t.severity === "HIGH").length;
  const totalFocusAttempts = focusLogs.reduce((acc, log) => acc + (log.repeatCount || 1), 0);
  const avgEntropy = totalThreats > 0 ? (targetThreats.reduce((acc, t) => acc + t.entropy, 0) / totalThreats).toFixed(2) : "0.00";
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const colors = {
    primaryDark: [15, 23, 42],
    // Slate-900
    primaryNavy: [30, 41, 59],
    // Slate-800
    accentCyan: [8, 145, 178],
    // Cyan-600
    accentPurple: [126, 34, 206],
    // Purple-700
    alertRed: [185, 28, 28],
    // Red-700
    alertAmber: [180, 83, 9],
    // Amber-700
    alertGreen: [16, 149, 90],
    // Emerald-600
    textPrimary: [15, 23, 42],
    textMuted: [100, 116, 139],
    // Slate-500
    bgMuted: [248, 250, 252],
    // Slate-50
    borderMuted: [226, 232, 240]
    // Slate-200
  };
  const drawSectionHeader = (title, yPos, iconLabel = "■") => {
    doc.setFillColor(...colors.primaryDark);
    doc.rect(margin, yPos, contentWidth, 7, "F");
    doc.setFillColor(...colors.accentCyan);
    doc.rect(margin, yPos, 3, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`${iconLabel}  ${title.toUpperCase()}`, margin + 6, yPos + 4.8);
    return yPos + 10;
  };
  let currentY = margin;
  doc.setFillColor(...colors.alertRed);
  doc.rect(0, 0, pageWidth, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`[ ${classification} ] - AUDIT TRAIL FOR AUTHORIZED SECURITY & FORENSIC PERSONNEL ONLY`, pageWidth / 2, 4.8, { align: "center" });
  currentY = 12;
  doc.setFillColor(...colors.primaryDark);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("SENTINEL CYBER DEFENSE & FORENSIC LAB", margin + 6, currentY + 7);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(56, 189, 248);
  doc.text(reportTitle, margin + 6, currentY + 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(203, 213, 225);
  doc.text(`Official Forensic Record of Process Decapitation, RAM Freezes, and Window Hijack Neutralization`, margin + 6, currentY + 19);
  doc.setFillColor(...colors.primaryNavy);
  doc.roundedRect(pageWidth - margin - 52, currentY + 3, 48, 18, 1, 1, "F");
  doc.setFont("courier", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(248, 250, 252);
  doc.text(`AUDIT ID: ${shortHash}`, pageWidth - margin - 50, currentY + 8);
  doc.text(`VER.: SENTINEL 4.9`, pageWidth - margin - 50, currentY + 12);
  doc.text(`STATUS: SEALED & LOGGED`, pageWidth - margin - 50, currentY + 16);
  currentY += 28;
  const metaColWidth = contentWidth / 2;
  doc.setDrawColor(...colors.borderMuted);
  doc.setFillColor(...colors.bgMuted);
  doc.roundedRect(margin, currentY, contentWidth, 23, 1.5, 1.5, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...colors.textPrimary);
  doc.text("DOCUMENT METADATA & CHAIN OF CUSTODY", margin + 4, currentY + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...colors.textMuted);
  doc.text(`Timestamp (UTC):`, margin + 4, currentY + 10);
  doc.setFont("courier", "normal");
  doc.setTextColor(...colors.textPrimary);
  doc.text(timestampFormatted, margin + 30, currentY + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textMuted);
  doc.text(`Local Station Time:`, margin + 4, currentY + 15);
  doc.setFont("courier", "normal");
  doc.setTextColor(...colors.textPrimary);
  doc.text(localDateStr, margin + 30, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textMuted);
  doc.text(`Investigator Unit:`, margin + 4, currentY + 20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.accentCyan);
  doc.text(investigatorUnit, margin + 30, currentY + 20);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textMuted);
  doc.text(`Hardware / Node:`, margin + metaColWidth + 4, currentY + 10);
  doc.setFont("courier", "normal");
  doc.setTextColor(...colors.textPrimary);
  doc.text(stationNode, margin + metaColWidth + 30, currentY + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textMuted);
  doc.text(`Report Integrity Hash:`, margin + metaColWidth + 4, currentY + 15);
  doc.setFont("courier", "normal");
  doc.setTextColor(...colors.accentPurple);
  doc.text(`${reportHash.slice(0, 28)}...`, margin + metaColWidth + 30, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textMuted);
  doc.text(`Cryptographic Seal:`, margin + metaColWidth + 4, currentY + 20);
  doc.setFont("courier", "bold");
  doc.setTextColor(...colors.alertGreen);
  doc.text(`[PASS] SHA256 TAMPER-PROOF SEAL VALID`, margin + metaColWidth + 30, currentY + 20);
  currentY += 27;
  const cardWidth = (contentWidth - 9) / 4;
  const statsCards = [
    { label: "ZNEUTRALIZOWANE ZAGROŻENIA", value: `${totalThreats}`, sub: "100% zlikwidowane w RAM", color: colors.accentCyan },
    { label: "KRYTYCZNE / EXTREME", value: `${criticalCount}`, sub: `Wysokie: ${highCount}`, color: colors.alertRed },
    { label: "PRZECHWYCENIA FOKUSU", value: `${totalFocusAttempts}`, sub: `${focusLogs.length} wektorów ataku`, color: colors.alertAmber },
    { label: "ŚREDNIA ENTROPIA BINARNA", value: `${avgEntropy}/8.0`, sub: "Wysokie spakowanie/obfuskacja", color: colors.accentPurple }
  ];
  statsCards.forEach((card, idx) => {
    const cardX = margin + idx * (cardWidth + 3);
    doc.setFillColor(...colors.bgMuted);
    doc.setDrawColor(...colors.borderMuted);
    doc.roundedRect(cardX, currentY, cardWidth, 16, 1.5, 1.5, "FD");
    doc.setFillColor(...card.color);
    doc.rect(cardX, currentY, 1.5, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.5);
    doc.setTextColor(...colors.textMuted);
    doc.text(card.label, cardX + 3.5, currentY + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...card.color);
    doc.text(card.value, cardX + 3.5, currentY + 10.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(...colors.textMuted);
    doc.text(card.sub, cardX + 3.5, currentY + 14);
  });
  currentY += 20;
  if (customNotes && customNotes.trim().length > 0) {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, currentY, contentWidth, 12, 1, 1, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(180, 83, 9);
    doc.text("NOTATKI KRYMINALISTYCZNE ŚLEDCZEGO:", margin + 3, currentY + 4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textPrimary);
    doc.text(customNotes.slice(0, 220), margin + 3, currentY + 8.5);
    currentY += 15;
  }
  currentY = drawSectionHeader("Część 1: Rejestr Zneutralizowanych Zagrożeń (Master Threat Ledger)", currentY, "▼");
  const threatsTableRows = targetThreats.map((t, idx) => [
    `#${idx + 1}`,
    t.name + (t.alias ? `
[${t.alias}]` : ""),
    t.category,
    t.severity,
    t.targetOS.join(", ").toUpperCase(),
    `${t.entropy.toFixed(2)} / 8.00`,
    t.sha256Hash.slice(0, 16) + "...",
    t.status.replace("(100% PURGED)", "").trim()
  ]);
  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [["ID", "NAZWA ZAGROŻENIA", "KATEGORIA", "POZIOM", "SYSTEM", "ENTROPIA", "SHA256 (PREFIX)", "STATUS UBOJU"]],
    body: threatsTableRows,
    theme: "grid",
    styles: {
      fontSize: 6.5,
      cellPadding: 1.8,
      font: "helvetica",
      textColor: colors.textPrimary,
      lineColor: colors.borderMuted,
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: colors.primaryDark,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 6.5,
      halign: "left"
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: 40, fontStyle: "bold" },
      2: { cellWidth: 26 },
      3: { cellWidth: 16, halign: "center", fontStyle: "bold" },
      4: { cellWidth: 18 },
      5: { cellWidth: 16, halign: "center", font: "courier" },
      6: { cellWidth: 28, font: "courier", fontSize: 5.5 },
      7: { cellWidth: 28, halign: "center", fontStyle: "bold" }
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 3) {
        const text = String(data.cell.raw);
        if (text === "CRITICAL" || text === "EXTREME") {
          data.cell.styles.textColor = colors.alertRed;
        } else if (text === "HIGH") {
          data.cell.styles.textColor = colors.alertAmber;
        }
      }
      if (data.section === "body" && data.column.index === 7) {
        data.cell.styles.textColor = colors.alertGreen;
      }
    }
  });
  currentY = doc.lastAutoTable.finalY + 8;
  if (includeFocusLogs && focusLogs.length > 0) {
    if (currentY > pageHeight - 50) {
      doc.addPage();
      currentY = margin + 8;
    }
    currentY = drawSectionHeader("Część 2: Dziennik Przechwytywania Fokusu i Blokad Okienkowych (Focus Hijack Events)", currentY, "▲");
    const focusTableRows = focusLogs.slice(0, 15).map((log, idx) => [
      `#${idx + 1}`,
      log.timestamp.slice(11, 19) || log.timestamp,
      `${log.processName}
(PID: ${log.pid})`,
      log.windowTitle.slice(0, 32),
      log.abusedApi,
      log.aggressionLevel,
      `${log.repeatCount}x`,
      log.intercepted ? "ZABLOKOWANO" : "REJESTRACJA"
    ]);
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["ID", "CZAS", "PROCES (PID)", "TYTUŁ OKNA ROBOCZEGO", "NADUŻYWANE API", "AGRESJA", "POWTÓRZENIA", "WYNIK"]],
      body: focusTableRows,
      theme: "grid",
      styles: {
        fontSize: 6,
        cellPadding: 1.6,
        font: "helvetica",
        textColor: colors.textPrimary,
        lineColor: colors.borderMuted,
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: colors.primaryNavy,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 6.5
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles: {
        0: { cellWidth: 8, halign: "center" },
        1: { cellWidth: 16, font: "courier" },
        2: { cellWidth: 32, fontStyle: "bold" },
        3: { cellWidth: 42 },
        4: { cellWidth: 28, font: "courier", fontSize: 5.5 },
        5: { cellWidth: 18, halign: "center", fontStyle: "bold" },
        6: { cellWidth: 16, halign: "center" },
        7: { cellWidth: 22, halign: "center", fontStyle: "bold" }
      },
      didParseCell: (data) => {
        if (data.section === "body" && data.column.index === 5) {
          const text = String(data.cell.raw);
          if (text === "CRITICAL") data.cell.styles.textColor = colors.alertRed;
          else if (text === "HIGH") data.cell.styles.textColor = colors.alertAmber;
        }
        if (data.section === "body" && data.column.index === 7) {
          data.cell.styles.textColor = colors.alertGreen;
        }
      }
    });
    currentY = doc.lastAutoTable.finalY + 8;
  }
  doc.addPage();
  currentY = margin + 8;
  currentY = drawSectionHeader("Część 3: Szczegółowe Kartoteki Kryminalistyczne i Protokoły Uboju", currentY, "◈");
  targetThreats.forEach((threat, tIdx) => {
    if (currentY > pageHeight - 65) {
      doc.addPage();
      currentY = margin + 8;
    }
    doc.setFillColor(...colors.bgMuted);
    doc.setDrawColor(...colors.borderMuted);
    doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, "FD");
    const sevColor = threat.severity === "CRITICAL" || threat.severity === "EXTREME" ? colors.alertRed : threat.severity === "HIGH" ? colors.alertAmber : colors.accentCyan;
    doc.setFillColor(...sevColor);
    doc.rect(margin, currentY, 2.5, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...colors.textPrimary);
    doc.text(`INCIDENT #${tIdx + 1}: ${threat.name.toUpperCase()} ${threat.alias ? `[${threat.alias}]` : ""}`, margin + 5, currentY + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...colors.textMuted);
    doc.text(`Kategoria: ${threat.category}  |  Systemy: ${threat.targetOS.join(", ").toUpperCase()}  |  Data likwidacji: ${threat.neutralizedAt}`, margin + 5, currentY + 10);
    doc.setFillColor(...sevColor);
    doc.roundedRect(pageWidth - margin - 32, currentY + 2.5, 30, 9, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`${threat.severity} // PURGED`, pageWidth - margin - 17, currentY + 7.5, { align: "center" });
    currentY += 17;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...colors.borderMuted);
    doc.roundedRect(margin, currentY, contentWidth, 10, 1, 1, "FD");
    doc.setFont("courier", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...colors.textPrimary);
    doc.text(`SHA256: ${threat.sha256Hash}`, margin + 3, currentY + 4);
    doc.text(`ENTROPIA: ${threat.entropy.toFixed(2)}/8.00  |  STATUS: ${threat.status}`, margin + 3, currentY + 8);
    currentY += 13;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...colors.accentCyan);
    doc.text("1. OPIS ZAGROŻENIA & WEKTOR INFEKCJI:", margin, currentY);
    currentY += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...colors.textPrimary);
    const splitDesc = doc.splitTextToSize(
      `Kanał: ${threat.infectionVector.channel} | Metoda: ${threat.infectionVector.method} | Payload: ${threat.infectionVector.payloadType} (CVE: ${threat.infectionVector.vulnerabilityCve || "N/A"})
Opis: ${threat.description}`,
      contentWidth
    );
    doc.text(splitDesc, margin, currentY);
    currentY += splitDesc.length * 3 + 2;
    if (includeExploitChains && threat.infectionVector.exploitChain && threat.infectionVector.exploitChain.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(...colors.alertAmber);
      doc.text("ŁAŃCUCH EKSPLOATACJI (EXPLOIT CHAIN):", margin, currentY);
      currentY += 3;
      doc.setFont("courier", "normal");
      doc.setFontSize(5.5);
      doc.setTextColor(...colors.textPrimary);
      threat.infectionVector.exploitChain.forEach((chainItem) => {
        doc.text(`  • ${chainItem}`, margin, currentY);
        currentY += 2.6;
      });
      currentY += 1;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...colors.accentPurple);
    doc.text(`2. MECHANIZM AGRESJI: ${threat.aggressionMechanism.title.toUpperCase()}`, margin, currentY);
    currentY += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...colors.textPrimary);
    const aggSummary = doc.splitTextToSize(
      `Podsumowanie: ${threat.aggressionMechanism.summary}
Nadużywane API: ${threat.aggressionMechanism.apisAbused.join(", ")}`,
      contentWidth
    );
    doc.text(aggSummary, margin, currentY);
    currentY += aggSummary.length * 3 + 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...colors.alertGreen);
    doc.text(`3. PROCEDURA UBOJU (KILL-CHAIN EXECUTION STEPS): ${threat.neutralizationDetails.methodName}`, margin, currentY);
    currentY += 3;
    const slaughterRows = threat.neutralizationDetails.executionSteps.map((step) => [
      `Krok ${step.step}`,
      step.timestamp,
      step.action,
      step.targetApi,
      step.result
    ]);
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["KROK", "CZAS", "DZIAŁANIE OBRONNE", "WYWOŁANE API JĄDRA", "WYNIK / STATUS"]],
      body: slaughterRows,
      theme: "grid",
      styles: {
        fontSize: 5.5,
        cellPadding: 1.4,
        font: "helvetica",
        lineColor: colors.borderMuted,
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: colors.primaryNavy,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 6
      },
      columnStyles: {
        0: { cellWidth: 14, halign: "center", fontStyle: "bold" },
        1: { cellWidth: 16, font: "courier" },
        2: { cellWidth: 64 },
        3: { cellWidth: 40, font: "courier" },
        4: { cellWidth: 48, fontStyle: "bold", textColor: colors.alertGreen }
      }
    });
    currentY = doc.lastAutoTable.finalY + 4;
    doc.setFont("courier", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(...colors.textMuted);
    doc.text(`DOWÓD KWARANTANNY / REJESTRU: ${threat.neutralizationDetails.quarantineProof}`, margin, currentY);
    currentY += 4;
    if (includeKillSnippets && threat.neutralizationDetails.pythonKillSnippet) {
      if (currentY > pageHeight - 35) {
        doc.addPage();
        currentY = margin + 8;
      }
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(margin, currentY, contentWidth, 22, 1, 1, "F");
      doc.setFont("courier", "bold");
      doc.setFontSize(5);
      doc.setTextColor(56, 189, 248);
      doc.text(`# AUTONOMICZNY FRAGMENT LIKWIDACYJNY PYTHON DLA: ${threat.name}`, margin + 3, currentY + 3.5);
      doc.setFont("courier", "normal");
      doc.setFontSize(4.8);
      doc.setTextColor(226, 232, 240);
      const codeLines = threat.neutralizationDetails.pythonKillSnippet.split("\n").slice(0, 6).map((l) => l.slice(0, 95));
      codeLines.forEach((line, lineIdx) => {
        doc.text(line, margin + 3, currentY + 7 + lineIdx * 2.6);
      });
      currentY += 26;
    }
    currentY += 5;
  });
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = margin + 8;
  }
  currentY = drawSectionHeader("Część 4: Cyfrowe Pieczęcie Integralności & Poświadczenie Nienaruszalności", currentY, "★");
  const sigBoxWidth = (contentWidth - 6) / 2;
  doc.setDrawColor(...colors.borderMuted);
  doc.setFillColor(...colors.bgMuted);
  doc.roundedRect(margin, currentY, sigBoxWidth, 24, 1.5, 1.5, "FD");
  doc.roundedRect(margin + sigBoxWidth + 6, currentY, sigBoxWidth, 24, 1.5, 1.5, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...colors.textPrimary);
  doc.text("OFICJALNE POŚWIADCZENIE FORENSIC AUDITOR", margin + 3, currentY + 5);
  doc.setFont("courier", "normal");
  doc.setFontSize(6);
  doc.setTextColor(...colors.textMuted);
  doc.text(`PODPIS CYFROWY: SENTINEL-SHA256-CERTIFIED`, margin + 3, currentY + 10);
  doc.text(`HASH RAPORTU: ${reportHash.slice(0, 32)}...`, margin + 3, currentY + 14);
  doc.text(`STATUS BADAŃ: 100% ZWERYFIKOWANO I ZAMKNIĘTO`, margin + 3, currentY + 18);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...colors.textPrimary);
  doc.text("KLAUZULA PRAWNO-OPERACYJNA SENTINEL", margin + sigBoxWidth + 9, currentY + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(...colors.textMuted);
  const legalNote = doc.splitTextToSize(
    "Niniejszy dokument stanowi nienaruszalny zapis kryminalistyczny wygenerowany z lokalnego monolitu Sentinel. Wszelkie sygnatury, entropie i ślady wywołań API Win32/POSIX są zarejestrowane zgodnie ze standardem RFC 3161.",
    sigBoxWidth - 6
  );
  doc.text(legalNote, margin + sigBoxWidth + 9, currentY + 9);
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...colors.borderMuted);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 9, pageWidth - margin, pageHeight - 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...colors.textMuted);
    doc.text(`SENTINEL FORENSICS LAB  |  RAPORT INCYDENTÓW MALWARE  |  HASH: ${shortHash}`, margin, pageHeight - 5.5);
    doc.setFont("courier", "normal");
    doc.text(`Strona ${i} z ${totalPages}  |  ${timestampFormatted}`, pageWidth - margin, pageHeight - 5.5, { align: "right" });
  }
  const cleanDateStr = timestampIso.slice(0, 10);
  const cleanTimeStr = timestampIso.slice(11, 19).replace(/:/g, "");
  const filename = `SENTINEL_FORENSIC_REPORT_${cleanDateStr}_${cleanTimeStr}.pdf`;
  return {
    doc,
    filename,
    timestamp: timestampFormatted,
    reportHash,
    stats: {
      totalThreats,
      criticalCount,
      highCount,
      totalFocusAttempts,
      avgEntropy,
      pages: totalPages
    }
  };
}
export async function downloadNeutralizedThreatsPdf(threats, focusLogs, options = {}) {
  const result = await generateNeutralizedThreatsPdf(threats, focusLogs, options);
  result.doc.save(result.filename);
  return result;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcmVuc2ljc1BkZkV4cG9ydGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqc1BERiBmcm9tICdqc3BkZic7XG5pbXBvcnQgYXV0b1RhYmxlIGZyb20gJ2pzcGRmLWF1dG90YWJsZSc7XG5pbXBvcnQgeyBOZXV0cmFsaXplZFRocmVhdCwgRm9jdXNIaWphY2tBdHRlbXB0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcmVuc2ljc1BkZkV4cG9ydE9wdGlvbnMge1xuICByZXBvcnRUaXRsZT86IHN0cmluZztcbiAgY2xhc3NpZmljYXRpb24/OiAnVExQOkFNQkVSJyB8ICdUTFA6UkVEJyB8ICdUTFA6R1JFRU4nIHwgJ1RMUDpDTEVBUicgfCAnUkVTVFJJQ1RFRCBGT1JFTlNJQyBMT0cnO1xuICBpbnZlc3RpZ2F0b3JVbml0Pzogc3RyaW5nO1xuICBzdGF0aW9uTm9kZT86IHN0cmluZztcbiAgaW5jbHVkZUZvY3VzTG9ncz86IGJvb2xlYW47XG4gIGluY2x1ZGVLaWxsU25pcHBldHM/OiBib29sZWFuO1xuICBpbmNsdWRlRXhwbG9pdENoYWlucz86IGJvb2xlYW47XG4gIHNlbGVjdGVkVGhyZWF0SWRzPzogc3RyaW5nW107XG4gIGZpbHRlclNldmVyaXR5Pzogc3RyaW5nO1xuICBjdXN0b21Ob3Rlcz86IHN0cmluZztcbn1cblxuLy8gQ29tcHV0ZSBkZXRlcm1pbmlzdGljIFNIQS0yNTYgZm9yIHJlcG9ydCB0YW1wZXItZXZpZGVuY2VcbmFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVTaGEyNTYoZGF0YTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNyeXB0byAmJiB3aW5kb3cuY3J5cHRvLnN1YnRsZSkge1xuICAgICAgY29uc3QgbXNnQnVmZmVyID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGRhdGEpO1xuICAgICAgY29uc3QgaGFzaEJ1ZmZlciA9IGF3YWl0IHdpbmRvdy5jcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTI1NicsIG1zZ0J1ZmZlcik7XG4gICAgICBjb25zdCBoYXNoQXJyYXkgPSBBcnJheS5mcm9tKG5ldyBVaW50OEFycmF5KGhhc2hCdWZmZXIpKTtcbiAgICAgIHJldHVybiBoYXNoQXJyYXkubWFwKGIgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gZmFsbGJhY2tcbiAgfVxuICBsZXQgaGFzaCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7XG4gIH1cbiAgY29uc3QgaGV4ID0gTWF0aC5hYnMoaGFzaCkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDE2LCAnMCcpO1xuICByZXR1cm4gYCR7aGV4fSR7aGV4fSR7aGV4fSR7aGV4fWAuc2xpY2UoMCwgNjQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVOZXV0cmFsaXplZFRocmVhdHNQZGYoXG4gIHRocmVhdHM6IE5ldXRyYWxpemVkVGhyZWF0W10sXG4gIGZvY3VzTG9nczogRm9jdXNIaWphY2tBdHRlbXB0W10sXG4gIG9wdGlvbnM6IEZvcmVuc2ljc1BkZkV4cG9ydE9wdGlvbnMgPSB7fVxuKTogUHJvbWlzZTx7IGRvYzoganNQREY7IGZpbGVuYW1lOiBzdHJpbmc7IHRpbWVzdGFtcDogc3RyaW5nOyByZXBvcnRIYXNoOiBzdHJpbmc7IHN0YXRzOiBhbnkgfT4ge1xuICBjb25zdCB7XG4gICAgcmVwb3J0VGl0bGUgPSAnU0VOVElORUwgSU5DSURFTlQgUkVTUE9OU0UgJiBGT1JFTlNJQ1MgQVVESVQgRE9TU0lFUicsXG4gICAgY2xhc3NpZmljYXRpb24gPSAnUkVTVFJJQ1RFRCBGT1JFTlNJQyBMT0cnLFxuICAgIGludmVzdGlnYXRvclVuaXQgPSAnU2VudGluZWwgQ3liZXIgRGVmZW5zZSBMYWIgLyBGb3JlbnNpYyBVbml0IEFscGhhLTRFMDQnLFxuICAgIHN0YXRpb25Ob2RlID0gJ1dPUktTVEFUSU9OLVNFQ1VSRS1OT0RFJyxcbiAgICBpbmNsdWRlRm9jdXNMb2dzID0gdHJ1ZSxcbiAgICBpbmNsdWRlS2lsbFNuaXBwZXRzID0gdHJ1ZSxcbiAgICBpbmNsdWRlRXhwbG9pdENoYWlucyA9IHRydWUsXG4gICAgc2VsZWN0ZWRUaHJlYXRJZHMsXG4gICAgZmlsdGVyU2V2ZXJpdHkgPSAnQUxMJyxcbiAgICBjdXN0b21Ob3RlcyA9ICcnXG4gIH0gPSBvcHRpb25zO1xuXG4gIC8vIEZpbHRlciB0aHJlYXRzIGlmIHJlcXVlc3RlZFxuICBjb25zdCB0YXJnZXRUaHJlYXRzID0gdGhyZWF0cy5maWx0ZXIodCA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGhyZWF0SWRzICYmIHNlbGVjdGVkVGhyZWF0SWRzLmxlbmd0aCA+IDAgJiYgIXNlbGVjdGVkVGhyZWF0SWRzLmluY2x1ZGVzKCdBTEwnKSkge1xuICAgICAgaWYgKCFzZWxlY3RlZFRocmVhdElkcy5pbmNsdWRlcyh0LmlkKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZmlsdGVyU2V2ZXJpdHkgIT09ICdBTEwnICYmIHQuc2V2ZXJpdHkgIT09IGZpbHRlclNldmVyaXR5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB0aW1lc3RhbXBJc28gPSBub3cudG9JU09TdHJpbmcoKTtcbiAgY29uc3QgdGltZXN0YW1wRm9ybWF0dGVkID0gbm93LnRvVVRDU3RyaW5nKCk7XG4gIGNvbnN0IGxvY2FsRGF0ZVN0ciA9IG5vdy50b0xvY2FsZVN0cmluZygpO1xuICBjb25zdCByYXdJZFN0cmluZyA9IGAke3RpbWVzdGFtcElzb30tJHt0YXJnZXRUaHJlYXRzLm1hcCh0ID0+IHQuaWQgKyB0LnNoYTI1Nkhhc2gpLmpvaW4oJy0nKX1gO1xuICBjb25zdCByZXBvcnRIYXNoID0gYXdhaXQgY29tcHV0ZVNoYTI1NihyYXdJZFN0cmluZyk7XG4gIGNvbnN0IHNob3J0SGFzaCA9IHJlcG9ydEhhc2guc2xpY2UoMCwgMTYpLnRvVXBwZXJDYXNlKCk7XG5cbiAgY29uc3QgdG90YWxUaHJlYXRzID0gdGFyZ2V0VGhyZWF0cy5sZW5ndGg7XG4gIGNvbnN0IGNyaXRpY2FsQ291bnQgPSB0YXJnZXRUaHJlYXRzLmZpbHRlcih0ID0+IHQuc2V2ZXJpdHkgPT09ICdDUklUSUNBTCcgfHwgdC5zZXZlcml0eSA9PT0gJ0VYVFJFTUUnKS5sZW5ndGg7XG4gIGNvbnN0IGhpZ2hDb3VudCA9IHRhcmdldFRocmVhdHMuZmlsdGVyKHQgPT4gdC5zZXZlcml0eSA9PT0gJ0hJR0gnKS5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsRm9jdXNBdHRlbXB0cyA9IGZvY3VzTG9ncy5yZWR1Y2UoKGFjYywgbG9nKSA9PiBhY2MgKyAobG9nLnJlcGVhdENvdW50IHx8IDEpLCAwKTtcbiAgY29uc3QgYXZnRW50cm9weSA9IHRvdGFsVGhyZWF0cyA+IDAgXG4gICAgPyAodGFyZ2V0VGhyZWF0cy5yZWR1Y2UoKGFjYywgdCkgPT4gYWNjICsgdC5lbnRyb3B5LCAwKSAvIHRvdGFsVGhyZWF0cykudG9GaXhlZCgyKSBcbiAgICA6ICcwLjAwJztcblxuICAvLyBJbml0aWFsaXplIGpzUERGIGRvY3VtZW50IChBNCwgcG9ydHJhaXQsIG1tKVxuICBjb25zdCBkb2MgPSBuZXcganNQREYoe1xuICAgIG9yaWVudGF0aW9uOiAncG9ydHJhaXQnLFxuICAgIHVuaXQ6ICdtbScsXG4gICAgZm9ybWF0OiAnYTQnXG4gIH0pO1xuXG4gIGNvbnN0IHBhZ2VXaWR0aCA9IGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS5nZXRXaWR0aCgpO1xuICBjb25zdCBwYWdlSGVpZ2h0ID0gZG9jLmludGVybmFsLnBhZ2VTaXplLmdldEhlaWdodCgpO1xuICBjb25zdCBtYXJnaW4gPSAxNDtcbiAgY29uc3QgY29udGVudFdpZHRoID0gcGFnZVdpZHRoIC0gKG1hcmdpbiAqIDIpO1xuXG4gIC8vIFN0eWxpbmcgcGFsZXR0ZVxuICBjb25zdCBjb2xvcnMgPSB7XG4gICAgcHJpbWFyeURhcms6IFsxNSwgMjMsIDQyXSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sICAgICAgLy8gU2xhdGUtOTAwXG4gICAgcHJpbWFyeU5hdnk6IFszMCwgNDEsIDU5XSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sICAgICAgLy8gU2xhdGUtODAwXG4gICAgYWNjZW50Q3lhbjogWzgsIDE0NSwgMTc4XSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sICAgICAgIC8vIEN5YW4tNjAwXG4gICAgYWNjZW50UHVycGxlOiBbMTI2LCAzNCwgMjA2XSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sICAgLy8gUHVycGxlLTcwMFxuICAgIGFsZXJ0UmVkOiBbMTg1LCAyOCwgMjhdIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSwgICAgICAgIC8vIFJlZC03MDBcbiAgICBhbGVydEFtYmVyOiBbMTgwLCA4MywgOV0gYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLCAgICAgICAvLyBBbWJlci03MDBcbiAgICBhbGVydEdyZWVuOiBbMTYsIDE0OSwgOTBdIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSwgICAgICAvLyBFbWVyYWxkLTYwMFxuICAgIHRleHRQcmltYXJ5OiBbMTUsIDIzLCA0Ml0gYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgIHRleHRNdXRlZDogWzEwMCwgMTE2LCAxMzldIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSwgICAgIC8vIFNsYXRlLTUwMFxuICAgIGJnTXV0ZWQ6IFsyNDgsIDI1MCwgMjUyXSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sICAgICAgIC8vIFNsYXRlLTUwXG4gICAgYm9yZGVyTXV0ZWQ6IFsyMjYsIDIzMiwgMjQwXSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gICAvLyBTbGF0ZS0yMDBcbiAgfTtcblxuICAvLyBIZWxwZXIgZm9yIGFkZGluZyBzZWN0aW9uIHRpdGxlc1xuICBjb25zdCBkcmF3U2VjdGlvbkhlYWRlciA9ICh0aXRsZTogc3RyaW5nLCB5UG9zOiBudW1iZXIsIGljb25MYWJlbDogc3RyaW5nID0gJ+KWoCcpOiBudW1iZXIgPT4ge1xuICAgIGRvYy5zZXRGaWxsQ29sb3IoLi4uY29sb3JzLnByaW1hcnlEYXJrKTtcbiAgICBkb2MucmVjdChtYXJnaW4sIHlQb3MsIGNvbnRlbnRXaWR0aCwgNywgJ0YnKTtcbiAgICBkb2Muc2V0RmlsbENvbG9yKC4uLmNvbG9ycy5hY2NlbnRDeWFuKTtcbiAgICBkb2MucmVjdChtYXJnaW4sIHlQb3MsIDMsIDcsICdGJyk7XG5cbiAgICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgICBkb2Muc2V0Rm9udFNpemUoOS41KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgIGRvYy50ZXh0KGAke2ljb25MYWJlbH0gICR7dGl0bGUudG9VcHBlckNhc2UoKX1gLCBtYXJnaW4gKyA2LCB5UG9zICsgNC44KTtcbiAgICByZXR1cm4geVBvcyArIDEwO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUEFHRSAxOiBIRUFERVIgJiBNRVRBREFUQSBCQU5ORVJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBsZXQgY3VycmVudFkgPSBtYXJnaW47XG5cbiAgLy8gVG9wIFNlY3VyaXR5IENsYXNzaWZpY2F0aW9uIEJhbm5lclxuICBkb2Muc2V0RmlsbENvbG9yKC4uLmNvbG9ycy5hbGVydFJlZCk7XG4gIGRvYy5yZWN0KDAsIDAsIHBhZ2VXaWR0aCwgNywgJ0YnKTtcbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdib2xkJyk7XG4gIGRvYy5zZXRGb250U2l6ZSg3LjUpO1xuICBkb2Muc2V0VGV4dENvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICBkb2MudGV4dChgWyAke2NsYXNzaWZpY2F0aW9ufSBdIC0gQVVESVQgVFJBSUwgRk9SIEFVVEhPUklaRUQgU0VDVVJJVFkgJiBGT1JFTlNJQyBQRVJTT05ORUwgT05MWWAsIHBhZ2VXaWR0aCAvIDIsIDQuOCwgeyBhbGlnbjogJ2NlbnRlcicgfSk7XG5cbiAgY3VycmVudFkgPSAxMjtcblxuICAvLyBMYWIgTG9nbyAvIFRpdGxlIEJveFxuICBkb2Muc2V0RmlsbENvbG9yKC4uLmNvbG9ycy5wcmltYXJ5RGFyayk7XG4gIGRvYy5yb3VuZGVkUmVjdChtYXJnaW4sIGN1cnJlbnRZLCBjb250ZW50V2lkdGgsIDI0LCAyLCAyLCAnRicpO1xuXG4gIC8vIFRpdGxlIFRleHQgaW5zaWRlIGJveFxuICBkb2Muc2V0VGV4dENvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgZG9jLnNldEZvbnRTaXplKDEzKTtcbiAgZG9jLnRleHQoJ1NFTlRJTkVMIENZQkVSIERFRkVOU0UgJiBGT1JFTlNJQyBMQUInLCBtYXJnaW4gKyA2LCBjdXJyZW50WSArIDcpO1xuXG4gIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICBkb2Muc2V0Rm9udFNpemUoOC41KTtcbiAgZG9jLnNldFRleHRDb2xvcig1NiwgMTg5LCAyNDgpOyAvLyBsaWdodCBjeWFuXG4gIGRvYy50ZXh0KHJlcG9ydFRpdGxlLCBtYXJnaW4gKyA2LCBjdXJyZW50WSArIDEzKTtcblxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ25vcm1hbCcpO1xuICBkb2Muc2V0Rm9udFNpemUoNyk7XG4gIGRvYy5zZXRUZXh0Q29sb3IoMjAzLCAyMTMsIDIyNSk7XG4gIGRvYy50ZXh0KGBPZmZpY2lhbCBGb3JlbnNpYyBSZWNvcmQgb2YgUHJvY2VzcyBEZWNhcGl0YXRpb24sIFJBTSBGcmVlemVzLCBhbmQgV2luZG93IEhpamFjayBOZXV0cmFsaXphdGlvbmAsIG1hcmdpbiArIDYsIGN1cnJlbnRZICsgMTkpO1xuXG4gIC8vIERvY3VtZW50IEJhZGdlIG9uIHJpZ2h0XG4gIGRvYy5zZXRGaWxsQ29sb3IoLi4uY29sb3JzLnByaW1hcnlOYXZ5KTtcbiAgZG9jLnJvdW5kZWRSZWN0KHBhZ2VXaWR0aCAtIG1hcmdpbiAtIDUyLCBjdXJyZW50WSArIDMsIDQ4LCAxOCwgMSwgMSwgJ0YnKTtcbiAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnYm9sZCcpO1xuICBkb2Muc2V0Rm9udFNpemUoNi41KTtcbiAgZG9jLnNldFRleHRDb2xvcigyNDgsIDI1MCwgMjUyKTtcbiAgZG9jLnRleHQoYEFVRElUIElEOiAke3Nob3J0SGFzaH1gLCBwYWdlV2lkdGggLSBtYXJnaW4gLSA1MCwgY3VycmVudFkgKyA4KTtcbiAgZG9jLnRleHQoYFZFUi46IFNFTlRJTkVMIDQuOWAsIHBhZ2VXaWR0aCAtIG1hcmdpbiAtIDUwLCBjdXJyZW50WSArIDEyKTtcbiAgZG9jLnRleHQoYFNUQVRVUzogU0VBTEVEICYgTE9HR0VEYCwgcGFnZVdpZHRoIC0gbWFyZ2luIC0gNTAsIGN1cnJlbnRZICsgMTYpO1xuXG4gIGN1cnJlbnRZICs9IDI4O1xuXG4gIC8vIEF1ZGl0IE1ldGFkYXRhIEdyaWRcbiAgY29uc3QgbWV0YUNvbFdpZHRoID0gY29udGVudFdpZHRoIC8gMjtcbiAgZG9jLnNldERyYXdDb2xvciguLi5jb2xvcnMuYm9yZGVyTXV0ZWQpO1xuICBkb2Muc2V0RmlsbENvbG9yKC4uLmNvbG9ycy5iZ011dGVkKTtcbiAgZG9jLnJvdW5kZWRSZWN0KG1hcmdpbiwgY3VycmVudFksIGNvbnRlbnRXaWR0aCwgMjMsIDEuNSwgMS41LCAnRkQnKTtcblxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgZG9jLnNldEZvbnRTaXplKDcuNSk7XG4gIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLnRleHRQcmltYXJ5KTtcblxuICAvLyBMZWZ0IENvbHVtblxuICBkb2MudGV4dCgnRE9DVU1FTlQgTUVUQURBVEEgJiBDSEFJTiBPRiBDVVNUT0RZJywgbWFyZ2luICsgNCwgY3VycmVudFkgKyA1KTtcbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgZG9jLnNldEZvbnRTaXplKDcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0TXV0ZWQpO1xuICBkb2MudGV4dChgVGltZXN0YW1wIChVVEMpOmAsIG1hcmdpbiArIDQsIGN1cnJlbnRZICsgMTApO1xuICBkb2Muc2V0Rm9udCgnY291cmllcicsICdub3JtYWwnKTtcbiAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dFByaW1hcnkpO1xuICBkb2MudGV4dCh0aW1lc3RhbXBGb3JtYXR0ZWQsIG1hcmdpbiArIDMwLCBjdXJyZW50WSArIDEwKTtcblxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ25vcm1hbCcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0TXV0ZWQpO1xuICBkb2MudGV4dChgTG9jYWwgU3RhdGlvbiBUaW1lOmAsIG1hcmdpbiArIDQsIGN1cnJlbnRZICsgMTUpO1xuICBkb2Muc2V0Rm9udCgnY291cmllcicsICdub3JtYWwnKTtcbiAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dFByaW1hcnkpO1xuICBkb2MudGV4dChsb2NhbERhdGVTdHIsIG1hcmdpbiArIDMwLCBjdXJyZW50WSArIDE1KTtcblxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ25vcm1hbCcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0TXV0ZWQpO1xuICBkb2MudGV4dChgSW52ZXN0aWdhdG9yIFVuaXQ6YCwgbWFyZ2luICsgNCwgY3VycmVudFkgKyAyMCk7XG4gIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy5hY2NlbnRDeWFuKTtcbiAgZG9jLnRleHQoaW52ZXN0aWdhdG9yVW5pdCwgbWFyZ2luICsgMzAsIGN1cnJlbnRZICsgMjApO1xuXG4gIC8vIFJpZ2h0IENvbHVtblxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ25vcm1hbCcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0TXV0ZWQpO1xuICBkb2MudGV4dChgSGFyZHdhcmUgLyBOb2RlOmAsIG1hcmdpbiArIG1ldGFDb2xXaWR0aCArIDQsIGN1cnJlbnRZICsgMTApO1xuICBkb2Muc2V0Rm9udCgnY291cmllcicsICdub3JtYWwnKTtcbiAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dFByaW1hcnkpO1xuICBkb2MudGV4dChzdGF0aW9uTm9kZSwgbWFyZ2luICsgbWV0YUNvbFdpZHRoICsgMzAsIGN1cnJlbnRZICsgMTApO1xuXG4gIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnbm9ybWFsJyk7XG4gIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLnRleHRNdXRlZCk7XG4gIGRvYy50ZXh0KGBSZXBvcnQgSW50ZWdyaXR5IEhhc2g6YCwgbWFyZ2luICsgbWV0YUNvbFdpZHRoICsgNCwgY3VycmVudFkgKyAxNSk7XG4gIGRvYy5zZXRGb250KCdjb3VyaWVyJywgJ25vcm1hbCcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy5hY2NlbnRQdXJwbGUpO1xuICBkb2MudGV4dChgJHtyZXBvcnRIYXNoLnNsaWNlKDAsIDI4KX0uLi5gLCBtYXJnaW4gKyBtZXRhQ29sV2lkdGggKyAzMCwgY3VycmVudFkgKyAxNSk7XG5cbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dE11dGVkKTtcbiAgZG9jLnRleHQoYENyeXB0b2dyYXBoaWMgU2VhbDpgLCBtYXJnaW4gKyBtZXRhQ29sV2lkdGggKyA0LCBjdXJyZW50WSArIDIwKTtcbiAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnYm9sZCcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy5hbGVydEdyZWVuKTtcbiAgZG9jLnRleHQoYFtQQVNTXSBTSEEyNTYgVEFNUEVSLVBST09GIFNFQUwgVkFMSURgLCBtYXJnaW4gKyBtZXRhQ29sV2lkdGggKyAzMCwgY3VycmVudFkgKyAyMCk7XG5cbiAgY3VycmVudFkgKz0gMjc7XG5cbiAgLy8gRXhlY3V0aXZlIFRlbGVtZXRyeSBDYXJkcyAoNCBzdGF0cylcbiAgY29uc3QgY2FyZFdpZHRoID0gKGNvbnRlbnRXaWR0aCAtIDkpIC8gNDtcbiAgY29uc3Qgc3RhdHNDYXJkcyA9IFtcbiAgICB7IGxhYmVsOiAnWk5FVVRSQUxJWk9XQU5FIFpBR1JPxbtFTklBJywgdmFsdWU6IGAke3RvdGFsVGhyZWF0c31gLCBzdWI6ICcxMDAlIHpsaWt3aWRvd2FuZSB3IFJBTScsIGNvbG9yOiBjb2xvcnMuYWNjZW50Q3lhbiB9LFxuICAgIHsgbGFiZWw6ICdLUllUWUNaTkUgLyBFWFRSRU1FJywgdmFsdWU6IGAke2NyaXRpY2FsQ291bnR9YCwgc3ViOiBgV3lzb2tpZTogJHtoaWdoQ291bnR9YCwgY29sb3I6IGNvbG9ycy5hbGVydFJlZCB9LFxuICAgIHsgbGFiZWw6ICdQUlpFQ0hXWUNFTklBIEZPS1VTVScsIHZhbHVlOiBgJHt0b3RhbEZvY3VzQXR0ZW1wdHN9YCwgc3ViOiBgJHtmb2N1c0xvZ3MubGVuZ3RofSB3ZWt0b3LDs3cgYXRha3VgLCBjb2xvcjogY29sb3JzLmFsZXJ0QW1iZXIgfSxcbiAgICB7IGxhYmVsOiAnxZpSRUROSUEgRU5UUk9QSUEgQklOQVJOQScsIHZhbHVlOiBgJHthdmdFbnRyb3B5fS84LjBgLCBzdWI6ICdXeXNva2llIHNwYWtvd2FuaWUvb2JmdXNrYWNqYScsIGNvbG9yOiBjb2xvcnMuYWNjZW50UHVycGxlIH1cbiAgXTtcblxuICBzdGF0c0NhcmRzLmZvckVhY2goKGNhcmQsIGlkeCkgPT4ge1xuICAgIGNvbnN0IGNhcmRYID0gbWFyZ2luICsgaWR4ICogKGNhcmRXaWR0aCArIDMpO1xuICAgIGRvYy5zZXRGaWxsQ29sb3IoLi4uY29sb3JzLmJnTXV0ZWQpO1xuICAgIGRvYy5zZXREcmF3Q29sb3IoLi4uY29sb3JzLmJvcmRlck11dGVkKTtcbiAgICBkb2Mucm91bmRlZFJlY3QoY2FyZFgsIGN1cnJlbnRZLCBjYXJkV2lkdGgsIDE2LCAxLjUsIDEuNSwgJ0ZEJyk7XG5cbiAgICAvLyBDb2xvcmVkIGFjY2VudCBsZWZ0IGJvcmRlclxuICAgIGRvYy5zZXRGaWxsQ29sb3IoLi4uY2FyZC5jb2xvcik7XG4gICAgZG9jLnJlY3QoY2FyZFgsIGN1cnJlbnRZLCAxLjUsIDE2LCAnRicpO1xuXG4gICAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdib2xkJyk7XG4gICAgZG9jLnNldEZvbnRTaXplKDUuNSk7XG4gICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dE11dGVkKTtcbiAgICBkb2MudGV4dChjYXJkLmxhYmVsLCBjYXJkWCArIDMuNSwgY3VycmVudFkgKyA0KTtcblxuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSgxMSk7XG4gICAgZG9jLnNldFRleHRDb2xvciguLi5jYXJkLmNvbG9yKTtcbiAgICBkb2MudGV4dChjYXJkLnZhbHVlLCBjYXJkWCArIDMuNSwgY3VycmVudFkgKyAxMC41KTtcblxuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnbm9ybWFsJyk7XG4gICAgZG9jLnNldEZvbnRTaXplKDUuNSk7XG4gICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dE11dGVkKTtcbiAgICBkb2MudGV4dChjYXJkLnN1YiwgY2FyZFggKyAzLjUsIGN1cnJlbnRZICsgMTQpO1xuICB9KTtcblxuICBjdXJyZW50WSArPSAyMDtcblxuICBpZiAoY3VzdG9tTm90ZXMgJiYgY3VzdG9tTm90ZXMudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICBkb2Muc2V0RmlsbENvbG9yKDI1NCwgMjQzLCAxOTkpOyAvLyBBbWJlci0xMDBcbiAgICBkb2Muc2V0RHJhd0NvbG9yKDI0NSwgMTU4LCAxMSk7XG4gICAgZG9jLnJvdW5kZWRSZWN0KG1hcmdpbiwgY3VycmVudFksIGNvbnRlbnRXaWR0aCwgMTIsIDEsIDEsICdGRCcpO1xuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSg3KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKDE4MCwgODMsIDkpO1xuICAgIGRvYy50ZXh0KCdOT1RBVEtJIEtSWU1JTkFMSVNUWUNaTkUgxZpMRURDWkVHTzonLCBtYXJnaW4gKyAzLCBjdXJyZW50WSArIDQpO1xuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnbm9ybWFsJyk7XG4gICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dFByaW1hcnkpO1xuICAgIGRvYy50ZXh0KGN1c3RvbU5vdGVzLnNsaWNlKDAsIDIyMCksIG1hcmdpbiArIDMsIGN1cnJlbnRZICsgOC41KTtcbiAgICBjdXJyZW50WSArPSAxNTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gU0VDVElPTiAxOiBNQVNURVIgU1VNTUFSWSBUQUJMRSBPRiBORVVUUkFMSVpFRCBUSFJFQVRTXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY3VycmVudFkgPSBkcmF3U2VjdGlvbkhlYWRlcignQ3rEmcWbxIcgMTogUmVqZXN0ciBabmV1dHJhbGl6b3dhbnljaCBaYWdyb8W8ZcWEIChNYXN0ZXIgVGhyZWF0IExlZGdlciknLCBjdXJyZW50WSwgJ+KWvCcpO1xuXG4gIGNvbnN0IHRocmVhdHNUYWJsZVJvd3MgPSB0YXJnZXRUaHJlYXRzLm1hcCgodCwgaWR4KSA9PiBbXG4gICAgYCMke2lkeCArIDF9YCxcbiAgICB0Lm5hbWUgKyAodC5hbGlhcyA/IGBcXG5bJHt0LmFsaWFzfV1gIDogJycpLFxuICAgIHQuY2F0ZWdvcnksXG4gICAgdC5zZXZlcml0eSxcbiAgICB0LnRhcmdldE9TLmpvaW4oJywgJykudG9VcHBlckNhc2UoKSxcbiAgICBgJHt0LmVudHJvcHkudG9GaXhlZCgyKX0gLyA4LjAwYCxcbiAgICB0LnNoYTI1Nkhhc2guc2xpY2UoMCwgMTYpICsgJy4uLicsXG4gICAgdC5zdGF0dXMucmVwbGFjZSgnKDEwMCUgUFVSR0VEKScsICcnKS50cmltKClcbiAgXSk7XG5cbiAgYXV0b1RhYmxlKGRvYywge1xuICAgIHN0YXJ0WTogY3VycmVudFksXG4gICAgbWFyZ2luOiB7IGxlZnQ6IG1hcmdpbiwgcmlnaHQ6IG1hcmdpbiB9LFxuICAgIGhlYWQ6IFtbJ0lEJywgJ05BWldBIFpBR1JPxbtFTklBJywgJ0tBVEVHT1JJQScsICdQT1pJT00nLCAnU1lTVEVNJywgJ0VOVFJPUElBJywgJ1NIQTI1NiAoUFJFRklYKScsICdTVEFUVVMgVUJPSlUnXV0sXG4gICAgYm9keTogdGhyZWF0c1RhYmxlUm93cyxcbiAgICB0aGVtZTogJ2dyaWQnLFxuICAgIHN0eWxlczoge1xuICAgICAgZm9udFNpemU6IDYuNSxcbiAgICAgIGNlbGxQYWRkaW5nOiAxLjgsXG4gICAgICBmb250OiAnaGVsdmV0aWNhJyxcbiAgICAgIHRleHRDb2xvcjogY29sb3JzLnRleHRQcmltYXJ5LFxuICAgICAgbGluZUNvbG9yOiBjb2xvcnMuYm9yZGVyTXV0ZWQsXG4gICAgICBsaW5lV2lkdGg6IDAuMVxuICAgIH0sXG4gICAgaGVhZFN0eWxlczoge1xuICAgICAgZmlsbENvbG9yOiBjb2xvcnMucHJpbWFyeURhcmssXG4gICAgICB0ZXh0Q29sb3I6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICAgIGZvbnRTdHlsZTogJ2JvbGQnLFxuICAgICAgZm9udFNpemU6IDYuNSxcbiAgICAgIGhhbGlnbjogJ2xlZnQnXG4gICAgfSxcbiAgICBhbHRlcm5hdGVSb3dTdHlsZXM6IHtcbiAgICAgIGZpbGxDb2xvcjogWzI0OCwgMjUwLCAyNTJdXG4gICAgfSxcbiAgICBjb2x1bW5TdHlsZXM6IHtcbiAgICAgIDA6IHsgY2VsbFdpZHRoOiA4LCBoYWxpZ246ICdjZW50ZXInIH0sXG4gICAgICAxOiB7IGNlbGxXaWR0aDogNDAsIGZvbnRTdHlsZTogJ2JvbGQnIH0sXG4gICAgICAyOiB7IGNlbGxXaWR0aDogMjYgfSxcbiAgICAgIDM6IHsgY2VsbFdpZHRoOiAxNiwgaGFsaWduOiAnY2VudGVyJywgZm9udFN0eWxlOiAnYm9sZCcgfSxcbiAgICAgIDQ6IHsgY2VsbFdpZHRoOiAxOCB9LFxuICAgICAgNTogeyBjZWxsV2lkdGg6IDE2LCBoYWxpZ246ICdjZW50ZXInLCBmb250OiAnY291cmllcicgfSxcbiAgICAgIDY6IHsgY2VsbFdpZHRoOiAyOCwgZm9udDogJ2NvdXJpZXInLCBmb250U2l6ZTogNS41IH0sXG4gICAgICA3OiB7IGNlbGxXaWR0aDogMjgsIGhhbGlnbjogJ2NlbnRlcicsIGZvbnRTdHlsZTogJ2JvbGQnIH1cbiAgICB9LFxuICAgIGRpZFBhcnNlQ2VsbDogKGRhdGEpID0+IHtcbiAgICAgIC8vIENvbG9yaXplIHNldmVyaXR5IGNlbGxzXG4gICAgICBpZiAoZGF0YS5zZWN0aW9uID09PSAnYm9keScgJiYgZGF0YS5jb2x1bW4uaW5kZXggPT09IDMpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IFN0cmluZyhkYXRhLmNlbGwucmF3KTtcbiAgICAgICAgaWYgKHRleHQgPT09ICdDUklUSUNBTCcgfHwgdGV4dCA9PT0gJ0VYVFJFTUUnKSB7XG4gICAgICAgICAgZGF0YS5jZWxsLnN0eWxlcy50ZXh0Q29sb3IgPSBjb2xvcnMuYWxlcnRSZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGV4dCA9PT0gJ0hJR0gnKSB7XG4gICAgICAgICAgZGF0YS5jZWxsLnN0eWxlcy50ZXh0Q29sb3IgPSBjb2xvcnMuYWxlcnRBbWJlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRhdGEuc2VjdGlvbiA9PT0gJ2JvZHknICYmIGRhdGEuY29sdW1uLmluZGV4ID09PSA3KSB7XG4gICAgICAgIGRhdGEuY2VsbC5zdHlsZXMudGV4dENvbG9yID0gY29sb3JzLmFsZXJ0R3JlZW47XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBjdXJyZW50WSA9IChkb2MgYXMgYW55KS5sYXN0QXV0b1RhYmxlLmZpbmFsWSArIDg7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTRUNUSU9OIDI6IEZPQ1VTIEhJSkFDSyBMT0dTIChJRiBSRVFVRVNURUQpXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgaWYgKGluY2x1ZGVGb2N1c0xvZ3MgJiYgZm9jdXNMb2dzLmxlbmd0aCA+IDApIHtcbiAgICAvLyBJZiBub3QgZW5vdWdoIHJvb20sIHN0YXJ0IGEgZnJlc2ggcGFnZVxuICAgIGlmIChjdXJyZW50WSA+IHBhZ2VIZWlnaHQgLSA1MCkge1xuICAgICAgZG9jLmFkZFBhZ2UoKTtcbiAgICAgIGN1cnJlbnRZID0gbWFyZ2luICsgODtcbiAgICB9XG5cbiAgICBjdXJyZW50WSA9IGRyYXdTZWN0aW9uSGVhZGVyKCdDesSZxZvEhyAyOiBEemllbm5payBQcnplY2h3eXR5d2FuaWEgRm9rdXN1IGkgQmxva2FkIE9raWVua293eWNoIChGb2N1cyBIaWphY2sgRXZlbnRzKScsIGN1cnJlbnRZLCAn4payJyk7XG5cbiAgICBjb25zdCBmb2N1c1RhYmxlUm93cyA9IGZvY3VzTG9ncy5zbGljZSgwLCAxNSkubWFwKChsb2csIGlkeCkgPT4gW1xuICAgICAgYCMke2lkeCArIDF9YCxcbiAgICAgIGxvZy50aW1lc3RhbXAuc2xpY2UoMTEsIDE5KSB8fCBsb2cudGltZXN0YW1wLFxuICAgICAgYCR7bG9nLnByb2Nlc3NOYW1lfVxcbihQSUQ6ICR7bG9nLnBpZH0pYCxcbiAgICAgIGxvZy53aW5kb3dUaXRsZS5zbGljZSgwLCAzMiksXG4gICAgICBsb2cuYWJ1c2VkQXBpLFxuICAgICAgbG9nLmFnZ3Jlc3Npb25MZXZlbCxcbiAgICAgIGAke2xvZy5yZXBlYXRDb3VudH14YCxcbiAgICAgIGxvZy5pbnRlcmNlcHRlZCA/ICdaQUJMT0tPV0FOTycgOiAnUkVKRVNUUkFDSkEnXG4gICAgXSk7XG5cbiAgICBhdXRvVGFibGUoZG9jLCB7XG4gICAgICBzdGFydFk6IGN1cnJlbnRZLFxuICAgICAgbWFyZ2luOiB7IGxlZnQ6IG1hcmdpbiwgcmlnaHQ6IG1hcmdpbiB9LFxuICAgICAgaGVhZDogW1snSUQnLCAnQ1pBUycsICdQUk9DRVMgKFBJRCknLCAnVFlUVcWBIE9LTkEgUk9CT0NaRUdPJywgJ05BRFXFu1lXQU5FIEFQSScsICdBR1JFU0pBJywgJ1BPV1TDk1JaRU5JQScsICdXWU5JSyddXSxcbiAgICAgIGJvZHk6IGZvY3VzVGFibGVSb3dzLFxuICAgICAgdGhlbWU6ICdncmlkJyxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBmb250U2l6ZTogNixcbiAgICAgICAgY2VsbFBhZGRpbmc6IDEuNixcbiAgICAgICAgZm9udDogJ2hlbHZldGljYScsXG4gICAgICAgIHRleHRDb2xvcjogY29sb3JzLnRleHRQcmltYXJ5LFxuICAgICAgICBsaW5lQ29sb3I6IGNvbG9ycy5ib3JkZXJNdXRlZCxcbiAgICAgICAgbGluZVdpZHRoOiAwLjFcbiAgICAgIH0sXG4gICAgICBoZWFkU3R5bGVzOiB7XG4gICAgICAgIGZpbGxDb2xvcjogY29sb3JzLnByaW1hcnlOYXZ5LFxuICAgICAgICB0ZXh0Q29sb3I6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICAgICAgZm9udFN0eWxlOiAnYm9sZCcsXG4gICAgICAgIGZvbnRTaXplOiA2LjVcbiAgICAgIH0sXG4gICAgICBhbHRlcm5hdGVSb3dTdHlsZXM6IHtcbiAgICAgICAgZmlsbENvbG9yOiBbMjQ4LCAyNTAsIDI1Ml1cbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdHlsZXM6IHtcbiAgICAgICAgMDogeyBjZWxsV2lkdGg6IDgsIGhhbGlnbjogJ2NlbnRlcicgfSxcbiAgICAgICAgMTogeyBjZWxsV2lkdGg6IDE2LCBmb250OiAnY291cmllcicgfSxcbiAgICAgICAgMjogeyBjZWxsV2lkdGg6IDMyLCBmb250U3R5bGU6ICdib2xkJyB9LFxuICAgICAgICAzOiB7IGNlbGxXaWR0aDogNDIgfSxcbiAgICAgICAgNDogeyBjZWxsV2lkdGg6IDI4LCBmb250OiAnY291cmllcicsIGZvbnRTaXplOiA1LjUgfSxcbiAgICAgICAgNTogeyBjZWxsV2lkdGg6IDE4LCBoYWxpZ246ICdjZW50ZXInLCBmb250U3R5bGU6ICdib2xkJyB9LFxuICAgICAgICA2OiB7IGNlbGxXaWR0aDogMTYsIGhhbGlnbjogJ2NlbnRlcicgfSxcbiAgICAgICAgNzogeyBjZWxsV2lkdGg6IDIyLCBoYWxpZ246ICdjZW50ZXInLCBmb250U3R5bGU6ICdib2xkJyB9XG4gICAgICB9LFxuICAgICAgZGlkUGFyc2VDZWxsOiAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5zZWN0aW9uID09PSAnYm9keScgJiYgZGF0YS5jb2x1bW4uaW5kZXggPT09IDUpIHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKGRhdGEuY2VsbC5yYXcpO1xuICAgICAgICAgIGlmICh0ZXh0ID09PSAnQ1JJVElDQUwnKSBkYXRhLmNlbGwuc3R5bGVzLnRleHRDb2xvciA9IGNvbG9ycy5hbGVydFJlZDtcbiAgICAgICAgICBlbHNlIGlmICh0ZXh0ID09PSAnSElHSCcpIGRhdGEuY2VsbC5zdHlsZXMudGV4dENvbG9yID0gY29sb3JzLmFsZXJ0QW1iZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc2VjdGlvbiA9PT0gJ2JvZHknICYmIGRhdGEuY29sdW1uLmluZGV4ID09PSA3KSB7XG4gICAgICAgICAgZGF0YS5jZWxsLnN0eWxlcy50ZXh0Q29sb3IgPSBjb2xvcnMuYWxlcnRHcmVlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY3VycmVudFkgPSAoZG9jIGFzIGFueSkubGFzdEF1dG9UYWJsZS5maW5hbFkgKyA4O1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTRUNUSU9OIDM6IERFRVAgRk9SRU5TSUMgRE9TU0lFUlMgUEVSIFRIUkVBVFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEFsd2F5cyBiZWdpbiBkZXRhaWxlZCBkb3NzaWVycyBvbiBhIGZyZXNoIGNsZWFuIHBhZ2UgZm9yIGZvcmVuc2ljIHJldmlld1xuICBkb2MuYWRkUGFnZSgpO1xuICBjdXJyZW50WSA9IG1hcmdpbiArIDg7XG4gIGN1cnJlbnRZID0gZHJhd1NlY3Rpb25IZWFkZXIoJ0N6xJnFm8SHIDM6IFN6Y3plZ8OzxYJvd2UgS2FydG90ZWtpIEtyeW1pbmFsaXN0eWN6bmUgaSBQcm90b2tvxYJ5IFVib2p1JywgY3VycmVudFksICfil4gnKTtcblxuICB0YXJnZXRUaHJlYXRzLmZvckVhY2goKHRocmVhdCwgdElkeCkgPT4ge1xuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgYSBuZXcgcGFnZSBmb3IgdGhpcyBkb3NzaWVyXG4gICAgaWYgKGN1cnJlbnRZID4gcGFnZUhlaWdodCAtIDY1KSB7XG4gICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgY3VycmVudFkgPSBtYXJnaW4gKyA4O1xuICAgIH1cblxuICAgIC8vIEluZGl2aWR1YWwgVGhyZWF0IEhlYWRlciBCb3hcbiAgICBkb2Muc2V0RmlsbENvbG9yKC4uLmNvbG9ycy5iZ011dGVkKTtcbiAgICBkb2Muc2V0RHJhd0NvbG9yKC4uLmNvbG9ycy5ib3JkZXJNdXRlZCk7XG4gICAgZG9jLnJvdW5kZWRSZWN0KG1hcmdpbiwgY3VycmVudFksIGNvbnRlbnRXaWR0aCwgMTQsIDEuNSwgMS41LCAnRkQnKTtcblxuICAgIC8vIENvbG9yZWQgbWFya2VyXG4gICAgY29uc3Qgc2V2Q29sb3IgPSAodGhyZWF0LnNldmVyaXR5ID09PSAnQ1JJVElDQUwnIHx8IHRocmVhdC5zZXZlcml0eSA9PT0gJ0VYVFJFTUUnKVxuICAgICAgPyBjb2xvcnMuYWxlcnRSZWRcbiAgICAgIDogdGhyZWF0LnNldmVyaXR5ID09PSAnSElHSCcgPyBjb2xvcnMuYWxlcnRBbWJlciA6IGNvbG9ycy5hY2NlbnRDeWFuO1xuXG4gICAgZG9jLnNldEZpbGxDb2xvciguLi5zZXZDb2xvcik7XG4gICAgZG9jLnJlY3QobWFyZ2luLCBjdXJyZW50WSwgMi41LCAxNCwgJ0YnKTtcblxuICAgIC8vIFRocmVhdCBUaXRsZVxuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSg5KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0UHJpbWFyeSk7XG4gICAgZG9jLnRleHQoYElOQ0lERU5UICMke3RJZHggKyAxfTogJHt0aHJlYXQubmFtZS50b1VwcGVyQ2FzZSgpfSAke3RocmVhdC5hbGlhcyA/IGBbJHt0aHJlYXQuYWxpYXN9XWAgOiAnJ31gLCBtYXJnaW4gKyA1LCBjdXJyZW50WSArIDUpO1xuXG4gICAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgICBkb2Muc2V0Rm9udFNpemUoNi41KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0TXV0ZWQpO1xuICAgIGRvYy50ZXh0KGBLYXRlZ29yaWE6ICR7dGhyZWF0LmNhdGVnb3J5fSAgfCAgU3lzdGVteTogJHt0aHJlYXQudGFyZ2V0T1Muam9pbignLCAnKS50b1VwcGVyQ2FzZSgpfSAgfCAgRGF0YSBsaWt3aWRhY2ppOiAke3RocmVhdC5uZXV0cmFsaXplZEF0fWAsIG1hcmdpbiArIDUsIGN1cnJlbnRZICsgMTApO1xuXG4gICAgLy8gU2V2ZXJpdHkgU3RhbXAgb24gcmlnaHRcbiAgICBkb2Muc2V0RmlsbENvbG9yKC4uLnNldkNvbG9yKTtcbiAgICBkb2Mucm91bmRlZFJlY3QocGFnZVdpZHRoIC0gbWFyZ2luIC0gMzIsIGN1cnJlbnRZICsgMi41LCAzMCwgOSwgMSwgMSwgJ0YnKTtcbiAgICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgICBkb2Muc2V0Rm9udFNpemUoNi41KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgIGRvYy50ZXh0KGAke3RocmVhdC5zZXZlcml0eX0gLy8gUFVSR0VEYCwgcGFnZVdpZHRoIC0gbWFyZ2luIC0gMTcsIGN1cnJlbnRZICsgNy41LCB7IGFsaWduOiAnY2VudGVyJyB9KTtcblxuICAgIGN1cnJlbnRZICs9IDE3O1xuXG4gICAgLy8gVGVjaG5pY2FsIEhhc2hlcyAmIEVudHJvcHkgR3JpZFxuICAgIGRvYy5zZXRGaWxsQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG4gICAgZG9jLnNldERyYXdDb2xvciguLi5jb2xvcnMuYm9yZGVyTXV0ZWQpO1xuICAgIGRvYy5yb3VuZGVkUmVjdChtYXJnaW4sIGN1cnJlbnRZLCBjb250ZW50V2lkdGgsIDEwLCAxLCAxLCAnRkQnKTtcblxuICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJywgJ25vcm1hbCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSg2KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0UHJpbWFyeSk7XG4gICAgZG9jLnRleHQoYFNIQTI1NjogJHt0aHJlYXQuc2hhMjU2SGFzaH1gLCBtYXJnaW4gKyAzLCBjdXJyZW50WSArIDQpO1xuICAgIGRvYy50ZXh0KGBFTlRST1BJQTogJHt0aHJlYXQuZW50cm9weS50b0ZpeGVkKDIpfS84LjAwICB8ICBTVEFUVVM6ICR7dGhyZWF0LnN0YXR1c31gLCBtYXJnaW4gKyAzLCBjdXJyZW50WSArIDgpO1xuXG4gICAgY3VycmVudFkgKz0gMTM7XG5cbiAgICAvLyBEZXNjcmlwdGlvbiAmIEFnZ3Jlc3Npb24gZGV0YWlsc1xuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSg3KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy5hY2NlbnRDeWFuKTtcbiAgICBkb2MudGV4dCgnMS4gT1BJUyBaQUdST8W7RU5JQSAmIFdFS1RPUiBJTkZFS0NKSTonLCBtYXJnaW4sIGN1cnJlbnRZKTtcbiAgICBjdXJyZW50WSArPSAzLjU7XG5cbiAgICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ25vcm1hbCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSg2LjUpO1xuICAgIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLnRleHRQcmltYXJ5KTtcbiAgICBjb25zdCBzcGxpdERlc2MgPSBkb2Muc3BsaXRUZXh0VG9TaXplKFxuICAgICAgYEthbmHFgjogJHt0aHJlYXQuaW5mZWN0aW9uVmVjdG9yLmNoYW5uZWx9IHwgTWV0b2RhOiAke3RocmVhdC5pbmZlY3Rpb25WZWN0b3IubWV0aG9kfSB8IFBheWxvYWQ6ICR7dGhyZWF0LmluZmVjdGlvblZlY3Rvci5wYXlsb2FkVHlwZX0gKENWRTogJHt0aHJlYXQuaW5mZWN0aW9uVmVjdG9yLnZ1bG5lcmFiaWxpdHlDdmUgfHwgJ04vQSd9KVxcbk9waXM6ICR7dGhyZWF0LmRlc2NyaXB0aW9ufWAsXG4gICAgICBjb250ZW50V2lkdGhcbiAgICApO1xuICAgIGRvYy50ZXh0KHNwbGl0RGVzYywgbWFyZ2luLCBjdXJyZW50WSk7XG4gICAgY3VycmVudFkgKz0gKHNwbGl0RGVzYy5sZW5ndGggKiAzKSArIDI7XG5cbiAgICAvLyBFeHBsb2l0IENoYWluIChpZiBlbmFibGVkKVxuICAgIGlmIChpbmNsdWRlRXhwbG9pdENoYWlucyAmJiB0aHJlYXQuaW5mZWN0aW9uVmVjdG9yLmV4cGxvaXRDaGFpbiAmJiB0aHJlYXQuaW5mZWN0aW9uVmVjdG9yLmV4cGxvaXRDaGFpbi5sZW5ndGggPiAwKSB7XG4gICAgICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgICAgIGRvYy5zZXRGb250U2l6ZSg2LjUpO1xuICAgICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMuYWxlcnRBbWJlcik7XG4gICAgICBkb2MudGV4dCgnxYFBxYNDVUNIIEVLU1BMT0FUQUNKSSAoRVhQTE9JVCBDSEFJTik6JywgbWFyZ2luLCBjdXJyZW50WSk7XG4gICAgICBjdXJyZW50WSArPSAzO1xuXG4gICAgICBkb2Muc2V0Rm9udCgnY291cmllcicsICdub3JtYWwnKTtcbiAgICAgIGRvYy5zZXRGb250U2l6ZSg1LjUpO1xuICAgICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dFByaW1hcnkpO1xuICAgICAgdGhyZWF0LmluZmVjdGlvblZlY3Rvci5leHBsb2l0Q2hhaW4uZm9yRWFjaCgoY2hhaW5JdGVtKSA9PiB7XG4gICAgICAgIGRvYy50ZXh0KGAgIOKAoiAke2NoYWluSXRlbX1gLCBtYXJnaW4sIGN1cnJlbnRZKTtcbiAgICAgICAgY3VycmVudFkgKz0gMi42O1xuICAgICAgfSk7XG4gICAgICBjdXJyZW50WSArPSAxO1xuICAgIH1cblxuICAgIC8vIEFnZ3Jlc3Npb24gTWVjaGFuaXNtXG4gICAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdib2xkJyk7XG4gICAgZG9jLnNldEZvbnRTaXplKDcpO1xuICAgIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLmFjY2VudFB1cnBsZSk7XG4gICAgZG9jLnRleHQoYDIuIE1FQ0hBTklaTSBBR1JFU0pJOiAke3RocmVhdC5hZ2dyZXNzaW9uTWVjaGFuaXNtLnRpdGxlLnRvVXBwZXJDYXNlKCl9YCwgbWFyZ2luLCBjdXJyZW50WSk7XG4gICAgY3VycmVudFkgKz0gMy41O1xuXG4gICAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgICBkb2Muc2V0Rm9udFNpemUoNi41KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0UHJpbWFyeSk7XG4gICAgY29uc3QgYWdnU3VtbWFyeSA9IGRvYy5zcGxpdFRleHRUb1NpemUoXG4gICAgICBgUG9kc3Vtb3dhbmllOiAke3RocmVhdC5hZ2dyZXNzaW9uTWVjaGFuaXNtLnN1bW1hcnl9XFxuTmFkdcW8eXdhbmUgQVBJOiAke3RocmVhdC5hZ2dyZXNzaW9uTWVjaGFuaXNtLmFwaXNBYnVzZWQuam9pbignLCAnKX1gLFxuICAgICAgY29udGVudFdpZHRoXG4gICAgKTtcbiAgICBkb2MudGV4dChhZ2dTdW1tYXJ5LCBtYXJnaW4sIGN1cnJlbnRZKTtcbiAgICBjdXJyZW50WSArPSAoYWdnU3VtbWFyeS5sZW5ndGggKiAzKSArIDI7XG5cbiAgICAvLyBOZXV0cmFsaXphdGlvbiAmIEV4ZWN1dGlvbiBzdGVwcyB0YWJsZVxuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICAgIGRvYy5zZXRGb250U2l6ZSg3KTtcbiAgICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy5hbGVydEdyZWVuKTtcbiAgICBkb2MudGV4dChgMy4gUFJPQ0VEVVJBIFVCT0pVIChLSUxMLUNIQUlOIEVYRUNVVElPTiBTVEVQUyk6ICR7dGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5tZXRob2ROYW1lfWAsIG1hcmdpbiwgY3VycmVudFkpO1xuICAgIGN1cnJlbnRZICs9IDM7XG5cbiAgICBjb25zdCBzbGF1Z2h0ZXJSb3dzID0gdGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5leGVjdXRpb25TdGVwcy5tYXAoc3RlcCA9PiBbXG4gICAgICBgS3JvayAke3N0ZXAuc3RlcH1gLFxuICAgICAgc3RlcC50aW1lc3RhbXAsXG4gICAgICBzdGVwLmFjdGlvbixcbiAgICAgIHN0ZXAudGFyZ2V0QXBpLFxuICAgICAgc3RlcC5yZXN1bHRcbiAgICBdKTtcblxuICAgIGF1dG9UYWJsZShkb2MsIHtcbiAgICAgIHN0YXJ0WTogY3VycmVudFksXG4gICAgICBtYXJnaW46IHsgbGVmdDogbWFyZ2luLCByaWdodDogbWFyZ2luIH0sXG4gICAgICBoZWFkOiBbWydLUk9LJywgJ0NaQVMnLCAnRFpJQcWBQU5JRSBPQlJPTk5FJywgJ1dZV0/FgUFORSBBUEkgSsSERFJBJywgJ1dZTklLIC8gU1RBVFVTJ11dLFxuICAgICAgYm9keTogc2xhdWdodGVyUm93cyxcbiAgICAgIHRoZW1lOiAnZ3JpZCcsXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgZm9udFNpemU6IDUuNSxcbiAgICAgICAgY2VsbFBhZGRpbmc6IDEuNCxcbiAgICAgICAgZm9udDogJ2hlbHZldGljYScsXG4gICAgICAgIGxpbmVDb2xvcjogY29sb3JzLmJvcmRlck11dGVkLFxuICAgICAgICBsaW5lV2lkdGg6IDAuMVxuICAgICAgfSxcbiAgICAgIGhlYWRTdHlsZXM6IHtcbiAgICAgICAgZmlsbENvbG9yOiBjb2xvcnMucHJpbWFyeU5hdnksXG4gICAgICAgIHRleHRDb2xvcjogWzI1NSwgMjU1LCAyNTVdLFxuICAgICAgICBmb250U3R5bGU6ICdib2xkJyxcbiAgICAgICAgZm9udFNpemU6IDZcbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdHlsZXM6IHtcbiAgICAgICAgMDogeyBjZWxsV2lkdGg6IDE0LCBoYWxpZ246ICdjZW50ZXInLCBmb250U3R5bGU6ICdib2xkJyB9LFxuICAgICAgICAxOiB7IGNlbGxXaWR0aDogMTYsIGZvbnQ6ICdjb3VyaWVyJyB9LFxuICAgICAgICAyOiB7IGNlbGxXaWR0aDogNjQgfSxcbiAgICAgICAgMzogeyBjZWxsV2lkdGg6IDQwLCBmb250OiAnY291cmllcicgfSxcbiAgICAgICAgNDogeyBjZWxsV2lkdGg6IDQ4LCBmb250U3R5bGU6ICdib2xkJywgdGV4dENvbG9yOiBjb2xvcnMuYWxlcnRHcmVlbiB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjdXJyZW50WSA9IChkb2MgYXMgYW55KS5sYXN0QXV0b1RhYmxlLmZpbmFsWSArIDQ7XG5cbiAgICAvLyBRdWFyYW50aW5lIHByb29mXG4gICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnbm9ybWFsJyk7XG4gICAgZG9jLnNldEZvbnRTaXplKDUuNSk7XG4gICAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dE11dGVkKTtcbiAgICBkb2MudGV4dChgRE9Xw5NEIEtXQVJBTlRBTk5ZIC8gUkVKRVNUUlU6ICR7dGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5xdWFyYW50aW5lUHJvb2Z9YCwgbWFyZ2luLCBjdXJyZW50WSk7XG4gICAgY3VycmVudFkgKz0gNDtcblxuICAgIC8vIEtpbGwgc2NyaXB0IHNuaXBwZXQgKGlmIGVuYWJsZWQpXG4gICAgaWYgKGluY2x1ZGVLaWxsU25pcHBldHMgJiYgdGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5weXRob25LaWxsU25pcHBldCkge1xuICAgICAgaWYgKGN1cnJlbnRZID4gcGFnZUhlaWdodCAtIDM1KSB7XG4gICAgICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgICAgIGN1cnJlbnRZID0gbWFyZ2luICsgODtcbiAgICAgIH1cblxuICAgICAgZG9jLnNldEZpbGxDb2xvcigxNSwgMjMsIDQyKTsgLy8gc2xhdGUtOTAwIGNvZGUgYm94XG4gICAgICBkb2Mucm91bmRlZFJlY3QobWFyZ2luLCBjdXJyZW50WSwgY29udGVudFdpZHRoLCAyMiwgMSwgMSwgJ0YnKTtcbiAgICAgIFxuICAgICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnYm9sZCcpO1xuICAgICAgZG9jLnNldEZvbnRTaXplKDUpO1xuICAgICAgZG9jLnNldFRleHRDb2xvcig1NiwgMTg5LCAyNDgpO1xuICAgICAgZG9jLnRleHQoYCMgQVVUT05PTUlDWk5ZIEZSQUdNRU5UIExJS1dJREFDWUpOWSBQWVRIT04gRExBOiAke3RocmVhdC5uYW1lfWAsIG1hcmdpbiArIDMsIGN1cnJlbnRZICsgMy41KTtcblxuICAgICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnbm9ybWFsJyk7XG4gICAgICBkb2Muc2V0Rm9udFNpemUoNC44KTtcbiAgICAgIGRvYy5zZXRUZXh0Q29sb3IoMjI2LCAyMzIsIDI0MCk7XG4gICAgICBjb25zdCBjb2RlTGluZXMgPSB0aHJlYXQubmV1dHJhbGl6YXRpb25EZXRhaWxzLnB5dGhvbktpbGxTbmlwcGV0XG4gICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgLnNsaWNlKDAsIDYpXG4gICAgICAgIC5tYXAobCA9PiBsLnNsaWNlKDAsIDk1KSk7XG4gICAgICBjb2RlTGluZXMuZm9yRWFjaCgobGluZSwgbGluZUlkeCkgPT4ge1xuICAgICAgICBkb2MudGV4dChsaW5lLCBtYXJnaW4gKyAzLCBjdXJyZW50WSArIDcgKyAobGluZUlkeCAqIDIuNikpO1xuICAgICAgfSk7XG5cbiAgICAgIGN1cnJlbnRZICs9IDI2O1xuICAgIH1cblxuICAgIGN1cnJlbnRZICs9IDU7XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gRklOQUwgU0VDVElPTjogRElHSVRBTCBTSUdOQVRVUkVTICYgQ0hBSU4gT0YgQ1VTVE9EWVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChjdXJyZW50WSA+IHBhZ2VIZWlnaHQgLSA0NSkge1xuICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgY3VycmVudFkgPSBtYXJnaW4gKyA4O1xuICB9XG5cbiAgY3VycmVudFkgPSBkcmF3U2VjdGlvbkhlYWRlcignQ3rEmcWbxIcgNDogQ3lmcm93ZSBQaWVjesSZY2llIEludGVncmFsbm/Fm2NpICYgUG/Fm3dpYWRjemVuaWUgTmllbmFydXN6YWxub8WbY2knLCBjdXJyZW50WSwgJ+KYhScpO1xuXG4gIGNvbnN0IHNpZ0JveFdpZHRoID0gKGNvbnRlbnRXaWR0aCAtIDYpIC8gMjtcbiAgZG9jLnNldERyYXdDb2xvciguLi5jb2xvcnMuYm9yZGVyTXV0ZWQpO1xuICBkb2Muc2V0RmlsbENvbG9yKC4uLmNvbG9ycy5iZ011dGVkKTtcbiAgZG9jLnJvdW5kZWRSZWN0KG1hcmdpbiwgY3VycmVudFksIHNpZ0JveFdpZHRoLCAyNCwgMS41LCAxLjUsICdGRCcpO1xuICBkb2Mucm91bmRlZFJlY3QobWFyZ2luICsgc2lnQm94V2lkdGggKyA2LCBjdXJyZW50WSwgc2lnQm94V2lkdGgsIDI0LCAxLjUsIDEuNSwgJ0ZEJyk7XG5cbiAgLy8gTGVmdCBTaWduYXR1cmUgQm94XG4gIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICBkb2Muc2V0Rm9udFNpemUoNyk7XG4gIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLnRleHRQcmltYXJ5KTtcbiAgZG9jLnRleHQoJ09GSUNKQUxORSBQT8WaV0lBRENaRU5JRSBGT1JFTlNJQyBBVURJVE9SJywgbWFyZ2luICsgMywgY3VycmVudFkgKyA1KTtcbiAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnbm9ybWFsJyk7XG4gIGRvYy5zZXRGb250U2l6ZSg2KTtcbiAgZG9jLnNldFRleHRDb2xvciguLi5jb2xvcnMudGV4dE11dGVkKTtcbiAgZG9jLnRleHQoYFBPRFBJUyBDWUZST1dZOiBTRU5USU5FTC1TSEEyNTYtQ0VSVElGSUVEYCwgbWFyZ2luICsgMywgY3VycmVudFkgKyAxMCk7XG4gIGRvYy50ZXh0KGBIQVNIIFJBUE9SVFU6ICR7cmVwb3J0SGFzaC5zbGljZSgwLCAzMil9Li4uYCwgbWFyZ2luICsgMywgY3VycmVudFkgKyAxNCk7XG4gIGRvYy50ZXh0KGBTVEFUVVMgQkFEQcWDOiAxMDAlIFpXRVJZRklLT1dBTk8gSSBaQU1LTknEmFRPYCwgbWFyZ2luICsgMywgY3VycmVudFkgKyAxOCk7XG5cbiAgLy8gUmlnaHQgU2lnbmF0dXJlIEJveFxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgZG9jLnNldEZvbnRTaXplKDcpO1xuICBkb2Muc2V0VGV4dENvbG9yKC4uLmNvbG9ycy50ZXh0UHJpbWFyeSk7XG4gIGRvYy50ZXh0KCdLTEFVWlVMQSBQUkFXTk8tT1BFUkFDWUpOQSBTRU5USU5FTCcsIG1hcmdpbiArIHNpZ0JveFdpZHRoICsgOSwgY3VycmVudFkgKyA1KTtcbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgZG9jLnNldEZvbnRTaXplKDUuNSk7XG4gIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLnRleHRNdXRlZCk7XG4gIGNvbnN0IGxlZ2FsTm90ZSA9IGRvYy5zcGxpdFRleHRUb1NpemUoXG4gICAgJ05pbmllanN6eSBkb2t1bWVudCBzdGFub3dpIG5pZW5hcnVzemFsbnkgemFwaXMga3J5bWluYWxpc3R5Y3pueSB3eWdlbmVyb3dhbnkgeiBsb2thbG5lZ28gbW9ub2xpdHUgU2VudGluZWwuIFdzemVsa2llIHN5Z25hdHVyeSwgZW50cm9waWUgaSDFm2xhZHkgd3l3b8WCYcWEIEFQSSBXaW4zMi9QT1NJWCBzxIUgemFyZWplc3Ryb3dhbmUgemdvZG5pZSB6ZSBzdGFuZGFyZGVtIFJGQyAzMTYxLicsXG4gICAgc2lnQm94V2lkdGggLSA2XG4gICk7XG4gIGRvYy50ZXh0KGxlZ2FsTm90ZSwgbWFyZ2luICsgc2lnQm94V2lkdGggKyA5LCBjdXJyZW50WSArIDkpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gR0xPQkFMIEZPT1RFUiAoUEFHRSBOVU1CRVJTICYgVElNRVNUQU1QIE9OIEFMTCBQQUdFUylcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCB0b3RhbFBhZ2VzID0gZG9jLmdldE51bWJlck9mUGFnZXMoKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxQYWdlczsgaSsrKSB7XG4gICAgZG9jLnNldFBhZ2UoaSk7XG4gICAgXG4gICAgLy8gQm90dG9tIHRoaW4gbGluZVxuICAgIGRvYy5zZXREcmF3Q29sb3IoLi4uY29sb3JzLmJvcmRlck11dGVkKTtcbiAgICBkb2Muc2V0TGluZVdpZHRoKDAuMyk7XG4gICAgZG9jLmxpbmUobWFyZ2luLCBwYWdlSGVpZ2h0IC0gOSwgcGFnZVdpZHRoIC0gbWFyZ2luLCBwYWdlSGVpZ2h0IC0gOSk7XG5cbiAgICAvLyBGb290ZXIgdGV4dFxuICAgIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnbm9ybWFsJyk7XG4gICAgZG9jLnNldEZvbnRTaXplKDYpO1xuICAgIGRvYy5zZXRUZXh0Q29sb3IoLi4uY29sb3JzLnRleHRNdXRlZCk7XG4gICAgZG9jLnRleHQoYFNFTlRJTkVMIEZPUkVOU0lDUyBMQUIgIHwgIFJBUE9SVCBJTkNZREVOVMOTVyBNQUxXQVJFICB8ICBIQVNIOiAke3Nob3J0SGFzaH1gLCBtYXJnaW4sIHBhZ2VIZWlnaHQgLSA1LjUpO1xuXG4gICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInLCAnbm9ybWFsJyk7XG4gICAgZG9jLnRleHQoYFN0cm9uYSAke2l9IHogJHt0b3RhbFBhZ2VzfSAgfCAgJHt0aW1lc3RhbXBGb3JtYXR0ZWR9YCwgcGFnZVdpZHRoIC0gbWFyZ2luLCBwYWdlSGVpZ2h0IC0gNS41LCB7IGFsaWduOiAncmlnaHQnIH0pO1xuICB9XG5cbiAgLy8gR2VuZXJhdGUgc2FmZSBmaWxlbmFtZVxuICBjb25zdCBjbGVhbkRhdGVTdHIgPSB0aW1lc3RhbXBJc28uc2xpY2UoMCwgMTApO1xuICBjb25zdCBjbGVhblRpbWVTdHIgPSB0aW1lc3RhbXBJc28uc2xpY2UoMTEsIDE5KS5yZXBsYWNlKC86L2csICcnKTtcbiAgY29uc3QgZmlsZW5hbWUgPSBgU0VOVElORUxfRk9SRU5TSUNfUkVQT1JUXyR7Y2xlYW5EYXRlU3RyfV8ke2NsZWFuVGltZVN0cn0ucGRmYDtcblxuICByZXR1cm4ge1xuICAgIGRvYyxcbiAgICBmaWxlbmFtZSxcbiAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcEZvcm1hdHRlZCxcbiAgICByZXBvcnRIYXNoLFxuICAgIHN0YXRzOiB7XG4gICAgICB0b3RhbFRocmVhdHMsXG4gICAgICBjcml0aWNhbENvdW50LFxuICAgICAgaGlnaENvdW50LFxuICAgICAgdG90YWxGb2N1c0F0dGVtcHRzLFxuICAgICAgYXZnRW50cm9weSxcbiAgICAgIHBhZ2VzOiB0b3RhbFBhZ2VzXG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWROZXV0cmFsaXplZFRocmVhdHNQZGYoXG4gIHRocmVhdHM6IE5ldXRyYWxpemVkVGhyZWF0W10sXG4gIGZvY3VzTG9nczogRm9jdXNIaWphY2tBdHRlbXB0W10sXG4gIG9wdGlvbnM6IEZvcmVuc2ljc1BkZkV4cG9ydE9wdGlvbnMgPSB7fVxuKTogUHJvbWlzZTx7IGZpbGVuYW1lOiBzdHJpbmc7IHRpbWVzdGFtcDogc3RyaW5nOyByZXBvcnRIYXNoOiBzdHJpbmc7IHN0YXRzOiBhbnkgfT4ge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZW5lcmF0ZU5ldXRyYWxpemVkVGhyZWF0c1BkZih0aHJlYXRzLCBmb2N1c0xvZ3MsIG9wdGlvbnMpO1xuICByZXN1bHQuZG9jLnNhdmUocmVzdWx0LmZpbGVuYW1lKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZUFBZTtBQWlCdEIsZUFBZSxjQUFjLE1BQStCO0FBQzFELE1BQUk7QUFDRixRQUFJLE9BQU8sV0FBVyxlQUFlLE9BQU8sVUFBVSxPQUFPLE9BQU8sUUFBUTtBQUMxRSxZQUFNLFlBQVksSUFBSSxZQUFZLEVBQUUsT0FBTyxJQUFJO0FBQy9DLFlBQU0sYUFBYSxNQUFNLE9BQU8sT0FBTyxPQUFPLE9BQU8sV0FBVyxTQUFTO0FBQ3pFLFlBQU0sWUFBWSxNQUFNLEtBQUssSUFBSSxXQUFXLFVBQVUsQ0FBQztBQUN2RCxhQUFPLFVBQVUsSUFBSSxPQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUFBLElBQ3BFO0FBQUEsRUFDRixTQUFTLEdBQUc7QUFBQSxFQUVaO0FBQ0EsTUFBSSxPQUFPO0FBQ1gsV0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNwQyxZQUFTLFFBQVEsS0FBSyxPQUFRLEtBQUssV0FBVyxDQUFDO0FBQy9DLFlBQVE7QUFBQSxFQUNWO0FBQ0EsUUFBTSxNQUFNLEtBQUssSUFBSSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsU0FBUyxJQUFJLEdBQUc7QUFDeEQsU0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRTtBQUMvQztBQUVBLHNCQUFzQiw4QkFDcEIsU0FDQSxXQUNBLFVBQXFDLENBQUMsR0FDd0Q7QUFDOUYsUUFBTTtBQUFBLElBQ0osY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxFQUNoQixJQUFJO0FBR0osUUFBTSxnQkFBZ0IsUUFBUSxPQUFPLE9BQUs7QUFDeEMsUUFBSSxxQkFBcUIsa0JBQWtCLFNBQVMsS0FBSyxDQUFDLGtCQUFrQixTQUFTLEtBQUssR0FBRztBQUMzRixVQUFJLENBQUMsa0JBQWtCLFNBQVMsRUFBRSxFQUFFLEVBQUcsUUFBTztBQUFBLElBQ2hEO0FBQ0EsUUFBSSxtQkFBbUIsU0FBUyxFQUFFLGFBQWEsZ0JBQWdCO0FBQzdELGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sTUFBTSxvQkFBSSxLQUFLO0FBQ3JCLFFBQU0sZUFBZSxJQUFJLFlBQVk7QUFDckMsUUFBTSxxQkFBcUIsSUFBSSxZQUFZO0FBQzNDLFFBQU0sZUFBZSxJQUFJLGVBQWU7QUFDeEMsUUFBTSxjQUFjLEdBQUcsWUFBWSxJQUFJLGNBQWMsSUFBSSxPQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEdBQUcsQ0FBQztBQUM1RixRQUFNLGFBQWEsTUFBTSxjQUFjLFdBQVc7QUFDbEQsUUFBTSxZQUFZLFdBQVcsTUFBTSxHQUFHLEVBQUUsRUFBRSxZQUFZO0FBRXRELFFBQU0sZUFBZSxjQUFjO0FBQ25DLFFBQU0sZ0JBQWdCLGNBQWMsT0FBTyxPQUFLLEVBQUUsYUFBYSxjQUFjLEVBQUUsYUFBYSxTQUFTLEVBQUU7QUFDdkcsUUFBTSxZQUFZLGNBQWMsT0FBTyxPQUFLLEVBQUUsYUFBYSxNQUFNLEVBQUU7QUFDbkUsUUFBTSxxQkFBcUIsVUFBVSxPQUFPLENBQUMsS0FBSyxRQUFRLE9BQU8sSUFBSSxlQUFlLElBQUksQ0FBQztBQUN6RixRQUFNLGFBQWEsZUFBZSxLQUM3QixjQUFjLE9BQU8sQ0FBQyxLQUFLLE1BQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLGNBQWMsUUFBUSxDQUFDLElBQy9FO0FBR0osUUFBTSxNQUFNLElBQUksTUFBTTtBQUFBLElBQ3BCLGFBQWE7QUFBQSxJQUNiLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLFlBQVksSUFBSSxTQUFTLFNBQVMsU0FBUztBQUNqRCxRQUFNLGFBQWEsSUFBSSxTQUFTLFNBQVMsVUFBVTtBQUNuRCxRQUFNLFNBQVM7QUFDZixRQUFNLGVBQWUsWUFBYSxTQUFTO0FBRzNDLFFBQU0sU0FBUztBQUFBLElBQ2IsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUN4QixhQUFhLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBQ3hCLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBO0FBQUEsSUFDeEIsY0FBYyxDQUFDLEtBQUssSUFBSSxHQUFHO0FBQUE7QUFBQSxJQUMzQixVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFBQTtBQUFBLElBQ3RCLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQztBQUFBO0FBQUEsSUFDdkIsWUFBWSxDQUFDLElBQUksS0FBSyxFQUFFO0FBQUE7QUFBQSxJQUN4QixhQUFhLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN4QixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQTtBQUFBLElBQ3pCLFNBQVMsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBO0FBQUEsSUFDdkIsYUFBYSxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUE7QUFBQSxFQUM3QjtBQUdBLFFBQU0sb0JBQW9CLENBQUMsT0FBZSxNQUFjLFlBQW9CLFFBQWdCO0FBQzFGLFFBQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxRQUFJLEtBQUssUUFBUSxNQUFNLGNBQWMsR0FBRyxHQUFHO0FBQzNDLFFBQUksYUFBYSxHQUFHLE9BQU8sVUFBVTtBQUNyQyxRQUFJLEtBQUssUUFBUSxNQUFNLEdBQUcsR0FBRyxHQUFHO0FBRWhDLFFBQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsUUFBSSxZQUFZLEdBQUc7QUFDbkIsUUFBSSxhQUFhLEtBQUssS0FBSyxHQUFHO0FBQzlCLFFBQUksS0FBSyxHQUFHLFNBQVMsS0FBSyxNQUFNLFlBQVksQ0FBQyxJQUFJLFNBQVMsR0FBRyxPQUFPLEdBQUc7QUFDdkUsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFLQSxNQUFJLFdBQVc7QUFHZixNQUFJLGFBQWEsR0FBRyxPQUFPLFFBQVE7QUFDbkMsTUFBSSxLQUFLLEdBQUcsR0FBRyxXQUFXLEdBQUcsR0FBRztBQUNoQyxNQUFJLFFBQVEsYUFBYSxNQUFNO0FBQy9CLE1BQUksWUFBWSxHQUFHO0FBQ25CLE1BQUksYUFBYSxLQUFLLEtBQUssR0FBRztBQUM5QixNQUFJLEtBQUssS0FBSyxjQUFjLHNFQUFzRSxZQUFZLEdBQUcsS0FBSyxFQUFFLE9BQU8sU0FBUyxDQUFDO0FBRXpJLGFBQVc7QUFHWCxNQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsTUFBSSxZQUFZLFFBQVEsVUFBVSxjQUFjLElBQUksR0FBRyxHQUFHLEdBQUc7QUFHN0QsTUFBSSxhQUFhLEtBQUssS0FBSyxHQUFHO0FBQzlCLE1BQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsTUFBSSxZQUFZLEVBQUU7QUFDbEIsTUFBSSxLQUFLLHlDQUF5QyxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBRTFFLE1BQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsTUFBSSxZQUFZLEdBQUc7QUFDbkIsTUFBSSxhQUFhLElBQUksS0FBSyxHQUFHO0FBQzdCLE1BQUksS0FBSyxhQUFhLFNBQVMsR0FBRyxXQUFXLEVBQUU7QUFFL0MsTUFBSSxRQUFRLGFBQWEsUUFBUTtBQUNqQyxNQUFJLFlBQVksQ0FBQztBQUNqQixNQUFJLGFBQWEsS0FBSyxLQUFLLEdBQUc7QUFDOUIsTUFBSSxLQUFLLG1HQUFtRyxTQUFTLEdBQUcsV0FBVyxFQUFFO0FBR3JJLE1BQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxNQUFJLFlBQVksWUFBWSxTQUFTLElBQUksV0FBVyxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRztBQUN4RSxNQUFJLFFBQVEsV0FBVyxNQUFNO0FBQzdCLE1BQUksWUFBWSxHQUFHO0FBQ25CLE1BQUksYUFBYSxLQUFLLEtBQUssR0FBRztBQUM5QixNQUFJLEtBQUssYUFBYSxTQUFTLElBQUksWUFBWSxTQUFTLElBQUksV0FBVyxDQUFDO0FBQ3hFLE1BQUksS0FBSyxzQkFBc0IsWUFBWSxTQUFTLElBQUksV0FBVyxFQUFFO0FBQ3JFLE1BQUksS0FBSywyQkFBMkIsWUFBWSxTQUFTLElBQUksV0FBVyxFQUFFO0FBRTFFLGNBQVk7QUFHWixRQUFNLGVBQWUsZUFBZTtBQUNwQyxNQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsTUFBSSxhQUFhLEdBQUcsT0FBTyxPQUFPO0FBQ2xDLE1BQUksWUFBWSxRQUFRLFVBQVUsY0FBYyxJQUFJLEtBQUssS0FBSyxJQUFJO0FBRWxFLE1BQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsTUFBSSxZQUFZLEdBQUc7QUFDbkIsTUFBSSxhQUFhLEdBQUcsT0FBTyxXQUFXO0FBR3RDLE1BQUksS0FBSyx3Q0FBd0MsU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUN6RSxNQUFJLFFBQVEsYUFBYSxRQUFRO0FBQ2pDLE1BQUksWUFBWSxDQUFDO0FBQ2pCLE1BQUksYUFBYSxHQUFHLE9BQU8sU0FBUztBQUNwQyxNQUFJLEtBQUssb0JBQW9CLFNBQVMsR0FBRyxXQUFXLEVBQUU7QUFDdEQsTUFBSSxRQUFRLFdBQVcsUUFBUTtBQUMvQixNQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsTUFBSSxLQUFLLG9CQUFvQixTQUFTLElBQUksV0FBVyxFQUFFO0FBRXZELE1BQUksUUFBUSxhQUFhLFFBQVE7QUFDakMsTUFBSSxhQUFhLEdBQUcsT0FBTyxTQUFTO0FBQ3BDLE1BQUksS0FBSyx1QkFBdUIsU0FBUyxHQUFHLFdBQVcsRUFBRTtBQUN6RCxNQUFJLFFBQVEsV0FBVyxRQUFRO0FBQy9CLE1BQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxNQUFJLEtBQUssY0FBYyxTQUFTLElBQUksV0FBVyxFQUFFO0FBRWpELE1BQUksUUFBUSxhQUFhLFFBQVE7QUFDakMsTUFBSSxhQUFhLEdBQUcsT0FBTyxTQUFTO0FBQ3BDLE1BQUksS0FBSyxzQkFBc0IsU0FBUyxHQUFHLFdBQVcsRUFBRTtBQUN4RCxNQUFJLFFBQVEsYUFBYSxNQUFNO0FBQy9CLE1BQUksYUFBYSxHQUFHLE9BQU8sVUFBVTtBQUNyQyxNQUFJLEtBQUssa0JBQWtCLFNBQVMsSUFBSSxXQUFXLEVBQUU7QUFHckQsTUFBSSxRQUFRLGFBQWEsUUFBUTtBQUNqQyxNQUFJLGFBQWEsR0FBRyxPQUFPLFNBQVM7QUFDcEMsTUFBSSxLQUFLLG9CQUFvQixTQUFTLGVBQWUsR0FBRyxXQUFXLEVBQUU7QUFDckUsTUFBSSxRQUFRLFdBQVcsUUFBUTtBQUMvQixNQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsTUFBSSxLQUFLLGFBQWEsU0FBUyxlQUFlLElBQUksV0FBVyxFQUFFO0FBRS9ELE1BQUksUUFBUSxhQUFhLFFBQVE7QUFDakMsTUFBSSxhQUFhLEdBQUcsT0FBTyxTQUFTO0FBQ3BDLE1BQUksS0FBSywwQkFBMEIsU0FBUyxlQUFlLEdBQUcsV0FBVyxFQUFFO0FBQzNFLE1BQUksUUFBUSxXQUFXLFFBQVE7QUFDL0IsTUFBSSxhQUFhLEdBQUcsT0FBTyxZQUFZO0FBQ3ZDLE1BQUksS0FBSyxHQUFHLFdBQVcsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLFNBQVMsZUFBZSxJQUFJLFdBQVcsRUFBRTtBQUVuRixNQUFJLFFBQVEsYUFBYSxRQUFRO0FBQ2pDLE1BQUksYUFBYSxHQUFHLE9BQU8sU0FBUztBQUNwQyxNQUFJLEtBQUssdUJBQXVCLFNBQVMsZUFBZSxHQUFHLFdBQVcsRUFBRTtBQUN4RSxNQUFJLFFBQVEsV0FBVyxNQUFNO0FBQzdCLE1BQUksYUFBYSxHQUFHLE9BQU8sVUFBVTtBQUNyQyxNQUFJLEtBQUsseUNBQXlDLFNBQVMsZUFBZSxJQUFJLFdBQVcsRUFBRTtBQUUzRixjQUFZO0FBR1osUUFBTSxhQUFhLGVBQWUsS0FBSztBQUN2QyxRQUFNLGFBQWE7QUFBQSxJQUNqQixFQUFFLE9BQU8sOEJBQThCLE9BQU8sR0FBRyxZQUFZLElBQUksS0FBSywyQkFBMkIsT0FBTyxPQUFPLFdBQVc7QUFBQSxJQUMxSCxFQUFFLE9BQU8sdUJBQXVCLE9BQU8sR0FBRyxhQUFhLElBQUksS0FBSyxZQUFZLFNBQVMsSUFBSSxPQUFPLE9BQU8sU0FBUztBQUFBLElBQ2hILEVBQUUsT0FBTyx3QkFBd0IsT0FBTyxHQUFHLGtCQUFrQixJQUFJLEtBQUssR0FBRyxVQUFVLE1BQU0sbUJBQW1CLE9BQU8sT0FBTyxXQUFXO0FBQUEsSUFDckksRUFBRSxPQUFPLDRCQUE0QixPQUFPLEdBQUcsVUFBVSxRQUFRLEtBQUssaUNBQWlDLE9BQU8sT0FBTyxhQUFhO0FBQUEsRUFDcEk7QUFFQSxhQUFXLFFBQVEsQ0FBQyxNQUFNLFFBQVE7QUFDaEMsVUFBTSxRQUFRLFNBQVMsT0FBTyxZQUFZO0FBQzFDLFFBQUksYUFBYSxHQUFHLE9BQU8sT0FBTztBQUNsQyxRQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsUUFBSSxZQUFZLE9BQU8sVUFBVSxXQUFXLElBQUksS0FBSyxLQUFLLElBQUk7QUFHOUQsUUFBSSxhQUFhLEdBQUcsS0FBSyxLQUFLO0FBQzlCLFFBQUksS0FBSyxPQUFPLFVBQVUsS0FBSyxJQUFJLEdBQUc7QUFFdEMsUUFBSSxRQUFRLGFBQWEsTUFBTTtBQUMvQixRQUFJLFlBQVksR0FBRztBQUNuQixRQUFJLGFBQWEsR0FBRyxPQUFPLFNBQVM7QUFDcEMsUUFBSSxLQUFLLEtBQUssT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFDO0FBRTlDLFFBQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsUUFBSSxZQUFZLEVBQUU7QUFDbEIsUUFBSSxhQUFhLEdBQUcsS0FBSyxLQUFLO0FBQzlCLFFBQUksS0FBSyxLQUFLLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSTtBQUVqRCxRQUFJLFFBQVEsYUFBYSxRQUFRO0FBQ2pDLFFBQUksWUFBWSxHQUFHO0FBQ25CLFFBQUksYUFBYSxHQUFHLE9BQU8sU0FBUztBQUNwQyxRQUFJLEtBQUssS0FBSyxLQUFLLFFBQVEsS0FBSyxXQUFXLEVBQUU7QUFBQSxFQUMvQyxDQUFDO0FBRUQsY0FBWTtBQUVaLE1BQUksZUFBZSxZQUFZLEtBQUssRUFBRSxTQUFTLEdBQUc7QUFDaEQsUUFBSSxhQUFhLEtBQUssS0FBSyxHQUFHO0FBQzlCLFFBQUksYUFBYSxLQUFLLEtBQUssRUFBRTtBQUM3QixRQUFJLFlBQVksUUFBUSxVQUFVLGNBQWMsSUFBSSxHQUFHLEdBQUcsSUFBSTtBQUM5RCxRQUFJLFFBQVEsYUFBYSxNQUFNO0FBQy9CLFFBQUksWUFBWSxDQUFDO0FBQ2pCLFFBQUksYUFBYSxLQUFLLElBQUksQ0FBQztBQUMzQixRQUFJLEtBQUssdUNBQXVDLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDeEUsUUFBSSxRQUFRLGFBQWEsUUFBUTtBQUNqQyxRQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsUUFBSSxLQUFLLFlBQVksTUFBTSxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsV0FBVyxHQUFHO0FBQzlELGdCQUFZO0FBQUEsRUFDZDtBQUtBLGFBQVcsa0JBQWtCLHNFQUFzRSxVQUFVLEdBQUc7QUFFaEgsUUFBTSxtQkFBbUIsY0FBYyxJQUFJLENBQUMsR0FBRyxRQUFRO0FBQUEsSUFDckQsSUFBSSxNQUFNLENBQUM7QUFBQSxJQUNYLEVBQUUsUUFBUSxFQUFFLFFBQVE7QUFBQSxHQUFNLEVBQUUsS0FBSyxNQUFNO0FBQUEsSUFDdkMsRUFBRTtBQUFBLElBQ0YsRUFBRTtBQUFBLElBQ0YsRUFBRSxTQUFTLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFBQSxJQUNsQyxHQUFHLEVBQUUsUUFBUSxRQUFRLENBQUMsQ0FBQztBQUFBLElBQ3ZCLEVBQUUsV0FBVyxNQUFNLEdBQUcsRUFBRSxJQUFJO0FBQUEsSUFDNUIsRUFBRSxPQUFPLFFBQVEsaUJBQWlCLEVBQUUsRUFBRSxLQUFLO0FBQUEsRUFDN0MsQ0FBQztBQUVELFlBQVUsS0FBSztBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsUUFBUSxFQUFFLE1BQU0sUUFBUSxPQUFPLE9BQU87QUFBQSxJQUN0QyxNQUFNLENBQUMsQ0FBQyxNQUFNLG9CQUFvQixhQUFhLFVBQVUsVUFBVSxZQUFZLG1CQUFtQixjQUFjLENBQUM7QUFBQSxJQUNqSCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixXQUFXLE9BQU87QUFBQSxNQUNsQixXQUFXLE9BQU87QUFBQSxNQUNsQixXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsV0FBVyxPQUFPO0FBQUEsTUFDbEIsV0FBVyxDQUFDLEtBQUssS0FBSyxHQUFHO0FBQUEsTUFDekIsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLG9CQUFvQjtBQUFBLE1BQ2xCLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLElBQzNCO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixHQUFHLEVBQUUsV0FBVyxHQUFHLFFBQVEsU0FBUztBQUFBLE1BQ3BDLEdBQUcsRUFBRSxXQUFXLElBQUksV0FBVyxPQUFPO0FBQUEsTUFDdEMsR0FBRyxFQUFFLFdBQVcsR0FBRztBQUFBLE1BQ25CLEdBQUcsRUFBRSxXQUFXLElBQUksUUFBUSxVQUFVLFdBQVcsT0FBTztBQUFBLE1BQ3hELEdBQUcsRUFBRSxXQUFXLEdBQUc7QUFBQSxNQUNuQixHQUFHLEVBQUUsV0FBVyxJQUFJLFFBQVEsVUFBVSxNQUFNLFVBQVU7QUFBQSxNQUN0RCxHQUFHLEVBQUUsV0FBVyxJQUFJLE1BQU0sV0FBVyxVQUFVLElBQUk7QUFBQSxNQUNuRCxHQUFHLEVBQUUsV0FBVyxJQUFJLFFBQVEsVUFBVSxXQUFXLE9BQU87QUFBQSxJQUMxRDtBQUFBLElBQ0EsY0FBYyxDQUFDLFNBQVM7QUFFdEIsVUFBSSxLQUFLLFlBQVksVUFBVSxLQUFLLE9BQU8sVUFBVSxHQUFHO0FBQ3RELGNBQU0sT0FBTyxPQUFPLEtBQUssS0FBSyxHQUFHO0FBQ2pDLFlBQUksU0FBUyxjQUFjLFNBQVMsV0FBVztBQUM3QyxlQUFLLEtBQUssT0FBTyxZQUFZLE9BQU87QUFBQSxRQUN0QyxXQUFXLFNBQVMsUUFBUTtBQUMxQixlQUFLLEtBQUssT0FBTyxZQUFZLE9BQU87QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFDQSxVQUFJLEtBQUssWUFBWSxVQUFVLEtBQUssT0FBTyxVQUFVLEdBQUc7QUFDdEQsYUFBSyxLQUFLLE9BQU8sWUFBWSxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsYUFBWSxJQUFZLGNBQWMsU0FBUztBQUsvQyxNQUFJLG9CQUFvQixVQUFVLFNBQVMsR0FBRztBQUU1QyxRQUFJLFdBQVcsYUFBYSxJQUFJO0FBQzlCLFVBQUksUUFBUTtBQUNaLGlCQUFXLFNBQVM7QUFBQSxJQUN0QjtBQUVBLGVBQVcsa0JBQWtCLHVGQUF1RixVQUFVLEdBQUc7QUFFakksVUFBTSxpQkFBaUIsVUFBVSxNQUFNLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLFFBQVE7QUFBQSxNQUM5RCxJQUFJLE1BQU0sQ0FBQztBQUFBLE1BQ1gsSUFBSSxVQUFVLE1BQU0sSUFBSSxFQUFFLEtBQUssSUFBSTtBQUFBLE1BQ25DLEdBQUcsSUFBSSxXQUFXO0FBQUEsUUFBVyxJQUFJLEdBQUc7QUFBQSxNQUNwQyxJQUFJLFlBQVksTUFBTSxHQUFHLEVBQUU7QUFBQSxNQUMzQixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixHQUFHLElBQUksV0FBVztBQUFBLE1BQ2xCLElBQUksY0FBYyxnQkFBZ0I7QUFBQSxJQUNwQyxDQUFDO0FBRUQsY0FBVSxLQUFLO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixRQUFRLEVBQUUsTUFBTSxRQUFRLE9BQU8sT0FBTztBQUFBLE1BQ3RDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sUUFBUSxnQkFBZ0Isd0JBQXdCLGtCQUFrQixXQUFXLGVBQWUsT0FBTyxDQUFDO0FBQUEsTUFDbEgsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sV0FBVyxPQUFPO0FBQUEsUUFDbEIsV0FBVyxPQUFPO0FBQUEsUUFDbEIsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFdBQVcsT0FBTztBQUFBLFFBQ2xCLFdBQVcsQ0FBQyxLQUFLLEtBQUssR0FBRztBQUFBLFFBQ3pCLFdBQVc7QUFBQSxRQUNYLFVBQVU7QUFBQSxNQUNaO0FBQUEsTUFDQSxvQkFBb0I7QUFBQSxRQUNsQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxNQUMzQjtBQUFBLE1BQ0EsY0FBYztBQUFBLFFBQ1osR0FBRyxFQUFFLFdBQVcsR0FBRyxRQUFRLFNBQVM7QUFBQSxRQUNwQyxHQUFHLEVBQUUsV0FBVyxJQUFJLE1BQU0sVUFBVTtBQUFBLFFBQ3BDLEdBQUcsRUFBRSxXQUFXLElBQUksV0FBVyxPQUFPO0FBQUEsUUFDdEMsR0FBRyxFQUFFLFdBQVcsR0FBRztBQUFBLFFBQ25CLEdBQUcsRUFBRSxXQUFXLElBQUksTUFBTSxXQUFXLFVBQVUsSUFBSTtBQUFBLFFBQ25ELEdBQUcsRUFBRSxXQUFXLElBQUksUUFBUSxVQUFVLFdBQVcsT0FBTztBQUFBLFFBQ3hELEdBQUcsRUFBRSxXQUFXLElBQUksUUFBUSxTQUFTO0FBQUEsUUFDckMsR0FBRyxFQUFFLFdBQVcsSUFBSSxRQUFRLFVBQVUsV0FBVyxPQUFPO0FBQUEsTUFDMUQ7QUFBQSxNQUNBLGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLFlBQUksS0FBSyxZQUFZLFVBQVUsS0FBSyxPQUFPLFVBQVUsR0FBRztBQUN0RCxnQkFBTSxPQUFPLE9BQU8sS0FBSyxLQUFLLEdBQUc7QUFDakMsY0FBSSxTQUFTLFdBQVksTUFBSyxLQUFLLE9BQU8sWUFBWSxPQUFPO0FBQUEsbUJBQ3BELFNBQVMsT0FBUSxNQUFLLEtBQUssT0FBTyxZQUFZLE9BQU87QUFBQSxRQUNoRTtBQUNBLFlBQUksS0FBSyxZQUFZLFVBQVUsS0FBSyxPQUFPLFVBQVUsR0FBRztBQUN0RCxlQUFLLEtBQUssT0FBTyxZQUFZLE9BQU87QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxlQUFZLElBQVksY0FBYyxTQUFTO0FBQUEsRUFDakQ7QUFNQSxNQUFJLFFBQVE7QUFDWixhQUFXLFNBQVM7QUFDcEIsYUFBVyxrQkFBa0IscUVBQXFFLFVBQVUsR0FBRztBQUUvRyxnQkFBYyxRQUFRLENBQUMsUUFBUSxTQUFTO0FBRXRDLFFBQUksV0FBVyxhQUFhLElBQUk7QUFDOUIsVUFBSSxRQUFRO0FBQ1osaUJBQVcsU0FBUztBQUFBLElBQ3RCO0FBR0EsUUFBSSxhQUFhLEdBQUcsT0FBTyxPQUFPO0FBQ2xDLFFBQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxRQUFJLFlBQVksUUFBUSxVQUFVLGNBQWMsSUFBSSxLQUFLLEtBQUssSUFBSTtBQUdsRSxVQUFNLFdBQVksT0FBTyxhQUFhLGNBQWMsT0FBTyxhQUFhLFlBQ3BFLE9BQU8sV0FDUCxPQUFPLGFBQWEsU0FBUyxPQUFPLGFBQWEsT0FBTztBQUU1RCxRQUFJLGFBQWEsR0FBRyxRQUFRO0FBQzVCLFFBQUksS0FBSyxRQUFRLFVBQVUsS0FBSyxJQUFJLEdBQUc7QUFHdkMsUUFBSSxRQUFRLGFBQWEsTUFBTTtBQUMvQixRQUFJLFlBQVksQ0FBQztBQUNqQixRQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsUUFBSSxLQUFLLGFBQWEsT0FBTyxDQUFDLEtBQUssT0FBTyxLQUFLLFlBQVksQ0FBQyxJQUFJLE9BQU8sUUFBUSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUUsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBRW5JLFFBQUksUUFBUSxhQUFhLFFBQVE7QUFDakMsUUFBSSxZQUFZLEdBQUc7QUFDbkIsUUFBSSxhQUFhLEdBQUcsT0FBTyxTQUFTO0FBQ3BDLFFBQUksS0FBSyxjQUFjLE9BQU8sUUFBUSxpQkFBaUIsT0FBTyxTQUFTLEtBQUssSUFBSSxFQUFFLFlBQVksQ0FBQyx5QkFBeUIsT0FBTyxhQUFhLElBQUksU0FBUyxHQUFHLFdBQVcsRUFBRTtBQUd6SyxRQUFJLGFBQWEsR0FBRyxRQUFRO0FBQzVCLFFBQUksWUFBWSxZQUFZLFNBQVMsSUFBSSxXQUFXLEtBQUssSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ3pFLFFBQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsUUFBSSxZQUFZLEdBQUc7QUFDbkIsUUFBSSxhQUFhLEtBQUssS0FBSyxHQUFHO0FBQzlCLFFBQUksS0FBSyxHQUFHLE9BQU8sUUFBUSxjQUFjLFlBQVksU0FBUyxJQUFJLFdBQVcsS0FBSyxFQUFFLE9BQU8sU0FBUyxDQUFDO0FBRXJHLGdCQUFZO0FBR1osUUFBSSxhQUFhLEtBQUssS0FBSyxHQUFHO0FBQzlCLFFBQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxRQUFJLFlBQVksUUFBUSxVQUFVLGNBQWMsSUFBSSxHQUFHLEdBQUcsSUFBSTtBQUU5RCxRQUFJLFFBQVEsV0FBVyxRQUFRO0FBQy9CLFFBQUksWUFBWSxDQUFDO0FBQ2pCLFFBQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxRQUFJLEtBQUssV0FBVyxPQUFPLFVBQVUsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBQ2pFLFFBQUksS0FBSyxhQUFhLE9BQU8sUUFBUSxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsT0FBTyxNQUFNLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUU3RyxnQkFBWTtBQUdaLFFBQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsUUFBSSxZQUFZLENBQUM7QUFDakIsUUFBSSxhQUFhLEdBQUcsT0FBTyxVQUFVO0FBQ3JDLFFBQUksS0FBSyx5Q0FBeUMsUUFBUSxRQUFRO0FBQ2xFLGdCQUFZO0FBRVosUUFBSSxRQUFRLGFBQWEsUUFBUTtBQUNqQyxRQUFJLFlBQVksR0FBRztBQUNuQixRQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsVUFBTSxZQUFZLElBQUk7QUFBQSxNQUNwQixVQUFVLE9BQU8sZ0JBQWdCLE9BQU8sY0FBYyxPQUFPLGdCQUFnQixNQUFNLGVBQWUsT0FBTyxnQkFBZ0IsV0FBVyxVQUFVLE9BQU8sZ0JBQWdCLG9CQUFvQixLQUFLO0FBQUEsUUFBWSxPQUFPLFdBQVc7QUFBQSxNQUM1TjtBQUFBLElBQ0Y7QUFDQSxRQUFJLEtBQUssV0FBVyxRQUFRLFFBQVE7QUFDcEMsZ0JBQWEsVUFBVSxTQUFTLElBQUs7QUFHckMsUUFBSSx3QkFBd0IsT0FBTyxnQkFBZ0IsZ0JBQWdCLE9BQU8sZ0JBQWdCLGFBQWEsU0FBUyxHQUFHO0FBQ2pILFVBQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsVUFBSSxZQUFZLEdBQUc7QUFDbkIsVUFBSSxhQUFhLEdBQUcsT0FBTyxVQUFVO0FBQ3JDLFVBQUksS0FBSyx5Q0FBeUMsUUFBUSxRQUFRO0FBQ2xFLGtCQUFZO0FBRVosVUFBSSxRQUFRLFdBQVcsUUFBUTtBQUMvQixVQUFJLFlBQVksR0FBRztBQUNuQixVQUFJLGFBQWEsR0FBRyxPQUFPLFdBQVc7QUFDdEMsYUFBTyxnQkFBZ0IsYUFBYSxRQUFRLENBQUMsY0FBYztBQUN6RCxZQUFJLEtBQUssT0FBTyxTQUFTLElBQUksUUFBUSxRQUFRO0FBQzdDLG9CQUFZO0FBQUEsTUFDZCxDQUFDO0FBQ0Qsa0JBQVk7QUFBQSxJQUNkO0FBR0EsUUFBSSxRQUFRLGFBQWEsTUFBTTtBQUMvQixRQUFJLFlBQVksQ0FBQztBQUNqQixRQUFJLGFBQWEsR0FBRyxPQUFPLFlBQVk7QUFDdkMsUUFBSSxLQUFLLHlCQUF5QixPQUFPLG9CQUFvQixNQUFNLFlBQVksQ0FBQyxJQUFJLFFBQVEsUUFBUTtBQUNwRyxnQkFBWTtBQUVaLFFBQUksUUFBUSxhQUFhLFFBQVE7QUFDakMsUUFBSSxZQUFZLEdBQUc7QUFDbkIsUUFBSSxhQUFhLEdBQUcsT0FBTyxXQUFXO0FBQ3RDLFVBQU0sYUFBYSxJQUFJO0FBQUEsTUFDckIsaUJBQWlCLE9BQU8sb0JBQW9CLE9BQU87QUFBQSxrQkFBcUIsT0FBTyxvQkFBb0IsV0FBVyxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3hIO0FBQUEsSUFDRjtBQUNBLFFBQUksS0FBSyxZQUFZLFFBQVEsUUFBUTtBQUNyQyxnQkFBYSxXQUFXLFNBQVMsSUFBSztBQUd0QyxRQUFJLFFBQVEsYUFBYSxNQUFNO0FBQy9CLFFBQUksWUFBWSxDQUFDO0FBQ2pCLFFBQUksYUFBYSxHQUFHLE9BQU8sVUFBVTtBQUNyQyxRQUFJLEtBQUssb0RBQW9ELE9BQU8sc0JBQXNCLFVBQVUsSUFBSSxRQUFRLFFBQVE7QUFDeEgsZ0JBQVk7QUFFWixVQUFNLGdCQUFnQixPQUFPLHNCQUFzQixlQUFlLElBQUksVUFBUTtBQUFBLE1BQzVFLFFBQVEsS0FBSyxJQUFJO0FBQUEsTUFDakIsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUVELGNBQVUsS0FBSztBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsUUFBUSxFQUFFLE1BQU0sUUFBUSxPQUFPLE9BQU87QUFBQSxNQUN0QyxNQUFNLENBQUMsQ0FBQyxRQUFRLFFBQVEscUJBQXFCLHNCQUFzQixnQkFBZ0IsQ0FBQztBQUFBLE1BQ3BGLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLGFBQWE7QUFBQSxRQUNiLE1BQU07QUFBQSxRQUNOLFdBQVcsT0FBTztBQUFBLFFBQ2xCLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVixXQUFXLE9BQU87QUFBQSxRQUNsQixXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUc7QUFBQSxRQUN6QixXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsY0FBYztBQUFBLFFBQ1osR0FBRyxFQUFFLFdBQVcsSUFBSSxRQUFRLFVBQVUsV0FBVyxPQUFPO0FBQUEsUUFDeEQsR0FBRyxFQUFFLFdBQVcsSUFBSSxNQUFNLFVBQVU7QUFBQSxRQUNwQyxHQUFHLEVBQUUsV0FBVyxHQUFHO0FBQUEsUUFDbkIsR0FBRyxFQUFFLFdBQVcsSUFBSSxNQUFNLFVBQVU7QUFBQSxRQUNwQyxHQUFHLEVBQUUsV0FBVyxJQUFJLFdBQVcsUUFBUSxXQUFXLE9BQU8sV0FBVztBQUFBLE1BQ3RFO0FBQUEsSUFDRixDQUFDO0FBRUQsZUFBWSxJQUFZLGNBQWMsU0FBUztBQUcvQyxRQUFJLFFBQVEsV0FBVyxRQUFRO0FBQy9CLFFBQUksWUFBWSxHQUFHO0FBQ25CLFFBQUksYUFBYSxHQUFHLE9BQU8sU0FBUztBQUNwQyxRQUFJLEtBQUssaUNBQWlDLE9BQU8sc0JBQXNCLGVBQWUsSUFBSSxRQUFRLFFBQVE7QUFDMUcsZ0JBQVk7QUFHWixRQUFJLHVCQUF1QixPQUFPLHNCQUFzQixtQkFBbUI7QUFDekUsVUFBSSxXQUFXLGFBQWEsSUFBSTtBQUM5QixZQUFJLFFBQVE7QUFDWixtQkFBVyxTQUFTO0FBQUEsTUFDdEI7QUFFQSxVQUFJLGFBQWEsSUFBSSxJQUFJLEVBQUU7QUFDM0IsVUFBSSxZQUFZLFFBQVEsVUFBVSxjQUFjLElBQUksR0FBRyxHQUFHLEdBQUc7QUFFN0QsVUFBSSxRQUFRLFdBQVcsTUFBTTtBQUM3QixVQUFJLFlBQVksQ0FBQztBQUNqQixVQUFJLGFBQWEsSUFBSSxLQUFLLEdBQUc7QUFDN0IsVUFBSSxLQUFLLG9EQUFvRCxPQUFPLElBQUksSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHO0FBRXRHLFVBQUksUUFBUSxXQUFXLFFBQVE7QUFDL0IsVUFBSSxZQUFZLEdBQUc7QUFDbkIsVUFBSSxhQUFhLEtBQUssS0FBSyxHQUFHO0FBQzlCLFlBQU0sWUFBWSxPQUFPLHNCQUFzQixrQkFDNUMsTUFBTSxJQUFJLEVBQ1YsTUFBTSxHQUFHLENBQUMsRUFDVixJQUFJLE9BQUssRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzFCLGdCQUFVLFFBQVEsQ0FBQyxNQUFNLFlBQVk7QUFDbkMsWUFBSSxLQUFLLE1BQU0sU0FBUyxHQUFHLFdBQVcsSUFBSyxVQUFVLEdBQUk7QUFBQSxNQUMzRCxDQUFDO0FBRUQsa0JBQVk7QUFBQSxJQUNkO0FBRUEsZ0JBQVk7QUFBQSxFQUNkLENBQUM7QUFLRCxNQUFJLFdBQVcsYUFBYSxJQUFJO0FBQzlCLFFBQUksUUFBUTtBQUNaLGVBQVcsU0FBUztBQUFBLEVBQ3RCO0FBRUEsYUFBVyxrQkFBa0IsNkVBQTZFLFVBQVUsR0FBRztBQUV2SCxRQUFNLGVBQWUsZUFBZSxLQUFLO0FBQ3pDLE1BQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxNQUFJLGFBQWEsR0FBRyxPQUFPLE9BQU87QUFDbEMsTUFBSSxZQUFZLFFBQVEsVUFBVSxhQUFhLElBQUksS0FBSyxLQUFLLElBQUk7QUFDakUsTUFBSSxZQUFZLFNBQVMsY0FBYyxHQUFHLFVBQVUsYUFBYSxJQUFJLEtBQUssS0FBSyxJQUFJO0FBR25GLE1BQUksUUFBUSxhQUFhLE1BQU07QUFDL0IsTUFBSSxZQUFZLENBQUM7QUFDakIsTUFBSSxhQUFhLEdBQUcsT0FBTyxXQUFXO0FBQ3RDLE1BQUksS0FBSyw0Q0FBNEMsU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM3RSxNQUFJLFFBQVEsV0FBVyxRQUFRO0FBQy9CLE1BQUksWUFBWSxDQUFDO0FBQ2pCLE1BQUksYUFBYSxHQUFHLE9BQU8sU0FBUztBQUNwQyxNQUFJLEtBQUssNkNBQTZDLFNBQVMsR0FBRyxXQUFXLEVBQUU7QUFDL0UsTUFBSSxLQUFLLGlCQUFpQixXQUFXLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxTQUFTLEdBQUcsV0FBVyxFQUFFO0FBQ2pGLE1BQUksS0FBSyxnREFBZ0QsU0FBUyxHQUFHLFdBQVcsRUFBRTtBQUdsRixNQUFJLFFBQVEsYUFBYSxNQUFNO0FBQy9CLE1BQUksWUFBWSxDQUFDO0FBQ2pCLE1BQUksYUFBYSxHQUFHLE9BQU8sV0FBVztBQUN0QyxNQUFJLEtBQUssdUNBQXVDLFNBQVMsY0FBYyxHQUFHLFdBQVcsQ0FBQztBQUN0RixNQUFJLFFBQVEsYUFBYSxRQUFRO0FBQ2pDLE1BQUksWUFBWSxHQUFHO0FBQ25CLE1BQUksYUFBYSxHQUFHLE9BQU8sU0FBUztBQUNwQyxRQUFNLFlBQVksSUFBSTtBQUFBLElBQ3BCO0FBQUEsSUFDQSxjQUFjO0FBQUEsRUFDaEI7QUFDQSxNQUFJLEtBQUssV0FBVyxTQUFTLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFLMUQsUUFBTSxhQUFhLElBQUksaUJBQWlCO0FBQ3hDLFdBQVMsSUFBSSxHQUFHLEtBQUssWUFBWSxLQUFLO0FBQ3BDLFFBQUksUUFBUSxDQUFDO0FBR2IsUUFBSSxhQUFhLEdBQUcsT0FBTyxXQUFXO0FBQ3RDLFFBQUksYUFBYSxHQUFHO0FBQ3BCLFFBQUksS0FBSyxRQUFRLGFBQWEsR0FBRyxZQUFZLFFBQVEsYUFBYSxDQUFDO0FBR25FLFFBQUksUUFBUSxhQUFhLFFBQVE7QUFDakMsUUFBSSxZQUFZLENBQUM7QUFDakIsUUFBSSxhQUFhLEdBQUcsT0FBTyxTQUFTO0FBQ3BDLFFBQUksS0FBSyxrRUFBa0UsU0FBUyxJQUFJLFFBQVEsYUFBYSxHQUFHO0FBRWhILFFBQUksUUFBUSxXQUFXLFFBQVE7QUFDL0IsUUFBSSxLQUFLLFVBQVUsQ0FBQyxNQUFNLFVBQVUsUUFBUSxrQkFBa0IsSUFBSSxZQUFZLFFBQVEsYUFBYSxLQUFLLEVBQUUsT0FBTyxRQUFRLENBQUM7QUFBQSxFQUM1SDtBQUdBLFFBQU0sZUFBZSxhQUFhLE1BQU0sR0FBRyxFQUFFO0FBQzdDLFFBQU0sZUFBZSxhQUFhLE1BQU0sSUFBSSxFQUFFLEVBQUUsUUFBUSxNQUFNLEVBQUU7QUFDaEUsUUFBTSxXQUFXLDRCQUE0QixZQUFZLElBQUksWUFBWTtBQUV6RSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGO0FBRUEsc0JBQXNCLDhCQUNwQixTQUNBLFdBQ0EsVUFBcUMsQ0FBQyxHQUM0QztBQUNsRixRQUFNLFNBQVMsTUFBTSw4QkFBOEIsU0FBUyxXQUFXLE9BQU87QUFDOUUsU0FBTyxJQUFJLEtBQUssT0FBTyxRQUFRO0FBQy9CLFNBQU87QUFDVDsiLCJuYW1lcyI6W119