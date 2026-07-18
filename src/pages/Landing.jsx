import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Film, Sparkles, Cpu, BarChart3, ChevronDown, Brain, Eye, Clapperboard } from 'lucide-react'
import { SiPython, SiReact, SiTiktok, SiYoutube, SiFlutter, SiNodedotjs } from 'react-icons/si'
import PageTransition from '../components/common/PageTransition'
import ProfileCard from '../components/common/ProfileCard'
import { useLanguage } from '../context/LanguageContext'
import { asset } from '../utils/asset'

const marqueeIcons = [SiPython, SiReact, SiTiktok, Brain, SiYoutube, Cpu, Clapperboard, BarChart3, SiFlutter, Sparkles, SiNodedotjs, Eye]
const marqueeColors = ['#3776AB', '#61DAFB', 'var(--text-primary)', '#7B6FF0', '#FF0000', '#FF4E8A', '#FFB830', '#00E5A0', '#02569B', '#FF8C42', '#339933', '#4FACFE']

function RotatingRole({ roles }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    setIdx(0)
    const t = setInterval(() => setIdx(i => (i + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [roles])
  return (
    <div className="h-8 overflow-hidden">
      <motion.div
        key={idx}
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -32, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-gradient-blue font-display font-semibold text-xl md:text-2xl"
      >
        {roles[idx]}
      </motion.div>
    </div>
  )
}

function FloatingOrb({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function Landing() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  return (
    <PageTransition>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <FloatingOrb style={{ top: '15%', left: '8%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(79,172,254,0.12) 0%, transparent 70%)' }} />
        <FloatingOrb style={{ bottom: '20%', right: '8%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(123,111,240,0.1) 0%, transparent 70%)' }} />
        <FloatingOrb style={{ top: '50%', left: '50%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(79,172,254,0.05) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <span className="section-tag">
              <motion.span className="inline-flex" animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles size={13} />
              </motion.span>
              {t.landing.badge}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h1 className="font-display font-bold leading-tight">
              <span className="block text-5xl md:text-7xl lg:text-8xl text-[var(--text-primary)] tracking-tight">Mohamed</span>
              <span className="block text-5xl md:text-7xl lg:text-8xl text-gradient-blue tracking-tight">Houij</span>
            </h1>
          </motion.div>

          {/* Rotating Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-[var(--text-dim)] font-body">— &nbsp;</span>
            <RotatingRole roles={t.landing.roles} />
            <span className="text-[var(--text-dim)] font-body">&nbsp; —</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto text-[var(--text-muted)] text-lg leading-relaxed font-body"
          >
            {t.landing.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/technical"
              className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-body font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,172,254,0.3)]"
              style={{ background: 'linear-gradient(135deg, #4FACFE 0%, #7B6FF0 100%)' }}>
              <Code2 size={18} />
              {t.landing.ctaTechnical}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/creative"
              className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-body font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(120,75,160,0.3)]"
              style={{ background: 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)' }}>
              <Film size={18} />
              {t.landing.ctaCreative}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-4"
          >
            <motion.button
              type="button"
              onClick={() => document.getElementById('choose-experience')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll to next section"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="text-[var(--text-faint)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <ChevronDown size={22} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Choose Your Experience ─────────────────────────────────────── */}
      <section id="choose-experience" className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="section-tag mb-4 inline-flex">{t.landing.chooseProfile}</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--text-primary)] mt-4">
              {t.landing.twoWorldsLine1}<br />
              <span className="text-gradient-blue">{t.landing.twoWorldsLine2}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Creative Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.01 }}
            >
              <Link to="/creative"
                className="group relative block rounded-3xl overflow-hidden border border-[rgba(120,75,160,0.15)] glass-gold p-8 h-full"
                style={{ background: 'linear-gradient(135deg, rgba(255,60,172,0.05) 0%, rgba(43,134,197,0.05) 100%)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(255,60,172,0.08) 0%, rgba(43,134,197,0.08) 100%)' }} />

                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(255,60,172,0.2), rgba(43,134,197,0.2))', border: '1px solid rgba(120,75,160,0.3)' }}>
                    <Film size={26} className="text-[#784BA0]" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#784BA0] tracking-[0.2em] uppercase mb-2">{t.landing.creativeCard.tag}</p>
                    <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-tight">{t.landing.creativeCard.title1}<br />{t.landing.creativeCard.title2}</h3>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed font-body">
                    {t.landing.creativeCard.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.landing.creativeCard.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full font-mono"
                        style={{ background: 'rgba(120,75,160,0.1)', color: '#784BA0', border: '1px solid rgba(120,75,160,0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#784BA0] font-body font-medium text-sm group-hover:gap-3 transition-all">
                    {t.landing.creativeCard.cta} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Technical Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.01 }}
            >
              <Link to="/technical"
                className="group relative block rounded-3xl overflow-hidden border border-[rgba(79,172,254,0.15)] glass p-8 h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(79,172,254,0.08) 0%, rgba(123,111,240,0.08) 100%)' }} />

                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(79,172,254,0.2), rgba(123,111,240,0.2))', border: '1px solid rgba(79,172,254,0.3)' }}>
                    <Code2 size={26} className="text-[#4FACFE]" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#4FACFE] tracking-[0.2em] uppercase mb-2">{t.landing.technicalCard.tag}</p>
                    <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-tight">{t.landing.technicalCard.title1}<br />{t.landing.technicalCard.title2}</h3>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed font-body">
                    {t.landing.technicalCard.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.landing.technicalCard.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full font-mono"
                        style={{ background: 'rgba(79,172,254,0.1)', color: '#4FACFE', border: '1px solid rgba(79,172,254,0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#4FACFE] font-body font-medium text-sm group-hover:gap-3 transition-all">
                    {t.landing.technicalCard.cta} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About Me ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(123,111,240,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="section-tag">{t.landing.aboutTag}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4">
                {t.landing.aboutTitle1}<br />
                <span className="text-gradient-violet">{t.landing.aboutTitle2}</span>
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed font-body">
                {t.landing.aboutP1}
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed font-body">
                {t.landing.aboutP2}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/technical" className="section-tag hover:bg-[rgba(79,172,254,0.15)] transition-colors">{t.landing.technicalWorkLink}</Link>
                <Link to="/creative" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-[rgba(255,184,48,0.08)] border border-[rgba(255,184,48,0.2)] text-[#FFB830] hover:bg-[rgba(255,184,48,0.15)] transition-colors">{t.landing.creativeWorkLink}</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex justify-center"
            >
              <ProfileCard
                name="Mohamed Houij"
                title="Software Engineer & Creative Director"
                handle="mohamedhouij"
                status="Available for Work"
                contactText="Contact Me"
                avatarUrl={asset('profile.png')}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => navigate('/contact')}
                behindGlowEnabled={false}
                behindGlowColor="rgba(123,111,240,0.5)"
                innerGradient="linear-gradient(145deg,#4FACFE22 0%,#7B6FF044 100%)"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Marquee Banner ───────────────────────────────────────────────── */}
      <div className="border-y border-[var(--border-line)] py-4 overflow-hidden">
        <motion.div
          className="flex gap-0 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform' }}
        >
          {[0, 1].flatMap(copy =>
            [0, 1, 2].flatMap(rep =>
              t.landing.marquee.map((label, j) => {
                const Icon = marqueeIcons[j]
                const color = marqueeColors[j]
                return (
                  <span key={`${copy}-${rep}-${j}`} className="flex items-center gap-2.5 px-5 text-sm font-mono text-[var(--text-faint)] whitespace-nowrap">
                    <Icon size={16} style={{ color, flexShrink: 0 }} />
                    {label}
                  </span>
                )
              })
            )
          )}
        </motion.div>
      </div>
    </PageTransition>
  )
}
