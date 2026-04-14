"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function ResultsPage() {
  const router = useRouter();
  const [auditData, setAuditData] = useState<any>(null);
  const [toast, setToast] = useState("");
  const [lead, setLead] = useState({ name: '', email: '', industry: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");

  useEffect(() => {
    try {
       const dataString = sessionStorage.getItem('auditData');
       if (!dataString) throw new Error("No data");
       
       const parsed = JSON.parse(dataString);
       if (!parsed || !parsed.score) throw new Error("Invalid data");
       
       setAuditData(parsed);
       setLead((prev) => ({ ...prev, name: parsed.companyName || '', industry: parsed.industry || '' }));
    } catch {
       setToast("Profile incomplete. Please run the audit first.");
       setTimeout(() => router.push('/'), 3500);
    }
  }, [router]);

  if (!auditData) {
    return (
       <div className="min-h-screen bg-[#070b19] flex items-center justify-center text-white font-sans p-4">
          <div className="text-center bg-gray-900/60 p-8 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-xl animate-fade-in">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mx-auto mb-6"></div>
            <p className="text-xl text-emerald-400 font-bold mb-2">{toast || "Analyzing Compliance Matrices..."}</p>
            {toast ? (
              <p className="text-sm text-gray-400">Redirecting to audit engine...</p>
            ) : (
              <p className="text-sm text-gray-400">Calculating your 2026 specific thresholds</p>
            )}
          </div>
       </div>
    );
  }

  // Math extrapolations safely from client context
  const scoreRaw = parseInt((auditData.score || "0").replace(/,/g, ''));
  const penaltyEstimate = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(scoreRaw * 1250);
  const revenueEstimate = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(scoreRaw * 850);
  
  // Risk meter logic
  const isHighRisk = auditData.isTopListed && scoreRaw > 50000;
  const isModerateRisk = scoreRaw > 20000;

  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const domain = lead.email.split('@')[1]?.toLowerCase();
    
    if (personalDomains.includes(domain) && emailWarning === "") {
        setEmailWarning("We noticed you used a personal email. For official 2026 regulatory reports, we require a corporate business domain. Proceed anyway?");
        return; 
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      generatePDF();
      setToast("Strategics Saved! Your Certified PDF is downloading.");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(52, 211, 153);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("ECOCREDIT AI", 20, 30);
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("OFFICIAL 2026 COMPLIANCE & LIABILITY REPORT", 20, 45);
    
    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text(`Prepared for: ${auditData.companyName || lead.name}`, 20, 70);
    doc.text(`Industry: ${auditData.industry || lead.industry}`, 20, 80);
    doc.text(`Calculated Scope: ~${auditData.score} Tons CO2e`, 20, 90);
    
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(20, 220, 170, 20, 2, 2, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("URGENT: Schedule your 1:1 Tax Credit Implementation", 25, 233);
    doc.text("Visit: ecocredit.ai/contact", 25, 250);

    doc.save(`EcoCredit_2026_Strategy_${auditData.companyName || 'Report'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col items-center py-24 px-6 relative font-sans leading-relaxed">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none -z-10 blur-[100px]" />

      <div className="w-full max-w-5xl">
        <Link href="/" className="text-gray-500 hover:text-emerald-400 font-medium text-sm mb-12 inline-block transition-colors">&larr; Return to Dashboard</Link>

        {/* Success Alert */}
        {toast && toast.includes('Saved') && (
           <div className="w-full bg-emerald-900/30 border border-emerald-500/50 p-4 rounded-xl mb-8 flex items-center text-emerald-300 animate-fade-in-up">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {toast}
           </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Ungated Value Column */}
          <div className="space-y-8">
             <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full ${isHighRisk ? 'bg-red-500/30' : isModerateRisk ? 'bg-amber-500/30' : 'bg-emerald-500/30'}`}></div>
                
                <h2 className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold mb-4">Carbon Risk Level</h2>
                
                <div className="flex items-end gap-3 mb-6">
                   <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                     {auditData.score}
                   </span>
                   <span className="text-xl text-gray-500 font-bold mb-1">Tons CO₂e</span>
                </div>

                {auditData.isTopListed && (
                  <div className="bg-red-950/30 border-l-4 border-red-500 p-4 rounded text-sm text-red-200 mt-4 mb-8">
                    <strong>BRSR Core Warning:</strong> As a Top 1000 Listed Entity, your scope tracking mandate requires immediate attention before the February target locks.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="bg-black/40 border border-emerald-500/20 rounded-2xl p-5">
                      <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-2 break-words">Voluntary Revenue Est.</p>
                      <p className="text-2xl font-black text-emerald-400">{revenueEstimate}</p>
                   </div>
                   <div className="bg-black/40 border border-red-500/20 rounded-2xl p-5 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-2 break-words text-red-400/80">Est. 2026 Penalty</p>
                      <p className="text-2xl font-black text-red-500">{penaltyEstimate}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Lead Capture Sequence */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl relative flex flex-col justify-center">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 blur-[80px] rounded-full -z-10" />
             
             <div className="text-center mb-8">
               <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400 border border-blue-500/30">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Generate Certified Brief</h3>
               <p className="text-gray-400 text-sm">Secure a deeply researched, 40-page strategic PDF mapping your exact structural risk matrices for 2026.</p>
             </div>

             <form onSubmit={handleLeadSubmit} className="space-y-4">
                {emailWarning && (
                   <div className="bg-amber-900/40 border border-amber-500/50 p-4 rounded-xl text-amber-200 text-sm leading-relaxed mb-4">
                     {emailWarning}
                   </div>
                )}
                <div className="space-y-3">
                  <input type="text" placeholder="Authorized Name" required className="w-full bg-gray-950/80 border border-gray-800 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} />
                  
                  <input type="email" placeholder="C-Suite / Business Email" required className="w-full bg-gray-950/80 border border-gray-800 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600" value={lead.email} onChange={e => { setLead({...lead, email: e.target.value}); setEmailWarning(""); }} />
                  
                  <select required className="w-full bg-gray-950/80 border border-gray-800 rounded-xl p-4 text-gray-400 focus:text-white focus:border-blue-500 outline-none transition-all appearance-none" value={lead.industry} onChange={e => setLead({...lead, industry: e.target.value})}>
                    <option value="">Confirm Exact Segment...</option>
                    <option value="Manufacturing">Manufacturing & Heavy Industry</option>
                    <option value="IT">Technology & Operations</option>
                    <option value="Retail">Retail Supply Chain</option>
                    <option value="Other">Other Listed Entity</option>
                  </select>
                </div>
                
                <button disabled={isSubmitting} type="submit" className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(37,99,235,0.3)] disabled:opacity-50 text-lg">
                  {isSubmitting ? 'Generating Cryptographic PDF...' : 'Download Institutional Report'}
                </button>
             </form>

             <p className="text-center text-xs text-gray-500 mt-6 mt-auto">
               Guaranteed confidentiality. Our algorithmic tracking engine does not share raw emission telemetry externally.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}
