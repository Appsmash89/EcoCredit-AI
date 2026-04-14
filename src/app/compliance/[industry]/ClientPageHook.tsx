"use client";
import React, { useState } from 'react';
import LeadModal from '@/components/LeadModal';

export default function ClientPageHook({ industry }: { industry: string }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-center w-full mt-4 mb-16 relative z-10 animate-fade-in-up">
      <button 
        onClick={() => setShowModal(true)} 
        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-lg py-5 px-10 rounded-2xl shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.03] border border-blue-400/30"
      >
        <span className="flex items-center justify-center gap-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download the Full 40-Page {industry} CERC Compliance Checklist
        </span>
      </button>

      {showModal && (
        <LeadModal 
           onClose={() => setShowModal(false)} 
           industryPlaceholder={industry} 
           title={`Access ${industry} Research`}
           subtitle={`Enter your corporate email to instantly receive the 40-page mapping guide for ${industry} obligations under the 2026 CCTS format.`}
           pdfTitle={`CERC_40_Page_Guide-${industry}`} 
        />
      )}
    </div>
  );
}
