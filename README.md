# Narrative Lens v3

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)

**Narrative Lens** is a browser-based media literacy tool that reveals how mainstream news outlets frame current events through their choice of language. By tracking specific words and phrases across multiple outlets over time, users can observe patterns in media narrative construction — and now analyze the emotional tone behind that language through live sentiment visualization.

---

## 📖 Table of Contents

- [Philosophy](#philosophy)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Deployment](#deployment)
- [Credits & Acknowledgments](#credits--acknowledgments)
- [License](#license)

---

## 🧠 Philosophy

Media outlets don't just report facts—they construct narratives through word selection, phrasing, and emphasis. Narrative Lens treats media language as data to be analyzed rather than accepting it passively, empowering users to become more critical consumers of news.

By tracking phrase patterns, you can observe:
- **Framing differences**: How the same event is described differently (e.g., "protesters" vs. "rioters")
- **Narrative coordination**: When multiple outlets adopt similar language simultaneously
- **Evolution of discourse**: How terminology changes as stories develop
- **Outlet positioning**: Which outlets emphasize certain concepts more than others
- **Temporal trends**: How language usage spikes or fades around events
- **Sentiment shifts**: Whether an outlet's coverage of a topic skews positive, neutral, or negative over time

---

## ✨ Features

### Core Functionality
- **Browser-Native**: Runs entirely in the browser—no backend server required
- **CORS-Compliant**: Uses Guardian API + RSS feeds (via RSS2JSON) to avoid browser security blocks
- **Persistent Storage**: Articles and settings saved to localStorage for historical analysis
- **Interactive Heatmap**: Visual representation of phrase frequency across outlets and topics
- **Drill-Down Analysis**: Click any heatmap cell to see article-level details with matched phrases
- **Flexible Phrase Matching**: Toggle between exact phrases and variations

### Sentiment Visualization
- **Live Sentiment Bar Graph**: Each outlet/cluster combination displays a stacked bar divided into three color regions — positive (green), neutral (gray), and negative (red) — reflecting the emotional tone of matched articles
- **Per-Cell Sentiment Scores**: Sentiment is calculated alongside phrase frequency, giving a nuanced view of not just *how often* a topic is covered, but *how it is framed emotionally*
- **Sentiment Lexicon**: Built-in sentiment scoring via a dedicated lexicon (`sentimentLexicon.js`) with extensible positive/negative word lists

### Trend Analysis
- **Trends Modal**: Click "View Trends" on any semantic cluster to open a time-series visualization showing how coverage volume has shifted across outlets over the selected date range
- **Cross-Outlet Comparison**: Compare how different outlets' coverage of a topic rises and falls over time

### Dark Mode
- **Full Dark Mode Support**: Toggle between light and dark themes via the header; preference is persisted to localStorage
- **System Preference Aware**: Defaults to the OS-level dark/light mode preference on first visit

### User Configuration
- **Add/Remove News Outlets**: Configure RSS feeds or Guardian API sources
- **Custom Semantic Clusters**: Define your own phrase groups to track
- **Enable/Disable Outlets**: Control which sources are included without deleting them
- **Date Range Filtering**: Analyze coverage over 7, 14, 30, or 90 days
- **Guardian API Key Storage**: Securely store your free API key

### Data Sources
- **Guardian API**: Deep content analysis with article body text
- **RSS Feeds**: Universal coverage from any outlet with an RSS feed (no API keys needed)
- **Future-Ready**: Architecture supports GDELT integration and additional APIs

---

## 🛠 Technology Stack

### Frontend Framework
- **React 18.3.1**: Component-based UI library
- **Vite 5.4**: Lightning-fast build tool and dev server
- **Lucide React**: Beautiful, consistent icons

### Styling
- **Tailwind CSS 3.x** (via CDN): Utility-first CSS framework with dark mode class support

### Data APIs
- **The Guardian Open Platform**: Free API for Guardian articles with full body text
- **RSS2JSON**: CORS-friendly RSS feed converter (free tier)
- **RSS Feeds**: Direct news syndication from major outlets

### Storage
- **localStorage**: Browser-native persistent storage via polyfill API (`src/utils/storage.js`)

### Development Tools
- **@vitejs/plugin-react**: Vite plugin for React Fast Refresh
- **Babel**: JavaScript transpiler for modern syntax support

---

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- A modern web browser (Chrome, Firefox, Edge, Safari)
- *Optional*: Free Guardian API key ([get one here](https://open-platform.theguardian.com/access/))

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Jay-Marksman/narrative-lens-v3.git
cd narrative-lens-v3
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Optional: Guardian API Key

Create `.env.local` in the project root:

```env
VITE_GUARDIAN_KEY=your-guardian-api-key-here
```

Get a free key at [The Guardian Open Platform](https://open-platform.theguardian.com/access/).

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GUARDIAN_KEY` | Guardian API key for full article access | Optional* |

*RSS feeds work without any API keys. Guardian API requires a key for production use (free tier available).

### Default Outlets

The app ships with these pre-configured outlets:

| Short Name | Full Name | Type |
|------------|-----------|------|
| Guardian | The Guardian | Guardian API |
| NYT | New York Times | RSS |
| WSJ | Wall Street Journal | RSS |
| BBC | BBC News | RSS |
| CNN | CNN | RSS |
| Engadget | Engadget | RSS |
| NPR | NPR News | RSS |
| Vox | Vox | RSS |
| Axios | Axios | RSS |
| AP | Associated Press | RSS |

### Default Semantic Clusters

Pre-configured phrase groups:

| Cluster | Exact Phrases | Variations |
|---------|---------------|------------|
| **AI & Automation** | artificial intelligence, AI, automation, machine learning | A.I., AI-powered, automated, ML, ChatGPT, GPT |
| **Regulation & Power** | regulation, oversight, accountability, emergency powers | regulate, regulatory, watchdog, checks and balances |
| **Energy & Climate** | energy independence, renewable energy, fossil fuels, climate change | clean energy, oil, gas, solar, climate crisis |
| **Privacy & Surveillance** | surveillance, privacy, data collection, tracking, encryption | monitoring, spying, private data, encrypted |
| **Economic Issues** | inflation, economic freedom, wealth inequality, cost of living | prices rising, income gap, affordable, recession |
| **Digital Governance** | decentralization, cryptocurrency, blockchain, big tech | crypto, bitcoin, web3, tech giants, digital currency |
| **Civil Liberties** | free speech, rights, censorship, protest, dissent | freedom of speech, civil rights, demonstration, activism |
| **Institutional Trust** | institutions, transparency, corruption, trust | institutional, transparent, corrupt, trustworthy |

---

## 🎯 Usage

### First-Time Setup

1. **Click "Fetch Latest Data"** to collect initial articles
   - RSS feeds work immediately (no setup required)
   - Guardian API works with free tier key (50 requests/day)

2. **Open Settings** (gear icon in header) to:
   - Add/remove news outlets
   - Customize semantic clusters
   - Add your Guardian API key

3. **Toggle Dark Mode** via the sun/moon icon in the header

### Analyzing Media Coverage

#### Interactive Heatmap
- **Colors**: Light yellow (1–4 matches) → Dark amber (40+ matches)
- **Click any cell**: See detailed article breakdown for that outlet/cluster combination
- **Rows**: Semantic clusters (phrase groups)
- **Columns**: News outlets (active only)

#### Sentiment Bar Graph
- Each heatmap cell includes a **stacked sentiment bar** showing the proportion of:
  - 🟢 **Positive** articles (green region)
  - ⬜ **Neutral** articles (gray region)
  - 🔴 **Negative** articles (red region)
- Hover or click a cell to see the exact sentiment breakdown per article
- Useful for comparing how two outlets cover the same topic with different emotional framing

#### Trend Analysis
- Click **"View Trends"** on any cluster row to open the Trends Modal
- Displays a time-series chart of coverage volume across all outlets over the selected date range
- Identify when a story peaked or which outlet drove a narrative spike

#### Controls
- **Include phrase variations**: Toggle between exact matches only or include variations
- **Date range selector**: Analyze last 7, 14, 30, or 90 days
- **Fetch Latest Data**: Update with newest articles from configured outlets

#### Stats Cards
- Summary cards at the top of the dashboard show: total articles stored, active outlets, active clusters, and total phrase matches

#### Article Details
When you click a heatmap cell:
- See all articles mentioning those phrases from that outlet
- View matched phrases highlighted per article
- Read article descriptions and metadata
- Click "Read article" to visit original source

### Adding Custom Outlets

1. Click **Settings** → **News Outlets** tab
2. Click **Add Outlet**
3. Fill in:
   - **ID**: Unique identifier (e.g., `politico-rss`)
   - **Short Name**: Display name for heatmap (e.g., `Politico`)
   - **Full Name**: Full outlet name (e.g., `Politico`)
   - **Type**: RSS Feed or Guardian API
   - **Endpoint URL**: RSS feed URL (e.g., `https://www.politico.com/rss/politics08.xml`)
   - **Color**: Visual identifier (color picker)
   - **Enabled**: Check to include in fetch/heatmap
4. Click **Save**

#### Finding RSS Feeds
Most news sites publish RSS feeds:
- Look for RSS icon on site footer
- Try common URLs: `https://example.com/rss`, `/feed`, `/rss.xml`
- Search: `"[outlet name] RSS feed"`

### Adding Custom Semantic Clusters

1. Click **Settings** → **Semantic Clusters** tab
2. Click **Add Cluster**
3. Fill in:
   - **ID**: Unique identifier (e.g., `immigration`)
   - **Display Name**: Shown in heatmap (e.g., `Immigration Policy`)
   - **Exact phrases**: Comma-separated (e.g., `immigration, border security, asylum`)
   - **Variations**: Comma-separated alternatives (e.g., `immigrant, migrants, undocumented`)
4. Click **Save**

### Tips for Effective Analysis

**Comparative Framing Studies**
- Add outlets from different political perspectives
- Track how they frame the same events differently
- Example: Create an "Immigration" cluster and compare AP vs. Vox

**Sentiment Framing Analysis**
- Watch for outlets that match in phrase volume but diverge in sentiment bar color
- A high-volume, red-dominated cell suggests heavy negative framing vs. a high-volume green cell indicating positive coverage of the same topic

**Temporal Trend Analysis**
- Fetch data regularly (daily or weekly)
- Use the Trends Modal with a 90-day range to see long-term shifts
- Watch for spikes when major events occur

**Emerging Terminology**
- Add new phrases as they emerge (e.g., "ChatGPT" is already in the AI cluster)
- Track when mainstream media adopts new terms
- Remove outdated phrases to reduce noise

---

## 📁 Project Structure

```
narrative-lens-v3/
├── index.html                  # HTML entry point with Tailwind CDN
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── .env.local                  # Environment variables (gitignored)
└── src/
    ├── main.jsx                # React root render
    ├── App.jsx                 # Main application orchestrator
    ├── components/
    │   ├── Header.jsx          # App header with fetch, settings, dark mode controls
    │   ├── StatsCards.jsx      # Summary stat cards (articles, outlets, clusters, matches)
    │   ├── ControlBar.jsx      # Date range and phrase variation toggles
    │   ├── Heatmap.jsx         # Interactive phrase frequency heatmap
    │   ├── DetailModal.jsx     # Article drill-down modal
    │   ├── TrendsModal.jsx     # Time-series trend chart modal
    │   ├── SettingsPanel.jsx   # Tabbed settings panel (outlets, clusters, API key)
    │   ├── OutletEditor.jsx    # Form for adding/editing news outlets
    │   ├── ClusterEditor.jsx   # Form for adding/editing semantic clusters
    │   └── InfoBanner.jsx      # GettingStarted and Error banner components
    ├── utils/
    │   ├── calculations.js     # Heatmap + sentiment data calculation logic
    │   ├── sentiment.js        # Sentiment scoring engine
    │   ├── phraseMatching.js   # Phrase matching + HTML stripping utilities
    │   └── storage.js          # localStorage polyfill and persistence helpers
    └── constants/
        ├── defaultOutlets.js   # Pre-configured news outlet definitions
        ├── defaultClusters.js  # Pre-configured semantic cluster definitions
        └── sentimentLexicon.js # Positive/negative word lists for sentiment scoring
```

### Key State in App.jsx

| State | Description | Storage |
|-------|-------------|---------|
| `articles` | Fetched news articles | localStorage (shared) |
| `outlets` | User-configured news sources | localStorage (user) |
| `clusters` | User-defined phrase groups | localStorage (user) |
| `guardianKey` | Guardian API key | localStorage (user) |
| `heatmapData` | Calculated phrase frequencies | Derived (not stored) |
| `sentimentData` | Calculated sentiment breakdowns | Derived (not stored) |
| `darkMode` | Light/dark theme preference | localStorage |

---

## 🔍 How It Works

### Data Flow

1. **Fetch**: User clicks "Fetch Latest Data"
2. **Sources**: App requests articles from enabled outlets
   - **Guardian API**: Returns full article body text
   - **RSS via RSS2JSON**: Returns headlines, descriptions, links (HTML stripped via `phraseMatching.js`)
3. **Deduplicate**: New articles merged with existing (by ID)
4. **Store**: Combined articles saved to localStorage
5. **Calculate**: Heatmap and sentiment data computed via `calculations.js`
6. **Display**: Visual heatmap + sentiment bars + stats shown to user

### Phrase Matching Algorithm

```javascript
// For each article:
const text = `${headline} ${description} ${content}`;

// For each cluster:
const phrases = useVariations
  ? [...cluster.exact, ...cluster.variations]
  : cluster.exact;

// Case-insensitive substring matching:
const matches = phrases.filter(phrase =>
  text.toLowerCase().includes(phrase.toLowerCase())
);

// Count total matches for heatmap cell:
matchCount += matches.length;
```

### Sentiment Scoring

Sentiment is calculated in `utils/sentiment.js` using a lexicon-based approach. Each matched article is scored by counting positive and negative word hits from `constants/sentimentLexicon.js`, then normalized into a three-region proportion (positive / neutral / negative) rendered as a stacked bar graph per heatmap cell.

### Why Browser-Only?

**No Backend = Maximum Accessibility**
- ✅ No server deployment or maintenance
- ✅ No hosting costs
- ✅ Works offline after initial load
- ✅ Data privacy (nothing sent to external servers)
- ✅ Can be hosted on free static hosting (Netlify, GitHub Pages, Vercel)

**CORS-Compliant Architecture**
- ❌ NewsAPI blocks browser requests (CORS policy)
- ✅ Guardian API allows browser requests
- ✅ RSS2JSON handles CORS and XML parsing
- ✅ HTML content from RSS feeds stripped client-side via `stripHtml()`

---

## 🎨 Customization

### Changing Color Scheme

The app uses Tailwind CSS classes. To customize:

**Primary color** (currently amber):
```javascript
// Find and replace in component files:
bg-amber-600 → bg-blue-600
text-amber-600 → text-blue-600
border-amber-600 → border-blue-600
```

**Heatmap colors**:
```javascript
// In Heatmap.jsx → getHeatmapColor():
return '#f59e0b';  // Change to your color
```

**Sentiment bar colors**:
```javascript
// Positive: green region
// Neutral: gray region
// Negative: red region
// Update color values in calculations.js or Heatmap.jsx
```

### Extending the Sentiment Lexicon

Add words to `src/constants/sentimentLexicon.js`:
```javascript
export const SENTIMENT_LEXICON = {
  positive: ['improve', 'growth', 'success', /* add more */],
  negative: ['crisis', 'failure', 'collapse', /* add more */]
};
```

### Adding More Data Sources

The architecture supports additional APIs. To add GDELT:

```javascript
const gdeltOutlets = enabledOutlets.filter(o => o.type === 'gdelt');
for (const outlet of gdeltOutlets) {
  const url = `${outlet.endpoint}?query=...&format=json`;
  const res = await fetch(url);
  const data = await res.json();

  data.articles.forEach(item => {
    newArticles.push({
      id: `${outlet.id}-${item.url}`,
      outlet: outlet.id,
      headline: item.title,
      description: item.seendate,
      content: '',
      url: item.url,
      publishedAt: item.seendate,
      fetchedAt: new Date().toISOString()
    });
  });
}
```

### Exporting Data

Add an export button to download analysis:

```javascript
const exportData = () => {
  const csv = articles.map(a =>
    `"${a.outlet}","${a.headline}","${a.publishedAt}","${a.url}"`
  ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'narrative-lens-export.csv';
  a.click();
};
```

---

## 🚢 Deployment

### Option 1: Netlify (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables:
   - `VITE_GUARDIAN_KEY` = your-api-key
7. Deploy!

### Option 2: Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite settings
6. Add environment variable: `VITE_GUARDIAN_KEY`
7. Deploy!

### Option 3: GitHub Pages

```bash
# Build the app
npm run build

# The dist/ folder contains your static site
# Use GitHub Actions or manually push dist/ to gh-pages branch
```

**GitHub Actions workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Environment Variables in Production

**Netlify/Vercel**: Add in dashboard under "Environment Variables"

**GitHub Pages**: Use GitHub Secrets and inject during build:
```yaml
- run: npm run build
  env:
    VITE_GUARDIAN_KEY: ${{ secrets.GUARDIAN_KEY }}
```

---

## 🙏 Credits & Acknowledgments

### Upstream Technologies

This project is built on the shoulders of incredible open-source work:

#### Core Framework
- **[React](https://react.dev/)** - Meta Platforms, Inc. - UI library that powers the component architecture
- **[Vite](https://vitejs.dev/)** - Evan You & Vite team - Lightning-fast build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Tailwind Labs - Utility-first CSS framework for rapid styling

#### Icons & UI
- **[Lucide React](https://lucide.dev/)** - Lucide contributors - Beautiful, consistent icon set

#### Data Sources
- **[The Guardian Open Platform](https://open-platform.theguardian.com/)** - Guardian News & Media Limited - Free API providing full article text
- **[RSS2JSON](https://rss2json.com/)** - RSS2JSON team - CORS-friendly RSS feed converter
- **RSS/Atom Syndication** - Various news organizations providing open feeds

#### Development Tools
- **[Node.js](https://nodejs.org/)** - OpenJS Foundation - JavaScript runtime
- **[npm](https://www.npmjs.com/)** - npm, Inc. - Package manager
- **[Babel](https://babeljs.io/)** - Babel team - JavaScript transpiler
- **[ESBuild](https://esbuild.github.io/)** - Evan Wallace - Extremely fast bundler

### AI Development Assistants

This project was developed with invaluable assistance from multiple AI systems, each contributing unique strengths:

#### **[Perplexity AI](https://www.perplexity.ai/)**
- Primary development partner for architecture design and implementation
- Real-time web search capabilities for finding current RSS feeds and API documentation
- Iterative debugging and optimization of React components
- Generation of this comprehensive documentation

#### **[Claude](https://www.anthropic.com/claude)** (Anthropic)
- Early conceptual discussions about media framing analysis
- Semantic cluster design and phrase taxonomy
- Code review and best practices recommendations

#### **[ChatGPT](https://openai.com/chatgpt)** (OpenAI)
- Initial project ideation and use case exploration
- localStorage API design patterns
- Accessibility and UX considerations

#### **[Grok](https://x.ai/)** (xAI)
- Alternative perspectives on media bias detection
- Brainstorming additional data sources and integrations
- Humor injection (which didn't make it into the final code, but we tried)

**Why Multiple AI Systems?**
Each AI assistant has different training data, reasoning approaches, and strengths. By leveraging all four, this project benefited from diverse problem-solving strategies, cross-validation of technical decisions, broader coverage of edge cases, and more creative solutions to CORS and browser-only architecture challenges.

### Philosophical Influences

The core concept of analyzing media framing through language tracking draws inspiration from:
- **Linguistics & Media Studies**: Work on framing theory and discourse analysis
- **Open Source Intelligence (OSINT)**: Techniques for systematic media monitoring
- **Media Literacy Movements**: Efforts to help citizens critically evaluate news sources

### Special Thanks

- The open web and RSS specification for enabling decentralized news distribution
- Browser vendors for implementing increasingly powerful web APIs
- The React and Vite communities for building incredible developer experiences
- News organizations that publish RSS feeds and open APIs
- Everyone building tools for media transparency and literacy

---

## 📄 License

MIT License

Copyright (c) 2026 Narrative Lens Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🚀 Future Roadmap

### Short-Term (Next Version)
- [ ] Export analysis to CSV/JSON
- [ ] Search within articles
- [ ] Keyboard shortcuts for power users
- [ ] Sentiment trend lines overlaid on the Trends Modal chart

### Medium-Term
- [ ] GDELT integration for global news coverage
- [ ] Network graphs showing phrase co-occurrence
- [ ] Hypothesis testing framework ("Does outlet X use phrase Y more than outlet Z?")
- [ ] Annotation system (tag articles with notes)

### Long-Term
- [ ] Multi-user collaboration features
- [ ] Browser extension for one-click phrase highlighting on any news site
- [ ] AI-powered phrase suggestion based on current events
- [ ] Comparative framing visualizations (side-by-side article views)
- [ ] Academic research mode with citation export

---

## 🐛 Known Issues & Limitations

- **RSS2JSON Rate Limits**: Free tier limited to 10,000 requests/day (shared across all users)
- **Guardian API**: Free tier limited to 50 requests/day per key
- **No Real-Time Updates**: User must manually click "Fetch Latest Data"
- **localStorage Size**: Browsers typically limit to 5–10MB (can store ~5,000 articles)
- **Phrase Matching**: Substring matching doesn't understand context, negation, or proximity — only sentiment scoring accounts for emotional framing
- **Mobile UI**: Heatmap is optimized for desktop (mobile works but requires horizontal scrolling)

---

## 💬 Community & Support

- **Issues**: [GitHub Issues](https://github.com/Jay-Marksman/narrative-lens-v3/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jay-Marksman/narrative-lens-v3/discussions)

---

## 🎓 Educational Use

Narrative Lens is perfect for:
- **Media Literacy Courses**: Teaching students to analyze news framing
- **Journalism Programs**: Comparing coverage across outlets
- **Political Science Research**: Studying partisan media ecosystems
- **Sociology Studies**: Examining how language shapes public discourse
- **Data Journalism**: Visualizing media patterns and sentiment trends
- **Personal Media Diets**: Understanding your own news consumption biases

Educators: Feel free to use, modify, and teach with this tool. It's designed to be transparent and hackable.

---

**Built with curiosity, powered by open source, refined by AI collaboration. 🔍✨**
