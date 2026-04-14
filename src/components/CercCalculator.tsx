"use client";
import React, { useState } from 'react';

export default function CercCalculator({ industry }: { industry: string }) {
  const [emissions, setEmissions] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [isObligated, setIsObligated] = useState(true);

  // 1 Tonne CO2e = 1 CCC
  // If obligated: Excess emissions = Deficit (Buy CCC). Under emissions = Surplus (Sell CCC)
  const e = Number(emissions) || 0;
  const t = Number(target) || 0;
  
  const cccTotal = isObligated ? (t - e) : Math.floor(e * 0.15); // Non-obligated gets 15% voluntary offset credits approx
  
  const isSurplus = cccTotal >= 0;
  const cccAbs = Math.abs(cccTotal);

  const cccPriceInr = industry.toLowerCase() === 'steel' ? 1250 : industry.toLowerCase() === 'cement' ? 1180 : 1000;
  const inrValue = cccAbs * cccPriceInr;

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 shadow-xl w-full">
      <h3 className="text-2xl font-bold text-emerald-400 mb-6">{industry.toUpperCase()} SECTOR - OPEN CERC CALCULATOR</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
         <div className="space-y-5">
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Entity Status (2026 CCTS)</label>
              <div className="flex gap-4">
                 <button onClick={() => setIsObligated(true)} className={`px-4 py-2 rounded-lg font-medium border ${isObligated ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>Obligated</button>
                 <button onClick={() => setIsObligated(false)} className={`px-4 py-2 rounded-lg font-medium border ${!isObligated ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>Non-Obligated (Voluntary)</button>
              </div>
           </div>
           
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Projected Emissons (Tonne CO₂e)</label>
              <input type="number" value={emissions} onChange={e => setEmissions(e.target.value)} className="w-full bg-gray-950 border border-gray-700 focus:border-emerald-500 text-white p-3 rounded-lg outline-none" placeholder="e.g. 5000" />
           </div>

           {isObligated && (
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Government Target Baseline (Tonne CO₂e)</label>
                <input type="number" value={target} onChange={e => setTarget(e.target.value)} className="w-full bg-gray-950 border border-gray-700 focus:border-emerald-500 text-white p-3 rounded-lg outline-none" placeholder="e.g. 5200" />
             </div>
           )}
         </div>

         <div className="flex flex-col justify-center bg-gray-950 border border-gray-800 rounded-2xl p-6 text-center shadow-inner">
             {cccTotal !== 0 ? (
                <>
                  <p className="text-gray-400 font-semibold mb-1 uppercase tracking-widest text-xs">
                     {isObligated ? (isSurplus ? 'You Earned CCCs to Sell' : 'You Owe CCCs to Buy') : 'Voluntary CCCs Generated'}
                  </p>
                  <p className={`text-5xl font-black mb-2 ${isObligated && !isSurplus ? 'text-red-400' : 'text-emerald-400'}`}>
                     {cccAbs.toLocaleString()} <span className="text-2xl text-gray-500 font-normal">CCC</span>
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800">
                     <p className="text-gray-500 text-sm mb-1">Estimated Market Value (₹{cccPriceInr}/CCC)</p>
                     <p className="text-2xl text-white font-bold">₹ {inrValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} INR</p>
                  </div>
                </>
             ) : (
                <p className="text-gray-500 italic">Enter your targets and emissions to see your live CERC impact based on the February 2026 Gazetted rules (1 Tonne CO₂e = 1 CCC).</p>
             )}
         </div>
      </div>
    </div>
  );
}
