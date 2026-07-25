const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'scratch/tenancy_act_1955.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse({ data: dataBuffer });

parser.getText({ first: 128, last: 147 }).then(function(result) {
  console.log("Pages extracted:", result.pages.length);
  let outputText = '';
  for (const page of result.pages) {
    outputText += `=========================================\n`;
    outputText += `PAGE ${page.num}\n`;
    outputText += `=========================================\n`;
    outputText += page.text + `\n\n`;
  }
  fs.writeFileSync('scratch/schedule_pages.txt', outputText);
  console.log("Saved pages to scratch/schedule_pages.txt");
}).catch(err => {
  console.error("Error:", err);
});
