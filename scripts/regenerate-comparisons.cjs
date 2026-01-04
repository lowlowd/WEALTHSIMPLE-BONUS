const fs = require('fs');
const path = require('path');

// Configuration for all comparison documents
const comparisons = [
  {
    num: '02',
    title: 'Add Referral Code After Signup',
    en: 'src/data/post/add-referral-code-after-signup.md',
    fr: 'src/data/post/fr/ajouter-code-parrainage-apres-inscription.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/add-referral-code-after-signup',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/ajouter-code-parrainage-apres-inscription',
  },
  {
    num: '03',
    title: 'Wealthsimple vs Questrade',
    en: 'src/data/post/wealthsimple-vs-questrade-2025.md',
    fr: 'src/data/post/fr/wealthsimple-vs-questrade-2025.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/wealthsimple-vs-questrade-2025',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/wealthsimple-vs-questrade-2025',
  },
  {
    num: '04',
    title: 'Core vs Premium vs Generation',
    en: 'src/data/post/core-vs-premium-vs-generation.md',
    fr: 'src/data/post/fr/core-vs-premium-vs-generation.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/core-vs-premium-vs-generation',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/core-vs-premium-vs-generation',
  },
  {
    num: '05',
    title: 'Referral Terms Conditions',
    en: 'src/data/post/referral-bonus-terms-conditions.md',
    fr: 'src/data/post/fr/conditions-prime-parrainage.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/referral-bonus-terms-conditions',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/conditions-prime-parrainage',
  },
  {
    num: '06',
    title: 'Referral Ladder Challenge',
    en: 'src/data/post/referral-ladder-challenge.md',
    fr: 'src/data/post/fr/defi-echelle-parrainage.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/referral-ladder-challenge',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/defi-echelle-parrainage',
  },
  {
    num: '07',
    title: 'Promo Code vs Referral Code',
    en: 'src/data/post/promo-code-vs-referral-code.md',
    fr: 'src/data/post/fr/code-promo-vs-code-parrainage.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/promo-code-vs-referral-code',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/code-promo-vs-code-parrainage',
  },
  {
    num: '08',
    title: 'Cash Account Review',
    en: 'src/data/post/wealthsimple-cash-account-review.md',
    fr: 'src/data/post/fr/evaluation-compte-wealthsimple-comptant.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/wealthsimple-cash-account-review',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/evaluation-compte-wealthsimple-comptant',
  },
  {
    num: '09',
    title: 'Crypto Comparison',
    en: 'src/data/post/wealthsimple-crypto-vs-newton-vs-shakepay.md',
    fr: 'src/data/post/fr/wealthsimple-crypto-vs-newton-vs-shakepay.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/wealthsimple-crypto-vs-newton-vs-shakepay',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/wealthsimple-crypto-vs-newton-vs-shakepay',
  },
  {
    num: '10',
    title: 'Tax Review',
    en: 'src/data/post/wealthsimple-tax-review-2025.md',
    fr: 'src/data/post/fr/evaluation-wealthsimple-impot-2025.md',
    enUrl: 'https://wealthsimplebonus.ca/blog/wealthsimple-tax-review-2025',
    frUrl: 'https://wealthsimplebonus.ca/fr/blogue/evaluation-wealthsimple-impot-2025',
  },
];

const outputDir = 'public/comparisons';

function generateComparisonDoc(config) {
  const enContent = fs.readFileSync(config.en, 'utf-8');
  const frContent = fs.readFileSync(config.fr, 'utf-8');

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const doc = `# POST ${config.num}: ${config.title} - English/French Comparison

**Purpose:** Side-by-side comparison document for AI review of translation quality.

**Referral Code:** 9C6DMQ

---

## FILE INFORMATION

| Language | File Path | Canonical URL |
|----------|-----------|---------------|
| English | \`${config.en}\` | ${config.enUrl} |
| French | \`${config.fr}\` | ${config.frUrl} |

---

# ENGLISH VERSION

\`\`\`markdown
${enContent}
\`\`\`

---

# FRENCH VERSION (QUEBEC FRENCH)

\`\`\`markdown
${frContent}
\`\`\`

---

## KEY TERMINOLOGY TRANSLATIONS

| English | Quebec French |
|---------|---------------|
| Referral code | Code de parrainage |
| Sign up bonus | Prime d'inscription |
| Self-directed Trading | Placements autonomes |
| Managed Investing | Placements gérés |
| Chequing account | Compte chèques |
| Customer support | Service à la clientèle / Soutien |
| Clawback | Récupération |
| Hold period | Période de conservation |
| Net deposits | Dépôts nets |
| Transfer fee reimbursement | Remboursement des frais de transfert |

---

**Document Generated:** ${today}
`;

  return doc;
}

// Generate all comparison documents
console.log('Generating comparison documents...\n');

comparisons.forEach((config) => {
  try {
    const outputPath = path.join(outputDir, `${config.num}-${config.title.toLowerCase().replace(/\s+/g, '-')}.md`);
    const doc = generateComparisonDoc(config);
    fs.writeFileSync(outputPath, doc);
    console.log(`✅ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error generating ${config.num}: ${error.message}`);
  }
});

console.log('\nDone! All comparison documents have been regenerated.');
