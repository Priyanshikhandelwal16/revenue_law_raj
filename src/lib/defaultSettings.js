const SETTING_KEYS = [
  "site_name",
  "site_config",
  "homepage_config",
  "about_config",
  "contact_config",
  "legal_config",
  "faq_config",
  "working_revenue_config",
  "court_hierarchy_config",
  "case_types_config",
  "case_stages_config",
  "important_rules_config",
  "important_concepts_config",
  "judgment_writing_config",
  "important_sections_config",
];

const BLOCKED_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function cloneValue(value) {
  if (Array.isArray(value)) return value.map(cloneValue);
  if (isPlainObject(value)) {
    const clone = {};
    for (const key of Object.keys(value)) {
      if (!BLOCKED_KEYS.has(key)) clone[key] = cloneValue(value[key]);
    }
    return clone;
  }
  if (value && typeof value === "object") {
    if (typeof structuredClone === "function") {
      try { return structuredClone(value); } catch { /* Fall through. */ }
    }
    try { return JSON.parse(JSON.stringify(value)); } catch { return null; }
  }
  return value;
}

export function deepMergeSettings(defaultValue, storedValue) {
  if (storedValue === undefined) return cloneValue(defaultValue);
  if (!isPlainObject(defaultValue) || !isPlainObject(storedValue)) return cloneValue(storedValue);
  const merged = {};
  for (const key of new Set([...Object.keys(defaultValue), ...Object.keys(storedValue)])) {
    if (!BLOCKED_KEYS.has(key)) merged[key] = deepMergeSettings(defaultValue[key], storedValue[key]);
  }
  return merged;
}

export const PUBLIC_SETTING_KEYS = [...SETTING_KEYS];
export const EDITABLE_SETTING_KEYS = [...SETTING_KEYS];


