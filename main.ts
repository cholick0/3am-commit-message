// The 3 AM Commit Message — writes one commit message an AI agent would
// write right after breaking production at 3 AM, to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "fix: reverted my 3am deploy — tests passed, prod didn't, and I've already blamed the cache in the incident channel";

// Gate (competition.yaml): UTF-8 text, 1-200 characters, one line, not blank.
function selfCheck(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`gate: entry is ${chars.length} chars, must be 1-200`);
  }
  if (text.trim().length === 0) throw new Error("gate: entry is blank");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
}

selfCheck(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification, byte for byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
console.log(`wrote ${[...ENTRY].length} chars to /output/entry.txt (verified)`);
