const fs = require('fs');
const path = require('path');

console.log("Starting automatic code fixer...");

try {
  const projectSlug = fs.readFileSync('plan/slug.txt', 'utf8').trim();
  const siteDir = path.join('sites', projectSlug);

  if (!fs.existsSync(siteDir)) {
    console.log(`Site directory ${siteDir} not found. Skipping fixer.`);
    return;
  }

  const fixFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    const incorrectImport = `import { use client } from 'react';`;
    const correctDirective = `"use client";`;

    if (content.includes(incorrectImport)) {
      // Remove the incorrect import
      content = content.replace(incorrectImport, '');
      // Add the correct directive at the top, if it's not already there
      if (!content.trim().startsWith(correctDirective)) {
        content = `${correctDirective}\n${content}`;
      }
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed 'use client' directive in: ${filePath}`);
    }
  };

  const scanDirectory = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        fixFile(fullPath);
      }
    }
  };

  scanDirectory(siteDir);
  console.log("Code fixing complete.");

} catch (error) {
  console.error("Error in fixer script:", error);
  process.exit(1);
}
