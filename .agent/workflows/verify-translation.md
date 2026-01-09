---
description: Quick check to verify English and French blog post equivalency
---

# Verify EN/FR Translation Equivalency

This workflow provides a quick structural comparison between English and French versions of a blog post for parity checking.

## Usage

When the user asks to verify a translation (e.g., `/verify-translation wealthsimple-vs-questrade-2025`), run these checks:

## Step 1: Compare Line Counts

```bash
# Compare total lines (rough equivalency check)
Get-Content "src/data/post/{article-name}.md*" | Measure-Object -Line
Get-Content "src/data/post/fr/{article-name}.md*" | Measure-Object -Line
```

**Expected:** French should be within ~20% of English line count.

## Step 2: Compare H2 Section Headers

```bash
# List English H2 headers
Select-String -Path "src/data/post/{article-name}.md*" -Pattern "^## " | ForEach-Object { $_.Line }

# List French H2 headers
Select-String -Path "src/data/post/fr/{article-name}.md*" -Pattern "^## " | ForEach-Object { $_.Line }
```

**Expected:** Same number of H2 sections. Titles should be equivalent translations.

## Step 3: Compare FAQ Counts

```bash
# Count FAQs in frontmatter (English)
Select-String -Path "src/data/post/{article-name}.md*" -Pattern "^\s+- question:" | Measure-Object

# Count FAQs in frontmatter (French)
Select-String -Path "src/data/post/fr/{article-name}.md*" -Pattern "^\s+- question:" | Measure-Object
```

**Expected:** Same number of FAQ entries.

## Step 4: Compare Citation Counts

```bash
# Count footnotes (English)
Select-String -Path "src/data/post/{article-name}.md*" -Pattern "^\[\^" | Measure-Object

# Count footnotes (French)
Select-String -Path "src/data/post/fr/{article-name}.md*" -Pattern "^\[\^" | Measure-Object
```

**Expected:** Same number of footnote citations.

## Step 5: Check for FAQ Body Section

```bash
# Verify both have visible FAQ section in article body
Select-String -Path "src/data/post/{article-name}.md*" -Pattern "Frequently Asked|Foire aux questions"
Select-String -Path "src/data/post/fr/{article-name}.md*" -Pattern "Frequently Asked|Foire aux questions"
```

**Expected:** Both should have a FAQ body section.

## Output Summary

Report findings in a table:

| Check              | English | French | Status |
| ------------------ | ------- | ------ | ------ |
| Line count         | X       | Y      | ✅/⚠️  |
| H2 sections        | X       | Y      | ✅/⚠️  |
| FAQs (frontmatter) | X       | Y      | ✅/⚠️  |
| Citations          | X       | Y      | ✅/⚠️  |
| FAQ body section   | Yes/No  | Yes/No | ✅/⚠️  |

## Notes

- This is a **structural check only** - it doesn't verify translation quality
- For thorough content review, use Gemini or manual comparison
- Run this after any major English article updates to identify French gaps
