"use client";

import React, { useState } from 'react';
import jsPDF from 'jspdf';

interface LeadModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
  industryPlaceholder?: string;
  pdfTitle?: string;
}

export default function LeadModal({ onClose, title = "Download Full Report", subtitle = "Secure your 2026 compliant strategy copy.", industryPlaceholder = "Manufacturing", pdfTitle="EcoCredit_Checklist" }: LeadModalProps) {
  const [lead, setLead] = useState({ name: '', email: '', industry: industryPlaceholder });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");

  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

  const triggerDummyPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(52, 211, 153);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("ECOCREDIT AI", 20, 30);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(`40-PAGE 2026 ${lead.industry.toUpperCase()} COMPLIANCE CHECKLIST`, 20, 45);
    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text("Thank you for using our Freemium Answer model.", 20, 60);
    doc.text(`Prepared specifically for: ${lead.name}`, 20, 70);
    doc.text("Schedule your 1:1 CERC mapping at ecocredit.ai/contact", 20, 100);
    doc.save(`${pdfTitle}_${lead.name.replace(/ /g, '_')}.pdf`);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const domain = lead.email.split('@')[1]?.toLowerCase();
    
    if (personalDomains.includes(domain) && emailWarning === "") {
        setEmailWarning("We noticed you used a personal email. For official 2026 reports, please provide a corporate email. Click submit again to proceed anyway.");
        return;
    }
    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      triggerDummyPDF();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700/50 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
         <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none"></div>
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
         
         <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
         <p className="text-gray-400 text-sm mb-6">{subtitle}</p>
         
         <form onSubmit={handleLeadSubmit} className="space-y-4">
            {emailWarning && (
               <div className="bg-amber-900/30 border border-amber-500/50 p-3 rounded-lg text-amber-200 text-xs leading-relaxed animate-pulse">
                 {emailWarning}
               </div>
            )}
            <input type="text" placeholder="Full Name" required className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-colors" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} />
            <input type="email" placeholder="Work Email" required className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-colors" value={lead.email} onChange={e => { setLead({...lead, email: e.target.value}); setEmailWarning(""); }} />
            
            <button disabled={isSubmitting} type="submit" className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50">
              {isSubmitting ? 'Generating 40-Page Report...' : 'Download Checklist PDF'}
            </button>
         </form>
         
         <div className="mt-8 pt-6 border-t border-gray-800 text-center">
             <p className="text-xs text-gray-500 mb-1">We respect your inbox. No spam, just compliance.</p>
         </div>
      </div>
    </div>
  );
}
