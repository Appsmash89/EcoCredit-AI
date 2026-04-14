import data from '@/data/workflow-data.json';

export default function WorkflowDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-12 font-sans overflow-hidden relative">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-teal-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-gray-900/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4 drop-shadow-sm">
            CEO War Room
          </h1>
          <p className="text-emerald-100/60 font-medium tracking-wide uppercase text-sm">
            Execution Timeline & Updates
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500/30 before:to-transparent space-y-12">
          {data.tasks.map((task, idx) => (
            <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Timeline Marker */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 bg-gray-900 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(52,211,153,0.3)] z-10 transition-transform group-hover:scale-110 group-hover:bg-emerald-950/50 group-hover:border-emerald-400/50 duration-300">
                <span className="font-bold text-lg">{idx + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md shadow-xl hover:border-emerald-500/40 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] hover:-translate-y-1">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-xs tracking-widest uppercase rounded-full border border-emerald-500/20">
                    {task.mission}
                  </span>
                  <span className="text-gray-400 text-sm font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                    {new Date(task.timestamp).toLocaleDateString()} {new Date(task.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">
                  {task.summary}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
