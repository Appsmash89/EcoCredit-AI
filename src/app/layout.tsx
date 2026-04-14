import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EcoCredit AI | 2026 BRSR & CCTS Compliance',
  description: 'The premier High-Traffic Utility Site for Carbon Calculators and Green Tax Incentives in India and the EU.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 font-sans antialiased text-white min-h-screen flex flex-col`}>
        {/* Global Live Market Ticker */}
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 w-full py-2 z-50 fixed top-0 overflow-hidden backdrop-blur-md">
          <div className="whitespace-nowrap animate-marquee flex items-center space-x-12 text-sm font-bold tracking-widest text-emerald-300">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span> LIVE CERC MARKET 2026</span>
             <span>STEEL SECTOR EST. CCC PRICE: ₹1,250 </span>
             <span>CEMENT SECTOR EST. CCC PRICE: ₹1,180 </span>
             <span className="text-teal-400">TOTAL VOL. TRADED: 42M THis Month</span>
             <span>POWER SECTOR CCC PRICE: ₹980 </span>
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span> LIVE CERC MARKET 2026</span>
          </div>
        </div>
        <main className="mt-10 flex-grow">
          {children}
        </main>

        {/* Free Cloudflare Web Analytics */}
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "placeholder-token"}'></script>
      </body>
    </html>
  );
}
