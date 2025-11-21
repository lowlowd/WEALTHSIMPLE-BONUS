# Blog SEO Audit & 404 Link Solution Plan

## 📅 PUBLISHING SCHEDULE

| Order | Post                               | Publish Date | Days Until Published |
| ----- | ---------------------------------- | ------------ | -------------------- |
| 1     | `koho-fraud-protection-2025.md`    | Nov 20, 2025 | Day 1                |
| 2     | `koho-newcomers-2025.md`           | Nov 23, 2025 | Day 4                |
| 3     | `koho-travelers-2025.md`           | Nov 27, 2025 | Day 8                |
| 4     | `koho-families-2025.md`            | Nov 30, 2025 | Day 11               |
| 5     | `koho-spending-control.md`         | Dec 4, 2025  | Day 15               |
| 6     | `koho-vs-savings-accounts-2025.md` | Dec 8, 2025  | Day 19               |
| 7     | `koho-vs-prepaid-cards-2025.md`    | Dec 12, 2025 | Day 23               |
| 8     | `save-money-2025.md`               | Dec 15, 2025 | Day 26               |
| 9     | `side-hustles-2025.md`             | Dec 19, 2025 | Day 30               |

**Timeline:** 30 days (Nov 20 - Dec 19)

---

## 🚨 THE 404 PROBLEM

### Current Internal Link Structure (Hub & Spoke):

Each post links to:

1. **Homepage (Hub)** - ✅ Always available
2. **One related post (Spoke)** - ❌ **PROBLEM: May not be published yet!**

### Broken Link Scenarios:

| Post                               | Links To Spoke                   | Publish Date Gap | Issue                          |
| ---------------------------------- | -------------------------------- | ---------------- | ------------------------------ |
| `koho-fraud-protection-2025.md`    | `/koho-travelers-2025`           | 7 days later     | ✅ **Will be 404 for 7 days**  |
| `koho-newcomers-2025.md`           | `/koho-vs-savings-accounts-2025` | 15 days later    | ✅ **Will be 404 for 15 days** |
| `koho-travelers-2025.md`           | `/koho-fraud-protection-2025`    | 7 days EARLIER   | ✅ **OK - already published**  |
| `koho-families-2025.md`            | `/save-money-2025`               | 15 days later    | ✅ **Will be 404 for 15 days** |
| `koho-spending-control.md`         | `/koho-vs-savings-accounts-2025` | 4 days later     | ✅ **Will be 404 for 4 days**  |
| `koho-vs-savings-accounts-2025.md` | `/koho-spending-control`         | 4 days EARLIER   | ✅ **OK - already published**  |
| `koho-vs-prepaid-cards-2025.md`    | `/koho-fraud-protection-2025`    | 22 days EARLIER  | ✅ **OK - already published**  |
| `save-money-2025.md`               | `/side-hustles-2025`             | 4 days later     | ✅ **Will be 404 for 4 days**  |
| `side-hustles-2025.md`             | `/koho-newcomers-2025`           | 26 days EARLIER  | ✅ **OK - already published**  |

### Summary of Issues:

- **5 posts will have 404 errors** (linking to unpublished content)
- **4 posts will work fine** (linking backward to already-published content)
- **Max 404 duration:** 15 days (koho-newcomers → savings-accounts)

---

## ✅ SOLUTION 1: "Safe Forward Linking" (RECOMMENDED)

### Strategy:

Replace "spoke" links that point to **future** posts with links to **already-published** posts or evergreen content.

### Revised Link Structure:

