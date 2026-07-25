const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const sNos = ['36', '37', '68', '80', '84', '88', '89', '90'];
sNos.forEach(num => {
  console.log(`==================== S.No. ${num} ====================`);
  const lines = content.split('\n');
  let matchCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith(num + ' ') || line.match(new RegExp('^' + num + '\\s+'))) {
      // Print context of 6 lines
      console.log(lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 8)).join('\n'));
      console.log('------------------');
      matchCount++;
      if (matchCount > 3) break;
    }
  }
});
