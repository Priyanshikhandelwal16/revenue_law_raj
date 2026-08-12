import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { verifyToken } from '@/lib/auth';

/**
 * One-time migration endpoint to:
 * 1. Replace "RRLKP" with "Revenue Law Raj" in all settings
 * 2. Fix homepage categories (rename to "Judicial Matters", remove old cards, add new section cards)
 * 
 * Call: POST /api/fix-rrlkp (requires admin auth)
 * After successful run, this file can be deleted.
 */
export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const settings = await Setting.find({});
    let updatedCount = 0;

    // Fix 1: Replace "RRLKP" in all settings
    for (const setting of settings) {
      const original = JSON.stringify(setting.value);
      let fixed = original.replace(/RRLKP/g, 'Revenue Law Raj');

      if (fixed !== original) {
        setting.value = JSON.parse(fixed);
        await setting.save();
        updatedCount++;
      }
    }

    // Fix 2: Update homepage_config categories
    const homepageSetting = await Setting.findOne({ key: 'homepage_config' });
    if (homepageSetting && homepageSetting.value) {
      const val = homepageSetting.value;
      
      // Update categoriesSection title
      if (!val.categoriesSection) val.categoriesSection = {};
      val.categoriesSection.title = "Judicial Matters";
      val.categoriesSection.description = "Access structured directories covering key judicial matters in Rajasthan land and tenancy codes.";

      // Replace categories array
      val.categories = [
        { title: "Land Conversion (90-A)", description: "Rules and guides for conversion of agriculture lands to residential and commercial use.", slug: "land-conversion-90-a", icon: "FileCheck" },
        { title: "Mutation & Succession", description: "Succession filings, partition mutations, and records correction procedures.", slug: "mutation-rights", icon: "Layers" },
        { title: "Eviction & Encroachments", description: "Tehsildar powers under Section 91 and eviction rules for government holdings.", slug: "encroachments", icon: "ShieldAlert" },
        { title: "Partition & Boundaries", description: "Division of undivided holdings under Section 53 of the Tenancy Act.", slug: "partition-boundaries", icon: "Compass" },
        { title: "Section 82 \u2013 Land Revenue Act", description: "Provisions relating to the assessment and collection of land revenue under the Rajasthan Land Revenue Act, 1956.", slug: "section-82-land-revenue", icon: "Landmark" },
        { title: "Section 91 \u2013 Rajasthan Land Revenue Act", description: "Powers of Tehsildar for summary eviction and removal of encroachments from government land.", slug: "section-91-eviction-encroachment", icon: "ShieldAlert" },
        { title: "Section 135 \u2013 Land Revenue Act", description: "Provisions governing record of rights, entries, and the maintenance of land records.", slug: "section-135-land-revenue", icon: "FileCheck" },
        { title: "Section 136 \u2013 Land Revenue Act", description: "Presumption of correctness of entries in records of rights and annual registers.", slug: "section-136-land-revenue", icon: "FileCheck" },
        { title: "Section 53 \u2013 Rajasthan Tenancy Act", description: "Right of tenants to partition of their holdings under the Rajasthan Tenancy Act, 1955.", slug: "section-53-tenancy-act", icon: "Compass" },
        { title: "Section 88 \u2013 Land Revenue Act", description: "Provisions relating to allotment and resumption of land under the Rajasthan Land Revenue Act.", slug: "section-88-land-revenue", icon: "Landmark" },
        { title: "Section 188 \u2013 Rajasthan Tenancy Act", description: "Protection of tenants against trespass and unauthorized dispossession.", slug: "section-188-tenancy-act", icon: "Scale" },
        { title: "Section 92-A \u2013 Land Revenue Act", description: "Special provisions for regularization of unauthorized occupation and land use changes.", slug: "section-92a-land-revenue", icon: "Gavel" },
        { title: "Section 175 & 176 \u2013 Rajasthan Tenancy Act", description: "Provisions regarding penalties for wrongful dispossession and restoration of possession to tenants.", slug: "section-175-176-tenancy-act", icon: "Scale" },
      ];

      homepageSetting.value = val;
      await homepageSetting.save();
      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Migration complete. Updated ${updatedCount} settings documents. RRLKP replaced, categories updated to "Judicial Matters" with new section cards.`
    });
  } catch (err) {
    console.error('Fix migration error:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