const siteConfig = {
  schemaVersion: 1,
  brand: { name: "Revenue Law", subtitle: "Rajasthan", logo: "/images/logo_main.jpg", logoAlt: "Revenue Law Raj", favicon: "/icon.png", homeUrl: "/" },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Revenue Law", items: [
        { label: "Revenue Law in Rajasthan", href: "/laws" },
        { label: "Procedure of Revenue Law", href: "/working-of-revenue-law" },
        { label: "Hierarchy of Revenue Courts", href: "/hierarchy-of-courts" },
        { label: "Types of Cases in Revenue Law", href: "/types-of-cases" },
        { label: "The Stages in Revenue Cases", href: "/the-stages-in-revenue-cases" },
      ]
    },
    { label: "Important Rules", href: "/important-rules" },
    {
      label: "Judgments", items: [
        { label: "All Judgments", href: "/judgments" },
        { label: "Supreme Court Judgments", href: "/judgments/supreme-court" },
        { label: "Rajasthan High Court Judgments", href: "/judgments/high-court" },
      ]
    },
    {
      label: "Resources", items: [
        { label: "Important Concepts", href: "/resources/important-concepts" },
        { label: "How to Write a Judgment", href: "/resources/how-to-write-judgments" },
        { label: "Imp Notifications", href: "/notifications" },
      ]
    },
    { label: "Glossary", href: "/glossary" },
    { label: "Contact Us", href: "/contact", cta: true },
  ],
  footer: {
    description: "Revenue Law Raj is Rajasthan's leading platform for agricultural and land administration laws. We provide a structured database of judgments, statutes, glossary definitions, and official gazettes to support legal research and administrative clarity across the state.",
    columns: [
      { title: "Quick Links", links: [{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Contact Us", href: "/contact" }, { label: "Judgments", href: "/judgments" }, { label: "FAQ", href: "/faq" }] },
      { title: "Revenue Law", links: [{ label: "Acts & Statutes", href: "/laws" }, { label: "Procedure of Law", href: "/working-of-revenue-law" }, { label: "Court Hierarchy", href: "/hierarchy-of-courts" }, { label: "Types of Cases", href: "/types-of-cases" }] },
      { title: "Important Concepts", links: [{ label: "Important Rules", href: "/important-rules" }, { label: "Important Concepts", href: "/resources/important-concepts" }, { label: "Circulars & Gazettes", href: "/notifications" }, { label: "Revenue Glossary", href: "/glossary" }] },
    ],
    contact: { title: "Official Contact", address: "B-30, Jamuna Nagar, Sodala, Jaipur, Rajasthan – 302006", phone: "+91 99820 57461", email: "revenuelawraj@gmail.com" },
    socials: [{ label: "Facebook", icon: "Facebook", href: "https://www.facebook.com/profile.php?id=61591658014580" }, { label: "X", icon: "Twitter", href: "https://x.com/revenuelawraj" }, { label: "YouTube", icon: "Youtube", href: "https://www.youtube.com/@revenuelawraj" }, { label: "Instagram", icon: "Instagram", href: "https://www.instagram.com/revenuelawraj/" }],
    legalLinks: [{ label: "Terms of Service", href: "/terms" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Disclaimer", href: "/disclaimer" }],
    copyright: "© {year} Rajasthan Revenue Law Platform. All rights reserved.",
    disclaimer: "Disclaimer: This platform compiles public notification and legal documents for research. Users are advised to crosscheck original publications before pleading cases.",
    poweredBy: { text: "Powered by JAINUP | Growth System", label: "JAINUP | Growth System", href: "https://jainup.in" },
  },
};


export function normalizeSettingValue(key, value) {
  if (key !== 'homepage_config' || !isPlainObject(value)) return cloneValue(value);

  const normalized = cloneValue(value);
  const hero = isPlainObject(normalized.hero) ? normalized.hero : {};
  const legacyHeroFields = {
    title: 'heroTitle',
    highlight: 'heroSubtitle',
    description: 'heroDesc',
    image: 'heroImage',
  };

  for (const [field, legacyField] of Object.entries(legacyHeroFields)) {
    if (hero[field] === undefined && normalized[legacyField] !== undefined) {
      hero[field] = normalized[legacyField];
    }
  }
  if (Object.keys(hero).length) normalized.hero = hero;

  if (normalized.quickLinks === undefined) {
    const quickLinks = [
      { label: normalized.heroButtonText, href: normalized.heroButtonUrl, icon: 'Gavel' },
      { label: normalized.heroSecButtonText, href: normalized.heroSecButtonUrl, icon: 'BookOpen' },
    ].filter(link => link.label && link.href);
    if (quickLinks.length) normalized.quickLinks = quickLinks;
  }

  if (normalized.homepageFaqs === undefined && Array.isArray(normalized.faqs)) {
    normalized.homepageFaqs = normalized.faqs;
  }

  for (const legacyKey of [
    'heroTitle', 'heroSubtitle', 'heroDesc', 'heroButtonText', 'heroButtonUrl',
    'heroSecButtonText', 'heroSecButtonUrl', 'heroImage', 'faqs',
  ]) {
    delete normalized[legacyKey];
  }

  return normalized;
}

const homepageConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Rajasthan Legal Research Portal", title: "Overview of", highlight: "Revenue Law", description: "Empowering legal professionals, landholders, and officers with instant access to Rajasthan's land revenue database. Explore Board of Revenue precedents, tenancy statutes, notification circulars, and comprehensive step-by-step litigation guides on a unified platform.", image: "/images/hero_revenue_law-removebg-preview.png", imageAlt: "Rajasthan Legal Research Platform" },
  quickLinks: [
    { label: "Hierarchy of Revenue Courts", href: "/hierarchy-of-courts", icon: "Landmark" },
    { label: "Stages in Revenue Cases", href: "/the-stages-in-revenue-cases", icon: "Layers" },
    { label: "Types of Cases", href: "/types-of-cases", icon: "Scale" },
  ],
  categoriesSection: { eyebrow: "Subject Directory", title: "Revenue Law Categories", description: "Access structured directories covering key subject matters in Rajasthan land and tenancy codes.", ctaLabel: "Browse Category Articles" },
  categories: [
    { title: "Land Conversion (90-A)", description: "Rules and guides for conversion of agriculture lands to residential and commercial use.", slug: "land-conversion-90-a", icon: "FileCheck" },
    { title: "Mutation & Succession", description: "Succession filings, partition mutations, and records correction procedures.", slug: "mutation-rights", icon: "Layers" },
    { title: "Eviction & Encroachments", description: "Tehsildar powers under Section 91 and eviction rules for government holdings.", slug: "encroachments", icon: "ShieldAlert" },
    { title: "Partition & Boundaries", description: "Division of undivided holdings under Section 53 of the Tenancy Act.", slug: "partition-boundaries", icon: "Compass" },
    { title: "Appeals & Revisions", description: "Appellate routes from Tehsildars up to the Board of Revenue Ajmer.", slug: "appeals-revisions", icon: "Gavel" },
    { title: "General Commentary", description: "Comprehensive analysis of local customs and federal changes affecting state land laws.", slug: "commentary", icon: "BookOpen" },
  ],
  hierarchySection: { eyebrow: "Judicial Structure", title: "Hierarchy of Revenue Courts in Rajasthan", description: "Revenue Courts in Rajasthan follow a structured hierarchy from the local Tehsildar Court up to the Board of Revenue. This organization ensures step-by-step judicial escalation and administrative governance of land records.", cta: { label: "Explore Complete Hierarchy", href: "/hierarchy-of-courts" } },
  courts: [{ title: "Board of Revenue", role: "Highest Revenue Court", location: "Ajmer" }, { title: "Revenue Appeals Court", role: "Appellate Commissioners", location: "Divisional HQ" }, { title: "Collector Courts", role: "District Collectors / Add. Collectors", location: "District HQs" }, { title: "Sub-Divisional Courts", role: "SDOs / Assistant Collectors", location: "Sub-Division Level" }, { title: "Tehsildar Courts", role: "Tehsildars & Naib Tehsildars", location: "Tehsil HQs" }],
  judgmentsSection: { eyebrow: "Case Law Updates", title: "Latest Court Judgments", description: "Access the latest rulings, orders, and precedents set by the Board of Revenue Ajmer.", itemCtaLabel: "Open Judgment Details", cta: { label: "View All Judgments", href: "/judgments" } },
  notificationsSection: { eyebrow: "Official Gazettes", title: "Latest Government Notifications & Circulars", description: "Track direct circular orders and rules amendments released by the Revenue Department, Government of Rajasthan.", downloadLabel: "Download PDF", detailsLabel: "View Details" },
  conversionSection: { eyebrow: "Statutory Practice Guide", title: "Section 90-A: Land Conversion", description: "Section 90-A of the Rajasthan Land Revenue Act, 1956 regulates the conversion of agricultural land for non-agricultural purposes.", icon: "ShieldAlert", points: [{ title: "SDO Powers", text: "Rural conversion power rests with Sub-Divisional Officers." }, { title: "Urban Masterplans", text: "Urban bodies (JDA, UITs) hold conversion rights inside masterplans." }], image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80", imageAlt: "Agricultural lands and cadastral revenue map", cta: { label: "Read 90-A Guide", href: "/articles/land-conversion-90-a" } },
  popularSection: { eyebrow: "Trending Content", title: "Popular Articles", description: "Explore the most viewed analyses and legal publications across the Rajasthan revenue landscape.", itemCtaLabel: "Read Commentary", cta: { label: "See More Commentaries", href: "/articles" } },
  fallbackArticles: [
    { id: "m1", title: "Rajasthan Government Simplifies Section 90-A Conversion for Rural Lands", slug: "rajasthan-simplifies-section-90-a-conversion", category: "Land Conversion", summary: "The Revenue Department has released new guidelines easing the agricultural land conversion procedure under Section 90-A of the Land Revenue Act.", featuredImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", views: 1204 },
    { id: "m2", title: "Board of Revenue Clarifies Mutation Rights of Legal Heirs in Undivided Holdings", slug: "board-of-revenue-clarifies-mutation-rights", category: "Judgments Analysis", summary: "In a landmark decision, the Ajmer Board of Revenue ruled that mutations based on succession cannot be delayed by co-sharer objections.", featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", views: 892 },
    { id: "m3", title: "Understanding Section 188 of Rajasthan Tenancy Act: Protection Against Trespass", slug: "understanding-section-188-tenancy-act", category: "Legal Commentary", summary: "An in-depth analysis of tenant protections, temporary injunctions, and the limits of Tehsildar jurisdiction in eviction disputes.", featuredImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80", views: 1540 },
  ],
  fallbackJudgments: [
    { id: "j1", title: "Kalyan Singh vs. State of Rajasthan", citation: "2026 RRD 182", caseNumber: "Rev.Appeal/45/2025", courtName: "Board of Revenue, Ajmer", summary: "Decided that conversion under 90-A is final once commercial activity starts and cannot be unilaterally reversed by the Tehsildar without a hearing." },
    { id: "j2", title: "Smt. Kamala Devi vs. Ram Lal & Ors.", citation: "2026 RRD 94", caseNumber: "TA/122/2024", courtName: "Board of Revenue, Ajmer", summary: "Held that a female Hindu co-sharer has absolute rights to claim partition under Section 53 of the Tenancy Act, despite local custom objections." },
  ],
  fallbackNotifications: [
    { id: "n1", title: "Amendments to the Rajasthan Land Revenue (Allotment of Land for Agricultural Purposes) Rules", referenceNumber: "F.4(2)Rev-6/2026/18", department: "Revenue (Group 6) Department, Jaipur", summary: "Rules easing partition regularisation for land holdings allocated to under-represented agricultural classes." },
    { id: "n2", title: "Notification regarding delegation of power under Section 90-A to Sub-Divisional Officers (SDOs)", referenceNumber: "F.9(11)Rev-3/2025/44", department: "Revenue (Group 3) Department, Jaipur", summary: "Circular transferring approval powers directly to SDOs to expedite residential and commercial rural land conversions." },
  ],
  homepageFaqs: [{ question: "Who can convert agricultural land under Sec 90-A?", answer: "Only the khatedar tenant (or an authorised developer holding a valid agreement) can apply for land conversion to the competent revenue authority." }, { question: "What is the limitation period for filing a revenue appeal?", answer: "Typically, appeals to the Revenue Appeals Commissioner or Board of Revenue must be filed within 90 days from the date of the lower court's decree or order." }],
  cta: { title: "Need Statutory Clarification?", description: "If you need guidance regarding Land Revenue Section 90-A conversions, mutation successions, partition dispute rules, or Board appeals, submit an expert inquiry.", label: "Submit Legal Query", href: "/contact", icon: "Send" },
};


const aboutConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "About the Platform", title: "Rajasthan Revenue Law", highlight: "Platform", description: "An enterprise-grade legal publishing and research portal built for advocates, judges, and landowners of Rajasthan." },
  sections: [
    { eyebrow: "Legal Definition", icon: "BookOpen", title: "What is Revenue Law?", content: "Revenue Law in Rajasthan governs all matters related to agricultural land, tenancies, estates, land revenue assessments, boundaries, pasture lands, and land conversions (such as Section 90-A conversions). It dictates the rights, titles, and interests of landholders, inheritance rules for agricultural holdings, and the procedures for mutation, tenancy partition, and disputes under the landmark Rajasthan Tenancy Act, 1955, and the Rajasthan Land Revenue Act, 1956." },
    { eyebrow: "Our Organization", icon: "Users", title: "Who We Are", content: "Revenue Law Raj is a dedicated Rajasthan Revenue Law Platform designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The platform offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system." },
  ],
  mission: { title: "Making Revenue Law Accessible to Everyone", content: "Revenue law in Rajasthan — spanning the Land Revenue Act of 1956, Tenancy Act of 1955, local circulars, and thousands of Board of Revenue judgments — is vast and difficult to navigate. Revenue Law Raj was founded to digitize, annotate, and organize these records so that legal professionals, landowners, and students can find the answers they need in seconds, not days." },
};

const contactConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Revenue Law Raj Consultation", title: "Contact Our Editorial Board", highlight: "Submit Legal Query", description: "Have questions regarding a publication, need technical help, or want to contribute articles to the platform? Fill out the query form." },
  intro: { title: "Get in Touch", description: "You can reach us through any of the channels below or submit the form on the right." },
  contact: { addressLabel: "Mailing Address", address: "B-30, Jamuna Nagar, Sodala, Jaipur, Rajasthan – 302006", phoneLabel: "Secretary Helpline", phone: "+91 99820 57461", emailLabel: "Email Support", email: "revenuelawraj@gmail.com", securityNote: "GDPR & Information Protection Secure" },
  socials: { facebook: "https://www.facebook.com/profile.php?id=61591658014580", twitter: "https://x.com/revenuelawraj", youtube: "https://www.youtube.com/@revenuelawraj", instagram: "https://www.instagram.com/revenuelawraj/" },
  form: { title: "Submit Legal Query", fields: [{ name: "name", label: "Full Name *", type: "text", required: true }, { name: "email", label: "Email Address *", type: "email", required: true }, { name: "phone", label: "Contact Number (Optional)", type: "tel", required: false }, { name: "subject", label: "Subject *", type: "text", placeholder: "e.g., 'Article Submission', '90-A Query'", required: true }, { name: "message", label: "Message Content *", type: "textarea", placeholder: "Enter detailed message contents here...", required: true }], submitLabel: "Submit Query", submittingLabel: "Submitting query..." },
  success: { title: "Query Submitted", description: "Thank you for writing to us. Your query has been logged and assigned a case reference. Our support desk will reach out within 48 business hours.", resetLabel: "Send another message" },
};


const legalConfig = {
  schemaVersion: 1,
  pages: {
    terms: { eyebrow: "Legal Agreement", title: "Terms of Service", lastUpdated: "July 2, 2026", backLabel: "Back to Homepage" },
    privacy: { eyebrow: "Data Security", title: "Privacy Policy", lastUpdated: "July 2, 2026", backLabel: "Back to Homepage" },
    disclaimer: { eyebrow: "Important Notification", title: "Legal Disclaimer", lastUpdated: "July 2, 2026", backLabel: "Back to Homepage" },
  },
  terms: `<p>Welcome to the Rajasthan Revenue Law Platform, also referred to as "Revenue Law Raj". By accessing or using our platform, website, and services, you agree to be bound by these Terms of Service. Please read them carefully.</p><h2>1. Use of the Platform</h2><p>This platform compiles public notifications, circulars, tenancy acts, and court judgments for academic research and professional reference. While we strive to maintain accurate copies of public gazettes, users are advised to verify the original government publication before presenting documents in court.</p><h2>2. Intellectual Property</h2><p>The custom commentary, layout design, compiled databases, and editorial summaries are the intellectual property of the Rajasthan Revenue Law Platform. Public domain legal texts, bare acts, and gazette orders remain the property of the respective government authorities.</p><h2>3. Disclaimer of Legal Advice</h2><p>The content provided on this website does not constitute formal legal advice. Accessing this site or submitting a consultation query does not establish an advocate-client relationship. You should seek independent counsel for specific litigation concerns.</p><h2>4. User Accounts</h2><p>If you create an account in our admin portal or submit discussion comments, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p><h2>5. Prohibited Activities</h2><p>You may not scrape, download, or index large portions of our databases without explicit permission. Automated bots, security probes, and denial-of-service attempts are strictly prohibited and will lead to IP bans.</p><h2>6. Revisions and Modifications</h2><p>We reserve the right to update these terms at any time without prior notice. Continued use of the platform constitutes agreement to the revised terms.</p>`,
  privacy: `<p>Rajasthan Revenue Law Platform (Revenue Law Raj) is committed to protecting your privacy. This policy details how we collect, use, and safeguard your personal details when you interact with our platform.</p><h2>1. Information We Collect</h2><p>We collect information that you explicitly share with us when using our contact forms, submit inquiry tickets, or post professional comments (such as name, email address, phone number, and professional practice areas).</p><h2>2. How We Use Information</h2><p>Your information is used to address your support tickets, send newsletter updates for legal circulars, and moderate the discussion boards. We do not sell, rent, or lease your personal information to third-party marketing services.</p><h2>3. Cookies and Analytics</h2><p>We use technical session cookies to keep you logged into the admin dashboard and monitor site traffic to optimize load speeds. You can disable cookies in your browser settings if preferred.</p><h2>4. Data Retention</h2><p>Personal details submitted via our contact forms or queries are retained only as long as necessary to resolve the query. User accounts and public comments are stored until deletion is requested by the user.</p><h2>5. Security Standards</h2><p>We implement appropriate physical, technical, and administrative security measures to protect your data from unauthorized access, alteration, or disclosure.</p>`,
  disclaimer: `<p>The statutory acts, rules, circulars, and judicial precedents listed on this platform are compiled for research and educational purposes only.</p><h2>Accuracy of Information</h2><p>While we take every effort to keep our databases updated with accurate records from the Rajasthan Government Gazette and Board of Revenue Ajmer, we cannot guarantee that all records are completely free of typos or scanning errors.</p><h2>No Liability</h2><p>The owners, developers, and writers of the Rajasthan Revenue Law Platform shall not be held liable for any decisions, legal strategies, or filings executed based on the information provided on this website. Always verify statutory clauses with official government prints before pleading cases before a revenue court.</p><h2>No Advocate-Client Relationship</h2><p>Accessing the platform or transmitting query letters through our contact system does not create an advocate-client relationship. All advice is informational and educational in nature.</p><h2>Third-Party Links</h2><p>This portal may link to external government sites or resource platforms. We hold no responsibility for the uptime, validity, or content of external links.</p>`,
};

const faqConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "FAQ Database", title: "Frequently Asked Questions", highlight: "Rajasthan Revenue Law", description: "Find answers to common questions about land conversions, tenancy rules, mutations, and appellate timelines." },
  searchPlaceholder: "Search FAQs by keywords (e.g. 90-A, Mutation, SC/ST, Appeal)...",
  noResults: "No matching FAQs found. Try checking your spelling or search for general keywords.",
  notice: { title: "Statutory Notice", description: "This FAQ database is created for general guidance and legal research references under the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955. While we strive to maintain absolute accuracy corresponding to the latest Government gazettes, local modifications and case-specific situations should be consulted with an advocate or certified revenue administrator." },
  entries: [
    { question: "Who can convert agricultural land under Sec 90-A?", answer: "Only the recorded Khatedar tenant of the agricultural land, or an authorized developer holding a valid registered development agreement with the tenant, can apply for land conversion to the competent revenue authority (SDO or Collector)." },
    { question: "What is the limitation period for filing a revenue appeal?", answer: "Generally, first appeals against Tehsildar orders must be filed within 30 days. Appeals against SDO decrees on partitions/declarations must be filed within 90 days before the Revenue Appeals Commissioner (RAC). Revision petitions and second appeals to the Board of Revenue Ajmer typically carry a 90-day limitation period." },
    { question: "What is a Khatedari right?", answer: "Khatedari rights are permanent, inheritable, and transferable occupancy rights in agricultural land granted to tenants under the Rajasthan Tenancy Act, 1955. Khatedars have full rights of land usage subject to statutory land revenue rules." },
    { question: "How is a land mutation (Namantran) registered?", answer: "Following a land sale, gift, or succession, an application is submitted to the Tehsildar or local Patwari. The Patwari enters the transfer in the mutation register (P-21) and issues a 15-day public notice. If no dispute is raised, the mutation is certified by the Revenue Officer and registered in the Jamabandi (records of rights)." },
    { question: "What powers do Tehsildars hold under Section 91 of the Land Revenue Act?", answer: "Section 91 empowers Tehsildars to evict unauthorized trespassers from government or communal land. The Tehsildar can impose fines, order immediate eviction, and confiscate crops or structures raised on the encroached land." },
    { question: "Can agricultural land of SC/ST tenants be sold to non-SC/ST persons?", answer: "No. Section 42 of the Rajasthan Tenancy Act, 1955 strictly prohibits the sale, gift, bequest, or mortgage of SC/ST agricultural holdings to individuals who do not belong to the same category. Any such transactions are declared null and void from inception." },
    { question: "What is Section 251 of the Rajasthan Land Revenue Act?", answer: "Section 251 grants Tehsildars the authority to adjudicate right-of-way disputes. If a tenant's passage to their field is blocked by a neighboring landowner, the Tehsildar can hear the petition and order the immediate clearance or creation of a pathway." },
  ],
};


const workingRevenueConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Procedural Guide", title: "Procedure of Revenue Law", highlight: "in Rajasthan", description: "Understand the step-by-step workflow of revenue litigation, land record corrections, and judicial processes in Rajasthan courts." },
  framework: { title: "The Statutory Framework", paragraphs: ["The administration of land in Rajasthan revolves around two primary legislations: the Rajasthan Land Revenue Act, 1956 (which governs records, surveys, boundaries, and the powers of revenue officers) and the Rajasthan Tenancy Act, 1955 (which determines rights of tenancy, land transfer, division of agricultural holdings, and disputes).", "Revenue courts act as quasi-judicial authorities. Unlike civil courts, they follow special procedures that emphasize field verifications, reports from village patwaris, and settlement rules designed to protect agrarian rights and maintain state land logs."] },
  workflow: { title: "Workflow of a Revenue Proceeding", description: "From initiating a petition to final decree execution in the field." },
  steps: [
    { title: "1. Land Record Entry & Verification", description: "Any transfer, partition, or inheritance starts with updating the Jamabandi (Records of Rights). The Patwari verifies field conditions, maps (Naksha), and logs mutations in the register.", details: "Timeframe: 15–30 days for undisputed mutations under standard circular guidelines." },
    { title: "2. Filing of Suits and Applications", description: "Disputed matters regarding tenancy, boundaries, partition, or trespass are filed in the respective Court of Tehsildar, SDO, or Assistant Collector depending on jurisdiction.", details: "Key Suits: Partition Suits (Sec. 53), Injunctions (Sec. 188), and Easement Rights (Sec. 251)." },
    { title: "3. Summoning & Evidence Stage", description: "Revenue courts issue summons to opposite parties. Patwari records, field inspection reports (Moka Girdawari), and oral testimony are submitted as evidence.", details: "Crucial Evidence: Shajra maps, Khasra details, Jamabandi entries, and local site commission reports." },
    { title: "4. Judgment & Decree Execution", description: "Once arguments conclude, the presiding revenue officer issues a judgment. If boundaries are affected, a decree is prepared for field execution (e.g. partition maps finalized).", details: "Execution: Executed in the field by Tehsildar/Girdawar, physically dividing shares or regularizing land." },
    { title: "5. Appeals & Revisions", description: "If a party is aggrieved, statutory appeals are filed up the hierarchy. Original orders of Tehsildars go to Collectors, SDO orders to Revenue Appeals Commissioners, and RAC/Collector orders to the Board of Revenue.", details: "Limitation: Typically 30 days for appeals, 60-90 days for revisions before the Board of Revenue." },
  ],
  cta: { icon: "Gavel", title: "Need Detailed Procedural Form Templates?", description: "We provide official application forms, mutation draft templates, and statutory appeal formats prepared by senior advocates.", label: "Go to Downloads Section", href: "/downloads" },
};

const courtHierarchyConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Court Directory", title: "Hierarchy of Revenue Courts", highlight: "in Rajasthan", description: "Explore the escalation route of agricultural and land record disputes from local Tehsil officers up to the Board of Revenue in Ajmer." },
  statutorySections: [
    { eyebrow: "Statutory Disclaimer", title: "General Reference & Subordination of Revenue Courts", description: "The administrative control and judicial subordination of revenue courts and officers in Rajasthan are strictly governed by:", statute: "THE RAJASTHAN LAND REVENUE ACT, 1956 (Sec. 24)", clauses: ["(1) All Revenue Courts and Revenue Officers in a district shall be subordinate to the Collector of the district.", "(2) All Revenue Courts and Revenue Officers in a division shall be subordinate to the Divisional Commissioner.", "(3) All Revenue Courts, Divisional Commissioners, Collectors and other Revenue Officers shall be subordinate to the Board."] },
    { eyebrow: "Tenancy Rules Control", title: "Subordination under the Rajasthan Tenancy Act", description: "Judicial proceedings, suits, and execution rules are also bound by the administrative structure outlined in the Tenancy Act:", statute: "THE RAJASTHAN TENANCY ACT, 1955 (Sec. 221)", clauses: ["(1) All Revenue Courts and Revenue Officers in a district shall be subordinate to the Collector.", "(2) All Revenue Courts and Revenue Officers in a division shall be subordinate to the Revenue Appeals Commissioner / Divisional Commissioner.", "(3) All Revenue Courts, Divisional Commissioners, Revenue Appeals Commissioners, Collectors and other Revenue Officers shall be subordinate to the Board."] },
  ],
  hierarchy: { eyebrow: "Judicial Structure", title: "Interactive Court Hierarchy", appealsLabel: "Appeals Flow", subordinationLabel: "Subordination" },
  directoryTitle: "Detailed Jurisdiction & Escalation Directory",
  courts: [
    { id: 5, level: "Highest Revenue Court", name: "Board of Revenue (BOR), Ajmer", role: "Appellate & Revisional Authority", responsibilities: "Apex judicial and administrative head of all revenue courts and land record systems in Rajasthan.", jurisdiction: "State-wide (Entire State of Rajasthan).", casesHandled: "Second appeals, revision petitions, and reference queries regarding tenancy disputes, land valuations, and boundary conflicts.", powers: "Supreme revisional, appellate, and administrative oversight. Its orders are binding on all subordinate revenue courts in the state.", appealsGoTo: "Hon'ble High Court of Rajasthan (Writ Jurisdiction).", importantNotes: "Established in 1949, the Board of Revenue is situated in Ajmer and is the final state authority for interpreting Rajasthan revenue codes.", shortDescription: "Apex judicial body and administrative head of all revenue courts in Rajasthan." },
    { id: 4, level: "Appellate Court", name: "Divisional Commissioner / Revenue Appeals Commissioner (RAC)", role: "First/Second Appeals", responsibilities: "Appellate authority for decisions of Sub-Divisional Officers and District Collectors in critical land cases.", jurisdiction: "Division-wide (comprising multiple districts).", casesHandled: "First appeals against SDO decrees on agricultural partitions, ejectments, tenancy rights declarations, boundary disputes, and second appeals against Collector's orders.", powers: "Appellate and supervisory jurisdiction under Section 75 of the Rajasthan Land Revenue Act and Section 223 of the Rajasthan Tenancy Act.", appealsGoTo: "Board of Revenue (BOR), Ajmer.", importantNotes: "RAC courts are specialized courts set up to expedite judicial reviews of revenue disputes before they reach the Board of Revenue.", shortDescription: "Hears appeals against SDO and Collector orders on land disputes and tenancy decrees." },
    { id: 3, level: "District Court", name: "District Collector / Additional Collectors", role: "Appellate & Administrative Head", responsibilities: "District revenue head, appellate authority for local revenue disputes, and supervisor of land record corrections.", jurisdiction: "District-wide.", casesHandled: "Appeals against Tehsildar's mutation and eviction orders; valuation of stamps; administrative land allotments; boundary corrections.", powers: "High administrative and appellate powers, including power to transfer cases, review lower orders, and record corrections (Sec. 136).", appealsGoTo: "Divisional Commissioner or Board of Revenue, Ajmer.", importantNotes: "The Collector represents the state government at the district level, merging administrative power with revenue judicial authority.", shortDescription: "Adjudicates record corrections and hears appeals against Tehsildar mutation orders." },
    { id: 2, level: "Sub-Division Court", name: "Sub-Divisional Officer (SDO) / Assistant Collector", role: "Primary Trial Court for Suits", responsibilities: "Primary original trial court for major tenancy suits, declarations of rights, and land conversions.", jurisdiction: "Sub-Division scope (comprising multiple Tehsils).", casesHandled: "Tenancy declarations, agricultural partition suits, ejectment and injunction matters, and Section 90-A land-conversion proceedings.", powers: "Original judicial jurisdiction over major tenancy suits and delegated administrative authority for land conversion.", appealsGoTo: "Revenue Appeals Commissioner (RAC) or District Collector.", importantNotes: "The SDO is a critical judicial authority where the majority of tenancy and land declaration disputes are instituted.", shortDescription: "The primary original trial court for major tenancy suits and land conversions (Sec. 90-A)." },
    { id: 1, level: "Local Revenue Officer", name: "Tehsildar / Naib Tehsildar Courts", role: "Local Executive & Trial Officer", responsibilities: "Primary authority for disputed and undisputed land mutations, records correction, and eviction of encroachments.", jurisdiction: "Tehsil / Sub-Tehsil administrative level.", casesHandled: "Mutation disputes, right-of-way applications, record corrections, and summary eviction proceedings against encroachments.", powers: "Local land-record administration, Section 91 eviction powers, and adjudication of specified mutation and easement matters.", appealsGoTo: "District Collector or Sub-Divisional Officer.", importantNotes: "Tehsildars are designated as Land Record Officers and act as the primary interface for local citizens in all revenue matters.", shortDescription: "First-level trial court for mutation disputes, easements, and encroachment evictions (Sec. 91)." },
  ],
  appealProcess: { title: "Appeal Escalation Process", paragraphs: ["In revenue law, matters generally flow upwards from the local executive to the apex judicial body. If a petitioner is unsatisfied with a Tehsildar's mutation decision, they file an appeal with the District Collector. For suits regarding tenant ownership or partitions decided by SDO courts, the appeal lies with the Revenue Appeals Commissioner (RAC).", "The Board of Revenue in Ajmer acts as the final supreme court for all revenue disputes. Further appeals against the Board of Revenue are presented before the Hon'ble High Court of Rajasthan (Jaipur/Jodhpur benches) under Writ Jurisdiction."] },
};


const caseTypesConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Legal Categories", title: "Types of Cases", highlight: "in Rajasthan Revenue Law", description: "A guide to the most common legal disputes, applications, and suits handled under the jurisdiction of state revenue officers." },
  caseTypes: [
    { icon: "Layers", title: "Mutation & Record Corrections (Namantaran)", description: "Disputes relating to inheritance (Fauti), sale transfers, or gift deeds where the Patwari records or mutation entries are challenged or delayed.", statute: "Section 135, Rajasthan Land Revenue Act 1956" },
    { icon: "Compass", title: "Partition of Agricultural Holdings (Bantwara)", description: "Suits filed by co-sharers (joint khatedars) to split their agricultural holdings into specific demarcated shares with independent land maps.", statute: "Section 53, Rajasthan Tenancy Act 1955" },
    { icon: "ShieldAlert", title: "Eviction of Encroachments (Kabza / Trespass)", description: "Proceedings initiated by the state or landowners against unauthorized trespassers occupying public/private agricultural pasture land (Charagah).", statute: "Section 91 (State Land) & Section 188 (Tenant Protection)" },
    { icon: "FileCheck", title: "Land Conversion Cases (Section 90-A)", description: "Applications or regularisation cases regarding changing agricultural land use for residential development, commercial layouts, or industrial units.", statute: "Section 90-A, Rajasthan Land Revenue Act 1956" },
    { icon: "Gavel", title: "Right of Way & Easements (Rasta Nikaas)", description: "Suits filed before the Tehsildar to seek a new pathway, widen existing pathways, or clear blockages in paths leading to agricultural fields.", statute: "Section 251 & 251-A, Rajasthan Tenancy Act 1955" },
    { icon: "Landmark", title: "Declaration of Tenancy Rights (Khatedari Suit)", description: "Suits seeking declaration that a tenant has acquired permanent, inheritable, and transferable Khatedari rights over specific revenue lands.", statute: "Section 88 & 183, Rajasthan Tenancy Act 1955" },
  ],
  firstSchedule: { eyebrow: "Judicial Jurisdiction", title: "Section 23 & The First Schedule of RLRA 1956", introduction: "Under the Rajasthan Land Revenue Act, 1956, judicial matters are categorized separately to determine the correct jurisdiction and escalation. Section 23 of the Rajasthan Land Revenue Act, 1956 governs the list of these judicial proceedings, reproduced below:", sectionTitle: "Section 23 - Rules defining what matters are judicial or otherwise", sectionText: "The Board may, with the previous sanction of the State Government, make rules declaring what matters shall be deemed to be judicial matters and what matters shall be deemed to be non-judicial matters under this Act. The list of such judicial matters is detailed under the First Schedule of the Act.", listTitle: "The First Schedule (See Section 23) — List of Judicial Matters", items: ["Claims under sub-section (2) of section 88.", "Disputes with respect to the right of grazing cattle on pasturage land.", "Disputes as to the right of user over forest growth and exclusion from forest land.", "Settlement of boundary disputes.", "Disputes as to entries in the record of rights and annual registers.", "Disputes respecting the class or tenure of tenants.", "Mutation upon succession, transfer or otherwise.", "Disputes regarding the rent or revenue payable.", "Disputes concerning Waj-ul-arz or Dastoor Ganwai.", "Inquiry into and assessment of lands held free of revenue or rent.", "Partition and consolidation of estates.", "Imposition of fines, penalties, forfeitures and confiscations under this Act.", "Determination of compensation.", "Sales and auctions under this Act.", "Such other matters as may be prescribed by the State Government."] },
  cta: { title: "Looking for Judicial Precedents?", description: "Search through our database of judgments filtered by specific case categories like partition, mutation rights, and land conversions.", label: "Explore Board of Revenue Judgments", href: "/judgments" },
};

const caseStagesConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Litigation Journey", title: "The Stages in Revenue Cases", highlight: "Complete Legal Workflow", description: "A comprehensive, step-by-step roadmap detailing the legal phases of a revenue dispute in Rajasthan—from the original filing of the suit to the final execution." },
  introduction: { title: "Understanding the Revenue Litigation Lifecycle", paragraphs: ["Under the Rajasthan Tenancy Act, 1955 and the Rajasthan Land Revenue Act, 1956, disputes related to agricultural land, partition, boundaries, encroachments, and mutations are handled by specialized revenue courts. These courts function under a distinct procedural code designed to adjudicate land ownership, possession, and administration rights.", "While revenue trials share similarities with regular civil proceedings, they heavily rely on official land records kept by local officers (Patwari, Tehsildar) and local spot inspections (Mauka Muayana). Understanding each phase of a revenue suit empowers advocates, revenue officials, and landholders to steer the litigation effectively."] },
  workflow: { title: "Step-by-Step Workflow", description: "Showing the timeline of progress stages. Click on cards to expand or collapse detailed guidelines.", searchPlaceholder: "Search stages by keyword (e.g., 'Appeal', 'Evidence', 'Patwari', 'Summons')...", expandLabel: "Expand All", collapseLabel: "Collapse All" },
  stages: [
    { step: 1, id: "filing", title: "Filing of Case / Petition (वाद दायर करना)", icon: "FileText", description: "The legal journey begins with the filing of a formal petition or lawsuit (Plaint) in the competent Revenue Court. This document contains details of the parties, description of the land in dispute, facts of the dispute, and the relief sought.", keyPoints: ["Drafting of the plaint under relevant provisions of the Rajasthan Tenancy Act, 1955 or Land Revenue Act, 1956.", "Attaching vital documents: latest Record of Rights (Jamabandi), Trace Map (Aks Shajra), and copy of mutations.", "Checking and verification of the suit value and affixing proper Court Fee stamps.", "Registration of the case in the Court Registry under the supervision of the Munsarim (Reader)."], authority: "Sub-Divisional Officer (SDO), Tehsildar, or Assistant Collector having local jurisdiction over the land." },
    { step: 2, id: "notice", title: "Notice & Summons to Parties (समन/नोटिस जारी करना)", icon: "Scale", description: "Principles of natural justice require that the other party must be informed. Once the case is admitted, the court issues official summons to the defendants/respondents instructing them to appear and present their defense.", keyPoints: ["Preparation of notices listing the next date of hearing and description of the claim.", "Service of notice by Nazarat process servers, registered post with acknowledgment due, or digital methods.", "If the party avoids service, alternative measures like publication in local newspapers (Dhandora or Gazette) are initiated.", "Service of summons must be officially verified before proceeding to further hearings."], authority: "Court's process server section (Nazarat Branch) under the authority of the Presiding Judge." },
    { step: 3, id: "reply", title: "Submission of Written Reply (जवाब दावा)", icon: "FileCheck", description: "The defendant/respondent submits their paragraph-by-paragraph response to the plaint. They can also file preliminary objections on legal grounds or raise a counter-claim.", keyPoints: ["Denial or admission of allegations with corresponding legal and factual evidence.", "Raising preliminary issues such as limitation period expired, lack of court jurisdiction, or non-joinder of necessary parties.", "Filing within the mandated timeline, generally 30 days from the service of summons, with discretionary extensions.", "Must be accompanied by documents the defendant relies upon for their defense."], authority: "Filed directly before the adjudicating Revenue Court." },
    { step: 4, id: "evidence", title: "Evidence & Document Production (साक्ष्य एवं दस्तावेज)", icon: "Layers", description: "The court lists out the points of dispute (Framing of Issues) and calls upon both sides to present oral testimonies and submit certified public documents to establish their rights.", keyPoints: ["Framing of Issues (विवादक): Defining clear questions of fact and law that the court must decide.", "Plaintiff's Evidence (PE): Production of primary certified records (Jamabandi, Girdawari, mutation papers) and chief examination of witnesses.", "Defendant's Evidence (DE): Production of defense witnesses and cross-examination of plaintiff's witnesses by opposite counsel.", "Submission of expert reports (e.g. handwriting experts) if applicable."], authority: "Presiding Officer of the Revenue Court (Tehsildar/SDO/Collector)." },
    { step: 5, id: "hearing", title: "Hearing Process & Local Inspection (सुनवाई एवं मौका मुआयना)", icon: "Gavel", description: "Ongoing hearings take place for arguments on interim applications (like stays under Section 212). The court often orders local spot inspections to verify the actual physical state and possession of the disputed land.", keyPoints: ["Arguments on temporary injunctions to protect the land from being sold or modified during the trial.", "Appointment of a commissioner (usually Tehsildar, Inspector Land Records, or Patwari) for field inspection (Mauka Muayana).", "Drafting of the spot inspection report (Mauka Report) alongside maps and signatures of local witnesses.", "The Spot Report is treated as a highly reliable piece of evidence by the courts."], authority: "Circle Patwari / Revenue Inspector (RI) / Tehsildar acting as Court Commissioner." },
    { step: 6, id: "arguments", title: "Final Arguments (अंतिम बहस)", icon: "Clock", description: "After the closure of evidence for both sides, the advocates present their structured final oral arguments, referencing the framed issues, recorded testimonies, and state judicial precedents.", keyPoints: ["Summarizing the evidence and proving how the framed issues favor their client.", "Rebutting the opponent's evidence and highlighting flaws or contradictions in testimonies.", "Citing relevant judgments from the Board of Revenue Ajmer (RRD), Rajasthan High Court, or Supreme Court.", "Filing of written arguments/synopsis for the court's reference."], authority: "Presented by the legal counsels representing the parties before the Presiding Judge." },
    { step: 7, id: "judgment", title: "Order / Judgment (आदेश/निर्णय)", icon: "Award", description: "The presiding officer evaluates the pleadings, evidence, and arguments, and pronounces a reasoned judgment resolving each issue, followed by a formal Decree.", keyPoints: ["The judgment must detail the facts, the issues framed, findings on each issue, and final relief.", "A formal Decree (डिग्री) is prepared within 15 days, reflecting the operational part of the judgment.", "The court sends a copy of the order to the Land Records division to implement mutations or corrections if required."], authority: "The Presiding Officer of the Court (e.g. SDO, Tehsildar, or Collector)." },
    { step: 8, id: "appeal", title: "Appeal & Revision Process (अपील एवं निगरानी)", icon: "Scale", description: "Any party aggrieved by the final order or decree has the right to challenge it before higher appellate courts within the prescribed limitation period.", keyPoints: ["First Appeal: Lies from Tehsildar to Collector, or from SDO to Revenue Appeals Commissioner (RAC) / Collector, within 30-60 days.", "Second Appeal: Lies to the Board of Revenue (BOR) Ajmer, on specific questions of law, within 90 days.", "Revision: Can be filed before the Board of Revenue Ajmer at any time to correct material irregularities or jurisdictional errors.", "Writ Petition: Challenging BOR orders before the Rajasthan High Court (Jodhpur/Jaipur Benches) under Articles 226/227."], authority: "District Collector, Revenue Appeals Commissioner (RAC), Board of Revenue Ajmer, Rajasthan High Court." },
    { step: 9, id: "execution", title: "Execution of Order (आदेश का निष्पादन)", icon: "FileCheck", description: "Winning the lawsuit is only half the battle. The successful party must file an execution application to physically enforce the decree, such as ejecting a trespasser, dividing holdings, or updating land records.", keyPoints: ["Filing of an Execution Petition (Muddai Ijra) in the original trial court within the limitation period.", "Issuance of warrants of possession, demolition of unauthorized structures, or boundary demarcation.", "Physical execution on the spot with the help of local administration and police if necessary.", "Circle Patwari recording the final mutation entries in the Jamabandi to complete the legal cycle."], authority: "The Court of First Instance (e.g., SDO or Tehsildar) through the field revenue staff (Patwari/Kanungo)." },
  ],
  related: { title: "Related Articles & Guides", description: "Expand your knowledge on litigation pathways and rules under Rajasthan Land Codes.", loadingText: "Loading relevant articles..." },
};


const importantRulesConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Statutory Rules & Guidelines", title: "Important Rules &", highlight: "Land Conversion Guidelines", description: "Access the 10 critical rules of Rajasthan Revenue Law alongside the complete statutory process for agricultural land conversion under Section 90-A." },
  tabs: { rules: "10 Important Rules", conversion: "Land Conversion (Section 90-A)", gochar: "Gochar Land Rules", mandir: "Mandir Maafi Land" },
  rulesTitle: "10 Critical Rules of Rajasthan Land Revenue",
  rules: [
    { number: 1, title: "Section 42 (Restriction on Land Transfer)", description: "Sale, gift, bequest, or mortgage of agricultural land belonging to a Scheduled Caste (SC) or Scheduled Tribe (ST) member to a non-SC/ST member is strictly prohibited. Any such transaction is legally void (ab initio)." },
    { number: 2, title: "Section 90-A (Mandatory Non-Agricultural Conversion)", description: "Agricultural land cannot be used for commercial, residential, or industrial purposes without obtaining a formal conversion order from the Sub-Divisional Officer (SDO) or competent authority." },
    { number: 3, title: "Section 91 (Encroachment on Government Land)", description: "Unauthorised occupation or encroachment on government/public land is an offense. The Tehsildar has summary powers to levy fines (up to 30 times the land revenue), order demolition, and evict trespassers." },
    { number: 4, title: "Section 53 (Right to Claim Partition)", description: "Any co-sharer (khatedar tenant) has the absolute right to file a suit for partition of their joint agricultural holding to separate their individual share and obtain a distinct mutation entry." },
    { number: 5, title: "Limitation Period for Revenue Appeals", description: "Appeals against Tehsildar decisions must be filed within 30 days. Appeals against SDO or Collector decrees to higher appellate forums (RAC or BOR) must generally be filed within 60 to 90 days from the date of the decision." },
    { number: 6, title: "Succession Mutation (Fauti Namantaran)", description: "Upon the death of a Khatedar tenant, mutations in favor of legal heirs must be reported to the Patwari. Undisputed successions must be registered immediately; disputes must be referred to the Tehsildar court." },
    { number: 7, title: "Protection of Charagah (Pasture) Lands", description: "Pasture lands (Charagah) belong to the local Gram Panchayat and are reserved for communal grazing. Allotment or commercial conversion of Charagah land is strictly illegal, as upheld by multiple Board of Revenue rulings." },
    { number: 8, title: "Section 188 (Injunction against Trespass)", description: "A khatedar tenant in peaceful possession of land can file a suit for permanent injunction to prevent any third party or trespasser from interfering with their agricultural operations or possession." },
    { number: 9, title: "Section 251 (Easement and Right of Way)", description: "Landowners have a right of easement. A tenant can file an application before the Tehsildar to demand a new path or resolve blockades on existing agricultural cart-tracks through adjoining fields." },
    { number: 10, title: "Revisional Jurisdiction of Board of Revenue", description: "The Board of Revenue (Ajmer) retains apex revisional powers to call for records of any subordinate revenue court and correct material irregularities or jurisdictional errors, even if no appeal has been filed." },
  ],
  conversion: { title: "What is Section 90-A?", description: "Under the Rajasthan Land Revenue Act, 1956, Section 90-A mandates that agricultural holdings cannot be utilized for non-agricultural purposes (like residential houses, commercial buildings, institutional campuses, or manufacturing industries) without explicit written permission from the state government or designated revenue officers (SDOs).", warningTitle: "Consequences of Unauthorized Use", warning: "Using agricultural land for non-agricultural purposes without obtaining a Section 90-A conversion order is an offense. It leads to the forfeiture of tenancy rights, demolition of unauthorized structures, and penalty assessments up to 30 times the land revenue rate.", workflowTitle: "The Conversion Process Workflow", workflowDescription: "Standard administrative path for securing a land conversion order in Rajasthan." },
  conversionSteps: [
    { title: "1. Submission of Form-A", description: "The applicant submits an application in Form-A along with ownership documents, land maps (trace map), and a proposed layout plan to the Sub-Divisional Officer (SDO) or local Urban Improvement Trust (UIT) / Municipal body." },
    { title: "2. Technical Scrutiny & Field Report", description: "The SDO routes the file to the Tehsildar. The Patwari performs a site inspection (Moka report) to verify if the land is free of boundary disputes, is not government or Charagah land, and matches the revenue record maps." },
    { title: "3. Public Objections Notice", description: "A public notice is issued in local newspapers and posted at the Tehsil office allowing 7 to 15 days for any co-sharers or neighboring landowners to file objections regarding land ownership or public pathway blocks." },
    { title: "4. Issuance of Demand Note", description: "If no valid objections are received and the field report is positive, the authority issues a demand note detailing the conversion charges, regularisation fees, and development levies based on current DLC rates." },
    { title: "5. Sanction Order & Patta Issuance", description: "Upon deposit of the demanded amount, the SDO or municipal authority issues the official land conversion order and executes a non-agricultural lease/patta, completing the conversion process." },
  ],
  documentsTitle: "Documents Checklist",
  documents: ["Latest copy of Jamabandi (not older than six months)", "Revenue map (Khasra Naksha) signed by the Patwari", "Proposed layout plan of the conversion area showing public roads", "Title deed or registry copy proving Khatedari ownership", "Affidavit stating that the land is not subject to court stay/ceiling limit", "No-Objection Certificate (NOC) if close to forest/historical sites"],
  cta: { icon: "FileText", title: "Need the Official Form-A Application Template?", description: "Download the official print-ready Form-A PDF required for submitting your land conversion file to the SDO/Local Authority.", label: "Download Form-A PDF", href: "/downloads" },
  gochar: {
    title: "Rules Governing Gochar (Pasture) Land",
    description: "Gochar (pasture) lands in Rajasthan are communal properties reserved for village cattle grazing, regulated under the Rajasthan Tenancy Act, 1955, and the Land Revenue Act, 1956.",
    warningTitle: "Strict Prohibition on Allotment",
    warning: "Under Section 16 of the Rajasthan Tenancy Act, 1955, Khatedari rights cannot accrue in pasture lands. Any allotment of Gochar land for residential, agricultural, or commercial use is void and illegal.",
    pointsTitle: "Key Guidelines for Pasture Land Protection",
    points: [
      { title: "No Khatedari Rights", text: "Pasture lands are recorded as 'Ghair Mumkin Charagah'. No person can acquire permanent tenancy rights over pasture lands." },
      { title: "Mandatory Equivalent Allotment", text: "If any pasture land is diverted for a public utility project (e.g., roads, electricity sub-stations), the state government must allocate an equivalent area of agricultural land of equal value to be developed as pasture land in the same village." },
      { title: "Gram Panchayat Management", text: "The local Gram Panchayat holds the right of management and is responsible for maintaining pasture lands and ensuring they remain free from unauthorized occupation." },
      { title: "Tehsildar Eviction Powers", text: "Under Section 91 of the Land Revenue Act, 1956, Tehsildars have summary powers to evict encroachers on pasture land, demolish unauthorized structures, and impose penalty fines." }
    ]
  },
  mandir: {
    title: "Rules Governing Mandir Maafi (Temple) Land",
    description: "Mandir Maafi lands are special revenue grants made historically to temples for their maintenance and worship, governed under strict deity ownership principles in Rajasthan.",
    warningTitle: "No Personal Ownership for Pujaris",
    warning: "A Pujari or priest is merely a manager of the temple land and holds no personal Khatedari or transfer rights. Any sale, mortgage, gift, or long-term lease of temple lands by a Pujari is null and void.",
    pointsTitle: "Key Guidelines for Mandir Maafi Land Protection",
    points: [
      { title: "Deity as Juristic Owner", text: "The presiding deity of the temple is recognized as a juristic person and perpetual minor. The title and Khatedari of the land rest solely with the deity (idol)." },
      { title: "Pujari as Manager Only", text: "The Pujari’s name is recorded in the Jamabandi only as 'Prabandhak' (manager) or 'Pujari' for performing worship, never as the tenant or owner." },
      { title: "Strict Prohibition on Sale", text: "Temple lands cannot be alienated or sold. Any registration of sale deeds or mutation based on transfers made by a Pujari is illegal and subject to cancellation." },
      { title: "Devasthan Supervision", text: "Public temples and their associated Maafi lands are supervised by the Devasthan Department. Encroachments or illegal transfers are prosecuted under public trust guidelines." }
    ]
  }
};

const importantConceptsConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Knowledge Base", title: "Important Concepts", highlight: "in Rajasthan Land Laws", description: "A detailed breakdown of key terminology, land classifications, and statutory definitions frequently used in state land proceedings." },
  concepts: [
    { title: "Khatedari Rights (Tenancy Rights)", description: "The highest class of tenancy in Rajasthan. A Khatedar tenant holds permanent, inheritable, and transferable rights to cultivate and possess agricultural land, subject to state revenue rules. Under Section 42 of the Tenancy Act, transfer of Khatedari land from a Scheduled Caste/Tribe member to a non-SC/ST member is strictly prohibited.", impact: "Impact: Allows the tenant to sell, gift, bequeath, or mortgage land for credits." },
    { title: "Gair-Khatedari Rights (Probationary Tenancy)", description: "A temporary, probationary class of tenancy. Gair-Khatedars do not hold transfer rights over their holdings. Typically, a land allotment or regularisation begins as a Gair-Khatedari tenancy and is upgraded to Khatedari status after 10 years of continuous possession and clean records.", impact: "Impact: Cannot sell or mortgage the land; subject to eviction if conditions of allotment are violated." },
    { title: "Jamabandi (Record of Rights - RoR)", description: "The primary document of land administration updated every 5 years. It contains complete details of the land holding (Khasra number, area, boundaries), names of co-sharers (Khatedars), their respective shares, mortgages, disputes, and annual revenue liabilities.", impact: "Impact: Crucial title verification document for any land transaction or bank loan." },
    { title: "Fauti Namantaran (Succession Mutation)", description: "The process of deleting the name of a deceased Khatedar tenant from the Jamabandi and entering the names of their legal heirs. Under recent administrative reforms, Patwaris must register Fauti mutations immediately based on the family's self-declaration, and disputes are referred to the Tehsildar.", impact: "Impact: Essential to establish the title of legal heirs before partition or sale." },
    { title: "Charagah Land (Government Pasture Land)", description: "Communal land reserved for pasture and cattle grazing under the administration of Gram Panchayats. Under Rajasthan Land Revenue Rules, Charagah land is strictly protected, and any conversion or allotment of Charagah land for residential or commercial purposes is legally barred unless exceptional public utility rules apply.", impact: "Impact: Encroachments on Charagah land lead to strict eviction orders under Section 91." },
    { title: "DLC Rates (District Level Committee Rates)", description: "The minimum stamp valuation rate of land set by a District Level Committee. It varies based on land classification (agricultural, residential, commercial, industrial) and highway proximity. It serves as the baseline for calculating registration fees, stamp duty, and land conversion charges under Section 90-A.", impact: "Impact: Determines the transaction costs and conversion fees payable to the state." },
  ],
  cta: { icon: "Bookmark", title: "Need to look up specific legal terms?", description: "Search our comprehensive, database-backed legal glossary containing definitions for local vernacular land terms like Jamabandi, Khasra, Girdawari, and Fauti.", label: "Explore Revenue Glossary", href: "/glossary" },
};


