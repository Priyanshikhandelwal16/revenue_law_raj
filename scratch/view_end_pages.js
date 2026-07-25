const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const matches = content.match(/PAGE \d+/g);
const pageSplit = content.split(/=========================================\nPAGE \d+\n=========================================\n/);

for (let i = 1; i < pageSplit.length; i++) {
  const pNum = matches[i - 1];
  if (pNum === 'PAGE 144' || pNum === 'PAGE 145' || pNum === 'PAGE 146') {
    console.log(`==================== ${pNum} ====================`);
    console.log(pageSplit[i].trim());
    console.log("\n");
  }
}
