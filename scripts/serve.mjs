// Minimal static server for local preview: `npm start` then open :3000.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'build');
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.mp4': 'video/mp4', '.txt': 'text/plain',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, urlPath);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    const withIndex = path.join(root, urlPath, 'index.html');
    file = fs.existsSync(withIndex) ? withIndex : path.join(root, '404.html');
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(fs.existsSync(file) ? (file.endsWith('404.html') ? 404 : 200) : 404,
    { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res).on('error', () => res.end());
}).listen(PORT, () => console.log(`Serving ${root} on http://localhost:${PORT}`));
