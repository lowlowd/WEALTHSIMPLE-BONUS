---
description: How to update FAQ content in blog posts (includes schema reminder)
---

# Updating FAQ Content in Blog Posts

When modifying FAQ content in any blog post, **you MUST update both locations**:

## 1. Update the Markdown FAQ Section (for display)

Located in the blog post body under `## Frequently Asked Questions`:

```markdown
## Frequently Asked Questions

### Your Question Here?

Your answer paragraph here.
```

## 2. Update the Frontmatter FAQs Array (for schema)

Located at the top of the blog post in the frontmatter:

```yaml
---
title: 'Post Title'
# ... other frontmatter ...
faqs:
  - question: 'Your Question Here?'
    answer: 'Your answer here (can be plain text, no markdown).'
  - question: 'Another Question?'
    answer: 'Another answer.'
---
```

## ⚠️ IMPORTANT

- **Both sections must match** — if you add/remove/edit an FAQ in the markdown, do the same in the frontmatter `faqs` array
- The frontmatter `faqs` array generates the FAQPage schema for Google
- The markdown section is what users see on the page
- Forgetting to update one will cause a mismatch between what Google sees and what users see

## Quick Checklist

- [ ] Updated markdown FAQ section
- [ ] Updated frontmatter `faqs` array
- [ ] Verified question/answer content matches in both places
