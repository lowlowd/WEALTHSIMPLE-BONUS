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

**New Role:** Authoritative "Hub" page linking to all other content

### Implemented Changes ✅ COMPLETE

| Change | Status |
|--------|--------|
| Rewrote opening paragraph (hub-focused, not "get code now") | ✅ Done |
| Replaced TL;DR with "Quick Navigation" hub section | ✅ Done |
| Updated "Current Referral Code" callout → homepage | ✅ Done |
| Updated "Ready to Claim" CTA → homepage | ✅ Done |

### Quick Navigation Section Added:
```markdown
- **[Get the $25 referral code →](/)** (Homepage—copy/paste ready)
- **[Promo vs Referral: Which is better? →](/blog/promo-code-vs-referral-code)**
- **[Forgot your code? Add it after signup →](/blog/add-referral-code-after-signup)**
- **Platform overview** (this page)
```

### Optional: URL Change
Consider renaming file to `wealthsimple-review-2026.md` with 301 redirect. This is optional since the content intent rewrite is the non-negotiable fix.

---

## Post 2: promo-code-vs-referral-code.md

**Current:** `Wealthsimple Promo Code 2026: Best Deals & Bonuses (Guide)`

**New Role:** Answer the specific comparison question, then redirect transactional traffic to homepage

### Recommended Changes ✅ CONFIRMED & IMPLEMENTED

| Element              | New Value                                                                                      | Status |
| -------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| **Title/H1**         | `Wealthsimple Promo Code vs Referral Code (2026): Which Is Better?`                            | ✅ Done |
| **Meta Description** | `Promo code or referral code? Compare minimum deposits, rewards, and availability...`          | ✅ Done |
| **Image Caption**    | `Side-by-side comparison: Wealthsimple promo code vs referral code (2026 requirements...)`    | ✅ Done |
| **Blue Hero Alert**  | "Fast Answer" box with CTA button → Homepage                                                   | ✅ Done |

### ⚠️ PROPOSED: Additional CTA Changes (for discussion)

**Goal:** Keep code visible for trust, but make homepage the execution destination.

#### Option A: Update "Current Referral Code" Callout

**Current:**
> Current Referral Code: 9C6DMQ
> 👉 Sign up with referral code 9C6DMQ and get your $25 bonus today.

**Proposed:**
> Current Referral Code: 9C6DMQ
> 👉 Copy the code and [claim on the homepage →](/) (1-click signup ready)

#### Option B: Update "Final Recommendation" Section

**Current:**
> 👉 Sign up with referral code 9C6DMQ and get your $25+ bonus.

**Proposed:**
> 👉 [Get the current referral code on the homepage →](/) and claim your $25 bonus in 2 minutes.

**Target Query:** "wealthsimple promo code vs referral code"

---

## Post 3: add-referral-code-after-signup.md

**Current:** `How to Add Wealthsimple Referral Code After Signing Up (2026 Guide)`

**New Role:** Problem-solving for "Panic" users (already sold, just hit a snag)

### Strategy ✅ CONFIRMED: No URL/Title Change — Add Hero Alert

**Why keep the title?** This page targets a completely different intent:

| Page | Intent | User Mindset |
|------|--------|------|
| Homepage | Future Signups | "I want to join" |
| Hub/Guide (Post 1) | Research | "Is this platform good?" |
| **This Page** | Support/Panic | "I made a mistake, help me!" |

### Change: Add "Don't Panic" Hero Alert (after H1)

```html
<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r">
  <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
    <div class="flex-1">
      <p class="font-bold text-green-900 m-0 text-lg">
        ✅ Good News: You likely still have time.
      </p>
      <p class="text-sm text-green-800 m-0 mt-1">
        If you funded your account <strong>less than 7 days ago</strong>, you can add code <strong>9C6DMQ</strong> in the app settings right now to claim your $25.
      </p>
    </div>
  </div>
</div>
```

**Target Query:** "add referral code after signup wealthsimple"

---

## Homepage

**Keep as-is:** The homepage remains the transactional target for "wealthsimple referral code" and "wealthsimple bonus"

---

## Implementation Checklist

- [x] **Post 1:** Hub conversion complete (hero strip, navigation, CTA updates)
- [x] **Post 2:** Hero strip added, title/meta/caption updated
- [x] **Post 3:** Hero strip added
- [x] **Redirects:** 301 redirects set up for EN/FR Post 1 new URLs
- [x] **Internal Links:** Cross-links updated between all pages
- [x] **French Versions:** All 3 FR posts have hero strips matching EN

---

## 🎨 Hero Alert Strategy (PROPOSED - Review First)

> **Status:** See current implementation in browser before finalizing. May adjust colors/messages.

### Unified Design Pattern

All 3 posts use hero alerts to funnel BOFU (bottom-of-funnel) users to homepage before they engage with supporting content.

### Post 1: Guide/Hub (`/blog/wealthsimple-guide`)

| Element | Value |
|---------|-------|
| **Color** | Gray/Black (`bg-gray-100`, `border-black`) |
| **Message** | "Just need the code? Skip the guide" |
| **CTA** | "Get the Code (Copy/Paste Ready)" |

### Post 2: Promo vs Referral (`/blog/promo-code-vs-referral-code`)

| Element | Value |
|---------|-------|
| **Color** | Blue (`bg-blue-50`, `border-blue-500`) |
| **Message** | "Unless depositing $100K+, use referral code" |
| **CTA** | "Get the $25 Code" |

### Post 3: Add After Signup (`/blog/add-referral-code-after-signup`)

| Element | Value |
|---------|-------|
| **Color** | Blue (`bg-blue-50`, `border-blue-500`) |
| **Message** | "Unfunded or within 7 days? You can still add it" |
| **CTA** | "Get the Code" |

---

## Status

✅ **Core implementation complete.** Review hero alerts in browser before finalizing unified design.
