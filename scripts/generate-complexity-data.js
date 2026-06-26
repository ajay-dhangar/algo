const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDir = path.join(__dirname, '../docs');
const dsaInterviewDir = path.join(__dirname, '../dsa-interview');
const outputFilePath = path.join(__dirname, '../src/data/auto-complexities.json');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const complexities = [];

function checkFile(filePath) {
  if (!filePath.endsWith('.md') && !filePath.endsWith('.mdx')) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  if (data.complexity) {
    complexities.push({
      title: data.title || path.basename(filePath, path.extname(filePath)),
      path: filePath.replace(path.join(__dirname, '../'), '').replace(/\\/g, '/'),
      ...data.complexity
    });
  }
}

console.log('Generating Algorithm Complexity Data...');
walkDir(docsDir, checkFile);
walkDir(dsaInterviewDir, checkFile);

// Ensure the directory exists
const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFilePath, JSON.stringify(complexities, null, 2));
console.log(`✅ Generated ${complexities.length} complexity entries into ${outputFilePath}`);
