const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDir = path.join(__dirname, '../docs');
const dsaInterviewDir = path.join(__dirname, '../dsa-interview');

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

let hasErrors = false;

function checkFile(filePath) {
  if (!filePath.endsWith('.md') && !filePath.endsWith('.mdx')) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  const tags = data.tags || [];
  const isAlgorithmPage = 
    tags.includes('algorithm') || 
    tags.includes('algorithms') || 
    filePath.includes('dsa-problems') || 
    filePath.includes('graphs');

  if (isAlgorithmPage) {
    if (!data.complexity) {
      console.error(`❌ [Missing Complexity] ${filePath} is an algorithm page but lacks the 'complexity' frontmatter block.`);
      hasErrors = true;
    } else {
      // Validate schema
      const { time_best, time_average, time_worst, space } = data.complexity;
      if (!time_best || !time_average || !time_worst || !space) {
        console.error(`❌ [Invalid Complexity Schema] ${filePath} has a complexity block but is missing required fields (time_best, time_average, time_worst, space).`);
        hasErrors = true;
      }
    }
  }
}

console.log('Running Algorithm Complexity Validation...');
walkDir(docsDir, checkFile);
walkDir(dsaInterviewDir, checkFile);

if (hasErrors) {
  console.error('\n🚨 Validation failed. Please add/fix complexity blocks on the above files.');
  process.exit(1);
} else {
  console.log('✅ All algorithm pages have valid complexity frontmatter.');
  process.exit(0);
}
