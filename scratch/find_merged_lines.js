const fs = require('fs');
const data = require('../src/lib/third_schedule.json');

data.forEach((item, index) => {
  const desc = item.description.toLowerCase();
  if (desc.includes('(i)') || desc.includes('(ii)') || desc.includes('(iii)')) {
    console.log(`Row ${index} (S.No. ${item.sNo}):`);
    console.log(`  Desc: ${item.description.substring(0, 150)}`);
    console.log(`  Court: ${item.court}`);
    console.log(`  Fee: ${item.courtFee}`);
    console.log(`  Limitation: ${item.limitation}`);
    console.log("-----------------------------------------");
  }
});
