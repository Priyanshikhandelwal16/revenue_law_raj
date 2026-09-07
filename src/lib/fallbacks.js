// Fallback Mock Datasets for Rajasthan Revenue Law Platform (RRLKP)
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

export const fallbackArticles = [
  // Dedicated Land Conversion 90-A article
  {
    _id: 'art_land_conversion_90a',
    title: 'Land Conversion (Section 90-A) — Rajasthan Land Revenue Act, 1956',
    slug: 'land-conversion-90-a',
    category: 'Land Conversion',
    summary: 'Land conversion means the conversion of the status of the land from agricultural status to either residential/commercial/institutional or Industrial land. In simple words it is the conversion of Agricultural Land into Non-Agricultural Land.',
    content: `<p>Land conversion means the conversion of the status of the land from agricultural status to either residential/commercial/institutional or Industrial land. In simple words it is the conversion of Agricultural Land into Non-Agricultural Land.</p>
<p>The Section 90-A of the Rajasthan Land Revenue Act, 1956, deals with the conversion of the Agricultural Land. The Conversion of Agricultural into Non Agricultural Land, Rules 1961 are given below.</p>
<h2>Section 90-A — Key Provisions</h2>
<p>Section 90-A of the Rajasthan Land Revenue Act, 1956 provides that no person shall use any agricultural land for any non-agricultural purpose except with the prior permission of the competent authority.</p>
<h2>Who is the Competent Authority?</h2>
<p>The Sub-Divisional Officer (SDO) is generally the competent authority for granting permission for conversion of agricultural land into non-agricultural land in rural areas. However, for urban areas falling under municipal/UIT jurisdiction, the respective urban bodies hold jurisdiction.</p>
<h2>Procedure for Conversion</h2>
<p>An application for conversion of land under Section 90-A must be submitted to the Sub-Divisional Officer of the concerned area, along with prescribed conversion fees, site plan, and proof of ownership (Jamabandi copy). The SDO examines the application and may grant or reject the conversion order after due enquiry.</p>
<h2>Conversion Fees</h2>
<p>Conversion fees are charged based on the District Level Committee (DLC) rates applicable to the land at the time of conversion. The fee schedule is revised periodically by the state government.</p>
<h2>Conversion of Agricultural Land into Non-Agricultural Land Rules, 1961</h2>
<p>The Rajasthan Land Revenue (Conversion of Agricultural Land for Non-Agricultural Purposes in Rural Areas) Rules, 2007 (updated till December 2023) govern the detailed procedure, fees, and conditions applicable to such conversions. These rules elaborate on the categories of permissible non-agricultural uses, the procedural requirements, time limits for decision, and the consequences of unauthorized conversion.</p>`,
    pdfUrl: 'https://landrevenue.rajasthan.gov.in/content/dam/landrevenue/revenuedepartment/pdf/Rules/Rajasthan%20Land%20Revenue%20(Conversion%20of%20agricultural%20land%20for%20non-agricultural%20purposes%20in%20rural%20areas)%20Rules,%202007.%20updated%20till%20dec%202023.pdf',
    createdAt: new Date(2026, 5, 1).toISOString(),
    status: 'published'
  },
  // Mutation & Succession
  {
    _id: 'art_mutation_rights',
    title: 'Mutation & Succession — Land Record Correction under Rajasthan Revenue Law',
    slug: 'mutation-rights',
    category: 'Mutation & Succession',
    summary: 'Mutation (Namantaran) is the process of updating the Record of Rights (Jamabandi) upon transfer or succession of agricultural land. Under the Rajasthan Land Revenue Act, 1956, every person acquiring land by succession or transfer must report the transaction to the Patwari.',
    content: `<p>Mutation (Namantaran) is the process of updating the Record of Rights (Jamabandi) upon transfer or succession of agricultural land in Rajasthan. Under Section 135 of the Rajasthan Land Revenue Act, 1956, every person acquiring land by succession or transfer must report the transaction to the Patwari to update the Jamabandi through mutation.</p>
<h2>What is Mutation?</h2>
<p>Mutation means the substitution of the name of the new owner or tenant in the revenue records in place of the previous owner or tenant. It is a process of updating the Record of Rights (Jamabandi) whenever there is a change in the ownership or possession of land.</p>
<h2>Types of Mutation</h2>
<p><strong>Succession Mutation:</strong> When land passes from a deceased person to his legal heirs, mutation is carried out based on succession. The heirs must apply to the Patwari with relevant documents such as death certificate and proof of legal heirship.</p>
<p><strong>Transfer Mutation:</strong> When land is transferred through sale, gift, or exchange, mutation is required to be done based on the registered deed of transfer.</p>
<h2>Procedure for Mutation</h2>
<p>1. Application to be submitted to the Patwari/Tehsildar of the concerned area.</p>
<p>2. Documents required: Jamabandi copy, sale deed/will/succession certificate, identity proof.</p>
<p>3. The Patwari verifies the documents and records the mutation in the Jamabandi.</p>
<p>4. If there is any dispute, the matter is referred to the Tehsildar for adjudication.</p>
<h2>Legal Provisions</h2>
<p>Section 135 of the Rajasthan Land Revenue Act, 1956 mandates reporting of every transfer or succession of land to the Patwari. Failure to do so may result in penalties. The Board of Revenue has held in several judgments that mutation entries are only for revenue purposes and do not confer title.</p>`,
    createdAt: new Date(2026, 5, 2).toISOString(),
    status: 'published'
  },
  // Eviction & Encroachments
  {
    _id: 'art_encroachments',
    title: 'Eviction & Encroachments — Section 91 of the Rajasthan Land Revenue Act, 1956',
    slug: 'encroachments',
    category: 'Eviction & Encroachments',
    summary: 'Section 91 of the Rajasthan Land Revenue Act, 1956 empowers the Tehsildar to summarily evict any person occupying government land without authority. Encroachments on Charagah (pasture) and government wasteland are treated as serious violations under revenue law.',
    content: `<p>Section 91 of the Rajasthan Land Revenue Act, 1956 is the primary provision dealing with trespassers and encroachments on government land. It empowers the Tehsildar to summarily evict any person who occupies land without lawful authority.</p>
<h2>Section 91 — Trespasser Eviction Powers</h2>
<p>Under Section 91, if any person occupies any land without authority, the Tehsildar may, after giving such person an opportunity of being heard, pass an order for eviction of such person from the land and for removal of any crop or structure erected by such person on such land.</p>
<h2>Charagah (Pasture Land) Encroachments</h2>
<p>Charagah lands are communal village grazing lands held in public trust. Any encroachment on Charagah land is treated as a serious violation. The Supreme Court and High Court of Rajasthan have repeatedly held that Charagah lands cannot be regularised in favour of encroachers, regardless of the duration of possession.</p>
<h2>Government Wasteland Encroachments</h2>
<p>Government wasteland includes lands which are not under cultivation and have not been assigned to any individual. Encroachments on such lands are dealt with under Section 91 and the concerned Tehsildar is empowered to initiate eviction proceedings.</p>
<h2>Procedure for Eviction</h2>
<p>1. A complaint or suo motu action by the Tehsildar initiates the proceedings.</p>
<p>2. Notice is issued to the encroacher.</p>
<p>3. After hearing the encroacher, an eviction order is passed if encroachment is established.</p>
<p>4. The encroacher can appeal before the Sub-Divisional Officer (SDO) and further before the Revenue Appeals Commissioner.</p>`,
    createdAt: new Date(2026, 5, 3).toISOString(),
    status: 'published'
  },
  // Partition & Boundaries
  {
    _id: 'art_partition_boundaries',
    title: 'Partition & Boundaries — Section 53 of the Rajasthan Tenancy Act, 1955',
    slug: 'partition-boundaries',
    category: 'Partition & Boundaries',
    summary: 'Partition of agricultural holdings is governed by Section 53 of the Rajasthan Tenancy Act, 1955. Any co-sharer (khatedar tenant) has the right to sue for partition of their joint holding to separate their individual share on maps and records.',
    content: `<p>Partition of agricultural holdings in Rajasthan is primarily governed by Section 53 of the Rajasthan Tenancy Act, 1955. Any co-sharer (khatedar tenant) has the right to sue for partition of their joint holding to separate their individual share on maps and records.</p>
<h2>Right to Partition</h2>
<p>Under Section 53, any co-sharer of a joint agricultural holding has an indefeasible right to sue for partition. This right cannot be waived or extinguished by any agreement among co-sharers. Even a female co-sharer (under Hindu Succession Act amendments) is entitled to demand partition.</p>
<h2>Procedure for Partition</h2>
<p><strong>Step 1:</strong> File a partition suit before the Tehsildar (for holdings less than the prescribed limit) or the Sub-Divisional Officer.</p>
<p><strong>Step 2:</strong> The Tehsildar issues notice to all co-sharers and records their statements.</p>
<p><strong>Step 3:</strong> A local commissioner (Patwari) is appointed to prepare a site plan showing the proposed division of the holding.</p>
<p><strong>Step 4:</strong> After hearing parties, a preliminary decree is passed approving the partition plan.</p>
<p><strong>Step 5:</strong> The final decree records the separate Khasra numbers and boundaries for each co-sharer's share.</p>
<h2>Boundary Disputes</h2>
<p>Boundary disputes between neighbouring Khasra numbers are settled by the Patwari through demarcation proceedings. If the dispute is not resolved at the Patwari level, the matter is referred to the Tehsildar for formal adjudication. The Tehsildar has the power to appoint a local commissioner to conduct a fresh demarcation survey.</p>
<h2>Section 52 — Bar on Transfer</h2>
<p>While partition is a right, Section 52 of the Rajasthan Tenancy Act restricts the transfer of Khatedar interest to non-agricultural persons, and any partition that results in sub-economic holdings (below the prescribed minimum) may be challenged.</p>`,
    createdAt: new Date(2026, 5, 4).toISOString(),
    status: 'published'
  },
  // Appeals & Revisions
  {
    _id: 'art_appeals_revisions',
    title: 'Appeals & Revisions — Appellate Structure in Rajasthan Revenue Law',
    slug: 'appeals-revisions',
    category: 'Appeals & Revisions',
    summary: 'The appellate structure in Rajasthan revenue law provides for a hierarchical system of appeals from the Tehsildar Court up to the Board of Revenue, Ajmer. Understanding the correct appellate forum and limitation period is critical for revenue litigants.',
    content: `<p>The appellate structure in Rajasthan revenue law provides for a clear hierarchy of appellate forums. Every order passed by a revenue authority can be challenged in appeal before the next higher authority. Understanding the correct forum and the limitation period for filing appeals is critical for revenue litigants and advocates.</p>
<h2>Appellate Hierarchy</h2>
<p><strong>Level 1 — Tehsildar:</strong> The Tehsildar passes orders in mutation disputes, eviction matters, partition suits below the prescribed limit, and boundary disputes.</p>
<p><strong>Level 2 — Sub-Divisional Officer (SDO):</strong> First appeal lies before the SDO against orders of the Tehsildar.</p>
<p><strong>Level 3 — Revenue Appellate Authority (RAA):</strong> Second appeal against SDO orders lies before the Revenue Appellate Authority (RAA) at the divisional level.</p>
<p><strong>Level 4 — Board of Revenue, Ajmer:</strong> The Board of Revenue is the highest revenue court in the state. Second or further appeals and revisions lie before the Board under various provisions of the Rajasthan Land Revenue Act and the Rajasthan Tenancy Act.</p>
<h2>Limitation Period</h2>
<p>Generally, an appeal must be filed within 90 days from the date of the lower court's order. However, specific statutory provisions may prescribe different limitation periods for particular types of matters. Courts have the discretion to condone delay on sufficient cause being shown.</p>
<h2>Revision Powers</h2>
<p>The Board of Revenue and the Collector have powers of revision to call for and examine the record of any case decided by any subordinate revenue court to satisfy itself as to the legality or propriety of such decision.</p>
<h2>High Court Jurisdiction</h2>
<p>After exhausting the revenue appellate hierarchy, a writ petition can be filed before the High Court of Rajasthan (Jodhpur Bench or Jaipur Bench) challenging revenue court orders on questions of law or fundamental rights violations.</p>`,
    createdAt: new Date(2026, 5, 5).toISOString(),
    status: 'published'
  },
  // General Commentary
  {
    _id: 'art_commentary',
    title: 'General Commentary — Understanding Rajasthan Revenue Law',
    slug: 'commentary',
    category: 'General Commentary',
    summary: 'General commentary and analysis on Rajasthan Revenue Law covers the comprehensive framework of the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955, including local customs, judicial precedents, and practical guidance for advocates and landowners.',
    content: `<p>Rajasthan Revenue Law is a vast and specialised body of law that governs all aspects of agricultural land, tenancies, estates, land revenue assessments, boundaries, pasture lands, and land conversions in the State of Rajasthan. The two primary statutes are the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955.</p>
<h2>Rajasthan Land Revenue Act, 1956</h2>
<p>The Rajasthan Land Revenue Act, 1956 (Act No. 15 of 1956) is the principal legislation defining the powers of revenue courts, the conduct of land surveys, the maintenance of records-of-rights (Jamabandi), and the administration of land revenue in Rajasthan. It establishes the revenue court hierarchy and prescribes procedures for mutation, partition, eviction, and land conversion.</p>
<h2>Rajasthan Tenancy Act, 1955</h2>
<p>The Rajasthan Tenancy Act, 1955 (Act No. 3 of 1955) consolidates the law relating to tenancies of agricultural lands in Rajasthan. It defines the classes of tenants (Khatedar and Gair-Khatedar), their rights and liabilities, rent, partition, ejectment, and protections for SC/ST landholders.</p>
<h2>Key Legal Concepts</h2>
<p><strong>Jamabandi:</strong> The primary Record of Rights document maintained by the Patwari, updated every five years, recording all land holdings, tenancies, and rights.</p>
<p><strong>Khatedar Tenant:</strong> A tenant with permanent, inheritable, and transferable rights over agricultural land — the highest class of tenant right in Rajasthan.</p>
<p><strong>Gair-Khatedar Tenant:</strong> A temporary, probationary tenant with cultivation rights but without the right to transfer.</p>
<p><strong>Khasra:</strong> A cadastral registry number assigned to a specific agricultural parcel in the village cadastral map.</p>
<h2>Role of Local Customs</h2>
<p>Local customs (Riwaj-i-Abpashi) play an important role in Rajasthan revenue law, particularly in matters of inheritance, water rights, and grazing rights. Courts have recognised and enforced local customs where they are established, consistent, and not opposed to statutory provisions.</p>
<h2>Practical Guidance</h2>
<p>Advocates practising in revenue courts must be familiar with the revenue court hierarchy, the correct appellate forum, limitation periods, and the documents required for each type of proceeding. Regular reference to Board of Revenue judgments and High Court decisions is essential for staying updated on evolving interpretations of revenue law.</p>`,
    createdAt: new Date(2026, 5, 6).toISOString(),
    status: 'published'
  },

  // Tenancy Rights
  {
    _id: 'art_tenancy_rights',
    title: 'Tenancy Rights — Khatedar & Gair-Khatedar under Rajasthan Tenancy Act, 1955',
    slug: 'tenancy-rights',
    category: 'Tenancy Rights',
    summary: 'Khatedar and Gair-Khatedar tenant rights, protections, and restrictions under the Rajasthan Tenancy Act, 1955. A Khatedar tenant holds the highest and most secure class of tenant right in Rajasthan — permanent, inheritable, and transferable.',
    content: `<p>The Rajasthan Tenancy Act, 1955 defines and protects the rights of agricultural tenants in Rajasthan. Two primary classes of tenants are recognized: Khatedar tenants and Gair-Khatedar tenants.</p>
<h2>Khatedar Tenant</h2>
<p>A Khatedar tenant (Section 5 of the Rajasthan Tenancy Act, 1955) holds the highest and most secure class of tenant right in Rajasthan. Khatedar tenancy is permanent, inheritable, and transferable. A Khatedar tenant cannot be ejected from land except on specified statutory grounds such as non-payment of rent, personal cultivation by the landlord, or breach of conditions.</p>
<h2>Gair-Khatedar Tenant</h2>
<p>A Gair-Khatedar tenant (Section 16) is a temporary, probationary tenant who has cultivated land for less than 5 consecutive years. Gair-Khatedar tenancy is not transferable. Upon completing 5 years of continuous cultivation, a Gair-Khatedar tenant acquires Khatedar rights.</p>
<h2>Rights of Khatedar Tenants</h2>
<p>1. Right to permanent occupation and cultivation of land.</p>
<p>2. Right to bequeath tenancy rights to legal heirs.</p>
<p>3. Right to transfer land subject to restrictions on transfers to non-agriculturists.</p>
<p>4. Right to sub-let land for up to 5 years.</p>
<p>5. Right to demand partition of joint holdings (Section 53).</p>
<h2>SC/ST Protections</h2>
<p>Section 42 of the Rajasthan Tenancy Act prohibits transfer of SC/ST Khatedar land to non-SC/ST persons. Any such transfer is void ab initio. This is a constitutional protection upheld by the Supreme Court and High Court of Rajasthan in numerous judgments.</p>`,
    createdAt: new Date(2026, 5, 7).toISOString(),
    status: 'published'
  },

  // Land Records & Jamabandi
  {
    _id: 'art_land_records',
    title: 'Land Records & Jamabandi — Rajasthan Revenue Records System',
    slug: 'land-records',
    category: 'Land Records & Jamabandi',
    summary: 'Jamabandi is the primary Record of Rights (RoR) in Rajasthan, updated every 5 years by the Patwari. It records all landholding details, tenancy rights, encumbrances, and irrigation sources for each Khasra number in a village.',
    content: `<p>Jamabandi is the primary Record of Rights (RoR) document maintained for every village in Rajasthan. It is updated every 5 years during the process of Patwari annual crop registers (Girdawari). The Jamabandi records ownership, tenancy, area, nature of holding, and encumbrances for each Khasra parcel.</p>
<h2>Key Revenue Records</h2>
<p><strong>Jamabandi (Record of Rights):</strong> The primary document recording khatedari rights, area, and nature of land. Updated every 5 years.</p>
<p><strong>Khasra Register:</strong> The parcel-level register recording crop details, area, and nature of cultivation for each Khasra number.</p>
<p><strong>Khatoni (Khatedari Register):</strong> A tenant-wise register listing all Khasra parcels held by a particular tenant in a village.</p>
<p><strong>Roznamcha Waqiati:</strong> The Patwari's daily diary recording all transactions, mutations, and events affecting land records in the village.</p>
<h2>Correction of Land Records</h2>
<p>Errors in revenue records can be corrected through a formal application to the Tehsildar. The Tehsildar has the power to correct clerical and factual errors under Section 136 of the Rajasthan Land Revenue Act, 1956. Substantive disputes about ownership and boundaries must be resolved through proper revenue court proceedings.</p>
<h2>Digitization of Land Records</h2>
<p>The Government of Rajasthan has digitized Jamabandi and Khasra records under the Bhu-Abhilekh portal (apnakhata.raj.nic.in), making it possible for landowners to view and download their records online. However, discrepancies between digital and physical records must be resolved through formal correction proceedings.</p>`,
    createdAt: new Date(2026, 5, 8).toISOString(),
    status: 'published'
  },

  // Revenue Court Jurisdiction
  {
    _id: 'art_court_jurisdiction',
    title: 'Revenue Court Jurisdiction — Powers of Revenue Courts in Rajasthan',
    slug: 'court-jurisdiction',
    category: 'Revenue Court Jurisdiction',
    summary: 'Revenue courts in Rajasthan exercise jurisdiction over land disputes, mutation proceedings, partition suits, eviction cases, and boundary disputes. Their jurisdiction is defined by the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955.',
    content: `<p>Revenue courts in Rajasthan derive their jurisdiction from the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955. They exercise exclusive jurisdiction over agricultural land disputes and related matters, excluding civil courts in most cases.</p>
<h2>Tehsildar Court</h2>
<p>The Tehsildar is the primary revenue court at the tehsil level. The Tehsildar has jurisdiction over mutation disputes, boundary disputes (demarcation), eviction from government land under Section 91, partition suits of small holdings, and applications for correction of land records.</p>
<h2>Sub-Divisional Officer (SDO)</h2>
<p>The SDO exercises first appellate jurisdiction over Tehsildar orders and also has original jurisdiction over conversion of agricultural land under Section 90-A for rural areas. The SDO also adjudicates certain partition suits involving larger holdings.</p>
<h2>Collector Court</h2>
<p>The District Collector exercises revisional jurisdiction over SDO and Tehsildar orders and also has original jurisdiction over settlement of revenue and assessment disputes at the district level.</p>
<h2>Board of Revenue, Ajmer</h2>
<p>The Board of Revenue is the highest revenue court in Rajasthan, located at Ajmer. It exercises appellate and revisional jurisdiction over all lower revenue courts. Decisions of the Board of Revenue on questions of law are binding on all subordinate revenue courts in Rajasthan.</p>
<h2>Bar on Civil Court Jurisdiction</h2>
<p>Section 9 of the Code of Civil Procedure (CPC) read with specific provisions of the Rajasthan Tenancy Act creates a bar on civil court jurisdiction in matters exclusively cognizable by revenue courts. Civil courts cannot entertain suits relating to tenancy rights, mutations, or partitions of agricultural holdings.</p>`,
    createdAt: new Date(2026, 5, 9).toISOString(),
    status: 'published'
  },

  // Government Land Allotment
  {
    _id: 'art_govt_land_allotment',
    title: 'Government Land Allotment — Wasteland Allotment Rules in Rajasthan',
    slug: 'govt-land-allotment',
    category: 'Government Land Allotment',
    summary: 'Government wasteland in Rajasthan can be allotted to eligible persons under prescribed rules for agricultural and other permissible purposes. The Rajasthan Land Revenue Act, 1956 and the Rajasthan Allocation of Land for Agricultural Purposes Rules govern such allotments.',
    content: `<p>Government wasteland allotment in Rajasthan is governed by the Rajasthan Land Revenue Act, 1956 and the Rules framed thereunder. Eligible persons can apply for allotment of government wasteland for agricultural cultivation and other permissible purposes.</p>
<h2>Who Can Apply?</h2>
<p>Preference for allotment of government wasteland is given to:</p>
<p>1. Landless agricultural labourers belonging to SC/ST communities.</p>
<p>2. Small and marginal farmers who do not hold sufficient land.</p>
<p>3. Ex-servicemen and war widows in certain categories.</p>
<h2>Procedure for Allotment</h2>
<p>Applications for wasteland allotment are submitted to the Tehsildar of the concerned area. The Tehsildar verifies the eligibility of the applicant and the availability of government wasteland. The Collector has the final power to sanction allotment.</p>
<h2>Conditions of Allotment</h2>
<p>Allotment of government wasteland is typically subject to conditions including:</p>
<p>1. Land to be brought under cultivation within a stipulated period.</p>
<p>2. Payment of annual land revenue at assessed rates.</p>
<p>3. No transfer of allotted land without prior permission of the Collector.</p>
<p>4. The allottee acquires Khatedar rights only after fulfilling prescribed conditions and upon formal grant order.</p>
<h2>Regularisation of Old Allotments</h2>
<p>The Rajasthan Government has periodically issued regularisation schemes for old and unauthorized occupants of government wasteland who have been cultivating the land for a long period, subject to prescribed conditions and payment of regularisation fees.</p>`,
    createdAt: new Date(2026, 5, 10).toISOString(),
    status: 'published'
  },

  // SC/ST Land Protections
  {
    _id: 'art_sc_st_protections',
    title: 'SC/ST Land Protections — Statutory Safeguards in Rajasthan Revenue Law',
    slug: 'sc-st-protections',
    category: 'SC/ST Land Protections',
    summary: 'Special statutory protections for Scheduled Caste and Scheduled Tribe landholders under the Rajasthan Tenancy Act, 1955. Section 42 prohibits transfer of SC/ST Khatedar land to non-SC/ST persons — any such transfer is void ab initio.',
    content: `<p>The Rajasthan Tenancy Act, 1955 and allied revenue laws provide special statutory protections for Scheduled Caste (SC) and Scheduled Tribe (ST) agricultural landholders in Rajasthan. These protections are designed to prevent alienation of SC/ST lands and preserve their economic base.</p>
<h2>Section 42 — Bar on Transfer</h2>
<p>Section 42 of the Rajasthan Tenancy Act, 1955 prohibits the transfer of Khatedar tenancy rights held by SC/ST persons to non-SC/ST persons. Any sale, gift, mortgage, or exchange of SC/ST Khatedar land to a non-SC/ST person without the prior permission of the Collector is void ab initio and of no legal effect.</p>
<h2>Restoration of Alienated Land</h2>
<p>Where SC/ST land has been illegally transferred, the original SC/ST landholder or his heirs can apply to the Tehsildar for restoration of the land. The Tehsildar has the power to cancel such transfers and restore possession to the original landholder. The limitation period for restoration applications is generally 12 years from the date of alienation.</p>
<h2>Prohibition on Mortgage</h2>
<p>SC/ST agricultural land cannot be mortgaged with possession (usufructuary mortgage) to non-SC/ST persons. Any such mortgage transaction is void. Banks and financial institutions providing agricultural loans on SC/ST land must comply with these restrictions.</p>
<h2>Supreme Court Directives</h2>
<p>The Supreme Court of India has repeatedly emphasized the importance of strictly enforcing SC/ST land protection laws. State governments have been directed to proactively identify and restore illegally alienated SC/ST lands without waiting for applications from the affected landholders.</p>`,
    createdAt: new Date(2026, 5, 11).toISOString(),
    status: 'published'
  },

  // Revenue Penalties & Offences
  {
    _id: 'art_penalties_offences',
    title: 'Revenue Penalties & Offences — Rajasthan Land Revenue Act, 1956',
    slug: 'penalties-offences',
    category: 'Revenue Penalties & Offences',
    summary: 'The Rajasthan Land Revenue Act, 1956 prescribes penalties for various offences including unauthorized occupation of government land, failure to report mutations, obstruction of revenue officers, and unauthorized conversion of agricultural land.',
    content: `<p>The Rajasthan Land Revenue Act, 1956 contains several provisions prescribing penalties and punishments for offences against revenue law. These provisions ensure compliance with land revenue obligations and protect government land from unauthorized occupation and misuse.</p>
<h2>Unauthorized Occupation (Section 91)</h2>
<p>Any person who occupies government land without authority is liable to be summarily evicted under Section 91 and may additionally be required to pay damages equivalent to the market value of any crops grown or structures erected on the encroached land.</p>
<h2>Failure to Report Mutation (Section 135)</h2>
<p>Every person acquiring land by transfer or succession is required to report the transaction to the Patwari within 90 days. Failure to report the transaction within the prescribed period attracts a penalty under Section 135 of the Act.</p>
<h2>Unauthorized Land Conversion (Section 90-A)</h2>
<p>Using agricultural land for non-agricultural purposes without prior permission under Section 90-A constitutes an offence. The unauthorized conversion is liable to be reversed, and the defaulter may be required to pay conversion charges at penal rates in addition to restoring the land to its original agricultural status.</p>
<h2>Obstruction of Revenue Officers</h2>
<p>Obstructing or interfering with revenue officers (Patwari, Tehsildar, SDO) while discharging their official duties, such as during demarcation surveys, inspection of crops, or attachment of property, is a punishable offence under the Act.</p>
<h2>False Statements in Revenue Proceedings</h2>
<p>Making false statements or producing forged documents in any revenue court proceeding is an offence that can be prosecuted under the Indian Penal Code in addition to the revenue law penalties. Revenue courts have the power to refer such matters to the police for investigation.</p>`,
    createdAt: new Date(2026, 5, 12).toISOString(),
    status: 'published'
  },

  // General fallback articles
  ...articleTemplates.map((t, idx) => ({
    _id: `art_mock_${idx + 1}`,
    title: t.title,
    slug: t.slug,
    category: t.category,
    summary: `Detailed legal study and administrative guideline regarding ${t.title.toLowerCase()} in the state of Rajasthan.`,
    content: `<p>This article provides an in-depth analysis of <strong>${t.title}</strong>.</p><h2>Overview</h2><p>Under the Rajasthan Land Revenue framework, administrative clarity is essential for land management. Advocates and landowners must adhere to state statutes and circulars.</p><h2>Key Provisions</h2><p>Section guidelines and case precedents govern execution processes.</p>`,
    createdAt: new Date(2026, 5, 10 + idx).toISOString(),
    status: 'published'
  }))
];

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
  { title: "Kalu Ram v. Collector Sikar", citation: "2026 RRD 295", case: "COLL/98/2025", court: "Collector Court, Sikar", laws: ["Sec. 75 Land Revenue Act"], summary: "Demarcation dispute. Local commissioner appointed to review land shares." },
  { title: "State of Rajasthan v. Harphool Singh (Dead) through LRs", citation: "2026 SC 124", case: "CA/4890/2021", court: "Supreme Court of India", laws: ["Sec. 91 Land Revenue Act", "Adverse Possession"], summary: "A person claiming adverse possession against government pasture lands must establish continuous, hostile, and open possession with concrete documentary proof. Mere long occupancy does not vest title." },
  { title: "Kedar Nath (Dead) through LRs v. SDO & Ors.", citation: "2026 SC 211", case: "CA/1105/2023", court: "Supreme Court of India", laws: ["Sec. 42 Tenancy Act", "Transfer of Property"], summary: "Upheld that any sale of agricultural land belonging to Scheduled Castes to a non-Scheduled Caste member violates Section 42 of the Tenancy Act and is completely void, regardless of delay in filing revision." }
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
      { sectionNumber: "42", title: "SC/ST Sale Restrictions", content: "The sale of Khatedar interest is void if in favor of a person who is not SC/ST." },
      { sectionNumber: "53", title: "Partition of agricultural holding", content: "Any co-sharer (khatedar tenant) has the right to sue for partition of their joint holding to separate their individual share on maps and records." },
      { sectionNumber: "88", title: "Suit for declaration of Khatedari rights", content: "Any person claiming to be a tenant or a co-tenant may sue for a declaration of his right, which is the baseline suit for establishing agricultural land ownership title in Rajasthan." },
      { sectionNumber: "188", title: "Suit for injunction against trespass", content: "A tenant in possession may sue for permanent injunction to prevent any third party or trespasser from interfering with their agricultural operations or possession." },
      { sectionNumber: "251", title: "Rights of way and other easements", content: "A tenant can file an application before the Tehsildar to demand a new path or resolve blockades on agricultural cart-tracks through adjoining fields." }
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
      { sectionNumber: "91", title: "Trespassers Eviction", content: "Any person occupying land without authority may be summarily evicted by the Tehsildar." },
      { sectionNumber: "135", title: "Mutation on succession or transfer", content: "Every person acquiring land by succession or transfer must report the transaction to the Patwari to update record of rights (Jamabandi) through mutation." }
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
  { _id: "dwn_mock_1", title: "Mutation Application Form (Namantaran)", category: "Forms", description: "Standard form for inheritance mutation succession applications.", fileUrl: "/samples/sample.pdf", status: "published", fileType: "PDF", fileSize: "120 KB" },
  { _id: "dwn_mock_2", title: "Vakalatnama Template for Revenue Courts", category: "Templates", description: "Vakalatnama form to represent clients before SDO and Board of Revenue.", fileUrl: "/samples/sample.pdf", status: "published", fileType: "PDF", fileSize: "85 KB" },
  { _id: "dwn_mock_3", title: "Section 90-A Conversion Application Sheet", category: "Forms", description: "Form for agricultural land use conversion requests under Section 90-A.", fileUrl: "/samples/sample.pdf", status: "published", fileType: "PDF", fileSize: "150 KB" },
  { _id: "dwn_mock_4", title: "Suit for Division of Agricultural holding Draft template", category: "Templates", description: "Model draft petition sheet for Section 53 partition suits.", fileUrl: "/samples/sample.pdf", status: "published", fileType: "PDF", fileSize: "110 KB" },
  { _id: "dwn_mock_5", title: "Revenue Appeals checklist", category: "Checklists", description: "Administrative checklist of documents required for RAC first appeals.", fileUrl: "/samples/sample.pdf", status: "published", fileType: "PDF", fileSize: "95 KB" }
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
