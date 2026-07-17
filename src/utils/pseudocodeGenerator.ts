export function generatePseudocode(code: string): string[] {
  if (!code) return [];
  const lines = code.split('\n');
  const pseudocode: string[] = [];
  
  for (let line of lines) {
    let trimmed = line.trim();
    // Skip empty lines or lines with only brackets
    if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed === '};' || trimmed === '}') continue;
    
    // Replace JS syntax with pseudocode equivalents
    let pLine = line
      .replace(/function\s+(\w+)/g, 'procedure $1')
      .replace(/\\b(let|const|var)\\s+/g, '')
      .replace(/===|==/g, '=')
      .replace(/!==|!=/g, '≠')
      .replace(/=>/g, '→')
      .replace(/\{|\}/g, '')
      .replace(/;/g, '')
      .replace(/Math\.max/g, 'max')
      .replace(/Math\.min/g, 'min')
      .replace(/Math\.floor/g, 'floor')
      .replace(/console\.log\(.*\)/g, 'print');
      
    if (pLine.trim()) {
       pseudocode.push(pLine.trimEnd());
    }
  }
  return pseudocode;
}
