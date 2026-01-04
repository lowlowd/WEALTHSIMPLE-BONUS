/**
 * EN ↔ FR Blog Post Slug Mappings
 * Maps English blog post slugs to their French equivalents for hreflang
 */

// English slug → French slug
export const enToFrBlogSlugs: Record<string, string> = {
  'wealthsimple-referral-code-2025': 'code-de-parrainage-wealthsimple-2025',
  'add-referral-code-after-signup': 'ajouter-code-parrainage-apres-inscription',
  'wealthsimple-vs-questrade-2025': 'wealthsimple-vs-questrade-2025',
  'core-vs-premium-vs-generation': 'core-vs-premium-vs-generation',
  'referral-bonus-terms-conditions': 'conditions-prime-parrainage',
  'referral-ladder-challenge': 'defi-echelle-parrainage',
  'promo-code-vs-referral-code': 'code-promo-vs-code-parrainage',
  'wealthsimple-cash-account-review': 'evaluation-compte-wealthsimple-comptant',
  'wealthsimple-crypto-vs-newton-vs-shakepay': 'wealthsimple-crypto-vs-newton-vs-shakepay',
  'wealthsimple-tax-review-2025': 'evaluation-wealthsimple-impot-2025',
};

// French slug → English slug (reverse mapping)
export const frToEnBlogSlugs: Record<string, string> = Object.fromEntries(
  Object.entries(enToFrBlogSlugs).map(([en, fr]) => [fr, en])
);

/**
 * Get the French equivalent slug for an English blog post
 */
export function getFrenchBlogSlug(englishSlug: string): string | undefined {
  return enToFrBlogSlugs[englishSlug];
}

/**
 * Get the English equivalent slug for a French blog post
 */
export function getEnglishBlogSlug(frenchSlug: string): string | undefined {
  return frToEnBlogSlugs[frenchSlug];
}
