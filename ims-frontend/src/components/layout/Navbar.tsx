import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Menu, X, ChevronDown, Globe, LogIn, MailOpen, Map, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import suzaLogo from '@/assets/images/suza-logo.png';
import smzLogo from '@/assets/images/smz-logo.png';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Brand Colors ─────────────────────────────────────────── */
const C = {
  topBar: '#111827',
  teal: '#0099cc',
  tealHover: '#007aaa',
  tealLight: '#e5f5fb',
  gold: '#e8b800',
  white: '#ffffff',
};

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { t, toggle } = useLanguage();

  // Build nav links dynamically from translations
  const navLinks = [
    { label: t.home, path: '/' },
    {
      label: t.aboutIms,
      path: '/about',
      children: [
        { label: t.visionMission, path: '/about#mission' },
        { label: t.governance, path: '/about#governance' },
        { label: t.ourHistory, path: '/about#history' },
      ],
    },
    {
      label: t.innovation,
      path: '/ecosystem',
      children: [
        { label: t.ecosystemOverview, path: '/ecosystem' },
        { label: t.innovationHubs, path: '/hubs' },
        { label: t.categories, path: '/categories' },
      ],
    },
    { label: t.schools, path: '/schools' },
    { label: t.showcase, path: '/showcase' },
    {
      label: t.mediaCenter,
      path: '/events',
      children: [
        { label: t.events, path: '/events' },
        { label: t.successStories, path: '/stories' },
      ],
    },
    { label: t.contactUs, path: '/contact' },
    { label: t.helpdeskNav, path: '/faq' },
  ];

  const utilLinks = [
    { label: t.staffMail, icon: MailOpen },
    { label: t.eOffice, icon: Globe },
    { label: t.siteMap, icon: Map },
    { label: t.helpdesk, icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* ═══ TIER 1 — Top Utility Bar ═══════════════════════ */}
      <div style={{ backgroundColor: C.topBar, borderBottom: `2px solid ${C.gold}` }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">

          {/* Left: utility links */}
          <div className="flex items-center space-x-4">
            {utilLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="flex items-center space-x-1 text-[11px] text-gray-300 hover:text-white transition-colors"
              >
                <Icon size={10} strokeWidth={1.8} />
                <span>{label}</span>
              </a>
            ))}
          </div>

          {/* Right: social icons */}
          <div className="flex items-center space-x-2">
            {[
              { label: 'Facebook', symbol: 'f' },
              { label: 'Twitter', symbol: '𝕏' },
              { label: 'Instagram', symbol: '◎' },
              { label: 'YouTube', symbol: '▶' },
            ].map(({ label, symbol }) => (
              <a
                key={label}
                href="#"
                title={label}
                className="w-6 h-6 flex items-center justify-center rounded text-gray-300 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold"
              >
                {symbol}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TIER 2 — Brand / Identity Bar ══════════════════ */}
      <div className="bg-white border-b border-gray-100">
        {/* Tanzania flag stripe */}
        <div className="flex h-1 w-full">
          <div className="flex-1" style={{ backgroundColor: '#3cb371' }} />
          <div className="flex-1" style={{ backgroundColor: '#000' }} />
          <div className="flex-1" style={{ backgroundColor: '#e8b800' }} />
          <div className="flex-1" style={{ backgroundColor: '#00aacc' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Left — SUZA Logo */}
          <div className="shrink-0 flex items-center">
            <img src={suzaLogo} alt="SUZA Logo" className="h-16 w-auto object-contain" />
          </div>

          {/* Center — Institution Name */}
          <div className="flex-1 text-center px-4">
            <p className="text-xs text-gray-500 font-medium tracking-wide">{t.country}</p>
            <h1
              className="font-extrabold uppercase leading-tight tracking-tight text-sm md:text-base lg:text-lg"
              style={{ color: C.teal }}
            >
              {t.uniName}
            </h1>
            <p className="text-xs italic mt-0.5 hidden sm:block" style={{ color: '#555' }}>
              {t.tagline}
            </p>
          </div>

          {/* Right — SMZ Logo */}
          <div className="shrink-0 flex items-center">
            <img src={smzLogo} alt="SMZ Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* ═══ TIER 3 — Main Navigation Bar ═══════════════════ */}
      <nav style={{ backgroundColor: C.teal, borderBottom: `4px solid ${C.gold}` }}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-between h-10">
            <div className="flex items-center h-full">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'h-full flex items-center px-3 text-[13px] font-medium transition-all whitespace-nowrap',
                      isActive(link.path)
                        ? 'bg-white text-gray-900 font-semibold'
                        : 'text-white hover:bg-white/20'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={12} className="ml-0.5 opacity-80" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 min-w-[200px] bg-white shadow-xl border-t-2 z-50"
                        style={{ borderTopColor: C.teal }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            className="flex items-center px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 border-l-[3px] border-transparent transition-all"
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = C.teal;
                              (e.currentTarget as HTMLAnchorElement).style.color = C.teal;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'transparent';
                              (e.currentTarget as HTMLAnchorElement).style.color = '#374151';
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right — Language toggle + Sign In */}
            <div className="flex items-center space-x-2">
              <Link
                to={ROUTES.PUBLIC.LOGIN}
                className="flex items-center space-x-1.5 px-4 py-1.5 text-[12px] font-bold rounded border border-white/40 text-white hover:bg-white hover:text-gray-900 transition-all"
              >
                <LogIn size={13} />
                <span>{t.signIn}</span>
              </Link>

              {/* ── Language Toggle Button ── */}
              <button
                onClick={toggle}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-white/30 text-white text-[12px] font-semibold hover:bg-white hover:text-gray-900 transition-all"
                aria-label="Toggle language"
              >
                <Globe size={13} />
                <span>{t.langToggle}</span>
              </button>
            </div>
          </div>

          {/* Mobile nav toggle */}
          <div className="md:hidden flex items-center justify-between h-10">
            <span className="text-white font-bold text-sm">{t.mobileTitle}</span>
            <div className="flex items-center gap-2">
              {/* Mobile language toggle */}
              <button
                onClick={toggle}
                className="flex items-center gap-1 text-white text-[11px] font-semibold border border-white/30 rounded px-2 py-1 hover:bg-white/20 transition-all"
              >
                <Globe size={11} />
                <span>{t.langToggle}</span>
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white p-1"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t-2 overflow-hidden"
              style={{ borderTopColor: C.gold }}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-3 py-2.5 text-sm rounded font-medium transition-colors',
                      isActive(link.path)
                        ? 'text-white'
                        : 'text-gray-800 hover:bg-gray-50'
                    )}
                    style={isActive(link.path) ? { backgroundColor: C.teal } : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to={ROUTES.PUBLIC.LOGIN}
                  onClick={() => setMobileOpen(false)}
                  className="block mt-2 px-3 py-2.5 text-sm text-center font-bold rounded text-white"
                  style={{ backgroundColor: C.teal }}
                >
                  {t.signInPortal}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
