# Evergreen Localized Image Strategy

## Strategy Summary

| Decision           | Choice                                   |
| ------------------ | ---------------------------------------- |
| **Image location** | `public/images/` (bypass Astro hashing)  |
| **URL stability**  | Permanent (no hash changes ever)         |
| **Rollout**        | Money images first, then standard images |
| **Redirect**       | One-time for currently-ranking image     |

---

## Phase 1: Money Images (DO NOW)

> [!IMPORTANT]
> These 6 images (3 EN + 3 FR) are your revenue drivers. Create and deploy these first during RRSP season.

### File Structure

```
public/
└── images/
    ├── en/
    │   ├── wealthsimple-referral-code-9c6dmq.jpg      # Post 1
    │   ├── promo-code-vs-referral-code-9c6dmq.jpg     # Post 7
    │   └── add-referral-code-after-signup-9c6dmq.jpg  # Post 10
    └── fr/
        ├── code-parrainage-wealthsimple-9c6dmq.jpg    # Post 1
        ├── code-promo-vs-code-parrainage-9c6dmq.jpg   # Post 7
        └── ajouter-code-apres-inscription-9c6dmq.jpg  # Post 10
```

---

## Money Image Prompts

> [!TIP]
> Each prompt has a **distinct visual concept** while maintaining the same clean illustration style.

---

### Post 1: Main Referral Code

**Visual Concept**: Gift/reward celebration — code as the "prize"

#### English

```
Clean flat 2D illustration, soft cream background (#F5F5F0), modern minimal style.

TOP TEXT: "Wealthsimple Referral Code" in bold black sans-serif

CENTER HERO: Large golden gift box bursting open with "9C6DMQ" floating above
in bold gold/yellow 3D-style text — this is the LARGEST element, takes up
~40% of image. Sparkles and confetti around the code.

SUPPORTING ELEMENTS: Small Wealthsimple "W" logo in corner, tiny Canadian flag,
stack of gold coins at base of gift box.

Style: Celebratory, exciting, reward-focused. No characters needed.
```

#### French

```
Clean flat 2D illustration, soft cream background (#F5F5F0), modern minimal style.

TOP TEXT: "Code de parrainage Wealthsimple" in bold black sans-serif

CENTER HERO: Large golden gift box bursting open with "9C6DMQ" floating above
in bold gold/yellow 3D-style text — this is the LARGEST element, takes up
~40% of image. Sparkles and confetti around the code.

SUPPORTING ELEMENTS: Small Wealthsimple "W" logo in corner, tiny Canadian flag,
stack of gold coins at base of gift box.

Style: Celebratory, exciting, reward-focused. No characters needed.
```

---

### Post 7: Promo Code vs Referral Code

**Visual Concept**: VS battle/comparison — referral code winning

#### English

```
Clean flat 2D illustration, soft cream background, modern minimal style.

TOP TEXT: "Promo Code vs Referral Code" in bold black sans-serif

LAYOUT: Split down the middle with "VS" badge in center.

LEFT SIDE (muted, losing):
- iPhone with generic promo screen
- Label: "PROMO CODE"
- Red X or dimmed appearance
- Smaller scale

RIGHT SIDE (vibrant, winning):
- Golden envelope with "9C6DMQ" in bold gold text
- Label: "REFERRAL CODE"
- Green checkmark, sparkles
- Larger scale, more prominent

Small Canadian flag in corner. Trophy or crown icon above referral side.
```

#### French

```
Clean flat 2D illustration, soft cream background, modern minimal style.

TOP TEXT: "Code promo vs Code de parrainage" in bold black sans-serif

LAYOUT: Split down the middle with "VS" badge in center.

LEFT SIDE (muted, losing):
- iPhone with generic promo screen
- Label: "CODE PROMO"
- Red X or dimmed appearance
- Smaller scale

RIGHT SIDE (vibrant, winning):
- Golden envelope with "9C6DMQ" in bold gold text
- Label: "CODE DE PARRAINAGE"
- Green checkmark, sparkles
- Larger scale, more prominent

Small Canadian flag in corner. Trophy or crown icon above referral side.
```

---

### Post 10: Add Referral Code After Signup

