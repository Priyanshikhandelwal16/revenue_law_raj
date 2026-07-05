// Fallback Mock Datasets for Rajasthan Revenue Law Knowledge Platform (RRLKP)
// Programmatically populates 25 Judgments, 10 Articles, and other lists.

// 1. DUMMY ARTICLES (10 items)
const articleTemplates = [
  { title: "Understanding Section 42 of the Rajasthan Tenancy Act, 1955", category: "Latest News", slug: "understanding-section-42" },
  { title: "Procedure for Correction of Land Records (Jamabandi)", category: "Latest News", slug: "correction-land-records" },
  { title: "Rights and Liabilities of a Gair-Khatedar Tenant", category: "Latest News", slug: "rights-gair-khatedar" },
  { title: "Prashasan Gaon Ke Sang Campaign: Key Land Conversions Benefits", category: "Latest News", slug: "prashasan-gaon-ke-sang" },
  { title: "Digitization of Cadastral Maps: Real-Time Verification Tools", category: "Latest News", slug: "digitization-cadastral-maps" },
  { title: "How to File a Revenue Partition Suit under Section 53", category: "Latest News", slug: "file-partition-suit" },
  { title: "Easement Rights on Agricultural Fields: Section 251-A Rules", category: "Latest News", slug: "easement-rights-251" },
  { title: "Allotment of Government Wasteland for Agricultural Use", category: "Latest News", slug: "allotment-government-wasteland" },
  { title: "Power of Revenue Courts: Board of Revenue Ajmer Rules", category: "Latest News", slug: "power-revenue-courts" },
  { title: "Mutation Process and Heir Declaration in Rajasthan", category: "Latest News", slug: "mutation-process-heir" }
];

export const fallbackArticles = articleTemplates.map((t, idx) => ({
  _id: `art_mock_${idx + 1}`,
  title: t.title,
  slug: t.slug,
  category: t.category,
  summary: `Detailed legal study and administrative guideline regarding ${t.title.toLowerCase()} in the state of Rajasthan.`,
  content: `<p>This article provides an in-depth analysis of <strong>${t.title}</strong>.</p><h2>Overview</h2><p>Under the Rajasthan Land Revenue framework, administrative clarity is essential for land management. Advocates and landowners must adhere to state statutes and circulars.</p><h2>Key Provisions</h2><p>Section guidelines and case precedents govern execution processes.</p>`,
  createdAt: new Date(2026, 5, 10 + idx).toISOString(),
  status: "published"
}));

