/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Vote, Info, Calendar, MessageSquare, Menu, X } from 'lucide-react';
import { Timeline } from './components/Timeline';
import { Guide } from './components/Guide';
import { Chat } from './components/Chat';
import { ReadinessTool } from './components/ReadinessTool';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'guide' | 'assistant'>('timeline');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'timeline', label: 'Election Cycle', icon: <Calendar className="w-4 h-4" /> },
    { id: 'guide', label: 'How To Vote', icon: <Info className="w-4 h-4" /> },
    { id: 'assistant', label: 'AI Assistant', icon: <MessageSquare className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white border-b-4 border-slate-100 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
            <Vote className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none">CIVICASSISTANT</h1>
            <div className="flex flex-col items-end md:items-start gap-1 mt-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Election 2026 Readiness</p>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-black text-blue-600 uppercase tracking-tight">
                  {currentTime.toLocaleDateString('en-GB') || '26-04-2026'}
                </p>
                <span className="text-slate-300">•</span>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {Intl.DateTimeFormat().resolvedOptions().timeZone.replace('Calcutta', 'Kolkata')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-slate-900 shadow-md ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-900"
              )}
              id={`nav-${tab.id}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex gap-4">
          <button 
            onClick={() => setActiveTab('guide')}
            className="px-6 py-2.5 bg-red-500 text-white text-sm font-bold rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Register to Vote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white pt-24 px-6 space-y-6 md:hidden"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "flex items-center gap-4 w-full p-4 rounded-3xl text-xl font-bold transition-all",
                activeTab === tab.id ? "bg-blue-50 text-blue-500" : "text-slate-900"
              )}
            >
              <div className={cn("p-3 rounded-2xl", activeTab === tab.id ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-slate-100")}>
                {tab.icon}
              </div>
              {tab.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-widest rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Non-Partisan Official Guide
            </div>
            <h2 className="text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-slate-900 uppercase">
              Secure Your <br /> <span className="text-blue-500 underline decoration-slate-200 underline-offset-8">Registration</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
              We've created a step-by-step guide to help you navigate registration, 
              candidates, and crossing the finish line. Every voice matters this November 2026.
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setActiveTab('guide')}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-slate-200"
              >
                Start Journey
              </button>
              <button 
                onClick={() => setActiveTab('assistant')}
                className="bg-white border-2 border-slate-200 text-slate-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all"
              >
                Ask AI Expert
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="aspect-[4/3] bg-white rounded-5xl border-2 border-slate-100 shadow-2xl shadow-blue-500/5 flex flex-col p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-[100px] -mr-16 -mt-16" />
              <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mb-8 relative z-10">
                 <Vote className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="w-16 h-1.5 bg-blue-500 rounded-full" />
                <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight italic">
                  "Voting is the expression of our commitment to ourselves and one another."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-900">Election Watch</p>
                    <p className="text-[10px] text-slate-500 font-bold">Updated: 5 Minutes Ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-5xl p-8 md:p-14 shadow-2xl shadow-slate-900/5 ring-1 ring-black/[0.02]">
          {activeTab === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-black rounded-full uppercase tracking-widest mb-4 inline-block">Milestones</span>
                  <h3 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Your Voting Journey</h3>
                  <p className="text-slate-500 font-medium mt-2">Track the critical dates in the national election cycle.</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-4xl flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Election Day</p>
                    <p className="text-xl font-black text-slate-900">Nov 3rd, 2026</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Status</p>
                    <p className="text-xl font-black text-slate-900">Active Cycle</p>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2">
                  <Timeline />
                </div>
                <div className="lg:col-span-1">
                  <ReadinessTool />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
               <Guide />
            </motion.div>
          )}

          {activeTab === 'assistant' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid md:grid-cols-3 gap-16">
                <div className="md:col-span-1 space-y-10">
                  <div className="space-y-4">
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest inline-block">Support</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">Expert <br/> Assistant</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Our non-partisan AI is ready to help you navigate forms, 
                      deadlines, and state-specific procedures.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sample Questions</p>
                    {['Am I eligible to vote?', 'How to register online?', 'Where is my polling place?'].map((q) => (
                      <div key={q} className="p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all hover:translate-x-2">
                        {q}
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-slate-100 rounded-4xl">
                    <p className="text-[10px] font-black text-slate-600 uppercase mb-3 tracking-widest">Daily Wisdom</p>
                    <p className="text-sm italic leading-relaxed text-slate-600 underline decoration-slate-200">"A man without a vote is a man without a protection."</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Chat />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-slate-500">
          <div className="col-span-2 space-y-6">
             <div className="flex items-center gap-2">
                <div className="bg-blue-500 text-white p-1.5 rounded-xl">
                  <Vote className="w-5 h-5" />
                </div>
                <h1 className="text-lg font-black tracking-tight text-slate-900">CIVICASSISTANT</h1>
              </div>
              <p className="text-sm border-l-2 border-slate-200 pl-4 max-w-sm leading-relaxed">
                Empowering citizens through real-time civic intelligence. v2.4.0 Interactive Official Guide.
              </p>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Explore</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Vote.gov</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Ballotpedia</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">FEC.gov</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Privacy</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Data Safety</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 gap-4">
          <span>Non-Partisan Official Guide</span>
          <span>© 2026 CivicAssistant • Every Voice Heard</span>
        </div>
      </footer>
    </div>
  );
}
