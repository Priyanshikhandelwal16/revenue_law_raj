const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../src/lib/third_schedule.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log("Original entries count:", data.length);

const newData = [];

for (const item of data) {
  const sNo = item.sNo;

  if (sNo === "36") {
    newData.push({
      sNo: "36",
      section: "Section 19(2A)(iv)",
      description: "Application for restitution of possession.",
      limitation: "Six months",
      limitationStart: "Date on which declaration is made under section 19(2A)(i) or 19(2A)(ii)",
      courtFee: "Fifty Paise",
      court: "Assistant Collector"
    });
  } else if (sNo === "36-A") {
    newData.push({
      sNo: "36-A",
      section: "Section 19(4)",
      description: "Application by tenant of Khudkasht or sub-tenant that he does not wish to acquire Khatedari rights.",
      limitation: "Three years",
      limitationStart: "Date of commencement of the Rajasthan Tenancy (Amend.) Act, 1959.",
      courtFee: "Fifty Paise",
      court: "Assistant Collector"
    });
  } else if (sNo === "37") {
    newData.push({
      sNo: "37",
      section: "Section 30-E(2)",
      description: "Surrender of land in excess of ceiling area.",
      limitation: "Six months under sec. 30E(1)",
      limitationStart: "Date Notified",
      courtFee: "None",
      court: "Tehsildar"
    });
  } else if (sNo === "68") {
    newData.push({
      sNo: "68(i)(a)",
      section: "Section 180",
      description: "Application for ejectment of a Gair Khatedar tenant, tenant of Khudkhasht or Sub-tenant under clause (a) or (d) by any of the persons enumerated in section 46.",
      limitation: "Three years",
      limitationStart: "Date of commencement of Act or three years from cessation of tenancy, whichever is later.",
      courtFee: "Fifty Paise",
      court: "Assistant Collector"
    });
    newData.push({
      sNo: "68(i)(b)",
      section: "Section 180",
      description: "Application for ejectment of a Gair Khatedar tenant, tenant of Khudkhasht or Sub-tenant under clause (a) or (d) in any other case.",
      limitation: "Three years",
      limitationStart: "Date of commencement of Act.",
      courtFee: "Fifty Paise",
      court: "Assistant Collector"
    });
    newData.push({
      sNo: "68(ii)",
      section: "Section 180",
      description: "Application for ejectment of a Gair Khatedar tenant, tenant of Khudkhasht or Sub-tenant under clause (b) and (c).",
      limitation: "One year",
      limitationStart: "When the cause of action arises.",
      courtFee: "Fifty Paise",
      court: "Assistant Collector"
    });
  } else if (sNo === "68-A") {
    newData.push({
      sNo: "68-A",
      section: "Section 182-B",
      description: "Application for restoration of land from which ejected or acquisition of Khatedari rights therein.",
      limitation: "Three years",
      limitationStart: "Date of actual ejectment.",
      courtFee: "One Rupee",
      court: "Sub-Divisional Officer"
    });
  } else if (sNo === "68-B") {
    newData.push({
      sNo: "68-B",
      section: "Section 183-A",
      description: "Application for the summary eviction of the mortgagee on non-delivery of possession of land after expiry of the period of mortgage.",
      limitation: "Twelve years",
      limitationStart: "Date of expiry of the period of mortgage or when such period is deemed to have expired under sub-section (4A) of section 43 before the date of the commencement of the Rajasthan Tenancy (Amend.) Ordinance, 1978, the date of such commencement.",
      courtFee: "Fifty Paise",
      court: "Assistant Collector"
    });
  } else if (sNo === "68-C") {
    newData.push({
      sNo: "68-C",
      section: "Section 183-B",
      description: "Application for summary ejectment of trespasser of the land held by a member of scheduled caste or scheduled tribe.",
      limitation: "Twelve years",
      limitationStart: "When the cause of action accrued.",
      courtFee: "Fifty Paise",
      court: "Tehsildar"
    });
  } else if (sNo === "80") {
    newData.push({
      sNo: "80(i)",
      section: "General",
      description: "Application for transfer presented to a Sub-Divisional Officer.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "Fifty Paise",
      court: "Sub-Divisional Officer"
    });
    newData.push({
      sNo: "80(ii)",
      section: "General",
      description: "Application for transfer presented to a Collector.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "Fifty Rupees",
      court: "Collector"
    });
    newData.push({
      sNo: "80(iv)",
      section: "General",
      description: "Application for transfer presented to the Board.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "One Rupee",
      court: "Board of Revenue"
    });
    newData.push({
      sNo: "80(v)",
      section: "General",
      description: "Application for transfer presented to the High Court.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "As in the Court Fees Act",
      court: "High Court"
    });
  } else if (sNo === "84") {
    newData.push({
      sNo: "84(i)",
      section: "General",
      description: "Application in a pending suit, appeal or other proceedings when presented to the High Court.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "As in the Court Fees Act",
      court: "High Court"
    });
    newData.push({
      sNo: "84(ii)",
      section: "General",
      description: "Application in a pending suit, appeal or other proceedings when presented to the Board.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "One Rupee",
      court: "Board of Revenue"
    });
    newData.push({
      sNo: "84(iii)",
      section: "General",
      description: "Application in a pending suit, appeal or other proceedings when presented to the Courts.",
      limitation: "None",
      limitationStart: "None",
      courtFee: "Fifty Paise",
      court: "Court in which pending"
    });
  } else if (sNo === "88") {
    newData.push({
      sNo: "88(i)",
      section: "General",
      description: "Appeal from original decrees to the Collector.",
      limitation: "Thirty days",
      limitationStart: "Date of decree",
      courtFee: "Same as on plaint",
      court: "Collector"
    });
    newData.push({
      sNo: "88(ii)",
      section: "General",
      description: "Appeal from original decrees to the Revenue Appellate Authority.",
      limitation: "Sixty days",
      limitationStart: "Date of decree",
      courtFee: "Same as on plaint",
      court: "Revenue Appellate Authority"
    });
  } else if (sNo === "89") {
    newData.push({
      sNo: "89(i)",
      section: "General",
      description: "Appeals from appellate decrees to the Revenue Appellate Authority.",
      limitation: "Sixty days",
      limitationStart: "Date of decree",
      courtFee: "Same as on plaint",
      court: "Revenue Appellate Authority"
    });
    newData.push({
      sNo: "89(ii)",
      section: "General",
      description: "Appeals from appellate decrees to the Board.",
      limitation: "Ninety days",
      limitationStart: "Date of decree",
      courtFee: "Same as on plaint",
      court: "Board of Revenue"
    });
  } else if (sNo === "90") {
    newData.push({
      sNo: "90(i)",
      section: "General",
      description: "Appeals from orders to the Collector.",
      limitation: "Thirty days",
      limitationStart: "Date of Order",
      courtFee: "One Rupee",
      court: "Collector"
    });
    newData.push({
      sNo: "90(ii)",
      section: "General",
      description: "Appeals from orders to the Revenue Appellate Authority.",
      limitation: "Sixty days",
      limitationStart: "Date of Order",
      courtFee: "One Rupee",
      court: "Revenue Appellate Authority"
    });
    newData.push({
      sNo: "90(iii)",
      section: "General",
      description: "Appeals from orders to the Board.",
      limitation: "Ninety days",
      limitationStart: "Date of Order",
      courtFee: "One Rupee",
      court: "Board of Revenue"
    });
  } else {
    // Keep the other items unchanged
    newData.push(item);
  }
}

console.log("Updated entries count:", newData.length);

fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 2), 'utf8');
console.log("third_schedule.json updated successfully.");
