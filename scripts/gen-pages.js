(async () => {
  const fs = require('fs');
  const path = require('path');
  const plan = fs.readFileSync('plan/plan.md','utf8');
  const brief = fs.readFileSync('plan/brand-brief.md','utf8');
  const projectSlug = fs.readFileSync('plan/slug.txt', 'utf8').trim();

  // Updated Prompt with stricter linting rules
  const sys = `<TASK>You are an expert Frontend Implementer for Next.js 14+ (App Router), focusing on production-ready code. You must return ONLY a single, valid JSON object and nothing else.</TASK>
<OUTPUT_FORMAT>
{ "files": [ { "path": "app/page.tsx", "content": "..." }, ... ] }
</OUTPUT_FORMAT>
<RULES>
- **Rule 1 (File Structure):** All reusable React components MUST be placed in a 'sites/${projectSlug}/components/' directory. The 'sites/${projectSlug}/app/' directory should ONLY contain page and layout files.
- **Rule 2 (Client Components):** CRITICAL: The "use client" directive MUST be the string literal "use client"; on the very first line of any file that uses React Hooks. It is NOT an import.
- **Rule 3 (Links):** CRITICAL: The Next.js <Link> component renders its own <a> tag. Do NOT nest an extra <a> tag inside a <Link> component.
- **Rule 4 (HTML Entities):** CRITICAL: All apostrophes (') in text content within JSX MUST be escaped as '&apos;'. Check all text carefully.
- **Rule 5 (Image Optimization):** CRITICAL: All images MUST use the Next.js '<Image />' component, imported from 'next/image'. Provide 'width' and 'height' props (e.g., width={500} height={300}). Do NOT use the standard HTML '<img>' tag.
- **Rule 6 (Code Cleanliness):** CRITICAL: Ensure there are absolutely NO unused imports or variables in the final code. Remove any imports or variables that are defined but not used.
- **Rule 7 (Dependencies):** CRITICAL: If and only if you use icons from '@fortawesome/react-fontawesome', you MUST create a 'dependencies.json' file. This file's content must be a JSON object with a single key "dependencies", which holds an array listing these three exact strings: "@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", and "@fortawesome/react-fontawesome". Do not invent, add, or include any other packages or version numbers.
- **Rule 8 (React Imports):** Do not explicitly import 'React' (e.g., 'import React from "react";') unless absolutely necessary for specific advanced features. Next.js handles this automatically.
</RULES>`;

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
