# Hero Images Alt Text SEO Audit

**Generated:** January 4, 2026  
**Total Blog Posts:** 20 (10 English, 10 French)

---

## Executive Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| Posts WITH alt text defined | 6 | 30% |
| Posts MISSING alt text | 14 | 70% |
| **SEO Score** | ⚠️ **Needs Improvement** | |

### Current Behavior
The `SinglePost.astro` and `SinglePostFr.astro` components use `post.title` as a fallback for alt text when `imageCaption` is not defined:
```astro
alt={post?.title || 'Blog post image'}
```

**This means images are NOT broken for SEO** - they all have alt text (the post title). However, this is suboptimal because:
1. Alt text should describe the IMAGE, not the article
2. Keyword-rich, descriptive alt text improves image search rankings
3. Post titles are often too long for optimal alt text (should be under 125 characters)

---

## Detailed Analysis

### ✅ Posts WITH `imageCaption` Defined (6 posts)

#### English Posts (3)
| File | imageCaption |
|------|--------------|
| `add-referral-code-after-signup.md` | Has custom imageCaption |
| `promo-code-vs-referral-code.md` | Has custom imageCaption |
| `wealthsimple-referral-code-2025.md` | Has custom imageCaption |

#### French Posts (3)
| File | imageCaption |
|------|--------------|
| `ajouter-code-parrainage-apres-inscription.md` | Has custom imageCaption |
| `code-de-parrainage-wealthsimple-2025.md` | Has custom imageCaption |
| `code-promo-vs-code-parrainage.md` | Has custom imageCaption |

---

### ❌ Posts MISSING `imageCaption` (14 posts - Using Title as Fallback)

#### English Posts (7)

| Post | Current Fallback Alt (Title) | Recommended Alt Text |
|------|------------------------------|----------------------|
| `core-vs-premium-vs-generation.md` | "Wealthsimple Core vs Premium vs Generation (2026 Comparison)" | "Comparison chart showing Wealthsimple Core, Premium, and Generation account tiers with pricing and features" |
| `referral-bonus-terms-conditions.md` | "Wealthsimple Referral Bonus Terms & Conditions (2026)" | "Wealthsimple referral bonus terms and conditions document with key requirements highlighted" |
| `referral-ladder-challenge.md` | "Wealthsimple Referral Ladder Challenge 2026: Earn Up to $5,000" | "Wealthsimple referral ladder showing bonus tiers from 1 to 25 referrals with $5,000 maximum" |
| `wealthsimple-cash-account-review.md` | "Wealthsimple Cash Review 2026: Rates & Features (Updated)" | "Wealthsimple Cash account interface showing high-interest savings rate and cash card" |
| `wealthsimple-crypto-vs-newton-vs-shakepay.md` | "Wealthsimple Crypto vs Newton vs Shakepay (2026 Review)" | "Comparison of Wealthsimple Crypto, Newton, and Shakepay Canadian crypto platforms side by side" |
| `wealthsimple-tax-review-2025.md` | "Wealthsimple Tax Review 2026: Free Tax Filing for Canadians" | "Wealthsimple Tax interface showing free Canadian tax filing dashboard with CRA autofill" |
| `wealthsimple-vs-questrade-2025.md` | "Wealthsimple vs Questrade Fees 2026: Complete Comparison" | "Wealthsimple vs Questrade fee comparison chart showing commission-free trading vs Questrade fees" |

#### French Posts (7)

| Post | Current Fallback Alt (Title) | Recommended Alt Text |
|------|------------------------------|----------------------|
| `conditions-prime-parrainage.md` | "Prime parrainage Wealthsimple : Conditions & Règles (2026)" | "Document des conditions et règles de la prime de parrainage Wealthsimple avec exigences clés" |
| `core-vs-premium-vs-generation.md` | "Wealthsimple Core vs Premium vs Génération (Comparatif 2026)" | "Tableau comparatif des comptes Wealthsimple Core, Premium et Génération avec prix et fonctionnalités" |
| `defi-echelle-parrainage.md` | "Défi Échelle Wealthsimple 2026 : Gagnez 5 000 $" | "Échelle de parrainage Wealthsimple montrant les paliers de bonus de 1 à 25 parrainages" |
| `evaluation-compte-wealthsimple-comptant.md` | "Avis Wealthsimple Cash 2026 : Intérêts & Carte (Évaluation)" | "Interface du compte Wealthsimple Cash montrant le taux d'intérêt élevé et la carte" |
| `evaluation-wealthsimple-impot.md` | "Avis Wealthsimple Impôt 2026 : Gratuit & Simple (Canadiens)" | "Interface Wealthsimple Impôt montrant la déclaration gratuite avec Préremplir mon ARC" |
| `wealthsimple-crypto-vs-newton-vs-shakepay.md` | "Wealthsimple Crypto vs Newton vs Shakepay (Avis 2026)" | "Comparaison des plateformes crypto canadiennes Wealthsimple, Newton et Shakepay" |
| `wealthsimple-vs-questrade-2025.md` | "Wealthsimple vs Questrade 2026 : Comparatif & Frais" | "Comparatif des frais Wealthsimple vs Questrade montrant les transactions sans commission" |

