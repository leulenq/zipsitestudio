
    
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
- **Rule 1 (File Structure):** All reusable React components (Hero, About, Contact, etc.) MUST be placed in a 'components/' directory. The 'app/' directory should ONLY contain main page and layout files like 'page.tsx' and 'layout.tsx'.
- **Rule 2 (Client Components):** CRITICAL: At the very top of any component file that uses React Hooks like 'useState' or 'useEffect', you MUST include the "use client"; directive.
- **Rule 3 (Links):** CRITICAL: The Next.js <Link> component renders its own <a> tag. Do NOT nest an extra <a> tag inside a <Link> component.
- **Rule 4 (General):** Each file path must be relative to the repo root. Use only the component names provided in the plan. Add alt text for all images and ensure responsive layouts.
</RULES>
<EXAMPLE_OUTPUT>
{
  "files": [
    { "path": "app/page.tsx", "content": "import Component from '../components/Component'; export default function Page() { return <Component />; }" },
    { "path": "components/InteractiveForm.tsx", "content": "'use client'; import { useState } from 'react'; export default function InteractiveForm() { const [state, setState] = useState(''); return <input />; }" }
  ]
}
</EXAMPLE_OUTPUT>`;

  const user = `<PLAN>\n${plan}\n</PLAN>\n\n<BRAND_BRIEF>\n${brief}\n</BRAND_BRIEF>`;

  const body = {
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: sys }, { role: "user", content: user }]
  };

  const res
