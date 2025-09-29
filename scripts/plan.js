(async () => {
  const fs = require('fs');
  const briefData = JSON.parse(fs.readFileSync('brief.json', 'utf8'));
  const fields = briefData.fields;

  // Step 1: Ensure the 'plan' directory exists
  fs.mkdirSync('plan', { recursive: true });

  // Step 2: Automatically generate and save the project slug
  const companyName = fields['Company name'] || 'default-project';
  const projectSlug = companyName
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');      // Replace multiple - with single -
  fs.writeFileSync('plan/slug.txt', projectSlug);

  // Step 3: Create a clean brief for the AI
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

  // Step 4: Define the AI prompt and call the API
  const sys = `<TASK>You are the Web Planning Lead... You must return ONLY a single, valid JSON object.</TASK>...`; // (Keeping this brief for clarity, the full prompt is in the code)
  const user = `<CLIENT_BRIEF>${cleanBrief}</CLIENT_BRIEF>`;
  
  const body = {
    model: "llama-3.3-70b-versatile",
    response_format:
