---
description: Best practices and lessons learned for this codebase
---

# Best Practices for This Codebase

## 1. Code Quality & Build Verification

### Run Prettier + Check Together

Always run formatting and type checking in a single command to catch issues before committing:

```bash
npx prettier --write . && npm run check
```

This ensures:

- Consistent code formatting across all files
- TypeScript/Astro type errors are caught early
- No broken imports or missing modules

---

## 2. Image URL Stability (Critical for SEO)

### Astro Image Hashing Behavior

> [!CAUTION]
> Astro hashes images based on their content. **Any change to an image file will change its URL**, breaking existing links and SEO value.

**Implications:**

- Once an image is indexed by Google, avoid modifying it
- If you must update an image, the URL will change (e.g., `image-abc123.webp` → `image-def456.webp`)
- Old URLs will 404 unless redirects are set up

### Money Shot Images (Referral Code Images)

For images you want to rank in Google Image Search (like referral code screenshots):

- **Keep URLs stable** – don't edit these images after publishing
- **Use descriptive filenames** before first build: `wealthsimple-referral-code-9C6DMQ.png`
- **Add to image sitemap** for faster indexing (see section 5)

---

## 3. Image SEO Optimization

### The Three Pillars of Image SEO

For maximum Google visibility, ensure these three elements work together:

| Element      | Purpose                            | Example                                                             |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- |
| **Alt Text** | Accessibility + SEO keywords       | `"Wealthsimple referral code 9C6DMQ showing $25 bonus"`             |
| **Caption**  | User context + reinforces keywords | `"Enter referral code 9C6DMQ to claim your $25 Wealthsimple bonus"` |
| **Filename** | URL signals to Google              | `wealthsimple-referral-code-bonus.png`                              |

> [!TIP]
> All three should support the same keyword theme but use slightly different wording. This helps Google understand the image context without appearing spammy.

### Implementation in Astro/Markdown

```markdown
![Wealthsimple referral code 9C6DMQ entry screen](./images/referral-code-entry.png)
_Enter code 9C6DMQ during signup to receive your $25 bonus_
```

---

## 4. Mobile-First Blog Styling

### Table Responsiveness

Tables should be readable on mobile without horizontal scrolling:

```css
/* Wrap tables for horizontal scroll on mobile */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Make table cells more readable */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.5rem;
    white-space: nowrap; /* Prevent awkward wrapping */
  }
}
```

### Key Mobile CSS Improvements Implemented

- **Larger tap targets** for links and buttons (min 44px)
- **Readable font sizes** – body text at least 16px on mobile
- **Proper line height** – 1.6-1.8 for body text
- **Table formatting** – horizontal scroll wrapper, proper padding
- **Image sizing** – `max-width: 100%` with proper aspect ratios
- **Spacing adjustments** – tighter margins/padding on mobile

### Responsive Hero Strip CTA Pattern

For inline CTA strips in markdown (e.g., "Looking for a code? **9C6DMQ** → Get $25"), use this flexbox pattern that works across all screen sizes:

```html
<div
  style="margin: 1rem 0; padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.5rem); background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 8px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.75rem; text-align: center;"
>
  <span
    style="color: #065f46; font-weight: 500; font-size: clamp(0.9rem, 1.5vw, 1.1rem); flex: 1 1 auto; min-width: 200px;"
    >Your message here <strong style="font-size: clamp(1rem, 1.8vw, 1.25rem);">CODE</strong></span
  >
  <a
    href="/"
    style="display: inline-block; padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1.25rem, 2vw, 2rem); background: #059669; color: white; font-weight: 700; font-size: clamp(0.85rem, 1.2vw, 1rem); border-radius: 6px; text-decoration: none; white-space: nowrap;"
    >CTA Text →</a
  >
</div>
```

**Key techniques:**

- `clamp(min, preferred, max)` for responsive sizing without media queries
- `flex: 1 1 auto; min-width: 200px` on text span makes it expand on desktop, wrap on mobile
- `justify-content: center; text-align: center` centers content when wrapped
- `white-space: nowrap` on button prevents button text from wrapping

**Behavior:**

- **Desktop:** Text on left (takes available space), button on right
- **Mobile (wrapped):** Text centered above, button centered below

---

## 5. Image Sitemap

### Why Implement It

Image sitemaps are easy to implement and help Google discover/index images faster. Worth doing for any image-heavy site.

### Basic Implementation

Create `public/image-sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://yoursite.com/blog/post-slug/</loc>
    <image:image>
      <image:loc>https://yoursite.com/_astro/image-name.webp</image:loc>
      <image:caption>Descriptive caption for SEO</image:caption>
    </image:image>
  </url>
</urlset>
```

### Reference in robots.txt

```
Sitemap: https://yoursite.com/sitemap-index.xml
Sitemap: https://yoursite.com/image-sitemap.xml
```

---

## 6. Language Picker Placement (EN/FR)

### Required Locations

For bilingual sites, the language picker must appear in **two places**:

1. **Header/Top of page** – Immediately visible, users expect it there
2. **Footer** – Backup location for users who scroll to bottom

> [!IMPORTANT]
> Having both locations is crucial for user experience and helps search engines understand the site's language structure.

### Implementation Notes

- Use `<link rel="alternate" hreflang="fr">` tags in `<head>` for SEO
- Ensure picker is visible on mobile (hamburger menus often hide it)

---

## 7. Citation URL Verification

### LLM-Generated Citations May Be Outdated

> [!WARNING]
> When using AI to generate content with citations, always manually verify URLs. LLMs may reference:
>
> - Moved pages (old URLs that now 404)
> - Archived content
> - Pages that no longer exist

### Verification Checklist

