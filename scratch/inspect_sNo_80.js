const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const startIndex = content.indexOf('80 Application for');
if (startIndex !== -1) {
  console.log(content.substring(startIndex - 500, startIndex + 1500));
} else {
  console.log("Could not find S.No. 80");
}
