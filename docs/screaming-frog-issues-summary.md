# Screaming Frog SEO Issues Summary

**Crawl Date:** January 4, 2026

---

## 🔴 HIGH Priority (Fixed This Session)

| Issue                                        | Status                      | Fix                                                                               |
| -------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------- |
| **83 Internal 404s** (French tag/category)   | ✅ FIXED                    | Updated `LanguagePicker.astro` to fallback to `/fr/blogue` for tag/category pages |
| **H1 Missing** on /about and /fr/a-propos    | ✅ FIXED (previous session) | Added H1 tags                                                                     |
| **Redundant H2** ("Why Wealthsimple Bonus?") | ✅ FIXED                    | Removed from both EN and FR about pages                                           |

---

## 🟡 MEDIUM Priority (Remaining)

### 1. Page Titles Over 60 Characters (7 pages)

- Some French blog posts still have titles over 60 chars
- **Impact:** May truncate in SERPs
- **Action:** Consider further shortening if needed

### 2. Page Titles Below 30 Characters (19 pages)

- Tag and category pages have short titles like "Guides" or "Comparisons"
- **Impact:** Missed keyword opportunities
- **Action:** Consider adding descriptive prefixes like "Wealthsimple Guides | Blog"

### 3. Images Over 100 KB (16 images)

- Large images slowing page load
- **Impact:** Core Web Vitals
- **Action:** Compress images using tools like Squoosh or TinyPNG

### 4. Low Content Pages (81 pages)

- Pages with under 200 words (tag/category listing pages)
- **Impact:** Often acceptable for listing pages
- **Action:** Can add intro paragraphs to key category pages

---

## 🟢 LOW Priority / Informational

### Security Headers Missing (140 URLs)

- X-Content-Type-Options, Content-Security-Policy, X-Frame-Options, Referrer-Policy
- **Fix:** Add to `vercel.json` headers configuration

### Meta Descriptions Over 155 Characters (27 pages)

- May get truncated in SERPs
- **Impact:** Cosmetic, doesn't hurt SEO
- **Action:** Shorten if desired

### H2 Duplicate (89 pages)

- Expected behavior on listing pages that show post titles
- **Action:** No action needed

### Page Titles Same as H1 (28 pages)

- Normal for blog posts
- **Action:** No action needed

### External 404s (32 URLs)

- External links returning 404
- **Action:** Spot-check and update if broken

### Noindex Pages (2 pages)

- /blog/2 and /fr/blogue/2 (pagination pages)
- **Impact:** Intentional, no action needed

---

## Changes Made Today

1. **LanguagePicker.astro** - Fixed to fallback tag/category pages to blog index
2. **about.astro** - Removed "Why Wealthsimple Bonus?" H2
3. **fr/a-propos.astro** - Removed "Pourquoi Wealthsimple Bonus?" H2
4. **15 blog post titles** - Shortened for SEO (previous in session)

---

## Next Recommended Actions

1. ⏳ **Wait for deployment** and re-crawl to verify 404 fix
2. 📦 **Compress 16 large images** for Core Web Vitals
3. 🔒 **Add security headers** to vercel.json
4. 🏷️ **Expand short page titles** on tag/category pages
