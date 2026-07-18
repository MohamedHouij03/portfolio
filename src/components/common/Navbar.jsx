import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { asset } from '../../utils/asset'

function LanguageSwitcher({ lang, setLang, open, setOpen }) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        className="flex items-center gap-1 h-9 px-2.5 rounded-lg text-sm font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-soft)] transition-all"
      >
        {lang.toUpperCase()}
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 glass border border-[rgba(79,172,254,0.15)] rounded-xl overflow-hidden min-w-[100px] z-50"
          >
            {['en', 'fr'].map(code => (
              <button
                key={code}
                onClick={() => { setLang(code); setOpen(false) }}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-mono transition-colors"
                style={code === lang
                  ? { color: '#4FACFE', background: 'rgba(79,172,254,0.08)' }
                  : { color: 'var(--text-muted)' }
                }
              >
                {code === 'en' ? 'English' : 'Français'}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.technical, path: '/technical' },
    { label: t.nav.creative, path: '/creative' },
    { label: t.nav.certifications, path: '/certifications' },
    { label: t.nav.achievements, path: '/achievements' },
    { label: t.nav.contact, path: '/contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
        scrolled
          ? 'glass border border-[rgba(79,172,254,0.1)] px-5 py-3 shadow-[var(--shadow-card)]'
          : 'px-5 py-2'
      }`}>
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden bg-transparent">
              <img src={asset('logo.png')} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-[var(--text-primary)] text-sm tracking-wider">HOUIJ</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-2.5 py-2 text-sm font-body rounded-lg transition-all duration-200 whitespace-nowrap ${
                    location.pathname === link.path
                      ? 'text-[#4FACFE]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[rgba(79,172,254,0.08)] rounded-lg border border-[rgba(79,172,254,0.15)]"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher lang={lang} setLang={setLang} open={langOpen} setOpen={setLangOpen} />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-soft)] transition-all"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/contact"
              className="px-4 py-2 text-sm font-body font-medium rounded-xl transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)', color: 'white' }}>
              {t.nav.hireMe}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher lang={lang} setLang={setLang} open={langOpen} setOpen={setLangOpen} />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-soft)] transition-all"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-soft)] transition-all"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 rounded-2xl glass border border-[rgba(79,172,254,0.1)] overflow-hidden"
          >
            <ul className="p-3 flex flex-col gap-1">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body transition-all ${
                      location.pathname === link.path
                        ? 'text-[#4FACFE] bg-[rgba(79,172,254,0.08)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-soft)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link to="/contact"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)' }}>
                  {t.nav.hireMe}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
