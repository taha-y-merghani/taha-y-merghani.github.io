const fs = require('fs-extra');
const path = require('path');

const POSTS_DIR = '/Users/tahamerghani/Downloads/medium-export-46182929d22011ca82fd10828d5a358a5f8db9a7b7c65498e932c44b343f4252/posts';
const MIN_SIZE = 6 * 1024; // 6KB - articles are bigger than comments

async function extractTitle(htmlPath) {
  const html = await fs.readFile(htmlPath, 'utf-8');

  // Try to extract title from <title> tag
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  // Fallback to h1
  const h1Match = html.match(/<h1[^>]*class="p-name"[^>]*>([^<]+)<\/h1>/);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return 'Unknown Title';
}

async function extractDate(filename) {
  // Extract date from filename like "2025-12-18_Title.html"
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})_/);
  if (dateMatch) {
    return dateMatch[1];
  }
  return 'Unknown Date';
}

async function catalogArticles() {
  console.log('📚 Cataloging Medium Articles\n');
  console.log('=' .repeat(80) + '\n');

  const files = await fs.readdir(POSTS_DIR);
  const articles = [];

  for (const file of files) {
    if (!file.endsWith('.html')) continue;

    const filepath = path.join(POSTS_DIR, file);
    const stats = await fs.stat(filepath);

    // Skip small files (comments/responses)
    if (stats.size < MIN_SIZE) continue;

    const title = await extractTitle(filepath);
    const date = await extractDate(file);
    const isDraft = file.startsWith('draft_');

    articles.push({
      filename: file,
      title,
      date,
      size: stats.size,
      sizeKB: (stats.size / 1024).toFixed(1),
      isDraft,
      alreadyImported: false
    });
  }

  // Sort by date (newest first)
  articles.sort((a, b) => b.date.localeCompare(a.date));

  // Mark already imported
  const importedTitles = [
    'A Machine Learning Researcher Spent Close to 5,000 Hours on Tekken',
    'From Sudan to Silicon Valley: Beyond the Resume'
  ];

  articles.forEach(article => {
    if (importedTitles.some(title => article.title.includes(title))) {
      article.alreadyImported = true;
    }
  });

  // Display catalog
  console.log(`Found ${articles.length} articles (excluding comments):\n`);

  articles.forEach((article, i) => {
    const status = article.alreadyImported ? '✅ IMPORTED' :
                   article.isDraft ? '📝 DRAFT' :
                   '📄 AVAILABLE';

    console.log(`${i + 1}. [${status}] ${article.title}`);
    console.log(`   Date: ${article.date} | Size: ${article.sizeKB}KB`);
    console.log(`   File: ${article.filename}`);
    console.log();
  });

  // Summary
  const available = articles.filter(a => !a.alreadyImported && !a.isDraft);
  const drafts = articles.filter(a => a.isDraft);
  const imported = articles.filter(a => a.alreadyImported);

  console.log('=' .repeat(80));
  console.log('\n📊 Summary:');
  console.log(`   Total articles: ${articles.length}`);
  console.log(`   ✅ Already imported: ${imported.length}`);
  console.log(`   📄 Available to import: ${available.length}`);
  console.log(`   📝 Drafts: ${drafts.length}`);
  console.log();

  // Save catalog to file
  const catalogPath = path.join(__dirname, 'article-catalog.json');
  await fs.writeJSON(catalogPath, articles, { spaces: 2 });
  console.log(`📁 Full catalog saved to: ${catalogPath}\n`);
}

catalogArticles().catch(console.error);
