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
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 w-full z-50 fixed top-0 flex flex-row items-center whitespace-nowrap overflow-hidden backdrop-blur-md">
          <div className="animate-marquee inline-block">
            {[
              "LIVE CERC MARKET 2026",
              "STEEL SECTOR EST. CCC PRICE: ₹1,250",
              "CEMENT SECTOR EST. CCC PRICE: ₹1,180",
              "TOTAL VOL. TRADED: 42M This Month",
              "POWER SECTOR CCC PRICE: ₹980",
              "LIVE CERC MARKET 2026"
            ].map((item, i) => (
              <span key={i} className="flex-shrink-0 inline-block px-4 text-sm font-bold tracking-widest text-emerald-300">
                {item.includes("LIVE") ? (
                  <span className="inline-flex items-center whitespace-nowrap">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse shrink-0"></span>
                    <span className="whitespace-nowrap">{item}</span>
                  </span>
                ) : (
                  <span className={`whitespace-nowrap ${item.includes("TOTAL") ? "text-teal-400" : ""}`}>{item}</span>
                )}
              </span>
            ))}
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
