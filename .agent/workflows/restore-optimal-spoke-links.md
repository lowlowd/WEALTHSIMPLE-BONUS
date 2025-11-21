---
description: Restore optimal hub-and-spoke internal links after all 9 posts are published
---

# 🔄 Restore Optimal Spoke Links Workflow

**Execute this workflow after: December 19, 2025**  
**Prerequisite:** All 9 new blog posts must be published

---

## 📅 WHEN TO RUN THIS

✅ **Safe to run after:** December 19, 2025 (when `side-hustles-2025.md` publishes)  
⏰ **Recommended timing:** December 20-25, 2025

---

## 🎯 WHAT THIS DOES

This workflow restores the **original optimal spoke-to-spoke internal links** that were temporarily replaced with "safe" links to avoid 404 errors during the staggered publishing schedule.

### The Problem (Nov 2025):

- Posts published over 30 days (Nov 20 - Dec 19)
- Some posts linked to unpublished content → 404 errors
- Temporary "safe" links were used instead

### The Solution (Dec 2025+):

- All posts are now live
- Restore original high-value spoke connections
- Better topical clustering
- Improved user journey through related content

---

## 📝 CHANGES TO MAKE

### 1. `koho-fraud-protection-2025.md`

**Location:** Around line 71 (in conclusion section)

**Current (Temporary) Link:**

```markdown
For even more strategies, check out our guide on [learn more about KOHO bonuses and security](/koho-referral-code-bonus).
```

**Restore to (Original Optimal) Link:**

```markdown
Traveling soon? Learn how KOHO [keeps your money safe abroad](/koho-travelers-2025) with instant card controls.
```

**Why this is better:**

- Creates topical cluster: Security → Travel Safety
- More specific and valuable connection
- Better user journey (fraud protection → travel tips)

---

### 2. `koho-newcomers-2025.md`

**Location:** Around line 23

**Current (Temporary) Link:**

```markdown
It's a key reason why many choose KOHO when comparing [KOHO vs traditional savings options](/koho-vs-savings-accounts-2025).
```

**Action:** ✅ **Keep as-is** - This link is already optimal!

**Note:** The temporary link we used was actually the same as the original optimal link by coincidence.

---

### 3. `koho-families-2025.md`

**Location:** Around line 62 (after RoundUps section)

**Current (Temporary) Link:**

```markdown
For even more strategies, check out our guide on [10 ways to save money as a family](/best-money-saving-apps-2025).
```

**Restore to (Original Optimal) Link:**

```markdown
For even more strategies, check out our guide on [10 ways to save money](/save-money-2025).
```

**Why this is better:**

- Direct connection to comprehensive savings guide
- Part of same content series (family budgeting → saving strategies)
- More recent and relevant content (2025 guide)

---

### 4. `koho-spending-control.md`

**Location:** Around line 55 (after RoundUps section)

**Current (Temporary) Link:**

```markdown
Once you've built up some savings, you might wonder where to put them. Check out our comparison of [maximize your KOHO bonus for better budgeting](/koho-referral-code-bonus) to see how to maximize your growth.
```

**Restore to (Original Optimal) Link:**

```markdown
Once you've built up some savings, you might wonder where to put them. Check out our comparison of [KOHO vs High-Interest Savings Accounts](/koho-vs-savings-accounts-2025) to see how to maximize your growth.
```

**Why this is better:**

- Direct answer to "where to save" question
- Topical cluster: Budgeting → Savings Growth
- More specific value for readers ready to save

---

### 5. `save-money-2025.md`

**Location:** Around line 59 (in "Start Saving Today" section)

**Current (Temporary) Link:**

```markdown
You don't need to implement all 10 strategies at once. Pick 2-3 that resonate with you and start there. Small changes compound into big results over time. Want to speed up the process? Check out [earn money through KOHO referrals](/koho-referral-code-bonus) to boost your income.
```

**Restore to (Original Optimal) Link:**

```markdown
You don't need to implement all 10 strategies at once. Pick 2-3 that resonate with you and start there. Small changes compound into big results over time. Want to speed up the process? Check out [5 side hustles to start](/side-hustles-2025) to boost your income.
```

**Why this is better:**

- Perfect content progression: Saving → Earning
- Part of same content strategy (money management series)
- More comprehensive income guide

---

## 🔧 IMPLEMENTATION STEPS

// turbo

1. **Verify all posts are live:**

```bash
# Check that all 9 posts exist in the build
npm run build
# Verify no 404s in the sitemap
```

// turbo 2. **Update `koho-fraud-protection-2025.md`:**

- Find the link to `/koho-referral-code-bonus`
- Replace with link to `/koho-travelers-2025`
- Update anchor text to travel-related context

// turbo 3. **Update `koho-families-2025.md`:**

