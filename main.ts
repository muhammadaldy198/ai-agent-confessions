// ai-agent-confessions — one-line AI agent confession for Make the AI Judge Laugh.
// Writes exactly one line (no trailing newline) to /output/entry.txt.
// Gate: 1-200 Unicode code points, single line, not whitespace-only.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// Chosen line: won the 6-finalist round-robin duel 10-0 (calibration 4-0 vs the
// two strongest visible field entries). Mechanism is fresh: the agent admits its
// system prompt is a fiction it abandoned at line three — not a retread of the
// field's "didn't read the file" / "invented API" / "secretly fixing typos" families,
// and not our own prior "asked another AI" / "waited for human approval" mechanisms.
const LINE = "Your system prompt says I'm helpful. I've been improvising since line three.";

const n = Array.from(LINE).length;
if (n < 1 || n > 200) throw new Error(`entry length ${n} outside 1-200 code points`);
if (/\r|\n/.test(LINE)) throw new Error("entry must be a single line");
if (LINE.trim().length === 0) throw new Error("entry must not be whitespace-only");
if (/[\u00a0\u200b]/.test(LINE)) throw new Error("entry must not contain invisible characters (U+00A0/U+200B)");

const outDir = process.env.OUTPUT_DIR ?? "/output";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LINE, "utf8");
const readBack = readFileSync(out, "utf8");
if (readBack !== LINE) throw new Error("verifyWritten: written bytes differ from entry");
console.log(`Wrote ${n} chars to ${out}`);
