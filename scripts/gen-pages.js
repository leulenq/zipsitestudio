(async () => {
  const fs = require('fs');
  const path = require('path');

  const plan = fs.readFileSync('plan/plan.md','utf8');
  const brief = fs.readFileSync('plan/brand-brief.md','utf8');

  const sys = `You are a Frontend Implementer. Use our Next.js App Router + Tailwind + shadcn/ui template.
Return ONLY JSON:
{ "files": [ { "path": "app/(pages)/index/page.tsx", "content": "..." }, ... ] }
Rules:
- Create pages/components per the plan.
- Use ONLY {Hero, FeatureCards, Pricing, Testimonials, FAQ, Contact, Footer, Nav}.
- Add alt text; desktop nav inline, mobile hamburger; avoid horizontal scroll.
- No new npm dependencies. If something is missing, include /CHECKLIST.md with TODOs.`;

  const user = `/plan/plan.md
${plan}

  /plan/brand-brief.md
${brief}`;

  const body = {
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: sys },
      { role: "user", content: user }
    ]
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const j = await res.json();
  const content = j?.choices?.[0]?.message?.content || '{"files":[]}';
  let out; try { out = JSON.parse(content); } catch { throw new Error("Model did not return JSON"); }

  const files = Array.isArray(out.files) ? out.files : [];
  const mkdirp = (p) => fs.mkdirSync(p, { recursive: true });

  for (const f of files) {
    if (!f?.path) continue;
    const p = f.path.replace(/^\/+/, "");
    mkdirp(path.dirname(p));
    fs.writeFileSync(p, f.content ?? "");
  }

  // keep plan files tracked
  mkdirp("plan");
  fs.writeFileSync("plan/.keep","");
})().catch(e => { console.error(e); process.exit(1); });
