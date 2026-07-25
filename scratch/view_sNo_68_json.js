const fs = require('fs');
const data = require('../src/lib/third_schedule.json');

const targetNos = ['36', '37', '68', '80', '84', '88', '89', '90'];
targetNos.forEach(num => {
  const matches = data.filter(d => d.sNo === num || d.sNo.startsWith(num + '-'));
  console.log(`==================== S.No. ${num} (JSON) ====================`);
  console.log(JSON.stringify(matches, null, 2));
  console.log("\n");
});
