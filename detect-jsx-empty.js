const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'build', 'dist'].includes(entry.name)) continue;
      files = files.concat(walk(full));
    } else if (entry.isFile() && (full.endsWith('.tsx') || full.endsWith('.jsx'))) {
      files.push(full);
    }
  }
  return files;
}
const files = walk(process.cwd());
let total = 0;
const findings = [];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  try {
    const ast = parser.parse(src, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'decorators-legacy', 'classProperties', 'objectRestSpread', 'optionalChaining', 'nullishCoalescingOperator'],
      errorRecovery: true,
      tokens: true,
    });
    traverse(ast, {
      JSXElement(path) {
        const node = path.node;
        if (!node.openingElement.selfClosing) {
          const nonWhitespaceChildren = node.children.filter(child => {
            if (child.type === 'JSXText') return child.value.trim() !== '';
            if (child.type === 'JSXExpressionContainer') return child.expression.type !== 'JSXEmptyExpression';
            return child.type !== 'JSXText';
          });
          if (nonWhitespaceChildren.length === 0) {
            const name = node.openingElement.name.type === 'JSXIdentifier' ? node.openingElement.name.name : 'unknown';
            findings.push({ file, line: node.loc.start.line, tag: name });
            total++;
          }
        }
      }
    });
  } catch (err) {
    findings.push({ file, line: 0, tag: 'PARSE_ERROR', error: err.message });
  }
}
console.log('empty-non-self-closing:', total);
findings.slice(0, 200).forEach(f => console.log(`${f.file}:${f.line} ${f.tag} ${f.error || ''}`));
