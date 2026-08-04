import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Menu, X, ChevronDown, Globe, LogIn, MailOpen, Map, Phone, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import suzaLogo from '@/assets/images/suza-logo.png';

/* ─── Brand Colors (NACTVET palette) ─────────────────────── */
const C = {
  topBar: '#111827',          // near-black utility bar
  teal: '#0099cc',            // main nav teal
  tealHover: '#007aaa',       // darker teal on hover
  tealLight: '#e5f5fb',
  gold: '#e8b800',
  white: '#ffffff',
};

/* ─── Nav links ──────────────────────────────────────────── */
const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'About IMS',
    path: '/about',
    children: [
      { label: 'Vision & Mission', path: '/about#mission' },
      { label: 'Governance', path: '/about#governance' },
      { label: 'Our History', path: '/about#history' },
    ],
  },
  {
    label: 'Innovation',
    path: '/ecosystem',
    children: [
      { label: 'Ecosystem Overview', path: '/ecosystem' },
      { label: 'Innovation Hubs', path: '/hubs' },
      { label: 'Categories', path: '/categories' },
    ],
  },
  {
    label: 'Schools',
    path: '/schools',
  },
  { label: 'Showcase', path: '/showcase' },
  {
    label: 'Media Center',
    path: '/events',
    children: [
      { label: 'Events', path: '/events' },
      { label: 'Success Stories', path: '/stories' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Helpdesk', path: '/faq' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* ═══════════════════════════════════════════════════
          TIER 1 — Top Utility Bar (dark, thin)
      ═══════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.topBar, borderBottom: `2px solid ${C.gold}` }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">

          {/* Left: utility links */}
          <div className="flex items-center space-x-4">
            {[
              { label: 'Staff Mail', icon: MailOpen },
              { label: 'e-Office', icon: Globe },
              { label: 'Site Map', icon: Map },
              { label: 'Helpdesk', icon: Phone },
            ].map(({ label, icon: Icon }) => (
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

      {/* ═══════════════════════════════════════════════════
          TIER 2 — Brand / Identity Bar (white)
      ═══════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100">
        {/* Decorative top stripe (Tanzania flag colors: blue, black, yellow, green) */}
        <div className="flex h-1 w-full">
          <div className="flex-1" style={{ backgroundColor: '#3cb371' }} />
          <div className="flex-1" style={{ backgroundColor: '#000' }} />
          <div className="flex-1" style={{ backgroundColor: '#e8b800' }} />
          <div className="flex-1" style={{ backgroundColor: '#00aacc' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Left — SUZA Logo */}
          <div className="shrink-0 flex items-center">
            <img 
              src={suzaLogo} 
              alt="SUZA Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Center — Institution Name */}
          <div className="flex-1 text-center px-4">
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              The United Republic of Tanzania
            </p>
            <h1
              className="font-extrabold uppercase leading-tight tracking-tight text-sm md:text-base lg:text-lg"
              style={{ color: C.teal }}
            >
              The State University of Zanzibar (SUZA)
            </h1>
            <p className="text-xs italic mt-0.5 hidden sm:block" style={{ color: '#555' }}>
              Innovation Management System (IMS) — Striving for Excellence in Innovation and Research
            </p>
          </div>

          {/* Right — IMS Logo placeholder */}
          <div className="shrink-0 flex items-center">
            <div
              className="w-16 h-16 rounded-full border-4 border-yellow-200 flex flex-col items-center justify-center shadow-sm"
              style={{ background: `linear-gradient(135deg, ${C.teal}, #0d2137)` }}
            >
              <Rocket size={20} className="text-white mb-0.5" />
              <span className="text-[8px] font-black text-yellow-300 tracking-wide">IMS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          TIER 3 — Main Navigation Bar (solid teal)
      ═══════════════════════════════════════════════════ */}
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
                    {link.children && (
                      <ChevronDown size={12} className="ml-0.5 opacity-80" />
                    )}
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
                            style={{ ['--hover-border' as string]: C.teal }}
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

            {/* Right — Language / Sign In */}
            <div className="flex items-center space-x-2">
              <Link
                to={ROUTES.PUBLIC.LOGIN}
                className="flex items-center space-x-1.5 px-4 py-1.5 text-[12px] font-bold rounded border border-white/40 text-white hover:bg-white hover:text-gray-900 transition-all"
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </Link>
              <a
                href="#"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-white/30 text-white text-[12px] hover:bg-white/20 transition-all"
              >
                <Globe size={13} />
                <span>Kiswahili</span>
              </a>
            </div>
          </div>

          {/* Mobile nav toggle */}
          <div className="md:hidden flex items-center justify-between h-10">
            <span className="text-white font-bold text-sm">SUZA IMS</span>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
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
                  Sign In to Portal
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
