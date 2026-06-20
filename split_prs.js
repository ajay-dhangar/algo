const { spawnSync } = require('child_process');

const prs = [
  {
    number: 2701,
    branch: "issue-2701",
    title: "Fix issue #2701: Integrate RedBlackTreeVisualizer in docs",
    body: "This PR resolves #2701 by importing and embedding the `RedBlackTreeVisualizer` component into the `red-black-trees.mdx` documentation page. Closes #2701.",
    files: [
      "docs/extra/binary-search-tree/red-black-trees.md",
      "docs/extra/binary-search-tree/red-black-trees.mdx"
    ]
  },
  {
    number: 2702,
    branch: "issue-2702",
    title: "Fix issue #2702: Integrate AhoCorasickVisualizer in docs",
    body: "This PR resolves #2702 by creating the Aho-Corasick documentation page and embedding the `AhoCorasickVisualizer` component. Closes #2702.",
    files: [
      "docs/extra/Tries/aho-corasick.mdx"
    ]
  },
  {
    number: 2703,
    branch: "issue-2703",
    title: "Fix issue #2703: Expand navigation keyboard shortcuts",
    body: "This PR resolves #2703 by adding new keyboard shortcuts for the Code Playground, Leaderboard, Blog, and Quizzes, and listing them in the Help modal. Closes #2703.",
    files: [
      "src/hooks/useKeyboardShortcuts.js",
      "src/components/KeyboardShortcutsModal.jsx"
    ]
  },
  {
    number: 2704,
    branch: "issue-2704",
    title: "Fix issue #2704: Consolidate Queue quizzes and update metadata",
    body: "This PR resolves #2704 by merging unique questions from `queues.tsx` into `queue.tsx`, deleting `queues.tsx`, and updating the metadata count to 16. Closes #2704.",
    files: [
      "src/pages/quizzes/queue.tsx",
      "src/pages/quizzes/queues.tsx",
      "src/pages/quizzes/index.tsx"
    ]
  },
  {
    number: 2705,
    branch: "issue-2705",
    title: "Fix issue #2705: Fix duplicate React keys in ArrayVisualizations",
    body: "This PR resolves #2705 by using array indices instead of element values as the React keys for visualizer bars to avoid warnings. Closes #2705.",
    files: [
      "src/components/DSA/arrays/ArrayVisualizations/index.tsx"
    ]
  },
  {
    number: 2706,
    branch: "issue-2706",
    title: "Fix issue #2706: Improve contrast accessibility in Highlight component",
    body: "This PR resolves #2706 by dynamically determining a high-contrast text color based on background brightness and adding support for a `textColor` prop override. Closes #2706.",
    files: [
      "src/components/Highlight/index.js"
    ]
  }
];

function runCmd(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(`Command failed: ${cmd} ${args.join(' ')}`);
    console.error(result.stderr || result.error);
    return false;
  }
  return result.stdout.trim();
}

// Start from main branch
runCmd('git', ['checkout', 'main']);

prs.forEach((pr) => {
  console.log(`\n========================================`);
  console.log(`Processing PR for Issue #${pr.number}...`);
  console.log(`========================================`);

  // Delete local branch if it already exists
  spawnSync('git', ['branch', '-D', pr.branch]);

  // Create new branch from main
  if (runCmd('git', ['checkout', '-b', pr.branch, 'main']) === false) return;

  // Checkout files from resolve-issues branch
  console.log(`Checking out files from resolve-issues...`);
  const checkoutArgs = ['checkout', 'resolve-issues', '--', ...pr.files];
  if (runCmd('git', checkoutArgs) === false) {
    // If checkout failed (maybe because a file didn't exist or was deleted), we still try git rm for deleted files
    pr.files.forEach(f => {
      spawnSync('git', ['rm', f]); // try deleting file in case it was a deletion
    });
  }

  // Add changes to git
  runCmd('git', ['add', ...pr.files]);

  // Commit changes
  console.log(`Committing changes...`);
  runCmd('git', ['commit', '-m', pr.title]);

  // Push branch to origin fork
  console.log(`Pushing branch to origin fork...`);
  runCmd('git', ['push', '-f', 'origin', pr.branch]);

  // Create Pull Request using gh CLI
  console.log(`Creating Pull Request on GitHub...`);
  const prResult = spawnSync('gh', [
    'pr', 'create',
    '--repo', 'ajay-dhangar/algo',
    '--title', pr.title,
    '--body', pr.body,
    '--head', `Aditya948351:${pr.branch}`,
    '--base', 'main'
  ], { encoding: 'utf8' });

  if (prResult.status === 0) {
    const prUrl = prResult.stdout.trim();
    console.log(`PR Created successfully: ${prUrl}`);
    
    // Extract PR number from URL
    const prNumberMatch = prUrl.match(/\/pull\/(\d+)/);
    const newPrNumber = prNumberMatch ? prNumberMatch[1] : "";

    if (newPrNumber) {
      // Comment on the issue
      console.log(`Commenting on issue #${pr.number}...`);
      const commentBody = `@ajay-dhangar I have solved this issue in PR #${newPrNumber} kindly review it and merge by assigning me!`;
      const commentResult = spawnSync('gh', [
        'issue', 'comment', pr.number.toString(),
        '--repo', 'ajay-dhangar/algo',
        '--body', commentBody
      ], { encoding: 'utf8' });

      if (commentResult.status === 0) {
        console.log(`Successfully commented on issue #${pr.number}.`);
      } else {
        console.error(`Failed to comment on issue #${pr.number}.`);
      }
    }
  } else {
    console.error(`Failed to create PR:`, prResult.stderr || prResult.error);
  }

  // Return to main
  runCmd('git', ['checkout', 'main']);
});

console.log("\nCleanup: switching back to main...");
runCmd('git', ['checkout', 'main']);
