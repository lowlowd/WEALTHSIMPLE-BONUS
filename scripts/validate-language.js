/**
 * Language Consistency Validation Script
 * Run: npm run validate:language
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function getAllFiles(dir, extensions = ['.astro', '.ts', '.js']) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getAllFiles(fullPath, extensions));
    } else if (extensions.some((ext) => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function getMarkdownFiles(dir) {
  return getAllFiles(dir, ['.md', '.mdx']);
}

function checkFrenchNavigation() {
  console.log(`${CYAN}[1/6]${RESET} Checking French pages for English navigation imports...`);
  const frenchPagesDir = path.join(projectRoot, 'src', 'pages', 'fr');
  const files = getAllFiles(frenchPagesDir);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(projectRoot, file);
    if (content.includes("from '~/navigation'") && !content.includes("from '~/navigation-fr'")) {
      if (!content.includes('PageLayoutFr')) {
        errors.push(`${relativePath}: Imports English navigation but not French navigation`);
      }
    }
    if (content.includes("from '~/layouts/PageLayout.astro'")) {
      if (!content.includes('headerDataFr') && !content.includes('PageLayoutFr')) {
        errors.push(`${relativePath}: Uses PageLayout.astro (English) instead of PageLayoutFr.astro`);
      }
    }
  }
}

function checkFrenchBlogLinks() {
  console.log(`${CYAN}[2/6]${RESET} Checking French blog posts for English links...`);
  const frenchPostsDir = path.join(projectRoot, 'src', 'data', 'post', 'fr');
  const files = getMarkdownFiles(frenchPostsDir);
  const englishLinkPatterns = [
    { pattern: /\]\(\/blog\//g, desc: '/blog/ (should be /fr/blogue/)' },
    { pattern: /\]\(\/about\)/g, desc: '/about (should be /fr/a-propos)' },
    { pattern: /\]\(\/contact\)/g, desc: '/contact (should be /fr/contact)' },
  ];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(projectRoot, file);
    for (const { pattern, desc } of englishLinkPatterns) {
      if (pattern.test(content)) {
        errors.push(`${relativePath}: Contains English link: ${desc}`);
      }
    }
  }
}

function checkFrenchComponents() {
  console.log(`${CYAN}[3/6]${RESET} Checking French components for English text...`);
  const componentsDir = path.join(projectRoot, 'src', 'components');
  const files = getAllFiles(componentsDir).filter((f) => f.includes('Fr.astro'));
  const englishPhrases = [
    { phrase: 'min read', fix: 'min de lecture' },
    { phrase: 'Read more', fix: 'Lire la suite' },
    { phrase: 'Back to Blog', fix: 'Retour au blogue' },
  ];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(projectRoot, file);
    for (const { phrase, fix } of englishPhrases) {
      const regex = new RegExp(`>\\s*${phrase}\\s*<`, 'gi');
      if (regex.test(content)) {
        warnings.push(`${relativePath}: Contains English "${phrase}" (should be "${fix}")`);
      }
    }
  }
}

function checkLayoutFiles() {
  console.log(`${CYAN}[4/6]${RESET} Checking layout files...`);
  const pageLayoutFr = path.join(projectRoot, 'src', 'layouts', 'PageLayoutFr.astro');
  if (!fs.existsSync(pageLayoutFr)) {
    errors.push('src/layouts/PageLayoutFr.astro is missing!');
    return;
  }
  const content = fs.readFileSync(pageLayoutFr, 'utf-8');
  if (!content.includes('navigation-fr')) {
    errors.push('PageLayoutFr.astro does not import French navigation');
  }
}

function checkMissingTranslations() {
  console.log(`${CYAN}[5/6]${RESET} Checking for missing French translations...`);
  const englishPostsDir = path.join(projectRoot, 'src', 'data', 'post');
  const frenchPostsDir = path.join(projectRoot, 'src', 'data', 'post', 'fr');
  if (!fs.existsSync(englishPostsDir) || !fs.existsSync(frenchPostsDir)) return;
  const englishPosts = fs.readdirSync(englishPostsDir).filter((f) => f.endsWith('.md'));
  const frenchPosts = fs.readdirSync(frenchPostsDir).filter((f) => f.endsWith('.md'));
  if (englishPosts.length !== frenchPosts.length) {
    warnings.push(`Post count mismatch: ${englishPosts.length} EN, ${frenchPosts.length} FR`);
  }
}

function checkBrokenInternalLinks() {
  console.log(`${CYAN}[6/6]${RESET} Checking for broken internal links...`);
  const frenchPostsDir = path.join(projectRoot, 'src', 'data', 'post', 'fr');
  const files = getMarkdownFiles(frenchPostsDir);
  const frenchSlugs = files.map((f) => path.basename(f, path.extname(f)));
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(projectRoot, file);
    const linkRegex = /\]\(\/fr\/blogue\/([a-z0-9-]+)\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      if (!frenchSlugs.includes(match[1])) {
        warnings.push(`${relativePath}: Links to non-existent: /fr/blogue/${match[1]}`);
      }
    }
  }
}

console.log(`\n🔍 ${CYAN}Running language consistency validation...${RESET}\n`);
checkLayoutFiles();
checkFrenchNavigation();
checkFrenchBlogLinks();
checkFrenchComponents();
checkMissingTranslations();
checkBrokenInternalLinks();

console.log('\n' + '='.repeat(60) + '\n');

if (errors.length === 0 && warnings.length === 0) {
  console.log(`${GREEN}✅ All language consistency checks passed!${RESET}\n`);
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log(`${RED}❌ ERRORS (${errors.length}):${RESET}\n`);
    errors.forEach((err) => console.log(`  ${RED}•${RESET} ${err}`));
  }
  if (warnings.length > 0) {
    console.log(`${YELLOW}⚠️  WARNINGS (${warnings.length}):${RESET}\n`);
    warnings.forEach((warn) => console.log(`  ${YELLOW}•${RESET} ${warn}`));
  }
  process.exit(errors.length > 0 ? 1 : 0);
}
