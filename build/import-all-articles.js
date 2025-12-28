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

const POSTS_DIR = '/Users/tahamerghani/Downloads/medium-export-46182929d22011ca82fd10828d5a358a5f8db9a7b7c65498e932c44b343f4252/posts';
const ARTICLES_DIR = path.join(__dirname, '..', 'articles');

// All articles to import
const articlesToImport = [
  {
    filename: '2025-12-22_The-Blue-Collar-Machine-Learning-Researcher--The-Human-API-in-the-Aisle-bd9bd82793ab.html',
    slug: 'the-blue-collar-machine-learning-researcher',
    title: 'The Blue Collar Machine Learning Researcher: The Human API in the Aisle',
    date: '2025-12-22',
    description: 'On working as a human API in retail while building ML expertise—what happens when your day job is in the physical world while your mind stays in the technical one.',
    tags: ['Career', 'AI', 'Personal']
  },
  {
    filename: '2025-12-11_The-Quiet-Addiction-Behind-My-Public-Success-8015573b698b.html',
    slug: 'the-quiet-addiction-behind-my-public-success',
    title: 'The Quiet Addiction Behind My Public Success',
    date: '2025-12-11',
    description: 'A candid reflection on gaming addiction, public achievement, and the hidden struggles behind external success.',
    tags: ['Personal', 'Mental Health', 'Gaming']
  },
  {
    filename: '2025-12-05_The-Most-Useful-Mistakes-I-Made-in-LLM-Research-069f3f6ad4d9.html',
    slug: 'the-most-useful-mistakes-i-made-in-llm-research',
    title: 'The Most Useful Mistakes I Made in LLM Research',
    date: '2025-12-05',
    description: 'Lessons learned from failed experiments, misguided assumptions, and productive errors in large language model research.',
    tags: ['AI', 'Research', 'LLM']
  },
  {
    filename: '2025-07-04_Doing-AI-on-Old-Hardware-2a006b7c11e4.html',
    slug: 'doing-ai-on-old-hardware',
    title: 'Doing AI on Old Hardware',
    date: '2025-07-04',
    description: 'Exploring how to run modern AI models on consumer-grade laptops—what works, what doesn\'t, and why accessibility matters.',
    tags: ['AI', 'Technical', 'Hardware']
  },
  {
    filename: '2025-07-01_Cursor-Fixed-Everything--Until-It-Didn-t-1e8c20a8f30b.html',
    slug: 'cursor-fixed-everything-until-it-didnt',
    title: 'Cursor Fixed Everything… Until It Didn\'t',
    date: '2025-07-01',
    description: 'An honest look at AI coding assistants—the productivity gains, the limitations, and when human judgment still matters.',
    tags: ['AI', 'Tools', 'Productivity']
  },
  {
    filename: '2025-06-29_The-Curious-Case-of-LeetCode-523--Memorize-or-Prove--I-Chose-to-Learn-ecc2d7272977.html',
    slug: 'leetcode-523-memorize-or-prove',
    title: 'The Curious Case of LeetCode 523: Memorize or Prove? I Chose to Learn',
    date: '2025-06-29',
    description: 'A deep dive into a single LeetCode problem—exploring the difference between memorizing solutions and understanding the underlying mathematics.',
    tags: ['Algorithms', 'Technical', 'Learning']
  },
  {
    filename: '2025-06-28_Grad-School-Gave-Me-the-Degree---and-a-Trauma-Response-c25adbd9a2e6.html',
    slug: 'grad-school-gave-me-the-degree-and-a-trauma-response',
    title: 'Grad School Gave Me the Degree — and a Trauma Response',
    date: '2025-06-28',
    description: 'The untold story of mental health struggles in academia—what it cost to earn a master\'s degree from Georgia Tech.',
    tags: ['Academia', 'Mental Health', 'Personal']
  },
  {
    filename: '2025-06-24_Why-I-Still-Lose-at-Tekken---Even-After-4-000-Hours-15a6562b38b3.html',
    slug: 'why-i-still-lose-at-tekken-after-4000-hours',
    title: 'Why I Still Lose at Tekken — Even After 4,000 Hours',
    date: '2025-06-24',
    description: 'A personal exploration of skill ceilings, execution barriers, and what 4,000 hours of practice can and cannot teach you.',
    tags: ['Gaming', 'Personal', 'Skill']
  }
];

async function extractContent(htmlPath) {
  const html = await fs.readFile(htmlPath, 'utf-8');

  // Extract body content from Medium export
  const bodyMatch = html.match(/<section data-field="body"[^>]*>([\s\S]*?)<\/section>\s*<\/section>/);

  if (!bodyMatch) {
    throw new Error('Could not find article body');
  }

  return bodyMatch[1];
}

async function convertArticle(article) {
  console.log(`\n📄 Converting: ${article.title}`);

  const htmlPath = path.join(POSTS_DIR, article.filename);
  const mdPath = path.join(ARTICLES_DIR, `${article.slug}.md`);

  try {
    const bodyHtml = await extractContent(htmlPath);

    // Convert to Markdown
    let markdown = turndownService.turndown(bodyHtml);

    // Clean up artifacts
    markdown = markdown
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\*\*\s+\*\*/g, '**')
      .replace(/\[]\([^)]*\)/g, '')
      .trim();

    // Create front matter
    const frontMatter = `---
title: "${article.title}"
date: ${article.date}
description: "${article.description}"
tags: ${JSON.stringify(article.tags)}
draft: false
---

${markdown}
`;

    await fs.writeFile(mdPath, frontMatter, 'utf-8');
    console.log(`   ✅ Saved to: ${article.slug}.md`);

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Importing All Medium Articles\n');
  console.log('=' .repeat(80));

  for (const article of articlesToImport) {
    await convertArticle(article);
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ Successfully imported ${articlesToImport.length} articles!\n`);
  console.log('Next steps:');
  console.log('  1. Run: npm run build');
  console.log('  2. Commit and push to deploy\n');
}

main().catch(error => {
  console.error('\n❌ Import failed:', error);
  process.exit(1);
});
