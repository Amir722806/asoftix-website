// Service catalogue, following the blueprint's launch priorities.
// "status: live" services are offered today; "planned" ones are shown as coming later, never sold yet.
export const services = [
  {
    slug: 'web-design',
    icon: 'layout',
    status: 'live',
    title: 'Web Design & Frontend',
    short: 'Responsive business websites, landing pages and Figma-to-React builds that load fast and convert.',
    scope:
      'Design and build of company websites and landing pages, or turning an existing design into a clean, component-based React frontend.',
    deliverables: [
      'Responsive multi-page business websites',
      'Landing pages for products and campaigns',
      'Figma-to-React UI implementation',
      'Inquiry and quote forms with validation',
      'SEO basics: titles, descriptions, sitemap',
      'Bug fixes and UI improvements on existing sites',
    ],
    ideal: 'Startups, local businesses and professionals who need a credible online presence quickly.',
    proof: 'business-website',
  },
  {
    slug: 'react-development',
    icon: 'code',
    status: 'live',
    title: 'React Development',
    short: 'Interactive single-page apps, dashboards and admin panels built with React, Vite and Next.js.',
    scope:
      'Feature development in React: routing, state, forms, data tables, filters and charts, connected to your API or ours.',
    deliverables: [
      'Admin panels and internal dashboards',
      'Next.js sites with server rendering for SEO',
      'Reusable component libraries',
      'API integration with loading and error states',
      'Performance and accessibility fixes',
    ],
    ideal: 'Teams with an existing product who need extra frontend capacity, or founders building an MVP.',
    proof: 'commerce-platform',
  },
  {
    slug: 'full-stack',
    icon: 'server',
    status: 'live',
    title: 'Full-Stack Web Applications',
    short: 'Complete web apps with login, roles, databases and APIs: shops, booking and management systems.',
    scope:
      'End-to-end applications: database design, secure APIs, authentication and role-based access, and the frontend on top.',
    deliverables: [
      'Authentication, users and permissions',
      'REST APIs with input validation',
      'PostgreSQL database design and migrations',
      'E-commerce, booking and admin systems',
      'Reports with Excel / PDF export',
      'Deployment to Vercel or a suitable host',
    ],
    ideal: 'Businesses replacing spreadsheets or paper registers with a proper system their staff can use.',
    proof: 'bookshop-management',
  },
  {
    slug: 'business-systems',
    icon: 'box',
    status: 'live',
    title: 'Inventory & Business Systems',
    short: 'Stock, purchasing, ledgers and reporting tools, designed by someone who has run warehouse inventory.',
    scope:
      'Systems for stock control, purchasing, customer and supplier ledgers, and daily/monthly reporting, built as web apps or as structured Excel / Google Sheets workbooks.',
    deliverables: [
      'Inventory and stock-movement tracking',
      'Purchase, sales and supplier ledgers',
      'Low-stock alerts and reconciliation reports',
      'Google Sheets / Excel systems with dashboards',
      'Migration from spreadsheets to a web app',
    ],
    ideal: 'Warehouses, shops, distributors and restaurants that need accurate stock and clear reports.',
    proof: 'bookshop-management',
  },
  {
    slug: 'data-dashboards',
    icon: 'chart',
    status: 'live',
    title: 'Data & Reporting Dashboards',
    short: 'Clean data, clear dashboards and recurring reports that help managers decide faster.',
    scope:
      'Cleaning and structuring operational data and building dashboards and scheduled reports in Excel, Google Sheets or a web dashboard.',
    deliverables: [
      'Data cleaning and structuring',
      'Pivot-table and chart dashboards',
      'Daily, weekly and monthly report templates',
      'Variance and consumption-trend analysis',
    ],
    ideal: 'Operations and management teams drowning in spreadsheets.',
    proof: null,
  },
  // Phase 2: shown as "coming later" only. Promote to "live" once delivery is proven.
  {
    slug: 'mobile-apps',
    icon: 'phone',
    status: 'planned',
    title: 'Mobile Apps',
    short: 'Flutter apps for Android. Currently in internal development and not yet offered to clients.',
  },
  {
    slug: 'ai-integrations',
    icon: 'spark',
    status: 'planned',
    title: 'AI Integrations',
    short: 'Narrowly scoped AI features such as chat assistants and document extraction. Planned for a later phase.',
  },
];

export const liveServices = services.filter((s) => s.status === 'live');
export const plannedServices = services.filter((s) => s.status === 'planned');
