import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DisclaimerModal from '@/components/DisclaimerModal';
import '@/styles/globals.css';

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-3GNH0770ZZ';
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'Iod42uJ4C5cXSz56KAKsEqPt-o3lSMERNWLmYp9s8eE';

export const metadata = {
  title: {
    default: 'Overview of Rajasthan Revenue Law | Revenue Law Raj',
    template: '%s | Revenue Law Raj'
  },
  description: 'Revenue Law Raj is dedicated to Rajasthan Revenue Law, designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The system offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system.',
  keywords: ['Rajasthan revenue law', 'Board of Revenue Ajmer', 'Rajasthan Land Revenue Act 1956', 'Rajasthan Tenancy Act 1955', '90-A land conversion', 'revenue judgments'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://revenuelawraj.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Overview of Rajasthan Revenue Law',
    description: 'Revenue Law Raj is dedicated to Rajasthan Revenue Law, designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources.',
    url: '/',
    siteName: 'Revenue Law Raj',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: gscVerification || undefined,
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
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main style={{ flexGrow: 1, minHeight: 'calc(100vh - 100px - 400px)' }}>
          {children}
        </main>
        <Footer />
        <DisclaimerModal />
      </body>
    </html>
  );
}