| Post                               | Current Spoke Link               | Issue      | New Safe Link                  | Rationale                                        |
| ---------------------------------- | -------------------------------- | ---------- | ------------------------------ | ------------------------------------------------ |
| `koho-fraud-protection-2025.md`    | `/koho-travelers-2025`           | 7-day 404  | `/koho-referral-code-bonus`    | Existing post about bonuses (security + rewards) |
| `koho-newcomers-2025.md`           | `/koho-vs-savings-accounts-2025` | 15-day 404 | `/koho-vs-canadian-banks-2025` | Existing comparison post                         |
| `koho-travelers-2025.md`           | `/koho-fraud-protection-2025`    | ✅ OK      | Keep as-is                     | Post #1 already live                             |
| `koho-families-2025.md`            | `/save-money-2025`               | 15-day 404 | `/best-money-saving-apps-2025` | Existing savings tips post                       |
| `koho-spending-control.md`         | `/koho-vs-savings-accounts-2025` | 4-day 404  | `/koho-referral-code-bonus`    | Bonus + budgeting connection                     |
| `koho-vs-savings-accounts-2025.md` | `/koho-spending-control`         | ✅ OK      | Keep as-is                     | Post #5 already live                             |
| `koho-vs-prepaid-cards-2025.md`    | `/koho-fraud-protection-2025`    | ✅ OK      | Keep as-is                     | Post #1 already live                             |
| `save-money-2025.md`               | `/side-hustles-2025`             | 4-day 404  | `/koho-referral-code-bonus`    | referrals = side income                          |
| `side-hustles-2025.md`             | `/koho-newcomers-2025`           | ✅ OK      | Keep as-is                     | Post #2 already live                             |

### Benefits:

- ✅ **Zero 404 errors**
- ✅ All links work from Day 1
- ✅ Still follows hub-and-spoke model
- ✅ Links remain contextually relevant
- ✅ No need to update later

---

## ✅ SOLUTION 2: "Delayed Spoke Linking" (Alternative)

### Strategy:

Remove spoke links initially, then add them retroactively once target posts are live.

### Implementation:

**Phase 1 (Initial Publish):**

- All 9 posts publish with:
  - ✅ Link to homepage (hub)
  - ❌ NO spoke link initially

**Phase 2 (Retroactive Updates):**

- **Nov 27:** Update `koho-fraud-protection-2025.md` to link to `/koho-travelers-2025`
- **Dec 8:** Update `koho-newcomers-2025.md` to link to `/koho-vs-savings-accounts-2025`
- **Dec 15:** Update `koho-families-2025.md` to link to `/save-money-2025`
- **Dec 8:** Update `koho-spending-control.md` to link to `/koho-vs-savings-accounts-2025`
- **Dec 19:** Update `save-money-2025.md` to link to `/side-hustles-2025`

### Pros:

- Posts eventually have perfect spoke links
- Follows original plan exactly
- Can automate with git commits

### Cons:

- Requires 5 manual updates over 30 days
- Misses early internal linking juice
- More complex to manage
- Risk of forgetting updates

---

## ✅ SOLUTION 3: "Homepage-Only Model" (Simplest)

### Strategy:

Every post links ONLY to the homepage (no spoke links at all).

### Implementation:

- All 9 posts: Hub link only
- Remove all spoke-to-spoke links

### Pros:

- Zero 404 risk
- Simplest implementation
- Max authority to homepage

### Cons:

- Loses topical clustering benefit
- Misses long-tail SEO from related content
- Less engaging user journey

---

## 📊 KEYWORD DENSITY AUDIT

### Current Implementation Status:

| Post                               | Primary Keyword       | Density | Links to Hub | Status       |
| ---------------------------------- | --------------------- | ------- | ------------ | ------------ |
| `koho-fraud-protection-2025.md`    | `koho referral code`  | ✅ Good | ✅ Yes       | ✅ Optimized |
| `koho-newcomers-2025.md`           | `koho referral`       | ✅ Good | ✅ Yes       | ✅ Optimized |
| `koho-travelers-2025.md`           | `koho promo code`     | ✅ Good | ✅ Yes       | ✅ Optimized |
| `koho-families-2025.md`            | `koho referral bonus` | ✅ Good | ✅ Yes       | ✅ Optimized |
| `koho-spending-control.md`         | `koho promotion`      | ✅ Good | ✅ Yes       | ✅ Optimized |
| `koho-vs-savings-accounts-2025.md` | `koho bonus`          | ✅ Good | ✅ Yes       | ✅ Optimized |
| `koho-vs-prepaid-cards-2025.md`    | `referral code koho`  | ✅ Good | ✅ Yes       | ✅ Optimized |
| `save-money-2025.md`               | `koho refer a friend` | ✅ Good | ✅ Yes       | ✅ Optimized |
| `side-hustles-2025.md`             | `koho refer a friend` | ✅ Good | ✅ Yes       | ✅ Optimized |

