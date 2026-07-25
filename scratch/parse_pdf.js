const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'scratch/tenancy_act_1955.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

console.log("Starting PDF parsing with PDFParse class...");

const parser = new PDFParse({ data: dataBuffer });

parser.getText({ first: 120, last: 150 }).then(function(result) {
  console.log("PDF parsed successfully. Pages extracted:", result.pages.length);
  
  let outputText = '';
  for (const page of result.pages) {
    outputText += `=========================================\n`;
    outputText += `PAGE ${page.num}\n`;
    outputText += `=========================================\n`;
    outputText += page.text + `\n\n`;
  }
  
  fs.writeFileSync('scratch/extracted_pages.txt', outputText);
  console.log("Saved pages 120 to 150 to scratch/extracted_pages.txt");
}).catch(err => {
  console.error("Error parsing PDF:", err);
});
