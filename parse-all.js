const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
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
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  try {
    parser.parse(src, { sourceType:'module', plugins:['typescript','jsx','decorators-legacy','classProperties','objectRestSpread','optionalChaining','nullishCoalescingOperator'] });
  } catch (e) {
    console.log(file + ': ' + e.message + ' at ' + JSON.stringify(e.loc));
  }
}
