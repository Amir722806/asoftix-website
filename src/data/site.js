// Company-wide details. Change these in one place.
// TODO before launch: replace the personal Gmail with a business address on the final domain.
export const site = {
  name: 'ASoftix',
  tagline: 'Turning Ideas Into Digital Solutions.',
  url: 'https://asoftix.com', // TODO: confirm domain
  email: 'amirsohail03030@gmail.com',
  whatsapp: '923474769087', // international format, no "+" (used for wa.me links)
  whatsappDisplay: '+92 347 4769087',
  location: 'Lahore, Pakistan',
  responseTime: 'within one working day',
  hours: 'Mon to Sat, 10:00 to 19:00 (PKT)',
  social: [
    { label: 'GitHub', href: 'https://github.com/Amir722806', icon: 'github' },
  ],
  founded: 2026,
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

// Trust strip: only technologies the team has actually shipped with (see the portfolio).
export const techStack = [
  'React', 'Next.js', 'Vite', 'TypeScript', 'Node.js', 'Express', 'NestJS',
  'PostgreSQL', 'Prisma', 'Flutter', 'Excel & Google Sheets', 'Vercel',
];

export const whyUs = [
  {
    icon: 'chat',
    title: 'Clear communication',
    text: 'You talk directly to the person building your project, in English or Urdu, with progress updates you can actually read.',
  },
  {
    icon: 'clipboard',
    title: 'Defined scope',
    text: 'Every project starts with a written scope: pages, features, deliverables and what is out of scope, before any code.',
  },
  {
    icon: 'layers',
    title: 'Business-first thinking',
    text: 'Years spent running inventory, procurement and reporting mean we build software around how operations really work.',
  },
  {
    icon: 'shield',
    title: 'Quality checks',
    text: 'Responsive, keyboard and form testing before handover, plus automated tests where the logic involves money or stock.',
  },
];

export const process = [
  { step: 'Discover', text: 'Understand your business, users and goals.' },
  { step: 'Plan', text: 'Agree scope, pages, features and timeline in writing.' },
  { step: 'Design', text: 'Wireframes and visual direction for desktop and mobile.' },
  { step: 'Build', text: 'Develop in small, reviewable milestones.' },
  { step: 'Test', text: 'Check devices, forms, accessibility and edge cases.' },
  { step: 'Launch', text: 'Domain, HTTPS, deployment and a clean handover.' },
  { step: 'Support', text: 'Fixes and improvements after go-live.' },
];

export const faqs = [
  {
    q: 'How long does a typical business website take?',
    a: 'A focused multi-page business site usually takes two to four weeks once content is ready. Larger web applications are planned in milestones, and we agree the timeline in the written scope.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: 'Yes. We work remotely, communicate in English, and schedule calls around your time zone.',
  },
  {
    q: 'Can you work from my existing Figma design?',
    a: 'Yes. Figma-to-React implementation is one of our core services. We build reusable components that match your design on every screen size.',
  },
  {
    q: 'What happens after launch?',
    a: 'You receive the source code, deployment access and a short handover guide. We offer support for fixes and new features after go-live.',
  },
];

// Brand colours (blueprint section 7). Editable from Admin -> Settings.
export const theme = {
  primary: '#246BCE',
  secondary: '#27A8C7',
};