### Keyword Distribution:

- All 10 target keywords covered ✅
- High-volume keywords prioritized ✅
- Variety in keyword targeting ✅
- Natural integration (not keyword stuffing) ✅

---

## 🎯 RECOMMENDED SOLUTION

**I recommend SOLUTION 1: "Safe Forward Linking"**

### Why?

1. **User Experience:** No broken links ever
2. **SEO:** Maintains internal linking strength from Day 1
3. **Simplicity:** One-time setup, no follow-up needed
4. **Authority:** Still builds topical clusters
5. **Safety:** Zero risk of 404s hurting rankings

### Implementation:

Update spoke links in 5 posts to point to existing/safe content instead of future posts.

---

## 🔧 PROPOSED CHANGES

### Posts Requiring Link Updates:

#### 1. `koho-fraud-protection-2025.md`

**Current:** Links to `/koho-travelers-2025` (404 for 7 days)  
**Change to:** `/koho-referral-code-bonus`  
**New anchor text:** "Learn more about KOHO bonuses and security"

#### 2. `koho-newcomers-2025.md`

**Current:** Links to `/koho-vs-savings-accounts-2025` (404 for 15 days)  
**Change to:** `/koho-vs-canadian-banks-2025`  
**Keep anchor text:** "comparing KOHO vs traditional savings options"

#### 3. `koho-families-2025.md`

**Current:** Links to `/save-money-2025` (404 for 15 days)  
**Change to:** `/best-money-saving-apps-2025`  
**New anchor text:** "10 ways to save money as a family"

#### 4. `koho-spending-control.md`

**Current:** Links to `/koho-vs-savings-accounts-2025` (404 for 4 days)  
**Change to:** `/koho-referral-code-bonus`  
**New anchor text:** "maximize your KOHO bonus for better budgeting"

#### 5. `save-money-2025.md`

**Current:** Links to `/side-hustles-2025` (404 for 4 days)  
**Change to:** `/koho-referral-code-bonus`  
**New anchor text:** "earn money through KOHO referrals"

---

## ✅ FINAL VERDICT: KEYWORD STRATEGY

### Hub-and-Spoke Model: **SOLID** ✅

The current implementation is **excellent**:

1. **Keyword Coverage:** All 10 target keywords represented
2. **Volume Prioritization:** High-search keywords get priority posts
3. **Natural Distribution:** No keyword stuffing detected
4. **Hub Authority:** Every post links to homepage
5. **Variety:** Mix of exact match and LSI variations

### Minor Improvement Opportunities:

**Add "koho referral code 2025" more prominently:**

- Currently only in 1-2 posts
- Should appear in 4-5 posts (it's a 30/month keyword)
- Suggestion: Add to titles/metas where "2025" already exists

**Boost "koho refer a friend" visibility:**

- Currently limited to 2 posts
- This is a 20/month zero-competition keyword
- Suggestion: Add mention in 2-3 more posts

---

## 🚀 NEXT STEPS

**Choose your solution:**

**Option A (Recommended):** Safe Forward Linking  
→ I update 5 posts to link to safe existing content  
→ Zero 404s, works immediately  
→ 15 minutes of work

**Option B:** Delayed Updates  
→ Publish all as-is  
→ You manually update 5 posts over 30 days  
→ Temporary 404s, more work

**Option C:** Homepage-Only  
→ I remove all spoke links  
→ Simple but loses clustering benefits  
→ 5 minutes of work

**Which solution do you prefer?**
