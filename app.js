// PushAnything IPTV - Main Application
const WA_NUMBER = "212602321305";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const EMAIL = "salatrir@gmail.com";

// ─── Language Management ───────────────────────────────────────────────────
let currentLang = localStorage.getItem("pa_lang") || "en";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("pa_lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = TRANSLATIONS[lang].dir;
  renderApp();
}

function t(path) {
  const keys = path.split(".");
  let obj = TRANSLATIONS[currentLang];
  for (const k of keys) { if (obj) obj = obj[k]; }
  return obj || path;
}

// ─── Router ────────────────────────────────────────────────────────────────
function getPage() {
  const hash = location.hash.replace("#", "") || "home";
  return hash.split("/")[0];
}

function getSubPage() {
  const parts = location.hash.replace("#", "").split("/");
  return parts[1] || null;
}

function navigate(page, sub) {
  location.hash = sub ? `${page}/${sub}` : page;
}

window.addEventListener("hashchange", renderApp);
window.addEventListener("load", renderApp);

// ─── WhatsApp Helpers ──────────────────────────────────────────────────────
function waLink(msg) {
  return `${WA_BASE}?text=${encodeURIComponent(msg || t("whatsapp.generalMessage"))}`;
}

function waOrderLink(plan) {
  const msg = `Hi! I'd like to order the ${plan} IPTV plan from PushAnything.com`;
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
}

// ─── Header ────────────────────────────────────────────────────────────────
function renderHeader() {
  const nav = [
    { key: "home", hash: "home" },
    { key: "plans", hash: "plans" },
    { key: "devices", hash: "devices" },
    { key: "blog", hash: "blog" },
    { key: "faq", hash: "faq" },
    { key: "contact", hash: "contact" }
  ];
  const page = getPage();
  return `
  <header class="site-header" id="top">
    <div class="header-inner container">
      <a href="#home" class="logo" aria-label="PushAnything IPTV Home">
        <span class="logo-icon">▶</span>
        <span class="logo-text">Push<span class="logo-accent">Anything</span></span>
      </a>
      <nav class="main-nav" role="navigation" aria-label="Main navigation">
        ${nav.map(item => `
          <a href="#${item.hash}" class="nav-link${page === item.hash ? " active" : ""}">${t("nav." + item.key)}</a>
        `).join("")}
      </nav>
      <div class="header-actions">
        <div class="lang-switcher" role="navigation" aria-label="Language selector">
          ${["en","ar","fr","es"].map(l => `
            <button class="lang-btn${currentLang === l ? " active" : ""}" onclick="setLang('${l}')" aria-label="Switch to ${l}">${l.toUpperCase()}</button>
          `).join("")}
        </div>
        <a href="${waLink(t("whatsapp.orderMessage"))}" target="_blank" rel="noopener" class="btn btn-wa header-wa">
          <span class="wa-icon">💬</span> ${t("nav.orderNow")}
        </a>
        <button class="menu-toggle" onclick="toggleMenu()" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav">
      ${nav.map(item => `
        <a href="#${item.hash}" class="mobile-nav-link${page === item.hash ? " active" : ""}" onclick="closeMobileMenu()">${t("nav." + item.key)}</a>
      `).join("")}
      <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-wa mobile-wa" onclick="closeMobileMenu()">💬 WhatsApp</a>
    </div>
  </header>`;
}

function toggleMenu() {
  const nav = document.getElementById("mobileNav");
  const btn = document.querySelector(".menu-toggle");
  nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", nav.classList.contains("open"));
}

function closeMobileMenu() {
  document.getElementById("mobileNav")?.classList.remove("open");
}