// 2. DUMMY JUDGMENTS (25 items)
const judgmentTemplates = [
  { title: "Ram Lal Meena v. State of Rajasthan & Ors.", citation: "2026 RRD 101", case: "TA/421/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 53 Tenancy Act", "Sec. 135 Land Revenue Act"], summary: "Appeal challenging division of agricultural holdings. Partition must follow Patwari trace maps." },
  { title: "Giga Ram v. Board of Revenue Ajmer", citation: "2026 RLW 882", case: "SB/WP/1202/2026", court: "High Court of Judicature for Rajasthan, Jodhpur", laws: ["Sec. 91 Land Revenue Act", "Rule 7 Pasture Rules"], summary: "Writ petition challenging eviction from pasture lands. Charagah lands cannot be regularised." },
  { title: "Suresh Sharma v. Patwari Halka Jaitaran", citation: "2026 RRD 115", case: "REV/98/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 136 Land Revenue Act"], summary: "Mutation correction suit. Disputed succession mutation remanded for fresh hearing by Tehsildar." },
  { title: "Smt. Shanti Devi v. Rameshwar & Ors.", citation: "2026 RRD 120", case: "TA/121/2026", court: "Revenue Appeals Commissioner, Jaipur", laws: ["Sec. 42 Tenancy Act"], summary: "Sale of SC/ST agricultural holding to non-SC/ST declared null and void ab initio." },
  { title: "Bhanwar Lal v. State of Rajasthan", citation: "2026 RLW 412", case: "WP/9045/2025", court: "High Court of Judicature for Rajasthan, Jaipur", laws: ["Sec. 90-A Land Revenue Act"], summary: "Agricultural land converted for residential use must conform to approved masterplans." },
  { title: "Kailash Chand v. Collector Udaipur", citation: "2026 RRD 135", case: "COLL/88/2025", court: "Collector Court, Udaipur", laws: ["Sec. 75 Land Revenue Act"], summary: "Boundary demarcation dispute. Halka Patwari ordered to conduct fresh demarcation survey." },
  { title: "Madan Lal Jat v. SDO Kishangarh", citation: "2026 RRD 145", case: "REV/45/2026", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 251 Tenancy Act"], summary: "Easement path widening. SDO ordered restoration of traditional agricultural access pathway." },
  { title: "Hazari Singh v. State & Anr.", citation: "2026 RRD 150", case: "TA/88/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 91 Land Revenue Act"], summary: "Summary eviction order passed by Tehsildar upheld due to encroachment on government pasture land." },
  { title: "Smt. Geeta Bai v. Board of Revenue Ajmer", citation: "2026 RLW 190", case: "SB/WP/4502/2025", court: "High Court of Judicature for Rajasthan, Jodhpur", laws: ["Sec. 88 Tenancy Act"], summary: "Khatedari declaration. Long-term continuous possession of Gair-Khatedar tenant upgraded to Khatedari." },
  { title: "Rameshwar Prasad v. Tehsildar Bassi", citation: "2026 RRD 165", case: "TA/12/2025", court: "Revenue Appeals Commissioner, Jaipur", laws: ["Sec. 135 Land Revenue Act"], summary: "Mutation entries ordered to be updated based on partition decree of civil court." },
  { title: "Mohan Lal v. State of Rajasthan", citation: "2026 RRD 170", case: "WP/1102/2026", court: "High Court of Judicature for Rajasthan, Jodhpur", laws: ["Sec. 90-A Land Revenue Act"], summary: "Conversion charges must be calculated as per district DLC rates at the time of conversion." },
  { title: "Smt. Dhapu Devi v. SDO Jodhpur", citation: "2026 RRD 185", case: "SDO/89/2025", court: "SDO Court, Jodhpur", laws: ["Sec. 53 Tenancy Act"], summary: "Partition suit decreed dividing holding in equal halves between brother and sister co-sharers." },
  { title: "Kishan Singh v. State & Ors.", citation: "2026 RRD 192", case: "TA/330/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 91 Land Revenue Act"], summary: "Gram Panchayat lacks power to allot pasture lands for housing without state regularisation orders." },
  { title: "Narayan Lal v. Board of Revenue", citation: "2026 RLW 312", case: "WP/4412/2025", court: "High Court of Judicature for Rajasthan, Jaipur", laws: ["Sec. 188 Tenancy Act"], summary: "Injunction granted preventing trespassers from interfering with khatedar possession." },
  { title: "Smt. Prem Devi v. RAC Ajmer", citation: "2026 RRD 201", case: "RAC/12/2025", court: "Revenue Appeals Commissioner, Ajmer", laws: ["Sec. 75 Land Revenue Act"], summary: "Collector's order confirming mutation revision set aside due to lack of notice to affected heirs." },
  { title: "Shankar Lal v. Tehsildar Phalodi", citation: "2026 RRD 215", case: "TA/190/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 136 Land Revenue Act"], summary: "Clerical name errors in Jamabandi corrected immediately by Tehsildar order." },
  { title: "Pabu Ram v. State of Rajasthan", citation: "2026 RRD 220", case: "WP/902/2026", court: "High Court of Judicature for Rajasthan, Jodhpur", laws: ["Sec. 91 Land Revenue Act"], summary: "Trespasser fine doubled for repeated unauthorized cultivation of state nursery land." },
  { title: "Smt. Sayar Bai v. Collector Bhilwara", citation: "2026 RRD 235", case: "COLL/14/2025", court: "Collector Court, Bhilwara", laws: ["Sec. 75 Land Revenue Act"], summary: "First appeal allowed. Mutation entries set aside pending partition suit decision." },
  { title: "Jethmal v. SDO Barmer", citation: "2026 RRD 240", case: "SDO/112/2025", court: "SDO Court, Barmer", laws: ["Sec. 53 Tenancy Act"], summary: "Preliminary decree passed in partition suit ordering site plan preparation." },
  { title: "Prabhu Dayal v. State of Rajasthan", citation: "2026 RLW 990", case: "WP/102/2026", court: "High Court of Judicature for Rajasthan, Jaipur", laws: ["Sec. 90-A Land Revenue Act"], summary: "Conversion of land inside green belt banned under city masterplan rules." },
  { title: "Smt. Kesar Devi v. Board of Revenue", citation: "2026 RRD 255", case: "TA/44/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 42 Tenancy Act"], summary: "Transfer of land to non-SC/ST nullified and land vested in state government." },
  { title: "Chhitar Lal v. RAC Kota", citation: "2026 RRD 260", case: "RAC/88/2025", court: "Revenue Appeals Commissioner, Kota", laws: ["Sec. 75 Land Revenue Act"], summary: "Appeal dismissed. Demarcation survey report confirmed correct." },
  { title: "Bodu Ram v. Tehsildar Sanganer", citation: "2026 RRD 275", case: "TA/90/2025", court: "Board of Revenue for Rajasthan, Ajmer", laws: ["Sec. 91 Land Revenue Act"], summary: "Residential colony constructed on pasture land ordered to be demolished." },
  { title: "Smt. Raju Devi v. State & Ors.", citation: "2026 RLW 223", case: "WP/5561/2025", court: "High Court of Judicature for Rajasthan, Jaipur", laws: ["Sec. 188 Tenancy Act"], summary: "Temporary injunction in tenancy suit upheld by High Court." },
  { title: "Kalu Ram v. Collector Sikar", citation: "2026 RRD 295", case: "COLL/98/2025", court: "Collector Court, Sikar", laws: ["Sec. 75 Land Revenue Act"], summary: "Demarcation dispute. Local commissioner appointed to review land shares." }
];

