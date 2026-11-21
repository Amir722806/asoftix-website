// Portfolio case studies. Content is taken from each project's own README.
// Screenshots live in /public/projects/<slug>/ (captured from the running apps). The first one is the card cover.
export const projects = [
  {
    slug: 'business-website',
    screenshots: [
      { src: '/projects/business-website/home.jpg', caption: 'Homepage hero with quote CTA' },
      { src: '/projects/business-website/services.jpg', caption: 'Services overview' },
      { src: '/projects/business-website/projects.jpg', caption: 'Filterable project portfolio' },
      { src: '/projects/business-website/admin.jpg', caption: 'Admin dashboard: content and enquiries' },
    ],
    featured: true,
    title: 'Alif Electrical: Company Website & CMS',
    type: 'Business website',
    category: 'Website',
    date: '2026',
    label: 'Prototype. Frontend complete, backend not connected yet',
    visual: 'site',
    summary:
      'A multi-page corporate website for an electrical contracting company, with a filterable project portfolio, blog and a built-in admin panel.',
    challenge:
      'The company needed to present six service lines, commercial contracting work and past projects professionally, and let staff update content without a developer.',
    users: 'Commercial and residential clients looking for an electrical contractor in Lahore; company staff managing content.',
    solution:
      'A React + Vite site with service detail pages, searchable and filterable projects, a blog with categories and an enquiry form. An admin dashboard manages projects, posts, services, enquiries and site settings.',
    contribution: 'Full design and frontend development: sitemap, UI, all public pages and the admin dashboard.',
    stack: ['React 18', 'Vite', 'React Router', 'CSS'],
    features: [
      'Six service pages and project detail pages',
      'Portfolio filter and search',
      'Blog with categories, drafts and SEO fields',
      'Admin: projects, posts, services, enquiries, settings',
      'Light / dark theme',
    ],
    limitations:
      'No backend yet: content and enquiries are stored in the browser and the admin login is a front-end check. Production needs an API, database, server-side auth and email notifications.',
    demo: null,
    repo: null,
  },
  {
    slug: 'commerce-platform',
    screenshots: [
      { src: '/projects/commerce-platform/storefront.jpg', caption: 'Storefront homepage' },
      { src: '/projects/commerce-platform/category.jpg', caption: 'Category page with filters' },
      { src: '/projects/commerce-platform/product.jpg', caption: 'Product detail page' },
      { src: '/projects/commerce-platform/admin-dashboard.jpg', caption: 'Admin dashboard: sales and low stock' },
      { src: '/projects/commerce-platform/admin-orders.jpg', caption: 'Admin order management' },
    ],
    featured: true,
    title: 'Commerce Platform: Storefront, Admin & API',
    type: 'E-commerce',
    category: 'E-commerce',
    date: '2026',
    label: 'Self-initiated product. Web and API complete, mobile app not started',
    visual: 'shop',
    summary:
      'A multi-channel online store: a Next.js storefront, a React admin panel and a NestJS API sharing one typed backend.',
    challenge:
      'Build a store that handles real order flow, including stock reservation, payments, returns and staff roles, rather than a front-end-only shop demo.',
    users: 'Online shoppers in Pakistan, and store staff (managers, catalog, fulfilment and support).',
    solution:
      'A Turborepo monorepo with a NestJS REST API (OpenAPI docs), a server-rendered Next.js storefront with a 4-step checkout and guest checkout, and a React admin with dashboards, orders, returns, inventory, coupons and staff permissions.',
    contribution: 'Architecture, database design, API, storefront and admin panel.',
    stack: ['Next.js 15', 'React', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL / SQLite', 'TanStack Query', 'Turborepo'],
    features: [
      '15-minute stock reservation, then payment, then commit',
      'Cart drawer, 4-step checkout, order tracking',
      'Coupons, loyalty, wishlist and saved addresses',
      'Admin: orders, returns/RMA, refunds, CSV import, reports',
      'Argon2 passwords, rotating refresh tokens, RBAC, rate limits',
      'Sitemap, robots and JSON-LD for SEO',
    ],
    limitations:
      'Cash on Delivery works out of the box; card payments need Stripe keys and are in test mode. Admin 2FA, CI and the mobile app are still on the roadmap.',
    demo: null,
    repo: null,
  },
  {
    slug: 'bookshop-management',
    screenshots: [
      { src: '/projects/bookshop-management/dashboard.jpg', caption: 'Owner dashboard with low-stock alerts' },
      { src: '/projects/bookshop-management/sales.jpg', caption: 'New sale with discounts and payments' },
      { src: '/projects/bookshop-management/books.jpg', caption: 'Books and stock list' },
      { src: '/projects/bookshop-management/reports.jpg', caption: 'Reports with Excel / PDF export' },
    ],
    featured: true,
    title: 'Book Shop Management System',
    type: 'Admin dashboard / business system',
    category: 'Web app',
    date: '2026',
    label: 'Built for a real shop workflow. Live demo available',
    visual: 'dash',
    summary:
      'Sales, stock, ledgers and accounts for a book shop that sells to individuals, schools and other shops, with prices in PKR.',
    challenge:
      'The shop tracked stock, credit customers and supplier bills by hand. Totals had to match exactly, months had to be closed and locked, and staff needed different rights.',
    users: 'Shop owner, accountant and counter staff on desktop and phone.',
    solution:
      'A full-stack web app covering 11 modules: customers and suppliers with ledgers, inventory, sales with discounts and part payments, purchases, WhatsApp ledger messages, cash and bank books, expenses, monthly closing, low-stock alerts, reports, and users with 18 permissions.',
    contribution: 'Requirements analysis, database design, API, frontend, tests and deployment.',
    stack: ['React 18', 'React Router 7', 'Node 22', 'Express 5', 'PostgreSQL', 'Zod', 'JWT', 'Vercel'],
    features: [
      'Shared calculation library so screen totals always match saved totals',
      'Printable invoices, Excel and PDF report export',
      'Monthly closing with admin-only reopen and audit trail',
      'Low-stock alerts that persist until cleared',
      'Role-based rights, activity log and daily backups',
      'Automated calculation and API tests',
    ],
    limitations:
      'WhatsApp delivery needs a configured WhatsApp Business provider. The demo uses sample data.',
    demo: 'https://grace-bookshop.vercel.app',
    repo: null,
  },
  {
    slug: 'routine-app',
    screenshots: [],
    featured: false,
    title: 'Routine Tracker (Android)',
    type: 'Mobile app',
    category: 'Mobile',
    date: '2026',
    label: 'Internal project, in progress (phase 1 of 7)',
    visual: 'mobile',
    summary:
      'A personal routine tracker for schedule, sleep, water, exercise and app usage. All data stays on the phone.',
    challenge: 'Track daily habits privately, with no account and no cloud, and keep everything configurable from a few files.',
    users: 'Individuals who want a private daily-routine and health tracker.',
    solution:
      'A Flutter app with a local database, five tabs and a central config for goals, reminders and categories. Later phases add health, sleep, usage tracking and a dashboard.',
    contribution: 'Design, architecture and development.',
    stack: ['Flutter', 'Dart', 'Drift / SQLite', 'Android'],
    features: ['Theme and 5-tab navigation', 'Local database with all tables', 'Config-driven goals, schedule and categories'],
    limitations: 'Early stage: only the foundation phase is complete.',
    demo: null,
    repo: 'https://github.com/Amir722806/Routener_App',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectCategories = ['All', ...new Set(projects.map((p) => p.category))];
export const getProject = (slug) => projects.find((p) => p.slug === slug);
