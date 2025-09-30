(async () => {
  const fs = require('fs');
  const path = require('path');
  const plan = fs.readFileSync('plan/plan.md','utf8');
  const brief = fs.readFileSync('plan/brand-brief.md','utf8');
  const projectSlug = fs.readFileSync('plan/slug.txt', 'utf8').trim();

  const sys = `<TASK>You are an expert Frontend Implementer for Next.js 14+ (App Router). You must return ONLY a single, valid JSON object and nothing else.</TASK>
<OUTPUT_FORMAT>
{ "files": [ { "path": "app/page.tsx", "content": "..." }, ... ] }
</OUTPUT_FORMAT>
<RULES>
- **Rule 1 (File Structure):** All reusable React components MUST be placed in a 'sites/${projectSlug}/components/' directory. The 'sites/${projectSlug}/app/' directory should ONLY contain page and layout files.
- **Rule 2 (Client Components):** CRITICAL: The "use client" directive MUST be the string literal "use client"; on the very first line of any file that uses React Hooks. It is NOT an import. DO NOT write 'import { use client } from "react";'.
- **Rule 3 (Links):** CRITICAL: The Next.js <Link> component does NOT need an <a> tag nested inside it.
- **Rule 4 (HTML Entities):** CRITICAL: All apostrophes in text content within JSX must be escaped as '&apos;'.
- **Rule 5 (Image Optimization):** All images must use the Next.js '<Image />' component, imported from 'next/image'. Do NOT use the standard HTML '<img>' tag.
- **Rule 6 (Code Cleanliness):** Ensure there are no unused imports or variables.
- **Rule 7 (Dependencies):** If you use any third-party libraries, you MUST create a file named 'dependencies.json'.
- **Rule 8 (Dependencies Format):** CRITICAL: The 'dependencies.json' file MUST contain a JSON object with a single key "dependencies", which holds an ARRAY of STRINGS. Each string must be a valid npm package name. DO NOT include version numbers.
</RULES>
<EXAMPLE_OUTPUT>
{
  "files": [
    { "path": "sites/example/app/page.tsx", "content": "import { Something } from 'some-package';" },
    { "path": "dependencies.json", "content": "{\\"dependencies\\": [\\"some-package\\", \\"@fortawesome/react-fontawesome\\"]}" }
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
  const content = (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '{"files":[]}';
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
