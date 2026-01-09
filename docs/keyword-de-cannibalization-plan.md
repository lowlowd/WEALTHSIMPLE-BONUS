# Keyword De-Cannibalization Plan

## The Problem

All 4 URLs are currently competing for **"Wealthsimple referral code"**:

| URL      | Current Title                                                         |
| -------- | --------------------------------------------------------------------- |
| Homepage | "Wealthsimple Bonus - Get $25 Cash When You Sign Up"                  |
| Post 1   | "Wealthsimple Referral Code 2026: Get $25 Bonus (Ultimate Guide)"     |
| Post 2   | "Wealthsimple Promo Code 2026: Best Deals & Bonuses (Guide)"          |
| Post 3   | "How to Add Wealthsimple Referral Code After Signing Up (2026 Guide)" |

---

## The Solution: Keyword Mapping

| URL          | Target Query                          | Intent                            |
| ------------ | ------------------------------------- | --------------------------------- |
| **Homepage** | "wealthsimple referral code"          | Transactional (ready to sign up)  |
| **Post 1**   | "wealthsimple review"                 | Informational (research phase)    |
| **Post 2**   | "wealthsimple promo code vs referral" | Comparison (deciding which)       |
| **Post 3**   | "add referral code after signup"      | Problem-solving (missed the code) |

---

## Post 1: wealthsimple-referral-code-2025.md

**Current:** `Wealthsimple Referral Code 2026: Get $25 Bonus (Ultimate Guide)`

**New Role:** Become the authoritative "Hub" page linking to all other content

### Recommended Changes

**Option Selected:** Option 2 (Review Focus) - highest search volume

| Element   | New Value                                                                 |
| --------- | ------------------------------------------------------------------------- |
| **Title** | `Wealthsimple Review 2026: Is It Worth It? (Fees, Accounts & Bonuses)`    |
| **H1**    | (same as title)                                                           |
| **Slug**  | Consider renaming file to `wealthsimple-review-2026.md` with 301 redirect |

### Content Changes

1. Add "Quick Navigation" hub section after intro:

   ```markdown
   ## Quick Navigation

   - [Get the $25 Sign-Up Bonus →](/) (Homepage)
   - [Promo vs Referral Codes →](/blog/promo-code-vs-referral-code)
   - [Missed Your Code? Add It Retroactively →](/blog/add-referral-code-after-signup)
   - [Platform Overview](#what-is-wealthsimple) (this page)
   ```

2. Restructure as a comprehensive platform review (not just referral focus)

---

## Post 2: promo-code-vs-referral-code.md

**Current:** `Wealthsimple Promo Code 2026: Best Deals & Bonuses (Guide)`

**New Role:** A "chooser" page that helps users decide, then funnels decision-ready users to Homepage

### Metadata Changes

| Element            | Current Value                                                    | New Value                                                                                    |
| ------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Title**          | `Wealthsimple Promo Code 2026: Best Deals & Bonuses (Guide)`     | `Wealthsimple Promo vs Referral Code (2026): Which Is Better?`                               |
| **H1**             | (same as current title)                                          | `Wealthsimple Promo vs Referral Code (2026): Which Is Better?`                               |
| **Meta Desc**      | (default/missing)                                                | `Promo code or referral code? Compare minimum deposits, rewards, and availability to choose the best Wealthsimple signup option for your situation.` |
| **Image Caption**  | `Comparison of Wealthsimple promo codes vs referral codes for 2026` | `Side-by-side comparison: Wealthsimple promo code vs referral code (2026 requirements and rewards)` |

**Target Query:** "wealthsimple promo code vs referral code"

### New Intro Paragraph

Replace the current intro with:

> Let's clear this up once and for all. I've helped dozens of friends set up their accounts, and the first question is always: "Do I have a promo code?" I usually have to break the news that unless they're transferring a six-figure inheritance, a referral code is actually what they're looking for.
>
> 👉 Ready to get the code? [Copy the current Wealthsimple referral code here](/) (opens the homepage).

### Hero Alert Block (Traffic Shunt)

Add this block **immediately after the H1 and excerpt, before the opening paragraph** — it should be the first actionable element a user sees:

```
H1: Wealthsimple Promo Code vs Referral Code (2026): Which Is Better?
Excerpt: [meta description text]
[BLUE HERO ALERT BOX with "Get the $25 Code" CTA → /]
Opening paragraph: "Let's clear this up once and for all..."
```

