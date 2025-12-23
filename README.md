# SendComms API Documentation

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>Modern, beautiful API documentation for SendComms - Ghana's premier communications platform</strong>
</p>

<p align="center">
  <a href="https://docs.sendcomms.com">Live Documentation</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## 📖 Overview

SendComms API Documentation is a standalone, static documentation site built with Next.js 16. It provides comprehensive guides and API references for integrating with the SendComms platform, which offers:

- **📧 Email API** - Send transactional and marketing emails
- **📱 Data Bundles API** - Purchase mobile data bundles for all major Ghanaian networks
- **💬 SMS API** - Send SMS messages across 50+ African countries
- **📞 Airtime API** *(Coming Soon)* - Top up airtime
- **🧪 Sandbox Mode** - Test your integration without charges

## ✨ Features

### Documentation Features
- **Multi-language Code Examples** - cURL, Node.js, Python, and PHP examples for every endpoint
- **Interactive Navigation** - Collapsible sidebar with section grouping
- **Mobile Responsive** - Fully responsive design with slide-out mobile menu
- **Dark Theme** - Easy on the eyes with a modern dark interface
- **Search** - Quick keyboard navigation with ⌘K shortcut
- **Sandbox Mode Guide** - Complete testing documentation with real examples

### Technical Features
- **Static Site Generation** - Pre-rendered pages for optimal performance
- **SEO Optimized** - Proper meta tags and structured content
- **Zero Backend Dependencies** - Pure static hosting compatible
- **TypeScript** - Full type safety throughout the codebase

## 🧪 Sandbox Mode

SendComms supports **Sandbox Mode** for testing integrations without charges:

| Key Type | Prefix | Behavior |
|----------|--------|----------|
| **Test** | `sc_test_` | Returns mock responses, no charges, no real messages sent |
| **Live** | `sc_live_` | Sends real messages, charges balance, affects production stats |

### Sandbox Features
- ✅ Full API validation (same as live)
- ✅ Realistic mock responses with pricing
- ✅ Transaction logging for debugging
- ✅ No balance deductions
- ✅ No real messages sent
- ✅ Supports SMS, Email, and Data APIs

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/angeloasante/sendcoms-docs.git
   cd sendcoms-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory, ready for deployment.

## 📁 Project Structure

```
sendcomms-docs/
├── app/
│   ├── docs/
│   │   ├── layout.tsx          # Docs layout with sidebar & navigation
│   │   ├── page.tsx            # Introduction page
│   │   ├── quickstart/         # Quick start guide
│   │   ├── authentication/     # Authentication documentation
│   │   ├── rate-limits/        # Rate limits documentation
│   │   ├── errors/             # Error handling documentation
│   │   ├── sandbox/            # Sandbox mode documentation
│   │   └── api/
│   │       ├── email/          # Email API documentation
│   │       │   ├── page.tsx    # Send Email endpoint
│   │       │   ├── batch/      # Batch Send endpoint
│   │       │   └── webhooks/   # Webhooks documentation
│   │       ├── sms/            # SMS API documentation
│   │       │   ├── page.tsx    # Send SMS endpoint
│   │       │   └── pricing/    # SMS pricing by region
│   │       └── data/           # Data Bundles API documentation
│   │           ├── page.tsx    # List Packages endpoint
│   │           ├── purchase/   # Purchase Data endpoint
│   │           └── status/     # Check Status endpoint
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page (redirects to docs)
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment configuration
└── package.json
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy with default settings

### Custom Domain Setup

To use a custom domain like `docs.sendcomms.com`:

1. Add your domain in Vercel project settings
2. Configure DNS records:
   - **CNAME**: `docs` → `cname.vercel-dns.com`
   - Or **A Record**: `@` → Vercel's IP addresses

### Other Platforms

The site can be deployed to any static hosting platform:

- **Netlify**: Drop the `out/` folder or connect GitHub
- **GitHub Pages**: Use the static export
- **Cloudflare Pages**: Connect repository for automatic deployments
- **AWS S3 + CloudFront**: Upload `out/` to S3 bucket

## 🎨 Customization

### Theme Colors

The documentation uses a dark theme with the following color palette:

| Element | Color | Hex |
|---------|-------|-----|
| Background | Dark | `#0b0c0e` |
| Surface | Dark Gray | `#16181b` |
| Primary | Blue | `#3b82f6` |
| Success | Green | `#22c55e` |
| Warning | Yellow | `#eab308` |
| Text | Light Gray | `#e5e5e5` |

### Adding New Pages

1. Create a new folder under `app/docs/`
2. Add a `page.tsx` file with your content
3. Update the sidebar navigation in `app/docs/layout.tsx`

## 📚 API Documentation Coverage

### Email API
| Endpoint | Method | Description | Sandbox |
|----------|--------|-------------|---------|
| `/api/v1/email/send` | POST | Send a single email | ✅ |
| `/api/v1/email/batch` | POST | Send batch emails | ✅ |

### SMS API
| Endpoint | Method | Description | Sandbox |
|----------|--------|-------------|---------|
| `/api/v1/sms/send` | POST | Send SMS to any country | ✅ |

### Data Bundles API
| Endpoint | Method | Description | Sandbox |
|----------|--------|-------------|---------|
| `/api/v1/data/packages` | GET | List available data packages | ✅ |
| `/api/v1/data/purchase` | POST | Purchase a data bundle | ✅ |
| `/api/v1/data/status/:id` | GET | Check transaction status | ✅ |

### Supported Networks (Data)
- 🟡 MTN Ghana
- 🔴 Vodafone Ghana
- 🔵 AirtelTigo

### SMS Regional Coverage
- 🌍 Africa (50+ countries)
- 🌎 North America
- 🌍 Europe
- 🌏 Asia Pacific

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Travis Moore (Angelo Asante)**

- Website: [angeloasante.com](https://angeloasante.com)
- GitHub: [@angeloasante](https://github.com/angeloasante)

---

<p align="center">
  Made with ❤️ in Ghana 🇬🇭
</p>
