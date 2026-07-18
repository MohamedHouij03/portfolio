import React from 'react'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import { useLanguage } from '../context/LanguageContext'

const milestones = [
  { year: '2016', title: 'First Steps in Video Editing', desc: 'Discovered a passion for video editing at a young age, self-teaching the craft to create early YouTube content.', color: '#FFB830' },
  { year: '2017', title: 'Launched YouTube Content Journey', desc: 'Began producing and publishing original YouTube videos, building foundational skills in storytelling and post-production.', color: '#4FACFE' },
  { year: '2022', title: 'Engineering Preparatory Studies', desc: 'Joined ISSAT Mahdia for an intensive two-year preparatory program in mathematics, physics, and engineering fundamentals.', color: '#7B6FF0' },
  { year: '2023', title: 'First Freelance Video Editing Client', desc: 'Secured first paid video editing project on Upwork, marking the start of a professional freelance career.', color: '#00E5A0' },
  { year: '2024', title: 'Admitted to École Polytechnique de Sousse', desc: 'Began the Computer Engineering program at EPS, specializing in software engineering, AI, and data systems.', color: '#FF4E8A' },
  { year: '2025', title: 'Achieved Top Rated Status on Upwork', desc: 'Earned Upwork\'s Top Rated badge, reflecting consistent client satisfaction and professional-grade video editing delivery.', color: '#4FACFE' },
  { year: '2025', title: 'Video Editing Team Lead at ClueCut', desc: 'Promoted to lead a team of 6 video editors, overseeing the production of 100+ videos for Dreaming French, a leading French-language learning platform.', color: '#7B6FF0' },
  { year: '2025', title: 'Delivered First Professional Website', desc: 'Designed and built a full website for a fitness education brand, expanding expertise into professional web development.', color: '#00E5A0' },
]

export default function Achievements() {
  const { t } = useLanguage()
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
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(255,184,48,0.2), rgba(255,78,138,0.2))', border: '1px solid rgba(255,184,48,0.3)' }}>
              <Trophy size={32} className="text-[#FFB830]" />
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(255,184,48,0.08)] border border-[rgba(255,184,48,0.2)] text-[#FFB830]">
              {t.achievements.tag}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mt-3">
              {t.achievements.title1} <span className="text-gradient-gold">{t.achievements.title2}</span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto font-body leading-relaxed">
              {t.achievements.desc}
            </p>
          </motion.div>

          <div className="relative">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, rgba(79,172,254,0.5), rgba(123,111,240,0.5), transparent)' }} />

            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative md:flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                >
                  {/* Card */}
                  <div className="md:w-5/12">
                    <div className="glass rounded-2xl p-5 border border-[var(--border-faint)]"
                      style={{ borderLeft: `3px solid ${m.color}` }}>
                      <span className="text-xs font-mono" style={{ color: m.color }}>{m.year}</span>
                      <h3 className="font-display font-semibold text-[var(--text-primary)] mt-1">{m.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] font-body mt-1.5 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex md:w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full border-2 z-10"
                      style={{ background: 'var(--bg-base)', borderColor: m.color, boxShadow: `0 0 10px ${m.color}` }} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  )
}
