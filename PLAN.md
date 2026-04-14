# EcoCredit AI - 2026 Growth & Technical Plan

## Overview
EcoCredit AI is designed to be the premier high-traffic utility site of 2026, capturing businesses seeking **Carbon Credit Calculators** and **Green Tax Incentives**. 

## Web Traffic Strategy
1. **SEO for High-Intent Queries:** 
   - Optimize pages for exact-match 2026 compliance queries (e.g., "EU CSRD carbon calculator 2026", "CBAM financial impact 2026", "BRSR Core Scope 3 reporting tool in India").
   - Maintain a dynamic sitemap with auto-generated programmatic landing pages for specific industries (e.g., "Carbon Calculator for EU Logistics", "India BRSR Dashboard for Manufacturing").
2. **Value-Add Utilities First:**
   - Offer a free "Quick Carbon Audit" tool. Businesses use the calculator, and we capture their lead information to provide deeper green tax incentive reports.
3. **Speed & UX (Core Web Vitals):**
   - Built on Next.js with React Server Components, delivering instant page loads to rank higher in Google's strict 2026 performance metrics.

## 2026 Reporting Requirements Framework
Legally accurate math is crucial. Our calculators will integrate the latest 2026 parameters:

### EU Regulations (CSRD & CBAM)
* **CSRD (Corporate Sustainability Reporting Directive):** By 2026, reporting expands significantly. Our math will account for double materiality and mandatory quantitative Scope 1, 2, and 3 emissions as required by the ESRS standards.
* **CBAM (Carbon Border Adjustment Mechanism):** 2026 marks the end of the transitional phase. Importers are now required to start purchasing and surrendering CBAM certificates. The calculator will project real certificate costs based on weekly EUA (EU Allowance) prices.

### Indian Regulations (BRSR Core & CCTS)
* **BRSR Core (Business Responsibility and Sustainability Reporting):** Full compliance mandated for the top 1000 listed entities, requiring assurance and reporting on the value chain (Scope 3).
* **CCTS (Carbon Credit Trading Scheme):** Starts enforcing strict compliance targets for obligated entities. The tool will calculate the delta between actual emissions and baseline to estimate potential carbon credit generation or deficit.

## Technical Architecture
* **Framework:** Next.js 15+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (with highly customized modern tokens, glassmorphism, dark mode)
* **State Management:** React Context / Zustand for the complex calculator state.
* **Hosting/Deploy:** Vercel / Edge Network for zero-latency calculator evaluations.
