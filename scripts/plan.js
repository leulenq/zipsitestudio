(async () => {
  const fs = require('fs');
  const brief = JSON.parse(fs.readFileSync('brief.json','utf8'));

  const sys = `<TASK>You are the Web Planning Lead for ZipSite Studio. You must return ONLY a single, valid JSON object.</TASK>
<OUTPUT_FORMAT>
{
  "planMd": "...",
  "brandBriefMd":"..."
}
</OUTPUT_FORMAT>
<RULES>
- planMd: sitemap (pages list), per-page sections (H1/H2 + 4-6 bullets), component list (only {Hero, FeatureCards, Pricing, Testimonials, FAQ, Contact, Footer, Nav}), SEO (title/meta/5 keywords/page), accessibility checklist (alt, contrast, focus order).
- brandBriefMd: brand voice (tone), short color palette with hex values and contrast notes, imagery directives.
- Keep content implementation-ready and concise.
</RULES>`;

  const user = `<CLIENT_BRIEF>${JSON.stringify(brief)}</CLIENT_BRIEF>`;
  
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
  const content = j?.choices?.[0]?.message?.content || "{}";
  const out = JSON.parse(content);
  
  fs.mkdirSync('plan', { recursive: true });
  fs.writeFileSync('plan/plan.md', out.planMd || "# Plan\n");
  fs.writeFileSync('plan/brand-brief.md', out.brandBriefMd || "# Brand Brief\n");
  console.log("Wrote plan files using Groq.");
})().catch(e => { console.error(e); process.exit(1); });
