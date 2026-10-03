import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ShieldCheck, Briefcase, Film, Globe, Users, GraduationCap, ArrowRight, Calendar, MapPin, ImageOff, Eye, Maximize2 } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import ImageViewer from '../components/common/ImageViewer'
import { categories, freelance, experiences } from '../data/otherExperience'
import { useLanguage, tr } from '../context/LanguageContext'

const highlightIcons = {
  topRated: Award,
  jobSuccess: ShieldCheck,
  experience: Briefcase,
  editing: Film,
  international: Globe,
  production: Users,
}

const sectionMeta = [
  { key: 'community', labelKey: 'communityTag', icon: Users },
  { key: 'training', labelKey: 'trainingTag', icon: GraduationCap },
]

function SectionHeading({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon size={16} style={{ color }} />
      </span>
      <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--text-primary)]">{label}</h2>
    </div>
  )
}

function FreelanceSection({ t, lang, onView }) {
  const color = '#FFB830'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl border p-6 md:p-8"
      style={{ borderColor: `${color}30`, background: 'linear-gradient(135deg, rgba(255,184,48,0.05) 0%, rgba(255,60,172,0.04) 100%)' }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Film size={22} style={{ color }} />
        </div>
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase mb-1.5" style={{ color }}>{t.otherPage.freelanceTag}</p>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--text-primary)] leading-tight">{t.otherPage.freelanceTitle}</h2>
          <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed mt-2 max-w-2xl">{t.otherPage.freelanceDesc}</p>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3 mb-6">
        {freelance.highlights.map(h => {
          const Icon = highlightIcons[h.key]
          return (
            <li key={h.key} className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'var(--border-faint)', border: '1px solid var(--border-soft)' }}>
              <Icon size={16} className="flex-shrink-0" style={{ color }} />
              <span className="text-sm text-[var(--text-secondary)] font-body">{tr(h, 'label', lang)}</span>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={() => onView({ src: freelance.image, title: t.otherPage.viewUpwork })}
        className="group relative block w-full rounded-2xl overflow-hidden border border-[var(--border-soft)] bg-white mb-6"
      >
        <img src={freelance.image} alt={t.otherPage.viewUpwork} loading="lazy" className="w-full h-auto block" />
        <span className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-white bg-black/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          <Maximize2 size={11} /> {t.otherPage.viewUpwork}
        </span>
      </button>

      <Link to="/creative"
        className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-body font-medium text-white transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)' }}>
        {t.otherPage.freelanceCta}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  )
}

function ExperienceCard({ item, color, t, lang, onView, categoryLabel }) {
  const hasCertificate = Boolean(item.image)
  const title = tr(item, 'title', lang)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl border border-[var(--border-faint)] overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-surface)]">
        {hasCertificate ? (
          <img src={item.image} alt={title} loading="lazy" className="w-full h-full object-contain p-4" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--text-dim)]">
            <ImageOff size={28} strokeWidth={1.5} />
            <span className="text-xs font-mono">{t.technical.previewSoon}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <span className="self-start px-2.5 py-1 text-xs font-mono rounded-full"
          style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
          {categoryLabel}
        </span>
        <h3 className="font-display font-semibold text-[var(--text-primary)] leading-snug">{title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-[var(--text-dim)]">
          <span className="flex items-center gap-1.5"><Calendar size={11} />{tr(item, 'date', lang)}</span>
          {item.location && <span className="flex items-center gap-1.5"><MapPin size={11} />{item.location}</span>}
          {item.organization && <span>{item.organization}</span>}
        </div>
        <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed">{tr(item, 'description', lang)}</p>

        {item.topics && (
          <div className="flex flex-wrap gap-1.5">
            {tr(item, 'topics', lang).map(topic => (
              <span key={topic} className="px-2 py-0.5 text-xs font-mono rounded-md"
                style={{ background: `${color}0D`, color: `${color}CC`, border: `1px solid ${color}20` }}>
                {topic}
              </span>
            ))}
          </div>
        )}

        {hasCertificate && (
          <button
            type="button"
            onClick={() => onView({ src: item.image, title })}
            className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-colors hover:bg-[var(--border-soft)]"
            style={{ border: `1px solid ${color}40`, color }}
          >
            <Eye size={13} /> {t.otherPage.viewCertificate}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function OtherExperience() {
  const { t, lang } = useLanguage()
  const [viewer, setViewer] = useState(null)
  const closeViewer = useCallback(() => setViewer(null), [])

  return (
    <PageTransition>
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(255,184,48,0.08)] border border-[rgba(255,184,48,0.2)] text-[#FFB830]">
              {t.otherPage.tag}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mt-3">
              {t.otherPage.title1} <span className="text-gradient-gold">{t.otherPage.title2}</span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto font-body leading-relaxed">
              {t.otherPage.desc}
            </p>
          </motion.div>

          <section className="mb-16">
            <FreelanceSection t={t} lang={lang} onView={setViewer} />
          </section>

          {sectionMeta.map(section => {
            const items = experiences.filter(e => e.category === section.key)
            if (items.length === 0) return null
            const { color } = categories[section.key]
            return (
              <section key={section.key} className="mb-16">
                <SectionHeading icon={section.icon} label={t.otherPage[section.labelKey]} color={color} />
                <div className="grid md:grid-cols-2 gap-5">
                  {items.map(item => (
                    <ExperienceCard
                      key={item.id}
                      item={item}
                      color={color}
                      t={t}
                      lang={lang}
                      onView={setViewer}
                      categoryLabel={t.otherPage[section.labelKey]}
                    />
                  ))}
                </div>
              </section>
            )
          })}

        </div>
      </div>

      <ImageViewer viewer={viewer} onClose={closeViewer} closeLabel={t.otherPage.close} />
    </PageTransition>
  )
}
