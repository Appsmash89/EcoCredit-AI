import type { Metadata } from 'next';
import CercCalculator from '@/components/CercCalculator';
import ClientPageHook from './ClientPageHook';
import Countdown from '@/components/Countdown';

export async function generateStaticParams() {
  return [
    { industry: 'steel' },
    { industry: 'cement' },
    { industry: 'power' },
    { industry: 'fertilizer' },
    { industry: 'textiles' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const rawIndustry = resolvedParams?.industry;
  if (!rawIndustry) return { title: 'CERC Compliance', description: 'CERC CCC Compliance Hub' };

  const industry = rawIndustry.charAt(0).toUpperCase() + rawIndustry.slice(1);
  return {
    title: `${industry} Sector 2026 CERC Compliance & CCC Calculator`,
    description: `Definitive Answer-First guide and CCC calculator for the ${industry} sector under the new February 2026 CCTS Gazetted regulations in India.`,
  };
}

export default async function ComplianceIndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const resolvedParams = await params;
  const rawIndustry = resolvedParams?.industry;
  
  if (!rawIndustry) {
     return <div className="min-h-screen pt-28 px-4 pb-16 text-white text-center text-xl">Sector data not available.</div>;
  }

  const formattedIndustry = rawIndustry.charAt(0).toUpperCase() + rawIndustry.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `Is the ${formattedIndustry} sector an Obligated Entity under the 2026 CERC rules in India?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, under the February 2026 CERC Gazetted regulations, the ${formattedIndustry} sector has specific greenhouse gas emission targets. 1 Tonne CO2e equates to 1 Carbon Credit Certificate (CCC).`
      }
    }]
  };

  return (
    <div className="min-h-screen pt-28 px-4 pb-16 relative font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="absolute top-40 left-10 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
         {/* Direct Answer Box (AEO Freemium Model) */}
         <div className="bg-gray-900/80 backdrop-blur border-l-4 border-emerald-500 p-8 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.1)] mb-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/20 blur-[40px] rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              2026 CERC Rules for the {formattedIndustry} Sector
            </h1>
            <div className="text-lg text-emerald-300 font-medium leading-relaxed">
              <span className="font-bold text-white uppercase tracking-widest text-sm mr-2 block mb-2 opacity-60">Direct Answer</span>
              Under the February 2026 CERC Gazette, {formattedIndustry} entities are heavily regulated. You must offset emissions using the strict <span className="text-white font-bold">1 Tonne CO₂e = 1 CCC</span> ratio. Non-compliance results in scaling financial penalties, while under-emitting allows you to sell CCCs continuously on the live market.
            </div>
         </div>

         {/* Deep Dive Hook triggers Lead Capture Modal */}
         <ClientPageHook industry={formattedIndustry} />
         
         {/* Compliance Playbook: Deadline Math & Logic */}
         <div className="my-16 text-center animate-fade-in-up">
            <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Official 2026 Audit Deadline</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Act before the CERC enforcement phase locks your target baseline. Don't leave your surplus revenue unclaimed.</p>
            <Countdown />
         </div>
         
         <div className="bg-[#0c1222] border border-[#1e293b] rounded-3xl p-6 md:p-10 mb-16 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] group-hover:bg-emerald-500/10 transition-colors"></div>
            <h3 className="text-2xl font-black text-white mb-8 border-b border-gray-800 pb-4">2026 {formattedIndustry} Math Protocol</h3>
            
            <div className="space-y-3 font-mono text-sm md:text-base leading-relaxed bg-black/50 p-6 rounded-xl border border-gray-800/50">
               <p className="text-emerald-400/80 mb-4">// Scenario: 5M Tonne Plant offsetting 200 CCCs</p>
               <p className="text-gray-300"><span className="text-emerald-400 font-bold">const</span> mandatoryOffset = targetBaseline - liveEmissions;</p>
               <br/>
               <p className="text-gray-300"><span className="text-teal-400 font-bold">if</span> (mandatoryOffset &lt; 0) {'{'}</p>
               <p className="text-gray-400 ml-4 md:ml-8 border-l-2 border-slate-700 pl-4 py-1">initiateMarketPurchase(Math.abs(mandatoryOffset) * currentCccInrValue);</p>
               <p className="text-gray-300">{'}'} <span className="text-teal-400 font-bold">else</span> {'{'}</p>
               <p className="text-gray-400 ml-4 md:ml-8 border-l-2 border-emerald-700 pl-4 py-1">distributeRevenue(mandatoryOffset * currentCccInrValue);</p>
               <p className="text-gray-300">{'}'}</p>
            </div>
            
            <div className="mt-8 bg-blue-950/20 border border-blue-500/20 p-4 rounded-lg flex items-start gap-4">
               <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
               <p className="text-blue-100/70 text-sm">
                 Do not rely on consultants to compute this manually. The "Calculated Alpha" requires speed. Utilize our algorithmic baseline engine directly below to project your real-time risk.
               </p>
            </div>
         </div>

         {/* Embedded Public Calculator */}
         <CercCalculator industry={formattedIndustry} />
         
         {/* Strategic Routing CTA */}
         <div className="mt-16 text-center py-12 border-t border-white/10 animate-fade-in-up">
            <h3 className="text-3xl font-black text-white mb-4">Uncover Your Secret Liability</h3>
            <p className="text-lg text-blue-100/70 max-w-xl mx-auto mb-8">Stop guessing. Mathematically secure your specific compliance target and map out your 2026 tax revenues instantly.</p>
            <a href="/" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-4 px-10 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(16,185,129,0.3)] text-lg sm:text-xl">
               Get your specific liability audited in 2 minutes &rarr;
            </a>
         </div>
      </div>
    </div>
  );
}
