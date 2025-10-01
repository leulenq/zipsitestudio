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
- **Rule 2 (Client Components):** CRITICAL: The "use client" directive MUST be the string literal "use client"; on the very first line of any file that uses React Hooks. It is NOT an import.
- **Rule 3 (Links):** CRITICAL: The Next.js <Link> component does NOT need an <a> tag nested inside it.
- **Rule 4 (HTML Entities):** CRITICAL: All apostrophes in text content within JSX must be escaped as '&apos;'.
- **Rule 5 (Image Optimization):** All images must use the Next.js '<Image />' component, imported from 'next/image'.
- **Rule 6 (Code Cleanliness):** Ensure there are no unused imports or variables.
- **Rule 7 (Dependencies):** CRITICAL: If and only if you use icons from '@fortawesome/react-fontawesome', you MUST create a 'dependencies.json' file. This file's content must be a JSON object with a single key "dependencies", which holds an array listing these three exact strings: "@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", and "@fortawesome/react-fontawesome". Do not invent, add, or include any other packages.
</RULES>`;

  const user = `<PLAN>\n${plan}\n</PLAN>\n\n<BRAND_BRIEF>\n${brief}\n</BRAND_BRIEF>`;

  const body = {
    model: "llama-3.3-70b-versatile",
    response_format
