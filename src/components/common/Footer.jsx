import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { asset } from '../../utils/asset'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-houij-b11a0a161/' },
  { icon: Mail, label: 'Email', href: 'mailto:mohamed.houij@polytechnicien.tn' },
]

export default function Footer() {
  const { t } = useLanguage()
  const links = [
    { label: t.footer.links.creative, to: '/creative' },
    { label: t.footer.links.technical, to: '/technical' },
    { label: t.footer.links.certifications, to: '/certifications' },
    { label: t.footer.links.achievements, to: '/achievements' },
    { label: t.footer.links.contact, to: '/contact' },
  ]
  return (
    <footer className="relative border-t border-[var(--border-line)] mt-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse, rgba(79,172,254,0.04) 0%, transparent 70%)' }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent">
                <img src={asset('logo.png')} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display font-bold text-[var(--text-primary)] tracking-wider">Mohamed Houij</p>
                <p className="text-xs text-[var(--text-dim)] font-mono">{t.footer.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-line)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:border-[rgba(79,172,254,0.3)] hover:bg-[rgba(79,172,254,0.05)] transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-[#4FACFE] uppercase tracking-[0.2em] mb-4">{t.footer.navigation}</p>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono text-[#4FACFE] uppercase tracking-[0.2em] mb-4">{t.footer.getInTouch}</p>
            <div className="space-y-3">
              <p className="text-sm text-[var(--text-dim)]">
                {t.footer.availability}
              </p>
              <a href="mailto:mohamed.houij@polytechnicien.tn"
                className="inline-flex items-center gap-2 text-sm text-[#4FACFE] hover:text-[#00F5FF] transition-colors">
                mohamed.houij@polytechnicien.tn <ExternalLink size={12} />
              </a>
            </div>
            <div className="mt-6">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #4FACFE, #7B6FF0)' }}>
                {t.footer.hireMe}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider mt-12 mb-6" />
        <div className="flex items-center justify-center">
          <p className="text-xs text-[var(--text-dim)] font-mono">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
