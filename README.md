# 🛡️ AOI-Guard - AI-Powered IC Authenticity Verification# Firebase Studio



> **High-clarity visual command center for real-time IC authenticity detection — powered by AI, made for humans.**This is a NextJS starter in Firebase Studio.



![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)To get started, take a look at src/app/page.tsx.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

---

## 🎯 Overview

AOI-Guard is an **Automated Optical Inspection (AOI)** system for defense, aerospace, and industrial sectors to combat counterfeit integrated circuits (ICs). Using AI-powered analysis with Google Gemini, it provides real-time authenticity verification.

### ✨ Key Features

- 🤖 **AI-Powered Detection** - Google Gemini integration for OCR and reasoning
- 📊 **Real-Time Analytics** - Live dashboards with trend analysis
- 🎨 **Modern UI/UX** - Glassmorphic design with dark/light themes
- 🚀 **High Performance** - Next.js 15 optimized
- 🔍 **Comprehensive Reporting** - Detailed scans with visual comparisons
- 🔐 **Audit Logging** - Complete activity tracking

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/AadityaHande/AOI-Guard.git
cd AOI-Guard

# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add: GOOGLE_GENAI_API_KEY=your_key_here

# Run development server
npm run dev
```

Visit **http://localhost:9002**

---

## 📦 Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **AI Engine**: Google Genkit + Gemini 2.0
- **Charts**: Recharts
- **Theme**: next-themes
- **Export**: html2canvas + jspdf

---

## 🎯 Main Features

### Dashboard
- Animated batch summary cards
- Real-time upload & scan
- Recent scans table
- Live alerts panel
- Floating action buttons

### Analytics
- Trend charts (daily/weekly/monthly)
- Historical data table
- AI-generated insights
- Export (CSV/JSON/PDF)

### Tools
- Batch comparison utility
- Side-by-side metrics
- Trend indicators

### Audit Log
- Complete activity history
- Search & filter
- Category/status filters
- Export logs

### Command Palette (⌘K)
- Quick navigation
- Instant actions
- Keyboard shortcuts

---

## 📁 Project Structure

```
AOI-Guard/
├── src/
│   ├── app/              # Pages & routing
│   ├── components/       # React components
│   ├── ai/               # AI flows & config
│   ├── lib/              # Utils & data
│   └── hooks/            # Custom hooks
├── docs/                 # Documentation
└── public/               # Static assets
```

---

## 🎨 Design System

### Colors
- **Dark Mode**: Navy Blue (#0B1E39) + Electric Cyan (#00E0FF)
- **Light Mode**: Pure White (#FFFFFF) + Darker Cyan (#0891B2)

### Typography
- **Headings**: Orbitron (futuristic)
- **Body**: Inter (readable)

### Animations
- **Duration**: 150-300ms
- **Easing**: ease-out
- **GPU-accelerated** transforms

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Environment Variables
```env
GOOGLE_GENAI_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- Google Gemini for AI
- Radix UI for components
- Vercel for Next.js
- Tailwind CSS

---

<div align="center">

**Made with ❤️ for Defense & Industrial QA**

⭐ Star this repo if you find it useful!

[Report Bug](https://github.com/AadityaHande/AOI-Guard/issues) • [Request Feature](https://github.com/AadityaHande/AOI-Guard/issues)

</div>
