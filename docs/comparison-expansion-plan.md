# Comparison Hub - Expansion Plan

## Overview

Build a **Comparisons Hub** for scannable, transactional users who want quick side-by-side comparisons. Deep-dive readers can click through to existing blog posts.

---

## Question 1: Who Should We Compare Wealthsimple To?

### By Product Category

Wealthsimple offers multiple products, each with different competitors:

| Wealthsimple Product       | Competitors to Compare                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| **Trading/Investing**      | Questrade, Interactive Brokers, TD Direct, RBC Direct, CIBC Investor's Edge, National Bank Direct |
| **Robo-Advisor (Managed)** | Questwealth, CI Direct, Justwealth, Nest Wealth                                                   |
| **Crypto**                 | Newton, Shakepay, Bitbuy, NDAX, Coinsquare, Kraken                                                |
| **Cash Account**           | EQ Bank, Tangerine, Simplii, Neo Financial, Koho                                                  |
| **Tax**                    | TurboTax, H&R Block, StudioTax, Cloudtax                                                          |

### Existing Blog Coverage

You already have:

- ✅ `wealthsimple-vs-questrade-2025.mdx` (Trading)
- ✅ `wealthsimple-crypto-vs-newton-vs-shakepay.mdx` (Crypto)

---

## Question 2: Should There Be Multiple Categories?

### Option A: Single Flat Page

All comparisons on one page, sectioned by product type.

- **Pros:** Simple, one URL to promote
- **Cons:** Long page, harder to target specific keywords

### Option B: Category Hub + Individual Comparison Pages

```
/compare/                     → Hub page with all categories
/compare/trading/             → All trading platform comparisons
/compare/trading/questrade    → Detailed Questrade comparison
/compare/crypto/              → All crypto comparisons
/compare/crypto/newton        → Detailed Newton comparison
```

- **Pros:** Better SEO (targeted URLs), scalable, cleaner UX
- **Cons:** More pages to build

### Option C: Hybrid (Recommended)

```
/compare/                     → Quick comparison tables for everything
                              → Links to blog posts for deep dives
```

- The hub page has compact comparison cards/tables
- Each comparison links to existing or new blog posts
- No need for `/compare/trading/questrade` if blog post exists

---

## Question 3: What Goes in Each Comparison?

### Quick Comparison Card (Hub Page)

| Element      | Example                                     |
| ------------ | ------------------------------------------- |
| Logo/Name    | Wealthsimple vs Questrade                   |
| Best For     | "Beginners" vs "Active Traders"             |
| Key Stats    | Fees, minimums, account types               |
| Your Verdict | One-liner recommendation                    |
| CTA          | Referral link + "Full Comparison" blog link |

### Suggested Fields Per Comparison

- Trading fees / commission
- Account minimum
- Available account types (TFSA, RRSP, etc.)
- Mobile app quality
- Best for (user type)
- Referral bonus (if any)

---

## Proposed Comparison List

### Tier 1 (High Priority - Most Searched)

1. **Wealthsimple vs Questrade** ✅ (blog exists)
2. **Wealthsimple vs Interactive Brokers**
3. **Wealthsimple Cash vs EQ Bank**
4. **Wealthsimple Crypto vs Newton vs Shakepay** ✅ (blog exists)
5. **Wealthsimple Tax vs TurboTax**

### Tier 2 (Medium Priority)

6. Wealthsimple vs TD Direct Investing
7. Wealthsimple vs RBC Direct Investing
8. Wealthsimple Managed vs Questwealth
9. Wealthsimple Crypto vs Bitbuy

### Tier 3 (Lower Priority - Nice to Have)

10. Wealthsimple vs BMO InvestorLine
11. Wealthsimple vs CIBC Investor's Edge
12. Wealthsimple Cash vs Tangerine

---

## Monetization Strategy

| Platform     | Referral Available? | Priority              |
| ------------ | ------------------- | --------------------- |
| Wealthsimple | ✅ Yes (your code)  | Always primary        |
| Questrade    | ✅ Sometimes        | Check current promo   |
| EQ Bank      | ✅ Yes              | Include if beneficial |
| Newton       | ✅ Yes              | Include for crypto    |
| Shakepay     | ✅ Yes              | Include for crypto    |
| TurboTax     | ❓ Affiliate?       | Research              |

---

## Next Steps (Need Your Input)

1. **Which categories matter most?** All products or focus on Trading + Crypto?
2. **Hub structure preference?** Option A, B, or C?
3. **How many comparisons to start?** Just Tier 1 (5) or more?
4. **French versions needed?** Build `/fr/comparaisons/` too?
5. **Do you have referral links for competitors** like Newton, Shakepay, Questrade?
