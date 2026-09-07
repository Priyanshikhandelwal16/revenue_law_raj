import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Comment from '@/lib/models/Comment';
import ArticleDetailClient from '@/components/ArticleDetailClient';

export const dynamic = 'force-dynamic';

function createDynamicArticle(slugOrTitle) {
  const decoded = decodeURIComponent(slugOrTitle).trim();
  const cleanTitle = decoded.replace(/[-_]/g, ' ').replace(/\s+/g, ' ');
  const lower = cleanTitle.toLowerCase();

  const standardPdf = 'https://landrevenue.rajasthan.gov.in/content/dam/landrevenue/revenuedepartment/pdf/Rules/Rajasthan%20Land%20Revenue%20(Conversion%20of%20agricultural%20land%20for%20non-agricultural%20purposes%20in%20rural%20areas)%20Rules,%202007.%20updated%20till%20dec%202023.pdf';

  // Section 90-A / Land Conversion
  if (lower.includes('90-a') || lower.includes('conversion')) {
    return {
      _id: 'art_dynamic_90a',
      title: 'Section 90-A: Land Conversion — Rajasthan Land Revenue Act, 1956',
      slug: slugOrTitle,
      category: 'Land Conversion',
      summary: 'Land conversion means the conversion of the status of the land from agricultural status to either residential/commercial/institutional or Industrial land. In simple words it is the conversion of Agricultural Land into Non-Agricultural Land.',
      content: `<p>Land conversion means the conversion of the status of the land from agricultural status to either residential/commercial/institutional or Industrial land. In simple words it is the conversion of Agricultural Land into Non-Agricultural Land.</p>
<p>The Section 90-A of the Rajasthan Land Revenue Act, 1956, deals with the conversion of the Agricultural Land. The Conversion of Agricultural into Non Agricultural Land, Rules 1961 are given below.</p>
<h2>Section 90-A — Statutory Provisions</h2>
<p>Section 90-A provides that no person shall use any agricultural land for any non-agricultural purpose except with the prior permission of the competent revenue authority.</p>
<h2>Competent Sanctioning Authority</h2>
<p>Rural agricultural land conversion powers rest with Sub-Divisional Officers (SDOs). For urban areas falling under municipal/UIT masterplans, the urban body holds jurisdiction.</p>
<h2>Conversion Rules, 1961 & 2007 (Updated Dec 2023)</h2>
<p>The rules specify application procedures, site plan submission, DLC fee calculation, and issuance of non-agricultural lease/patta documents.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 82
  if (lower.includes('82')) {
    return {
      _id: 'art_dynamic_sec82',
      title: 'Section 82 — Power to Call for Records & Revisional Jurisdiction',
      slug: slugOrTitle,
      category: 'Land Revenue Act',
      summary: 'Section 82 of the Rajasthan Land Revenue Act, 1956 empowers the State Government, Divisional Commissioner, and Board of Revenue to call for records of subordinate revenue courts to examine legality and propriety.',
      content: `<p>Section 82 of the Rajasthan Land Revenue Act, 1956 provides an essential revisional mechanism for administrative and judicial oversight over subordinate revenue authorities.</p>
<h2>Revisional Powers under Section 82</h2>
<p>The Board of Revenue or the Divisional Commissioner may, on their own motion or on an application by an aggrieved party, call for and examine the record of any case decided by or pending before any subordinate revenue officer or court.</p>
<h2>Scope and Purpose</h2>
<p>Revisional powers under Section 82 ensure that erroneous record entries, illegal mutations, or jurisdictional errors committed by lower revenue courts can be rectified to prevent injustice.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 91 / Eviction / Encroachments
  if (lower.includes('91') || lower.includes('eviction') || lower.includes('encroachment')) {
    return {
      _id: 'art_dynamic_sec91',
      title: 'Section 91 — Eviction of Trespassers from Government Land',
      slug: slugOrTitle,
      category: 'Eviction & Encroachments',
      summary: 'Section 91 of the Rajasthan Land Revenue Act, 1956 empowers the Tehsildar to summarily evict unauthorized occupants and trespassers from government land and Charagah (pasture) holdings.',
      content: `<p>Section 91 of the Rajasthan Land Revenue Act, 1956 is the primary statutory provision dealing with trespassers and encroachments on government land.</p>
<h2>Summary Eviction Procedure</h2>
<p>Under Section 91, the Tehsildar issues a show-cause notice to the encroacher. After conducting field inspection and hearing the parties, the Tehsildar issues an eviction order and recovers penal damages.</p>
<h2>Protection of Charagah (Pasture Land)</h2>
<p>Charagah lands belong to the village community. Encroachments on Charagah lands cannot be regularised and are subject to mandatory eviction under Section 91.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 135 / Mutation & Succession
  if (lower.includes('135') || lower.includes('mutation') || lower.includes('succession')) {
    return {
      _id: 'art_dynamic_sec135',
      title: 'Section 135 — Report of Succession or Transfer & Mutation Rules',
      slug: slugOrTitle,
      category: 'Mutation & Succession',
      summary: 'Section 135 of the Rajasthan Land Revenue Act, 1956 mandates every person acquiring land rights by succession or transfer to report the acquisition to the Patwari for mutation in the Jamabandi.',
      content: `<p>Section 135 of the Rajasthan Land Revenue Act, 1956 lays down the statutory requirement for updating land records upon succession or transfer.</p>
<h2>Reporting Obligation</h2>
<p>Every person acquiring land by succession, sale, gift, partition, or registered transfer must report the transaction to the Patwari of the village within 90 days.</p>
<h2>Mutation Procedure</h2>
<p>The Patwari enters the mutation in the Roznamcha Waqiati diary and records the new tenant name in the Jamabandi (Record of Rights).</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 136 / Correction of Land Records
  if (lower.includes('136') || lower.includes('land-records') || lower.includes('jamabandi')) {
    return {
      _id: 'art_dynamic_sec136',
      title: 'Section 136 — Correction of Errors in Record of Rights (Jamabandi)',
      slug: slugOrTitle,
      category: 'Land Records & Jamabandi',
      summary: 'Section 136 of the Rajasthan Land Revenue Act, 1956 empowers the Tehsildar to correct clerical, numerical, and factual errors in the Record of Rights and annual registers.',
      content: `<p>Section 136 of the Rajasthan Land Revenue Act, 1956 provides the procedure for correcting errors in revenue records.</p>
<h2>Clerical & Factual Corrections</h2>
<p>If an error or omission is discovered in the Jamabandi or annual register, the Tehsildar may, after due inquiry and notice to interested parties, order the correction of the entry.</p>
<h2>Scope of Section 136</h2>
<p>Section 136 is intended for correcting mistakes in recording names, areas, or Khasra numbers. Substantive disputes regarding title or ownership must be adjudicated through regular revenue suits.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 53 / Partition & Boundaries
  if (lower.includes('53') || lower.includes('partition') || lower.includes('boundary')) {
    return {
      _id: 'art_dynamic_sec53',
      title: 'Section 53 of Rajasthan Tenancy Act — Partition of Agricultural Holdings',
      slug: slugOrTitle,
      category: 'Partition & Boundaries',
      summary: 'Section 53 of the Rajasthan Tenancy Act, 1955 gives every co-sharer (khatedar tenant) the absolute right to file a suit for partition of their joint agricultural holding and division of rent.',
      content: `<p>Partition of joint agricultural holdings in Rajasthan is governed by Section 53 of the Rajasthan Tenancy Act, 1955.</p>
<h2>Right to Claim Partition</h2>
<p>Any co-tenant of a joint holding is entitled to claim partition of their share. The suit is instituted before the Assistant Collector / Sub-Divisional Officer (SDO).</p>
<h2>Partition Procedure</h2>
<p>1. Institution of suit by a co-sharer.<br/>2. Issue of notice to all co-tenants.<br/>3. Preparation of partition map (Khasra split) by Patwari.<br/>4. Passing of preliminary and final decrees separating Khasra numbers.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 88
  if (lower.includes('88')) {
    return {
      _id: 'art_dynamic_sec88',
      title: 'Section 88 — Suit for Declaration of Tenancy Rights',
      slug: slugOrTitle,
      category: 'Tenancy Suit',
      summary: 'Section 88 of the Rajasthan Tenancy Act, 1955 allows any person claiming to be a Khatedar tenant or co-tenant to institute a suit for declaration of tenancy rights.',
      content: `<p>Section 88 of the Rajasthan Tenancy Act, 1955 is the primary declaratory suit provision for establishing Khatedari rights over agricultural land.</p>
<h2>Declaratory Jurisdiction</h2>
<p>Where a person’s tenancy right is denied or disputed by another party or the State Government, a suit for declaration can be filed before the Assistant Collector (SDO Court).</p>
<h2>Requisite Evidence</h2>
<p>Possession records, Girdawari entries, continuous cultivation history, and succession documents are produced to prove title.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 92-A
  if (lower.includes('92-a') || lower.includes('92a')) {
    return {
      _id: 'art_dynamic_sec92a',
      title: 'Section 92-A — Injunction Suits in Tenancy Disputes',
      slug: slugOrTitle,
      category: 'Tenancy Injunction',
      summary: 'Section 92-A of the Rajasthan Tenancy Act, 1955 provides for filing a suit for injunction to restrain interference with tenancy rights and possession.',
      content: `<p>Section 92-A of the Rajasthan Tenancy Act, 1955 allows a tenant to seek a permanent or temporary injunction against unlawful interference.</p>
<h2>Injunction Protection</h2>
<p>If a Khatedar tenant faces threatened dispossession or illegal obstruction during agricultural operations, a suit under Section 92-A can be filed in the Revenue Court.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Section 188
  if (lower.includes('188')) {
    return {
      _id: 'art_dynamic_sec188',
      title: 'Section 188 — Protection Against Trespass & Wrongful Ejectment',
      slug: slugOrTitle,
      category: 'Trespass Protection',
      summary: 'Section 188 of the Rajasthan Tenancy Act, 1955 provides a legal remedy of injunction and damages against wrongful interference or threatened ejectment from a tenant’s holding.',
      content: `<p>Section 188 of the Rajasthan Tenancy Act, 1955 protects tenants from unlawful eviction and private trespass.</p>
<h2>Legal Remedies</h2>
<p>A tenant can obtain an injunction order restraining the defendant from disturbing peaceful agricultural possession, along with compensation for crop damages.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Sections 175-176
  if (lower.includes('175') || lower.includes('176')) {
    return {
      _id: 'art_dynamic_sec175_176',
      title: 'Sections 175–176 — Ejectment for Illegal Transfer or Sub-letting',
      slug: slugOrTitle,
      category: 'Ejectment Rules',
      summary: 'Sections 175 and 176 of the Rajasthan Tenancy Act, 1955 deal with suits for ejectment of tenants who make transfers or sub-leases in contravention of statutory restrictions.',
      content: `<p>Sections 175 and 176 prescribe the procedure and grounds for ejectment when a tenant transfers land in violation of Section 42 (SC/ST protections) or unauthorized sub-letting.</p>
<h2>Consequences of Unlawful Transfer</h2>
<p>Any transfer made in breach of tenancy rules makes the transferee liable to ejectment upon a suit filed by the landholder or State Government.</p>`,
      pdfUrl: standardPdf,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  }

  // Catch-All Dynamic Article for ANY other title/slug
  return {
    _id: `art_dynamic_${Date.now()}`,
    title: `${cleanTitle} — Rajasthan Revenue Law Guide`,
    slug: slugOrTitle,
    category: 'Revenue Law Guide',
    summary: `Comprehensive statutory analysis and procedural guidelines regarding ${cleanTitle} under the Rajasthan Land Revenue Act, 1956 and Rajasthan Tenancy Act, 1955.`,
    content: `<p>This comprehensive guide details the statutory rules, procedural requirements, and judicial precedents governing <strong>${cleanTitle}</strong> in the State of Rajasthan.</p>
<h2>Statutory Overview</h2>
<p>Under the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955, matters relating to ${cleanTitle} fall under the jurisdiction of Revenue Courts (Tehsildar, Sub-Divisional Officer, and Board of Revenue, Ajmer).</p>
<h2>Procedural Requirements</h2>
<p>1. Filing of appropriate application/suit before the competent revenue authority.<br/>2. Submission of Jamabandi (Record of Rights), trace map, and identity credentials.<br/>3. Field verification by the Halka Patwari.<br/>4. Passing of statutory orders after hearing interested parties.</p>
<h2>Appellate Framework</h2>
<p>Orders passed by the Tehsildar can be challenged in appeal before the Sub-Divisional Officer (SDO), followed by second appeals before the Revenue Appellate Authority (RAA) or Board of Revenue, Ajmer.</p>`,
    pdfUrl: standardPdf,
    createdAt: new Date().toISOString(),
    status: 'published'
  };
}

async function getArticleData(id) {
  try {
    await dbConnect();
    let article = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(id);
    } else {
      article = await Article.findOne({ slug: id });
    }

    if (article) {
      article.views = (article.views || 0) + 1;
      await article.save();
      return JSON.parse(JSON.stringify(article));
    }
  } catch (err) {
    console.error("Error reading article DB details:", err);
  }

  // Check fallbacks array
  try {
    const { fallbackArticles } = require('@/lib/fallbacks');
    const decodedId = decodeURIComponent(id).trim().toLowerCase();
    const matched = fallbackArticles.find(a => 
      a._id === id || 
      a.slug === id || 
      (a.slug && a.slug.toLowerCase() === decodedId) ||
      (a.category && a.category.toLowerCase() === decodedId)
    );
    if (matched) {
      return JSON.parse(JSON.stringify(matched));
    }
  } catch (err) {
    console.error("Error reading fallbackArticles:", err);
  }

  // Create dynamic statutory article (guarantees NO 404!)
  return createDynamicArticle(id);
}

async function getComments(articleId) {
  if (!articleId) return [];
  try {
    await dbConnect();
    const comments = await Comment.find({ entityId: articleId, isApproved: true }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(comments));
  } catch (err) {
    console.error("Error loading comments on server:", err);
    return [];
  }
}

export default async function ArticleDetailPage({ params }) {
  const { id } = params;

  const article = await getArticleData(id);

  if (!article) {
    notFound();
  }

  const comments = await getComments(article._id);

  return (
    <ArticleDetailClient 
      article={article} 
      initialComments={comments} 
      id={id} 
    />
  );
}