---

## Image File Inventory

### Public Folder Images (`.webp` format) - 6 files
These use the `/images/` path and ALL have `imageCaption` defined ✅

| Path | Language |
|------|----------|
| `/images/en/wealthsimple-add-referral-code-9c6dmq-after-signup.webp` | EN |
| `/images/en/wealthsimple-promo-code-vs-referral-code.webp` | EN |
| `/images/en/wealthsimple-referral-code-9c6dmq.webp` | EN |
| `/images/fr/wealthsimple-ajouter-code-parrainage-9c6dmq.webp` | FR |
| `/images/fr/code-parrainage-wealthsimple-9c6dmq.webp` | FR |
| `/images/fr/wealthsimple-code-promo-vs-parrainage.webp` | FR |

### Assets Folder Images (`.png` format) - 13 unique files
These use the `~/assets/images/` path and are ALL missing `imageCaption` ❌

| Path | Used By |
|------|---------|
| `~/assets/images/core-vs-premium-vs-generation.png` | EN only |
| `~/assets/images/core-vs-premium-vs-generation-fr.png` | FR only |
| `~/assets/images/referral-bonus-terms-conditions.png` | EN only |
| `~/assets/images/conditions-prime-parrainage.png` | FR only |
| `~/assets/images/referral-ladder-challenge.png` | EN only |
| `~/assets/images/defi-echelle-parrainage.png` | FR only |
| `~/assets/images/wealthsimple-cash-account-review.png` | EN only |
| `~/assets/images/evaluation-compte-wealthsimple-comptant.png` | FR only |
| `~/assets/images/wealthsimple-crypto-vs-newton-vs-shakepay.png` | EN + FR |
| `~/assets/images/wealthsimple-tax-review-2026.png` | EN only |
| `~/assets/images/evaluation-wealthsimple-impot.png` | FR only |
| `~/assets/images/wealthsimple-vs-questrade-2025.png` | EN only |
| `~/assets/images/wealthsimple-vs-questrade.png` | FR only |

---

## SEO Best Practices for Alt Text

### ✅ Do's
1. **Be descriptive** - Describe what the image actually shows
2. **Include keywords naturally** - "Wealthsimple referral code bonus $25" is better than just "bonus"
3. **Keep under 125 characters** - Screen readers and search engines prefer concise alt text
4. **Be specific** - "Wealthsimple Cash card with 4% interest rate displayed" vs "bank card"
5. **Match the content language** - French posts should have French alt text

### ❌ Don'ts
1. **Don't start with "Image of..." or "Picture of..."** - Redundant
2. **Don't use just the post title** - It describes the article, not the image
3. **Don't keyword stuff** - "Wealthsimple referral code promo code bonus free money sign up" is spam
4. **Don't leave empty** - Always have descriptive alt text

---

## Action Items

### Option 1: Add `imageAlt` Field (Recommended)

Add a dedicated `imageAlt` field to each post's frontmatter for explicit control:

```yaml
---
title: 'Wealthsimple Crypto vs Newton vs Shakepay (2026 Review)'
image: ~/assets/images/wealthsimple-crypto-vs-newton-vs-shakepay.png
imageAlt: 'Comparison of Wealthsimple Crypto, Newton, and Shakepay platforms'
---
```

Then update `SinglePost.astro` and `SinglePostFr.astro`:
```astro
alt={post.imageAlt || post.imageCaption || post.title || 'Blog post image'}
```

### Option 2: Standardize on `imageCaption`

Add `imageCaption` to all 14 posts missing it. This field already works in the current code.

### Priority Order
1. **High Priority** - Main referral/bonus posts (most traffic)
2. **Medium Priority** - Comparison posts  
3. **Lower Priority** - Review posts

---

## Summary

| Status | Action Needed |
|--------|---------------|
| 🟢 Current | All images have alt text (title fallback) - Not broken |
| 🟡 Optimization | Add descriptive `imageCaption` to 14 posts |
| 🔵 Future | Consider `imageAlt` field for better semantic separation |

**Estimated Impact:** Improved image search rankings and accessibility scores