- [ ] Click every citation link to confirm it loads
- [ ] Check for redirect chains (original URL → new URL)
- [ ] Verify the linked content still supports your claim
- [ ] Use `curl -I [URL]` to quickly check HTTP status codes

### Batch URL Checking

```bash
# Quick check for 404s (run in Git Bash)
grep -roh 'https://[^")\s]*' src/data/post/*.md | sort -u | while read url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$status" != "200" ]; then
    echo "$status: $url"
  fi
done
```

---

## 8. Using Codex for SEO Review

### When to Use Codex as Second Opinion

Codex (or similar AI tools) with codebase context can be valuable for:

- **SEO audit** – Reviewing meta tags, schema markup, heading structure
- **Content gap analysis** – Comparing your coverage vs. competitors
- **Technical SEO** – Checking for canonical issues, hreflang implementation
- **Schema validation** – Ensuring JSON-LD is correctly structured

### Workflow

1. Provide Codex with relevant files (markdown posts, config, schema components)
2. Ask specific questions: "Review this article's SEO – are there missing opportunities?"
3. Cross-reference suggestions against Google's guidelines
4. Implement improvements that make sense for your goals

---

## 9. Quick Reference Commands

```bash
# Format and check in one command
npx prettier --write . && npm run check

# Build and preview locally
npm run build && npm run preview

# Check for broken internal links (if implemented)
npm run check:links

# Verify image URLs haven't changed
git diff --name-only | grep "_astro"
```

---

## 10. Pre-Publish Checklist

- [ ] `npx prettier --write . && npm run check` passes
- [ ] All citation URLs verified (no 404s)
- [ ] Images have alt text, captions, and descriptive filenames
- [ ] Money shot images are finalized (won't change post-publish)
- [ ] Language picker visible in header AND footer
- [ ] Tables render correctly on mobile
- [ ] Schema markup validates (test with Google's Rich Results Test)
- [ ] Image sitemap updated with new images

---

## 11. Bing IndexNow Troubleshooting

### Common 403 "UserForbiddedToAccessSite" Error

If IndexNow submissions fail with 403, check these in order:

#### 1. Key File Format (Most Common Issue)

The key file must have **no trailing newline or CRLF**:

```powershell
# Check file size - should be exactly 32 bytes for a 32-char key
(Get-Item "public\<key>.txt").Length

# Fix: Write without trailing newline
[System.IO.File]::WriteAllText("public\<key>.txt", "<your-32-char-key>")
```

> [!CAUTION]
> Windows editors add CRLF (`\r\n`) by default. IndexNow is strict - even a single extra byte causes 403.

#### 2. Preview Deploys Cause 403s

IndexNow runs on every build by default. Preview deploys use a different domain but submit with production host, causing 403.

**Fix in `astro.config.ts`:**

```typescript
// Only run IndexNow on production builds
...(process.env.VERCEL_ENV === 'production'
  ? [indexnow({ key: 'your-key-here' })]
  : []),
```

#### 3. Test with Alternative Endpoints

If Bing returns 403, test Yandex to isolate the issue:

```powershell
# Yandex often accepts when Bing is blocking
Invoke-WebRequest -Uri "https://yandex.com/indexnow?url=https://yoursite.com/&key=<key>" -UseBasicParsing
```

If Yandex returns 202 but Bing returns 403, it's a Bing-specific cache/rate-limit issue. Wait 24-48 hours.

#### 4. Verify Key File is Accessible

```powershell
# Check key file returns 200 with correct content-type
(Invoke-WebRequest -Uri "https://yoursite.com/<key>.txt" -UseBasicParsing).Headers
# Should show: Content-Type: text/plain, Content-Length: 32
```

#### 5. Get Detailed Error Message

```powershell
$body = '{"host":"yoursite.com","key":"<key>","keyLocation":"https://yoursite.com/<key>.txt","urlList":["https://yoursite.com/"]}'
try {
    Invoke-WebRequest -Uri "https://api.indexnow.org/indexnow" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
} catch {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = [System.IO.StreamReader]::new($stream)
    Write-Host $reader.ReadToEnd()  # Shows: "UserForbiddedToAccessSite" or similar
}
```

#### 6. If All Else Fails

- **Rotate the key**: Generate a new 32-char key, update config and key file
- **Use Bing Webmaster Tools**: Submit URLs directly via the dashboard instead of API
- **Wait 24-48 hours**: Bing may have cached a "bad" validation state

---

### Root Cause Analysis (Jan 2026 Case Study)

**Symptom:** Persistent 403 errors in Vercel build logs despite correct key file setup.

**Investigation Results:**

1. Key file was accessible (returned 200, correct Content-Type, 32 bytes)
2. No Vercel WAF rules or middleware blocking
3. Yandex IndexNow endpoint **accepted** submissions (202)
4. Bing endpoint **rejected** submissions (403) with empty response body

**Root Cause:** Bing had "poisoned" the original key after repeated failed attempts (during early debugging with CRLF issues). Even after fixing the key file, Bing continued to reject the key.

**Solution:** Generate and deploy a completely fresh key:

```powershell
# Generate new 32-char hex key (using GUID)
[guid]::NewGuid().ToString("N")
# Example output: ca076a24121f4be8852528ce8a78be62
```

Then:

1. Create `public/<new-key>.txt` with the key as content (no trailing newline)
2. Update `astro.config.ts` with the new key
3. Delete the old key file
4. Commit and deploy

**Result:** `Successfully submitted 120 URLs to IndexNow` ✅

> [!TIP]
> If you get persistent 403 errors even after verifying your key file is correct, rotating to a fresh key is often the fastest fix. IndexNow keys are self-generated (not from Bing), so you can create them anytime.
