import { motion } from 'motion/react';
import { CheckCircle2, Clock, Calendar, MapPin, Ticket } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const timelineData = [
  {
    id: 1,
    title: "Voter Registration",
    date: "Early Phase",
    description: "Ensure you are registered to vote. Check your status and deadlines for your state. Online registration is often the fastest route.",
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    status: "Due in 14 days"
  },
  {
    id: 2,
    title: "Primaries & Caucuses",
    date: "Spring - Early Summer",
    description: "Political parties select their nominees for the general election. This is where you help narrow down the field.",
    icon: <Calendar className="w-5 h-5" />,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    status: "Upcoming Phase"
  },
  {
    id: 3,
    title: "National Conventions",
    date: "Summer",
    description: "Parties officially announce their candidates for President and Vice President in a series of televised events.",
    icon: <MapPin className="w-5 h-5" />,
    color: "bg-slate-800",
    lightColor: "bg-slate-100",
    status: "Strategy Phase"
  },
  {
    id: 4,
    title: "Plan Your Vote",
    date: "Sept - Oct",
    description: "Many states allow voting by mail or in-person before Election Day. Deciding your method is key to ensuring your ballot counts.",
    icon: <Ticket className="w-5 h-5" />,
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    status: "Decision Time"
  },
  {
    id: 5,
    title: "Election Day",
    date: "November 3rd",
    description: "The final day to cast your ballot. Ensure you know your polling location and hours if voting in person.",
    icon: <Clock className="w-5 h-5" />,
    color: "bg-slate-900",
    lightColor: "bg-slate-200",
    status: "Final Action"
  },
];

export function Timeline() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="flex flex-col md:flex-row gap-12 py-4">
      {/* Sidebar: Steps Timeline */}
      <aside className="w-full md:w-72 flex flex-col">
        <h2 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Your Voting Journey</h2>
        
        <div className="space-y-4">
          {timelineData.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={cn(
                "flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left w-full group",
                activeStep === step.id
                  ? cn(step.lightColor, "border-blue-500")
                  : "bg-white border-transparent opacity-60 hover:opacity-100"
              )}
              id={`timeline-step-${step.id}`}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-black flex-shrink-0 transition-transform group-hover:scale-110",
                activeStep === step.id 
                  ? "bg-blue-500 text-white" 
                  : "bg-slate-100 text-slate-400"
              )}>
                {step.id}
              </div>
              <div>
                <p className={cn("font-black text-sm uppercase tracking-tight", activeStep === step.id ? "text-slate-900" : "text-slate-800")}>
                  {step.title}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Status: {step.status}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Display Area */}
      <section className="flex-1 flex flex-col">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-10">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase tracking-widest">Active Focus</span>
            <h3 className="text-5xl font-black mt-3 text-slate-900 italic tracking-tighter uppercase whitespace-pre-line">
              {timelineData.find(s => s.id === activeStep)?.title}
            </h3>
            <p className="text-xl text-slate-500 mt-4 leading-relaxed max-w-2xl font-medium">
              {timelineData.find(s => s.id === activeStep)?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-4xl shadow-2xl shadow-blue-500/5 border-2 border-slate-100 flex flex-col group hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-white group-hover:bg-red-100 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight mb-2">Check Eligibility</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Must be a citizen, resident of your state, and 18+ by election day.</p>
              <button className="mt-auto w-full py-4 bg-slate-100 text-slate-800 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-200 transition-all">Verify Status</button>
            </div>

            <div className="p-8 bg-white rounded-4xl shadow-2xl shadow-blue-500/5 border-2 border-slate-100 flex flex-col group hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-white group-hover:bg-blue-100 transition-colors">
                <Ticket className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight mb-2">Action Required</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Confirmation of address and identification is needed for this cycle.</p>
              <button className="mt-auto w-full py-4 bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">Start Step</button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
