import type { Metadata } from 'next';
import CercCalculator from '@/components/CercCalculator';
import ClientPageHook from './ClientPageHook';

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

  // AEO structured markup
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
    <div className="min-h-screen pt-28 px-4 pb-16 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Structural Background */}
      <div className="absolute top-40 left-10 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
         {/* Direct Answer Box (AEO Freemium Model) */}
         <div className="bg-gray-900/80 backdrop-blur border-l-4 border-emerald-500 p-8 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
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
         
         {/* Embedded Public Calculator */}
         <CercCalculator industry={formattedIndustry} />
      </div>
    </div>
  );
}
