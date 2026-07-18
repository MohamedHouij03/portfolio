import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Film, Zap, Smartphone, Sparkles, Megaphone, Mic, Building2, BookOpen, PhoneCall, FolderUp, Scissors, RefreshCw, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/common/PageTransition'
import BorderGlow from '../components/common/BorderGlow'
import ScrollStack, { ScrollStackItem } from '../components/common/ScrollStack'
import { services, portfolioItems, testimonials, workflow, stats } from '../data/creative'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'
import { useLanguage, tr } from '../context/LanguageContext'

/* ── Animated Stat ───────────────────────────────────────────────────────── */
function StatCard({ value, suffix, label, icon, color, badge }) {
  const [count, ref] = useAnimatedCounter(value ?? 0)
  if (badge) {
    return (
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        className="glass rounded-2xl p-6 border border-[var(--border-faint)] text-center flex flex-col items-center justify-center gap-2 h-36"
      >
        <img src={badge} alt={label} className="h-16 w-auto object-contain mx-auto" />
        <p className="text-sm text-[var(--text-dim)] font-body">{label}</p>
      </motion.div>
    )
  }
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl p-6 border border-[var(--border-faint)] text-center flex flex-col items-center justify-center gap-2 h-36"
    >
      <div className="font-display text-4xl font-bold" style={{ color }}>
        {count}{suffix}
      </div>
      <p className="text-sm text-[var(--text-dim)] font-body">{label}</p>
    </motion.div>
  )
}

