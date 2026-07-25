const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const missing = [2, 49, 50, 63, 72, 86];
missing.forEach(num => {
  const regex = new RegExp('(^|\\n|\\s)' + num + '\\s+(\\d+|xxx)', 'i');
  const match = content.match(regex);
  if (match) {
    console.log(`Found S.No. ${num}: ${match[0].trim()}`);
  } else {
    // Search for just the number at the beginning of a line or cell
    const lines = content.split('\n');
    const matches = lines.filter(l => l.trim().startsWith(num + ' '));
    if (matches.length > 0) {
      console.log(`Potential matches for S.No. ${num}:`, matches.slice(0, 3));
    } else {
      console.log(`S.No. ${num} not found directly.`);
    }
  }
});
