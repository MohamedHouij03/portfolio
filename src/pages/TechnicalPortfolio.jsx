import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Github, ExternalLink, Code2, Brain, Database, Layers, GraduationCap, Briefcase, ImageOff, Rocket, Calculator } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/common/PageTransition'
import BorderGlow from '../components/common/BorderGlow'
import { techSkills, education, projects, experience } from '../data/technical'
import { useLanguage } from '../context/LanguageContext'

/* ── Skill Chip ──────────────────────────────────────────────────────────── */
function SkillChip({ name, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-body text-[var(--text-secondary)] transition-colors duration-200 overflow-hidden"
      style={{ background: 'var(--border-faint)', border: '1px solid var(--border-soft)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: `linear-gradient(135deg, ${color}14 0%, transparent 70%)` }} />
      <span className="relative w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      <span className="relative group-hover:text-[var(--text-primary)] transition-colors duration-200">{name}</span>
    </motion.div>
  )
}

/* ── Project Card ────────────────────────────────────────────────────────── */
function ProjectCard({ p, previewSoonLabel }) {
  const Wrapper = p.github ? 'a' : 'div'
  const wrapperProps = p.github
    ? { href: p.github, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Wrapper
        {...wrapperProps}
        className="project-card group flex flex-col h-full"
        style={p.github ? { cursor: 'pointer' } : {}}
      >
        {/* Thumbnail */}
        <div className="relative h-52 flex-shrink-0 overflow-hidden rounded-t-[14px]"
          style={{ background: `linear-gradient(135deg, ${p.color}18 0%, rgba(13,13,26,0.9) 100%)` }}>
          {p.image ? (
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--text-dim)]">
              <ImageOff size={28} strokeWidth={1.5} />
              <span className="text-xs font-mono">{previewSoonLabel}</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 text-xs font-mono rounded-full"
              style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}30` }}>
              {p.category}
            </span>
          </div>
          {p.github && (
            <div className="absolute bottom-3 right-3">
              <Github size={14} className="text-[var(--text-dim)]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 flex flex-col flex-1 gap-3">
          <div>
            <p className="text-xs font-mono mb-0.5" style={{ color: p.color }}>{p.year}</p>
            <h3 className="font-display font-semibold text-[var(--text-primary)]">{p.title}</h3>
            <p className="text-xs text-[var(--text-dim)] font-mono mt-0.5">{p.subtitle}</p>
          </div>

          <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed flex-1">{p.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
            {p.tech.map(t => (
              <span key={t} className="px-2 py-0.5 text-xs font-mono rounded-md"
                style={{ background: `${p.color}0D`, color: `${p.color}CC`, border: `1px solid ${p.color}20` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </motion.div>
  )
}

const projectCategories = ['All', 'AI', 'Data Science', 'Computer Vision', 'Web Development', 'Mobile Applications']
const skillTabIcons = { programming: Code2, dataScience: Database, ai: Brain, development: Layers }

export default function TechnicalPortfolio() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeSkillTab, setActiveSkillTab] = useState('programming')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const skillTabs = Object.keys(skillTabIcons).map(key => ({ key, label: t.technical.skillTabs[key], icon: skillTabIcons[key] }))

  return (
    <PageTransition>
      <div className="pt-24">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 pb-12">
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(79,172,254,0.4)] to-transparent" />
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(79,172,254,0.08) 0%, transparent 65%)' }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="section-tag"><Code2 size={12} /> {t.technical.heroTag.replace('💻 ', '')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-7xl text-[var(--text-primary)] leading-tight"
            >
              {t.technical.heroTitle1}<br />
              <span className="text-gradient-blue">{t.technical.heroTitle2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto font-body leading-relaxed"
            >
              {t.technical.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="https://github.com/MohamedHouij03" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-body font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(79,172,254,0.3)]"
                style={{ background: 'linear-gradient(135deg, #4FACFE 0%, #7B6FF0 100%)' }}>
                <Github size={16} /> {t.technical.viewGithub} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/contact"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl glass border border-[rgba(79,172,254,0.2)] text-[#4FACFE] font-body font-medium hover:border-[rgba(79,172,254,0.4)] transition-all">
                {t.technical.collaborate}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Education Timeline ────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 inline-flex"><GraduationCap size={12} /> {t.technical.educationTag}</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.technical.educationTitle1} <span className="text-gradient-blue">{t.technical.educationTitle2}</span>
              </h2>
            </motion.div>

            <div className="relative pl-8 space-y-8">
              <div className="timeline-line" />
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-8 top-6 w-3 h-3 rounded-full border-2 border-[#4FACFE] z-10"
                    style={{ background: 'var(--bg-base)', boxShadow: `0 0 12px ${edu.color}` }} />
                  <div className="glass rounded-2xl p-6 border border-[rgba(79,172,254,0.08)] ml-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {edu.logo
                            ? <img src={edu.logo} alt={edu.school} className="w-8 h-8 object-contain rounded-md" />
                            : <span className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: `${edu.color}15` }}>
                                {i === 0 ? <GraduationCap size={16} style={{ color: edu.color }} /> : <Calculator size={16} style={{ color: edu.color }} />}
                              </span>
                          }
                          <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                            style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}>
                            {edu.period}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-[var(--text-primary)] text-lg">{edu.degree}</h3>
                        <p className="text-[#4FACFE] font-body font-medium">{edu.school}</p>
                        <p className="text-xs text-[var(--text-dim)] font-mono">{edu.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] font-body mt-3 leading-relaxed">{edu.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {edu.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--border-faint)] text-[var(--text-dim)] border border-[var(--border-soft)]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Skills Dashboard ──────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 inline-flex">{t.technical.skillsTag}</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.technical.skillsTitle1} <span className="text-gradient-blue">{t.technical.skillsTitle2}</span>
              </h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {skillTabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveSkillTab(key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono transition-all duration-200"
                  style={activeSkillTab === key
                    ? { background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)', color: 'white' }
                    : { background: 'var(--border-faint)', color: 'var(--text-dim)', border: '1px solid var(--border-soft)' }
                  }
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative glass rounded-2xl p-6 md:p-8 border border-[rgba(79,172,254,0.08)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(79,172,254,0.3)] to-transparent" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {techSkills[activeSkillTab].map((skill, i) => (
                    <SkillChip key={skill.name} {...skill} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Projects ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="section-tag mb-4 inline-flex">{t.technical.projectsTag}</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.technical.projectsTitle1} <span className="text-gradient-blue">{t.technical.projectsTitle2}</span>
              </h2>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {projectCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 text-sm font-mono rounded-xl transition-all duration-200"
                  style={activeFilter === cat
                    ? { background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)', color: 'white' }
                    : { background: 'var(--border-faint)', color: 'var(--text-dim)', border: '1px solid var(--border-soft)' }
                  }
                >
                  {t.technical.categories[cat]}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map(p => <ProjectCard key={p.id} p={p} previewSoonLabel={t.technical.previewSoon} />)}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Experience ────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 inline-flex"><Briefcase size={12} /> {t.technical.experienceTag}</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.technical.experienceTitle1} <span className="text-gradient-blue">{t.technical.experienceTitle2}</span>
              </h2>
            </motion.div>

            <div className="relative pl-8 space-y-6">
              <div className="timeline-line" />
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-8 top-6 w-3 h-3 rounded-full border-2 border-[#4FACFE] z-10"
                    style={{ background: 'var(--bg-base)', boxShadow: '0 0 12px #4FACFE' }} />
                  <div className="glass rounded-2xl p-6 border border-[rgba(79,172,254,0.08)] ml-4">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[rgba(79,172,254,0.1)] text-[#4FACFE] border border-[rgba(79,172,254,0.2)]">{exp.type}</span>
                          <span className="text-xs font-mono text-[var(--text-dim)]">{exp.period}</span>
                        </div>
                        <h3 className="font-display font-bold text-[var(--text-primary)]">{exp.title}</h3>
                        <p className="text-[#4FACFE] text-sm font-body font-medium">{exp.company}</p>
                        <p className="text-xs text-[var(--text-dim)] font-mono">{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(s => (
                        <span key={s} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--border-faint)] text-[var(--text-dim)] border border-[var(--border-soft)]">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BorderGlow
                borderRadius={24}
                glowRadius={36}
                glowColor="210 90% 70%"
                backgroundColor="var(--glass-bg)"
                className="text-center glow-only"
              >
                <div className="relative p-12 text-center">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(79,172,254,0.06) 0%, transparent 70%)' }} />
                  <div className="relative z-10 space-y-5">
                    <Rocket size={36} className="text-[#4FACFE] mx-auto" />
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">{t.technical.ctaTitle}<br />{t.technical.ctaTitle2}</h2>
                    <p className="text-[var(--text-muted)] font-body">{t.technical.ctaDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                      <Link to="/contact"
                        className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-white transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)' }}>
                        {t.technical.ctaGetInTouch} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link to="/certifications"
                        className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl glass border border-[rgba(79,172,254,0.2)] text-[#4FACFE] font-body font-medium transition-all hover:border-[rgba(79,172,254,0.4)]">
                        {t.technical.ctaViewCerts}
                      </Link>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
