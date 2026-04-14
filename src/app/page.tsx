import type { Metadata } from 'next';
import AuditWizard from '@/components/AuditWizard';

export const metadata: Metadata = {
  title: 'EcoCredit AI | CCTS Compliance Engine 2026',
  description: 'Navigate the 2026 CERC regulations without a $10k consultant. Instantly compute your Carbon Credit Certificates and map your compliance revenue.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full md:w-[600px] h-[600px] bg-gradient-to-br from-emerald-600/10 via-cyan-900/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Split Layout Container */}
      <div className="z-10 w-full max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-4">
        
        {/* Left: Headline & Authority */}
        <div className="text-left space-y-4 lg:pr-4">
           <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs block">
             The 2026 Mandate
           </span>
           <h1 className="text-4xl md:text-[3.25rem] font-black tracking-tighter leading-[1.05]">
             The High-Stakes<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CERC Audit</span>
           </h1>
           <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-md">
             Establish your 'Calculated Alpha.' Compute liability and map compliance revenue instantly.
           </p>
           <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-3 text-xs text-gray-400 font-medium font-mono">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Algorithms built on 2026 CCTS Matrix
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 font-medium font-mono">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> No Consultant Bloat or Retainers
              </div>
           </div>
        </div>

        {/* Right: The Core Tool */}
        <div className="w-full relative max-w-lg mx-auto">
           {/* Glow behind tool */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-emerald-500/5 blur-[80px] rounded-full -z-10" />
           <AuditWizard />
        </div>

      </div>
    </div>
  );
}
