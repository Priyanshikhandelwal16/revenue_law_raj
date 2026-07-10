import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: {
    default: 'Rajasthan Revenue Law Knowledge Platform | RRLKP',
    template: '%s | RRLKP'
  },
  description: 'Revenue Law Raj is a dedicated Rajasthan Revenue Law Knowledge Platform designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The platform offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system.',
  keywords: ['Rajasthan revenue law', 'Board of Revenue Ajmer', 'Rajasthan Land Revenue Act 1956', 'Rajasthan Tenancy Act 1955', '90-A land conversion', 'revenue judgments'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Rajasthan Revenue Law Knowledge Platform',
    description: 'Revenue Law Raj is a dedicated Rajasthan Revenue Law Knowledge Platform designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The platform offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system.',
    url: '/',
    siteName: 'RRLKP',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', (event) => {
                if (
                  (event.message && (event.message.includes('MetaMask') || event.message.includes('ethereum'))) ||
                  (event.filename && event.filename.includes('chrome-extension'))
                ) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }
              }, true);
              window.addEventListener('unhandledrejection', (event) => {
                if (
                  (event.reason && event.reason.message && event.reason.message.includes('MetaMask')) ||
                  (event.reason && event.reason.stack && event.reason.stack.includes('chrome-extension'))
                ) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }
              }, true);
            `
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flexGrow: 1, minHeight: 'calc(100vh - 100px - 400px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
