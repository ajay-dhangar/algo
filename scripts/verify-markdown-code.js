/**
 * verify-markdown-code.js
 *
 * Extracts and verifies code blocks (JavaScript, Python) inside modified Markdown/MDX files
 * to prevent "code rot" and syntax errors in documentation.
 */

const fs = require('fs');
const path = require('path');
const { execSync, execFileSync } = require('child_process');

// Languages we support executing
const SUPPORTED_LANGUAGES = ['javascript', 'js', 'python', 'py'];

function getModifiedFiles() {
  const repoRoot = path.join(__dirname, '..');
  try {
    // Get list of changed markdown files between current branch and base branch (main)
    const stdout = execFileSync('git', ['diff', '--name-only', 'origin/main...'], { encoding: 'utf8' });
    return stdout
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .map(f => path.join(repoRoot, f))
      .filter(f => fs.existsSync(f));
  } catch (e) {
    console.warn("⚠️ Could not determine changed files via git diff. Scanning all markdown files in the repository...");
    return scanDirectory(repoRoot);
  }
}

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (['node_modules', '.git', '.docusaurus', 'build', '.github'].includes(file)) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function extractCodeBlocks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const codeBlockRegex = /```(\w+)(?:[^\n]*)\n([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const lang = match[1].toLowerCase();
    const code = match[2];
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      blocks.push({ lang, code, filePath });
    }
  }
  return blocks;
}

function runJsCode(code) {
  const tempFile = path.join(__dirname, 'temp_verify.js');
  try {
    // Inject mock console context to suppress heavy logs if desired, but allow execution
    fs.writeFileSync(tempFile, code, 'utf8');
    execFileSync('node', [tempFile], { stdio: 'ignore', timeout: 5000 });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
}

function runPythonCode(code) {
  const tempFile = path.join(__dirname, 'temp_verify.py');
  try {
    fs.writeFileSync(tempFile, code, 'utf8');
    // Try standard python or python3
    let pyCmd = 'python';
    try {
      execFileSync('python', ['--version'], { stdio: 'ignore' });
    } catch {
      pyCmd = 'python3';
    }
    execFileSync(pyCmd, [tempFile], { stdio: 'ignore', timeout: 5000 });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
}

function main() {
  console.log("🔍 Automated Markdown Code Verification Pipeline starting...");
  const files = getModifiedFiles();
  if (files.length === 0) {
    console.log("✅ No modified Markdown/MDX files found to verify.");
    process.exit(0);
  }

  console.log(`📂 Found ${files.length} Markdown files. Extracting code blocks...`);
  let totalBlocks = 0;
  let failedBlocks = 0;

  for (const file of files) {
    console.log(`\n📄 Verifying: ${path.relative(path.join(__dirname, '..'), file)}`);
    const blocks = extractCodeBlocks(file);
    if (blocks.length === 0) {
      console.log("  (No supported code blocks found)");
      continue;
    }

    blocks.forEach((block, idx) => {
      totalBlocks++;
      console.log(`  [Block #${idx + 1}] Testing language: ${block.lang}...`);
      let result;
      if (block.lang === 'javascript' || block.lang === 'js') {
        result = runJsCode(block.code);
      } else if (block.lang === 'python' || block.lang === 'py') {
        result = runPythonCode(block.code);
      }

      if (result.success) {
        console.log(`  ✅ Block #${idx + 1} passed syntax & execution check.`);
      } else {
        failedBlocks++;
        console.error(`  ❌ Block #${idx + 1} FAILED check!`);
        console.error(`     Error details: ${result.error}`);
      }
    });
  }

  console.log("\n==============================================");
  console.log(`📊 Summary: Checked ${totalBlocks} code blocks. Failures: ${failedBlocks}`);
  console.log("==============================================");

  if (failedBlocks > 0) {
    console.error("❌ Pipeline failed: One or more code blocks contain syntax errors or execution crashes.");
    process.exit(1);
  } else {
    console.log("✅ Pipeline passed! All verified code blocks are correct.");
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
