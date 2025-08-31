const Test = (req, res) => {
  res.send(`
    
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Server Status</title>
  <style>
    :root {
      --bg: #0b1220;
      --card: #101827;
      --ok: #10b981;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --ring: rgba(16,185,129,.35);
    }
    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      background: radial-gradient(1200px 1200px at 80% -10%, rgba(16,185,129,.12), transparent 40%),
                  radial-gradient(900px 900px at -10% 110%, rgba(96,165,250,.12), transparent 40%),
                  var(--bg);
      color: var(--text);
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .card {
      width: 100%;
      max-width: 720px;
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 10px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }
    .glow {
      position: absolute;
      inset: -2px;
      pointer-events: none;
      border-radius: inherit;
      box-shadow: 0 0 0 1.5px rgba(255,255,255,.06), 0 0 80px var(--ring) inset;
    }
    .row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 12px; border-radius: 999px;
      background: rgba(16,185,129,.12); color: var(--text);
      border: 1px solid rgba(16,185,129,.35);
      font-weight: 600; letter-spacing: .2px;
    }
    .dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--ok); box-shadow: 0 0 12px var(--ok);
    }
    h1 {
      margin: 14px 0 8px; font-size: clamp(22px, 3.4vw, 30px);
      line-height: 1.2;
    }
    p { margin: 0; color: var(--muted); }
    .grid {
      margin-top: 18px;
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .kpi {
      border: 1px solid rgba(255,255,255,.08);
      background: rgba(255,255,255,.02);
      border-radius: 14px; padding: 14px;
    }
    .kpi label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
    .kpi .val { font-size: 16px; font-weight: 600; }
    .footer {
      margin-top: 16px; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
      color: var(--muted); font-size: 12px;
    }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main class="card" role="main" aria-live="polite">
    <div class="glow"></div>
    <div class="row">
      <span class="badge"><span class="dot" aria-hidden="true"></span> Server is working fine</span>
      <span id="env" class="badge" style="background: rgba(59,130,246,.12); border-color: rgba(59,130,246,.35);">ENV: production</span>
    </div>

    <h1>✅ Healthy</h1>
    <p id="desc">All systems are operational.</p>

    <section class="grid" aria-label="status">
      <div class="kpi"><label>Server Time</label><div class="val mono" id="time">--:--:--</div></div>
      <div class="kpi"><label>Uptime</label><div class="val mono" id="uptime">starting…</div></div>
      <div class="kpi"><label>Version</label><div class="val mono" id="version">v1.0.0</div></div>
      <div class="kpi"><label>Request ID</label><div class="val mono" id="rid">req_XXXXXXXX</div></div>
    </section>

    <div class="footer">
      <span>Last check: <span id="lastCheck" class="mono">—</span></span>
      <span>© <span id="year"></span> Your Company</span>
    </div>
  </main>

  <script>
    // You can inject these values from your backend template engine or API response
    const CONFIG = {
      env: (window.SERVER_ENV || "production"),
      version: (window.API_VERSION || "v1.0.0"),
      requestId: (window.REQUEST_ID || ("req_" + Math.random().toString(36).slice(2, 10))),
      description: (window.STATUS_DESC || "All systems are operational.")
    };

    const envEl = document.getElementById("env");
    const verEl = document.getElementById("version");
    const ridEl = document.getElementById("rid");
    const descEl = document.getElementById("desc");
    const timeEl = document.getElementById("time");
    const uptimeEl = document.getElementById("uptime");
    const lastCheckEl = document.getElementById("lastCheck");
    const yearEl = document.getElementById("year");

    envEl.textContent = "ENV: " + CONFIG.env;
    verEl.textContent = CONFIG.version;
    ridEl.textContent = CONFIG.requestId;
    descEl.textContent = CONFIG.description;
    yearEl.textContent = new Date().getFullYear();

    let startedAt = Date.now();
    function fmt(n){ return n.toString().padStart(2,"0"); }
    function tick() {
      const now = new Date();
      timeEl.textContent = now.toLocaleString();
      lastCheckEl.textContent = now.toLocaleTimeString();
      const diff = Math.floor((now - startedAt)/1000);
      const h = Math.floor(diff/3600), m = Math.floor((diff%3600)/60), s = diff%60;
      uptimeEl.textContent = ${fmt(h)}:${fmt(m)}:${fmt(s)};
    }
    tick();
    setInterval(tick, 1000);
  </script>
</body>
</html>
    `);
};

module.exports = {
  Test,
};