const judgmentWritingConfig = {
  schemaVersion: 1,
  hero: { eyebrow: "Educational Guide", title: "Judgment Writing Guide", highlight: "in Revenue Matters", description: "A structured blueprint for advocates, researchers, and junior officers on draft legal judgment writing." },
  backLink: { label: "Back to Judgments Portal", href: "/judgments" },
  introduction: { title: "Introduction", content: "Judgment writing is the culmination of judicial proceedings. In revenue law, which deals with tangible assets, tenancy livelihoods, and state land records, clarity and administrative correctness are paramount. A well-written revenue judgment must resolve title declarations, partition splits, or eviction disputes with precision, anchoring every legal finding in relevant tenancy statutes, boundary trace maps, and executive notifications." },
  structureTitle: "Structure of a Legal Judgment",
  structureSteps: [
    { title: "1. Preliminaries", description: "Includes the court header, case category, registration number, names of parties, and names of representing advocates." },
    { title: "2. Introductory Facts", description: "A brief history of the dispute, starting from the original land claim, mutation entries, or inheritance dispute." },
    { title: "3. Framing of Issues", description: "Delineating the specific questions of fact and law that the court must decide (e.g., Khatedari status under Sec 88)." },
    { title: "4. Marshalling Evidence", description: "Reconciling testimonies, inspecting Patwari trace maps, field survey records, and revenue registration receipts." },
    { title: "5. Findings & Analysis", description: "Evaluating issues against the Rajasthan Tenancy Act, Land Revenue Rules, and binding judicial precedents." },
    { title: "6. Operative Decree", description: "The final executable order. Explicit instructions on property partition, eviction actions, or record corrections." },
  ],
  format: {
    title: "Important Components & Format", description: "Drafting a judgment requires maintaining an objective, logical, and sequential format. Review the formal layout structure commonly practiced in revenue adjudication:", sampleTitle: "SAMPLE DRAFT FORMAT - REVENUE COURT OF RAJASTHAN", sample: `IN THE COURT OF THE SUB-DIVISIONAL OFFICER, KISHANGARH (AJMER)
Presided by: Hon'ble Shri _________________, SDO

Revenue Suit No: SDO/TA/452/2026
In the matter of:
Ram Lal Jat S/o Rameshwar Jat, R/o Village Jaitaran ... Plaintiff
v/s
State of Rajasthan through District Collector, Ajmer ... Defendant

SUIT FOR KHATEDARI DECLARATION UNDER SECTION 88 OF TENANCY ACT

Date of Pronouncement: July 10, 2026

[JUDGMENT / ORDER]
1. BRIEF FACTS: The plaintiff claims continuous possession of agricultural land in Khasra No. 120...
2. ISSUES FRAMED: Whether the plaintiff possesses long-term tenancy rights...
3. DISCUSSION & FINDINGS: On issue No. 1, the Halka Patwari register entries show...
4. DECREE: The suit is allowed. Mutation correction ordered. Parties to bear costs.

(Signed) Sub-Divisional Officer` },
  bestPracticesTitle: "Best Practices",
  bestPractices: ["Use precise plain legal English; avoid archaic terminology.", "Decide every framed issue separately with distinct findings.", "Address objections regarding SC/ST land transfers strictly per Section 42 rules.", "Always cite Patwari map records and DLC valuation rates if boundary or conversion suits are decided."],
  commonMistakesTitle: "Common Mistakes",
  commonMistakes: ["Failing to frame clear legal issues before analyzing evidence.", "Issuing vague decrees without specifying survey numbers or partition traces.", "Ignoring limitation periods for filing revisions or reviews.", "Failing to specify which party bears costs or revenue liabilities."],
  faqTitle: "FAQs on Judgment Drafting",
  faqs: [
    { question: "What is the difference between a judgment and a decree?", answer: "A judgment is the statement of grounds given by the judge on which a decree is based. A decree is the formal expression of an adjudication which conclusively determines the rights of the parties with regard to the matters in controversy." },
    { question: "Why is marshalling of evidence critical in revenue cases?", answer: "Land cases depend heavily on survey maps (Khasras) and revenue register records (Jamabandi). Marshalling ensures all documentary evidence is weighed against oral testimonies to establish continuous possession." },
    { question: "What is the standard format for writing a header in Rajasthan Revenue Courts?", answer: "The header must specify the court tier (e.g., 'In the Court of Sub-Divisional Officer, Kishangarh'), followed by the Case Type and Registration Number, Parties' details, and the date of reserving and pronouncing the judgment." },
  ],
  related: { title: "Related Reference Guides", links: [{ label: "Procedure of Revenue Law in Rajasthan", href: "/working-of-revenue-law" }, { label: "Glossary of Revenue Terms", href: "/glossary" }, { label: "Rajasthan Tenancy Act Statutory Guide", href: "/laws" }] },
};

