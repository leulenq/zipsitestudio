(async () => {
  const fs = require('fs');

  const brief = JSON.parse(fs.readFileSync('brief.json','utf8'));

  const sys = `You are the Web Planning Lead for ZipSite Studio.
Return ONLY JSON with this schema:
{
  "planMd": "markdown for /plan/plan.md",
  "brandBriefMd": "markdown for /plan/brand-brief.md"
}
- planMd: sitemap, per-page sections (H1/H2 + bullets), component list (only {Hero, FeatureCards, Pricing, Testimonials, FAQ, Contact, Footer, Nav}), SEO (title/meta/5 keywords/page), accessibility checklist.
- brandBriefMd: brand voice, tone, color guidance with contrast notes, imagery guidance aligned to "Imagery style".`;

  const body = {
    model: "deepseek-chat", // CHANGED
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: sys },
      { role: "user", content: JSON.stringify(brief) }
    ]
  };

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", { // CHANGED
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`, "Content-Type":"application/json" }, // CHANGED
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`DeepSeek error ${res.status}: ${t}`); // CHANGED
  }

  const j = await res.json();
  const content = j?.choices?.[0]?.message?.content || "{}";
  let out; try { out = JSON.parse(content); } catch { throw new Error("Model did not return JSON"); }

  require('fs').mkdirSync('plan', { recursive: true });
  fs.writeFileSync('plan/plan.md', out.planMd || "# Plan\n");
  fs.writeFileSync('plan/brand-brief.md', out.brandBriefMd || "# Brand Brief\n");
  console.log("Wrote plan files using DeepSeek."); // Added console log for clarity
})().catch(e => { console.error(e); process.exit(1); });
