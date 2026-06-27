# PSR ONE Project File Directory

This document provides a map of the file structure of your Next.js website and the purpose of each key resource.

## Absolute Path
`C:\Users\bandl\OneDrive\Desktop\PSR ONE\New folder`

## Directory Tree

```text
📁 PSR ONE (Project Root)
├── 📁 .next/                      # Compiled Next.js build output (automatically generated)
├── 📁 .vercel/                    # Vercel deployment credentials (automatically generated)
├── 📁 public/                     # Static assets (images, logos, icons, robots.txt)
│   └── 📄 ...                     # Brand assets and graphics
├── 📁 src/                        # Core application source code
│   ├── 📁 components/             # Reusable UI React Components
│   │   ├── 📁 Common/             # Global utility components
│   │   │   ├── 📄 Accordion.tsx   # FAQ collapsible dropdown component
│   │   │   ├── 📄 InsuranceCalculator.tsx # Dynamic health & liability cost calculator
│   │   │   └── 📄 LoanCalculator.tsx      # Interactive EMI interest calculator
│   │   ├── 📄 Footer.tsx          # Global footer containing maps, links & contact info
│   │   ├── 📄 Layout.tsx          # Global layout wrapper linking Navbar and Footer
│   │   └── 📄 Navigation.tsx      # Responsive desktop/mobile main navbar
│   │
│   ├── 📁 lib/                    # Configuration utilities and state hooks
│   │   ├── 📄 blog-data.ts        # Dynamic blog posts database & metadata
│   │   ├── 📄 db-fallback.ts      # Path resolver mapping local logs to /tmp on Vercel
│   │   ├── 📄 supabase.ts         # Supabase Client connection initialization
│   │   └── 📄 useContent.ts       # React state hook managing page content and localStorage caching
│   │
│   ├── 📁 pages/                  # Next.js Pages router (every file here matches a URL route)
│   │   ├── 📁 api/                # Backend API Routes (Serverless functions)
│   │   │   ├── 📁 admin/          
│   │   │   │   └── 📄 data.ts     # Fetches subscriber lists and captured leads (secured)
│   │   │   ├── 📄 contact.ts      # Validates submissions and dispatches emails via SendGrid
│   │   │   ├── 📄 content.ts      # Reads and writes dynamic page content
│   │   │   ├── 📄 hello.ts        # Test server status route
│   │   │   ├── 📄 leads.ts        # CRUD operations to create, update status, or delete leads
│   │   │   ├── 📄 newsletter.ts   # Registers newsletter subscription entries
│   │   │   └── 📄 settings.ts     # Gets and sets site global configurations (phone, email, hours)
│   │   │
│   │   ├── 📁 services/           # Service Pages (Individual advisory verticals)
│   │   │   ├── 📄 business-advisory.tsx # Business scaling advisory vertical
│   │   │   ├── 📄 franchise.tsx         # Franchise investment matching vertical
│   │   │   ├── 📄 insurance.tsx         # Corporate & family risk insurance vertical
│   │   │   ├── 📄 loans.tsx             # EMI calculator and debt syndication vertical
│   │   │   └── 📄 real-estate.tsx       # Land investment & property legal checks vertical
│   │   │
│   │   ├── 📄 _app.tsx            # Main application wrapper (loads global stylesheets)
│   │   ├── 📄 about.tsx           # About Us page (interactive milestones, mission, team)
│   │   ├── 📄 admin.tsx           # Secured Admin Panel (manages leads, changes content & settings)
│   │   ├── 📄 blog.tsx            # Blog articles catalog list
│   │   ├── 📄 contact.tsx         # Contact page featuring interactive leads form & map links
│   │   ├── 📄 index.tsx           # Homepage (Hero, core service cards, reviews, newsletter)
│   │   ├── 📄 privacy.tsx         # Privacy Policy page
│   │   ├── 📄 success.tsx         # Successful form submission confirmation page
│   │   └── 📄 terms.tsx           # Terms of Service page
│   │
│   └── 📁 styles/                 
│       └── 📄 globals.css         # Custom animations, fonts, and Tailwind directives
│
├── 📄 .env.example                # Example template file for environment variables
├── 📄 .eslintrc.json              # TypeScript code linting configurations
├── 📄 .gitignore                  # Specifies files to exclude from git tracking (e.g. node_modules)
├── 📄 next.config.mjs             # Next.js compiler settings
├── 📄 package.json                # Project dependencies, metadata, and build script commands
├── 📄 package-lock.json           # Exact locked version trees of all installed modules
├── 📄 tailwind.config.ts          # Core styling system rules, layout grids, and brand colors
└── 📄 tsconfig.json               # TypeScript strict configuration rules
```
