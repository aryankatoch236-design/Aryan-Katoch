import {
  ResponsibilityItem,
  CapabilityItem,
  PillarItem,
  StrategyNode,
  ContactInfoData
} from '../types';

/*
 * Everything on the site is driven from this file.
 * Rule we follow: no invented numbers, clients or testimonials.
 * When real campaign results exist, add them to WORK_ITEMS / MEASURES with the client's permission.
 */

export const PERSONAL_INFO = {
  name: "ARYAN KATOCH",
  shortName: "Aryan",
  initials: "AK",
  role: "Director & Co-Founder",
  company: "Arvinex Venture Private Limited",
  disciplines: "Local Growth Strategy • Online + Offline Marketing • Ground Execution",
  positioning: "OWN YOUR STREET.",
  subPositioning: "DIRECTOR / STRATEGY / GROUND / GROWTH",
  manifestoSummary: "Online attracts attention. Offline earns trust. I plan both together so local customers find you, believe you and walk in.",
  mindset: "Start on the ground. Talk to the owner, walk the street, watch where customers actually go — then build the plan around what's real.",
  profileText: "Aryan Katoch is the Director and Co-Founder of Arvinex Venture Private Limited. He leads client strategy, offline campaigns and local partnerships for shops, clinics, restaurants, salons, homestays and coaching centres across Kangra and Himachal Pradesh. His approach joins two worlds most agencies keep apart: digital visibility on Google, Instagram and local ads, and real-world presence through print, shop boards, stalls and neighbourhood tie-ups — planned as one campaign, and measured by calls, enquiries and walk-ins.",
  visionText: "I want Arvinex to be the team local business owners in Himachal call first — because we understand their street as well as their screen, and because we tell them honestly what's working.",
  philosophyBody: "A local business doesn't need ten thousand impressions. It needs the right few hundred people nearby to see it, trust it and choose it. Everything I plan is built backwards from that.",
  quote: "Likes don't pay rent. I'd rather report ten real enquiries than ten thousand impressions."
};

export const CO_FOUNDER = {
  name: "Sarthak Sharma",
  role: "Co-Founder & Chief Marketing Officer",
  focus: "Leads digital marketing, websites and brand — how a business looks, reads and converts online.",
  url: "https://arvinexsarthak.online"
};

export const NAVIGATION_LINKS = [
  { id: "profile", label: "PROFILE", href: "#profile" },
  { id: "strategy", label: "ENGINE", href: "#strategy" },
  { id: "responsibilities", label: "ROLE", href: "#responsibilities" },
  { id: "capabilities", label: "SERVICES", href: "#capabilities" },
  { id: "work", label: "WORK", href: "#work" },
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "contact", label: "CONTACT", href: "#contact" }
];

/* Six touch-points of the 360° hybrid engine. Gold = online, ember = offline. */
export const STRATEGY_NODES: StrategyNode[] = [
  {
    id: "maps",
    label: "GOOGLE MAPS",
    subtitle: "Online · Get found nearby",
    description: "A complete, accurate Google Business Profile — right category, real photos, correct timings, a pin that's actually on your shop, and a steady flow of genuine reviews. It's where most local customers decide.",
    position: [2.8, 1.2, 0],
    color: "#FFB020"
  },
  {
    id: "reels",
    label: "REELS & VIDEO",
    subtitle: "Online · Stop the scroll",
    description: "Short videos shot at your business, with your people, in your words. Hook in the first seconds, captions for silent viewing, and a posting rhythm you can actually keep up.",
    position: [0, 3.0, 0],
    color: "#FFC94D"
  },
  {
    id: "ads",
    label: "LOCAL ADS",
    subtitle: "Online · Reach the right radius",
    description: "Meta and Google ads shown only to people who can realistically reach you, linked straight to WhatsApp or a call — so the budget goes to neighbours, not the whole internet.",
    position: [-2.8, 1.2, 0],
    color: "#FFD27A"
  },
  {
    id: "print",
    label: "PRINT & FLYERS",
    subtitle: "Offline · In their hands",
    description: "Pamphlets, flyers and offer cards planned by area and route — markets, schools, bus stands, tourist stretches — each with a code or number so we know what came back.",
    position: [-2.8, -1.2, 0],
    color: "#FF5A1F"
  },
  {
    id: "ground",
    label: "ON-GROUND",
    subtitle: "Offline · Be seen in person",
    description: "Stalls, small activations, counter displays, shop boards and flex that match your online look — so the person who saw your reel recognises you on the street.",
    position: [0, -3.0, 0],
    color: "#FF7A3D"
  },
  {
    id: "tieups",
    label: "SHOP TIE-UPS",
    subtitle: "Offline · Borrow trust",
    description: "Cross-promotions with non-competing neighbours — a café and a homestay, a salon and a boutique, a clinic and a pharmacy — sharing customers who already trust each other.",
    position: [2.8, -1.2, 0],
    color: "#FF9A52"
  }
];

