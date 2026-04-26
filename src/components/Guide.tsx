import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const steps = [
  {
    title: "1. Register",
    content: "Confirm you are registered to vote by your state's deadline. Many states allow online registration.",
    tip: "Pro tip: Check if your state offers 'Same Day Registration' if you missed the deadline."
  },
  {
    title: "2. Research Candidates",
    content: "Review non-partisan voter guides and candidate websites to understand their platforms and stances.",
    tip: "Use sites like Vote411 or Ballotpedia for comprehensive local information."
  },
  {
    title: "3. Choose Your Method",
    content: "Decide if you will vote by mail, early in-person, or at your polling place on Election Day.",
    tip: "If voting by mail, request your ballot as early as possible!"
  },
  {
    title: "4. Cast Your Ballot",
    content: "Bring your ID to the polling place or follow instructions carefully for mail-in ballots.",
    tip: "Remember to sign the envelope for your mail-in ballot to ensure it's counted!"
  }
];

export function Guide() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
  const prev = () => setCurrentStep(Math.max(0, currentStep - 1));

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Step-by-Step</span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">How to Vote</h2>
        </div>
        <div className="flex gap-1.5 pb-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 w-10 rounded-full transition-all duration-500",
                i <= currentStep ? "bg-blue-500 shadow-sm" : "bg-slate-200"
              )} 
            />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-white rounded-5xl p-8 md:p-14 shadow-2xl shadow-blue-500/5 border-2 border-slate-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            <div className="space-y-3">
              <span className="text-red-500 font-black text-[10px] tracking-widest uppercase">Milestone {currentStep + 1}</span>
              <h3 className="text-4xl font-black tracking-tight text-slate-900 uppercase leading-[0.9]">{steps[currentStep].title.split('. ')[1]}</h3>
            </div>
            
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              {steps[currentStep].content}
            </p>

            <div className="bg-slate-50 p-8 rounded-4xl border-2 border-slate-100 flex gap-6 items-start group hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                <CheckCircle className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                <span className="font-black uppercase tracking-widest text-[10px] text-blue-500 block mb-1">Pro Tip</span>
                {steps[currentStep].tip}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-14 pt-10 border-t border-slate-100">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-black uppercase tracking-widest text-[10px] px-4 py-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          
          {currentStep === steps.length - 1 ? (
             <button
              onClick={() => setCurrentStep(0)}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-slate-200"
            >
              Start Over
            </button>
          ) : (
            <button
              onClick={next}
              className="flex items-center gap-3 bg-blue-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
