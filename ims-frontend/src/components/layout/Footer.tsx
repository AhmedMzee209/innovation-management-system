import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { MapPin, Mail, Phone, Globe, ExternalLink } from 'lucide-react';

const usefulLinks = [
  'State House', 'Vice President\'s Office', "Prime Minister's Office",
  'Ministry of Education', 'Tanzania Government Portal',
];

const quickLinks = [
  'Innovator Portal', 'Staff Email', 'e-Library', 'Research Repository',
  'Innovation Portal', 'Career Center',
];

export const Footer = () => {
  return (
    <footer>
      {/* ── Decorative Top Border ── */}
      <div className="flex h-1.5 w-full">
        <div className="flex-1" style={{ backgroundColor: '#e8b800' }} />
        <div className="flex-1" style={{ backgroundColor: '#3cb371' }} />
      </div>

      {/* ── Main Footer Body ── */}
      <div style={{ backgroundColor: '#0098c8' }} className="pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Column 1: Address */}
            <div>
              <h3 className="text-white font-bold text-base mb-1">Address</h3>
              <div className="w-10 h-1 mb-5" style={{ backgroundColor: '#e8b800' }} />
              <div className="space-y-3 text-sm text-blue-50">
                <p className="font-semibold leading-snug">
                  State University of Zanzibar (SUZA)<br />
                  Innovation Management System
                </p>
                <div className="flex items-start space-x-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-yellow-300" />
                  <span>P.O. Box 146, Zanzibar, Tanzania</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="shrink-0 text-yellow-300" />
                  <a href="mailto:ims@suza.ac.tz" className="hover:text-white transition-colors">
                    ims@suza.ac.tz
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="shrink-0 text-yellow-300" />
                  <span>+255 24 223 4000</span>
                </div>
              </div>
            </div>

            {/* Column 2: Useful Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-1">Useful Links</h3>
              <div className="w-10 h-1 mb-5" style={{ backgroundColor: '#e8b800' }} />
              <ul className="space-y-2.5">
                {usefulLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-blue-100 hover:text-white transition-colors flex items-center space-x-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#e8b800' }} />
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-1">Quick Links</h3>
              <div className="w-10 h-1 mb-5" style={{ backgroundColor: '#e8b800' }} />
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-blue-100 hover:text-white transition-colors flex items-center space-x-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#e8b800' }} />
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Visitors & Social */}
            <div>
              <h3 className="text-white font-bold text-base mb-1">Visitors</h3>
              <div className="w-10 h-1 mb-5" style={{ backgroundColor: '#e8b800' }} />

              {/* Visitor Counter Card */}
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-6 flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: '#e8b800' }}
                >
                  <Globe size={22} />
                </div>
                <div>
                  <p className="text-2xl font-black text-white tracking-tight">12,540</p>
                  <p className="text-xs text-blue-100">Total Site Visitors</p>
                </div>
              </div>

              <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { label: 'f', title: 'Facebook' },
                  { label: 't', title: 'Twitter' },
                  { label: 'in', title: 'Instagram' },
                  { label: '▶', title: 'YouTube' },
                ].map(({ label, title }) => (
                  <a
                    key={title}
                    href="#"
                    title={title}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white hover:scale-110 transition-transform"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e8b800')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.2)')}
                  >
                    {label}
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to={ROUTES.PUBLIC.LOGIN}
                  className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all"
                  style={{ backgroundColor: '#e8b800', color: '#0d2137' }}
                >
                  <ExternalLink size={14} />
                  <span>Access IMS Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div style={{ backgroundColor: '#007aa3' }} className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-xs text-blue-100 text-center sm:text-left">
            Copyright © {new Date().getFullYear()} The State University of Zanzibar (SUZA) – Innovation Management System. All Rights Reserved.
          </p>
          <div className="flex space-x-4 text-xs text-blue-200">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
