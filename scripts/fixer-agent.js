(async () => {
  const fs = require('fs');
  const path = require('path');

  // --- 1. Read the QA report and all generated code ---
  const qaReport = JSON.parse(fs.readFileSync('plan/qa-report.json', 'utf8'));
  const projectSlug = fs.readFileSync('plan/slug.txt', 'utf8').trim();
  
  // If no issues were found, do nothing.
  if (!qaReport.issues_found) {
    console.log("QA Agent found no issues. Skipping Fixer Agent.");
    return;
  }

  let generatedCode = '';
  const siteDir = path.join('sites', projectSlug);

  const readFilesRecursively = (dir) => {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          readFilesRecursively(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          generatedCode += `\n\n// FILE: ${fullPath}\n\n` + fs.readFileSync(fullPath, 'utf8');
        }
      }
    } catch (error) {
      console.warn(`Could not read directory ${dir}: ${error.message}`);
    }
  };
  
  if (fs.existsSync(siteDir)) readFilesRecursively(siteDir);

  // --- 2. Define the prompt for the Fixer Agent ---
  const sys = `<TASK>You are an expert Senior Software Engineer. Your task is to fix all the issues listed in the QA Report for the provided code. You must return ONLY a single, valid JSON object containing the corrected file contents.</TASK>
<OUTPUT_FORMAT>
{ "files": [ { "path": "sites/project-slug/app/page.tsx", "content": "..." }, ... ] }
</OUTPUT_FORMAT>
<RULES>
- Only return the files that need to be changed.
- The file content you provide must be complete and correct.
- Ensure your fixes address every issue listed in the QA Report.
- Follow all the original rules for code generation (e.g., correct 'use client' syntax, no nested <a> in <Link>, etc.).
</RULES>`;

  const user = `<QA_REPORT>\n${qaReport.report}\n</QA_REPORT>\n\n<ORIGINAL_CODE>\n${generatedCode}\n</ORIGINAL_CODE>`;

  const body = {
    model: "llama-3.3-70b-versatile", // Using a powerful model for fixing
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: sys }, { role: "user", content: user }]
  };

  // --- 3. Call the API and overwrite the buggy files ---
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`Groq error (Fixer Agent) ${res.status}: ${await res.text()}`);
  
  const j = await res.json();
  const content = (j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '{"files":[]}';
  const out = JSON.parse(content);
  
  const files = Array.isArray(out.files) ? out.files : [];
  if (files.length === 0) {
    console.log("Fixer agent did not return any files to correct.");
    return;
  }

  for (const f of files) {
    if (!f?.path || !f.content) continue;
    // Overwrite the original buggy file with the corrected content
    fs.writeFileSync(f.path, f.content);
    console.log(`Fixed and overwrote file: ${f.path}`);
  }

})().catch(e => { console.error(e); process.exit(1); });
