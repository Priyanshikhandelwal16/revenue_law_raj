import dbConnect from './db';
import Article from './models/Article';
import Judgment from './models/Judgment';
import RevenueLaw from './models/RevenueLaw';
import Notification from './models/Notification';
import Download from './models/Download';
import Glossary from './models/Glossary';
import Setting from './models/Setting';
import { 
  fallbackArticles, 
  fallbackJudgments, 
  fallbackLaws, 
  fallbackNotifications, 
  fallbackDownloads, 
  fallbackGlossary 
} from './fallbacks';

export async function checkAndSeedDatabase() {
  try {
    const isOffline = global.mongoose && global.mongoose.isOffline;
    if (isOffline) {
      return; 
    }

    await dbConnect();

    // 1. Articles
    const artCount = await Article.countDocuments({});
    if (artCount === 0) {
      console.log('Auto-seeding empty database: Articles...');
      const cleanArticles = fallbackArticles.map(a => {
        const doc = { ...a };
        if (doc._id.startsWith('art_mock_')) delete doc._id;
        return doc;
      });
      await Article.insertMany(cleanArticles);
    }

    // 2. Judgments
    const judCount = await Judgment.countDocuments({});
    if (judCount === 0) {
      console.log('Auto-seeding empty database: Judgments...');
      const cleanJudgments = fallbackJudgments.map(j => {
        const doc = { ...j };
        if (doc._id.startsWith('jud_mock_')) delete doc._id;
        return doc;
      });
      await Judgment.insertMany(cleanJudgments);
    }

    // 3. Laws
    const lawCount = await RevenueLaw.countDocuments({});
    if (lawCount === 0) {
      console.log('Auto-seeding empty database: Laws...');
      const cleanLaws = fallbackLaws.map(l => {
        const doc = { ...l };
        if (doc._id.startsWith('law_mock_')) delete doc._id;
        return doc;
      });
      await RevenueLaw.insertMany(cleanLaws);
    }

    // 4. Notifications
    const notCount = await Notification.countDocuments({});
    if (notCount === 0) {
      console.log('Auto-seeding empty database: Notifications...');
      const cleanNotifications = fallbackNotifications.map(n => {
        const doc = { ...n };
        if (doc._id.startsWith('not_mock_')) delete doc._id;
        return doc;
      });
      await Notification.insertMany(cleanNotifications);
    }

    // 5. Downloads
    const dwnCount = await Download.countDocuments({});
    if (dwnCount === 0) {
      console.log('Auto-seeding empty database: Downloads...');
      const cleanDownloads = fallbackDownloads.map(d => {
        const doc = { ...d };
        if (doc._id.startsWith('dwn_mock_')) delete doc._id;
        return doc;
      });
      await Download.insertMany(cleanDownloads);
    }

    // 6. Glossary
    const gloCount = await Glossary.countDocuments({});
    if (gloCount === 0) {
      console.log('Auto-seeding empty database: Glossary...');
      const cleanGlossary = fallbackGlossary.map(g => {
        const doc = { ...g };
        if (doc._id.startsWith('glo_mock_')) delete doc._id;
        return doc;
      });
      await Glossary.insertMany(cleanGlossary);
    }

    // 7. Settings
    const setMinCount = await Setting.countDocuments({});
    if (setMinCount === 0) {
      console.log('Auto-seeding empty database: Settings...');
      const defaultSettings = [
        { key: "site_name", value: "Rajasthan Revenue Law Knowledge Platform" },
        { 
          key: "homepage_config", 
          value: {
            heroTitle: "Rajasthan Revenue Law",
            heroSubtitle: "Knowledge Platform",
            heroDesc: "Revenue Law Raj is a dedicated Rajasthan Revenue Law Knowledge Platform designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The platform offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system.",
            heroButtonText: "Search Judgments",
            heroButtonUrl: "/judgments",
            heroSecButtonText: "Acts & Statutes",
            heroSecButtonUrl: "/laws",
            heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
            faqs: [
              { question: "What is Section 90-A of the Rajasthan Land Revenue Act?", answer: "Section 90-A governs the conversion of agricultural land for non-agricultural purposes such as residential, commercial, or industrial uses." },
              { question: "How do I file an appeal before the Board of Revenue?", answer: "An appeal is filed in writing accompanied by a certified copy of the order being appealed, submitted to the registry in Ajmer." }
            ]
          } 
        },
        {
          key: "about_config",
          value: {
            missionTitle: "Making Revenue Law Accessible to Everyone",
            missionText: "Revenue law in Rajasthan — spanning the Land Revenue Act of 1956, Tenancy Act of 1955, local circulars, and thousands of Board of Revenue judgments — is vast and difficult to navigate. RRLKP was founded to digitize, annotate, and organize these records so that legal professionals, landowners, and students can find the answers they need in seconds, not days."
          }
        },
        {
          key: "contact_config",
          value: {
            phone: "+91 99820 57461",
            email: "revenuelawraj@gmail.com",
            address: "B-30, Jamuna Nagar, Sodala, Jaipur, Rajasthan – 302006",
            socials: {
              facebook: "https://www.facebook.com/profile.php?id=61591658014580",
              twitter: "https://x.com/revenuelawraj",
              youtube: "https://www.youtube.com/@revenuelawraj",
              instagram: "https://www.instagram.com/revenuelawraj/"
            }
          }
        },
        {
          key: "legal_config",
          value: {
            terms: "<p>Welcome to the Rajasthan Revenue Law Knowledge Platform (RRLKP), also referred to as \"Revenue Law Raj\". By accessing or using our platform, website, and services, you agree to be bound by these Terms of Service. Please read them carefully.</p><h2>1. Use of the Platform</h2><p>This platform compiles public notifications, circulars, tenancy acts, and court judgments for academic research and professional reference. While we strive to maintain accurate copies of public gazettes, users are advised to verify the original government publication before presenting documents in court.</p><h2>2. Intellectual Property</h2><p>The custom commentary, layout design, compiled databases, and editorial summaries are the intellectual property of the Rajasthan Revenue Law Knowledge Platform. Public domain legal texts, bare acts, and gazette orders remain the property of the respective government authorities.</p><h2>3. Disclaimer of Legal Advice</h2><p>The content provided on this website does not constitute formal legal advice. Accessing this site or submitting a consultation query does not establish an advocate-client relationship. You should seek independent counsel for specific litigation concerns.</p><h2>4. User Accounts</h2><p>If you create an account in our admin portal or submit discussion comments, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p><h2>5. Prohibited Activities</h2><p>You may not scrape, download, or index large portions of our databases without explicit permission. Automated bots, security probes, and denial-of-service attempts are strictly prohibited and will lead to IP bans.</p><h2>6. Revisions and Modifications</h2><p>We reserve the right to update these terms at any time without prior notice. Continued use of the platform constitutes agreement to the revised terms.</p>",
            privacy: "<p>The Rajasthan Revenue Law Knowledge Platform (RRLKP) is committed to protecting your privacy. This policy details how we collect, use, and safeguard your personal details when you interact with our platform.</p><h2>1. Information We Collect</h2><p>We collect information that you explicitly share with us when using our contact forms, submit inquiry tickets, or post professional comments (such as name, email address, phone number, and professional practice areas).</p><h2>2. How We Use Information</h2><p>Your information is used to address your support tickets, send newsletter updates for legal circulars, and moderate the discussion boards. We do not sell, rent, or lease your personal information to third-party marketing services.</p><h2>3. Cookies and Analytics</h2><p>We use technical session cookies to keep you logged into the admin dashboard and monitor site traffic to optimize load speeds. You can disable cookies in your browser settings if preferred.</p><h2>4. Data Retention</h2><p>Personal details submitted via our contact forms or queries are retained only as long as necessary to resolve the query. User accounts and public comments are stored until deletion is requested by the user.</p><h2>5. Security Standards</h2><p>We implement appropriate physical, technical, and administrative security measures to protect your data from unauthorized access, alteration, or disclosure.</p>",
            disclaimer: "<p>The statutory acts, rules, circulars, and judicial precedents listed on this platform are compiled for research and educational purposes only.</p><h2>Accuracy of Information</h2><p>While we take every effort to keep our databases updated with accurate records from the Rajasthan Government Gazette and Board of Revenue Ajmer, we cannot guarantee that all records are completely free of typos or scanning errors.</p><h2>No Liability</h2><p>The owners, developers, and writers of the Rajasthan Revenue Law Knowledge Platform shall not be held liable for any decisions, legal strategies, or filings executed based on the information provided on this website. Always verify statutory clauses with official government prints before pleading cases before a revenue court.</p><h2>No Advocate-Client Relationship</h2><p>Accessing the platform or transmitting query letters through our contact system does not create an advocate-client relationship. All advice is informational and educational in nature.</p><h2>Third-Party Links</h2><p>This portal may link to external government sites or resource platforms. We hold no responsibility for the uptime, validity, or content of external links.</p>"
          }
        }
      ];
      await Setting.insertMany(defaultSettings);
    }
  } catch (err) {
    console.error('Error during auto-seeding database:', err);
  }
}