/* ── Portfolio Card ──────────────────────────────────────────────────────── */
function PortfolioCard({ item, beforeLabel, afterLabel, lang }) {
  const Wrapper = item.link ? 'a' : 'div'
  const wrapperProps = item.link
    ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
    >
      <Wrapper
        {...wrapperProps}
        className="project-card group block"
        style={item.link ? { cursor: 'pointer' } : {}}
      >
        {/* Thumbnail */}
        <div className="relative h-52 overflow-hidden rounded-t-[14px]"
          style={{ background: `linear-gradient(135deg, ${item.color}18 0%, rgba(13,13,26,0.9) 100%)` }}>
          {item.thumbnail && (
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          )}
          {item.link && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/90">
                <Play size={18} className="text-black ml-0.5" fill="black" />
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 text-xs font-mono rounded-full"
              style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}>
              {item.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 space-y-3">
          <div>
            <h3 className="font-display font-semibold text-[var(--text-primary)]">{tr(item, 'title', lang)}</h3>
            <p className="text-xs text-[var(--text-dim)] font-mono mt-0.5">{tr(item, 'client', lang)}</p>
          </div>
          <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed">{tr(item, 'description', lang)}</p>

          {/* Metrics */}
          {item.before && item.after && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="glass rounded-lg p-2.5 border border-[var(--border-faint)]">
                <p className="text-xs text-[var(--text-dim)] font-mono mb-0.5">{beforeLabel}</p>
                <p className="text-sm font-medium text-[var(--text-secondary)]">{item.before}</p>
              </div>
              <div className="rounded-lg p-2.5 border" style={{ background: `${item.color}10`, borderColor: `${item.color}25` }}>
                <p className="text-xs font-mono mb-0.5" style={{ color: item.color }}>{afterLabel}</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{item.after}</p>
              </div>
            </div>
          )}

          {item.results && (
            <div className="flex items-center gap-2 text-xs font-mono pt-1" style={{ color: item.color }}>
              {tr(item, 'results', lang)}
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  )
}

const serviceIcons = {
  'Long-Form YouTube Editing': Film,
  'Short-Form Content': Zap,
  'TikTok & Instagram Reels': Smartphone,
  'Motion Graphics': Sparkles,
  'Social Media Management': Megaphone,
  'Podcast Editing': Mic,
  'Business Videos': Building2,
  'Educational Videos': BookOpen,
}

const workflowIcons = { '01': PhoneCall, '02': FolderUp, '03': Scissors, '04': RefreshCw, '05': Rocket }

const categories = ['All', 'Documentary', 'Vlog', 'Educational', 'Health', '3D Animation', 'Business']

export default function CreativePortfolio() {
  const { t, lang } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [testimonialPaused, setTestimonialPaused] = useState(false)

  const filtered = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === activeFilter)

  useEffect(() => {
    if (testimonialPaused) return
    const id = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [testimonialPaused])

  return (
    <PageTransition>
      <div className="pt-24">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 pb-12">
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(120,75,160,0.4)] to-transparent" />
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(120,75,160,0.08) 0%, transparent 65%)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(120,75,160,0.08)] border border-[rgba(120,75,160,0.2)] text-[#784BA0]">
                {t.creative.heroTag}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-7xl text-[var(--text-primary)] leading-tight"
            >
              {t.creative.heroTitle1}<br />
              <span className="text-gradient-gold">{t.creative.heroTitle2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto font-body leading-relaxed"
            >
              {t.creative.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="https://upwork.com" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-body font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(20,168,0,0.3)]"
                style={{ background: '#14A800' }}>
                {t.creative.hireUpwork}
              </a>
              <Link to="/contact"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl glass border border-[rgba(120,75,160,0.25)] text-[#784BA0] font-body font-medium hover:border-[rgba(120,75,160,0.45)] transition-all">
                {t.creative.getQuote}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <StatCard {...s} label={tr(s, 'label', lang)} />
              </motion.div>
            ))}
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Services ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(120,75,160,0.08)] border border-[rgba(120,75,160,0.2)] text-[#784BA0] mb-4">
                {t.creative.servicesTag}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.creative.servicesTitle1} <span className="text-gradient-gold">{t.creative.servicesTitle2}</span>
              </h2>
            </motion.div>

            <ScrollStack
              useWindowScroll={true}
              itemDistance={60}
              itemScale={0.02}
              itemStackDistance={24}
              stackPosition="18%"
              scaleEndPosition="10%"
              baseScale={0.9}
            >
              {services.map((s, i) => {
                const Icon = serviceIcons[s.title] || Sparkles
                return (
                  <ScrollStackItem key={s.title}>
                    <div className="flex items-center gap-5 h-full">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                        <Icon size={24} style={{ color: s.color }} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-[var(--text-primary)] text-lg mb-1.5">{tr(s, 'title', lang)}</h3>
                        <p className="text-sm text-[var(--text-dim)] leading-relaxed font-body">{tr(s, 'desc', lang)}</p>
                      </div>
                    </div>
                  </ScrollStackItem>
                )
              })}
            </ScrollStack>
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Portfolio ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(120,75,160,0.08)] border border-[rgba(120,75,160,0.2)] text-[#784BA0] mb-4">
                {t.creative.portfolioTag}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.creative.portfolioTitle1} <span className="text-gradient-gold">{t.creative.portfolioTitle2}</span>
              </h2>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 text-sm font-mono rounded-xl transition-all duration-200"
                  style={activeFilter === cat
                    ? { background: 'linear-gradient(135deg, #784BA0, #FF4E8A)', color: 'white' }
                    : { background: 'var(--border-faint)', color: 'var(--text-dim)', border: '1px solid var(--border-soft)' }
                  }
                >
                  {t.creative.categories[cat] || cat}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map(item => <PortfolioCard key={item.id} item={item} beforeLabel={t.creative.before} afterLabel={t.creative.after} lang={lang} />)}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Testimonials ──────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(120,75,160,0.08)] border border-[rgba(120,75,160,0.2)] text-[#784BA0] mb-4">
                {t.creative.testimonialsTag}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.creative.testimonialsTitle1} <span className="text-gradient-gold">{t.creative.testimonialsTitle2}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => setTestimonialPaused(false)}
              className="testimonial-card relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 24, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-[340px] sm:min-h-[260px] md:min-h-[220px] flex flex-col justify-between gap-4"
                >

                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-body italic">
                    "{tr(testimonials[activeTestimonial], 'feedback', lang)}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-semibold"
                      style={{
                        background: `${testimonials[activeTestimonial].color}15`,
                        border: `1px solid ${testimonials[activeTestimonial].color}30`,
                        color: testimonials[activeTestimonial].color,
                      }}>
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[var(--text-primary)]">{testimonials[activeTestimonial].name}</p>
                      <p className="text-xs text-[var(--text-dim)] font-mono">
                        {tr(testimonials[activeTestimonial], 'role', lang)}
                        {testimonials[activeTestimonial].company && ` — ${tr(testimonials[activeTestimonial], 'company', lang)}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav dots */}
              <div className="flex gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      width: i === activeTestimonial ? '32px' : '8px',
                      background: 'var(--border-medium)'
                    }}
                  >
                    {i === activeTestimonial && (
                      <motion.span
                        key={`${activeTestimonial}-${testimonialPaused}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #784BA0, #FF4E8A)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: testimonialPaused ? '0%' : '100%' }}
                        transition={{ duration: testimonialPaused ? 0.2 : 5, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="divider mx-6 max-w-5xl lg:mx-auto" />

        {/* ── Workflow ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(120,75,160,0.08)] border border-[rgba(120,75,160,0.2)] text-[#784BA0] mb-4">
                {t.creative.workflowTag}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-3">
                {t.creative.workflowTitle1} <span className="text-gradient-gold">{t.creative.workflowTitle2}</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(120,75,160,0.3), transparent)' }} />

              <div className="grid md:grid-cols-5 gap-5">
                {workflow.map((step, i) => {
                  const Icon = workflowIcons[step.step] || Sparkles
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center text-center space-y-3"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                        style={{ background: `${step.color}18`, border: `1px solid ${step.color}35` }}
                        whileHover={{ scale: 1.1, rotate: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                      >
                        <Icon size={24} style={{ color: step.color }} />
                      </motion.div>
                      <p className="text-xs font-mono" style={{ color: step.color }}>{step.step}</p>
                      <h3 className="font-display font-semibold text-[var(--text-primary)] text-sm">{tr(step, 'title', lang)}</h3>
                      <p className="text-xs text-[var(--text-dim)] font-body leading-relaxed">{tr(step, 'desc', lang)}</p>
                    </motion.div>
                  )
                })}
              </div>
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
                glowColor="320 90% 70%"
                backgroundColor="var(--glass-bg)"
                className="text-center glow-only"
              >
                <div className="relative p-12 text-center">
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(120,75,160,0.08) 0%, transparent 70%)' }} />
                  <div className="relative z-10 space-y-5">

                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">{t.creative.ctaTitle1}<br />{t.creative.ctaTitle2}</h2>
                    <p className="text-[var(--text-muted)] font-body">{t.creative.ctaDesc}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                      <Link to="/contact"
                        className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-white transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)' }}>
                        {t.creative.ctaButton}
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
