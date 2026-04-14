import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Hi there! 👋 Welcome to Dr. LB Dental Clinic!\n\nI'm your AI assistant. I can help you with:\n• Branch locations\n• Services we offer\n• Booking appointments\n• Clinic hours & more\n\nHow can I help you today? 🦷" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
        return (
          <div key={j} className="flex gap-2 mt-1">
            <span dangerouslySetInnerHTML={{ __html: bold }} />
          </div>
        );
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

### 🧠 Your Personality:
- Professional, warm, and approachable like a clinic receptionist
- Use simple English and Taglish if the user speaks Tagalog or Taglish
- Be genuinely helpful, reassuring, and encouraging
- Use emojis lightly to keep things friendly (🦷😊📍📅)
- Never diagnose or prescribe medication

### 🏥 Clinic Information:
SCHEDULE: Monday to Sunday | 9:00 AM to 6:00 PM

BRANCHES (8 locations):
1. Amang Rodriguez Branch | Pasig - Amang Rodriguez Ave
2. Pasig Blvd Branch | Pasig - Pasig Blvd
3. Mandaluyong Branch | Mandaluyong City
4. Congressional Ave Branch | Quezon City - Congressional Ave
5. Regalado Ave Fairview Branch | Quezon City - Fairview
6. Malanday Branch | Marikina - Malanday
7. Parang Branch | Marikina - Unit 5, 2nd Floor GTI Bldg., B.G. Molina Street, Brgy. Parang, Marikina City
8. Tanauan Branch | Batangas - Tanauan

CONTACT (Parang Branch):
- Globe: 0995 466 6672
- Landline: 727 516 23

### 🦷 Services:
**General Services:**
- Oral Prophylaxis (Dental Cleaning)
- Tooth Restoration (Pasta/Filling)
- Tooth Extraction (Bunot)
- Odontectomy (Wisdom Tooth Removal)
- Root Canal Therapy
- Teeth Whitening

**Orthodontic Services (Braces):**
- Metal Braces
- Ceramic Braces
- Self-Ligating Braces
- Clear Aligners

**Prosthodontic Services:**
- Partial/Complete Dentures (Plastic, Porcelain, Flexible)
- Jacket Crowns
- Bridges
- Veneers

**Other Services:**
- Dental Implants
- TMJ Management

### 📋 What you help with:
1. **Branch info** - List all branches or help find the nearest one based on user location
2. **Services** - Explain services in simple terms, what to expect
3. **Appointments** - Collect name, preferred branch, date & time, service needed. End with: "Thank you! We've received your request. Our staff will confirm your schedule shortly. 😊"
4. **Pricing** - Give estimated ranges only, always remind final price depends on dentist assessment
5. **First visit guidance** - What to bring (valid ID, any previous dental records), arrive 10 mins early, inform dentist of any medications

### 🚫 Never:
- Diagnose dental conditions
- Prescribe medication
- Guarantee medical outcomes
- Invent branch details or prices

### 💬 Format Rules:
- Use bullet points for lists
- Bold important info
- Keep paragraphs short
- Always end with: "Let me know if you need help with anything else 😊"

### 📍 Nearest Branch:
If user asks for nearest branch, ask for their city/barangay first, then recommend the closest branch.`
            },
            ...messages.map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.text
            })),
            { role: 'user', content: userMsg }
          ],
          max_tokens: 600,
        })
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'Sorry, I could not respond.';
      setMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
    } catch (error) {
      console.error('Groq error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Oops! Something went wrong. Please try again. 😊' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 bg-teal-primary text-white p-4 rounded-full shadow-2xl hover:bg-teal-dark transition-colors"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-40 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-teal-primary p-4 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-bold">Dr. LB Assistant</p>
                <p className="text-xs opacity-80">🦷 Powered by AI • Usually replies instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 bg-teal-primary rounded-full flex items-center justify-center text-white text-xs mr-2 mt-1 flex-shrink-0">
                      🦷
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
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
                  <div className="w-7 h-7 bg-teal-primary rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                    🦷
                  </div>
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

            {/* Input */}
            <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-primary transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-teal-primary text-white p-2 rounded-xl hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};