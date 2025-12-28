const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

// Helper: Create URL slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper: Extract title from Medium URL
function extractTitleFromURL(url) {
  const parts = url.split('/');
  const slug = parts[parts.length - 1];
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/[0-9]+$/g, '')
    .trim();
}

// Main import function
async function importFromMedium() {
  console.log('\n📥 Medium Import Tool\n');
  console.log('This script helps you convert Medium articles to Markdown.\n');
  console.log('Two ways to use this:');
  console.log('1. Export your Medium data (Settings > Download your information)');
  console.log('2. Copy-paste article HTML directly from Medium editor\n');
  console.log('For now, we\'ll create example articles from your two Medium URLs:\n');

  const articles = [
    {
      title: 'What 5,000 Hours of Mastering Tekken Taught Me About AI Research',
      url: 'https://medium.com/@tahaymerghani/a-machine-learning-researcher-spent-close-to-5-000-hours-on-tekken-and-reached-top-0-5-a42c96877214',
      description: 'Autophenomenological analysis exploring parallels between competitive gaming mastery and pattern recognition in ML research.',
      tags: ['AI', 'Research', 'Gaming'],
      date: '2024-11-15'
    },
    {
      title: 'From Sudan to Silicon Valley: Beyond the Resume',
      url: 'https://medium.com/@tahaymerghani/from-sudan-to-silicon-valley-beyond-the-resume-a2e6bd3eedb4',
      description: 'Personal narrative on the gap between credentials and lived experience. What it means to be celebrated in one context and invisible in another.',
      tags: ['Career', 'Personal', 'Tech'],
      date: '2024-10-20'
    }
  ];

  const articlesDir = path.join(__dirname, '..', 'articles');
  await fs.ensureDir(articlesDir);

  for (const article of articles) {
    const slug = createSlug(article.title);
    const filename = `${slug}.md`;
    const filepath = path.join(articlesDir, filename);

    // Create markdown file with front matter
    const content = `---
title: "${article.title}"
date: ${article.date}
description: "${article.description}"
medium_url: "${article.url}"
tags: ${JSON.stringify(article.tags)}
draft: false
---

# ${article.title}

**Note:** This is a placeholder for the article content.

To complete the import:
1. Visit: ${article.url}
2. Copy the full article text from Medium
3. Paste it here, replacing this placeholder text
4. You can use Markdown formatting for better control

The article will automatically be built when you run \`npm run build\`.

## Example Formatting

You can use:
- **Bold text**
- *Italic text*
- \`code blocks\`
- Lists and quotes

> This is a blockquote - perfect for highlighting key insights

## Subheadings

Use ## for main sections and ### for subsections.

\`\`\`javascript
// Code blocks are supported too
const example = "with syntax highlighting";
\`\`\`

Replace this entire content with your actual article from Medium.
`;

    await fs.writeFile(filepath, content, 'utf-8');
    console.log(`  ✓ Created: articles/${filename}`);
    console.log(`    ${article.title}`);
    console.log(`    → ${article.url}\n`);
  }

  console.log('✅ Placeholder articles created!\n');
  console.log('Next steps:');
  console.log('1. Open each .md file in articles/');
  console.log('2. Copy your Medium article content');
  console.log('3. Replace the placeholder text');
  console.log('4. Run `npm run build` to generate your blog\n');
}

// Run import
importFromMedium().catch(error => {
  console.error('\n❌ Import failed:', error);
  process.exit(1);
});