export const fallbackJudgments = judgmentTemplates.map((t, idx) => ({
  _id: `jud_mock_${idx + 1}`,
  title: t.title,
  citation: t.citation,
  caseNumber: t.case,
  courtName: t.court,
  judgmentDate: new Date(2026, 4, 1 + idx).toISOString(),
  summary: t.summary,
  lawsCited: t.laws,
  fullText: `<h2>JUDGMENT</h2><p>This is a dispute concerning ${t.title}. Halka Patwari reports confirm the possession status.</p><h2>Decision</h2><p>In accordance with ${t.laws.join(', ')}, the court decrees that the appeal is decided accordingly.</p>`,
  pdfUrl: "/samples/sample.pdf",
  status: "published",
  isPinned: idx < 2
}));

// 3. DUMMY LAWS (2 items)
export const fallbackLaws = [
  {
    _id: "law_mock_1",
    title: "Rajasthan Tenancy Act, 1955",
    category: "Acts",
    description: "The consolidated law governing agricultural tenancies, classes of tenants, rent, partition, ejectment, and rights of landholders in the state of Rajasthan.",
    fullText: "<h2>The Rajasthan Tenancy Act, 1955</h2><p>Act No. 3 of 1955. An Act to consolidate and amend the law relating to tenancies of agricultural lands.</p>",
    sections: [
      { sectionNumber: "15", title: "Khatedar Tenants", content: "Every person who, at the commencement of this Act, is a tenant of land shall be deemed to be a Khatedar tenant." },
      { sectionNumber: "42", title: "SC/ST Sale Restrictions", content: "The sale of Khatedar interest is void if in favor of a person who is not SC/ST." }
    ],
    status: "published"
  },
  {
    _id: "law_mock_2",
    title: "Rajasthan Land Revenue Act, 1956",
    category: "Acts",
    description: "The primary legislation defining the powers of revenue courts, land surveys, record-of-rights maintenance, and administrative boundaries.",
    fullText: "<h2>The Rajasthan Land Revenue Act, 1956</h2><p>Act No. 15 of 1956. An Act to consolidate and amend the law relating to land revenue.</p>",
    sections: [
      { sectionNumber: "90-A", title: "Land Conversion", content: "No agricultural land shall be used for residential or commercial purposes without permission." },
      { sectionNumber: "91", title: "Trespassers Eviction", content: "Any person occupying land without authority may be summarily evicted by the Tehsildar." }
    ],
    status: "published"
  }
];

