import AuditWizard from '@/components/AuditWizard';

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4 relative overflow-hidden font-sans">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-1/4 -left-[20%] w-[50%] h-[50%] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-[20%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 w-full max-w-4xl mb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 drop-shadow-sm">
            2026 Carbon & Audit Engine
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Calculate your Carbon Liability Score based on the stringent 2026 BRSR Core and EU CSRD guidelines. Find out exactly where your business stands in minutes.
          </p>
        </div>
        
        <AuditWizard />
      </div>
    </div>
  );
}