// ─── Footer ────────────────────────────────────────────────────────────────
function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-top container">
      <div class="footer-brand">
        <a href="#home" class="logo footer-logo">
          <span class="logo-icon">▶</span>
          <span class="logo-text">Push<span class="logo-accent">Anything</span></span>
        </a>
        <p class="footer-tagline">${t("footer.tagline")}</p>
        <div class="footer-contact-cards">
          <a href="${waLink()}" target="_blank" rel="noopener" class="footer-contact-card wa-card">
            <span class="fc-icon">💬</span>
            <span class="fc-label">WhatsApp</span>
            <span class="fc-value">+212 602 321 305</span>
          </a>
          <a href="mailto:${EMAIL}" class="footer-contact-card email-card">
            <span class="fc-icon">✉️</span>
            <span class="fc-label">Email</span>
            <span class="fc-value">${EMAIL}</span>
          </a>
        </div>
      </div>
      <div class="footer-links-col">
        <h4>${t("footer.links")}</h4>
        <a href="#home">${t("nav.home")}</a>
        <a href="#plans">${t("nav.plans")}</a>
        <a href="#devices">${t("nav.devices")}</a>
        <a href="#blog">${t("nav.blog")}</a>
      </div>
      <div class="footer-links-col">
        <h4>${t("footer.support")}</h4>
        <a href="#faq">${t("nav.faq")}</a>
        <a href="#contact">${t("nav.contact")}</a>
        <a href="${waLink(t("whatsapp.supportMessage"))}" target="_blank" rel="noopener">WhatsApp Support</a>
        <a href="mailto:${EMAIL}">Email Support</a>
      </div>
      <div class="footer-links-col">
        <h4>${t("footer.legal")}</h4>
        <a href="#privacy">${t("footer.privacy")}</a>
        <a href="#terms">${t("footer.terms")}</a>
        <a href="#disclaimer">${t("footer.disclaimer")}</a>
      </div>
    </div>
    <div class="footer-bottom container">
      <p class="footer-legal-note">${t("footer.legalNote")}</p>
      <p class="footer-copyright">${t("footer.copyright")}</p>
    </div>
  </footer>`;
}

// ─── Floating WhatsApp Button ──────────────────────────────────────────────
function renderFloatingWA() {
  return `
  <a href="${waLink()}" target="_blank" rel="noopener" class="floating-wa" aria-label="Chat on WhatsApp" title="${t("whatsapp.floating")}">
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    <span class="floating-wa-label">${t("whatsapp.floating")}</span>
  </a>`;
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────
function renderHome() {
  const benefits = [
    { icon: "🎬", key: "b1" },
    { icon: "📱", key: "b2" },
    { icon: "📡", key: "b3" },
    { icon: "⚡", key: "b4" },
    { icon: "💬", key: "b5" },
    { icon: "💳", key: "b6" }
  ];

  const deviceIcons = {
    "Smart TV": "📺", "Android TV": "🖥️", "Android Phone": "📱",
    "iPhone & iPad": "🍎", "Windows PC": "💻", "Mac": "🖥️", "Fire TV Stick": "🔥",
    "تلفزيون ذكي": "📺", "Android TV": "🖥️", "هاتف أندرويد": "📱",
    "iPhone وiPad": "🍎", "ويندوز": "💻", "ماك": "🖥️", "Fire TV Stick": "🔥",
    "Téléphone Android": "📱", "iPhone et iPad": "🍎", "Windows": "💻", "Mac": "🖥️",
    "Teléfono Android": "📱", "iPhone y iPad": "🍎"
  };

  const devList = t("devices.list");

  return `
  <!-- HERO -->
  <section class="hero" aria-label="Hero">
    <div class="hero-bg">
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-grid"></div>
    </div>
    <div class="hero-inner container">
      <div class="hero-content">
        <div class="hero-badge"><span class="badge-dot"></span>${t("hero.badge")}</div>
        <h1 class="hero-title">${t("hero.title")} <span class="hero-accent">${t("hero.titleAccent")}</span></h1>
        <p class="hero-subtitle">${t("hero.subtitle")}</p>
        <div class="hero-actions">
          <a href="${waLink(t("whatsapp.orderMessage"))}" target="_blank" rel="noopener" class="btn btn-wa btn-lg pulse-wa">
            <span>💬</span> ${t("hero.cta")}
          </a>
          <a href="#plans" class="btn btn-outline btn-lg">${t("hero.ctaSecondary")} →</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><span class="stat-num">${t("hero.stat1")}</span><span class="stat-label">${t("hero.stat1Label")}</span></div>
          <div class="stat-divider"></div>
          <div class="hero-stat"><span class="stat-num">${t("hero.stat2")}</span><span class="stat-label">${t("hero.stat2Label")}</span></div>
          <div class="stat-divider"></div>
          <div class="hero-stat"><span class="stat-num">${t("hero.stat3")}</span><span class="stat-label">${t("hero.stat3Label")}</span></div>
          <div class="stat-divider"></div>
          <div class="hero-stat"><span class="stat-num">${t("hero.stat4")}</span><span class="stat-label">${t("hero.stat4Label")}</span></div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="tv-mockup">
          <div class="tv-screen">
            <div class="tv-play-icon">▶</div>
            <div class="tv-bars">
              <div class="tv-bar"></div><div class="tv-bar"></div><div class="tv-bar"></div>
            </div>
          </div>
          <div class="tv-stand"></div>
        </div>
        <div class="device-orbit">
          <div class="orbit-device od-1">📱</div>
          <div class="orbit-device od-2">💻</div>
          <div class="orbit-device od-3">🔥</div>
          <div class="orbit-device od-4">🍎</div>
        </div>
      </div>
    </div>
  </section>

  <!-- BENEFITS -->
  <section class="benefits section" aria-labelledby="benefits-title">
    <div class="container">
      <div class="section-header">
        <h2 id="benefits-title">${t("benefits.title")}</h2>
        <p>${t("benefits.subtitle")}</p>
      </div>
      <div class="benefits-grid">
        ${benefits.map(b => `
          <article class="benefit-card">
            <div class="benefit-icon">${b.icon}</div>
            <h3>${t("benefits." + b.key + "Title")}</h3>
            <p>${t("benefits." + b.key + "Desc")}</p>
          </article>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- DEVICES STRIP -->
  <section class="devices-strip section" aria-labelledby="devices-title">
    <div class="container">
      <div class="section-header">
        <h2 id="devices-title">${t("devices.title")}</h2>
        <p>${t("devices.subtitle")}</p>
      </div>
      <div class="devices-grid">
        ${devList.map(d => `
          <div class="device-chip">
            <span class="device-chip-icon">${deviceIcons[d] || "📺"}</span>
            <span>${d}</span>
          </div>
        `).join("")}
      </div>
      <div class="devices-cta">
        <a href="#devices" class="btn btn-outline">View Device Setup Guides →</a>
      </div>
    </div>
  </section>

  <!-- PLANS PREVIEW -->
  <section class="plans-preview section" aria-labelledby="plans-preview-title">
    <div class="container">
      <div class="section-header">
        <h2 id="plans-preview-title">${t("plans.title")}</h2>
        <p>${t("plans.subtitle")}</p>
      </div>
      ${renderPlansGrid(true)}
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="cta-banner section" aria-label="Call to action">
    <div class="container">
      <div class="cta-inner">
        <div class="cta-content">
          <h2>Ready to Start Streaming?</h2>
          <p>Message us on WhatsApp right now and get your subscription set up in minutes.</p>
        </div>
        <div class="cta-actions">
          <a href="${waLink(t("whatsapp.orderMessage"))}" target="_blank" rel="noopener" class="btn btn-wa btn-xl pulse-wa">
            💬 ${t("hero.cta")}
          </a>
          <a href="mailto:${EMAIL}" class="btn btn-outline-light">✉️ ${t("contact.email")}</a>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── PLANS PAGE ────────────────────────────────────────────────────────────
function renderPlansGrid(preview = false) {
  const planLabels = {
    monthly: t("plans.monthly"),
    quarterly: t("plans.quarterly"),
    semiAnnual: t("plans.semiAnnual"),
    annual: t("plans.annual")
  };
  const featureLabels = {
    hd: "HD & Full HD Streaming",
    uhd: "4K Ultra HD Content",
    devices: (v) => `Up to ${v} Device${v > 1 ? "s" : ""}`,
    support: "24/7 WhatsApp Support",
    setup: "Free Setup Assistance",
    updates: "Regular Updates",
    epg: "Electronic Program Guide",
    vod: "VOD Library Access"
  };

  return `
  <div class="plans-grid${preview ? " plans-preview-grid" : ""}">
    ${PLANS.map(plan => `
      <article class="plan-card${plan.highlight ? " plan-highlight" : ""}">
        ${plan.badge === "popular" ? `<div class="plan-badge">${t("plans.popular")}</div>` : ""}
        ${plan.savings ? `<div class="plan-savings">${t("plans.save")} ${plan.savings}</div>` : ""}
        <div class="plan-header">
          <h3 class="plan-name">${planLabels[plan.key]}</h3>
          <div class="plan-price">
            <span class="price-label">${t("plans.contactForPrice")}</span>
          </div>
        </div>
        <ul class="plan-features">
          ${plan.features.map(f => {
            const label = typeof featureLabels[f.key] === "function"
              ? featureLabels[f.key](f.value)
              : featureLabels[f.key] || f.key;
            return `<li class="${f.icon === "✗" ? "feature-no" : "feature-yes"}">
              <span class="feature-icon">${f.icon}</span>
              <span>${label}</span>
            </li>`;
          }).join("")}
        </ul>
        <a href="${waOrderLink(planLabels[plan.key])}" target="_blank" rel="noopener" class="btn btn-wa btn-block">
          💬 ${t("plans.orderWhatsApp")}
        </a>
      </article>
    `).join("")}
  </div>`;
}

function renderPlans() {
  return `
  <section class="page-hero section">
    <div class="container">
      <div class="section-header">
        <h1>${t("plans.title")}</h1>
        <p>${t("plans.subtitle")}</p>
      </div>
    </div>
  </section>
  <section class="plans-section section">
    <div class="container">
      ${renderPlansGrid(false)}
      <div class="plans-wa-note">
        <div class="wa-note-inner">
          <div class="wa-note-icon">💬</div>
          <div>
            <h3>Have questions about plans?</h3>
            <p>Our team is available 24/7 on WhatsApp to help you choose the right plan and get started.</p>
          </div>
          <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-wa">Chat Now</a>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── DEVICES PAGE ──────────────────────────────────────────────────────────
function renderDevices() {
  const sub = getSubPage();
  if (sub) return renderDeviceGuide(sub);

  const guides = [
    { slug: "smart-tv", icon: "📺", title: "Smart TV", desc: "Samsung, LG, Sony, Hisense, TCL and more" },
    { slug: "android-tv", icon: "🖥️", title: "Android TV", desc: "NVIDIA SHIELD, Mi Box, Chromecast, and Android boxes" },
    { slug: "android-phone", icon: "📱", title: "Android Phone & Tablet", desc: "All Android smartphones and tablets" },
    { slug: "iphone-ipad", icon: "🍎", title: "iPhone & iPad", desc: "All iOS and iPadOS devices" },
    { slug: "windows", icon: "💻", title: "Windows PC", desc: "Windows 10 and Windows 11 computers" },
    { slug: "mac", icon: "🖥️", title: "Mac", desc: "MacBook, iMac, Mac Mini — all macOS devices" },
    { slug: "fire-tv", icon: "🔥", title: "Fire TV Stick", desc: "All Amazon Fire TV Stick models" }
  ];

  return `
  <section class="page-hero section">
    <div class="container">
      <div class="section-header">
        <h1>${t("devices.title")}</h1>
        <p>${t("devices.subtitle")}</p>
      </div>
    </div>
  </section>
  <section class="device-guides section">
    <div class="container">
      <div class="device-cards-grid">
        ${guides.map(g => `
          <a href="#devices/${g.slug}" class="device-guide-card">
            <div class="dgc-icon">${g.icon}</div>
            <div class="dgc-content">
              <h3>${g.title}</h3>
              <p>${g.desc}</p>
            </div>
            <span class="dgc-arrow">→</span>
          </a>
        `).join("")}
      </div>
    </div>
  </section>`;
}

function renderDeviceGuide(slug) {
  const guides = {
    "smart-tv": {
      icon: "📺", title: "Smart TV IPTV Setup Guide",
      steps: [
        "Open your Smart TV's app store (Samsung App Store, LG Content Store, Google Play, etc.)",
        "Search for an IPTV player app (e.g., Smart IPTV, IPTV Smarters, or TiviMate)",
        "Install the app and open it",
        "Navigate to the 'Add Playlist' or 'Add Account' section",
        "Enter the M3U URL or Xtream Codes credentials provided after subscribing",
        "Wait for channels to load — this may take a few minutes",
        "Browse your channel list and start watching!",
        "Need help? Message us on WhatsApp — we guide you through every step."
      ]
    },
    "android-tv": {
      icon: "🖥️", title: "Android TV Box IPTV Setup Guide",
      steps: [
        "Open Google Play Store on your Android TV device",
        "Search for 'TiviMate' or 'IPTV Smarters Pro' and install",
        "Open the IPTV app after installation",
        "Select 'Add Playlist' or 'Xtream Codes API'",
        "Enter your subscription credentials as provided",
        "Allow channels to sync (may take 1–3 minutes)",
        "Configure EPG (Electronic Program Guide) for a TV guide",
        "Contact us on WhatsApp for full guided setup assistance."
      ]
    },
    "android-phone": {
      icon: "📱", title: "Android Phone & Tablet IPTV Setup",
      steps: [
        "Open Google Play Store on your Android device",
        "Install 'IPTV Smarters Pro' or 'GSE Smart IPTV'",
        "Launch the app and tap 'Add New User' or 'Add Playlist'",
        "Choose 'Load Your Playlist or File/URL' option",
        "Enter the M3U URL or Xtream login details from your subscription",
        "Tap 'Add User' and wait for channels to load",
        "Tap any channel to start streaming",
        "Message us on WhatsApp for instant setup support."
      ]
    },
    "iphone-ipad": {
      icon: "🍎", title: "iPhone & iPad IPTV Setup Guide",
      steps: [
        "Open the App Store on your iPhone or iPad",
        "Search for 'GSE Smart IPTV' or 'IPTV Smarters' and install",
        "Open the app and go to 'Remote Playlists' or 'Add Playlist'",
        "Enter your M3U URL or Xtream Codes credentials",
        "Tap 'Add' and allow the channels to load",
        "Tap any channel from the list to begin streaming",
        "For best performance, connect to Wi-Fi when possible",
        "Need help? We're available 24/7 on WhatsApp."
      ]
    },
    "windows": {
      icon: "💻", title: "Windows PC IPTV Setup Guide",
      steps: [
        "Download 'VLC Media Player' from videolan.org or 'IPTV Smarters' from the Microsoft Store",
        "Install and open the IPTV player",
        "In VLC: go to Media → Open Network Stream → enter your M3U URL",
        "In IPTV Smarters: click 'Add User', select 'M3U URL', and paste your playlist link",
        "Click OK or Load Playlist and wait for channels to appear",
        "Double-click any channel to start streaming",
        "Adjust video output settings for best quality",
        "Contact us on WhatsApp for personalized setup guidance."
      ]
    },
    "mac": {
      icon: "🖥️", title: "Mac (macOS) IPTV Setup Guide",
      steps: [
        "Download VLC for Mac from videolan.org",
        "Install and launch VLC",
        "Click 'File' → 'Open Network…' in the menu bar",
        "Paste your M3U playlist URL into the URL field",
        "Click 'Open' and your channels will begin loading",
        "Alternatively, download IPTV Smarters from the Mac App Store",
        "Configure with your Xtream Codes credentials for easier navigation",
        "Message us on WhatsApp and we'll guide you through every step."
      ]
    },
    "fire-tv": {
      icon: "🔥", title: "Amazon Fire TV Stick IPTV Setup Guide",
      steps: [
        "On your Fire TV Stick, go to Settings → My Fire TV → Developer Options",
        "Enable 'Apps from Unknown Sources'",
        "Go back to Home and open the Search function",
        "Search for 'Downloader' app and install it",
        "Open Downloader and enter the download URL for IPTV Smarters APK",
        "Install the APK and open IPTV Smarters",
        "Enter your subscription credentials (M3U URL or Xtream Codes)",
        "All done! Contact us on WhatsApp for full sideloading assistance."
      ]
    }
  };

  const guide = guides[slug] || guides["smart-tv"];

  return `
  <section class="page-hero section">
    <div class="container">
      <a href="#devices" class="back-link">← Back to Devices</a>
      <div class="section-header">
        <div class="guide-icon-large">${guide.icon}</div>
        <h1>${guide.title}</h1>
      </div>
    </div>
  </section>
  <section class="device-guide-content section">
    <div class="container guide-layout">
      <div class="guide-steps">
        <h2>Step-by-Step Setup</h2>
        <ol class="steps-list">
          ${guide.steps.map((step, i) => `
            <li class="step-item">
              <div class="step-num">${i + 1}</div>
              <div class="step-text">${step}</div>
            </li>
          `).join("")}
        </ol>
      </div>
      <aside class="guide-sidebar">
        <div class="sidebar-wa-card">
          <div class="swa-icon">💬</div>
          <h3>Need Help Setting Up?</h3>
          <p>Our support team is available 24/7 on WhatsApp to walk you through the setup process live.</p>
          <a href="${waLink("Hi! I need help setting up IPTV on my " + guide.title.replace(" IPTV Setup Guide","").replace(" Setup Guide",""))}" target="_blank" rel="noopener" class="btn btn-wa btn-block">
            Chat on WhatsApp
          </a>
        </div>
        <div class="sidebar-plans-card">
          <h3>Get Your Subscription</h3>
          <p>Don't have a subscription yet? Order directly via WhatsApp.</p>
          <a href="${waLink(t("whatsapp.orderMessage"))}" target="_blank" rel="noopener" class="btn btn-outline btn-block">
            View Plans →
          </a>
        </div>
      </aside>
    </div>
  </section>`;
}

// ─── BLOG PAGE ─────────────────────────────────────────────────────────────
function renderBlog() {
  const sub = getSubPage();
  if (sub) return renderArticle(sub);

  const langFilter = currentLang;
  const articles = BLOG_ARTICLES.filter(a => {
    if (langFilter === "en") return a.lang === "en";
    if (langFilter === "ar") return a.lang === "ar" || a.lang === "en";
    if (langFilter === "fr") return a.lang === "fr" || a.lang === "en";
    if (langFilter === "es") return a.lang === "es" || a.lang === "en";
    return true;
  }).slice(0, 24);

  const catLabel = (c) => {
    const map = { en: "labelEn", ar: "labelAr", fr: "labelFr", es: "labelEs" };
    const cat = BLOG_CATEGORIES.find(bc => bc.id === c);
    return cat ? cat[map[currentLang] || "labelEn"] : c;
  };

  return `
  <section class="page-hero section">
    <div class="container">
      <div class="section-header">
        <h1>IPTV Blog & Guides</h1>
        <p>Expert guides, tutorials, and streaming tips to get the most from your IPTV subscription.</p>
      </div>
    </div>
  </section>
  <section class="blog-section section">
    <div class="container">
      <div class="blog-cats">
        ${BLOG_CATEGORIES.map(cat => `
          <button class="cat-pill" onclick="filterBlogCat('${cat.id}')">${cat.icon} ${cat[{en:"labelEn",ar:"labelAr",fr:"labelFr",es:"labelEs"}[currentLang]||"labelEn"]}</button>
        `).join("")}
      </div>
      <div class="blog-grid" id="blogGrid">
        ${articles.map(article => `
          <article class="blog-card">
            <div class="blog-card-cat">${catLabel(article.category)}</div>
            <h2 class="blog-card-title">
              <a href="#blog/${article.slug}">${article.title}</a>
            </h2>
            <p class="blog-card-excerpt">${article.excerpt}</p>
            <div class="blog-card-meta">
              <span class="blog-read-time">📖 ${article.readTime} min read</span>
              <span class="blog-date">${article.date}</span>
            </div>
            <div class="blog-card-footer">
              <a href="#blog/${article.slug}" class="btn btn-sm btn-outline">Read More →</a>
              <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-sm btn-wa-sm">💬 Ask Us</a>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="blog-load-more">
        <p>Showing ${articles.length} of ${BLOG_ARTICLES.length} articles</p>
        <a href="${waLink("Hi! I have a question about IPTV setup.")}" target="_blank" rel="noopener" class="btn btn-wa">💬 Can't find what you need? Ask on WhatsApp</a>
      </div>
    </div>
  </section>`;
}

function filterBlogCat(catId) {
  const grid = document.getElementById("blogGrid");
  if (!grid) return;
  const cards = grid.querySelectorAll(".blog-card");
  cards.forEach(card => {
    card.style.display = "flex";
  });
}

function renderArticle(slug) {
  const article = BLOG_ARTICLES.find(a => a.slug === slug || a.slug === decodeURIComponent(slug));
  if (!article) {
    return `<div class="container section"><a href="#blog" class="back-link">← Back to Blog</a><h1>Article not found</h1></div>`;
  }

  const related = BLOG_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  return `
  <section class="article-page section">
    <div class="container article-layout">
      <main class="article-main">
        <a href="#blog" class="back-link">← Back to Blog</a>
        <div class="article-cat-badge">${article.category.replace("-", " ").toUpperCase()}</div>
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
          <span>📖 ${article.readTime} min read</span>
          <span>📅 ${article.date}</span>
        </div>
        <div class="article-body">
          <p class="article-lead">${article.excerpt}</p>
          ${generateArticleContent(article)}
        </div>
        <div class="article-wa-cta">
          <h3>Need Expert Help?</h3>
          <p>Our team is ready to assist you on WhatsApp — from subscription setup to troubleshooting.</p>
          <a href="${waLink("Hi! I read your article about: " + article.title + " and need help.")}" target="_blank" rel="noopener" class="btn btn-wa btn-lg">
            💬 Chat with Us on WhatsApp
          </a>
        </div>
      </main>
      <aside class="article-sidebar">
        <div class="sidebar-wa-card">
          <div class="swa-icon">💬</div>
          <h3>Get Your IPTV Subscription</h3>
          <p>Ready to subscribe? Message us on WhatsApp for instant setup.</p>
          <a href="${waLink(t("whatsapp.orderMessage"))}" target="_blank" rel="noopener" class="btn btn-wa btn-block">Order Now</a>
        </div>
        ${related.length ? `
        <div class="sidebar-related">
          <h4>Related Articles</h4>
          ${related.map(r => `
            <a href="#blog/${r.slug}" class="related-article-link">
              <span class="related-title">${r.title}</span>
              <span class="related-meta">📖 ${r.readTime} min</span>
            </a>
          `).join("")}
        </div>` : ""}
      </aside>
    </div>
  </section>`;
}

function generateArticleContent(article) {
  const sections = [
    `<h2>Introduction</h2>
    <p>${article.excerpt} In this comprehensive guide, we'll walk you through everything you need to know to get started and make the most of your streaming experience.</p>`,
    `<h2>What You'll Need</h2>
    <ul>
      <li>A compatible device (Smart TV, Android TV, phone, tablet, or computer)</li>
      <li>A stable internet connection (minimum 10 Mbps recommended)</li>
      <li>An active IPTV subscription from PushAnything</li>
      <li>Your subscription credentials (M3U URL or Xtream Codes login)</li>
    </ul>`,
    `<h2>Step-by-Step Guide</h2>
    <p>Follow these steps carefully to ensure a smooth setup experience. If you encounter any issues, our WhatsApp support team is available 24/7 to assist you in real time.</p>
    <p>First, make sure your device is connected to the internet and that your connection speed meets the minimum requirements. A wired ethernet connection is always preferred over Wi-Fi for the most stable streaming experience.</p>
    <p>Next, download and install the appropriate IPTV player application for your device. We recommend IPTV Smarters Pro, TiviMate (Android TV), or GSE Smart IPTV (iOS) as they offer the best combination of features and stability.</p>`,
    `<h2>Tips for Best Performance</h2>
    <p>To get the most out of your IPTV subscription, keep these performance tips in mind:</p>
    <ul>
      <li><strong>Use a wired connection:</strong> Ethernet provides more stable speeds than Wi-Fi, especially for 4K content.</li>
      <li><strong>Close background apps:</strong> Free up device resources for smoother playback.</li>
      <li><strong>Restart your router occasionally:</strong> This clears cache and can improve connection stability.</li>
      <li><strong>Keep your app updated:</strong> Updates often include performance improvements and bug fixes.</li>
      <li><strong>Contact support if needed:</strong> Our WhatsApp team can diagnose and resolve most issues quickly.</li>
    </ul>`,
    `<h2>Troubleshooting Common Issues</h2>
    <p>If you experience buffering or connection problems, try these solutions:</p>
    <ul>
      <li>Check your internet speed — run a speed test to confirm you're getting adequate bandwidth</li>
      <li>Restart your streaming device and router</li>
      <li>Try switching between Wi-Fi and wired connection</li>
      <li>Clear the IPTV app's cache in your device settings</li>
      <li>Reinstall the IPTV player app</li>
    </ul>
    <p>Still having issues? Contact us directly on WhatsApp and we'll help you diagnose and fix the problem.</p>`,
    `<h2>Conclusion</h2>
    <p>With the right setup and a reliable subscription, IPTV delivers an exceptional streaming experience across all your devices. PushAnything IPTV is committed to providing the support and guidance you need to enjoy seamless streaming every day.</p>
    <p>Ready to get started or need help with your current subscription? Our team is just a WhatsApp message away.</p>`
  ];
  return sections.join("\n");
}

// ─── FAQ PAGE ──────────────────────────────────────────────────────────────
function renderFAQ() {
  const faqs = Array.from({ length: 8 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`)
  }));

  return `
  <section class="page-hero section">
    <div class="container">
      <div class="section-header">
        <h1>${t("faq.title")}</h1>
        <p>${t("faq.subtitle")}</p>
      </div>
    </div>
  </section>
  <section class="faq-section section">
    <div class="container faq-layout">
      <div class="faq-list">
        ${faqs.map((faq, i) => `
          <div class="faq-item" id="faq-${i}">
            <button class="faq-question" onclick="toggleFAQ(${i})" aria-expanded="false" aria-controls="faq-answer-${i}">
              <span>${faq.q}</span>
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer" id="faq-answer-${i}" role="region" hidden>
              <p>${faq.a}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <aside class="faq-sidebar">
        <div class="sidebar-wa-card">
          <div class="swa-icon">💬</div>
          <h3>Still Have Questions?</h3>
          <p>Ask us anything on WhatsApp — we respond fast and can help you in your preferred language.</p>
          <a href="${waLink("Hi! I have a question about PushAnything IPTV.")}" target="_blank" rel="noopener" class="btn btn-wa btn-block">Ask on WhatsApp</a>
        </div>
      </aside>
    </div>
  </section>`;
}

function toggleFAQ(i) {
  const answer = document.getElementById(`faq-answer-${i}`);
  const btn = document.querySelector(`#faq-${i} .faq-question`);
  const icon = btn.querySelector(".faq-icon");
  const isOpen = !answer.hidden;
  answer.hidden = isOpen;
  btn.setAttribute("aria-expanded", !isOpen);
  icon.textContent = isOpen ? "+" : "−";
  if (!isOpen) {
    document.querySelectorAll(".faq-answer").forEach((a, idx) => {
      if (idx !== i) {
        a.hidden = true;
        const b = document.querySelector(`#faq-${idx} .faq-question`);
        b?.setAttribute("aria-expanded", "false");
        const ic = b?.querySelector(".faq-icon");
        if (ic) ic.textContent = "+";
      }
    });
  }
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────
function renderContact() {
  return `
  <section class="page-hero section">
    <div class="container">
      <div class="section-header">
        <h1>${t("contact.title")}</h1>
        <p>${t("contact.subtitle")}</p>
      </div>
    </div>
  </section>
  <section class="contact-section section">
    <div class="container contact-layout">
      <div class="contact-cards">
        <a href="${waLink(t("whatsapp.generalMessage"))}" target="_blank" rel="noopener" class="contact-card wa-big-card">
          <div class="ccard-icon">💬</div>
          <div class="ccard-content">
            <h3>${t("contact.whatsapp")}</h3>
            <p>${t("contact.whatsappNumber")}</p>
            <span class="ccard-badge">Fastest Response</span>
          </div>
          <span class="ccard-arrow">→</span>
        </a>
        <a href="mailto:${EMAIL}" class="contact-card email-big-card">
          <div class="ccard-icon">✉️</div>
          <div class="ccard-content">
            <h3>${t("contact.email")}</h3>
            <p>${EMAIL}</p>
          </div>
          <span class="ccard-arrow">→</span>
        </a>
      </div>
      <div class="contact-form-wrapper">
        <h2>Send a Message</h2>
        <form class="contact-form" onsubmit="handleContactForm(event)" novalidate>
          <div class="form-group">
            <label for="cf-name">${t("contact.formName")}</label>
            <input type="text" id="cf-name" name="name" required autocomplete="name" placeholder="${t("contact.formName")}">
          </div>
          <div class="form-group">
            <label for="cf-email">${t("contact.formEmail")}</label>
            <input type="email" id="cf-email" name="email" required autocomplete="email" placeholder="${t("contact.formEmail")}">
          </div>
          <div class="form-group">
            <label for="cf-message">${t("contact.formMessage")}</label>
            <textarea id="cf-message" name="message" rows="5" required placeholder="${t("contact.formMessage")}"></textarea>
          </div>
          <button type="submit" class="btn btn-wa btn-block">${t("contact.formSend")}</button>
          <div class="form-success" id="formSuccess" hidden>${t("contact.formSuccess")}</div>
        </form>
      </div>
    </div>
  </section>`;
}

function handleContactForm(e) {
  e.preventDefault();
  const name = document.getElementById("cf-name").value;
  const email = document.getElementById("cf-email").value;
  const message = document.getElementById("cf-message").value;
  const waMsg = `Hi! My name is ${name} (${email}).\n\n${message}`;
  document.getElementById("formSuccess").hidden = false;
  setTimeout(() => { window.open(waLink(waMsg), "_blank"); }, 500);
}

// ─── SIMPLE LEGAL PAGES ────────────────────────────────────────────────────
function renderLegal(type) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: `<p>PushAnything.com respects your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.</p>
      <h2>Information We Collect</h2><p>We may collect your name, email address, and WhatsApp number when you contact us. We do not sell or share your personal data with third parties except as required by law.</p>
      <h2>Cookies</h2><p>This website uses minimal cookies solely to remember your language preference. No advertising or tracking cookies are used.</p>
      <h2>Contact</h2><p>For privacy concerns, email us at salatrir@gmail.com or message us on WhatsApp.</p>`
    },
    terms: {
      title: "Terms of Service",
      body: `<p>By using PushAnything.com, you agree to these terms. This website is a marketing and lead-generation platform. We facilitate connections between customers and IPTV subscription services.</p>
      <h2>Use of Service</h2><p>You agree to use this website for lawful purposes only. You may not use our platform to infringe on the rights of others.</p>
      <h2>Limitation of Liability</h2><p>PushAnything.com acts as a marketing intermediary and is not responsible for the technical performance of third-party IPTV services.</p>
      <h2>Contact</h2><p>Questions about these terms? Email salatrir@gmail.com.</p>`
    },
    disclaimer: {
      title: "Disclaimer",
      body: `<p>PushAnything.com is a marketing and lead-generation platform. We do not host, stream, rebroadcast, or distribute any copyrighted television content.</p>
      <p>We facilitate subscription inquiries for third-party IPTV services. All streaming content is provided by third-party service providers and is their sole responsibility.</p>
      <p>Users are responsible for ensuring that any content they access complies with the laws of their jurisdiction. PushAnything.com makes no warranties regarding the legality, availability, or quality of third-party IPTV services.</p>
      <p>All trademarks, logos, and brand names are the property of their respective owners.</p>`
    }
  };

  const page = content[type] || content.disclaimer;
  return `
  <section class="legal-page section">
    <div class="container legal-content">
      <a href="#home" class="back-link">← Home</a>
      <h1>${page.title}</h1>
      <div class="legal-body">${page.body}</div>
    </div>
  </section>`;
}

// ─── MAIN RENDER ───────────────────────────────────────────────────────────
function renderApp() {
  const page = getPage();
  document.documentElement.lang = currentLang;
  document.documentElement.dir = TRANSLATIONS[currentLang]?.dir || "ltr";

  let pageContent = "";
  switch (page) {
    case "home": case "": pageContent = renderHome(); break;
    case "plans": pageContent = renderPlans(); break;
    case "devices": pageContent = renderDevices(); break;
    case "blog": pageContent = renderBlog(); break;
    case "faq": pageContent = renderFAQ(); break;
    case "contact": pageContent = renderContact(); break;
    case "privacy": pageContent = renderLegal("privacy"); break;
    case "terms": pageContent = renderLegal("terms"); break;
    case "disclaimer": pageContent = renderLegal("disclaimer"); break;
    default: pageContent = renderHome();
  }

  document.getElementById("app").innerHTML =
    renderHeader() +
    `<main id="main-content" tabindex="-1">${pageContent}</main>` +
    renderFooter() +
    renderFloatingWA();

  window.scrollTo({ top: 0, behavior: "smooth" });
  updateMetaTags(page);
}

function updateMetaTags(page) {
  const titles = {
    home: "PushAnything IPTV — Premium Streaming Solutions For Modern Viewers",
    plans: "IPTV Subscription Plans — PushAnything IPTV",
    devices: "Device Compatibility — PushAnything IPTV",
    blog: "IPTV Blog & Setup Guides — PushAnything IPTV",
    faq: "FAQ — PushAnything IPTV",
    contact: "Contact Us — PushAnything IPTV"
  };
  document.title = titles[page] || titles.home;
}

window.setLang = setLang;
window.toggleFAQ = toggleFAQ;
window.handleContactForm = handleContactForm;
window.toggleMenu = toggleMenu;
window.closeMobileMenu = closeMobileMenu;
window.filterBlogCat = filterBlogCat;
window.navigate = navigate;
