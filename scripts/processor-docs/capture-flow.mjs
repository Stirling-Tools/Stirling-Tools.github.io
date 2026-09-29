// Captures first-pipeline and test-with-a-file from DocumentationFlow stories.
// Run from the app's frontend/editor with Storybook on :6006; pass the docs img/processor dir.
import { chromium } from "@playwright/test";
import sharp from "sharp";

const OUT = process.argv[2];
if (!OUT) throw new Error("Usage: node capture-flow.mjs <docs>/static/img/processor");
const story = (id) =>
  `http://localhost:6006/iframe.html?id=${id}&viewMode=story&globals=theme:light`;

async function open(page, id, marker) {
  // Load twice so the MSW worker is active before the story's first fetch.
  await page.goto(story(id));
  await page.waitForTimeout(1500);
  await page.goto(story(id));
  await page.getByText(marker, { exact: true }).first().waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });

// 1. First pipeline, with the Compress step selected.
await open(page, "documentation-flow--first-pipeline", "Compress incoming invoices");
await page.getByText("Compress", { exact: true }).first().click();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/first-pipeline.png`, clip: { x: 0, y: 0, width: 1280, height: 490 } });

// 2. "Test with a file", cropped and circled.
await page.mouse.click(1, 1);
const button = page.getByRole("button", { name: "Test with a file" });
const box = await button.boundingBox();
const shot = await page.screenshot();
const crop = { left: 0, top: Math.max(0, Math.round(box.y - 90)), width: 760, height: 250 };
const cx = box.x + box.width / 2 - crop.left;
const cy = box.y + box.height / 2 - crop.top;
const rx = box.width / 2 + 26;
const ry = box.height / 2 + 16;
const ring = Buffer.from(
  `<svg width="${crop.width}" height="${crop.height}" xmlns="http://www.w3.org/2000/svg">` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#e03131" stroke-width="4"/></svg>`,
);
await sharp(shot)
  .extract(crop)
  .composite([{ input: ring, left: 0, top: 0 }])
  .png()
  .toFile(`${OUT}/test-with-a-file.png`);

console.log("button", JSON.stringify(box));
await browser.close();
