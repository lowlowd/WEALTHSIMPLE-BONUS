import { getPermalink } from './utils/permalinks';
import type { CallToAction } from './types';

interface Link {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
}

interface MenuLink extends Link {
  links?: Array<MenuLink>;
}

interface HeaderProps {
  id?: string;
  links?: Array<MenuLink>;
  actions?: Array<CallToAction>;
  isSticky?: boolean;
  isDark?: boolean;
  isFullWidth?: boolean;
  showToggleTheme?: boolean;
  showRssFeed?: boolean;
  position?: string;
}

// French Header Navigation
export const headerDataFr: HeaderProps = {
  isSticky: true,
  links: [
    {
      text: 'Accueil',
      href: getPermalink('/fr/'),
    },
    {
      text: 'Comment ça fonctionne',
      href: getPermalink('/fr/comment-ca-fonctionne'),
    },
    {
      text: 'Blogue',
      href: getPermalink('/fr/blogue'),
    },
    {
      text: 'À propos',
      href: getPermalink('/fr/a-propos'),
    },
    {
      text: 'Contact',
      href: getPermalink('/fr/contact'),
    },
  ],
  actions: [
    {
      variant: 'primary',
      text: 'Obtenez 25 $',
      href: 'https://wealthsimple.com/invite/9C6DMQ',
      target: '_blank',
      showArrow: true,
    },
  ],
};

// French Footer Navigation
export const footerDataFr = {
  links: [
    {
      title: 'Liens rapides',
      links: [
        { text: 'Accueil', href: getPermalink('/fr/') },
        { text: 'Comment ça fonctionne', href: getPermalink('/fr/comment-ca-fonctionne') },
        { text: 'À propos', href: getPermalink('/fr/a-propos') },
        { text: 'Contact', href: getPermalink('/fr/contact') },
      ],
    },
    {
      title: 'Mentions légales',
      links: [
        { text: 'Politique de confidentialité', href: getPermalink('/fr/confidentialite') },
        { text: "Conditions d'utilisation", href: getPermalink('/fr/conditions') },
        { text: 'Site officiel de Wealthsimple', href: 'https://www.wealthsimple.com/', target: '_blank' },
      ],
    },
  ],
  socialLinks: [],
  secondaryLinks: [
    {
      text: "<strong>Avis :</strong> Ce site Web n'est pas affilié à Wealthsimple Inc. Nous pouvons recevoir une commission lorsque vous vous inscrivez en utilisant notre lien de parrainage. Tous les noms de produits, logos et marques de commerce appartiennent à leurs propriétaires respectifs. Les primes de parrainage et les conditions sont sujettes à modification sans préavis et sont régies par les conditions officielles de Wealthsimple.",
      href: '#',
    },
  ],
  footNote: `
    <div class="text-sm text-gray-700 dark:text-gray-300 mb-3">
      Obtenez une prime de 25 $ en argent lorsque vous vous inscrivez à Wealthsimple et déposez 1 $ ou plus. Gagnez jusqu'à 5 000 $ en primes de parrainage. Commencez à investir avec la principale plateforme d'investissement au Canada.
    </div>
    <div class="text-xs text-gray-600 dark:text-gray-400 mb-4">
      © 2026 Wealthsimple Bonus. Ceci est une page de parrainage indépendante, non affiliée à Wealthsimple Inc.
    </div>
  `,
};