**Visual Concept**: Mobile app interaction — entering code on phone

#### English

```
Clean flat 2D illustration, soft cream background, modern minimal style.

TOP TEXT: "Add Referral Code After Signup" in bold black sans-serif

CENTER: Large smartphone (isometric angle) showing Wealthsimple app screen.
On screen: Text input field with "9C6DMQ" being typed, cursor blinking.
A finger/hand tapping the input field.

FLOATING ELEMENTS: Clock icon with "7 DAYS" label (the deadline window),
green checkmark, small "W" logo on phone screen.

Small Canadian flag in corner. Encouraging, "you can still do this" vibe.
```

#### French

```
Clean flat 2D illustration, soft cream background, modern minimal style.

TOP TEXT: "Ajouter un code après l'inscription" in bold black sans-serif

CENTER: Large smartphone (isometric angle) showing Wealthsimple app screen.
On screen: Text input field with "9C6DMQ" being typed, cursor blinking.
A finger/hand tapping the input field.

FLOATING ELEMENTS: Clock icon with "7 JOURS" label (the deadline window),
green checkmark, small "W" logo on phone screen.

Small Canadian flag in corner. Encouraging, "you can still do this" vibe.
```

---

## Phase 1 Implementation Steps

### Step 1: Create Images

Generate or design the 6 money images using prompts above.
Compress to <200KB each (TinyPNG or similar).

### Step 2: Add to Public Folder

```
public/images/en/wealthsimple-referral-code-9c6dmq.jpg
public/images/en/promo-code-vs-referral-code-9c6dmq.jpg
public/images/en/add-referral-code-after-signup-9c6dmq.jpg
public/images/fr/code-parrainage-wealthsimple-9c6dmq.jpg
public/images/fr/code-promo-vs-code-parrainage-9c6dmq.jpg
public/images/fr/ajouter-code-apres-inscription-9c6dmq.jpg
```

### Step 3: Update Frontmatter

**Post 1 English** (`wealthsimple-referral-code-2025.md`):

```yaml
image: /images/en/wealthsimple-referral-code-9c6dmq.jpg
imageAlt: 'Wealthsimple Referral Code 9C6DMQ for 2026 - Get $25 Bonus'
```

**Post 1 French** (`code-de-parrainage-wealthsimple-2025.md`):

```yaml
image: /images/fr/code-parrainage-wealthsimple-9c6dmq.jpg
imageAlt: 'Code de parrainage Wealthsimple 9C6DMQ pour 2026 - Prime de 25 $'
```

_(Repeat pattern for Posts 7 and 10)_

### Step 4: Add Redirect (Protect Current Ranking)

Get your current ranking image URL from Google Images, then add to `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/_astro/wealthsimple-referral-code-2025.BxGau8hQ.png",
      "destination": "/images/en/wealthsimple-referral-code-9c6dmq.jpg",
      "permanent": true
    }
  ]
}
```

### Step 5: Update Components

Modify `SinglePost.astro` and `SinglePostFr.astro` to use `imageAlt`:

```diff
- alt={post?.title || 'Blog post image'}
+ alt={post?.imageAlt || post?.title || 'Blog post image'}
```

### Step 6: Deploy

---

## Phase 2: Standard Images (After Phase 1)

| Post | EN Filename                          | FR Filename                                 |
| ---- | ------------------------------------ | ------------------------------------------- |
| 2    | wealthsimple-vs-questrade.jpg        | wealthsimple-vs-questrade.jpg               |
| 3    | wealthsimple-tax-review.jpg          | evaluation-wealthsimple-impot.jpg           |
| 4    | wealthsimple-cash-account-review.jpg | evaluation-compte-wealthsimple-comptant.jpg |
| 5    | wealthsimple-crypto-comparison.jpg   | comparaison-crypto-wealthsimple.jpg         |
| 6    | core-vs-premium-vs-generation.jpg    | core-vs-premium-vs-generation.jpg           |
| 8    | referral-bonus-terms.jpg             | conditions-prime-parrainage.jpg             |
| 9    | referral-ladder-challenge.jpg        | defi-echelle-parrainage.jpg                 |

_Full prompts for these available on request._
