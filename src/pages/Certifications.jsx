import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import { certifications } from '../data/technical'
import { useLanguage, tr } from '../context/LanguageContext'

const categories = ['All', 'Cloud', 'AI', 'Data Science']

function CertCard({ cert, i, lang }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: i * 0.05 }}
      className="glass rounded-2xl border border-[var(--border-faint)] overflow-hidden group"
    >
      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-surface)]">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `${cert.color}` }}>
              <ExternalLink size={14} className="text-white" />
            </div>
          </div>
        </div>
      </a>
      <div className="p-5 space-y-3">
        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block group/title">
          <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm leading-snug group-hover/title:text-[#4FACFE] transition-colors">
            {cert.title}
          </h3>
        </a>
        <p className="text-xs text-[var(--text-dim)] font-body leading-relaxed">
          {tr(cert, 'description', lang)}
        </p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-dim)]">
            <Calendar size={11} /> {cert.year}
          </div>
          <span className="px-2.5 py-0.5 text-xs font-mono rounded-full"
            style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}>
            {cert.category}
          </span>
        </div>
        <p className="text-[10px] text-[var(--text-faint)] font-mono">{cert.issuer} · {cert.platform}</p>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? certifications : certifications.filter(c => c.category === active)

  return (
    <PageTransition>
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(79,172,254,0.2) 0%, transparent 70%)' }} />
              <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(79,172,254,0.2), rgba(123,111,240,0.2))', border: '1px solid rgba(79,172,254,0.3)' }}>
                <Award size={32} className="text-[#4FACFE]" />
              </div>
            </div>
            <span className="section-tag">{t.certifications.tag}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mt-3">
              {t.certifications.title1}<br /><span className="text-gradient-blue">{t.certifications.title2}</span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto font-body leading-relaxed">
              {t.certifications.desc}
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { label: t.certifications.stats.total, value: certifications.length, color: '#4FACFE' },
              { label: t.certifications.stats.ai, value: certifications.filter(c => c.category === 'AI').length, color: '#7B6FF0' },
              { label: t.certifications.stats.dataScience, value: certifications.filter(c => c.category === 'Data Science').length, color: '#00E5A0' },
              { label: t.certifications.stats.cloud, value: certifications.filter(c => c.category === 'Cloud').length, color: '#00BCEB' },
            ].map(({ label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="glass rounded-2xl p-5 text-center border border-[var(--border-faint)]"
              >
                <div className="font-display text-3xl font-bold" style={{ color }}>{value}</div>
                <p className="text-xs text-[var(--text-dim)] font-mono mt-1">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-2 text-sm font-mono rounded-xl transition-all duration-200"
                style={active === cat
                  ? { background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)', color: 'white' }
                  : { background: 'var(--border-faint)', color: 'var(--text-dim)', border: '1px solid var(--border-soft)' }
                }
              >
                {t.certifications.categories[cat] || cat}
              </button>
            ))}
          </div>

          {/* Cert Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filtered.map((cert, i) => <CertCard key={cert.credentialId} cert={cert} i={i} lang={lang} />)}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
