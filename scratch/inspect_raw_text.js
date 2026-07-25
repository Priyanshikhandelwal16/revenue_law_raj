const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const startIndex = content.indexOf('83 General Application for');
if (startIndex !== -1) {
  console.log(content.substring(startIndex, startIndex + 2500));
} else {
  console.log("Could not find start index");
}
