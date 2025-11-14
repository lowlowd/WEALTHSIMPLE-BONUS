import { getPermalink, getBlogPermalink } from './utils/permalinks';
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

// This is for the Header
export const headerData: HeaderProps = {
  isSticky: true,
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'How It Works',
      href: getPermalink('/how-it-works'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
    {
      variant: 'primary',
      text: 'KOHO Referral Code',
      href: 'https://referral.koho.ca/mzGV8zw',
      target: '_blank',
      showArrow: true,
    },
  ],
};

// This is for the Footer
export const footerData = {
  links: [
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'How It Works', href: getPermalink('/how-it-works') },
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
        { text: 'Official KOHO Site', href: 'https://www.koho.ca/', target: '_blank' },
      ],
    },
  ],
  socialLinks: [],
  secondaryLinks: [
    {
      text: "<strong>Disclaimer:</strong> This website is an independent referral page and is not officially affiliated with, endorsed by, or sponsored by KOHO Financial Inc. All product names, logos, and trademarks are property of their respective owners. Referral bonuses and terms are subject to change without notice and are governed by KOHO's official terms and conditions. Users must be Canadian residents, 18+ years old, and meet KOHO's eligibility requirements. Banking services provided by KOHO Financial Inc. are subject to regulatory compliance and approval.",
      href: '#',
    },
  ],
  footNote: `
    <div class="text-sm text-gray-700 dark:text-gray-300 mb-3">
      Get $20 + $45 bonus when you sign up using our KOHO referral code C4MNILZARC. Free banking, no fees, instant cash back, and smart budgeting tools.
    </div>
    <div class="text-xs text-gray-600 dark:text-gray-400 mb-4">
      © 2025 KOHO Referral. This is an independent referral page, not affiliated with KOHO Financial Inc.
    </div>
  `,
};
