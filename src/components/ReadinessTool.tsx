import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MapPin, Search, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

type ReadinessStatus = 'start' | 'not-registered' | 'registered' | 'planning' | 'done';

export function ReadinessTool() {
  const [status, setStatus] = useState<ReadinessStatus>('start');
  const [state, setState] = useState('');
  
  const reset = () => {
    setStatus('start');
    setState('');
  };

  return (
    <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      
      <AnimatePresence mode="wait">
        {status === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 relative z-10"
          >
            <div className="space-y-4">
              <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Decision Engine</span>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic">
                Are you Vote-Ready?
              </h3>
              <p className="text-slate-400 font-medium max-w-md">
                Let's run a quick diagnostic to find your specific requirements for the 2026 Election cycle.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">First, are you registered?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setStatus('registered')}
                  className="p-6 bg-slate-800 border-2 border-slate-700 rounded-3xl text-left hover:border-blue-500 hover:bg-slate-800/50 transition-all group"
                >
                  <p className="font-black text-xl mb-1 group-hover:text-blue-400">YES</p>
                  <p className="text-xs text-slate-400">I've confirmed my registration status recently.</p>
                </button>
                <button 
                  onClick={() => setStatus('not-registered')}
                  className="p-6 bg-slate-800 border-2 border-slate-700 rounded-3xl text-left hover:border-red-500 hover:bg-slate-800/50 transition-all group"
                >
                  <p className="font-black text-xl mb-1 group-hover:text-red-400">NO / NOT SURE</p>
                  <p className="text-xs text-slate-400">I need to register or check my status.</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'not-registered' && (
          <motion.div
            key="not-registered"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 relative z-10"
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-red-500/10">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter">Priority #1: Register</h3>
              <p className="text-slate-400 text-lg">In many states, the deadline to register is 30 days before Election Day.</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Action Plan</p>
              <ul className="space-y-3">
                {['Visit Vote.gov to find your state portal', 'Prepare your Driver\'s License or SSN', 'Choose a political party (optional)'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
            >
              <RotateCcw className="w-4 h-4" /> Restart Diagnostic
            </button>
          </motion.div>
        )}

        {status === 'registered' && (
          <motion.div
            key="registered"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 relative z-10"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-500/10">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter">You're halfway there!</h3>
              <p className="text-slate-400 text-lg">Your registration is confirmed. Now, where will you be on Nov 3rd?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setStatus('planning')}
                className="flex items-center justify-between p-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-tighter group hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-500/5 text-sm"
              >
                In Town <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => setStatus('planning')}
                className="flex items-center justify-between p-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-tighter group hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-500/5 text-sm"
              >
                Away / Mail-in <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {status === 'planning' && (
          <motion.div
            key="planning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 relative z-10"
          >
             <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/10">
              <MapPin className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter">Locate Polling</h3>
              <p className="text-slate-400 text-lg leading-tight">Every state handles polling places differently. Enter your state to find your specific lookup tool.</p>
            </div>

            <div className="flex gap-2">
              <input 
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. California"
                className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={() => setStatus('done')}
                disabled={!state}
                className="bg-blue-500 text-white px-8 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-50"
              >
                Find
              </button>
            </div>
          </motion.div>
        )}

        {status === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="inline-block p-8 bg-green-500/20 rounded-full mb-4">
              <ShieldCheck className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter">You are Ready!</h3>
            <p className="text-slate-400 text-lg max-w-sm mx-auto font-medium">
              You have a plan for {state}. Check your email for a reminder on Election Day!
            </p>
            <button 
              onClick={reset}
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all"
            >
              Start New Check
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
