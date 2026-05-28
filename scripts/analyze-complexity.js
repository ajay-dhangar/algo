/**
 * analyze-complexity.js
 *
 * Statically analyzes JS algorithm submissions to estimate their Big-O Time
 * and Space complexity by analyzing loop nesting, variable allocations, and recursion.
 */

const fs = require('fs');
const path = require('path');

function analyzeFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return analyzeCode(content);
}

function analyzeCode(code) {
  let timeComplexity = 'O(1)';
  let spaceComplexity = 'O(1)';
  const details = [];

  // 1. Analyze Time Complexity (nested loops depth)
  // Simple lexical nesting check for for/while loops
  const lines = code.split('\n');
  let currentLoopDepth = 0;
  let maxLoopDepth = 0;
  let hasRecursion = false;

  // Check if function name matches recursive calls
  const funcMatch = code.match(/function\s+(\w+)\s*\(/) || code.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/);
  const funcName = funcMatch ? funcMatch[1] : null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Check loops opening
    if (/\b(for|while)\s*\(/.test(trimmed)) {
      currentLoopDepth++;
      if (currentLoopDepth > maxLoopDepth) {
        maxLoopDepth = currentLoopDepth;
      }
    }

    // Check brackets closing (approximated loop closing)
    if (trimmed === '}' || trimmed.endsWith('}')) {
      if (currentLoopDepth > 0) {
        currentLoopDepth--;
      }
    }

    // Check recursion
    if (funcName && trimmed.includes(funcName) && !trimmed.includes('function ') && !trimmed.includes('const ')) {
      hasRecursion = true;
    }
  });

  // Calculate Time Complexity Big-O
  if (maxLoopDepth === 1) {
    timeComplexity = 'O(N)';
    details.push('Single loop detected (Linear time).');
  } else if (maxLoopDepth === 2) {
    timeComplexity = 'O(N^2)';
    details.push('Double nested loops detected (Quadratic time).');
  } else if (maxLoopDepth > 2) {
    timeComplexity = `O(N^${maxLoopDepth})`;
    details.push(`${maxLoopDepth} levels of nested loops detected.`);
  }

  if (hasRecursion) {
    if (timeComplexity === 'O(1)') {
      timeComplexity = 'O(2^N) / O(N log N)';
      details.push('Recursion detected without loops (typically exponential or divide-and-conquer).');
    } else {
      timeComplexity += ' [Recursive]';
      details.push('Recursion detected inside looping context.');
    }
  }

  if (timeComplexity === 'O(1)' && details.length === 0) {
    details.push('No loops or recursion detected (Constant time).');
  }

  // 2. Analyze Space Complexity (allocations)
  if (/\bnew\s+(Array|Map|Set)\b|\[\s*\]/.test(code)) {
    spaceComplexity = 'O(N)';
    details.push('Dynamic array/hash-map allocation detected (Linear space).');
  } else if (/\bnew\s+Matrix\b|\[\s*\[\s*\]\s*\]/.test(code)) {
    spaceComplexity = 'O(N^2)';
    details.push('Matrix/2D grid allocation detected (Quadratic space).');
  } else {
    details.push('No dynamic collection allocations detected (Constant auxiliary space).');
  }

  return {
    timeComplexity,
    spaceComplexity,
    maxLoopDepth,
    hasRecursion,
    details
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: node scripts/analyze-complexity.js <file-path-or-code>");
    process.exit(1);
  }

  const target = args[0];
  let analysis;

  if (fs.existsSync(target)) {
    console.log(`🔍 Analyzing file: ${target}...`);
    analysis = analyzeFile(target);
  } else {
    console.log("🔍 Analyzing raw code snippet...");
    analysis = analyzeCode(target);
  }

  if (analysis) {
    console.log("\n==============================================");
    console.log("🚀 STATIC ALGORITHM COMPLEXITY REPORT");
    console.log("==============================================");
    console.log(`⏱️ Estimated Time Complexity:  ${analysis.timeComplexity}`);
    console.log(`💾 Estimated Space Complexity: ${analysis.spaceComplexity}`);
    console.log("----------------------------------------------");
    console.log("📝 Details & Metrics:");
    analysis.details.forEach(detail => console.log(`  - ${detail}`));
    console.log("==============================================\n");
  }
}

if (require.main === module) {
  main();
}
