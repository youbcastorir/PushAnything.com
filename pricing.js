// PushAnything IPTV - Pricing Plans
const PLANS = [
  {
    id: "monthly",
    key: "monthly",
    badge: null,
    priceLabel: "Contact for Price",
    billingCycle: "monthly",
    savings: null,
    features: [
      { key: "hd", icon: "✓" },
      { key: "devices", value: 1, icon: "✓" },
      { key: "support", icon: "✓" },
      { key: "setup", icon: "✓" },
      { key: "epg", icon: "✓" },
      { key: "vod", icon: "✓" },
      { key: "updates", icon: "✓" },
      { key: "uhd", icon: "✗" }
    ],
    highlight: false
  },
  {
    id: "quarterly",
    key: "quarterly",
    badge: null,
    priceLabel: "Contact for Price",
    billingCycle: "quarterly",
    savings: "~15%",
    features: [
      { key: "hd", icon: "✓" },
      { key: "uhd", icon: "✓" },
      { key: "devices", value: 1, icon: "✓" },
      { key: "support", icon: "✓" },
      { key: "setup", icon: "✓" },
      { key: "epg", icon: "✓" },
      { key: "vod", icon: "✓" },
      { key: "updates", icon: "✓" }
    ],
    highlight: false
  },
  {
    id: "semi-annual",
    key: "semiAnnual",
    badge: "popular",
    priceLabel: "Contact for Price",
    billingCycle: "semiannual",
    savings: "~25%",
    features: [
      { key: "hd", icon: "✓" },
      { key: "uhd", icon: "✓" },
      { key: "devices", value: 2, icon: "✓" },
      { key: "support", icon: "✓" },
      { key: "setup", icon: "✓" },
      { key: "epg", icon: "✓" },
      { key: "vod", icon: "✓" },
      { key: "updates", icon: "✓" }
    ],
    highlight: true
  },
  {
    id: "annual",
    key: "annual",
    badge: null,
    priceLabel: "Contact for Price",
    billingCycle: "annual",
    savings: "~40%",
    features: [
      { key: "hd", icon: "✓" },
      { key: "uhd", icon: "✓" },
      { key: "devices", value: 3, icon: "✓" },
      { key: "support", icon: "✓" },
      { key: "setup", icon: "✓" },
      { key: "epg", icon: "✓" },
      { key: "vod", icon: "✓" },
      { key: "updates", icon: "✓" }
    ],
    highlight: false
  }
];

const DEVICES = [
  { id: "smart-tv", icon: "📺", slug: "smart-tv" },
  { id: "android-tv", icon: "🖥️", slug: "android-tv" },
  { id: "android-phone", icon: "📱", slug: "android-phone" },
  { id: "iphone-ipad", icon: "🍎", slug: "iphone-ipad" },
  { id: "windows", icon: "💻", slug: "windows" },
  { id: "mac", icon: "🖥️", slug: "mac" },
  { id: "fire-tv", icon: "🔥", slug: "fire-tv" }
];

window.PLANS = PLANS;
window.DEVICES = DEVICES;
