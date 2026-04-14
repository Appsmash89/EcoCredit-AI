import data from '@/data/workflow-data.json';
import Link from 'next/link';

export default function WorkflowDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-12 font-sans overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center backdrop-blur-xl bg-gray-900/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4 drop-shadow-sm">
            CEO War Room
          </h1>
          <p className="text-emerald-100/60 font-medium tracking-wide uppercase text-sm">
            Growth, Engineering & Execution Hub
          </p>
        </div>

        {/* Marketing & Traffic Module */}
        <div className="backdrop-blur-xl bg-gray-900/40 p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               Marketing & Traffic Matrix
             </h2>
             <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-full animate-pulse">Live</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-[#0c1222] border border-[#1e293b] p-6 rounded-2xl flex flex-col justify-between">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Edge Requests</p>
                <div className="flex items-end gap-3">
                   <p className="text-4xl font-black text-white">42,891</p>
                   <p className="text-emerald-400 text-sm font-bold mb-1">+14.2%</p>
                </div>
                <div className="mt-4 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[65%] shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
                </div>
             </div>

             <div className="bg-[#0c1222] border border-[#1e293b] p-6 rounded-2xl flex flex-col justify-between">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Captured Leads (KV)</p>
                <div className="flex items-end gap-3">
                   <p className="text-4xl font-black text-cyan-400">1,204</p>
                   <p className="text-emerald-400 text-sm font-bold mb-1">High Intent</p>
                </div>
             </div>

             <div className="bg-[#0c1222] border border-[#1e293b] p-6 rounded-2xl flex flex-col justify-between">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Social Hubs</p>
                <div className="space-y-2 mt-2">
                   <Link href="/brand" className="w-full block bg-slate-900 border border-slate-700 hover:border-emerald-500/50 p-3 rounded-lg text-sm text-white font-medium text-center transition-colors">
                     View 'Alpha' Brand Kit
                   </Link>
                   <div className="w-full text-center text-xs text-gray-500 pt-2">X & LinkedIn Campaigns Dispatched</div>
                </div>
             </div>
          </div>
        </div>

        {/* Engineering Timeline */}
        <div className="backdrop-blur-xl bg-gray-900/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            Deployment Timeline
          </h2>
          
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500/30 before:to-transparent space-y-12">
            {[...data.tasks].reverse().map((task, idx) => (
              <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group">
                
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 bg-gray-900 text-emerald-400 shrink-0 md:order-1 md:group-even:-translate-x-1/2 md:group-odd:translate-x-1/2 shadow-[0_0_20px_rgba(52,211,153,0.3)] z-10 transition-transform group-hover:scale-110 group-hover:bg-emerald-950/50 group-hover:border-emerald-400/50 duration-300">
                  <span className="font-bold text-lg">{data.tasks.length - idx}</span>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md shadow-xl hover:border-emerald-500/40 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] hover:-translate-y-1">
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-4 gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-[10px] tracking-widest uppercase rounded-full border border-emerald-500/20">
                      {task.mission}
                    </span>
                    <span className="text-gray-400 text-xs font-mono flex items-center gap-1.5 flex-wrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0"></span>
                      {new Date(task.timestamp).toLocaleDateString()} {new Date(task.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {task.summary}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
