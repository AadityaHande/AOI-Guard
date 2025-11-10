# 🛡️ AOI-Guard - AI-Powered IC Authenticity Verification# 🛡️ AOI-Guard - AI-Powered IC Authenticity Verification



> **Production-Ready Demo** | AI-powered visual inspection system for detecting counterfeit integrated circuits> **High-clarity visual command center for real-time IC authenticity detection — powered by AI, made for humans.**



![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

![License](https://img.shields.io/badge/license-MIT-green)![SIH](https://img.shields.io/badge/SIH-2024-orange)



------



## 🎯 What is AOI-Guard?## 🎯 Overview



AOI-Guard is an **Automated Optical Inspection (AOI)** system designed for defense, aerospace, and industrial sectors to combat counterfeit integrated circuits. Using advanced AI (Google Gemini Vision), it analyzes IC chip markings in real-time and determines authenticity by comparing against OEM specifications.AOI-Guard is an **Automated Optical Inspection (AOI)** system for defense, aerospace, and industrial sectors to combat counterfeit integrated circuits (ICs). Using AI-powered analysis with Google Gemini, it provides real-time authenticity verification.



### ✨ Key Features### ✨ Key Features



- 🤖 **AI-Powered Detection** - Google Gemini 2.0 Vision API for OCR and authenticity analysis- 🤖 **AI-Powered Detection** - Google Gemini integration for OCR and reasoning

- 📊 **Real-Time Analytics** - Live dashboards with trend analysis and insights- 📊 **Real-Time Analytics** - Live dashboards with trend analysis

- 🎨 **Modern UI/UX** - Glassmorphic design with dark/light themes- 🎨 **Modern UI/UX** - Glassmorphic design with dark/light themes

- 🚀 **High Performance** - Next.js 15 with Turbopack, optimized for speed- 🚀 **High Performance** - Next.js 15 optimized

- 🔍 **Comprehensive Reporting** - Detailed scan reports with visual comparisons- 🔍 **Comprehensive Reporting** - Detailed scans with visual comparisons

- 🌐 **Web Scraping** - Auto-fetch OEM datasheets for verification- 🔐 **Audit Logging** - Complete activity tracking

- 📱 **Camera Support** - Direct camera capture for mobile devices

- 🎯 **Batch Processing** - Scan multiple ICs simultaneously---



---## 🚀 Quick Start



## 🚀 Quick Start (5 Minutes!)### Installation



### Prerequisites```bash

# Clone the repository

- **Node.js 18+** ([Download](https://nodejs.org/))git clone https://github.com/AadityaHande/AOI-Guard.git

- **Google Gemini API Key** ([Get Free Key](https://aistudio.google.com/app/apikey))cd AOI-Guard



### Installation# Install dependencies

npm install

```bash

# 1. Clone the repository# Set up environment variables

git clone https://github.com/AadityaHande/AOI-Guard.git# Create .env.local and add: GOOGLE_GENAI_API_KEY=your_key_here

cd AOI-Guard

# Run development server

# 2. Install dependenciesnpm run dev

npm install```



# 3. Set up environment variablesVisit **http://localhost:9002**

# Copy .env.example to .env.local

cp .env.example .env.local---



# 4. Add your Google Gemini API key to .env.local## 📦 Tech Stack

# Edit .env.local and replace 'your_actual_api_key_here' with your key

- **Framework**: Next.js 15.3.3 (App Router)

# 5. Run the development server- **Language**: TypeScript

npm run dev- **Styling**: Tailwind CSS + Radix UI

```- **AI Engine**: Google Genkit + Gemini 2.0

- **Charts**: Recharts

### 🎉 That's it! Visit **http://localhost:9002**- **Theme**: next-themes

- **Export**: html2canvas + jspdf

---

---

## 📖 How to Use

## 🎯 Main Features

### 1. **Upload IC Images**

- Go to `/detect` or click "Try IC Detection" on homepage### Dashboard

- **Option A**: Drag & drop IC images- Animated batch summary cards

- **Option B**: Use camera to capture directly- Real-time upload & scan

- **Option C**: Try sample ICs (Genuine/Fake examples included)- Recent scans table

- Live alerts panel

### 2. **Configure Detection**- Floating action buttons

- Toggle **Web Search** ON to fetch OEM datasheets

- Toggle **Advanced ML** ON for Gemini AI analysis### Analytics

- Click **Start ML Detection**- Trend charts (daily/weekly/monthly)

- Historical data table

### 3. **View Results**- AI-generated insights

- See **Authenticity Score** (0-100%)- Export (CSV/JSON/PDF)

- Get **Verdict**: Genuine / Fake / Suspicious

- Read **AI Reasoning** with detailed analysis### Tools

- Compare **OCR vs OEM Markings**- Batch comparison utility

- View **Web Search Results** with datasheet links- Side-by-side metrics

- Trend indicators

### 4. **Explore Dashboard**

- View batch summaries with animated counters### Audit Log

- Check recent scans table- Complete activity history

- See live alerts panel- Search & filter

- Access analytics and reports- Category/status filters

- Export logs

---

### Command Palette (⌘K)

## 🎨 Features Showcase- Quick navigation

- Instant actions

### IC Detection Engine- Keyboard shortcuts

```

📸 Upload → 🔍 OCR Extract → 🌐 Web Search → 🤖 AI Analysis → ✅ Verdict---

```

## 📁 Project Structure

- **Level 1**: PaddleOCR text extraction (simulated)

- **Level 2**: Computer Vision pattern matching (simulated)```

- **Level 3**: Gemini AI contextual reasoning (REAL!)AOI-Guard/

├── src/

### Dashboard Analytics│   ├── app/              # Pages & routing

- 📊 Trend charts (daily/weekly/monthly)│   ├── components/       # React components

- 🥧 Pie charts for verdict distribution│   ├── ai/               # AI flows & config

- 📈 Historical data tracking│   ├── lib/              # Utils & data

- 💡 AI-generated insights│   └── hooks/            # Custom hooks

- 📥 Export to CSV/JSON/PDF├── docs/                 # Documentation

└── public/               # Static assets

### Sample ICs Included```

1. **Genuine ATMEGA328** - Authentic chip with correct markings

2. **Fake ATMEGA328** - Counterfeit with wrong logo ("ATNEL" instead of "ATMEL")---

3. **Suspicious STM32** - Refurbished chip with misaligned text

## 🎨 Design System

---

### Colors

## 🏗️ Architecture- **Dark Mode**: Navy Blue (#0B1E39) + Electric Cyan (#00E0FF)

- **Light Mode**: Pure White (#FFFFFF) + Darker Cyan (#0891B2)

### Tech Stack

```### Typography

Frontend:  Next.js 15.3.3 + React 18 + TypeScript- **Headings**: Orbitron (futuristic)

UI:        Tailwind CSS + Radix UI + Shadcn/ui- **Body**: Inter (readable)

AI:        Google Genkit + Gemini 2.0 Flash

Charts:    Recharts### Animations

Export:    html2canvas + jspdf- **Duration**: 150-300ms

Theme:     next-themes (dark/light mode)- **Easing**: ease-out

```- **GPU-accelerated** transforms



### Project Structure---

```

AOI-Guard/## 🚢 Deployment

├── src/

│   ├── app/              # Next.js pages & routes### Vercel (Recommended)

│   │   ├── page.tsx      # Homepage```bash

│   │   ├── detect/       # IC detection pagevercel

│   │   └── dashboard/    # Dashboard pages```

│   ├── components/       # React components

│   │   ├── ui/           # Base UI components### Environment Variables

│   │   └── dashboard/    # Dashboard widgets```env

│   ├── ai/               # AI flows (Genkit)GOOGLE_GENAI_API_KEY=your_api_key

│   │   └── flows/        # Detection flowsNEXT_PUBLIC_APP_URL=http://localhost:9002

│   ├── lib/              # Utilities & helpers```

│   └── hooks/            # Custom React hooks

├── public/               # Static assets---

└── docs/                 # Documentation

```## 🤝 Contributing



---1. Fork the repository

2. Create feature branch (`git checkout -b feature/amazing`)

## 🎯 Demo Flow3. Commit changes (`git commit -m 'Add feature'`)

4. Push branch (`git push origin feature/amazing`)

### For Public Presentation5. Open Pull Request



1. **Open Homepage** → Show animated hero with features---

2. **Click "Try IC Detection"** → Show upload interface

3. **Load Sample IC** → Click "Genuine ATMEGA328"## 📄 License

4. **Toggle Settings** → Enable Web Search + Advanced ML

5. **Start Detection** → Watch ML pipeline progressMIT License - see [LICENSE](LICENSE)

6. **Show Results** → Highlight 98% authentic score

7. **Repeat with Fake IC** → Show counterfeit detection---

8. **Visit Dashboard** → Show analytics and trends

9. **Use Command Palette** → Press Ctrl+K for quick nav## 🙏 Acknowledgments



### Key Talking Points- Google Gemini for AI

- ✅ Real AI (Google Gemini) integration- Radix UI for components

- ✅ Web scraping for OEM verification- Vercel for Next.js

- ✅ Multi-level ML detection (OCR → CV → AI)- Tailwind CSS

- ✅ Production-ready UI/UX

- ✅ Camera support for mobile---

- ✅ Batch processing capability

- ✅ Export & reporting features<div align="center">



---**Made with ❤️ for Defense & Industrial QA**



## 🔧 Configuration⭐ Star this repo if you find it useful!



### Environment Variables[Report Bug](https://github.com/AadityaHande/AOI-Guard/issues) • [Request Feature](https://github.com/AadityaHande/AOI-Guard/issues)



Required:</div>

```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Optional:
```env
NEXT_PUBLIC_APP_URL=http://localhost:9002
NEXT_PUBLIC_ENABLE_WEB_SEARCH=true
NEXT_PUBLIC_ENABLE_REAL_AI=true
NEXT_PUBLIC_ENABLE_CAMERA=true
```

### Port Configuration
Default port: `9002`

To change port:
```bash
npm run dev -- -p 3000
```

---

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

**Note**: Camera feature requires HTTPS or localhost

---

## 🎓 Use Cases

### Defense & Aerospace
- Verify critical IC components in military equipment
- Prevent counterfeit chips in defense systems
- Quality assurance for aerospace electronics

### Manufacturing
- Incoming quality control
- Supplier verification
- Batch testing automation

### Electronics Repair
- Component authentication
- Refurbished parts verification
- Supply chain integrity

---

## 🐛 Troubleshooting

### "Cannot find Google Gemini API key"
→ Ensure `.env.local` exists with valid `GOOGLE_GENAI_API_KEY`

### Camera not working
→ Grant camera permissions in browser settings
→ Use HTTPS or localhost (required for camera API)

### Build errors
→ Delete `.next` folder and `node_modules`
→ Run `npm install` again

### Port 9002 already in use
→ Kill process: `npx kill-port 9002`
→ Or use different port: `npm run dev -- -p 3000`

---

## 📚 Documentation

- [Demo Guide](DEMO_GUIDE.md) - Perfect demo flow and presentation tips
- [Complete Features](docs/COMPLETE_FEATURES.md) - All implemented features
- [ML Detection Levels](docs/ML_DETECTION_LEVELS.md) - Technical details
- [Implementation Guide](IMPLEMENTATION_COMPLETE.md) - Development notes

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 👨‍💻 Author

**Aaditya Hande**
- GitHub: [@AadityaHande](https://github.com/AadityaHande)
- Project: [AOI-Guard](https://github.com/AadityaHande/AOI-Guard)

---

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Radix UI for accessible components
- Vercel for Next.js framework
- Tailwind CSS for styling
- Smart India Hackathon 2024

---

## 📊 Project Stats

- **Lines of Code**: ~15,000+
- **Components**: 50+
- **AI Flows**: 6
- **Pages**: 10+
- **Development Time**: 2 months

---

<div align="center">

### 🌟 Star this repo if you find it useful!

**Made with ❤️ for Defense & Industrial Quality Assurance**

[⭐ Star](https://github.com/AadityaHande/AOI-Guard) • [🐛 Report Bug](https://github.com/AadityaHande/AOI-Guard/issues) • [✨ Request Feature](https://github.com/AadityaHande/AOI-Guard/issues)

</div>
