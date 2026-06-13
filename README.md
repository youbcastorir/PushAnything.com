# PushAnything IPTV Website

**Premium Streaming Solutions For Modern Viewers**  
🌐 [pushanything.com](https://pushanything.com)  
💬 WhatsApp: [+212602321305](https://wa.me/212602321305)  
✉️ Email: salatrir@gmail.com

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Custom Domain Setup](#custom-domain-setup)
5. [SEO Guide](#seo-guide)
6. [Content Editing Guide](#content-editing-guide)
7. [Translation Guide](#translation-guide)
8. [WhatsApp Integration](#whatsapp-integration)
9. [Adding Blog Articles](#adding-blog-articles)
10. [Legal Compliance](#legal-compliance)

---

## Project Overview

PushAnything IPTV is a **marketing and lead-generation website** that promotes IPTV subscription services and directs visitors to WhatsApp for inquiries and orders.

### Key Features
- ✅ Multilingual: English, Arabic (RTL), French, Spanish
- ✅ 100 SEO-optimized blog articles
- ✅ 7 device setup guides
- ✅ WhatsApp integration on every page
- ✅ Progressive Web App (PWA) support
- ✅ Fully responsive / mobile-first
- ✅ Dark Netflix-inspired design
- ✅ Zero dependencies — pure HTML/CSS/JS
- ✅ GitHub Pages ready

### Legal Notice
This website is a **marketing and lead-generation platform only**. It does not host, rebroadcast, or distribute any copyrighted television content.

---

## File Structure

```
pushanything/
├── index.html          # Main HTML + SEO meta tags + Schema.org
├── style.css           # All styles (dark theme, responsive, RTL)
├── app.js              # Main app logic, routing, page rendering
├── translations.js     # All 4 languages (EN/AR/FR/ES)
├── pricing.js          # Subscription plan data
├── blog.js             # 100 blog article definitions
├── sitemap.xml         # XML sitemap for search engines
├── robots.txt          # Crawler directives
├── manifest.json       # PWA web app manifest
├── service-worker.js   # PWA offline caching
├── seo.json            # SEO metadata reference & topic clusters
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---

## GitHub Pages Deployment

### Option A: Deploy from main branch (Recommended)

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — PushAnything IPTV"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/pushanything.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select: `Deploy from a branch`
   - Branch: `main` | Folder: `/ (root)`
   - Click **Save**

4. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/pushanything/
   ```

### Option B: Deploy with GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Custom Domain Setup

### For pushanything.com:

1. **Create a `CNAME` file** in the project root:
   ```
   pushanything.com
   ```

2. **Configure DNS at your domain registrar:**
   | Type | Host | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | YOUR_USERNAME.github.io |

3. **In GitHub Pages settings:**
   - Enter `pushanything.com` in the Custom domain field
   - Check **Enforce HTTPS**

---

## SEO Guide

### What's Already Implemented

| SEO Feature | Status |
|------------|--------|
| Title tags per page | ✅ |
| Meta descriptions | ✅ |
| Canonical URLs | ✅ |
| hreflang tags (EN/AR/FR/ES) | ✅ |
| Open Graph tags | ✅ |
| Twitter/X Card tags | ✅ |
| Schema.org Organization | ✅ |
| Schema.org Service | ✅ |
| Schema.org FAQPage | ✅ |
| Schema.org WebSite | ✅ |
| sitemap.xml | ✅ |
| robots.txt | ✅ |
| Mobile-first responsive | ✅ |
| Fast loading (no heavy deps) | ✅ |
| 100 keyword-targeted articles | ✅ |
| Topic clusters | ✅ |
| Internal linking | ✅ |
| Multilingual metadata | ✅ |

### SEO Keyword Targets

**English:**
- `IPTV subscription` — Primary commercial keyword
- `IPTV setup guide` — High-intent informational
- `Smart TV streaming` — Device-specific
- `IPTV Android TV`, `IPTV iPhone`, `IPTV Windows` — Device pages
- `fix IPTV buffering` — Troubleshooting traffic

**Arabic:** اشتراك IPTV | إعداد IPTV | خدمات البث التلفزيوني  
**French:** abonnement IPTV | service IPTV | installer IPTV  
**Spanish:** suscripción IPTV | servicio IPTV | instalar IPTV  

### Topic Clusters (Internal Linking Strategy)

```
PILLAR: "IPTV Setup Guide"
  └── Smart TV IPTV Setup
  └── Android TV IPTV Setup
  └── Fire TV Stick IPTV Guide
  └── iPhone/iPad IPTV Setup
  └── Windows IPTV Setup
  └── Mac IPTV Setup

PILLAR: "IPTV Troubleshooting"
  └── Fix IPTV Buffering
  └── IPTV Black Screen Fix
  └── IPTV App Crashing Fix

PILLAR: "IPTV Technology"
  └── What is IPTV
  └── IPTV vs Cable TV
  └── 4K IPTV Streaming
```

### Google Search Console Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://pushanything.com`
3. Verify via DNS TXT record
4. Submit sitemap: `https://pushanything.com/sitemap.xml`

### Google Analytics Setup

Add before `</head>` in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Content Editing Guide

### Update Contact Information

In `app.js`, top of file:
```javascript
const WA_NUMBER = "212602321305";   // WhatsApp number (no + or spaces)
const EMAIL = "salatrir@gmail.com"; // Email address
```

### Update Subscription Plans

In `pricing.js`, edit the `PLANS` array:
```javascript
{
  id: "monthly",
  key: "monthly",        // Matches translation key
  badge: null,           // or "popular"
  savings: null,         // or "~25%"
  features: [...]        // List of included features
}
```

### Add a New Device Guide

In `app.js`, find `renderDeviceGuide()` and add to the `guides` object:
```javascript
"my-device": {
  icon: "📱",
  title: "My Device IPTV Setup Guide",
  steps: [
    "Step 1 description",
    "Step 2 description",
    // ...
  ]
}
```

Also add to the devices list in `renderDevices()`.

---

## Translation Guide

All translations are in `translations.js`. To edit or add a language:

### Edit Existing Translation

Open `translations.js` and find the language object (`en`, `ar`, `fr`, or `es`). Edit any value:

```javascript
en: {
  hero: {
    title: "Your New Headline Here",  // ← Edit this
    subtitle: "Your new subtitle...",
  }
}
```

### Add a New Language

1. Copy the `en` block in `translations.js`
2. Rename it to your language code (e.g., `de` for German)
3. Translate all values
4. Add `dir: "ltr"` (or `"rtl"` for RTL languages)
5. Add the language button in `renderHeader()` in `app.js`:
   ```javascript
   ${["en","ar","fr","es","de"].map(l => ...)}
   ```

### RTL Language Support

Arabic (`ar`) automatically enables RTL mode via:
```javascript
ar: {
  dir: "rtl",   // ← This triggers RTL layout
  ...
}
```

The CSS handles all RTL adjustments automatically with `[dir="rtl"]` selectors.

---

## WhatsApp Integration

### WhatsApp URL Format
```
https://wa.me/212602321305?text=Your+pre-filled+message
```

### Change WhatsApp Number

In `app.js`:
```javascript
const WA_NUMBER = "212602321305"; // Replace with your number (no + or spaces)
```

### Pre-filled Messages

In `translations.js` for each language:
```javascript
whatsapp: {
  orderMessage: "Hi! I'd like to order an IPTV subscription.",
  supportMessage: "Hi! I need help with my IPTV subscription.",
  generalMessage: "Hi! I'd like to learn more about PushAnything IPTV."
}
```

---

## Adding Blog Articles

In `blog.js`, add to the `BLOG_ARTICLES` array:

```javascript
{
  id: 101,                                    // Unique ID (increment)
  slug: "your-article-url-slug",              // URL-friendly slug
  category: "setup",                          // setup|smart-tv|android-tv|troubleshooting|tips|technology
  lang: "en",                                 // en|ar|fr|es
  title: "Your SEO Article Title",
  excerpt: "Short 1-2 sentence description for search results.",
  keywords: ["keyword 1", "keyword 2"],       // Target keywords
  readTime: 8,                                // Estimated read time in minutes
  date: "2025-01-01"                          // Publication date
}
```

To add article **body content**, edit `generateArticleContent()` in `app.js`.

---

## Legal Compliance

This website:
- ✅ Does NOT host any streaming content
- ✅ Does NOT rebroadcast copyrighted television
- ✅ Does NOT distribute video content
- ✅ Acts as a marketing/lead-gen intermediary only
- ✅ Includes legal disclaimer in footer and dedicated Disclaimer page
- ✅ Includes Privacy Policy and Terms of Service pages

**Important:** Always consult a legal professional regarding IPTV service regulations in your jurisdiction before operating this business.

---

## Performance Tips

- The site is 100% static — no server required
- All scripts are deferred via placement at end of `<body>`
- CSS uses `will-change: transform` sparingly for animations
- Service worker caches all assets for offline use
- No external dependencies except Google Fonts

---

## Support

For technical questions about this website:  
💬 WhatsApp: [wa.me/212602321305](https://wa.me/212602321305)  
✉️ Email: salatrir@gmail.com

---

*© 2024 PushAnything.com — All rights reserved.*
