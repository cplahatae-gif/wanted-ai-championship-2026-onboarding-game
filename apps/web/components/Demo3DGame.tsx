"use client";

import { parseGamePack } from "gamepack-schema";
import neulbomFixture from "gamepack-schema/fixtures/neulbom-labs.json";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Demo3DGame() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [poiMessage, setPoiMessage] = useState<string | null>(null);
  const [webglError, setWebglError] = useState<string | null>(null);

  useEffect(() => {
    const pack = parseGamePack(neulbomFixture);
    let handle: { dispose: () => void } | undefined;
    void import("@/game-3d/mountOffice3d")
      .then(({ mountOffice3d }) => {
        if (!parentRef.current) return;
        try {
          handle = mountOffice3d(parentRef.current, pack, (poiId, label) => {
            setPoiMessage(`${label} (${poiId}) · E 상호작용 스텁 — 2D 퀘스트와 POI id 공유`);
          });
        } catch {
          setWebglError("WebGL을 사용할 수 없습니다. /demo 2D를 이용하세요.");
        }
      })
      .catch(() => setWebglError("3D 모듈 로드 실패"));
    return () => handle?.dispose();
  }, []);

  return (
    <main data-testid="demo-3d-main" style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <Link href="/demo" style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        ← 2D Neulbom
      </Link>
      <h1 style={{ margin: "8px 0" }}>Neulbom 3D POC</h1>
      <p style={{ fontSize: "0.85rem", color: "var(--fq-muted)" }}>
        WASD/방향키 이동 · POI에 가까이 가면 퀘스트 id 연동
      </p>
      {webglError && <p data-testid="demo-3d-fallback">{webglError}</p>}
      <div ref={parentRef} style={{ minHeight: 360, marginTop: 8 }} />
      {poiMessage && (
        <p data-testid="demo-3d-poi-prompt" className="fq-dialogue-panel" style={{ marginTop: 8 }}>
          {poiMessage}
        </p>
      )}
    </main>
  );
}
