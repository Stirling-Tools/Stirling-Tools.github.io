// Captures processor-home.gif from the DocumentationHome story, stepping a fake clock so frames are evenly spaced.
// Run from the app's frontend/editor with Storybook on :6006 and ffmpeg on PATH; pass the docs img/processor dir.
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const OUT = process.argv[2];
if (!OUT) throw new Error("Usage: node capture-home.mjs <docs>/static/img/processor");
const url = "http://localhost:6006/iframe.html?id=documentation-home--flow&viewMode=story&globals=theme:light";
const FPS = 20;
const FRAMES = 120;
// Half speed: each frame advances the page clock by half a frame, so the flow reads calmly.
const SPEED = 0.5;
// The last FADE frames crossfade into the first ones, so the loop has no visible jump.
const FADE = 12;
const frames = fs.mkdtempSync(path.join(os.tmpdir(), "processor-home-"));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.clock.install();
await page.goto(url);
await page.getByText("Supplier invoices", { exact: true }).waitFor({ timeout: 30000 });
await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 1000);
// Let documents fill the wires before the first frame.
await page.clock.runFor(8000);

const box = await page.locator(".portal-pf").boundingBox();
const pad = 16;
const clip = { x: box.x - pad, y: box.y - pad, width: box.width + pad * 2, height: box.height + pad * 2 };
for (let i = 0; i < FRAMES; i++) {
  await page.clock.runFor((1000 / FPS) * SPEED);
  const file = path.join(frames, `f${String(i).padStart(3, "0")}.png`);
  await page.screenshot({ path: file, clip, animations: "disabled" });
}
await browser.close();

const mid = FRAMES - FADE;
const graph = [
  "[0]split=3[a][b][c]",
  `[a]trim=start_frame=${mid},setpts=PTS-STARTPTS[tail]`,
  `[b]trim=end_frame=${FADE},setpts=PTS-STARTPTS[head]`,
  `[tail][head]blend=all_expr='A*(1-N/${FADE})+B*(N/${FADE})'[fade]`,
  `[c]trim=start_frame=${FADE}:end_frame=${mid},setpts=PTS-STARTPTS[body]`,
  "[fade][body]concat=n=2:v=1:a=0,split[x][y]",
  "[x]palettegen=stats_mode=full[p]",
  "[y][p]paletteuse=dither=none:diff_mode=rectangle",
].join(";");
const gif = path.join(OUT, "processor-home.gif");
execFileSync("ffmpeg", ["-y", "-v", "error", "-framerate", String(FPS), "-i", path.join(frames, "f%03d.png"),
  "-filter_complex", graph, "-loop", "0", gif]);
fs.rmSync(frames, { recursive: true, force: true });
console.log("wrote", gif, fs.statSync(gif).size, "bytes");
