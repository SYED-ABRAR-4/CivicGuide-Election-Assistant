import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { askElectionAssistant } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm your Election Assistant. How can I help you understand the voting process or election timelines today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await askElectionAssistant(userMessage, history);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-5xl overflow-hidden shadow-2xl shadow-blue-500/5 ring-4 ring-slate-100 relative">
      {/* Header */}
      <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black uppercase tracking-tight text-lg">CivicGPT</h3>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Non-Partisan Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Active</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-slate-50/30"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-start gap-4 max-w-[90%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-sm",
                m.role === 'user' ? "bg-slate-800 text-slate-100" : "bg-blue-100 text-blue-600 border border-blue-200"
              )}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "p-6 rounded-3xl text-sm leading-relaxed font-medium shadow-sm transition-all",
                m.role === 'user' 
                  ? "bg-slate-900 text-white rounded-tr-none hover:bg-slate-800" 
                  : "bg-white text-slate-700 rounded-tl-none border-2 border-slate-100 hover:border-blue-100"
              )}>
                <div className="markdown-body">
                  <Markdown>{m.content}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest ml-14"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating response...
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t-2 border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How do I get my mail-in ballot?"
            className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-300"
            id="chat-input"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-500 text-white p-4 rounded-2xl hover:bg-blue-600 disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95"
            id="send-button"
          >
            <Send className="w-6 h-6 border-none" />
          </button>
        </form>
        <p className="text-[9px] text-slate-400 text-center mt-4 font-black uppercase tracking-[0.2em]">
          Always verify with your local registrar or official government sources
        </p>
      </div>
    </div>
  );
}