export const RESPONSIBILITIES: ResponsibilityItem[] = [
  { id: "r1", number: "01", title: "Client Strategy", shortDesc: "Sitting with owners, understanding the business and its customers, and turning that into a written 90-day plan.", tag: "STRATEGY", iconName: "Compass" },
  { id: "r2", number: "02", title: "Offline Campaigns", shortDesc: "Planning and running flyer drops, stalls and on-ground activity in the places customers actually spend their day.", tag: "GROUND", iconName: "MapPin" },
  { id: "r3", number: "03", title: "Print & Signage", shortDesc: "Pamphlets, flex, shop boards, visiting cards and counter material that carry one consistent brand look.", tag: "PRINT", iconName: "Printer" },
  { id: "r4", number: "04", title: "Local Partnerships", shortDesc: "Building tie-ups between non-competing neighbouring businesses so each one sends customers to the other.", tag: "NETWORK", iconName: "Handshake" },
  { id: "r5", number: "05", title: "Area Research", shortDesc: "Walking the area, studying nearby competitors, and finding where footfall and attention really are.", tag: "RESEARCH", iconName: "Search" },
  { id: "r6", number: "06", title: "Business Counselling", shortDesc: "Helping owners shape offers, pricing and the way their counter staff handle enquiries.", tag: "ADVISORY", iconName: "MessageSquare" },
  { id: "r7", number: "07", title: "Campaign Coordination", shortDesc: "Making sure ads, reels, print and ground activity launch in the same weeks and support each other.", tag: "EXECUTION", iconName: "Layers" },
  { id: "r8", number: "08", title: "Client Relationships", shortDesc: "Being the person owners call — clear updates, honest answers and no hiding behind account managers.", tag: "TRUST", iconName: "UserCheck" },
  { id: "r9", number: "09", title: "Results Reporting", shortDesc: "Reporting calls, WhatsApp enquiries, walk-ins and redemptions — and changing what isn't working.", tag: "MEASURE", iconName: "BarChart3" }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "c1",
    number: "01",
    title: "OFFLINE & GROUND MARKETING",
    tagline: "Put the business in front of people where they actually are.",
    description: "Digital alone rarely wins a neighbourhood. We plan physical presence by area and route — flyers where your customers walk, stalls where they gather, displays at the counter — and make every piece trackable with a code, number or offer.",
    visualMetaphor: "Pins on the street map",
    deliverables: ["Area-wise flyer & pamphlet drops", "Stalls and small activations", "Counter & point-of-sale displays", "Festival and season campaigns"]
  },
  {
    id: "c2",
    number: "02",
    title: "DIGITAL & LOCAL VISIBILITY",
    tagline: "Be the obvious answer when someone nearby searches.",
    description: "Google Business Profile set-up and clean-up, review systems, local ads aimed at a realistic radius, and WhatsApp enquiry flows so no message goes unanswered.",
    visualMetaphor: "Signal arcs between pins",
    deliverables: ["Google Business Profile optimisation", "Meta & Google local ads", "WhatsApp enquiry flow", "Review-request system"]
  },
  {
    id: "c3",
    number: "03",
    title: "REELS & SHORT VIDEO",
    tagline: "Show the real business, in your own words.",
    description: "Ideas, hooks and scripts planned around what your customers care about, shot on location with you and your team, edited with captions and sound, and a posting plan sized to what you can keep up.",
    visualMetaphor: "Frames from the shop floor",
    deliverables: ["Hook & script planning", "On-location shoots", "Editing with captions & sound", "Monthly posting plan"]
  },
  {
    id: "c4",
    number: "04",
    title: "STRATEGY & COUNSELLING",
    tagline: "A clear plan before more money is spent.",
    description: "An honest review of your area, competitors and current marketing, then a written 90-day plan with simple numbers to track — plus help shaping offers, pricing and how enquiries are handled at the counter.",
    visualMetaphor: "The 90-day map",
    deliverables: ["Area & competitor audit", "Written 90-day plan", "Offer & pricing advice", "Counter-staff enquiry tips"]
  },
  {
    id: "c5",
    number: "05",
    title: "PRINT & BRAND COLLATERAL",
    tagline: "One look from Instagram grid to shop board.",
    description: "Shop boards, flex banners, visiting cards, pamphlets and packaging designed to match your online presence — so recognition builds every time someone sees you, on screen or on the street.",
    visualMetaphor: "Street-level brand system",
    deliverables: ["Shop boards & flex", "Visiting cards & pamphlets", "Packaging & counter material", "Simple brand rules"]
  }
];

