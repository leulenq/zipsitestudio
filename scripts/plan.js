(async () => {
  const fs = require('fs');
  const brief = JSON.parse(fs.readFileSync('brief.json','utf8'));
  const sys = `You are the Web Planning Lead for ZipSite Studio. Return ONLY JSON in this schema: { "planMd": "...", "brandBriefMd":"..." }`;

  const body = {
    model: "llama-3.1-8b-instant", // CHANGED
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: sys }, { role: "user", content: JSON.stringify(brief) }]
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
