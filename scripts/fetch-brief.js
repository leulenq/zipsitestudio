(async () => {
  const fs = require('fs');

  const base = process.env.AIRTABLE_BASE_ID;
  const table = encodeURIComponent(process.env.AIRTABLE_TABLE);
  const rec = process.env.RECORD_ID;

  if (!rec) throw new Error("Missing RECORD_ID");

  const url = `https://api.airtable.com/v0/${base}/${table}/${rec}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` }
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Airtable error ${res.status}: ${t}`);
  }

  const json = await res.json();
  fs.writeFileSync('brief.json', JSON.stringify(json, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
