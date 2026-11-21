import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Runs the Vercel-style functions in /api inside the Vite dev and preview servers,
// so the contact form and the admin panel work locally exactly as they do on Vercel.
function localApi() {
  const handle = (load) => async (req, res, next) => {
    if (!req.url.startsWith('/api/')) return next();
    const url = new URL(req.url, 'http://localhost');
    const route = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');
    const file = path.resolve('api', `${route}.js`);
    if (!route || route.split('/').some((p) => p.startsWith('_') || p === '..') || !fs.existsSync(file)) {
      res.statusCode = 404;
      return res.end('Not found');
    }
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try {
      req.body = raw && (req.headers['content-type'] || '').includes('json') ? JSON.parse(raw) : raw;
    } catch {
      req.body = raw;
    }
    req.query = Object.fromEntries(url.searchParams);
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return res; };
    try {
      const mod = await load(file);
      await mod.default(req, res);
    } catch (e) {
      console.error(e);
      if (!res.writableEnded) res.status(500).json({ error: 'Server error' });
    }
  };
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(handle((f) => server.ssrLoadModule(f)));
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle((f) => import(pathToFileURL(f).href)));
    },
  };
}

export default defineConfig(({ mode }) => {
  // Make .env / .env.local values (ADMIN_PASSWORD, RESEND_API_KEY...) visible to the local API.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [react(), localApi()],
    server: { port: 5190, watch: { ignored: ['**/.data/**'] } },
  };
});
