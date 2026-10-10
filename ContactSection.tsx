import React, { useState } from 'react';
import { CONTACT_INFO } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, Copy, ArrowUpRight, ScanSearch, AlertTriangle } from 'lucide-react';

interface ContactSectionProps {
  onHoverStateChange?: (text: string) => void;
}

const SERVICES = ['Not sure yet', 'Online + offline together', 'Offline & ground marketing', 'Digital & local visibility', 'Reels & short video', 'Strategy & counselling', 'Print & brand collateral'];
const BUDGETS = ['Not sure yet', 'Under ₹10,000 / month', '₹10,000 – ₹25,000 / month', '₹25,000 – ₹50,000 / month', 'Above ₹50,000 / month'];

const inputCls = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 text-sm font-sans';

export const ContactSection: React.FC<ContactSectionProps> = ({ onHoverStateChange }) => {
  const [form, setForm] = useState({ name: '', phone: '', business: '', email: '', service: SERVICES[0], budget: BUDGETS[0], message: '' });
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const copy = (text: string, label: string) => {
    sound.playClick();
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2200);
    }, () => {});
  };

  const waText = () =>
    encodeURIComponent(
      `Hi Aryan, I'm ${form.name || 'a business owner'}${form.business ? ` from ${form.business}` : ''}. I'd like a free audit. Interested in: ${form.service}. Budget: ${form.budget}.${form.message ? ` ${form.message}` : ''}${form.phone ? ` My number: ${form.phone}` : ''}`
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playEnergySurge();
    setStatus('sending');
    try {
      const res = await fetch(CONTACT_INFO.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New audit request: ${form.business || form.name}`,
          _template: 'table',
          _captcha: 'false',
          Name: form.name,
          Phone: form.phone,
          Business: form.business,
          Email: form.email,
          Service: form.service,
          Budget: form.budget,
          Message: form.message
        })
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      setForm({ ...form, message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Mail className="w-4 h-4" />
        <span>CONTACT / 13</span>
      </div>

      <div className="mb-14">
        <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase leading-[0.88] max-w-full break-words">
          LET'S PUT YOU <br />
          ON THE <br />
          <span className="text-brand-gold text-glow-gold">MAP.</span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-gray-300 mt-4 max-w-xl">
          Tell Aryan about your business. He reads every message and replies personally, usually within a day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-4">
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover(900)}
            className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-green-900/30 to-emerald-950/40 hover:from-emerald-900/60 hover:to-green-900/50 transition-all duration-300 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.25)] flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>1-CLICK WHATSAPP</span>
                </div>
                <div className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{CONTACT_INFO.phone}</div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {[
            { label: 'EMAIL', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, Icon: Mail, key: 'email' },
            { label: 'DIRECT PHONE', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`, Icon: Phone, key: 'phone' }
          ].map(({ label, value, href, Icon, key }) => (
            <div key={key} className="p-6 rounded-3xl glass-panel hover:glass-panel-active transition-all duration-300 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="p-3 rounded-2xl bg-brand-ember/20 text-brand-gold shrink-0"><Icon className="w-6 h-6" /></div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-gray-400 uppercase">{label}</div>
                  <a href={href} className="text-sm sm:text-base font-bold text-white hover:text-brand-gold transition-colors [overflow-wrap:anywhere]">{value}</a>
                </div>
              </div>
              <button type="button" onClick={() => copy(value, key)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white shrink-0" title={`Copy ${label.toLowerCase()}`}>
                {copied === key ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}

          <div className="p-6 rounded-3xl glass-panel border border-brand-gold/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-gold uppercase"><ScanSearch className="w-4 h-4" /> THE FREE AUDIT COVERS</div>
            <ul className="space-y-2 text-sm text-gray-200 font-sans">
              {['Your Google listing — category, photos, reviews, pin', 'Instagram & Facebook — what customers see first', 'Nearby competitors — who shows up above you', 'Your shop board & print — through a customer\'s eyes', 'Three quick wins you can fix this week'].map((x) => (
                <li key={x} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={submit} className="p-6 sm:p-10 rounded-3xl glass-panel-active border-2 border-brand-gold/40 shadow-[0_0_50px_rgba(255,90,31,0.22)] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="c-name" className="text-xs font-mono text-gray-400 uppercase">YOUR NAME *</label>
                <input id="c-name" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
              </div>
              <div className="space-y-2">
                <label htmlFor="c-phone" className="text-xs font-mono text-gray-400 uppercase">PHONE / WHATSAPP *</label>
                <input id="c-phone" required type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+91" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="c-biz" className="text-xs font-mono text-gray-400 uppercase">BUSINESS & CITY *</label>
                <input id="c-biz" required value={form.business} onChange={set('business')} placeholder="e.g. Sharma Dental Clinic, Palampur" className={inputCls} />
              </div>
              <div className="space-y-2">
                <label htmlFor="c-mail" className="text-xs font-mono text-gray-400 uppercase">EMAIL (OPTIONAL)</label>
                <input id="c-mail" type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder="name@business.com" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="c-svc" className="text-xs font-mono text-gray-400 uppercase">WHAT DO YOU NEED?</label>
                <select id="c-svc" value={form.service} onChange={set('service')} className={`${inputCls} bg-[#0f0c09]`}>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="c-bud" className="text-xs font-mono text-gray-400 uppercase">MONTHLY BUDGET</label>
                <select id="c-bud" value={form.budget} onChange={set('budget')} className={`${inputCls} bg-[#0f0c09]`}>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="c-msg" className="text-xs font-mono text-gray-400 uppercase">WHAT WOULD YOU LIKE TO IMPROVE?</label>
              <textarea id="c-msg" rows={4} value={form.message} onChange={set('message')} placeholder="More walk-ins, more calls, a better Google listing…" className={inputCls} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => { sound.playHover(1100); onHoverStateChange?.('SEND'); }}
                onMouseLeave={() => onHoverStateChange?.('')}
                className="flex-1 w-full py-4 rounded-xl bg-gradient-to-r from-brand-ember via-orange-500 to-brand-gold text-black font-mono font-bold tracking-wider hover:shadow-[0_0_35px_rgba(255,176,32,0.6)] transition-all flex items-center justify-center space-x-2 group disabled:opacity-60"
              >
                <span>{status === 'sending' ? 'SENDING…' : 'REQUEST MY FREE AUDIT'}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`https://wa.me/918894402974?text=${waText()}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/50 text-emerald-300 font-mono font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP INSTEAD</span>
              </a>
            </div>

            <div role="status" aria-live="polite">
              {status === 'sent' && (
                <div className="p-4 rounded-xl bg-green-950/50 border border-green-500/50 text-green-300 text-xs font-mono text-center flex items-center justify-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>THANKS{form.name ? `, ${form.name.toUpperCase()}` : ''}! ARYAN WILL REPLY WITHIN A DAY.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono text-center flex items-center justify-center gap-2 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4" />
                  <span>THE FORM COULDN'T SEND. PLEASE USE "WHATSAPP INSTEAD" — YOUR DETAILS ARE ALREADY FILLED IN.</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