```html
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r">
  <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
    <div class="flex-1">
      <p class="font-bold text-blue-900 m-0 text-lg">
        ⚡️ Fast Answer:
      </p>
      <p class="text-sm text-blue-800 m-0 mt-1">
        Unless you're depositing <strong>$100K+</strong>, you don't need a "Promo Code." Use a standard <strong>Referral Code</strong> to get the $25 cash bonus (deposit just $1).
      </p>
    </div>
    
    <a href="/" 
       class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow-sm text-sm whitespace-nowrap no-underline transition">
      Get the $25 Code &raquo;
    </a>
  </div>
</div>
```

**Copy improvements made:**
- Fixed "fast" → "Fast" (typo)
- Changed "you probably don't need" → "you don't need" (more direct/confident)
- Added "(deposit just $1)" to emphasize low barrier
- Changed `href="https://wealthsimplebonus.ca/"` → `href="/"` (relative link is cleaner)

> [!NOTE]
> **Implementation Options:** If raw HTML doesn't render in markdown, either:
> 1. Add it in the Astro layout as a conditional component: `{post.slug === 'promo-code-vs-referral-code' && <HeroAlert />}`
> 2. Create a reusable `HeroAlert.astro` component and import it

### Why This Works

1. **Signals intent to Google**: The page is clearly a comparison/chooser, not a "get code now" page
2. **De-cannibalizes from Homepage**: Users ready to sign up are directed to `/` instead of converting here
3. **Improves UX**: Users who genuinely need the comparison can scroll down; users who just want the code get it immediately

---

## Post 3: add-referral-code-after-signup.md

**Current:** `How to Add Wealthsimple Referral Code After Signing Up (2026 Guide)`

**New Role:** Problem-solving for existing users

### Recommended Changes (TBD - awaiting user input)

| Element   | Proposed Value                                                       |
| --------- | -------------------------------------------------------------------- |
| **Title** | `Forgot Your Wealthsimple Referral Code? How to Add It After Signup` |
| **H1**    | (same as title)                                                      |

**Target Query:** "add referral code after signup wealthsimple"

---

## Homepage

**Keep as-is:** The homepage remains the transactional target for "wealthsimple referral code" and "wealthsimple bonus"

---

## URL Migration Strategy (If Changing URLs)

If you decide to change the URL/slug for any post (e.g., `/blog/wealthsimple-referral-code-2025` → new hub URL), follow this **minimum viable migration checklist**:

### 1. Server-Side Redirects

Add a **one-hop 301 or 308** permanent redirect from the old URL to the new URL. Google recommends server-side redirects for URL changes.

```js
// vercel.json example
{
  "source": "/blog/wealthsimple-referral-code-2025",
  "destination": "/blog/wealthsimple-review-2026",
  "permanent": true
}
```

### 2. Canonical Tag

Ensure the new URL has a **self-referencing canonical** tag pointing to itself.

### 3. Internal Links

Update **all internal links** across the site to point to the new URL (not the old URL that redirects). Google specifically calls this out as part of URL-change moves.

### 4. Sitemap Updates

- Update your sitemap to include the new URL
- Remove the old URL
- Resubmit sitemap to Google Search Console
- Note: Google says warnings about redirected old URLs in sitemap can be normal during moves

> [!IMPORTANT]
> **The Key Nuance**: Even if you change the URL, you still have to remove the "current referral code" / "sign up here" blocks from being prominent in the content. **Content and intent, not just the slug**, is what makes Google treat it as a competing page.
>
> The URL change is optional; the **intent rewrite + internal linking to Homepage** is the non-negotiable part for getting the homepage to win.

### 5. When to Change URLs

- If the site has existing backlinks or rankings to the old URL, changing the URL is still doable
- **Do it only once** to avoid forcing Google to reprocess moves repeatedly
- Consider preserving the URL if backlink equity is significant

---

## Implementation Checklist

- [ ] **Post 1:** Update title, H1, add navigation hub, restructure as review
- [ ] **Post 2:** Update title/H1 (awaiting user feedback)
- [ ] **Post 3:** Update title/H1 (awaiting user feedback)
- [ ] **Redirects:** Set up 301 redirects if any slugs change
- [ ] **Internal Links:** Update cross-links between all pages
- [ ] **French Versions:** Apply equivalent changes to FR posts

---

## Status

⏳ **Awaiting user input** on Post 2 and Post 3 strategy before implementation.
