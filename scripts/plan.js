(async () => {
  const fs = require('fs');
  const briefData = JSON.parse(fs.readFileSync('brief.json', 'utf8'));
  const fields = briefData.fields;

  // Step 1: Automatically generate the project slug from the company name
  const companyName = fields['Company name'] || 'default-project';
  const projectSlug = companyName
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');      // Replace multiple - with single -
  
  // Save the generated slug for the next script to use
  fs.mkdirSync('plan', { recursive: true });
  fs.writeFileSync('plan/slug.txt', projectSlug);

  // Step 2: Create a clean brief for the AI
  const cleanBrief = `
    Company Name: ${fields['Company name'] || 'Not provided'}
    Company Description: ${fields['Company description'] || 'Not provided'}
    Project Goal: ${fields['Project Goal'] || 'Not provided'}
    Required Pages: ${fields['Pages'] ? fields['Pages'].join(', ') : 'Not provided'}
    Brand Tone & Style: ${fields['Brand assets'] || 'Not provided'}
    Imagery Style: ${fields['Imagery style'] || 'Not provided'}
    Key Call-to-Action: ${fields['Call-to-Action'] || 'Not provided'}
    Reference Websites: ${fields['References'] || 'Not provided'}
    Pages Rough Draft: ${fields['Pages rough draft'] || 'Not provided'}
  `;

  const sys = `<TASK>You are the Web Planning Lead for ZipSite Studio. You must return ONLY a single, valid JSON object.</TASK>
<OUTPUT_FORMAT>
{
  "planMd": "A detailed markdown-formatted project plan.",
  "brandBriefMd": "A detailed markdown-formatted brand brief."
}
</OUTPUT_FORMAT>
<RULES>
- Base your response entirely on the user-provided Client Brief.
- planMd: Create a sitemap, per-page sections with H1/H2 and bullet points, a list of required components, and SEO guidance.
- brandBriefMd: Define the brand voice, tone, a color palette, and guidance on imagery.
</RULES>`;

  const user = `<CLIENT_BRIEF>${cleanBrief}</CLIENT_BRIEF>`;
  
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
  const content = j?.choices?[0]?.message?.content || "{}";
  const out = JSON.parse(content);
  
  fs.writeFileSync('plan/plan.md', out.planMd || "# Plan\n");
  fs.writeFileSync('plan/brand-brief.md', out.brandBriefMd || "# Brand Brief\n");
  console.log("Wrote plan files using Groq.");
})().catch(e => { console.error(e); process.exit(1); });
