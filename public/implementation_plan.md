# French Language Integration Guide

Complete guide for adding French support to an Astro website, including automated validation.

---

## Phase 1: Core Infrastructure

### 1.1 Create French Navigation

**Copy:** `src/navigation.ts` → `src/navigation-fr.ts`

**Edit to:**

- Change text to French
- Change URLs to `/fr/` paths
- Export as `headerDataFr` and `footerDataFr`

```ts
// navigation-fr.ts
export const headerDataFr = {
  links: [
    { text: 'Accueil', href: '/fr' },
    { text: 'À propos', href: '/fr/a-propos' },
    { text: 'Blogue', href: '/fr/blogue' },
    { text: 'Contact', href: '/fr/contact' },
  ],
};

export const footerDataFr = {
  // Same structure, French text
};
```

### 1.2 Create French Layout

**Create:** `src/layouts/PageLayoutFr.astro`

```astro
---
import Layout from '~/layouts/Layout.astro';
import Header from '~/components/widgets/Header.astro';
import Footer from '~/components/widgets/Footer.astro';
import { headerDataFr, footerDataFr } from '~/navigation-fr';
import type { MetaData } from '~/types';

export interface Props {
  metadata?: MetaData;
}

const { metadata } = Astro.props;
---

<Layout metadata={metadata}>
  <slot name="header">
    <Header {...headerDataFr} />
  </slot>
  <main>
    <slot />
  </main>
  <slot name="footer">
    <Footer {...footerDataFr} />
  </slot>
</Layout>
```

---

## Phase 2: French Page Structure

### 2.1 Directory Structure

```
src/pages/fr/
├── index.astro              # Homepage
├── a-propos.astro           # About
├── contact.astro            # Contact
├── confidentialite.md       # Privacy
├── conditions.md            # Terms
└── blogue/
    ├── index.astro          # Blog list
    ├── [...page].astro      # Pagination
    └── [slug].astro         # Posts (USE PageLayoutFr!)
```

### 2.2 Page Mapping

| English         | French                  | URL                   |
| --------------- | ----------------------- | --------------------- |
| `index.astro`   | `fr/index.astro`        | `/fr`                 |
| `about.astro`   | `fr/a-propos.astro`     | `/fr/a-propos`        |
| `contact.astro` | `fr/contact.astro`      | `/fr/contact`         |
| `privacy.md`    | `fr/confidentialite.md` | `/fr/confidentialite` |
| `terms.md`      | `fr/conditions.md`      | `/fr/conditions`      |

---

## Phase 3: French Blog System

### 3.1 Create French Posts Directory

```
src/data/post/fr/
```

### 3.2 Create `src/utils/blog-fr.ts`

Mirror `blog.ts` but fetch from `src/data/post/fr/`.

### 3.3 Create French Components

Copy these with `Fr` suffix and translate text:

| Original             | French Version         |
| -------------------- | ---------------------- |
| `SinglePost.astro`   | `SinglePostFr.astro`   |
| `List.astro`         | `ListFr.astro`         |
| `ListItem.astro`     | `ListItemFr.astro`     |
| `Tags.astro`         | `TagsFr.astro`         |
| `RelatedPosts.astro` | `RelatedPostsFr.astro` |

**Text changes:**

- "min read" → "min de lecture"
- "About the Author" → "À propos de l'auteure"
- "Back to Blog" → "Retour au blogue"

### 3.4 Blog Post Page (CRITICAL)

**`src/pages/fr/blogue/[slug].astro` must use `PageLayoutFr`:**

```astro
import Layout from '~/layouts/PageLayoutFr.astro'; // NOT PageLayout!
```

---

## Phase 4: Category & Tag Translation

**Create:** `src/utils/category-tag-translations.ts`

```ts
export const CATEGORY_TRANSLATIONS: Record<string, { title: string; slug: string }> = {
  coverage: { title: 'Couverture', slug: 'couverture' },
  comparison: { title: 'Comparaison', slug: 'comparaison' },
  // Add all categories
};

export const TAG_TRANSLATIONS: Record<string, { title: string; slug: string }> = {
  'your-tag': { title: 'Votre Étiquette', slug: 'votre-etiquette' },
  // Add all tags
};
```

---

## Phase 5: SEO & Hreflang

Update sitemap to include hreflang alternates linking English ↔ French pages.

---

## Phase 6: Automated Validation (IMPORTANT)

### 6.1 Create Validation Script

**Create:** `scripts/validate-language.js`

```javascript
/**
 * Language Consistency Validation Script
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

// Check 1: French pages should not import English navigation
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

// Check 2: French blog posts should not have English internal links
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

// Check 3: French components should use French text
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

// Check 4: Verify PageLayoutFr exists
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

// Check 5: Post count mismatch
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

// Check 6: Broken internal links
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

// Run all checks
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
```

### 6.2 Add npm Script

In `package.json`, add:

```json
"scripts": {
  "validate:language": "node scripts/validate-language.js"
}
```

### 6.3 Set Up Pre-commit Hook

```bash
npm install husky --save-dev
npx husky init
```

**Edit `.husky/pre-commit`:**

```bash
npm run validate:language
```

Now validation runs automatically before every commit.

---

## Implementation Checklist

### Infrastructure

- [ ] Create `navigation-fr.ts`
- [ ] Create `PageLayoutFr.astro`
- [ ] Create `blog-fr.ts`

### Pages

- [ ] `/fr/index.astro`
- [ ] `/fr/a-propos.astro`
- [ ] `/fr/contact.astro`
- [ ] `/fr/confidentialite.md`
- [ ] `/fr/conditions.md`

### Blog

- [ ] `src/data/post/fr/` directory
- [ ] French blog components (`*Fr.astro`)
- [ ] `/fr/blogue/[slug].astro` (uses PageLayoutFr!)

### Validation

- [ ] `scripts/validate-language.js`
- [ ] `npm run validate:language` script
- [ ] Husky pre-commit hook

---

## Quick Copy Commands (Git Bash)

From FIZZ-PROMO-CODE to your project:

```bash
# Core files
cp ~/GITHUB/FIZZ-PROMO-CODE/src/layouts/PageLayoutFr.astro ~/GITHUB/YOUR-PROJECT/src/layouts/
cp ~/GITHUB/FIZZ-PROMO-CODE/src/utils/blog-fr.ts ~/GITHUB/YOUR-PROJECT/src/utils/

# Components
cp ~/GITHUB/FIZZ-PROMO-CODE/src/components/blog/*Fr.astro ~/GITHUB/YOUR-PROJECT/src/components/blog/

# Validation
mkdir -p ~/GITHUB/YOUR-PROJECT/scripts
cp ~/GITHUB/FIZZ-PROMO-CODE/scripts/validate-language.js ~/GITHUB/YOUR-PROJECT/scripts/
```
