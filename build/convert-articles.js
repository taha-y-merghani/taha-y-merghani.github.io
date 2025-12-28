const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Custom rules for better conversion
turndownService.addRule('removeEmptyParagraphs', {
  filter: function (node) {
    return node.nodeName === 'P' && node.textContent.trim() === '';
  },
  replacement: function () {
    return '';
  }
});

async function convertArticle(htmlPath, mdPath, frontMatter) {
  console.log(`\nConverting: ${path.basename(htmlPath)}`);

  const html = await fs.readFile(htmlPath, 'utf-8');

  // Extract body content from Medium export
  const bodyMatch = html.match(/<section data-field="body"[^>]*>([\s\S]*?)<\/section>\s*<\/section>/);

  if (!bodyMatch) {
    console.error('  ❌ Could not find article body');
    return;
  }

  const bodyHtml = bodyMatch[1];

  // Convert to Markdown
  let markdown = turndownService.turndown(bodyHtml);

  // Clean up artifacts
  markdown = markdown
    .replace(/\n{3,}/g, '\n\n')  // Remove excessive newlines
    .replace(/\*\*\s+\*\*/g, '**')  // Fix broken bold tags
    .replace(/\[]\([^)]*\)/g, '')  // Remove empty links
    .trim();

  // Add front matter
  const content = `---
${frontMatter}
---

${markdown}
`;

  await fs.writeFile(mdPath, content, 'utf-8');
  console.log(`  ✅ Saved to: ${path.basename(mdPath)}`);
}

async function main() {
  console.log('📝 Converting Medium articles to Markdown...\n');

  const exportDir = '/Users/tahamerghani/Downloads/medium-export-46182929d22011ca82fd10828d5a358a5f8db9a7b7c65498e932c44b343f4252/posts';
  const articlesDir = path.join(__dirname, '..', 'articles');

  // Convert Tekken article
  await convertArticle(
    path.join(exportDir, '2025-12-18_A-Machine-Learning-Researcher-Spent-Close-to-5-000-Hours-on-Tekken-and-Reached-Top-0-5---a42c96877214.html'),
    path.join(articlesDir, 'what-5-000-hours-of-mastering-tekken-taught-me-about-ai-research.md'),
    `title: "What 5,000 Hours of Mastering Tekken Taught Me About AI Research"
date: 2024-11-15
description: "Autophenomenological analysis exploring parallels between competitive gaming mastery and pattern recognition in ML research. Examining whether the obsessive optimization that makes someone elite at fighting games relates to what makes someone effective at research."
medium_url: "https://medium.com/@tahaymerghani/a-machine-learning-researcher-spent-close-to-5-000-hours-on-tekken-and-reached-top-0-5-a42c96877214"
tags: ["AI", "Research", "Gaming"]
draft: false`
  );

  // Convert Sudan to Silicon Valley article
  await convertArticle(
    path.join(exportDir, '2024-10-30_From-Sudan-to-Silicon-Valley--Beyond-the-Resume-a2e6bd3eedb4.html'),
    path.join(articlesDir, 'from-sudan-to-silicon-valley-beyond-the-resume.md'),
    `title: "From Sudan to Silicon Valley: Beyond the Resume"
date: 2024-10-20
description: "Personal narrative on the gap between credentials and lived experience. What it means to be celebrated in one context and invisible in another."
medium_url: "https://medium.com/@tahaymerghani/from-sudan-to-silicon-valley-beyond-the-resume-a2e6bd3eedb4"
tags: ["Career", "Personal", "Tech"]
draft: false`
  );

  console.log('\n✅ Conversion complete!\n');
}

main().catch(error => {
  console.error('\n❌ Conversion failed:', error);
  process.exit(1);
});
