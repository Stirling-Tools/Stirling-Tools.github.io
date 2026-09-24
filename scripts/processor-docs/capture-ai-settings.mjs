// Captures static/img/ai/connection-modes.png from the DocumentationAiSettings story.
// Run from the app's frontend/editor with Storybook on :6006; pass the docs img/ai dir.
import { chromium } from "@playwright/test";

const OUT = process.argv[2];
const url =
  "http://localhost:6006/iframe.html?id=documentation-aisettings--cloud-mode&viewMode=story&globals=theme:light";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
// Load twice so the MSW worker is active before the section's first fetch.
await page.goto(url);
await page.waitForTimeout(1500);
await page.goto(url);
await page.getByText("Let Stirling Cloud keep indexed documents").first().waitFor({ timeout: 30000 });
await page.waitForTimeout(1200);
// From the Connection heading to the bottom of the About notice below the three modes.
const rect = await page.evaluate(() => {
  const heading = document.getElementById("adminAiGeneral").getBoundingClientRect();
  let note = [...document.querySelectorAll("*")].find((el) => el.textContent.trim() === "About Stirling Cloud AI");
  while (note && note.getBoundingClientRect().width < 700) note = note.parentElement;
  const bottom = note.getBoundingClientRect().bottom;
  return { x: 0, y: Math.max(0, heading.top - 10), width: 792, height: bottom - heading.top + 44 };
});
await page.screenshot({ path: `${OUT}/connection-modes.png`, clip: rect });
console.log("clip", JSON.stringify(rect));
await browser.close();
