export const SITE_PAGES = [
  { title: 'Home', href: '/', aliases: ['home page', 'homepage', 'main page'], keywords: ['revenue law rajasthan portal'], description: 'Revenue Law Rajasthan home page.' },
  { title: 'About Us', href: '/about', aliases: ['about', 'about page'], keywords: ['website information mission'], description: 'About Revenue Law Rajasthan.' },
  { title: 'Revenue Laws', href: '/laws', aliases: ['laws', 'acts', 'statutes', 'bare acts', 'revenue law in rajasthan'], keywords: ['tenancy act land revenue act rules sections'], description: 'Rajasthan revenue Acts, rules and sections.' },
  { title: 'Working of Revenue Law', href: '/working-of-revenue-law', aliases: ['working of law', 'revenue law procedure'], keywords: ['workflow litigation process'], description: 'How revenue law proceedings work.' },
  { title: 'Hierarchy of Revenue Courts', href: '/hierarchy-of-courts', aliases: ['hierarchy', 'court hierarchy', 'hierarchy of courts', 'revenue courts'], keywords: ['board collector sdo tehsildar pyramid'], description: 'Hierarchy of Rajasthan revenue courts.' },
  { title: 'Types of Revenue Cases', href: '/types-of-cases', aliases: ['types of cases', 'case types'], keywords: ['mutation partition eviction appeal'], description: 'Types of cases under revenue law.' },
  { title: 'Stages in Revenue Cases', href: '/the-stages-in-revenue-cases', aliases: ['stages', 'case stages', 'stages in revenue cases'], keywords: ['filing trial appeal execution'], description: 'Stages followed in revenue litigation.' },
  { title: 'Important Rules', href: '/important-rules', aliases: ['rules', 'important revenue rules'], keywords: ['land conversion section 90 a'], description: 'Important Rajasthan revenue rules.' },
  { title: 'Judgments', href: '/judgments', aliases: ['all judgments', 'judgment search', 'cases'], keywords: ['case law decisions citations'], description: 'Search all revenue judgments.' },
  { title: 'Supreme Court Judgments', href: '/judgments/supreme-court', aliases: ['supreme court', 'supreme court cases'], keywords: ['apex court decisions'], description: 'Supreme Court revenue judgments.' },
  { title: 'Rajasthan High Court Judgments', href: '/judgments/high-court', aliases: ['high court', 'rajasthan high court', 'high court cases'], keywords: ['writ decisions'], description: 'Rajasthan High Court revenue judgments.' },
  { title: 'Articles', href: '/articles', aliases: ['articles page', 'commentary', 'news'], keywords: ['legal articles analysis updates'], description: 'Revenue-law articles and commentary.' },
  { title: 'Important Concepts', href: '/resources/important-concepts', aliases: ['concepts', 'important legal concepts'], keywords: ['revenue law concepts'], description: 'Important concepts in revenue law.' },
  { title: 'How to Write a Judgment', href: '/resources/how-to-write-judgments', aliases: ['write judgment', 'judgment writing'], keywords: ['format drafting reasoning'], description: 'Guide to writing legal judgments.' },
  { title: 'Government Notifications', href: '/notifications', aliases: ['notifications', 'circulars', 'government orders'], keywords: ['gazette revenue department'], description: 'Government notifications and circulars.' },
  { title: 'Glossary', href: '/glossary', aliases: ['dictionary', 'legal dictionary', 'revenue terms'], keywords: ['jamabandi khatedar terminology'], description: 'Glossary of Rajasthan revenue-law terms.' },
  { title: 'Downloads and Forms', href: '/downloads', aliases: ['downloads', 'forms', 'templates'], keywords: ['pdf application draft documents'], description: 'Download forms, drafts and documents.' },
  { title: 'Frequently Asked Questions', href: '/faq', aliases: ['faq', 'faqs', 'questions'], keywords: ['help answers'], description: 'Frequently asked questions.' },
  { title: 'Contact Us', href: '/contact', aliases: ['contact', 'contact page'], keywords: ['support query message'], description: 'Contact the Revenue Law Rajasthan team.' },
  { title: 'Disclaimer', href: '/disclaimer', aliases: ['disclaimer page'], keywords: ['legal notice'], description: 'Website disclaimer.' },
  { title: 'Privacy Policy', href: '/privacy', aliases: ['privacy', 'privacy page'], keywords: ['data policy'], description: 'Website privacy policy.' },
  { title: 'Terms and Conditions', href: '/terms', aliases: ['terms', 'terms page', 'conditions'], keywords: ['website terms'], description: 'Website terms and conditions.' }
];
export function normalizeSearchText(value = '') {
  return String(value).normalize('NFKD').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

export function searchSitePages(query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  const tokens = normalized.split(' ');

  return SITE_PAGES.map((page) => {
    const title = normalizeSearchText(page.title);
    const aliases = page.aliases.map(normalizeSearchText);
    const searchable = normalizeSearchText([page.title, ...page.aliases, ...page.keywords, page.description].join(' '));
    let score = 0;
    if (title === normalized) score = 100;
    else if (aliases.includes(normalized)) score = 95;
    else if (title.startsWith(normalized)) score = 80;
    else if (aliases.some((alias) => alias.startsWith(normalized))) score = 75;
    else if (tokens.every((token) => searchable.includes(token))) score = 55 + Math.min(tokens.length * 3, 15);
    else if (tokens.some((token) => token.length > 2 && searchable.includes(token))) score = 30;
    return { ...page, score };
  }).filter((page) => page.score > 0).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

export function getDirectPageMatch(query) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return null;
  const matches = searchSitePages(normalized);
  const top = matches[0];
  if (!top) return null;
  const exact = normalizeSearchText(top.title) === normalized || top.aliases.some((alias) => normalizeSearchText(alias) === normalized);
  const unambiguousPrefix = normalized.length >= 4 && top.score >= 75 && (!matches[1] || top.score - matches[1].score >= 15);
  return exact || unambiguousPrefix ? top : null;
}

export function escapeSearchRegex(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
