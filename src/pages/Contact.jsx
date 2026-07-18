import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, Github, Linkedin, Mail, ExternalLink, MapPin, FileDown, CheckCircle, AlertCircle, MessageSquare, CalendarClock } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import { useLanguage } from '../context/LanguageContext'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const socials = [
  { icon: Linkedin, label: 'LinkedIn', handle: '/in/mohamed-houij-b11a0a161', href: 'https://www.linkedin.com/in/mohamed-houij-b11a0a161/', color: '#0077B5' },
  { icon: Github, label: 'GitHub', handle: '/mohamedhouij', href: 'https://github.com', color: '#8B8BA8' },
  {
    icon: () => <span className="text-sm font-bold">Up</span>,
    label: 'Upwork', handle: 'Top Rated Profile', href: 'https://upwork.com', color: '#14A800'
  },
  { icon: Mail, label: 'Email', handle: 'mohamed.houij@polytechnicien.tn', href: 'mailto:mohamed.houij@polytechnicien.tn', color: '#4FACFE' },
]

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', reason: '', reasonIndex: -1 })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reason: form.reason || 'Not specified',
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '', reason: '', reasonIndex: -1 })
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <div className="pt-24 pb-20 px-6 relative">
        {/* BG Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,172,254,0.06) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(123,111,240,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(79,172,254,0.2), rgba(123,111,240,0.2))', border: '1px solid rgba(79,172,254,0.3)' }}>
              <MessageSquare size={32} className="text-[#4FACFE]" />
            </div>
            <span className="section-tag">{t.contact.tag}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mt-3">
              {t.contact.title1} <span className="text-gradient-blue">{t.contact.title2}</span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto font-body leading-relaxed">
              {t.contact.desc}
            </p>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-[var(--text-dim)] text-sm font-mono">
              <MapPin size={14} className="text-[#4FACFE]" />
              {t.contact.location}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-3xl p-8 border border-[rgba(79,172,254,0.08)]">
                {status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)' }}>
                      <CheckCircle size={28} className="text-[#00E5A0]" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">{t.contact.messageSentTitle}</h3>
                    <p className="text-[var(--text-muted)] font-body text-sm max-w-xs">
                      {t.contact.messageSentDesc}
                    </p>
                    <button onClick={() => setStatus('idle')}
                      className="mt-4 px-5 py-2 rounded-xl text-sm font-mono text-[#4FACFE] border border-[rgba(79,172,254,0.2)] hover:border-[rgba(79,172,254,0.4)] transition-all">
                      {t.contact.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-display font-bold text-[var(--text-primary)] text-lg mb-6">{t.contact.sendMessageTitle}</h3>

                    {/* Reason chips */}
                    <div>
                      <p className="text-xs font-mono text-[var(--text-dim)] mb-3 uppercase tracking-wider">{t.contact.reasonLabel}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.contact.reasons.map((label, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, reason: label, reasonIndex: i }))}
                            className="px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-200"
                            style={form.reasonIndex === i
                              ? { background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)', color: 'white' }
                              : { background: 'var(--border-faint)', color: 'var(--text-dim)', border: '1px solid var(--border-soft)' }
                            }
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider">{t.contact.nameLabel}</label>
                        <input
                          name="name" value={form.name} onChange={handleChange} required
                          placeholder={t.contact.namePlaceholder}
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider">{t.contact.emailLabel}</label>
                        <input
                          name="email" type="email" value={form.email} onChange={handleChange} required
                          placeholder={t.contact.emailPlaceholder}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider">{t.contact.subjectLabel}</label>
                      <input
                        name="subject" value={form.subject} onChange={handleChange} required
                        placeholder={t.contact.subjectPlaceholder}
                        className="form-input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider">{t.contact.messageLabel}</label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange} required
                        rows={5} placeholder={t.contact.messagePlaceholder}
                        className="form-input resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-sm text-[#FF4E8A] bg-[rgba(255,78,138,0.08)] border border-[rgba(255,78,138,0.2)] rounded-xl px-4 py-3">
                        <AlertCircle size={16} className="flex-shrink-0" />
                        {t.contact.errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium text-white transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(79,172,254,0.3)] disabled:opacity-70"
                      style={{ background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)' }}
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          {t.contact.sending}
                        </>
                      ) : (
                        <><Send size={16} /> {t.contact.sendMessage}</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Social Links */}
              <div className="glass rounded-2xl p-6 border border-[rgba(79,172,254,0.08)] space-y-4">
                <p className="text-xs font-mono text-[#4FACFE] uppercase tracking-[0.2em]">{t.contact.connect}</p>
                {socials.map(({ icon: Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                      style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body text-[var(--text-primary)]">{label}</p>
                      <p className="text-xs font-mono text-[var(--text-dim)] truncate">{handle}</p>
                    </div>
                    <ExternalLink size={12} className="text-[var(--text-faint)] group-hover:text-[#4FACFE] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>

              {/* Schedule a Meeting */}
              <motion.a
                href="https://calendly.com/mohamed-houij"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 border border-[rgba(79,172,254,0.15)] group"
                style={{ background: 'linear-gradient(135deg, rgba(79,172,254,0.05), rgba(123,111,240,0.05))' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79,172,254,0.15)', border: '1px solid rgba(79,172,254,0.3)' }}>
                  <CalendarClock size={20} className="text-[#4FACFE]" />
                </div>
                <div>
                  <p className="font-display font-semibold text-[var(--text-primary)] text-sm">{t.contact.scheduleMeeting}</p>
                  <p className="text-xs text-[var(--text-dim)] font-mono mt-0.5">{t.contact.scheduleMeetingDesc}</p>
                </div>
                <ExternalLink size={14} className="text-[var(--text-faint)] group-hover:text-[#4FACFE] transition-colors ml-auto flex-shrink-0" />
              </motion.a>

              {/* Ask for CV */}
              <motion.a
                href="mailto:mohamed.houij@polytechnicien.tn?subject=CV%20Request&body=Hi%20Mohamed%2C%0A%0ACould%20you%20please%20send%20me%20your%20CV%3F%0A%0AThanks!"
                whileHover={{ y: -3, scale: 1.02 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 border border-[rgba(255,184,48,0.15)] group"
                style={{ background: 'linear-gradient(135deg, rgba(255,184,48,0.05), rgba(255,140,66,0.05))' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,184,48,0.15)', border: '1px solid rgba(255,184,48,0.3)' }}>
                  <FileDown size={20} className="text-[#FFB830]" />
                </div>
                <div>
                  <p className="font-display font-semibold text-[var(--text-primary)] text-sm">{t.contact.askForCv}</p>
                  <p className="text-xs text-[var(--text-dim)] font-mono mt-0.5">{t.contact.askForCvDesc}</p>
                </div>
                <ExternalLink size={14} className="text-[var(--text-faint)] group-hover:text-[#FFB830] transition-colors ml-auto flex-shrink-0" />
              </motion.a>

              {/* Availability */}
              <div className="glass rounded-2xl p-5 border border-[rgba(0,229,160,0.1)]">
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00E5A0]"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <p className="text-sm font-display font-semibold text-[var(--text-primary)]">{t.contact.currentlyAvailable}</p>
                </div>
                <p className="text-xs text-[var(--text-dim)] font-body leading-relaxed">
                  {t.contact.availabilityDesc}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {t.contact.availabilityTags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-[rgba(0,229,160,0.08)] text-[#00E5A0] border border-[rgba(0,229,160,0.2)]">{tag}</span>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
