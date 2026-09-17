"use client";

import type { CompletionReport } from "@/game/completionReport";
import { formatReportText } from "@/game/completionReport";

export function CompletionReportPanel({ report }: { report: CompletionReport }) {
  return (
    <section
      className="fq-dialogue-panel"
      data-testid="demo-completion-report"
      style={{ marginTop: 12 }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: "1rem" }}>Day 0 완료 리포트</h2>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        {report.companyName} · 미션 {report.missionsComplete}/{report.missionsTotal} · 퀴즈{" "}
        {report.quizScore}/{report.quizMax}
      </p>
      <ul style={{ fontSize: "0.85rem", paddingLeft: 18, margin: "8px 0" }}>
        {report.checklist.map((item) => (
          <li key={item.label} style={{ color: item.done ? "var(--fq-accent)" : "var(--fq-muted)" }}>
            {item.done ? "✓" : "○"} {item.label}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="fq-btn fq-btn-ghost"
        data-testid="demo-report-copy"
        style={{ fontSize: "0.85rem", padding: "6px 12px" }}
        onClick={() => void navigator.clipboard.writeText(formatReportText(report))}
      >
        리포트 텍스트 복사
      </button>
    </section>
  );
}
