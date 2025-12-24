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
      text: 'Get $25 Bonus',
      href: 'https://wealthsimple.com/invite/9C6DMQ',
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
        { text: 'Official Wealthsimple Site', href: 'https://www.wealthsimple.com/', target: '_blank' },
      ],
    },
  ],
  socialLinks: [],
  secondaryLinks: [
    {
      text: "<strong>Disclaimer:</strong> This website is not affiliated with Wealthsimple Inc. We may earn a commission when you sign up using our referral link. All product names, logos, and trademarks are property of their respective owners. Referral bonuses and terms are subject to change without notice and are governed by Wealthsimple's official terms and conditions.",
      href: '#',
    },
  ],
  footNote: `
    <div class="text-sm text-gray-700 dark:text-gray-300 mb-3">
      Get a $25 cash bonus when you sign up for Wealthsimple and deposit $1+. Earn up to $5,000 in referral bonuses. Start investing with Canada's leading investment platform.
    </div>
    <div class="text-xs text-gray-600 dark:text-gray-400 mb-4">
      © 2025 Wealthsimple Bonus. This is an independent referral page, not affiliated with Wealthsimple Inc.
    </div>
  `,
};
