
import React, { useState } from 'react';

const CTA: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setSendStatus('idle');
    setStatusMessage('');
    try {
      const response = await fetch('/api/sendInquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to send inquiry', errorText);
        setSendStatus('error');
        setStatusMessage('We could not send your inquiry. Please try again later.');
        return;
      }

      const result = await response.json();
      if (!result?.ok) {
        setSendStatus('error');
        setStatusMessage('We could not send your inquiry. Please try again later.');
        return;
      }

      setName('');
      setEmail('');
      setMessage('');
      setSendStatus('success');
      setStatusMessage('Your inquiry has been sent successfully. We will contact you soon.');
    } catch (err) {
      console.error('Failed to send inquiry', err);
      setSendStatus('error');
      setStatusMessage('We could not send your inquiry. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900 scroll-mt-24" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden reveal" style={{ backgroundColor: '#003b5c' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px]"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl font-black mb-8">Get in Touch</h2>
              <p className="text-slate-400 mb-12 text-lg">
                <span className="block">VOV SMART TECHNOLOGY JOINT STOCK COMPANY</span>
                <span className="block">Tax-code: 0111327434</span>
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Email Us</p>
                    <p className="font-bold">admin@vovsmart.net</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Call Us</p>
                    <p className="font-bold">+84 904 575 302</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Visit Us</p>
                    <p className="font-bold">36 Nguyen Dong Chi, Tu Liem, Hanoi</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 ring-accent outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 ring-accent outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 ring-accent outline-none h-32"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-accent hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed p-4 rounded-xl font-bold transition-all shadow-xl shadow-accent/20"
              >
                {isSending ? 'Sending...' : 'Send Inquiry'}
              </button>
              {sendStatus !== 'idle' && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                    sendStatus === 'success'
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                      : 'border-red-400/30 bg-red-400/10 text-red-200'
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