const importantSectionsConfig = {
  schemaVersion: 1,
  title: "Few Important Sections of Rajasthan Revenue Laws",
  description: "Quick reference guide to the most vital statutory clauses of the Rajasthan Tenancy Act, 1955 and Rajasthan Land Revenue Act, 1956 frequently cited in revenue courts.",
  sections: [
    {
      act: "Rajasthan Tenancy Act, 1955",
      sectionNumber: "88",
      title: "Suit for declaration of Khatedari rights",
      description: "Any person claiming to be a tenant or a co-tenant may sue for a declaration of his right, which is the baseline suit for establishing agricultural land ownership title in Rajasthan."
    },
    {
      act: "Rajasthan Tenancy Act, 1955",
      sectionNumber: "53",
      title: "Partition of agricultural holding",
      description: "Enables a co-sharer (joint khatedar) to file a suit to divide a joint agricultural holding and demarcate individual shares on maps."
    },
    {
      act: "Rajasthan Tenancy Act, 1955",
      sectionNumber: "188",
      title: "Suit for injunction against trespass",
      description: "Protects a tenant in peaceful possession from unlawful dispossession or interference by any other person or trespasser."
    },
    {
      act: "Rajasthan Tenancy Act, 1955",
      sectionNumber: "251",
      title: "Rights of way and other easements",
      description: "Empowers the Tehsildar to adjudicate disputes regarding passage through fields and grant new passages or clear blocked tracks."
    },
    {
      act: "Rajasthan Land Revenue Act, 1956",
      sectionNumber: "90-A",
      title: "Use of agricultural land for non-agricultural purposes",
      description: "Regulates the conversion of agricultural holdings to residential, commercial, or industrial purposes, detailing SDO/UIT conversion power."
    },
    {
      act: "Rajasthan Land Revenue Act, 1956",
      sectionNumber: "91",
      title: "Eviction of trespassers from government land",
      description: "Summary powers given to Tehsildars to evict unauthorized occupants of government, pasture (Charagah), or communal lands, and levy penalty fines."
    },
    {
      act: "Rajasthan Land Revenue Act, 1956",
      sectionNumber: "135",
      title: "Mutation on succession or transfer",
      description: "Mandates reporting of land transfers (sales, gifts, inheritance) to update the record of rights (Jamabandi) through mutation entries."
    }
  ]
};

export const DEFAULT_SETTINGS = {
  site_name: "Rajasthan Revenue Law Platform",
  site_config: siteConfig,
  homepage_config: homepageConfig,
  about_config: aboutConfig,
  contact_config: contactConfig,
  legal_config: legalConfig,
  faq_config: faqConfig,
  working_revenue_config: workingRevenueConfig,
  court_hierarchy_config: courtHierarchyConfig,
  case_types_config: caseTypesConfig,
  case_stages_config: caseStagesConfig,
  important_rules_config: importantRulesConfig,
  important_concepts_config: importantConceptsConfig,
  judgment_writing_config: judgmentWritingConfig,
  important_sections_config: importantSectionsConfig,
};