- Find the link to `/best-money-saving-apps-2025`
- Replace with link to `/save-money-2025`
- Update anchor text if needed

// turbo 4. **Update `koho-spending-control.md`:**

- Find the link to `/koho-referral-code-bonus`
- Replace with link to `/koho-vs-savings-accounts-2025`
- Update anchor text to savings comparison context

// turbo 5. **Update `save-money-2025.md`:**

- Find the link to `/koho-referral-code-bonus`
- Replace with link to `/side-hustles-2025`
- Update anchor text to side hustle context

// turbo 6. **Rebuild and verify:**

```bash
npm run build
npm run check
```

// turbo 7. **Test all links manually:**

- Visit each of the 4 updated posts
- Click the new spoke links
- Verify they resolve without 404s

// turbo 8. **Commit changes:**

```bash
git add .
git commit -m "feat: restore optimal spoke-to-spoke internal links after full publication"
git push
```

---

## ✅ SUCCESS CRITERIA

After running this workflow:

- ✅ All 9 posts link to homepage (hub)
- ✅ All 9 posts link to 1 related post (spoke)
- ✅ Zero 404 errors
- ✅ Better topical clustering
- ✅ Improved user journey through content
- ✅ Maximum SEO benefit from internal linking

---

## 📊 BEFORE vs AFTER

### Before (Temporary - Nov 2025):

| Post                       | Spoke Link                       | Type           |
| -------------------------- | -------------------------------- | -------------- |
| `koho-fraud-protection`    | `/koho-referral-code-bonus`      | Safe (generic) |
| `koho-newcomers`           | `/koho-vs-savings-accounts-2025` | Optimal ✅     |
| `koho-travelers`           | `/koho-fraud-protection-2025`    | Optimal ✅     |
| `koho-families`            | `/best-money-saving-apps-2025`   | Safe (older)   |
| `koho-spending-control`    | `/koho-referral-code-bonus`      | Safe (generic) |
| `koho-vs-savings-accounts` | `/koho-spending-control`         | Optimal ✅     |
| `koho-vs-prepaid-cards`    | `/koho-fraud-protection-2025`    | Optimal ✅     |
| `save-money`               | `/koho-referral-code-bonus`      | Safe (generic) |
| `side-hustles`             | `/koho-newcomers-2025`           | Optimal ✅     |

### After (Optimal - Dec 2025+):

| Post                       | Spoke Link                       | Type           |
| -------------------------- | -------------------------------- | -------------- |
| `koho-fraud-protection`    | `/koho-travelers-2025`           | **Optimal ✅** |
| `koho-newcomers`           | `/koho-vs-savings-accounts-2025` | Optimal ✅     |
| `koho-travelers`           | `/koho-fraud-protection-2025`    | Optimal ✅     |
| `koho-families`            | `/save-money-2025`               | **Optimal ✅** |
| `koho-spending-control`    | `/koho-vs-savings-accounts-2025` | **Optimal ✅** |
| `koho-vs-savings-accounts` | `/koho-spending-control`         | Optimal ✅     |
| `koho-vs-prepaid-cards`    | `/koho-fraud-protection-2025`    | Optimal ✅     |
| `save-money`               | `/side-hustles-2025`             | **Optimal ✅** |
| `side-hustles`             | `/koho-newcomers-2025`           | Optimal ✅     |

**Result:** 9/9 optimal spoke connections ✅

---

## 🎯 SEO IMPACT

**Before:** Safe but generic linking  
**After:** Strategic topical clustering

### Improved Topical Clusters:

1. **Security Cluster:**
   - `koho-fraud-protection` ↔ `koho-travelers` (mutual)
   - `koho-vs-prepaid-cards` → `koho-fraud-protection`

2. **Savings/Budget Cluster:**
   - `koho-families` → `save-money`
   - `save-money` → `side-hustles` (earn more)
   - `koho-spending-control` ↔ `koho-vs-savings-accounts` (mutual)

3. **Newcomer Cluster:**
   - `side-hustles` → `koho-newcomers`
   - `koho-newcomers` → `koho-vs-savings-accounts`

**Expected SEO Benefit:**

- Stronger topical authority signals
- Better PageRank distribution
- Lower bounce rate (more relevant internal links)
- Higher engagement (better user journey)

---

## 📝 NOTES

- This workflow is optional but recommended
- Can be run anytime after Dec 19, 2025
- Safe to skip if traffic is good with temporary links
- No SEO penalty for waiting (temporary links are still valuable)
- Automated with `// turbo` flags for quick execution

**Workflow Name:** `restore-optimal-spoke-links`  
**Command to recall:** Ask Antigravity to "run the restore-optimal-spoke-links workflow" or "execute spoke link restoration"
