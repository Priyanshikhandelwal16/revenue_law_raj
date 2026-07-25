const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const startIndex = content.indexOf('68 180 Application for');
if (startIndex !== -1) {
  console.log(content.substring(startIndex, startIndex + 1500));
} else {
  console.log("Could not find start index");
}
