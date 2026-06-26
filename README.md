# PSR ONE - Premium Business Website

PSR ONE is a unified multi-service digital platform offering five core pillars of enterprise growth and financial security:
1. **Franchise Investment Advisory**
2. **Loans & Financing Capital**
3. **Insurance Solutions & Wealth Protection**
4. **Real Estate Consulting & Valuation**
5. **Business Advisory & Compliance Consulting**

This project is built using **Next.js 14** (Pages Router), **TypeScript**, and **Tailwind CSS**.

---

## Getting Started

### 1. Install Dependencies
Run the installation command to fetch all packages:
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

And configure the following variables:
```env
NEXT_PUBLIC_SITE_URL=https://psrone.vercel.app
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=admin@psrone.com
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
To compile and test types and build optimizations:
```bash
npm run build
npm run start
```

---

## Codebase Architecture

```
├── public/
│   ├── robots.txt              # Search engine bot instructions
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation.tsx      # Sticky glassmorphic navbar with mobile drawer
│   │   ├── Footer.tsx          # Contact info and newsletter subscription
│   │   ├── Layout.tsx          # General wrapper for navigation and footer
│   │   └── Common/
│   │       ├── Accordion.tsx   # Reusable FAQ accordion
│   │       ├── LoanCalculator.tsx       # Loan EMI & eligibility calculator
│   │       └── InsuranceCalculator.tsx  # Insurance premium estimator
│   ├── pages/
│   │   ├── index.tsx           # Home Landing page
│   │   ├── about.tsx           # About Us page
│   │   ├── contact.tsx         # Contact page with lead generation form
│   │   ├── blog.tsx            # Blog listing with search & filters
│   │   ├── blog/[slug].tsx     # Dynamically pre-rendered blog posts
│   │   ├── services/           # 5 individual service portals
│   │   ├── sitemap.xml.ts      # Dynamic XML sitemap
│   │   ├── privacy.tsx         # Privacy policy guidelines
│   │   ├── terms.tsx           # Terms of service conditions
│   │   ├── success.tsx         # Submission success landing page
│   │   ├── 404.tsx             # Custom branded 404 page
│   │   └── api/
│   │       ├── leads.ts        # Captures form leads (Supabase / local fallback)
│   │       ├── newsletter.ts   # Newsletter subscription API
│   │       └── contact.ts      # Email notification dispatcher (Nodemailer)
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client connector
│   │   └── blog-data.ts        # SEO article database
│   └── styles/
│       └── globals.css         # Base tailwind & animation styles
├── tailwind.config.ts          # Color variables and fonts configuration
└── tsconfig.json
```

---

## Mock Fallbacks for Local Testing

If you don't have Supabase or SendGrid accounts configured in your `.env.local` file yet, the application will automatically fallback to local files for testing:
- **Form Submissions**: Leads are saved locally in `./leads_captured.json`.
- **Newsletter Subscriptions**: Subscribers are saved in `./subscribers.json`.
- **Emails Sent**: Email logs are written to `./emails_sent_mock.log`.
