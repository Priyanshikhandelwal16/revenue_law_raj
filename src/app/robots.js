export default function robots() {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://revenuelawraj.com';
  if (!baseUrl || baseUrl.includes('localhost')) {
    baseUrl = 'https://revenuelawraj.com';
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