// 4. DUMMY NOTIFICATIONS (5 items)
export const fallbackNotifications = [
  {
    _id: "not_mock_1",
    title: "Disposal of Pending Mutation Disputes in Revenue Campaigns",
    refNumber: "F.9(2)Rev/Group-6/2026/18",
    department: "Revenue Department, Government of Rajasthan",
    publishDate: new Date("2026-06-01T00:00:00Z").toISOString(),
    summary: "State circular directing Tehsildars to hold camps for the speedy settlement of disputed mutations.",
    fileUrl: "/samples/sample.pdf",
    status: "published"
  },
  {
    _id: "not_mock_2",
    title: "New Guidelines for regularisation of rural housing on agricultural land",
    refNumber: "F.5(11)Rev/Group-3/2026/22",
    department: "Revenue Department, Government of Rajasthan",
    publishDate: new Date("2026-06-15T00:00:00Z").toISOString(),
    summary: "Circular introducing concessions on Section 90-A conversion charges in village habitations.",
    fileUrl: "/samples/sample.pdf",
    status: "published"
  },
  {
    _id: "not_mock_3",
    title: "DLC Rates updates for land valuation in rural areas",
    refNumber: "F.2(9)DLC/Group-1/2026/04",
    department: "Collectorate Land Valuation Committee, Ajmer",
    publishDate: new Date("2026-06-20T00:00:00Z").toISOString(),
    summary: "Updates to land valuation rates for registration and stamp duties calculation.",
    fileUrl: "/samples/sample.pdf",
    status: "published"
  },
  {
    _id: "not_mock_4",
    title: "Digital Jamabandi and sign verification camp",
    refNumber: "F.7(1)RoR/2026/12",
    department: "Board of Revenue for Rajasthan, Ajmer",
    publishDate: new Date("2026-07-02T00:00:00Z").toISOString(),
    summary: "Circular directing Patwaris to sign-verify digital jamabandis for public distribution.",
    fileUrl: "/samples/sample.pdf",
    status: "published"
  },
  {
    _id: "not_mock_5",
    title: "Declaration of new revenue circles and tehsil boundaries",
    refNumber: "F.12(3)Bound/2026/99",
    department: "State Government of Rajasthan, Revenue Division",
    publishDate: new Date("2026-07-04T00:00:00Z").toISOString(),
    summary: "Circular notifying creation of new Patwar circles and boundary restructuring.",
    fileUrl: "/samples/sample.pdf",
    status: "published"
  }
];

// 5. DUMMY DOWNLOADS (5 items)
export const fallbackDownloads = [
  { _id: "dwn_mock_1", title: "Mutation Application Form (Namantaran)", category: "Forms", description: "Standard form for inheritance mutation succession applications.", fileUrl: "/samples/sample.pdf", status: "published" },
  { _id: "dwn_mock_2", title: "Vakalatnama Template for Revenue Courts", category: "Templates", description: "Vakalatnama form to represent clients before SDO and Board of Revenue.", fileUrl: "/samples/sample.pdf", status: "published" },
  { _id: "dwn_mock_3", title: "Section 90-A Conversion Application Sheet", category: "Forms", description: "Form for agricultural land use conversion requests under Section 90-A.", fileUrl: "/samples/sample.pdf", status: "published" },
  { _id: "dwn_mock_4", title: "Suit for Division of Agricultural holding Draft template", category: "Templates", description: "Model draft petition sheet for Section 53 partition suits.", fileUrl: "/samples/sample.pdf", status: "published" },
  { _id: "dwn_mock_5", title: "Revenue Appeals checklist", category: "Checklists", description: "Administrative checklist of documents required for RAC first appeals.", fileUrl: "/samples/sample.pdf", status: "published" }
];

// 6. DUMMY GLOSSARY (10 items)
export const fallbackGlossary = [
  { _id: "glo_mock_1", term: "Jamabandi", definition: "The primary Record of Rights (RoR) document of land holdings in villages, updated every five years." },
  { _id: "glo_mock_2", term: "Khasra", definition: "A cadastral registry number assigned to a specific agricultural parcel or land plot." },
  { _id: "glo_mock_3", term: "Khatedar", definition: "A tenant holding permanent, inheritable, and transferable rights over agricultural land." },
  { _id: "glo_mock_4", term: "Gair-Khatedar", definition: "A temporary, probationary tenant holding cultivation rights without transfer privileges." },
  { _id: "glo_mock_5", term: "Namantaran (Mutation)", definition: "The official process of recording land title transfers or successions in the Jamabandi registry." },
  { _id: "glo_mock_6", term: "Nikal Shajra", definition: "A copy of the cadastral trace map displaying boundaries of individual Khasra numbers." },
  { _id: "glo_mock_7", term: "Charagah", definition: "Communal village pasture lands held in public trust for grazing cattle." },
  { _id: "glo_mock_8", term: "Patwari", definition: "The local village level land revenue administrator responsible for maintaining jamabandis and maps." },
  { _id: "glo_mock_9", term: "Girdawari", definition: "Bi-annual crop inspection registry compiled by the Halka Patwari to verify agricultural activity." },
  { _id: "glo_mock_10", term: "DLC Rate", definition: "District Level Committee rate; the minimum valuation baseline for calculating stamp duties." }
];
