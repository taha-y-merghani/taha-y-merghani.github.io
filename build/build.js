const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');

// Paths
const ARTICLES_DIR = path.join(__dirname, '..', 'articles');
const WRITING_DIR = path.join(__dirname, '..', 'writing');
const TEMPLATES_DIR = path.join(__dirname, 'templates');

// Helper: Calculate reading time
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper: Create URL slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Parse and process an article
async function processArticle(filepath) {
  const content = await fs.readFile(filepath, 'utf-8');
  const { attributes, body } = frontMatter(content);

  // Skip drafts
  if (attributes.draft) {
    console.log(`  Skipping draft: ${attributes.title}`);
    return null;
  }

  const slug = createSlug(attributes.title);
  const html = marked(body);
  const readingTime = calculateReadingTime(body);

  return {
    ...attributes,
    slug,
    html,
    readingTime,
    date: formatDate(attributes.date),
    rawDate: attributes.date
  };
}

// Build individual article page
async function buildArticlePage(article) {
  const template = await fs.readFile(
    path.join(TEMPLATES_DIR, 'article.html'),
    'utf-8'
  );

  // Replace placeholders
  let html = template
    .replace(/{{TITLE}}/g, article.title)
    .replace(/{{DATE}}/g, article.date)
    .replace(/{{READING_TIME}}/g, article.readingTime)
    .replace(/{{DESCRIPTION}}/g, article.description || '')
    .replace(/{{CONTENT}}/g, article.html)
    .replace(/{{TAGS}}/g, article.tags ? article.tags.join(', ') : '');

  // Add Medium link if exists
  if (article.medium_url) {
    const mediumLink = `<p class="article-meta"><a href="${article.medium_url}" target="_blank">Originally published on Medium</a></p>`;
    html = html.replace('{{MEDIUM_LINK}}', mediumLink);
  } else {
    html = html.replace('{{MEDIUM_LINK}}', '');
  }

  // Create article directory
  const articleDir = path.join(WRITING_DIR, article.slug);
  await fs.ensureDir(articleDir);

  // Write article page
  await fs.writeFile(
    path.join(articleDir, 'index.html'),
    html,
    'utf-8'
  );

  console.log(`  Generated: /writing/${article.slug}/`);
}

// Build listing page
async function buildListingPage(articles) {
  const template = await fs.readFile(
    path.join(TEMPLATES_DIR, 'listing.html'),
    'utf-8'
  );

  // Sort articles by date (newest first)
  const sortedArticles = articles.sort((a, b) =>
    new Date(b.rawDate) - new Date(a.rawDate)
  );

  // Extract all unique tags
  const allTags = new Set();
  articles.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => allTags.add(tag));
    }
  });
  const uniqueTags = Array.from(allTags).sort();

  // Generate filter buttons
  const filterButtons = uniqueTags.map(tag =>
    `<button class="filter-btn" data-tag="${tag}">${tag}</button>`
  ).join('\n');

  // Generate article cards with data attributes for filtering
  const articleCards = sortedArticles.map(article => {
    const tags = article.tags
      ? `<div class="article-tags">${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
      : '';

    return [
      `<a href="/writing/${article.slug}/" class="article-card reveal" data-tags="${article.tags ? article.tags.join(',') : ''}" data-date="${article.rawDate}">`,
      '  <div class="article-card-header">',
      `    <span class="article-date">${article.date}</span>`,
      `    <span class="article-reading-time">${article.readingTime}</span>`,
      '  </div>',
      `  <h3>${article.title}</h3>`,
      `  <p class="article-description">${article.description || ''}</p>`,
      tags,
      '</a>'
    ].filter(Boolean).join('\n');
  }).join('\n');

  const html = template
    .replaceAll('{{ARTICLE_COUNT}}', articles.length)
    .replace('{{FILTER_BUTTONS}}', filterButtons)
    .replace('{{ARTICLE_CARDS}}', articleCards);

  await fs.writeFile(
    path.join(WRITING_DIR, 'index.html'),
    html,
    'utf-8'
  );

  console.log(`  Generated: /writing/ (${articles.length} articles)`);
}

// Main build function
async function build() {
  console.log('\n🚀 Building blog...\n');

  // Clean writing directory
  await fs.emptyDir(WRITING_DIR);

  // Find all markdown files
  const articleFiles = glob.sync(path.join(ARTICLES_DIR, '*.md'))
    .filter(file => !file.includes('_template'));

  if (articleFiles.length === 0) {
    console.log('  No articles found in /articles/');
    console.log('  Create markdown files in /articles/ to get started.\n');
    return;
  }

  // Process all articles
  console.log(`Found ${articleFiles.length} article(s):\n`);
  const articles = [];

  for (const file of articleFiles) {
    const article = await processArticle(file);
    if (article) {
      articles.push(article);
      await buildArticlePage(article);
    }
  }

  if (articles.length === 0) {
    console.log('  No published articles (all are drafts).\n');
    return;
  }

  // Build listing page
  await buildListingPage(articles);

  console.log(`\n✅ Build complete! Generated ${articles.length} article(s).\n`);
  console.log('Run `npm run dev` to preview locally.\n');
}

// Run build
build().catch(error => {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
});
