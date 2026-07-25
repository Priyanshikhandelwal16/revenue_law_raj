const fs = require('fs');
const data = require('../src/lib/third_schedule.json');

console.log("Total entries in third_schedule.json:", data.length);
const sNos = data.map(d => d.sNo);
console.log("List of S.Nos:", sNos.join(', '));
