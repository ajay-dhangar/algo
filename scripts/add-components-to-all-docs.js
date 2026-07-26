const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '../docs');

// Import statements to add
const importsToAdd = `import ProgressTracker from '@site/src/components/ProgressTracker';
import NotesSection from '@site/src/components/NotesSection';

`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has components
  if (content.includes('ProgressTracker')) {
    console.log(`✅ Already has components: ${filePath}`);
    return;
  }
  
  // Get title for topicId
  let title = path.basename(filePath, path.extname(filePath));
  const titleMatch = content.match(/title:\s*(.+)/);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }
  
  const topicId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Add imports after frontmatter
  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd !== -1) {
    const insertPosition = frontmatterEnd + 4;
    content = content.slice(0, insertPosition) + '\n' + importsToAdd + content.slice(insertPosition);
  }
  
  // Add components at the end
  const componentsToAdd = `

---

<ProgressTracker topicId="${topicId}" topicTitle="${title}" />

<NotesSection topicId="${topicId}" />
`;
  
  content += componentsToAdd;
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${path.basename(filePath)}`);
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .git, .docusaurus
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.docusaurus') {
        walkDirectory(filePath);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      // Skip README files
      if (!file.includes('README')) {
        processFile(filePath);
      }
    }
  });
}

console.log('🚀 Adding components to all documentation files...\n');
walkDirectory(docsPath);
console.log('\n✨ Done! All documentation pages now have progress tracking and notes!');