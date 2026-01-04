# French Integration Files Bundle

All files needed to add French language support. Copy each section into the corresponding file path.

---

## FILE 1: src/navigation-fr.ts

```typescript
import { getPermalink } from './utils/permalinks';
import type { CallToAction } from './types';

interface Link {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
}

interface MenuLink extends Link {
  links?: Array<MenuLink>;
}

interface HeaderProps {
  id?: string;
  links?: Array<MenuLink>;
  actions?: Array<CallToAction>;
  isSticky?: boolean;
  isDark?: boolean;
  isFullWidth?: boolean;
  showToggleTheme?: boolean;
  showRssFeed?: boolean;
  position?: string;
}

// French Header Navigation
export const headerDataFr: HeaderProps = {
  isSticky: true,
  links: [
    {
      text: 'Accueil',
      href: getPermalink('/fr/'),
    },
    {
      text: 'Fonctionnement',
      href: getPermalink('/fr/comment-ca-fonctionne'),
    },
    {
      text: 'Blogue',
      href: getPermalink('/fr/blogue'),
    },
    {
      text: 'À propos',
      href: getPermalink('/fr/a-propos'),
    },
    {
      text: 'Contact',
      href: getPermalink('/fr/contact'),
    },
  ],
  actions: [
    {
      variant: 'primary',
      text: 'Code Promo',
      href: 'https://yoursite.ca/?ref=YOURCODE',
      target: '_blank',
      showArrow: true,
    },
  ],
};

// French Footer Navigation
export const footerDataFr = {
  links: [
    {
      title: 'Liens rapides',
      links: [
        { text: 'Accueil', href: getPermalink('/fr/') },
        { text: 'Comment ça fonctionne', href: getPermalink('/fr/comment-ca-fonctionne') },
        { text: 'À propos', href: getPermalink('/fr/a-propos') },
        { text: 'Contact', href: getPermalink('/fr/contact') },
      ],
    },
    {
      title: 'Mentions légales',
      links: [
        { text: 'Politique de confidentialité', href: getPermalink('/fr/confidentialite') },
        { text: "Conditions d'utilisation", href: getPermalink('/fr/conditions') },
      ],
    },
  ],
  socialLinks: [],
  secondaryLinks: [],
  footNote: `
    <div class="text-sm text-gray-700 dark:text-gray-300 mb-3">
      Votre description en français ici.
    </div>
  `,
};
```

---

## FILE 2: src/layouts/PageLayoutFr.astro

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

## FILE 3: src/utils/blog-fr.ts

```typescript
import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, POST_PERMALINK_PATTERN } from './permalinks';

const FRENCH_BLOG_BASE = 'fr/blogue';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  // For French posts, remove the 'fr/' prefix from the slug
  const rawSlug = cleanSlug(id);
  const slug = rawSlug.startsWith('fr/') ? rawSlug.replace('fr/', '') : rawSlug;
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),
    publishDate: publishDate,
    updateDate: updateDate,
    title: title,
    excerpt: excerpt,
    image: image,
    category: category,
    tags: tags,
    author: author,
    draft: draft,
    metadata,
    Content: Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const loadFrenchPosts = async function (): Promise<Array<Post>> {
  const allPosts = await getCollection('post');
  const frenchPosts = allPosts.filter((post) => post.id.startsWith('fr/'));
  const normalizedPosts = frenchPosts.map(async (post) => await getNormalizedPost(post));
  const now = new Date();
  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft && post.publishDate <= now);
  return results;
};

let _frenchPosts: Array<Post>;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

export const fetchFrenchPosts = async (): Promise<Array<Post>> => {
  if (!_frenchPosts) {
    _frenchPosts = await loadFrenchPosts();
  }
  return _frenchPosts;
};

export const getStaticPathsFrenchBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  return paginate(await fetchFrenchPosts(), {
    params: { blog: FRENCH_BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

export const findLatestFrenchPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchFrenchPosts();
  return posts ? posts.slice(0, _count) : [];
};

export async function getRelatedFrenchPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchFrenchPosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;
    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }
    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) score += 1;
      });
    }
    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);
  return postsWithScores.slice(0, maxResults).map((p) => p.post);
}

export const findFrenchPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];
  const posts = await fetchFrenchPosts();
  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};
```

---

## FILE 4: scripts/validate-language.js

```javascript
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
```

---

## FILE 5: src/utils/category-tag-translations.ts

```typescript
/**
 * Category and Tag Translations (English -> French)
 * Update these mappings for your site
 */

export const CATEGORY_TRANSLATIONS: Record<string, { slug: string; name: string }> = {
  deals: { slug: 'offres', name: 'Offres' },
  features: { slug: 'fonctionnalites', name: 'Fonctionnalités' },
  troubleshooting: { slug: 'depannage', name: 'Dépannage' },
  comparison: { slug: 'comparaison', name: 'Comparaison' },
  guides: { slug: 'guides', name: 'Guides' },
  // Add your categories here
};

export const TAG_TRANSLATIONS: Record<string, { slug: string; name: string }> = {
  // Add your tags here
  'example-tag': { slug: 'exemple-etiquette', name: 'Exemple Étiquette' },
};
```

---

## package.json addition

Add to scripts section:

```json
"validate:language": "node scripts/validate-language.js"
```

---

## Husky Pre-commit Hook Setup

```bash
npm install husky --save-dev
npx husky init
```

Then edit `.husky/pre-commit`:

```bash
npm run validate:language
```
