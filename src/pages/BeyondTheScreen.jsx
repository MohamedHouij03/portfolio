import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, FileText, HeartPulse, Cpu } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import { useLanguage } from '../context/LanguageContext'

const sectionMeta = [
  { key: 'research', icon: FileText, color: '#4FACFE' },
  { key: 'firstAid', icon: HeartPulse, color: '#00E5A0' },
  { key: 'robotics', icon: Cpu, color: '#7B6FF0' },
]

export default function BeyondTheScreen() {
  const { t } = useLanguage()
  const sections = sectionMeta.map(m => ({ ...m, title: t.beyond.sections[m.key], desc: t.beyond.comingSoon }))
  return (
    <PageTransition>
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(255,60,172,0.2), rgba(43,134,197,0.2))', border: '1px solid rgba(120,75,160,0.3)' }}>
              <Sparkles size={32} className="text-[#784BA0]" />
            </div>
            <span className="section-tag">{t.beyond.tag}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mt-3">
              {t.beyond.title1} <span className="text-gradient-gold">{t.beyond.title2}</span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto font-body leading-relaxed">
              {t.beyond.desc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {sections.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-[var(--border-faint)] text-center"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-dim)] font-body">{s.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
