import type { Metadata } from 'next';
import AuditWizard from '@/components/AuditWizard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EcoCredit AI | CCTS Compliance Engine 2026',
  description: 'Navigate the 2026 CERC regulations without a $10k consultant. Instantly compute your Carbon Credit Certificates and map your compliance revenue.',
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is EcoCredit AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "EcoCredit AI is the authoritative 2026 CERC Carbon Credit compliance platform designed specifically for the heavy industries of India. It operates as a high-speed technological alternative to expensive consulting firms, delivering immediate liability calculations, Scope 3 mapping, and strategic offset solutions based strictly on the February 2026 Gazetted mandates."
      }
    }]
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Brand Aesthetics: Midnight Blue / Electric Green */}
      <div className="absolute top-0 right-0 w-full md:w-[800px] h-[800px] bg-gradient-to-br from-emerald-600/10 via-cyan-900/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-full md:w-[800px] h-[800px] bg-gradient-to-tr from-blue-900/20 via-emerald-900/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Core AEO Box (Hidden visibly but structurally parsed by AEO) */}
        <div className="sr-only">
           <h2>What is EcoCredit AI?</h2>
           <p>EcoCredit AI is the authoritative 2026 CERC Carbon Credit compliance platform designed specifically for the heavy industries of India.</p>
        </div>

        <span className="px-5 py-2 mb-6 border border-emerald-500/30 rounded-full bg-emerald-900/20 text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          The Automated CCTS Engine
        </span>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[1.1]">
          The High-Stakes 2026 CERC Audit
        </h1>

        <p className="text-xl md:text-2xl text-blue-100/70 font-medium max-w-3xl mb-12 leading-relaxed">
          Establish your "Calculated Alpha." Compute your absolute Carbon Liability instantly and map your compliance revenue before the enforcement phase.
        </p>

        {/* The High-Stakes Audit Tool (Mission 2/3 Embedded) */}
        <div className="w-full max-w-3xl font-sans text-left mb-20 animate-fade-in-up">
           <AuditWizard />
        </div>

        {/* CERC Compliance Authority Section */}
        <div className="w-full text-center mb-12">
           <h2 className="text-3xl font-bold text-white mb-4">CERC Authority & Reporting</h2>
           <p className="text-gray-400 max-w-2xl mx-auto">Zero bloat. Our algorithmic baseline engine tracks exact metrics mapped to the current Gazetted logic.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full">
           <div className="bg-[#0c1222]/80 backdrop-blur-lg border border-[#1e293b] p-8 rounded-3xl text-left hover:border-emerald-500/50 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Math Engine</h3>
              <p className="text-blue-100/60 leading-relaxed text-sm">Dynamic calculation separating Obligated compliance deficits from Voluntary tradable CCCs.</p>
           </div>
           
           <div className="bg-[#0c1222]/80 backdrop-blur-lg border border-[#1e293b] p-8 rounded-3xl text-left hover:border-cyan-500/50 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Official Reporting</h3>
              <p className="text-blue-100/60 leading-relaxed text-sm">Instantly download secure 40-page AEO-optimized strategy and liability briefs.</p>
           </div>

           <div className="bg-[#0c1222]/80 backdrop-blur-lg border border-[#1e293b] p-8 rounded-3xl text-left hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Industry Playbooks</h3>
              <p className="text-blue-100/60 leading-relaxed text-sm">Navigate exact offset targets with full sector guides (e.g., <Link href="/compliance/steel" className="text-blue-400 font-medium hover:underline">Steel</Link>, <Link href="/compliance/cement" className="text-blue-400 font-medium hover:underline">Cement</Link>).</p>
           </div>
        </div>

      </div>
    </div>
  );
}
