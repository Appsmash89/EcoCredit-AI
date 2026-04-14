import React from 'react';

export default function BrandKit() {
  return (
    <div className="min-h-screen bg-[#070b19] pt-32 pb-24 px-4 font-sans text-white relative overflow-hidden">
       {/* Ambient Backing */}
       <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />
       
       <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="text-emerald-400 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Internal Guideline</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">The Calculated Alpha</h1>
            <p className="text-xl text-blue-100/60 max-w-2xl leading-relaxed">
              We are not consultants. We are a high-speed technological framework for carbon compliance. Our tone is authoritative, anti-bloat, and heavily skewed towards structural financial empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
             {/* Color Palette */}
             <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6">Brand Palette</h3>
                <div className="flex items-center gap-4 bg-[#0c1222] p-4 rounded-2xl border border-gray-800">
                   <div className="w-16 h-16 rounded-xl bg-[#070b19] border border-gray-700 shadow-inner"></div>
                   <div>
                     <p className="font-bold">Midnight Void</p>
                     <p className="text-xs text-gray-500 font-mono">#070B19</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-[#0c1222] p-4 rounded-2xl border border-gray-800">
                   <div className="w-16 h-16 rounded-xl bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"></div>
                   <div>
                     <p className="font-bold text-emerald-400">Electric Green</p>
                     <p className="text-xs text-gray-500 font-mono">#10B981</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 bg-[#0c1222] p-4 rounded-2xl border border-gray-800">
                   <div className="w-16 h-16 rounded-xl bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"></div>
                   <div>
                     <p className="font-bold text-cyan-400">Terminal Cyan</p>
                     <p className="text-xs text-gray-500 font-mono">#22D3EE</p>
                   </div>
                </div>
             </div>

             {/* Voice matrix */}
             <div className="bg-gradient-to-b from-[#0c1222] to-[#070b19] border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">Content Tone Matrix</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                     <span className="text-emerald-400">✓</span>
                     <div>
                       <span className="font-bold block mb-1">Hook-to-Value</span>
                       <span className="text-sm text-gray-400 block">Lead with harsh 2026 urgency, pivot immediately to programmatic revenue capture.</span>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <span className="text-emerald-400">✓</span>
                     <div>
                       <span className="font-bold block mb-1">Anti-Consultant</span>
                       <span className="text-sm text-gray-400 block">Contrast our millisecond Next.js computation against $10,000 auditing firm retainers.</span>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <span className="text-red-400">✕</span>
                     <div>
                       <span className="font-bold block text-gray-500 line-through">Greenwashing</span>
                       <span className="text-sm text-gray-600 block">Do not talk about planting trees. Talk about hard financial instruments (CCCs).</span>
                     </div>
                  </li>
                </ul>
             </div>
          </div>

       </div>
    </div>
  );
}
