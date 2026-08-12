import { createContext, useContext, useState, ReactNode } from 'react';

// ─── Translation Dictionary ───────────────────────────────────
export const translations = {
  en: {
    lang: 'en',
    langToggle: 'Kiswahili',

    // Top utility bar
    staffMail: 'Staff Mail',
    eOffice: 'e-Office',
    siteMap: 'Site Map',
    helpdesk: 'Helpdesk',

    // Navbar links
    home: 'Home',
    aboutIms: 'About IMS',
    visionMission: 'Vision & Mission',
    governance: 'Governance',
    ourHistory: 'Our History',
    innovation: 'Innovation',
    ecosystemOverview: 'Ecosystem Overview',
    innovationHubs: 'Innovation Hubs',
    categories: 'Categories',
    schools: 'Schools',
    showcase: 'Showcase',
    mediaCenter: 'Media Center',
    events: 'Events',
    successStories: 'Success Stories',
    contactUs: 'Contact Us',
    helpdeskNav: 'Helpdesk',
    signIn: 'Sign In',
    mobileTitle: 'SUZA IMS',
    signInPortal: 'Sign In to Portal',

    // Institution header
    country: 'The United Republic of Tanzania',
    uniName: 'The State University of Zanzibar (SUZA)',
    tagline: 'Innovation Management System (IMS) — Striving for Excellence in Innovation and Research',

    // Hero slides
    slides: [
      { title: 'SUZA Innovation Management System', subtitle: 'Transforming Ideas into National Impact' },
      { title: 'Empowering the Next Generation of Innovators', subtitle: 'From Idea to Startup — We Support Every Step' },
      { title: 'Innovation Hubs Across All Schools', subtitle: 'Collaborate, Build, and Scale with SUZA' },
    ],

    // Announcements
    announcements: [
      { badge: 'NEW', title: 'Innovation Grant 2026 Open', description: 'Apply now for the SUZA Innovation Grant. Funding up to TZS 5,000,000 for approved projects.', action: 'Apply Now' },
      { badge: 'NEW', title: 'Annual Hackathon Registration', description: 'SUZA Annual Hackathon 2026 — Register your team before October 1st.', action: 'Register' },
      { badge: 'NEW', title: 'CAS Innovator Innovation Results', description: 'Open to view the approved innovations from the latest review cycle.', action: 'View Results' },
    ],

    // Features
    featuresTitle: 'Institutional Services',
    featuresSubtitle: 'A comprehensive ecosystem designed to support innovators at every stage — from idea to commercialization.',
    learnMore: 'Learn More',
    features: [
      { title: 'Idea Management', description: 'Submit, track, and evolve your innovations from raw ideas to viable prototypes.' },
      { title: 'Expert Mentorship', description: 'Connect with industry experts and faculty for guidance and action plans.' },
      { title: 'Funding Opportunities', description: 'Access grants, seed funding, and pitch to angel investors directly.' },
      { title: 'Competitions', description: 'Participate in university-wide hackathons and challenges to win prizes.' },
      { title: 'Innovation Hubs', description: 'Collaborate in physical and digital spaces dedicated to different disciplines.' },
      { title: 'Commercialization', description: 'Turn your research into a registered startup with our incubation program.' },
    ],

    // Statistics
    statsTitle: 'Innovation in Numbers',
    statsSubtitle: 'Real impact across Zanzibar and East Africa through SUZA\'s Innovation ecosystem.',

    // CTA
    ctaTitle: 'Ready to Innovate?',
    ctaSubtitle: 'Join thousands of students, researchers, and faculty driving change through the SUZA Innovation Management System.',
    ctaButton: 'Get Started Today',
    ctaLearn: 'Learn More',

    // Timeline
    timelineTitle: 'Our Innovation Journey',
    timelineSubtitle: 'Key milestones in SUZA\'s innovation ecosystem development.',
  },

  sw: {
    lang: 'sw',
    langToggle: 'English',

    // Top utility bar
    staffMail: 'Barua Wafanyakazi',
    eOffice: 'Ofisi Pepe',
    siteMap: 'Ramani ya Tovuti',
    helpdesk: 'Msaada',

    // Navbar links
    home: 'Nyumbani',
    aboutIms: 'Kuhusu IMS',
    visionMission: 'Maono & Dhamira',
    governance: 'Utawala',
    ourHistory: 'Historia Yetu',
    innovation: 'Ubunifu',
    ecosystemOverview: 'Muhtasari wa Mfumo',
    innovationHubs: 'Vituo vya Ubunifu',
    categories: 'Makundi',
    schools: 'Shule',
    showcase: 'Onyesho',
    mediaCenter: 'Kituo cha Habari',
    events: 'Matukio',
    successStories: 'Hadithi za Mafanikio',
    contactUs: 'Wasiliana Nasi',
    helpdeskNav: 'Msaada',
    signIn: 'Ingia',
    mobileTitle: 'SUZA IMS',
    signInPortal: 'Ingia kwenye Mfumo',

    // Institution header
    country: 'Jamhuri ya Muungano wa Tanzania',
    uniName: 'Chuo Kikuu cha Jimbo la Zanzibar (SUZA)',
    tagline: 'Mfumo wa Usimamizi wa Ubunifu (IMS) — Kujitahidi kwa Ubora katika Ubunifu na Utafiti',

    // Hero slides
    slides: [
      { title: 'Mfumo wa Usimamizi wa Ubunifu wa SUZA', subtitle: 'Kubadilisha Mawazo kuwa Athari ya Kitaifa' },
      { title: 'Kuwawezesha Kizazi Kipya cha Wabunifu', subtitle: 'Kutoka Wazo hadi Startup — Tunakusaidia Kila Hatua' },
      { title: 'Vituo vya Ubunifu Katika Shule Zote', subtitle: 'Shiriki, Jenga, na Kupanua na SUZA' },
    ],

    // Announcements
    announcements: [
      { badge: 'MPYA', title: 'Mkopo wa Ubunifu 2026 Umefunguliwa', description: 'Omba sasa mkopo wa SUZA wa Ubunifu. Ufadhili hadi TZS 5,000,000 kwa miradi iliyoidhinishwa.', action: 'Omba Sasa' },
      { badge: 'MPYA', title: 'Usajili wa Hackathon ya Mwaka', description: 'Hackathon ya Mwaka ya SUZA 2026 — Sajili timu yako kabla ya Oktoba 1.', action: 'Sajili' },
      { badge: 'MPYA', title: 'Matokeo ya Ubunifu wa Wabunifu wa CAS', description: 'Fungua kuona ubunifu ulioidhinishwa kutoka duru ya hivi karibuni ya mapitio.', action: 'Ona Matokeo' },
    ],

    // Features
    featuresTitle: 'Huduma za Kitaasisi',
    featuresSubtitle: 'Mfumo kamili ulioundwa kusaidia wabunifu katika kila hatua — kutoka wazo hadi biashara.',
    learnMore: 'Jifunza Zaidi',
    features: [
      { title: 'Usimamizi wa Mawazo', description: 'Tuma, fuatilia, na kuboresha ubunifu wako kutoka mawazo hadi mfano unaofaa.' },
      { title: 'Ushauri wa Wataalamu', description: 'Unganika na wataalamu wa sekta na maprofesa kwa mwongozo na mipango.' },
      { title: 'Fursa za Ufadhili', description: 'Pata ruzuku, ufadhili wa awali, na kuwasiliana na wawekezaji moja kwa moja.' },
      { title: 'Mashindano', description: 'Shiriki katika hackathons na changamoto za chuo kushinda zawadi.' },
      { title: 'Vituo vya Ubunifu', description: 'Shiriki katika maeneo ya kimwili na kidijitali yanayotolewa kwa taaluma mbalimbali.' },
      { title: 'Biashara', description: 'Geuza utafiti wako kuwa startup iliyosajiliwa kupitia programu yetu ya ukuaji.' },
    ],

    // Statistics
    statsTitle: 'Ubunifu kwa Nambari',
    statsSubtitle: 'Athari halisi nchini Zanzibar na Afrika Mashariki kupitia mfumo wa ubunifu wa SUZA.',

    // CTA
    ctaTitle: 'Uko Tayari Kuvumbua?',
    ctaSubtitle: 'Jiunge na maelfu ya wanafunzi, watafiti, na wafanyakazi wanaoendesha mabadiliko kupitia Mfumo wa Usimamizi wa Ubunifu wa SUZA.',
    ctaButton: 'Anza Leo',
    ctaLearn: 'Jifunza Zaidi',

    // Timeline
    timelineTitle: 'Safari Yetu ya Ubunifu',
    timelineSubtitle: 'Hatua muhimu katika maendeleo ya mfumo wa ubunifu wa SUZA.',
  },
} as const;

export type Language = 'en' | 'sw';
export type TranslationKey = typeof translations.en;

// ─── Context ─────────────────────────────────────────────────
interface LanguageContextType {
  lang: Language;
  t: TranslationKey;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: translations.en,
  toggle: () => {},
});

// ─── Provider ────────────────────────────────────────────────
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggle = () => setLang(prev => prev === 'en' ? 'sw' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as TranslationKey, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────
export const useLanguage = () => useContext(LanguageContext);
