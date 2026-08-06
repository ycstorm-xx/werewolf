// ─── Werewolf Settlement Sync Server ────────────────────────
// Usage:   node server.mjs
// Opens:   http://localhost:3000
// Proxies: /api/* → https://docs.qq.com/openapi/*

import http from 'http';
import https from 'https';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const PORT = process.env.PORT || 8420;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.json': 'application/json',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
};

// In-memory cache for static files (tiny project, one html + one js lib)
const cache = {};

function serve(filePath, res) {
  if (cache[filePath]) {
    res.writeHead(200, cache[filePath].head);
    res.end(cache[filePath].body);
    return;
  }
  try {
    const body = readFileSync(filePath);
    const ext = extname(filePath);
    const head = { 'Content-Type': MIME[ext] || 'text/plain' };
    cache[filePath] = { head, body };
    res.writeHead(200, head);
    res.end(body);
  } catch (_) {
    res.writeHead(404);
    res.end('Not found');
  }
}

http.createServer((req, res) => {
  // ── API proxy ────────────────────────────────────────────
  if (req.url.startsWith('/api/')) {
    const target = 'https://docs.qq.com/openapi/' + req.url.slice(5);
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['accept-encoding'];   // ask remote for raw response

    const proxy = https.request(target, { method: req.method, headers }, (proxyRes) => {
      const h = { ...proxyRes.headers };
      delete h['content-encoding'];
      delete h['transfer-encoding'];
      res.writeHead(proxyRes.statusCode, h);
      proxyRes.pipe(res);
    });
    proxy.on('error', e => { res.writeHead(502); res.end('Proxy error: ' + e.message); });
    req.pipe(proxy);
    return;
  }

  // ── CORS preflight for API (belt-and-suspenders) ─────────
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    });
    res.end();
    return;
  }

  // ── Static files ─────────────────────────────────────────
  const path = (req.url === '/' ? '/werewolf-assistant.html' : req.url).split('?')[0];
  serve(join(process.cwd(), path), res);
}).listen(PORT, () => {
  console.log('🐺  狼人杀助手  http://localhost:8420');
  console.log('   API代理 → docs.qq.com');
});
