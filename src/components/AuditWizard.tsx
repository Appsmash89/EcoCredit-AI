"use client";

import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function AuditWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    companyName: '',
    industry: '',
    isTopListed: false,
    energyUsage: '',
    fleetSize: '',
    scope3Coverage: ''
  });

  const [lead, setLead] = useState({
    name: '',
    email: '',
    industry: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");

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

  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const domain = lead.email.split('@')[1]?.toLowerCase();
    
    // Warning state check
    if (personalDomains.includes(domain) && emailWarning === "") {
        setEmailWarning("We noticed you used a personal email. For official 2026 reports, we recommend a corporate email. Click download again to proceed anyway.");
        return; // Pause the first submission
    }

    setIsSubmitting(true);
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      generatePDF();
      setShowModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Premium dark look
    doc.setFillColor(15, 23, 42); // Tailwind slate-900 equivalent
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(52, 211, 153); // emerald-400
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("ECOCREDIT AI", 20, 30);
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("OFFICIAL 2026 COMPLIANCE & LIABILITY REPORT", 20, 45);
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(52, 211, 153);
    doc.line(20, 50, 190, 50);

    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text(`Prepared for: ${data.companyName || lead.name}`, 20, 70);
    doc.text(`Industry: ${data.industry || lead.industry}`, 20, 80);
    doc.text(`Date of Audit: ${new Date().toLocaleDateString()}`, 20, 90);
    
    // Score Highlight
    doc.setFillColor(30, 41, 59); // slate-800
    doc.roundedRect(20, 105, 170, 40, 3, 3, 'F');
    
    doc.setTextColor(52, 211, 153);
    doc.setFontSize(18);
    doc.text("PROJECTED CARBON LIABILITY SCORE", 25, 120);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(`~ ${calculateScore()} Metric Tons CO2e`, 25, 135);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(150, 150, 150);
    let y = 160;
    doc.text("This projection integrates 2026 EU CSRD requirements and Indian BRSR Core mandates.", 20, y);
    
    if (data.isTopListed) {
       y += 10;
       doc.setTextColor(239, 68, 68); // Red text
       doc.text("WARNING: As a Top-Listed Entity, your Scope 3 tracking gap poses financial compliance risk.", 20, y);
    }

    doc.setFillColor(16, 185, 129); // emerald-500
    doc.roundedRect(20, 220, 170, 20, 2, 2, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("URGENT: Schedule your 1:1 Tax Credit & Compliance Consultation", 25, 233);
    doc.text("Visit: ecocredit.ai/contact", 25, 250);

    doc.save(`EcoCredit_2026_Audit_${data.companyName || 'Report'}.pdf`);
  };

  return (
    <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      
      {/* Wizard Steps */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-400">Step 1: Business Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
              <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={data.companyName} onChange={e => updateData('companyName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
              <select className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={data.industry} onChange={e => updateData('industry', e.target.value)}>
                <option value="">Select...</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Logistics">Logistics</option>
                <option value="IT Services">IT Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mt-4 bg-gray-900/40 p-4 rounded-lg border border-gray-800">
              <input type="checkbox" id="listed" className="w-5 h-5 accent-emerald-500 rounded" checked={data.isTopListed} onChange={e => updateData('isTopListed', e.target.checked)} />
              <label htmlFor="listed" className="text-gray-300 font-medium">Is your company a Top 1000 Listed Entity? (Triggers BRSR Core Depth)</label>
            </div>
            <button onClick={() => setStep(2)} className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20">Next Step &rarr;</button>
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
              <button onClick={() => setStep(data.isTopListed ? 3 : 4)} className="w-2/3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20">Analyze Operational Load &rarr;</button>
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
              <button onClick={() => setStep(2)} className="w-1/3 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">Back</button>
              <button onClick={() => setStep(4)} className="w-2/3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg">Finalize Audit Computation</button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-8 animate-fade-in text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
            <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Your Audit is Complete</h2>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px]"></div>
            <p className="text-gray-400 mb-2 font-medium uppercase tracking-widest text-sm">Preliminary Liability Score</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{calculateScore()} <span className="text-2xl text-gray-500">Tons CO₂e</span></p>
          </div>
          <p className="text-gray-300">This score indicates potential exposure under the 2026 BRSR and CSRD mandates.</p>
          
          <button onClick={() => setShowModal(true)} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] shadow-[0_10px_40px_rgba(37,99,235,0.4)] text-lg flex items-center justify-center gap-3">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             Download Strategic Report
          </button>
        </div>
      )}

      {/* Lead Magnet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-900 border border-gray-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
             {/* Modal design element */}
             <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full"></div>
             
             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
             
             <h3 className="text-2xl font-bold text-white mb-2">Save Your Results</h3>
             <p className="text-gray-400 text-sm mb-6">Secure a copy of your official 2026 reporting liability projection for your records.</p>
             
             <form onSubmit={handleLeadSubmit} className="space-y-4">
                {emailWarning && (
                   <div className="bg-amber-900/30 border border-amber-500/50 p-3 rounded-lg text-amber-200 text-xs leading-relaxed">
                     {emailWarning}
                   </div>
                )}
                <input type="text" placeholder="Full Name" required className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} />
                <input type="email" placeholder="Work Email" required className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" value={lead.email} onChange={e => { setLead({...lead, email: e.target.value}); setEmailWarning(""); }} />
                <select required className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-gray-400 focus:text-white focus:border-emerald-500 outline-none" value={lead.industry} onChange={e => setLead({...lead, industry: e.target.value})}>
                  <option value="">Select Industry...</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="IT">Technology</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
                
                <button disabled={isSubmitting} type="submit" className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform enabled:hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50">
                  {isSubmitting ? 'Generating...' : 'Download PDF Report'}
                </button>
             </form>

             <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                 <p className="text-xs text-gray-500">Need immediate 2026 Audit assistance?</p>
                 <a href="/contact" className="text-emerald-400 text-sm font-bold hover:underline mt-1 inline-block">Schedule a 2026 Compliance Audit &rarr;</a>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
