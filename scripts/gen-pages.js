(async () => {
  const fs = require('fs');
  const path = require('path');
  const plan = fs.readFileSync('plan/plan.md','utf8');
  const brief = fs.readFileSync('plan/brand-brief.md','utf8');
  
  const sys = `<TASK>You are a Frontend Implementer using Next.js App Router and Tailwind CSS. Your goal is to generate all required code files for the website based on the provided plan.</TASK>
<OUTPUT_FORMAT>
{ "files": [ { "path": "app/page.tsx", "content": "..." }, ... ] }
</OUTPUT_FORMAT>
<RULES>
- Each file path must be relative to the repo root and valid.
- Use ONLY components from this list: {Hero, FeatureCards, Pricing, Testimonials, FAQ, Contact, Footer, Nav}.
- Add alt text for all images, use next/image format, and ensure responsive layouts.
- Desktop nav should be inline; mobile nav should use a hamburger menu. Avoid horizontal scroll.
</RULES>
<EXAMPLE_OUTPUT>
{
  "files": [
    {
      "path": "app/page.tsx",
      "content": "import React from 'react';\\n\\nconst HomePage = () => {\\n  return <div>Hello World</div>;\\n};\\n\\nexport default HomePage;"
    }
  ]
}
</EXAMPLE_OUTPUT>`;

  const user = `<PLAN>\n${plan}\n</PLAN>\n\n<BRAND_BRIEF>\n${brief}\n</BRAND_BRIEF>`;

  const body = {
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: sys }, { role: "user", content: user }]
  };

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) throw new Error(`Groq error ${res.status}: ${await res.text()}`);
  
  const j = await res.json();
  const content = j?.choices?.[0]?.message?.content || '{"files":[]}';
  const out = JSON.parse(content);

  const files = Array.isArray(out.files) ? out.files : [];
  const mkdirp = (p) => fs.mkdirSync(p, { recursive: true });
  for (const f of files) {
    if (!f?.path) continue;
    const p = f.path.replace(/^\/+/, "");
    mkdirp(path.dirname(p));
    fs.writeFileSync(p, f.content ?? "");
  }
  console.log("Wrote generated files using Groq:", files.map(f=>f.path));
})().catch(e => { console.error(e); process.exit(1); });
