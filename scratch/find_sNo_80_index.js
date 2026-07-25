const fs = require('fs');
const content = fs.readFileSync('scratch/schedule_pages.txt', 'utf8');

const lines = content.split('\n');
console.log(lines.slice(1320, 1375).join('\n'));
