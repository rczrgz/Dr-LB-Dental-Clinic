import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Bot, User } from 'lucide-react';
import logo from "../assets/light-logo.png";

const BRANCHES = [
  { name: 'Amang Rodriguez', area: 'Pasig', numbers: ['0917 186 1314'] },
  { name: 'Pasig Blvd', area: 'Pasig', numbers: ['0917 102 5905'] },
  { name: 'Mandaluyong', area: 'Mandaluyong', numbers: ['0917 345 6789'] },
  { name: 'Congressional Ave', area: 'Quezon City', numbers: ['0917 456 7890'] },
  { name: 'Regalado Ave Fairview', area: 'Quezon City', numbers: ['0917 567 8901'] },
  { name: 'Malanday', area: 'Marikina', numbers: ['0906 581 6444'] },
  { name: 'Parang', area: 'Marikina', numbers: ['0995 466 6672', '727-516-23'] },
  { name: 'Tanauan', area: 'Batangas', numbers: ['0917 890 1234'] },
];

type Mode = 'select' | 'ai' | 'human';

export const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('select');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Hi there! 👋 Welcome to Dr. LB Dental Clinic!\n\nI'm your AI assistant. I can help you with:\n• Branch locations\n• Services we offer\n• Booking appointments\n• Clinic hours & more\n\nHow can I help you today? 🦷" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setMode('select');
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, j) => {
      if (line.trim() === '') return <div key={j} className="h-2" />;
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const content = line.replace(/^[\*\-•]\s/, '');
        const bold = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return (
          <div key={j} className="flex gap-2 mt-1">
            <span className="mt-0.5 text-teal-600">•</span>
            <span dangerouslySetInnerHTML={{ __html: bold }} />
          </div>
        );
      }
      if (/^\d+\./.test(line.trim())) {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <div key={j} className="flex gap-2 mt-1"><span dangerouslySetInnerHTML={{ __html: bold }} /></div>;
      }
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <div key={j} className="mt-1" dangerouslySetInnerHTML={{ __html: bold }} />;
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are the official AI assistant for Dr. LB Dental Clinic. 
Your role is to help patients and visitors with warm, friendly, and highly informative responses.

### Personality:
- Professional, warm, and approachable like a clinic receptionist
- Use simple English and Taglish if the user speaks Tagalog or Taglish
- Be genuinely helpful, reassuring, and encouraging
- Use emojis lightly (🦷😊📍📅)
- Never diagnose or prescribe medication

### Clinic Info:
SCHEDULE: Monday to Sunday | 9:00 AM to 6:00 PM
BRANCHES: Amang Rodriguez (Pasig), Pasig Blvd (Pasig), Mandaluyong, Congressional Ave (QC), Regalado Fairview (QC), Malanday (Marikina), Parang (Marikina), Tanauan (Batangas)
CONTACT Parang: Globe 0995 466 6672 | Landline 727-516-23

### Services: Cleaning, Filling, Extraction, Odontectomy, Root Canal, Whitening, Metal/Ceramic/Self-Ligating Braces, Clear Aligners, Dentures, Crowns, Bridges, Veneers, Implants, TMJ

### Rules:
- Never diagnose, prescribe, or guarantee outcomes
- Pricing: estimated ranges only
- Always end with: "Let me know if you need help with anything else 😊"`
            },
            ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: userMsg }
          ],
          max_tokens: 600,
        })
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'Sorry, I could not respond.';
      setMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Oops! Something went wrong. Please try again. 😊' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-9999 bg-teal-primary text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-teal-dark transition-colors"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-4 sm:right-8 z-9999 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 w-[calc(100vw-2rem)] max-w-sm"
          >
            {/* Header */}
            <div className="bg-teal-primary p-3 text-white flex items-center gap-3">
             <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-white p-1">
  <img src={logo} alt="Dr. LB" className="w-full h-full object-contain" />
</div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
  <p className="font-bold text-sm">Dr. LB Assistant</p>
  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
</div>
                <p className="text-xs opacity-80 truncate">
                  {mode === 'human' ? '📞 Branch contacts' : '🦷 Powered by AI • Usually replies instantly'}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1 shrink-0">
                {mode !== 'select' && (
                  <button
                    onClick={() => setMode('select')}
                    className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors"
                  >
                    Switch
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors ml-1">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Mode Select */}
            {mode === 'select' && (
              <div className="p-5 bg-slate-50">
                <p className="text-sm font-medium text-slate-600 text-center mb-4">How would you like to connect?</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setMode('ai')}
                    className="flex items-center gap-3 bg-white border border-slate-200 hover:border-teal-primary hover:bg-teal-50 rounded-xl p-4 transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-teal-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Bot size={20} className="text-teal-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">AI Assistant</p>
                      <p className="text-xs text-slate-500">Ask questions, book appointments, get info instantly</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMode('human')}
                    className="flex items-center gap-3 bg-white border border-slate-200 hover:border-teal-primary hover:bg-teal-50 rounded-xl p-4 transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-teal-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <User size={20} className="text-teal-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Talk to Our Staff</p>
                      <p className="text-xs text-slate-500">Call your nearest branch directly</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* AI Chat */}
            {mode === 'ai' && (
              <>
                <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'ai' && (
                        <div className="w-7 h-7 bg-teal-primary rounded-full flex items-center justify-center text-white text-xs mr-2 mt-1 shrink-0">🦷</div>
                      )}
                      <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-teal-primary text-white rounded-br-none'
                          : 'bg-white text-slate-700 rounded-bl-none shadow-sm border border-slate-100'
                      }`}>
                        {formatMessage(msg.text)}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start items-center gap-2">
                      <div className="w-7 h-7 bg-teal-primary rounded-full flex items-center justify-center text-white text-xs shrink-0">🦷</div>
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                        <div className="flex gap-1 items-center">
                          <span className="w-2 h-2 bg-teal-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-teal-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-teal-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-primary transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-teal-primary text-white p-2 rounded-xl hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
            {/* Branch Contacts */}
            {mode === 'human' && (
              <div className="overflow-y-auto bg-slate-50" style={{ maxHeight: '22rem' }}>
                <p className="text-xs text-slate-400 text-center pt-3 pb-1 px-4">
                  Open Mon–Sun · 9:00 AM – 6:00 PM
                </p>
                <div className="p-3 space-y-2">
                  {BRANCHES.map((branch) => (
                    <div key={branch.name} className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{branch.name}</p>
                          <p className="text-xs text-slate-400">{branch.area}</p>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          {branch.numbers.map((num) => (
                            <a
                              key={num}
                              href={`tel:${num.replace(/[\s\-]/g, '')}`}
                              className="flex items-center gap-1.5 bg-teal-primary text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-teal-dark transition-colors whitespace-nowrap"
                            >
                              <Phone size={11} />
                              {num}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};