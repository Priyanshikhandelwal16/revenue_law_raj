const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'scratch/tenancy_act_1955.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse({ data: dataBuffer });

parser.getText().then(function(result) {
  console.log("PDF parsed. Total pages:", result.pages.length);
  for (const page of result.pages) {
    if (page.text.toLowerCase().includes('third schedule') || page.text.toLowerCase().includes('suits, applications')) {
      console.log(`Match in Page ${page.num}`);
    }
  }
}).catch(err => {
  console.error("Error:", err);
});
