const fs = require('fs');
const parser = require('@babel/parser');
const files = ['src/components/ComingSoon.tsx'];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  try {
    parser.parse(src, { sourceType: 'module', plugins:['typescript','jsx','decorators-legacy','classProperties','objectRestSpread','optionalChaining','nullishCoalescingOperator'] });
    console.log('parsed ' + file);
  } catch (e) {
    console.error(file + ': ' + e.message + ' at ' + JSON.stringify(e.loc));
    if (e.codeFrame) console.error(e.codeFrame);
  }
}
