(async () => {
  const fs = require('fs');
  const path = require('path');
  const plan = fs.readFileSync('plan/plan.md','utf8');
  const brief = fs.readFileSync('plan/brand-brief.md','utf8');

  const prompt = `You are a Frontend Implementer using Next.js App Router and Tailwind CSS. Based on the following plan and brand brief, return ONLY a valid JSON object.
Plan:
${plan}

Brand Brief:
${brief}

JSON Schema to follow:
{ "files": [ { "path": "app/page.tsx", "content": "..." }, ... ] }
Rules:
- Use only these components: Hero, FeatureCards, Pricing, Testimonials, FAQ, Contact, Footer, Nav.
- Add alt text and ensure responsive layouts. No new npm dependencies.`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  };
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`; // CHANGED

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${await res.text()}`);
  
  const j = await res.json();
  const content = j?.candidates?.[0]?.content?.parts?.[0]?.text || '{"files":[]}';
  const out = JSON.parse(content);

  const files = Array.isArray(out.files) ? out.files : [];
  const mkdirp = (p) => fs.mkdirSync(p, { recursive: true });
  for (const f of files) {
    if (!f?.path) continue;
    const p = f.path.replace(/^\/+/, "");
    mkdirp(path.dirname(p));
    fs.writeFileSync(p, f.content ?? "");
  }
  console.log("Wrote generated files using Gemini:", files.map(f=>f.path));
})().catch(e => { console.error(e); process.exit(1); });
