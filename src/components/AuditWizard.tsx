"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuditWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    companyName: '',
    industry: '',
    isTopListed: false,
    energyUsage: '',
    fleetSize: '',
    scope3Coverage: ''
  });

  const updateData = (key: string, value: any) => setData({ ...data, [key]: value });

  // Dummy 2026 baseline calculation
  const calculateScore = () => {
    let score = 0;
    const energy = parseInt(data.energyUsage || "0");
    const fleet = parseInt(data.fleetSize || "0");
    score += (energy * 0.85); // 0.85 kg CO2 per kWh
    score += (fleet * 4.6);   // 4.6 metric tons per vehicle approx
    
    // Scope 3 penalty if they are listed and haven't covered scope 3 fully
    if (data.isTopListed) {
       const coverage = parseInt(data.scope3Coverage || "0");
       if (coverage < 100) {
          score *= (1 + ((100 - coverage) / 100) * 0.5); // Adds up to 50% buffer to liability
       }
    }
    return Math.round(score).toLocaleString();
  };

  const finalizeRouter = () => {
     const computedData = { ...data, score: calculateScore() };
     sessionStorage.setItem('auditData', JSON.stringify(computedData));
     router.push('/results');
  };

  return (
    <div className="relative p-5 sm:p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      
      {/* Wizard Steps */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
             <h2 className="text-xl font-bold text-emerald-400">Step 1: Business Profile</h2>
             <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/20">2-Min Audit</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Company Name</label>
              <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={data.companyName} onChange={e => updateData('companyName', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Industry</label>
              <select className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={data.industry} onChange={e => updateData('industry', e.target.value)}>
                <option value="">Select...</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Logistics">Logistics</option>
                <option value="IT Services">IT Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-2 bg-gray-900/40 p-3 rounded-lg border border-gray-800">
              <input type="checkbox" id="listed" className="w-4 h-4 accent-emerald-500 rounded" checked={data.isTopListed} onChange={e => updateData('isTopListed', e.target.checked)} />
              <label htmlFor="listed" className="text-gray-300 font-medium text-xs leading-snug">Is your company a Top 1000 Listed Entity? (Triggers BRSR Core Depth)</label>
            </div>
            <button onClick={() => setStep(2)} className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-2.5 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20 text-sm">Next Step &rarr;</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-400">Step 2: Operational Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Annual Energy Usage (kWh)</label>
              <input type="number" placeholder="e.g. 50000" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" value={data.energyUsage} onChange={e => updateData('energyUsage', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Company Fleet Size (Vehicles)</label>
              <input type="number" placeholder="e.g. 15" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" value={data.fleetSize} onChange={e => updateData('fleetSize', e.target.value)} />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="w-1/3 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">Back</button>
              <button onClick={() => data.isTopListed ? setStep(3) : finalizeRouter()} className="w-2/3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20">Analyze Operational Load &rarr;</button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-400">Step 3: Value Chain (Scope 3)</h2>
          <p className="text-sm text-gray-400">As a Top Listed Entity, you must provide extensive Scope 3 disclosures.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">What percentage of your supply chain emissions are currently tracked? (%)</label>
              <input type="number" placeholder="e.g. 45" max="100" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" value={data.scope3Coverage} onChange={e => updateData('scope3Coverage', e.target.value)} />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="w-1/3 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm">Back</button>
              <button onClick={finalizeRouter} className="w-2/3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg text-sm">Finalize Audit Computation</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


