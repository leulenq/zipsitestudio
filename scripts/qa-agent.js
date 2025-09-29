(async () => {
  const fs = require('fs');
  const path = require('path');

  const plan = fs.readFileSync('plan/plan.md', 'utf8');
  const brief = fs.readFileSync('plan/brand-brief.md', 'utf8');
  const projectSlug = fs.readFileSync('plan/slug.txt', 'utf8').trim();
  
  let generatedCode = '';
  const siteDir = path.join('sites', projectSlug);

  const readFilesRecursively = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          readFilesRecursively(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
          generatedCode += `\n\n// FILE: ${fullPath}\n\n` + fs.readFileSync(fullPath, 'utf8');
        }
      }
    } catch (error) {
      console.warn(`Could not read directory ${dir}: ${error.message}`);
    }
  };
  
  if (fs.existsSync(siteDir)) readFilesRecursively(siteDir);

  const sys = `<TASK>You are an expert QA Engineer... Return ONLY a single, valid JSON object.</TASK>
<OUTPUT_FORMAT>
{
  "issues_found": true,
  "report": "A markdown-formatted list of all issues found...",
  "score": "A score from 1-10..."
}
</OUTPUT_FORMAT>
<RULES>
- Check if all pages and components from the plan were created.
- Check for code quality issues like unused variables or incorrect component usage.
- Verify that the code structure follows all rules from the original prompt.
- If the code is perfect, return "issues_found": false, an empty "report", and a "score" of 10.
</RULES>`;

  const user = `<PLAN>\n${plan}\n</PLAN>\n\n<BRAND_BRIEF>\n${brief}\n</BRAND_BRIEF>\n\n<GENERATED_CODE>\n${generatedCode}\n</GENERATED_CODE>`;

  const body = {
    model: "openai/gpt-oss-120b",
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: sys }, { role: "user", content: user }]
  };

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`Groq error (QA Agent) ${res.status}: ${await res.text()}`);
  
  const j = await res.json();
  // CHANGED: Replaced optional chaining for better compatibility
  const content = (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '{"issues_found":true, "report":"Error parsing AI response."}';
