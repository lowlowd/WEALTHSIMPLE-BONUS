# SEO Audit: Homepage Metadata

## English Homepage (`/`)

| Element              | Content                                                                                                                                                                                    | Characters |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| **Meta Title**       | `Wealthsimple Bonus - Get $25 Cash When You Sign Up`                                                                                                                                       | 51 ✅      |
| **Meta Description** | `Get a $25 cash bonus when you sign up for Wealthsimple and deposit $1+. Earn up to $5,000 in referral bonuses. Your trusted resource for Wealthsimple referral codes and investing tips.` | 183 ⚠️     |
| **H1**               | `Get a $25 Cash Bonus When You Sign Up with our Wealthsimple Referral Code`                                                                                                                | 74         |

---

## French Homepage (`/fr`)

| Element              | Content                                                                                             | Characters |
| -------------------- | --------------------------------------------------------------------------------------------------- | ---------- |
| **Meta Title**       | `Wealthsimple Bonus - Obtenez 25 $ en argent à l'inscription`                                       | 60 ✅      |
| **Meta Description** | _(inherits from English - needs French version)_                                                    | -          |
| **H1**               | `Obtenez une prime de 25 $ en argent en vous inscrivant avec notre code de parrainage Wealthsimple` | 98         |

---

## Issues Found

### 1. Meta Description Too Long (English)

- **Current:** 183 characters
- **Recommended:** Max 155-160 characters
- **Fix:** Shorten to avoid truncation in SERPs

### 2. French Meta Description Missing

- The French homepage inherits the English meta description from `config.yaml`
- **Fix:** Add French-specific description in `fr/index.astro` metadata

### 3. French H1 is Long

- 98 characters is fine for on-page H1, but consider shortening for readability

---

## Recommended Changes

### English Meta Description (shorten to ~155 chars)

```
Get a $25 cash bonus when you sign up for Wealthsimple and deposit $1+. Earn up to $5,000 in referral bonuses. Start investing in Canada today.
```

(144 chars)

### French Meta Description (add to fr/index.astro)

```
Obtenez une prime de 25 $ en vous inscrivant à Wealthsimple et en déposant 1 $+. Gagnez jusqu'à 5 000 $ en primes de parrainage.
```

(128 chars)