export const WORK_ITEMS = {
  local: {
    title: "ARVINEX LOCAL",
    kind: "Our own brand · Live",
    description: "Arvinex's local-growth service for businesses in Dharamshala, McLeod Ganj, Kangra, Palampur and Bir — websites, social media, ads, WhatsApp marketing, branding, print and business counselling under one roof.",
    liveUrl: "https://arvinexlocal.site",
    tags: ["Local Growth", "Print + Digital", "Himachal Pradesh", "Business Counselling"]
  },
  adhyayan: {
    title: "Adhyayan Academy — Shahpur",
    kind: "Arvinex client · Coaching centre",
    client: "Adhyayan Academy — Shahpur, Kangra",
    objective: "Increase visibility and generate relevant admission enquiries.",
    contribution: "Marketing strategy and a mobile-first website with course details, results, FAQs and a WhatsApp enquiry form — delivered by the Arvinex team.",
    liveUrl: "https://sarthaks1236.github.io/adhyayan-academy-mfile/",
    tags: ["Local Visibility", "Website", "Lead Generation", "Admissions"]
  }
};

/* What we report on every campaign — the measures, not invented results. */
export const MEASURES: PillarItem[] = [
  { id: "m1", title: "CALLS", subtitle: "Phone", description: "Calls from Google, ads and printed numbers — counted by source where possible.", highlight: "Tracked" },
  { id: "m2", title: "ENQUIRIES", subtitle: "WhatsApp", description: "Messages that come in through links, QR codes and ads, with a reply flow so none are missed.", highlight: "Tracked" },
  { id: "m3", title: "WALK-INS", subtitle: "Footfall", description: "New faces at the counter, noted with a simple 'how did you hear about us?' routine.", highlight: "Tracked" },
  { id: "m4", title: "REDEMPTIONS", subtitle: "Offers", description: "Coupons and offer codes from flyers and tie-ups, so every printed piece proves its worth.", highlight: "Tracked" }
];

export const FIRST_CLIENT_PROMISES = [
  "Goals agreed in writing before we begin",
  "A reduced price for your first campaign",
  "Founder-level attention — you talk to Aryan directly",
  "Honest reports, including what didn't work",
  "Your results shared publicly only with your permission",
  "No long lock-in contracts"
];

export const AREAS = ["Dharamshala", "McLeod Ganj", "Kangra", "Palampur", "Bir", "Shahpur"];

export const INDUSTRIES = [
  { name: "Restaurants & Cafés", hint: "Menu on Maps, dish reels, hotel tie-ups" },
  { name: "Clinics & Doctors", hint: "Trust-first profile, real patient reviews" },
  { name: "Salons & Wellness", hint: "Before/after reels, WhatsApp booking" },
  { name: "Coaching Centres", hint: "Admission-season print, parent-friendly site" },
  { name: "Homestays & Hotels", hint: "Tourist-facing listings, view reels" },
  { name: "Retail & Local Shops", hint: "Shop boards, area offers, regulars" }
];

export const FAQS = [
  { q: "How much does it cost?", a: "It depends on your area and what you need. Small budgets are welcome — after a free audit you get a written quote." },
  { q: "Can you guarantee rankings or sales?", a: "No, and be careful with anyone who does. We commit to the work and to reporting clearly on what happened." },
  { q: "How soon will I see results?", a: "Offers and flyers can bring enquiries within days. A Google profile and a reel following take weeks to build." },
  { q: "Do I need both online and offline?", a: "No. You can start with one. We'll tell you honestly if the other would help, and why." },
  { q: "Do you work outside Kangra?", a: "Online work, anywhere. Print and on-ground work in towns we can reach in person — ask about yours." }
];

export const CONTACT_INFO: ContactInfoData & { whatsapp: string; whatsappUrl: string; formEndpoint: string } = {
  name: "Aryan Katoch",
  role: "Director & Co-Founder",
  company: "Arvinex Venture Private Limited",
  email: "aryankatoch236@gmail.com",
  phone: "+91 88944 02974",
  whatsapp: "+91 88944 02974",
  whatsappUrl: "https://wa.me/918894402974?text=" + encodeURIComponent("Hi Aryan, I saw your portfolio and would like to talk about marketing for my business."),
  formEndpoint: "https://formsubmit.co/ajax/aryankatoch236@gmail.com",
  instagram: "",
  linkedin: ""
};

export const VISION_STOPS = [
  { label: "SEEN", desc: "Show up where nearby customers look — on Maps, in their feed and on their street." },
  { label: "TRUSTED", desc: "Reviews, a consistent look and familiar faces turn a name into a safe choice." },
  { label: "CHOSEN", desc: "A clear offer and an easy way to call, message or walk in." },
  { label: "REMEMBERED", desc: "Repeat visits, referrals and tie-ups that keep customers coming back." }
];
