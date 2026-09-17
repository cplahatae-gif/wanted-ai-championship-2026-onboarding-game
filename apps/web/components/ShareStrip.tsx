"use client";

import { useState } from "react";

const DEMO_URL = "https://first-quest-iota.vercel.app/demo";

export function ShareStrip() {
  const [copied, setCopied] = useState(false);

  return (
    <div
      data-testid="landing-share-strip"
      style={{
        marginTop: 28,
        padding: "12px 16px",
        background: "var(--fq-surface)",
        borderRadius: 8,
        border: "1px solid var(--fq-border)",
        maxWidth: 520,
      }}
    >
      <span className="fq-chip">가상 회사 Neulbom · PII 금지</span>
      <p style={{ margin: "10px 0 8px", fontSize: "0.9rem", color: "var(--fq-muted)" }}>
        PDF 대신 플레이 — 30초 데모 링크
      </p>
      <button
        type="button"
        className="fq-btn fq-btn-ghost"
        data-testid="landing-copy-demo-link"
        onClick={() => {
          void navigator.clipboard.writeText(DEMO_URL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? "복사됨" : "데모 URL 복사"}
      </button>
    </div>
  );
}
