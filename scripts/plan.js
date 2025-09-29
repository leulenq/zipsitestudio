(async () => {
  const fs = require('fs');
  const briefData = JSON.parse(fs.readFileSync('brief.json', 'utf8'));

  // Step 1: Extract and clean up the relevant data from Airtable
  const fields = briefData.fields;
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

  // Step 2: Use the clean brief in the prompt
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
    headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
