# SEO Codebase Audit

**Date:** January 4, 2026
**Scope:** Static Code Analysis (No execution)

This audit examines the codebase structure, configuration, and component implementation to identify SEO best practices and critical gaps.

---

## 🚨 Critical Issues (High Impact)

### 1. Incorrect `lang` Attribute on French Pages
**Severity:** Critical
**Location:** `src/layouts/Layout.astro` & `src/config.yaml`
**Finding:**
The `Layout.astro` component sets the `<html>` language tag based on a static configuration:
```astro
const { language, textDirection } = I18N; // From astrowind:config (src/config.yaml)
// ...
<html lang={language} dir={textDirection} ...>
```
`src/config.yaml` hardcodes this to `en-CA`.
**Impact:** All French pages (e.g., `/fr/a-propos`) declare themselves as English `<html lang="en-CA">`. This confuses search engines about the page content language and hurts ranking in French results.
**Recommendation:**
- Modify `Layout.astro` to accept a `language` prop.
- Update `PageLayoutFr.astro` to pass `language="fr-CA"`.

---

## 🛠️ Technical SEO (Structure & Performance)

### 2. Hreflang Implementation (Good)
**Status:** ✅ Implemented
**Location:** `src/components/common/HreflangLinks.astro`
**Finding:**
The site correctly generates `hreflang` tags for:
- Static pages (manual mapping `/about` ↔ `/fr/a-propos`)
- Blog posts (dynamic mapping via `src/utils/blog-slug-mappings.ts`)
- Includes `x-default` pointing to English.
**Note:** Ensure `HreflangLinks` is present on *all* pages (it seems included in `Layout.astro`).

### 3. Canonical URLs (Good)
**Status:** ✅ Implemented
**Location:** `src/utils/permalinks.ts` & `Metadata.astro`
**Finding:**
Canonical logic handles trailing slashes and base URLs consistently based on `site` config. This prevents duplicate content issues.

### 4. Sitemap & Robots.txt (Good)
**Status:** ✅ Implemented
**Location:** `astro.config.ts` & `public/robots.txt`
**Finding:**
- `@astrojs/sitemap` integration is enabled.
- `robots.txt` is present and correctly links to `https://wealthsimplebonus.ca/sitemap-index.xml`.
- Allows full crawling (`User-agent: *`, `Disallow:` empty).

### 5. Meta Tags & Open Graph (Good)
**Status:** ✅ Implemented
**Location:** `src/components/common/Metadata.astro` & `src/config.yaml`
**Finding:**
- Uses `astro-seo` for robust meta tag generation.
- Default Open Graph image (`default.png`) and Twitter card types configured.
- `geo.region` set to "CA" (good for local SEO).

---

## 💡 Improvements (Medium Impact)

### 6. Schema Markup Enhancements
**Status:** ⚠️ Partial
**Location:** `src/components/common/ArticleSchema.astro`
**Finding:**
- `Article` schema is implemented for blog posts.
- **Gap:** Missing `BreadcrumbList` schema for deeper site structure understanding.
- **Gap:** Missing `Organization` schema on the homepage (though generic `Metadata` might cover some, a dedicated JSON-LD is better).
**Recommendation:** Implement `BreadcrumbSchema.astro` on all pages, especially blog posts and categories.

### 7. Heading Hierarchy
**Status:** ⚠️ Needs Review
**Finding:**
While not fully verifiable without rendering, code inspection suggests manual usage of `<h1>` etc.
**Recommendation:** Ensure `<h1>` is unique per page. Use usage of `Header` widget doesn't introduce conflicting H1s (it shouldn't).

### 8. Image Optimization
**Status:** ✅ Good
**Location:** `astro.config.ts`
**Finding:**
- `lazyImagesRehypePlugin` is enabled.
- `astro-compress` is enabled.
- **Recommendation:** Continue manually compressing large static assets in `src/assets` or `public` as code-based compression happens at build time but source files should be reasonable.

---

## 📋 Action Plan

1.  **[URGENT] Fix French Language Attribute**
    - Modify `src/layouts/Layout.astro` to accept `language` prop.
    - Update `src/layouts/PageLayoutFr.astro` to pass `language="fr-CA"`.

2.  **Add Breadcrumb Schema**
    - Integrate `BreadcrumbSchema.astro` into `PageLayout` (or specific blog layouts).

3.  **Verify Title Tag Lengths**
    - (From previous audits) Ensure French titles aren't excessively long.

4.  **Review 404 Page**
    - Ensure a custom 404 page exists and has proper navigation (didn't explicitly see `404.astro` in root `src/pages` list, might be missing).
