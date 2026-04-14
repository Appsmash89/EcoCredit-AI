import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // High-Intent Business Filtering
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];
    const emailDomain = data.email?.split('@')[1]?.toLowerCase();
    const isPersonal = personalDomains.includes(emailDomain);
    
    const leadRecord = {
      ...data,
      timestamp: new Date().toISOString(),
      type: isPersonal ? 'Retail/Self-Employed' : 'Corporate',
      isHighIntent: !isPersonal
    };

    // Hybrid Edge Model
    if (process.env.NODE_ENV === 'development') {
        // Local Fallback
        console.log('\n[LOCAL EDGE FALLBACK] Simulated saving Lead Data to KV:\n', JSON.stringify(leadRecord, null, 2));
    } else {
        // Production: Cloudflare KV (ECOCREDIT_LEADS)
        const env = process.env as Record<string, any>;
        if (env.ECOCREDIT_LEADS) {
            const key = `lead_${Date.now()}_${data.email}`;
            await env.ECOCREDIT_LEADS.put(key, JSON.stringify(leadRecord));
        } else {
            console.log('[PROD WARNING] ECOCREDIT_LEADS KV binding not found. Logging safely.', leadRecord);
        }
    }
    
    return NextResponse.json({ success: true, lead: leadRecord });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process lead on the Edge' }, { status: 500 });
  }
}
