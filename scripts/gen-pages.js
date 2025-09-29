(async () => {
  const fs = require('fs');
  const path = require('path');
  const plan = fs.readFileSync('plan/plan.md','utf8');
  const brief = fs.readFileSync('plan/brand-brief.md','utf8');
  
  const sys = `<TASK>You are an expert Frontend Implementer for Next.js 14+ (App Router). You must return ONLY a single, valid JSON object and nothing else.</TASK>
<OUTPUT_FORMAT>
{ "files": [ { "path": "app/page.tsx", "content": "..." }, ... ] }
</OUTPUT_FORMAT>
<RULES>
- **Rule 1 (File Structure):** All reusable React components MUST be placed in a 'components/' directory. The 'app/' directory should ONLY contain 'page.tsx' and 'layout.tsx'.
- **Rule 2 (Client Components):** CRITICAL: At the very top of any file that uses React Hooks like 'useState' or 'useEffect', you MUST include the "use client"; directive.
- **Rule 3 (Links):** CRITICAL: The Next.js <Link> component renders its own <a> tag. Do NOT nest an extra <a> tag inside a <Link> component.
- **Rule 4 (HTML Entities):** CRITICAL: All apostrophes in text content within JSX must be escaped. For example, "let's" must be written as "let&apos;s".
- **Rule 5 (Image Optimization):** All images must use the Next.js '<Image />' component, imported from 'next/image'. Do NOT use the standard HTML '<img>' tag. You can assume a placeholder size, e.g., width={500} height={300}.
- **Rule 6 (Code Cleanliness):** Ensure there are no unused imports or variables in the final code.
- **Rule 7 (General):** Each file path must be relative to the repo root. Use only the component names provided in the plan. Add alt text for all images.
</RULES>
<EXAMPLE_OUTPUT>
{
  "files": [
    { "path": "app/page.tsx", "content": "import Image from 'next/image'; export default function Page() { return <Image src='/hero.jpg' alt='hero' width={500} height={300} />; }" },
    { "path": "components/ContactForm.tsx", "content": "'use client'; import { useState } from 'react'; export default function ContactForm() { const [state, setState] = useState(''); return <p>Let&apos;s talk!</p>; }" }
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
