import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: {
    default: 'Rajasthan Revenue Law Knowledge Platform | RRLKP',
    template: '%s | RRLKP'
  },
  description: 'Premium Legal Publishing and Research Platform for Rajasthan Revenue Law, Board of Revenue Judgments, Land Acts, circulars, and 90-A conversion guidelines.',
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
    description: 'Enterprise research portal for Rajasthan Land Revenue Acts, Board of Revenue judgments, and government circulars.',
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
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flexGrow: 1, minHeight: 'calc(100vh - 80px - 400px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
