import type { SourceChunk } from "./types";

const MAX_DOC_BYTES = 512_000;

export function assertDocumentSize(byteLength: number): void {
  if (byteLength === 0) {
    throw new Error("빈 문서는 업로드할 수 없습니다.");
  }
  if (byteLength > MAX_DOC_BYTES) {
    throw new Error("문서가 너무 큽니다. 500KB 이하 fictional 샘플만 사용하세요.");
  }
}

export function chunkMarkdown(text: string): SourceChunk[] {
  const sections = text.split(/^##\s+/m).filter(Boolean);
  if (sections.length === 0) {
    return [{ id: "chunk-1", heading: "본문", text: text.trim() }];
  }
  return sections.map((block, index) => {
    const lines = block.split("\n");
    const heading = lines[0]?.trim() || `섹션 ${index + 1}`;
    const body = lines.slice(1).join("\n").trim();
    return {
      id: `chunk-${index + 1}`,
      heading,
      text: body || heading,
    };
  });
}

export function extractPdfPlainText(bytes: Uint8Array): string {
  const raw = new TextDecoder("latin1").decode(bytes);
  const parts: string[] = [];
  const re = /\(([^\\)]{3,200})\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    const segment = match[1]?.replace(/\\n/g, "\n").trim();
    if (segment && /[a-zA-Z가-힣]/.test(segment)) {
      parts.push(segment);
    }
  }
  if (parts.length === 0) {
    throw new Error("PDF에서 텍스트를 추출하지 못했습니다. MD 샘플을 사용하세요.");
  }
  return parts.join("\n");
}

export function parseUploadedDocument(
  name: string,
  bytes: Uint8Array,
): { text: string; chunks: SourceChunk[] } {
  assertDocumentSize(bytes.length);
  const lower = name.toLowerCase();
  let text: string;
  if (lower.endsWith(".pdf")) {
    text = extractPdfPlainText(bytes);
  } else {
    text = new TextDecoder("utf-8").decode(bytes);
  }
  const chunks = chunkMarkdown(text);
  return { text, chunks };
}
