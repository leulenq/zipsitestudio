(async () => {
  const fs = require('fs');
  const brief = JSON.parse(fs.readFileSync('brief.json','utf8'));
  
  const prompt = `You are the Web Planning Lead for ZipSite Studio. Based on the following client brief, return ONLY a valid JSON object.
Client Brief:
${JSON.stringify(brief)}

JSON Schema to follow:
{
  "planMd": "markdown for /plan/plan.md. Include sitemap, per-page sections (H1/H2 + bullets), component list (only {Hero, FeatureCards, Pricing, Testimonials, FAQ, Contact, Footer, Nav}), SEO (title/meta/5 keywords/page), accessibility checklist.",
  "brandBriefMd": "markdown for /plan/brand-brief.md. Include brand voice, tone, color guidance with contrast notes, imagery guidance."
}`;

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
  const content = j?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const out = JSON.parse(content);
  
  fs.mkdirSync('plan', { recursive: true });
  fs.writeFileSync('plan/plan.md', out.planMd || "# Plan\n");
  fs.writeFileSync('plan/brand-brief.md', out.brandBriefMd || "# Brand Brief\n");
  console.log("Wrote plan files using Gemini.");
})().catch(e => { console.error(e); process.exit(1); });
